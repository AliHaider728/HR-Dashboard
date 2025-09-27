
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
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
import  { Checkbox }  from  "../../components/ui/Checkbox.jsx"
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
const budgetSchema = z.object({
  title: z.string().min(1, "Budget title is required"),
  type: z.enum(["Category", "Project"], {
    errorMap: () => ({ message: "Budget type is required" })
  }),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  totalRevenue: z.string().min(1, "Total revenue is required"),
  totalExpense: z.string().min(1, "Total expense is required"),
  taxAmount: z.string().min(1, "Tax amount is required"),
  budgetAmount: z.string().optional(), // Auto-calculated
})

// Mock API functions
const mockAPI = {
  getBudgets: async (page = 1, limit = 10, filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const allBudgets = [
      {
        id: 1,
        title: "Office Supplies",
        type: "Category",
        startDate: "14 Jan 2024",
        endDate: "13 Nov 2024",
        totalRevenue: 250000,
        totalExpense: 150000,
        taxAmount: 10000,
        budgetAmount: 90000, // 250000 - 150000 - 10000
        status: "active",
        createdAt: "2024-01-14",
      },
      {
        id: 2,
        title: "Recruitment",
        type: "Category",
        startDate: "21 Jan 2024",
        endDate: "20 Nov 2024",
        totalRevenue: 300000,
        totalExpense: 200000,
        taxAmount: 15000,
        budgetAmount: 85000, // 300000 - 200000 - 15000
        status: "active",
        createdAt: "2024-01-21",
      },
      {
        id: 3,
        title: "Tender",
        type: "Project",
        startDate: "10 Feb 2024",
        endDate: "08 Dec 2024",
        totalRevenue: 200000,
        totalExpense: 170000,
        taxAmount: 5000,
        budgetAmount: 25000, // 200000 - 170000 - 5000
        status: "active",
        createdAt: "2024-02-10",
      },
      // Additional sample data
      {
        id: 4,
        title: "Marketing Campaign",
        type: "Project",
        startDate: "01 Mar 2024",
        endDate: "30 Sep 2024",
        totalRevenue: 180000,
        totalExpense: 120000,
        taxAmount: 8000,
        budgetAmount: 52000,
        status: "inactive",
        createdAt: "2024-03-01",
      },
      {
        id: 5,
        title: "Training Program",
        type: "Category",
        startDate: "15 Apr 2024",
        endDate: "15 Oct 2024",
        totalRevenue: 400000,
        totalExpense: 250000,
        taxAmount: 20000,
        budgetAmount: 130000,
        status: "active",
        createdAt: "2024-04-15",
      },
    ]

    let filtered = [...allBudgets]
    
    // Apply filters
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter(budget => budget.type === filters.type)
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(budget => 
        budget.title.toLowerCase().includes(searchLower)
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

  createBudget: async (budget) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    // Auto-calculate budgetAmount
    const calculatedBudget = {
      ...budget,
      budgetAmount: parseFloat(budget.totalRevenue) - parseFloat(budget.totalExpense) - parseFloat(budget.taxAmount),
      id: Date.now(),
      status: "active",
      createdAt: new Date().toISOString().split('T')[0],
    }
    return calculatedBudget
  },

  updateBudget: async (id, budget) => {
    await new Promise(resolve => setTimeout(resolve, 600))
    const calculatedBudget = {
      ...budget,
      budgetAmount: parseFloat(budget.totalRevenue) - parseFloat(budget.totalExpense) - parseFloat(budget.taxAmount),
    }
    return { id, ...calculatedBudget }
  },

  deleteBudget: async (id) => {
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

const Budgets = () => {
  const [budgets, setBudgets] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedBudgets, setSelectedBudgets] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState(null)

  // Form
  const form = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      title: "",
      type: "Category",
      startDate: "",
      endDate: "",
      totalRevenue: "",
      totalExpense: "",
      taxAmount: "",
      budgetAmount: "",
    },
  })

  const fetchBudgets = async () => {
    setLoading(true)
    try {
      const filters = {
        search: searchTerm || undefined,
        type: typeFilter !== "all" ? typeFilter : undefined,
      }
      const response = await mockAPI.getBudgets(currentPage, 10, filters)
      setBudgets(response.data)
      setTotal(response.total)
      setTotalPages(response.totalPages)
    } catch (error) {
      notify("Failed to fetch budgets", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBudgets()
  }, [currentPage, searchTerm, typeFilter])

  const calculateBudgetAmount = (revenue, expense, tax) => {
    return parseFloat(revenue || 0) - parseFloat(expense || 0) - parseFloat(tax || 0)
  }

  const handleCreateBudget = async (data) => {
    try {
      const budgetData = {
        ...data,
        totalRevenue: parseFloat(data.totalRevenue),
        totalExpense: parseFloat(data.totalExpense),
        taxAmount: parseFloat(data.taxAmount),
      }
      await mockAPI.createBudget(budgetData)
      form.reset()
      setIsAddModalOpen(false)
      notify("Budget created successfully!", "success")
      fetchBudgets()
    } catch (error) {
      notify("Failed to create budget", "error")
    }
  }

  const handleUpdateBudget = async (data) => {
    if (!editingBudget) return
    try {
      const budgetData = {
        ...data,
        totalRevenue: parseFloat(data.totalRevenue),
        totalExpense: parseFloat(data.totalExpense),
        taxAmount: parseFloat(data.taxAmount),
      }
      await mockAPI.updateBudget(editingBudget.id, budgetData)
      setIsEditModalOpen(false)
      setEditingBudget(null)
      notify("Budget updated successfully!", "success")
      fetchBudgets()
    } catch (error) {
      notify("Failed to update budget", "error")
    }
  }

  const handleDeleteBudget = async (id) => {
    if (!confirm("Are you sure you want to delete this budget?")) return
    try {
      await mockAPI.deleteBudget(id)
      notify("Budget deleted successfully!", "success")
      fetchBudgets()
    } catch (error) {
      notify("Failed to delete budget", "error")
    }
  }

  const handleBulkDelete = async () => {
    if (selectedBudgets.size === 0) return
    if (!confirm(`Delete ${selectedBudgets.size} selected budgets?`)) return
    
    try {
      const ids = Array.from(selectedBudgets)
      await mockAPI.bulkDelete(ids)
      setSelectedBudgets(new Set())
      notify(`Deleted ${ids.length} budgets`, "success")
      fetchBudgets()
    } catch (error) {
      notify("Failed to delete selected budgets", "error")
    }
  }

  const handleExport = () => {
    try {
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Title,Type,Start Date,End Date,Total Revenue,Total Expense,Tax Amount,Budget Amount\n" +
        budgets.map(budget => 
          `"${budget.title}","${budget.type}","${budget.startDate}","${budget.endDate}",${budget.totalRevenue},${budget.totalExpense},${budget.taxAmount},${budget.budgetAmount}`
        ).join("\n")
      
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `budgets_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      notify("Budgets exported successfully!", "success")
    } catch (error) {
      notify("Failed to export budgets", "error")
    }
  }

  const getTypeBadge = (type) => {
    const variants = {
      Category: "bg-blue-100 text-blue-800 border border-blue-200",
      Project: "bg-purple-100 text-purple-800 border border-purple-200",
    }
    return variants[type] || "bg-gray-100 text-gray-800 border border-gray-200"
  }

  const stats = [
    { 
      title: "Total Budgets", 
      value: total.toString(), 
      change: "+4%", 
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    { 
      title: "Total Revenue", 
      value: `$${budgets.reduce((sum, b) => sum + b.totalRevenue, 0).toLocaleString()}`, 
      change: "+15%", 
      color: "text-green-600",
      bg: "bg-green-100"
    },
    { 
      title: "Total Expense", 
      value: `$${budgets.reduce((sum, b) => sum + b.totalExpense, 0).toLocaleString()}`, 
      change: "-2%", 
      color: "text-red-600",
      bg: "bg-red-100"
    },
    { 
      title: "Net Budget", 
      value: `$${budgets.reduce((sum, b) => sum + b.budgetAmount, 0).toLocaleString()}`, 
      change: "+10%", 
      color: "text-indigo-600",
      bg: "bg-indigo-100"
    },
  ]

  // Reset form when editing
  useEffect(() => {
    if (editingBudget) {
      form.reset({
        title: editingBudget.title,
        type: editingBudget.type,
        startDate: editingBudget.startDate,
        endDate: editingBudget.endDate,
        totalRevenue: editingBudget.totalRevenue.toString(),
        totalExpense: editingBudget.totalExpense.toString(),
        taxAmount: editingBudget.taxAmount.toString(),
        budgetAmount: editingBudget.budgetAmount.toString(),
      })
    }
  }, [editingBudget, form])

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
            <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
            <p className="text-gray-600">Manage and track your financial budgets</p>
          </div>
          <div className="flex gap-2">
            {selectedBudgets.size > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBulkDelete}
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedBudgets.size})
              </Button>
            )}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Budget
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Budget</DialogTitle>
                  <DialogDescription>Create a new budget plan</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreateBudget)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Office Supplies" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Category">Category</SelectItem>
                              <SelectItem value="Project">Project</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="totalRevenue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Revenue ($)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="250000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="totalExpense"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Expense ($)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="150000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="taxAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax Amount ($)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="10000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="w-full">
                        Create Budget
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
                  checked={selectedBudgets.size === budgets.length && budgets.length > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedBudgets(new Set(budgets.map(b => b.id)))
                    } else {
                      setSelectedBudgets(new Set())
                    }
                  }}
                />
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  Budget Records ({total})
                </CardTitle>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search budgets..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={typeFilter} onValueChange={(value) => {
                  setTypeFilter(value)
                  setCurrentPage(1)
                }}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Category">Category</SelectItem>
                    <SelectItem value="Project">Project</SelectItem>
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
            ) : budgets.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No budgets found</h3>
                <p className="text-gray-500 mb-6">Get started by creating your first budget</p>
                <Button onClick={() => setIsAddModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Budget
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
                            checked={selectedBudgets.size === budgets.length && budgets.length > 0}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedBudgets(new Set(budgets.map(b => b.id)))
                              } else {
                                setSelectedBudgets(new Set())
                              }
                            }}
                          />
                        </TableHead>
                        <TableHead>Budget Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead className="text-right">Total Revenue</TableHead>
                        <TableHead className="text-right">Total Expense</TableHead>
                        <TableHead className="text-right">Tax Amount</TableHead>
                        <TableHead className="text-right">Budget Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {budgets.map((budget) => (
                        <TableRow key={budget.id} className="hover:bg-gray-50">
                          <TableCell>
                            <Checkbox
                              checked={selectedBudgets.has(budget.id)}
                              onCheckedChange={(checked) => {
                                const newSelected = new Set(selectedBudgets)
                                if (checked) {
                                  newSelected.add(budget.id)
                                } else {
                                  newSelected.delete(budget.id)
                                }
                                setSelectedBudgets(newSelected)
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{budget.title}</TableCell>
                          <TableCell>
                            <Badge className={getTypeBadge(budget.type)}>
                              {budget.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              {budget.startDate}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              {budget.endDate}
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium text-green-600">
                            ${budget.totalRevenue.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right font-medium text-red-600">
                            ${budget.totalExpense.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right font-medium text-orange-600">
                            ${budget.taxAmount.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            ${budget.budgetAmount.toLocaleString()}
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
                                <Dialog open={isEditModalOpen && editingBudget?.id === budget.id} onOpenChange={() => {
                                  if (editingBudget?.id === budget.id) {
                                    setIsEditModalOpen(false)
                                    setEditingBudget(null)
                                  }
                                }}>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => {
                                      e.preventDefault()
                                      setEditingBudget(budget)
                                      setIsEditModalOpen(true)
                                    }}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md">
                                    <DialogHeader>
                                      <DialogTitle>Edit Budget</DialogTitle>
                                      <DialogDescription>Update budget details</DialogDescription>
                                    </DialogHeader>
                                    <Form {...form}>
                                      <form onSubmit={form.handleSubmit(handleUpdateBudget)} className="space-y-4">
                                        <FormField
                                          control={form.control}
                                          name="title"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Budget Title</FormLabel>
                                              <FormControl>
                                                <Input {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={form.control}
                                          name="type"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Budget Type</FormLabel>
                                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                  <SelectTrigger>
                                                    <SelectValue />
                                                  </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                  <SelectItem value="Category">Category</SelectItem>
                                                  <SelectItem value="Project">Project</SelectItem>
                                                </SelectContent>
                                              </Select>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                          <FormField
                                            control={form.control}
                                            name="startDate"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Start Date</FormLabel>
                                                <FormControl>
                                                  <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          <FormField
                                            control={form.control}
                                            name="endDate"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>End Date</FormLabel>
                                                <FormControl>
                                                  <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                          <FormField
                                            control={form.control}
                                            name="totalRevenue"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Total Revenue ($)</FormLabel>
                                                <FormControl>
                                                  <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          <FormField
                                            control={form.control}
                                            name="totalExpense"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Total Expense ($)</FormLabel>
                                                <FormControl>
                                                  <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          <FormField
                                            control={form.control}
                                            name="taxAmount"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Tax Amount ($)</FormLabel>
                                                <FormControl>
                                                  <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        </div>
                                        <DialogFooter>
                                          <Button type="submit" className="w-full">
                                            Update Budget
                                          </Button>
                                        </DialogFooter>
                                      </form>
                                    </Form>
                                  </DialogContent>
                                </Dialog>
                                <DropdownMenuItem onSelect={(e) => {
                                  e.preventDefault()
                                  window.open(`/budgets/${budget.id}`, '_blank')
                                }}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>View Details</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    notify("PDF report generated!", "success")
                                  }}
                                  className="text-blue-600"
                                >
                                  <FileDown className="mr-2 h-4 w-4" />
                                  <span>Download Report</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    handleDeleteBudget(budget.id)
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

export default Budgets