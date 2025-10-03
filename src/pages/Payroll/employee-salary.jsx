 
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
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
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
const employeeSchema = z.object({
  empId: z.string().min(1, "Employee ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  designation: z.string().min(1, "Designation is required"),
  joiningDate: z.string().min(1, "Joining date is required"),
  salary: z.string().min(1, "Salary is required"),
})

// Mock API functions
const mockAPI = {
  getEmployees: async (page = 1, limit = 10, filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const allEmployees = [
      {
        id: 1,
        empId: "Emp-001",
        name: "",
        email: "john@example.com",
        phone: "(123) 4567 890",
        designation: "",
        joiningDate: "12 Sep 2024",
        salary: 40000,
        image: null,
      },
      {
        id: 2,
        empId: "Emp-002",
        name: "",
        email: "jane@example.com",
        phone: "(179) 7382 829",
        designation: "",
        joiningDate: "24 Oct 2024",
        salary: 35000,
        image: null,
      },
      {
        id: 3,
        empId: "Emp-003",
        name: "Harvey Smith",
        email: "harvey@example.com",
        phone: "(184) 2719 738",
        designation: "Developer",
        joiningDate: "18 Feb 2024",
        salary: 20000,
        image: "/placeholder.svg",
      },
      {
        id: 4,
        empId: "Emp-004",
        name: "Stephan Peralt",
        email: "stephan@example.com",
        phone: "(193) 7839 748",
        designation: "Executive Officer",
        joiningDate: "17 Oct 2024",
        salary: 22000,
        image: "/placeholder.svg",
      },
      {
        id: 5,
        empId: "Emp-005",
        name: "",
        email: "mike@example.com",
        phone: "(183) 9302 890",
        designation: "",
        joiningDate: "20 Jul 2024",
        salary: 25000,
        image: null,
      },
      {
        id: 6,
        empId: "Emp-006",
        name: "Linda Ray",
        email: "linda@example.com",
        phone: "(120) 3728 039",
        designation: "Finance",
        joiningDate: "10 Apr 2024",
        salary: 30000,
        image: "/placeholder.svg",
      },
      {
        id: 7,
        empId: "Emp-007",
        name: "Elliot Murray",
        email: "elliot@example.com",
        phone: "(102) 8480 832",
        designation: "Developer",
        joiningDate: "29 Aug 2024",
        salary: 35000,
        image: "/placeholder.svg",
      },
      {
        id: 8,
        empId: "Emp-008",
        name: "Rebecca Smith",
        email: "rebecca@example.com",
        phone: "(162) 8920 713",
        designation: "Executive",
        joiningDate: "22 Feb 2024",
        salary: 45000,
        image: "/placeholder.svg",
      },
      {
        id: 9,
        empId: "Emp-009",
        name: "Connie Waters",
        email: "connie@example.com",
        phone: "(189) 0920 723",
        designation: "Developer",
        joiningDate: "03 Nov 2024",
        salary: 50000,
        image: "/placeholder.svg",
      },
      {
        id: 10,
        empId: "Emp-010",
        name: "",
        email: "sarah@example.com",
        phone: "(168) 8392 823",
        designation: "",
        joiningDate: "17 Dec 2024",
        salary: 25000,
        image: null,
      },
    ]

    let filtered = [...allEmployees]
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(emp => 
        emp.empId.toLowerCase().includes(searchLower) ||
        (emp.name && emp.name.toLowerCase().includes(searchLower)) ||
        emp.email.toLowerCase().includes(searchLower) ||
        (emp.designation && emp.designation.toLowerCase().includes(searchLower))
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

  createEmployee: async (employee) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    const newEmployee = { 
      ...employee, 
      id: Date.now(),
      salary: parseFloat(employee.salary),
      createdAt: new Date().toISOString().split('T')[0],
    }
    return newEmployee
  },

  updateEmployee: async (id, employee) => {
    await new Promise(resolve => setTimeout(resolve, 600))
    return { id, ...employee, salary: parseFloat(employee.salary) }
  },

  deleteEmployee: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 400))
    return id
  },

  generatePayslip: async (empId) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return `Payslip_${empId}_${new Date().toISOString().split('T')[0]}.pdf`
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

