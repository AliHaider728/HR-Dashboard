 
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.jsx"
import { Button } from "../../components/ui/button.jsx"
import { Input } from "../../components/ui/input.jsx"
import { Badge } from "../../components/ui/badge.jsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table.jsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select.jsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog.jsx"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form.jsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination"
import { Checkbox } from  "../../components/ui/Checkbox.jsx"
import {
  Search,
  Plus,
  MoreHorizontal,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  FileDown,
} from "lucide-react"

// Custom Toast Component
const Toast = ({ message, type = "success", duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto remove after duration
    }, duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!message) return null

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500"
  const icon = type === "success" ? CheckCircle : Trash2

  return (
    <div className={`fixed top-4 right-4 z-[9999] ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm animate-in slide-in-from-right duration-300`}>
      <icon className="w-5 h-5" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}

// Form validation schema
const expenseSchema = z.object({
  name: z.string().min(1, "Expense name is required"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  amount: z.string().min(1, "Amount is required"),
  date: z.string().min(1, "Expense date is required"),
})

// Mock API functions
const mockAPI = {
  getExpenses: async (page = 1, limit = 10, filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const allExpenses = [
      {
        id: 1,
        name: "Servers",
        category: "Technology",
        subcategory: "Hardware Cost",
        amount: 20000,
        date: "14 Jan 2024",
        status: "approved",
        createdAt: "2024-01-14",
      },
      {
        id: 2,
        name: "Payroll Tax",
        category: "Taxes",
        subcategory: "Payroll Taxes",
        amount: 40000,
        date: "21 Jan 2024",
        status: "pending",
        createdAt: "2024-01-21",
      },
      {
        id: 3,
        name: "Job Fair 2024",
        category: "Recruitment",
        subcategory: "Advertisement",
        amount: 10000,
        date: "10 Feb 2024",
        status: "approved",
        createdAt: "2024-02-10",
      },
      // Additional samples
      {
        id: 4,
        name: "Office Furniture",
        category: "Technology",
        subcategory: "Hardware Cost",
        amount: 15000,
        date: "15 Mar 2024",
        status: "approved",
        createdAt: "2024-03-15",
      },
      {
        id: 5,
        name: "Travel Allowance",
        category: "Travel",
        subcategory: "Business Travel",
        amount: 25000,
        date: "20 Apr 2024",
        status: "pending",
        createdAt: "2024-04-20",
      },
    ]

    let filtered = [...allExpenses]
    
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(exp => exp.category === filters.category)
    }
    
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter(exp => exp.status === filters.status)
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(exp => 
        exp.name.toLowerCase().includes(searchLower) ||
        exp.category.toLowerCase().includes(searchLower) ||
        exp.subcategory.toLowerCase().includes(searchLower)
      )
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginated = filtered.slice(startIndex, endIndex)

    return {
      data: paginated,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    }
  },

  createExpense: async (expense) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    const newExpense = { ...expense, id: Date.now(), amount: parseFloat(expense.amount), status: "pending", createdAt: new Date().toISOString().split('T')[0] }
    return newExpense
  },

  updateExpense: async (id, expense) => {
    await new Promise(resolve => setTimeout(resolve, 600))
    return { id, ...expense, amount: parseFloat(expense.amount) }
  },

  deleteExpense: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 400))
    return id
  },

  bulkDelete: async (ids) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return ids
  }
}

// Simple notification function
const notify = (message, type = "success") => {
  const toastElement = document.createElement("div")
  toastElement.innerHTML = `
    <div class="fixed top-4 right-4 z-[9999] ${type === "success" ? "bg-green-500" : "bg-red-500"} 
         text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm animate-in slide-in-from-right duration-300">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        ${type === "success" 
          ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />'
          : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />'
        }
      </svg>
      <span class="text-sm font-medium">${message}</span>
    </div>
  `
  
  document.body.appendChild(toastElement.firstChild)
  
  setTimeout(() => {
    if (toastElement.firstChild) {
      toastElement.firstChild.remove()
    }
  }, 3000)
}

