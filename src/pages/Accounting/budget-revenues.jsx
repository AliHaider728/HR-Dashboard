
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
import {
  Search,
  Plus,
  MoreHorizontal,
  Download,
  Edit,
  Trash2,
  FileText,
  Calendar,
  DollarSign,
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

  return (
    <div className={`fixed top-4 right-4 z-[9999] ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm animate-in slide-in-from-right duration-300`}>
      <DollarSign className="w-5 h-5" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}

// Form validation schema
const revenueSchema = z.object({
  name: z.string().min(1, "Revenue name is required"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  amount: z.string().min(1, "Amount is required"),
  revenueDate: z.string().min(1, "Revenue date is required"),
})

// Mock API functions
const mockAPI = {
  getRevenues: async (page = 1, limit = 10, filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const allRevenues = [
      {
        id: 1,
        name: "Training Programs",
        category: "Training",
        subcategory: "Employee Training",
        amount: 20000,
        revenueDate: "14 Jan 2024",
        status: "received",
        createdAt: "2024-01-14",
      },
      {
        id: 2,
        name: "Premium Support Packages",
        category: "Support & Maintenance",
        subcategory: "Premium Support",
        amount: 40000,
        revenueDate: "21 Jan 2024",
        status: "pending",
        createdAt: "2024-01-21",
      },
      {
        id: 3,
        name: "Consulting Services",
        category: "Services",
        subcategory: "Consulting",
        amount: 10000,
        revenueDate: "10 Feb 2024",
        status: "received",
        createdAt: "2024-02-10",
      },
      // Additional sample data
      {
        id: 4,
        name: "Software License Sales",
        category: "Product Sales",
        subcategory: "Software Licenses",
        amount: 75000,
        revenueDate: "15 Mar 2024",
        status: "received",
        createdAt: "2024-03-15",
      },
      {
        id: 5,
        name: "Web Development Projects",
        category: "Services",
        subcategory: "Web Development",
        amount: 35000,
        revenueDate: "20 Apr 2024",
        status: "pending",
        createdAt: "2024-04-20",
      },
      {
        id: 6,
        name: "Conference Sponsorship",
        category: "Events",
        subcategory: "Sponsorships",
        amount: 25000,
        revenueDate: "01 May 2024",
        status: "received",
        createdAt: "2024-05-01",
      },
    ]

    let filtered = [...allRevenues]
    
    // Apply filters
    if (filters.category && filters.category.trim()) {
      const searchLower = filters.category.toLowerCase()
      filtered = filtered.filter(revenue => 
        revenue.category.toLowerCase().includes(searchLower) ||
        revenue.subcategory.toLowerCase().includes(searchLower)
      )
    }
    
    if (filters.status && filters.status.trim()) {
      const searchLower = filters.status.toLowerCase()
      filtered = filtered.filter(revenue => 
        revenue.status.toLowerCase().includes(searchLower)
      )
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(revenue => 
        revenue.name.toLowerCase().includes(searchLower) ||
        revenue.category.toLowerCase().includes(searchLower) ||
        revenue.subcategory.toLowerCase().includes(searchLower)
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

  createRevenue: async (revenue) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    const newRevenue = { 
      ...revenue, 
      id: Date.now(),
      amount: parseFloat(revenue.amount),
      status: "pending",
      createdAt: new Date().toISOString().split('T')[0],
    }
    return newRevenue
  },

  updateRevenue: async (id, revenue) => {
    await new Promise(resolve => setTimeout(resolve, 600))
    return { id, ...revenue, amount: parseFloat(revenue.amount) }
  },

  deleteRevenue: async (id) => {
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

const BudgetRevenues = () => {
  const [revenues, setRevenues] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingRevenue, setEditingRevenue] = useState(null)

  // Form
  const form = useForm({
    resolver: zodResolver(revenueSchema),
    defaultValues: {
      name: "",
      category: "",
      subcategory: "",
      amount: "",
      revenueDate: "",
    },
  })

  const fetchRevenues = async () => {
    setLoading(true)
    try {
      const filters = {
        search: searchTerm,
        category: categoryFilter,
        status: statusFilter,
      }
      const response = await mockAPI.getRevenues(currentPage, 10, filters)
      setRevenues(response.data)
      setTotal(response.total)
      setTotalPages(response.totalPages)
    } catch (error) {
      notify("Failed to fetch revenues", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRevenues()
  }, [currentPage, searchTerm, categoryFilter, statusFilter])

  const handleCreateRevenue = async (data) => {
    try {
      await mockAPI.createRevenue(data)
      form.reset()
      setIsAddModalOpen(false)
      notify("Revenue created successfully!", "success")
      fetchRevenues()
    } catch (error) {
      notify("Failed to create revenue", "error")
    }
  }

  const handleUpdateRevenue = async (data) => {
    if (!editingRevenue) return
    try {
      await mockAPI.updateRevenue(editingRevenue.id, data)
      setIsEditModalOpen(false)
      setEditingRevenue(null)
      notify("Revenue updated successfully!", "success")
      fetchRevenues()
    } catch (error) {
      notify("Failed to update revenue", "error")
    }
  }

  const handleDeleteRevenue = async (id) => {
    if (!confirm("Are you sure you want to delete this revenue record?")) return
    try {
      await mockAPI.deleteRevenue(id)
      notify("Revenue deleted successfully!", "success")
      fetchRevenues()
    } catch (error) {
      notify("Failed to delete revenue", "error")
    }
  }

  const handleExport = () => {
    try {
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Revenue Name,Category,Subcategory,Amount,Revenue Date,Status\n" +
        revenues.map(revenue => 
          `"${revenue.name}","${revenue.category}","${revenue.subcategory}",${revenue.amount},"${revenue.revenueDate}","${revenue.status}"`
        ).join("\n")
      
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `budget-revenues_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      notify("Revenues exported successfully!", "success")
    } catch (error) {
      notify("Failed to export revenues", "error")
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      received: "bg-green-100 text-green-800 border border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      overdue: "bg-red-100 text-red-800 border border-red-200",
    }
    return variants[status] || "bg-gray-100 text-gray-800 border border-gray-200"
  }

  const stats = [
    { 
      title: "Total Revenues", 
      value: total.toString(), 
      change: "+6%", 
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    { 
      title: "Total Amount", 
      value: `$${revenues.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}`, 
      change: "+18%", 
      color: "text-green-600",
      bg: "bg-green-100"
    },
    { 
      title: "Received", 
      value: revenues.filter(r => r.status === "received").length.toString(), 
      change: "+4%", 
      color: "text-emerald-600",
      bg: "bg-emerald-100"
    },
    { 
      title: "Pending", 
      value: revenues.filter(r => r.status === "pending").length.toString(), 
      change: "+2%", 
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    },
  ]

  // Reset form when editing
  useEffect(() => {
    if (editingRevenue) {
      form.reset({
        name: editingRevenue.name,
        category: editingRevenue.category,
        subcategory: editingRevenue.subcategory,
        amount: editingRevenue.amount.toString(),
        revenueDate: editingRevenue.revenueDate,
      })
    }
  }, [editingRevenue, form])

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Budget Revenues</h1>
            <p className="text-gray-600">Track and manage your revenue streams</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Revenue
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Revenue</DialogTitle>
                  <DialogDescription>Create a new revenue record</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreateRevenue)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Revenue Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Training Programs" {...field} />
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
                            <Input placeholder="e.g., Training" {...field} />
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
                            <Input placeholder="e.g., Employee Training" {...field} />
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
                        name="revenueDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Revenue Date</FormLabel>
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
                        Create Revenue
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

        {/* Table Controls - NO SELECT, NO CHECKBOX */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Revenue Records ({total})
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search revenues..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Input
                  placeholder="Filter by category..."
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full sm:w-40"
                />
                <Input
                  placeholder="Filter by status..."
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full sm:w-32"
                />
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
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : revenues.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No revenues found</h3>
                <p className="text-gray-500 mb-6">Get started by creating your first revenue record</p>
                <Button onClick={() => setIsAddModalOpen(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Revenue
                </Button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Revenue Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Subcategory</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Revenue Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {revenues.map((revenue) => (
                        <TableRow key={revenue.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{revenue.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              {revenue.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {revenue.subcategory}
                          </TableCell>
                          <TableCell className="text-right font-medium text-green-600">
                            ${revenue.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              {revenue.revenueDate}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(revenue.status)}>
                              {revenue.status.charAt(0).toUpperCase() + revenue.status.slice(1)}
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
                                <Dialog open={isEditModalOpen && editingRevenue?.id === revenue.id} onOpenChange={() => {
                                  if (editingRevenue?.id === revenue.id) {
                                    setIsEditModalOpen(false)
                                    setEditingRevenue(null)
                                  }
                                }}>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => {
                                      e.preventDefault()
                                      setEditingRevenue(revenue)
                                      setIsEditModalOpen(true)
                                    }}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md">
                                    <DialogHeader>
                                      <DialogTitle>Edit Revenue</DialogTitle>
                                      <DialogDescription>Update revenue details</DialogDescription>
                                    </DialogHeader>
                                    <Form {...form}>
                                      <form onSubmit={form.handleSubmit(handleUpdateRevenue)} className="space-y-4">
                                        <FormField
                                          control={form.control}
                                          name="name"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Revenue Name</FormLabel>
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
                                            name="revenueDate"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Revenue Date</FormLabel>
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
                                            Update Revenue
                                          </Button>
                                        </DialogFooter>
                                      </form>
                                    </Form>
                                  </DialogContent>
                                </Dialog>
                                <DropdownMenuItem 
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    notify("Invoice downloaded!", "success")
                                  }}
                                  className="text-green-600"
                                >
                                  <FileDown className="mr-2 h-4 w-4" />
                                  <span>Download Invoice</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    handleDeleteRevenue(revenue.id)
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
                                  className={isActive ? "bg-green-600 text-white" : ""}
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

export default BudgetRevenues