const EmployeeSalary = () => {
  const [employees, setEmployees] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)

  // Form
  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      empId: "",
      name: "",
      email: "",
      phone: "",
      designation: "",
      joiningDate: "",
      salary: "",
    },
  })

  const fetchEmployees = async () => {
    setLoading(true)
    try {
      const filters = {
        search: searchTerm,
      }
      const response = await mockAPI.getEmployees(currentPage, 10, filters)
      setEmployees(response.data)
      setTotal(response.total)
      setTotalPages(response.totalPages)
    } catch (error) {
      notify("Failed to fetch employees", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [currentPage, searchTerm])

  const handleCreateEmployee = async (data) => {
    try {
      await mockAPI.createEmployee(data)
      form.reset()
      setIsAddModalOpen(false)
      notify("Employee created successfully!", "success")
      fetchEmployees()
    } catch (error) {
      notify("Failed to create employee", "error")
    }
  }

  const handleUpdateEmployee = async (data) => {
    if (!editingEmployee) return
    try {
      await mockAPI.updateEmployee(editingEmployee.id, data)
      setIsEditModalOpen(false)
      setEditingEmployee(null)
      notify("Employee updated successfully!", "success")
      fetchEmployees()
    } catch (error) {
      notify("Failed to update employee", "error")
    }
  }

  const handleDeleteEmployee = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return
    try {
      await mockAPI.deleteEmployee(id)
      notify("Employee deleted successfully!", "success")
      fetchEmployees()
    } catch (error) {
      notify("Failed to delete employee", "error")
    }
  }

  const handleGeneratePayslip = async (empId) => {
    try {
      await mockAPI.generatePayslip(empId)
      notify("Payslip generated successfully!", "success")
    } catch (error) {
      notify("Failed to generate payslip", "error")
    }
  }

  // Export function - FIXED
  const handleExport = () => {
    try {
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Emp ID,Name,Email,Phone,Designation,Joining Date,Salary\n" +
        employees.map(employee => 
          `"${employee.empId}","${employee.name || ''}","${employee.email}","${employee.phone}","${employee.designation || ''}","${employee.joiningDate}",${employee.salary}`
        ).join("\n")
      
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `employee-salary_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      notify("Employee data exported successfully!", "success")
    } catch (error) {
      notify("Failed to export employee data", "error")
    }
  }

  const stats = [
    { 
      title: "Total Employees", 
      value: total.toString(), 
      change: "+3%", 
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    { 
      title: "Total Salary", 
      value: `$${employees.reduce((sum, e) => sum + e.salary, 0).toLocaleString()}`, 
      change: "+8%", 
      color: "text-green-600",
      bg: "bg-green-100"
    },
    { 
      title: "Developers", 
      value: employees.filter(e => e.designation === "Developer").length.toString(), 
      change: "+2%", 
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    { 
      title: "Executives", 
      value: employees.filter(e => e.designation === "Executive" || e.designation === "Executive Officer").length.toString(), 
      change: "+1%", 
      color: "text-indigo-600",
      bg: "bg-indigo-100"
    },
  ]

  // Reset form when editing
  useEffect(() => {
    if (editingEmployee) {
      form.reset({
        empId: editingEmployee.empId,
        name: editingEmployee.name,
        email: editingEmployee.email,
        phone: editingEmployee.phone,
        designation: editingEmployee.designation,
        joiningDate: editingEmployee.joiningDate,
        salary: editingEmployee.salary.toString(),
      })
    }
  }, [editingEmployee, form])

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
            <h1 className="text-2xl font-bold text-gray-900">Employee Salary</h1>
            <p className="text-gray-600">Manage employee salary and payslips</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                  <DialogDescription>Create a new employee salary record</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreateEmployee)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="empId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employee ID</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Emp-001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 4567 890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Designation</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Developer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="joiningDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Joining Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Salary ($)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="40000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="w-full">
                        Create Employee
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
                <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                Employee Records ({total})
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
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
            ) : employees.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
                <p className="text-gray-500 mb-6">Get started by creating your first employee record</p>
                <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Employee
                </Button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Emp ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Designation</TableHead>
                        <TableHead>Joining Date</TableHead>
                        <TableHead className="text-right">Salary</TableHead>
                        <TableHead className="text-right">Payslip</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees.map((employee) => (
                        <TableRow key={employee.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{employee.empId}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              {employee.image && (
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={employee.image} />
                                  <AvatarFallback>
                                    {employee.name ? employee.name.charAt(0).toUpperCase() : "E"}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                {employee.name ? (
                                  <>
                                    <div className="font-medium text-sm">
                                      {employee.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('')}
                                    </div>
                                    <div className="text-sm text-gray-900">{employee.name}</div>
                                  </>
                                ) : (
                                  <div className="text-sm text-gray-500">—</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">{employee.email}</TableCell>
                          <TableCell className="text-sm text-gray-600">{employee.phone}</TableCell>
                          <TableCell>
                            {employee.designation ? (
                              <Badge variant="outline" className="text-xs">
                                {employee.designation}
                              </Badge>
                            ) : (
                              <span className="text-sm text-gray-400">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="text-sm text-gray-600">{employee.joiningDate}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium text-green-600">
                            ${employee.salary.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleGeneratePayslip(employee.empId)}
                              className="text-blue-600 hover:bg-blue-50 h-8 px-3"
                            >
                              <FileDown className="w-3 h-3 mr-1" />
                              Generate Slip
                            </Button>
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
                                <Dialog open={isEditModalOpen && editingEmployee?.id === employee.id} onOpenChange={() => {
                                  if (editingEmployee?.id === employee.id) {
                                    setIsEditModalOpen(false)
                                    setEditingEmployee(null)
                                  }
                                }}>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => {
                                      e.preventDefault()
                                      setEditingEmployee(employee)
                                      setIsEditModalOpen(true)
                                    }}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md">
                                    <DialogHeader>
                                      <DialogTitle>Edit Employee</DialogTitle>
                                      <DialogDescription>Update employee details</DialogDescription>
                                    </DialogHeader>
                                    <Form {...form}>
                                      <form onSubmit={form.handleSubmit(handleUpdateEmployee)} className="space-y-4">
                                        <FormField
                                          control={form.control}
                                          name="empId"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Employee ID</FormLabel>
                                              <FormControl>
                                                <Input {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
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
                                          name="email"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Email</FormLabel>
                                              <FormControl>
                                                <Input type="email" {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={form.control}
                                          name="phone"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Phone</FormLabel>
                                              <FormControl>
                                                <Input {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={form.control}
                                          name="designation"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Designation</FormLabel>
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
                                            name="joiningDate"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Joining Date</FormLabel>
                                                <FormControl>
                                                  <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          <FormField
                                            control={form.control}
                                            name="salary"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Salary ($)</FormLabel>
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
                                            Update Employee
                                          </Button>
                                        </DialogFooter>
                                      </form>
                                    </Form>
                                  </DialogContent>
                                </Dialog>
                                <DropdownMenuItem 
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    handleDeleteEmployee(employee.id)
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

export default EmployeeSalary