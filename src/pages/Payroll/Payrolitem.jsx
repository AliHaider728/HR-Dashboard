 
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form"
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
import {
  Search,
  Plus,
  MoreHorizontal,
  Download,
  Edit,
  Trash2,
  FileText,
  DollarSign,
  Calendar,
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

  return (
    <div className={`fixed top-4 right-4 z-[9999] ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm animate-in slide-in-from-right duration-300`}>
      <DollarSign className="w-5 h-5" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}

// Form validation schema
const payrollSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().optional(), // For main payroll
  rate: z.string().optional(), // For overtime
  amount: z.string().min(1, "Amount/Rate is required"),
})

// Mock API functions
const mockAPI = {
  getPayrollData: async (tab, page = 1, limit = 10, filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let data = []
    if (tab === 'payroll') {
      data = [
        {
          id: 1,
          name: "Leave Balance Amount",
          category: "Monthly Remuneration",
          amount: "$5",
          createdAt: "2024-01-14",
        },
        {
          id: 2,
          name: "Arrears of Salary",
          category: "Additional Remuneration",
          amount: "$8",
          createdAt: "2024-01-21",
        },
        {
          id: 3,
          name: "Overtime Pay",
          category: "Additional Remuneration",
          amount: "$15",
          createdAt: "2024-02-10",
        },
        {
          id: 4,
          name: "Performance Bonus",
          category: "Monthly Remuneration",
          amount: "$500",
          createdAt: "2024-03-15",
        },
      ]
    } else if (tab === 'overtime') {
      data = [
        {
          id: 1,
          name: "Normal day OT 1.5x",
          rate: "Hourly 1.5",
          createdAt: "2024-01-14",
        },
        {
          id: 2,
          name: "Public holiday OT 3.0x",
          rate: "Hourly 3",
          createdAt: "2024-01-21",
        },
        {
          id: 3,
          name: "Weekend OT 2.0x",
          rate: "Hourly 2",
          createdAt: "2024-02-15",
        },
        {
          id: 4,
          name: "Night Shift OT 1.75x",
          rate: "Hourly 1.75",
          createdAt: "2024-03-10",
        },
      ]
    } else if (tab === 'deduction') {
      data = [
        {
          id: 1,
          name: "Absent amount",
          amount: "$12",
          createdAt: "2024-01-14",
        },
        {
          id: 2,
          name: "Advance",
          amount: "$7",
          createdAt: "2024-01-21",
        },
        {
          id: 3,
          name: "Late penalty",
          amount: "$5",
          createdAt: "2024-02-10",
        },
        {
          id: 4,
          name: "Loan repayment",
          amount: "$50",
          createdAt: "2024-03-15",
        },
        {
          id: 5,
          name: "Medical insurance deduction",
          amount: "$25",
          createdAt: "2024-04-01",
        },
        {
          id: 6,
          name: "Tax deduction",
          amount: "$100",
          createdAt: "2024-04-05",
        },
      ]
    }

    let filtered = [...data]
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        (item.category && item.category.toLowerCase().includes(searchLower)) ||
        (item.rate && item.rate.toLowerCase().includes(searchLower))
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

  createItem: async (tab, item) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    const newItem = { 
      ...item, 
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    }
    return newItem
  },

  updateItem: async (id, item) => {
    await new Promise(resolve => setTimeout(resolve, 600))
    return { id, ...item }
  },

  deleteItem: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 400))
    return id
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

