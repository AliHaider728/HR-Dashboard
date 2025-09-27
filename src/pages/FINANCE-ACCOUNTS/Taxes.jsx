 
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/Checkbox"
import { useForm } from "react-hook-form"

const Taxes = () => {
  const [taxes, setTaxes] = useState([
    {
      id: 1,
      taxYear: "2024-25",
      description: "Income Tax - Quarterly Q1",
      amount: "12500",
      taxRate: "15%",
      dueDate: "2025-03-31",
      status: "Paid",
    },
    {
      id: 2,
      taxYear: "2024-25",
      description: "GST Return - January",
      amount: "8200",
      taxRate: "18%",
      dueDate: "2025-02-20",
      status: "Pending",
    },
    {
      id: 3,
      taxYear: "2023-24",
      description: "Corporate Tax - Annual",
      amount: "45000",
      taxRate: "25%",
      dueDate: "2024-12-31",
      status: "Overdue",
    },
  ])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTaxes, setSelectedTaxes] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTax, setEditingTax] = useState(null)

  const itemsPerPage = 10
  const filteredTaxes = taxes.filter(tax => {
    const matchesSearch = tax.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tax.taxYear.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || tax.status === statusFilter
    return matchesSearch && matchesStatus
  })
  const totalPages = Math.ceil(filteredTaxes.length / itemsPerPage)
  const paginatedTaxes = filteredTaxes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const form = useForm({
    defaultValues: {
      taxYear: "",
      description: "",
      amount: "",
      taxRate: "",
      dueDate: "",
      status: "Pending",
    },
  })

  const handleCreateTax = (data) => {
    const newTax = { ...data, id: Date.now() }
    setTaxes([...taxes, newTax])
    form.reset()
    setIsAddModalOpen(false)
  }

  const handleUpdateTax = (data) => {
    if (!editingTax) return
    setTaxes(taxes.map(tax => (tax.id === editingTax.id ? { ...tax, ...data } : tax)))
    setIsEditModalOpen(false)
    setEditingTax(null)
  }

  const handleDeleteTax = (id) => {
    setTaxes(taxes.filter(tax => tax.id !== id))
  }

  const handleBulkDelete = () => {
    setTaxes(taxes.filter(tax => !selectedTaxes.has(tax.id)))
    setSelectedTaxes(new Set())
  }

  useEffect(() => {
    if (editingTax) {
      form.reset({
        taxYear: editingTax.taxYear,
        description: editingTax.description,
        amount: editingTax.amount,
        taxRate: editingTax.taxRate,
        dueDate: editingTax.dueDate,
        status: editingTax.status,
      })
    }
  }, [editingTax, form])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Taxes</h1>
          <p className="text-gray-600">Manage your tax obligations</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">Add Tax Record</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Tax Record</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(handleCreateTax)} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tax Year</label>
                <Input {...form.register("taxYear")} placeholder="e.g., 2024-25" required />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input {...form.register("description")} placeholder="e.g., Income Tax" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Amount ($)</label>
                  <Input {...form.register("amount")} type="number" placeholder="12500" required />
                </div>
                <div>
                  <label className="text-sm font-medium">Tax Rate</label>
                  <Input {...form.register("taxRate")} placeholder="15%" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input {...form.register("dueDate")} type="date" required />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select onValueChange={form.setValue("status")} defaultValue="Pending">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Create Tax Record</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedTaxes.size === filteredTaxes.length && filteredTaxes.length > 0}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedTaxes(new Set(filteredTaxes.map(t => t.id)))
                  } else {
                    setSelectedTaxes(new Set())
                  }
                }}
              />
              <CardTitle>Tax Records ({filteredTaxes.length})</CardTitle>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Input
                placeholder="Search taxes..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full sm:w-64"
              />
              <Select value={statusFilter} onValueChange={(value) => {
                setStatusFilter(value)
                setCurrentPage(1)
              }}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              {selectedTaxes.size > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleBulkDelete}
                  className="text-red-600 hover:bg-red-50"
                >
                  Delete Selected ({selectedTaxes.size})
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {paginatedTaxes.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tax records found</h3>
              <Button onClick={() => setIsAddModalOpen(true)}>Create Tax Record</Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedTaxes.size === filteredTaxes.length && filteredTaxes.length > 0}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTaxes(new Set(filteredTaxes.map(t => t.id)))
                            } else {
                              setSelectedTaxes(new Set())
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Tax Year</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Tax Rate</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTaxes.map((tax) => (
                      <TableRow key={tax.id} className="hover:bg-gray-50">
                        <TableCell>
                          <Checkbox
                            checked={selectedTaxes.has(tax.id)}
                            onCheckedChange={(checked) => {
                              const newSelected = new Set(selectedTaxes)
                              if (checked) {
                                newSelected.add(tax.id)
                              } else {
                                newSelected.delete(tax.id)
                              }
                              setSelectedTaxes(newSelected)
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{tax.taxYear}</TableCell>
                        <TableCell className="max-w-xs truncate">{tax.description}</TableCell>
                        <TableCell className="text-right font-medium">
                          ${parseFloat(tax.amount || 0).toLocaleString()}
                        </TableCell>
                        <TableCell>{tax.taxRate}</TableCell>
                        <TableCell>{tax.dueDate}</TableCell>
                        <TableCell>
                          <span className={
                            tax.status === "Paid" ? "text-green-600" :
                            tax.status === "Pending" ? "text-blue-600" :
                            "text-red-600"
                          }>
                            {tax.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">...</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <Dialog open={isEditModalOpen && editingTax?.id === tax.id} onOpenChange={() => {
                                if (editingTax?.id === tax.id) {
                                  setIsEditModalOpen(false)
                                  setEditingTax(null)
                                }
                              }}>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => {
                                    e.preventDefault()
                                    setEditingTax(tax)
                                    setIsEditModalOpen(true)
                                  }}>
                                    Edit
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Edit Tax Record</DialogTitle>
                                  </DialogHeader>
                                  <form onSubmit={form.handleSubmit(handleUpdateTax)} className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium">Tax Year</label>
                                      <Input {...form.register("taxYear")} required />
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Description</label>
                                      <Input {...form.register("description")} required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">Amount ($)</label>
                                        <Input {...form.register("amount")} type="number" required />
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Tax Rate</label>
                                        <Input {...form.register("taxRate")} required />
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Due Date</label>
                                      <Input {...form.register("dueDate")} type="date" required />
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Status</label>
                                      <Select onValueChange={form.setValue("status")} defaultValue={form.getValues("status")}>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Pending">Pending</SelectItem>
                                          <SelectItem value="Paid">Paid</SelectItem>
                                          <SelectItem value="Overdue">Overdue</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <Button type="submit" className="w-full">Update Tax Record</Button>
                                  </form>
                                </DialogContent>
                              </Dialog>
                              <DropdownMenuItem onSelect={(e) => {
                                e.preventDefault()
                                handleDeleteTax(tax.id)
                              }}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-2 py-4">
                  <div className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1
                      return (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      )
                    })}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Taxes