const BudgetExpenses = () => {
  const [expenses, setExpenses] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedExpenses, setSelectedExpenses] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)

  // Form
  const form = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: "",
      category: "",
      subcategory: "",
      amount: "",
      date: "",
    },
  })

  const fetchExpenses = async () => {
    setLoading(true)
    try {
      const filters = {
        search: searchTerm || undefined,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
      }
      const response = await mockAPI.getExpenses(currentPage, 10, filters)
      setExpenses(response.data)
      setTotal(response.total)
      setTotalPages(response.totalPages)
    } catch (error) {
      notify("Failed to fetch expenses", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [currentPage, searchTerm, categoryFilter, statusFilter])

  const handleCreateExpense = async (data) => {
    try {
      await mockAPI.createExpense(data)
      form.reset()
      setIsAddModalOpen(false)
      notify("Expense created successfully!", "success")
      fetchExpenses()
    } catch (error) {
      notify("Failed to create expense", "error")
    }
  }

  const handleUpdateExpense = async (data) => {
    if (!editingExpense) return
    try {
      await mockAPI.updateExpense(editingExpense.id, data)
      setIsEditModalOpen(false)
      setEditingExpense(null)
      notify("Expense updated successfully!", "success")
      fetchExpenses()
    } catch (error) {
      notify("Failed to update expense", "error")
    }
  }

  const handleDeleteExpense = async (id) => {
    if (!confirm("Are you sure you want to delete this expense?")) return
    try {
      await mockAPI.deleteExpense(id)
      notify("Expense deleted successfully!", "success")
      fetchExpenses()
    } catch (error) {
      notify("Failed to delete expense", "error")
    }
  }

  const handleBulkDelete = async () => {
    if (selectedExpenses.size === 0) return
    if (!confirm(`Delete ${selectedExpenses.size} selected expenses?`)) return
    
    try {
      const ids = Array.from(selectedExpenses)
      await mockAPI.bulkDelete(ids)
      setSelectedExpenses(new Set())
      notify(`Deleted ${ids.length} expenses`, "success")
      fetchExpenses()
    } catch (error) {
      notify("Failed to delete selected expenses", "error")
    }
  }

  const handleExport = () => {
    try {
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Expense Name,Category,Subcategory,Amount,Expense Date\n" +
        expenses.map(exp => 
          `"${exp.name}","${exp.category}","${exp.subcategory}",${exp.amount},"${exp.date}"`
        ).join("\n")
      
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `budget_expenses_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      notify("Expenses exported successfully!", "success")
    } catch (error) {
      notify("Failed to export expenses", "error")
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      approved: "bg-green-100 text-green-800 border border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    }
    return variants[status] || "bg-gray-100 text-gray-800 border border-gray-200"
  }

  const stats = [
    { 
      title: "Total Expenses", 
      value: total.toString(), 
      change: "+5%", 
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    { 
      title: "Total Amount", 
      value: `$${expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}`, 
      change: "+12%", 
      color: "text-red-600",
      bg: "bg-red-100"
    },
    { 
      title: "Pending", 
      value: expenses.filter(e => e.status === "pending").length.toString(), 
      change: "-3%", 
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    },
    { 
      title: "Approved", 
      value: expenses.filter(e => e.status === "approved").length.toString(), 
      change: "+8%", 
      color: "text-green-600",
      bg: "bg-green-100"
    },
  ]

  // Reset form when editing
  useEffect(() => {
    if (editingExpense) {
      form.reset({
        name: editingExpense.name,
        category: editingExpense.category,
        subcategory: editingExpense.subcategory,
        amount: editingExpense.amount.toString(),
        date: editingExpense.date,
      })
    }
  }, [editingExpense, form])

  return (
    <>
      {/* Toast Notification */}
      <Toast 
        message={""} 
        type={"success"}
        duration={3000}
      />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Budget Expenses</h1>
            <p className="text-gray-600">Manage and track budget expenses</p>
          </div>
          <div className="flex gap-2">
            {selectedExpenses.size > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBulkDelete}
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedExpenses.size})
              </Button>
            )}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                  <DialogDescription>Create a new budget expense</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreateExpense)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expense Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Servers" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Technology" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subcategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subcategory</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Hardware Cost" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount ($)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="20000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expense Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="w-full">
                        Create Expense
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`text-sm font-medium ${stat.color} flex items-center gap-1`}>
                    <span>{stat.change}</span>
                    <span className={`w-2 h-2 rounded-full ${stat.bg}`}></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table Controls */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedExpenses.size === expenses.length && expenses.length > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedExpenses(new Set(expenses.map(e => e.id)))
                    } else {
                      setSelectedExpenses(new Set())
                    }
                  }}
                />
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  Expense Records ({total})
                </CardTitle>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={(value) => {
                  setCategoryFilter(value)
                  setCurrentPage(1)
                }}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Taxes">Taxes</SelectItem>
                    <SelectItem value="Recruitment">Recruitment</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={(value) => {
                  setStatusFilter(value)
                  setCurrentPage(1)
                }}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : expenses.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
                <p className="text-gray-500 mb-6">Get started by creating your first expense</p>
                <Button onClick={() => setIsAddModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Expense
                </Button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedExpenses.size === expenses.length && expenses.length > 0}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedExpenses(new Set(expenses.map(e => e.id)))
                              } else {
                                setSelectedExpenses(new Set())
                              }
                            }}
                          />
                        </TableHead>
                        <TableHead>Expense Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Subcategory</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Expense Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenses.map((expense) => (
                        <TableRow key={expense.id} className="hover:bg-gray-50">
                          <TableCell>
                            <Checkbox
                              checked={selectedExpenses.has(expense.id)}
                              onCheckedChange={(checked) => {
                                const newSelected = new Set(selectedExpenses)
                                if (checked) {
                                  newSelected.add(expense.id)
                                } else {
                                  newSelected.delete(expense.id)
                                }
                                setSelectedExpenses(newSelected)
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{expense.name}</TableCell>
                          <TableCell>{expense.category}</TableCell>
                          <TableCell>{expense.subcategory}</TableCell>
                          <TableCell className="text-right font-medium text-red-600">
                            ${expense.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              {expense.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(expense.status)}>
                              {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <Dialog open={isEditModalOpen && editingExpense?.id === expense.id} onOpenChange={() => {
                                  if (editingExpense?.id === expense.id) {
                                    setIsEditModalOpen(false)
                                    setEditingExpense(null)
                                  }
                                }}>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => {
                                      e.preventDefault()
                                      setEditingExpense(expense)
                                      setIsEditModalOpen(true)
                                    }}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md">
                                    <DialogHeader>
                                      <DialogTitle>Edit Expense</DialogTitle>
                                      <DialogDescription>Update expense details</DialogDescription>
                                    </DialogHeader>
                                    <Form {...form}>
                                      <form onSubmit={form.handleSubmit(handleUpdateExpense)} className="space-y-4">
                                        <FormField
                                          control={form.control}
                                          name="name"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Expense Name</FormLabel>
                                              <FormControl>
                                                <Input {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={form.control}
                                          name="category"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Category</FormLabel>
                                              <FormControl>
                                                <Input {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={form.control}
                                          name="subcategory"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Subcategory</FormLabel>
                                              <FormControl>
                                                <Input {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                          <FormField
                                            control={form.control}
                                            name="amount"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Amount ($)</FormLabel>
                                                <FormControl>
                                                  <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          <FormField
                                            control={form.control}
                                            name="date"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Expense Date</FormLabel>
                                                <FormControl>
                                                  <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        </div>
                                        <DialogFooter>
                                          <Button type="submit" className="w-full">
                                            Update Expense
                                          </Button>
                                        </DialogFooter>
                                      </form>
                                    </Form>
                                  </DialogContent>
                                </Dialog>
                                <DropdownMenuItem onSelect={(e) => {
                                  e.preventDefault()
                                  window.open(`/expenses/${expense.id}`, '_blank')
                                }}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>View Details</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    notify("Receipt downloaded!", "success")
                                  }}
                                  className="text-blue-600"
                                >
                                  <FileDown className="mr-2 h-4 w-4" />
                                  <span>Download Receipt</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    handleDeleteExpense(expense.id)
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-2 py-4">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <Button
                        variant="outline" 
                        size="sm" 
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                    <div className="hidden sm:flex flex-1 justify-between items-center">
                      <div className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                      </div>
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const page = i + 1
                            const isActive = page === currentPage
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink 
                                  isActive={isActive}
                                  onClick={() => setCurrentPage(page)}
                                  className={isActive ? "bg-blue-600 text-white" : ""}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          })}
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default BudgetExpenses