const PayrollItem = () => {
  const [activeTab, setActiveTab] = useState('payroll')
  const [payrollItems, setPayrollItems] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // Form
  const form = useForm({
    resolver: zodResolver(payrollSchema),
    defaultValues: {
      name: "",
      category: "",
      rate: "",
      amount: "",
    },
  })

  const fetchData = async () => {
    setLoading(true)
    try {
      const filters = {
        search: searchTerm,
      }
      const response = await mockAPI.getPayrollData(activeTab, currentPage, 10, filters)
      setPayrollItems(response.data)
      setTotal(response.total)
      setTotalPages(response.totalPages)
    } catch (error) {
      notify("Failed to fetch data", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [activeTab, currentPage, searchTerm])

  const handleCreateItem = async (data) => {
    try {
      await mockAPI.createItem(activeTab, data)
      form.reset()
      setIsAddModalOpen(false)
      notify(`${activeTab} item created successfully!`, "success")
      fetchData()
    } catch (error) {
      notify(`Failed to create ${activeTab} item`, "error")
    }
  }

  const handleUpdateItem = async (data) => {
    if (!editingItem) return
    try {
      await mockAPI.updateItem(editingItem.id, data)
      setIsEditModalOpen(false)
      setEditingItem(null)
      notify(`${activeTab} item updated successfully!`, "success")
      fetchData()
    } catch (error) {
      notify(`Failed to update ${activeTab} item`, "error")
    }
  }

  const handleDeleteItem = async (id) => {
    if (!confirm(`Are you sure you want to delete this ${activeTab} item?`)) return
    try {
      await mockAPI.deleteItem(id)
      notify(`${activeTab} item deleted successfully!`, "success")
      fetchData()
    } catch (error) {
      notify(`Failed to delete ${activeTab} item`, "error")
    }
  }

  const getCategoryBadge = (category) => {
    const variants = {
      "Monthly Remuneration": "bg-blue-100 text-blue-800",
      "Additional Remuneration": "bg-green-100 text-green-800",
    }
    return variants[category] || "bg-gray-100 text-gray-800"
  }

  const getStats = () => {
    let stats = []
    if (activeTab === 'payroll') {
      stats = [
        { 
          title: "Total Payroll Items", 
          value: total.toString(), 
          change: "+2%", 
          color: "text-blue-600",
          bg: "bg-blue-100"
        },
        { 
          title: "Monthly Items", 
          value: payrollItems.filter(i => i.category === "Monthly Remuneration").length.toString(), 
          change: "+1%", 
          color: "text-green-600",
          bg: "bg-green-100"
        },
        { 
          title: "Additional Items", 
          value: payrollItems.filter(i => i.category === "Additional Remuneration").length.toString(), 
          change: "+3%", 
          color: "text-purple-600",
          bg: "bg-purple-100"
        },
        { 
          title: "Total Amount", 
          value: `$${payrollItems.reduce((sum, i) => sum + parseFloat(i.amount.replace('$', '')), 0).toFixed(2)}`, 
          change: "+5%", 
          color: "text-indigo-600",
          bg: "bg-indigo-100"
        },
      ]
    } else if (activeTab === 'overtime') {
      stats = [
        { 
          title: "Total OT Rates", 
          value: total.toString(), 
          change: "+1%", 
          color: "text-blue-600",
          bg: "bg-blue-100"
        },
        { 
          title: "Hourly Rates", 
          value: payrollItems.filter(i => i.rate.includes("Hourly")).length.toString(), 
          change: "+2%", 
          color: "text-green-600",
          bg: "bg-green-100"
        },
        { 
          title: "Weekend Rates", 
          value: payrollItems.filter(i => i.name.includes("Weekend")).length.toString(), 
          change: "+0%", 
          color: "text-purple-600",
          bg: "bg-purple-100"
        },
        { 
          title: "Average Rate", 
          value: `${(payrollItems.reduce((sum, i) => sum + parseFloat(i.rate.replace('Hourly ', '')), 0) / payrollItems.length || 0).toFixed(2)}x`, 
          change: "+4%", 
          color: "text-indigo-600",
          bg: "bg-indigo-100"
        },
      ]
    } else if (activeTab === 'deduction') {
      stats = [
        { 
          title: "Total Deductions", 
          value: total.toString(), 
          change: "+3%", 
          color: "text-blue-600",
          bg: "bg-blue-100"
        },
        { 
          title: "Penalty Items", 
          value: payrollItems.filter(i => i.name.includes("penalty") || i.name.includes("Absent")).length.toString(), 
          change: "+1%", 
          color: "text-red-600",
          bg: "bg-red-100"
        },
        { 
          title: "Loan Items", 
          value: payrollItems.filter(i => i.name.includes("Loan") || i.name.includes("Advance")).length.toString(), 
          change: "+2%", 
          color: "text-purple-600",
          bg: "bg-purple-100"
        },
        { 
          title: "Total Amount", 
          value: `$${payrollItems.reduce((sum, i) => sum + parseFloat(i.amount.replace('$', '')), 0).toFixed(2)}`, 
          change: "+6%", 
          color: "text-indigo-600",
          bg: "bg-indigo-100"
        },
      ]
    }
    return stats
  }

  // Reset form when editing
  useEffect(() => {
    if (editingItem) {
      form.reset({
        name: editingItem.name,
        category: editingItem.category || "",
        rate: editingItem.rate || "",
        amount: editingItem.amount || "",
      })
    }
  }, [editingItem, form, activeTab])

  // FIXED: Corrected table headers function
  const getTableHeaders = () => {
    if (activeTab === 'payroll') {
      return (
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Default / Unit Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      )
    } else if (activeTab === 'overtime') {
      return (
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Rate</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      )
    } else {
      return (
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Default / Unit Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      )
    }
  }

  // FIXED: Corrected table rows function
  const getTableRows = () => {
    if (activeTab === 'payroll') {
      return payrollItems.map((item) => (
        <TableRow key={item.id} className="hover:bg-gray-50">
          <TableCell className="font-medium">{item.name}</TableCell>
          <TableCell>
            <Badge className={getCategoryBadge(item.category)} variant="secondary">
              {item.category}
            </Badge>
          </TableCell>
          <TableCell className="text-right font-medium text-green-600">
            {item.amount}
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
                <Dialog open={isEditModalOpen && editingItem?.id === item.id} onOpenChange={() => {
                  if (editingItem?.id === item.id) {
                    setIsEditModalOpen(false)
                    setEditingItem(null)
                  }
                }}>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => {
                      e.preventDefault()
                      setEditingItem(item)
                      setIsEditModalOpen(true)
                    }}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Payroll Item</DialogTitle>
                      <DialogDescription>Update payroll configuration</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleUpdateItem)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
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
                                <Input placeholder="e.g., Monthly Remuneration" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Default / Unit Amount</FormLabel>
                              <FormControl>
                                <Input placeholder="$5" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <Button type="submit" className="w-full">
                            Update Payroll Item
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <DropdownMenuItem 
                  onSelect={(e) => {
                    e.preventDefault()
                    handleDeleteItem(item.id)
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
      ))
    } else if (activeTab === 'overtime') {
      return payrollItems.map((item) => (
        <TableRow key={item.id} className="hover:bg-gray-50">
          <TableCell className="font-medium">{item.name}</TableCell>
          <TableCell className="text-right font-medium text-blue-600">
            {item.rate}
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
                <Dialog open={isEditModalOpen && editingItem?.id === item.id} onOpenChange={() => {
                  if (editingItem?.id === item.id) {
                    setIsEditModalOpen(false)
                    setEditingItem(null)
                  }
                }}>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => {
                      e.preventDefault()
                      setEditingItem(item)
                      setIsEditModalOpen(true)
                    }}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Overtime Rate</DialogTitle>
                      <DialogDescription>Update overtime configuration</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleUpdateItem)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Normal day OT 1.5x" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="rate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rate</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Hourly 1.5" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <Button type="submit" className="w-full">
                            Update Overtime Rate
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <DropdownMenuItem 
                  onSelect={(e) => {
                    e.preventDefault()
                    handleDeleteItem(item.id)
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
      ))
    } else {
      return payrollItems.map((item) => (
        <TableRow key={item.id} className="hover:bg-gray-50">
          <TableCell className="font-medium">{item.name}</TableCell>
          <TableCell className="text-right font-medium text-red-600">
            {item.amount}
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
                <Dialog open={isEditModalOpen && editingItem?.id === item.id} onOpenChange={() => {
                  if (editingItem?.id === item.id) {
                    setIsEditModalOpen(false)
                    setEditingItem(null)
                  }
                }}>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => {
                      e.preventDefault()
                      setEditingItem(item)
                      setIsEditModalOpen(true)
                    }}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Deduction</DialogTitle>
                      <DialogDescription>Update deduction configuration</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleUpdateItem)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Absent amount" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Default / Unit Amount</FormLabel>
                              <FormControl>
                                <Input placeholder="$12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <Button type="submit" className="w-full">
                            Update Deduction
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <DropdownMenuItem 
                  onSelect={(e) => {
                    e.preventDefault()
                    handleDeleteItem(item.id)
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
      ))
    }
  }

  const getAddButtonText = () => {
    switch (activeTab) {
      case 'payroll':
        return "Add Payroll Item"
      case 'overtime':
        return "Add Overtime Rate"
      case 'deduction':
        return "Add Deduction"
      default:
        return "Add Item"
    }
  }

  const getModalTitle = () => {
    switch (activeTab) {
      case 'payroll':
        return "Add New Payroll Item"
      case 'overtime':
        return "Add New Overtime Rate"
      case 'deduction':
        return "Add New Deduction"
      default:
        return "Add New Item"
    }
  }

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
            <h1 className="text-2xl font-bold text-gray-900">Payroll</h1>
            <p className="text-gray-600">Manage payroll, overtime, and deduction configurations</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {getAddButtonText()}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{getModalTitle()}</DialogTitle>
                  <DialogDescription>Create a new configuration item</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreateItem)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={
                                activeTab === 'payroll' ? "e.g., Leave Balance Amount" :
                                activeTab === 'overtime' ? "e.g., Normal day OT 1.5x" :
                                "e.g., Absent amount"
                              } 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {activeTab === 'payroll' && (
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Monthly Remuneration" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name={activeTab === 'overtime' ? "rate" : "amount"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {activeTab === 'overtime' ? 'Rate' : 'Default / Unit Amount'}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={
                                activeTab === 'overtime' ? "e.g., Hourly 1.5" : "$5"
                              } 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit" className="w-full">
                        Create Item
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payroll" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Payroll
            </TabsTrigger>
            <TabsTrigger value="overtime" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Overtime
            </TabsTrigger>
            <TabsTrigger value="deduction" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Deduction
            </TabsTrigger>
          </TabsList>

          {/* Payroll Tab */}
          <TabsContent value="payroll" className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                    Payroll Items ({total})
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search payroll items..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                          setCurrentPage(1)
                        }}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
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
                ) : payrollItems.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No payroll items found</h3>
                    <p className="text-gray-500 mb-6">Get started by creating your first payroll item</p>
                    <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Payroll Item
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          {getTableHeaders()}
                        </TableHeader>
                        <TableBody>
                          {getTableRows()}
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
          </TabsContent>

          {/* Overtime Tab - FIXED */}
          <TabsContent value="overtime" className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                    Overtime Rates ({total})
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search overtime rates..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                          setCurrentPage(1)
                        }}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
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
                ) : payrollItems.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No overtime rates found</h3>
                    <p className="text-gray-500 mb-6">Get started by creating your first overtime rate</p>
                    <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Overtime Rate
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          {getTableHeaders()}
                        </TableHeader>
                        <TableBody>
                          {getTableRows()}
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
          </TabsContent>

          {/* Deduction Tab */}
          <TabsContent value="deduction" className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-red-600" />
                    Deduction Items ({total})
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search deduction items..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                          setCurrentPage(1)
                        }}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                  </div>
                ) : payrollItems.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No deduction items found</h3>
                    <p className="text-gray-500 mb-6">Get started by creating your first deduction item</p>
                    <Button onClick={() => setIsAddModalOpen(true)} className="bg-red-600 hover:bg-red-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Deduction Item
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          {getTableHeaders()}
                        </TableHeader>
                        <TableBody>
                          {getTableRows()}
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
          </TabsContent>
        </Tabs>

        {/* Statistics Cards - Dynamic based on tab */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getStats().map((stat, index) => (
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
      </div>
    </>
  )
}

export default PayrollItem