import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Download, Plus, MoreHorizontal, Edit, Trash2, Eye, Users, UserCheck, UserX, UserPlus, X, ChevronDown, SlidersHorizontal } from "lucide-react"

const initialEmployeesData = [
  {
    id: "Emp-001",
    name: "Anthony Lewis",
    email: "anthony@example.com",
    phone: "(123) 4567 890",
    designation: "Finance",
    joiningDate: "12 Sep 2024",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "Emp-002",
    name: "Brian Villalobos",
    email: "brian@example.com",
    phone: "(179) 7382 829",
    designation: "Developer",
    joiningDate: "24 Oct 2024",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "Emp-003",
    name: "Harvey Smith",
    email: "harvey@example.com",
    phone: "(184) 2719 738",
    designation: "Developer",
    joiningDate: "18 Feb 2024",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "Emp-004",
    name: "Stephan Peralt",
    email: "peral@example.com",
    phone: "(193) 7839 748",
    designation: "Executive",
    joiningDate: "17 Oct 2024",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "Emp-005",
    name: "Doglas Martini",
    email: "martiniwr@example.com",
    phone: "(183) 9302 890",
    designation: "Manager",
    joiningDate: "20 Jul 2024",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "Emp-006",
    name: "Linda Ray",
    email: "ray456@example.com",
    phone: "(120) 3728 039",
    designation: "Finance",
    joiningDate: "10 Apr 2024",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "Emp-007",
    name: "Elliot Murray",
    email: "murray@example.com",
    phone: "(102) 8480 832",
    designation: "Developer",
    joiningDate: "29 Aug 2024",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "Emp-008",
    name: "Rebecca Smith",
    email: "smith@example.com",
    phone: "(162) 8920 713",
    designation: "Executive",
    joiningDate: "22 Feb 2024",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "Emp-009",
    name: "Connie Waters",
    email: "connie@example.com",
    phone: "(189) 0920 723",
    designation: "Developer",
    joiningDate: "03 Nov 2024",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "Emp-010",
    name: "Lori Broaddus",
    email: "broaddus@example.com",
    phone: "(168) 8392 823",
    designation: "Finance",
    joiningDate: "17 Dec 2024",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployeesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState(["active", "inactive"])
  const [selectedDesignations, setSelectedDesignations] = useState(["Finance", "Developer", "Manager", "Executive"])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    joiningDate: "",
  })

  // Calculate stats dynamically
  const totalEmployees = employees.length
  const activeEmployees = employees.filter(emp => emp.status === "active").length
  const inactiveEmployees = employees.filter(emp => emp.status === "inactive").length
  const newThisMonth = employees.filter(emp => {
    const joinDate = new Date(emp.joiningDate)
    const currentDate = new Date()
    return joinDate.getMonth() === currentDate.getMonth() && joinDate.getFullYear() === currentDate.getFullYear()
  }).length

  const employeeStats = [
    { title: "Total Employees", value: totalEmployees.toString(), change: "+19.01%", icon: Users, gradient: "from-orange-500 to-orange-600" },
    { title: "Active", value: activeEmployees.toString(), change: "+19.01%", icon: UserCheck, gradient: "from-green-500 to-green-600" },
    { title: "Inactive", value: inactiveEmployees.toString(), change: "+19.01%", icon: UserX, gradient: "from-red-500 to-red-600" },
    { title: "New This Month", value: newThisMonth.toString(), change: "+19.01%", icon: UserPlus, gradient: "from-purple-500 to-purple-600" },
  ]

  const toggleStatus = (status) => {
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    )
    setCurrentPage(1)
  }

  const toggleDesignation = (designation) => {
    setSelectedDesignations(prev => 
      prev.includes(designation) ? prev.filter(d => d !== designation) : [...prev, designation]
    )
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedStatuses(["active", "inactive"])
    setSelectedDesignations(["Finance", "Developer", "Manager", "Executive"])
    setCurrentPage(1)
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatuses.includes(employee.status)
    const matchesDesignation = selectedDesignations.includes(employee.designation)

    return matchesSearch && matchesStatus && matchesDesignation
  })

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage)

  const activeFiltersCount = (selectedStatuses.length < 2 ? 1 : 0) + 
    (selectedDesignations.length < 4 ? 1 : 0) + 
    (searchTerm ? 1 : 0)

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      designation: "",
      joiningDate: "",
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const day = String(date.getDate()).padStart(2, '0')
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  }

  const handleAddEmployee = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all required fields")
      return
    }

    const newEmployee = {
      id: `Emp-${String(employees.length + 1).padStart(3, '0')}`,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      designation: formData.designation || "Not Assigned",
      joiningDate: formData.joiningDate ? formatDate(formData.joiningDate) : formatDate(new Date()),
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
    }
    
    setEmployees([...employees, newEmployee])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditEmployee = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all required fields")
      return
    }

    setEmployees(employees.map(emp => 
      emp.id === selectedEmployee.id 
        ? {
            ...emp,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            designation: formData.designation,
            joiningDate: formData.joiningDate,
          }
        : emp
    ))
    setIsEditDialogOpen(false)
    setSelectedEmployee(null)
    resetForm()
  }

  const handleDeleteEmployee = () => {
    setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id))
    setIsDeleteDialogOpen(false)
    setSelectedEmployee(null)
  }

  const openEditDialog = (employee) => {
    const [firstName, ...lastNameParts] = employee.name.split(' ')
    setFormData({
      firstName,
      lastName: lastNameParts.join(' '),
      email: employee.email,
      phone: employee.phone,
      designation: employee.designation,
      joiningDate: employee.joiningDate,
    })
    setSelectedEmployee(employee)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (employee) => {
    setSelectedEmployee(employee)
    setIsDeleteDialogOpen(true)
  }

  const toggleEmployeeStatus = (employeeId) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId 
        ? { ...emp, status: emp.status === "active" ? "inactive" : "active" }
        : emp
    ))
  }

  const exportToCSV = () => {
    const headers = ["Employee ID", "Name", "Email", "Phone", "Designation", "Joining Date", "Status"]
    const csvContent = [
      headers.join(","),
      ...filteredEmployees.map(emp => 
        [emp.id, emp.name, emp.email, emp.phone, emp.designation, emp.joiningDate, emp.status].join(",")
      )
    ].join("\n")

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'employees.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-4xl font-bold ">
              Employee Management
            </h1>
            <p className="text-gray-600 mt-2">Manage and monitor your workforce</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="default" 
              onClick={exportToCSV}
              className="shadow-sm border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="default" 
                  className="shadow-lg bg-gradient-to-r from-orange-600 via-orange-600 to-orange-600 hover:from-orange-700 hover:via-orange-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Add New Employee
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name *</label>
                    <Input 
                      placeholder="Enter first name" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name *</label>
                    <Input 
                      placeholder="Enter last name" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input 
                      type="email" 
                      placeholder="Enter email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input 
                      placeholder="Enter phone number" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Designation</label>
                    <Input 
                      placeholder="Enter designation" 
                      value={formData.designation}
                      onChange={(e) => setFormData({...formData, designation: e.target.value})}
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Joining Date</label>
                    <Input 
                      type="date" 
                      value={formData.joiningDate}
                      onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetForm(); }}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddEmployee}
                    disabled={!formData.firstName || !formData.lastName || !formData.email}
                    className="bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-700 hover:to-orange-700"
                  >
                    Add Employee
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {employeeStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <div className={`bg-gradient-to-br ${stat.gradient} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Icon className="h-8 w-8" />
                      </div>
                      <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm shadow-lg">{stat.change}</Badge>
                    </div>
                    <p className="text-sm font-medium opacity-90 mb-1">{stat.title}</p>
                    <p className="text-4xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Table Card */}
      <Card className="border-0 shadow-2xl overflow-hidden backdrop-blur-sm bg-white/80">
        <CardHeader className="border-b bg-gradient-to-r from-white to-blue-50/50">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Employee Directory
              </CardTitle>
              
              {/* Advanced Filters */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email or ID..."
                    className="pl-10 w-80 shadow-md border-2 hover:border-blue-300 focus:border-blue-500 transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="default" 
                      className="shadow-md relative border-2 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 shadow-xl border-2">
                    <DropdownMenuLabel className="text-blue-600 font-semibold">Filter by Status</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatuses.includes("active")}
                      onCheckedChange={() => toggleStatus("active")}
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        Active
                      </div>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatuses.includes("inactive")}
                      onCheckedChange={() => toggleStatus("inactive")}
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        Inactive
                      </div>
                    </DropdownMenuCheckboxItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuLabel className="text-blue-600 font-semibold">Filter by Designation</DropdownMenuLabel>
                    {["Finance", "Developer", "Manager", "Executive"].map((designation) => (
                      <DropdownMenuCheckboxItem
                        key={designation}
                        checked={selectedDesignations.includes(designation)}
                        onCheckedChange={() => toggleDesignation(designation)}
                      >
                        {designation}
                      </DropdownMenuCheckboxItem>
                    ))}
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={clearAllFilters} className="text-red-600">
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-100">
                <span className="text-sm text-blue-700 font-semibold">Active Filters:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="gap-1 bg-white shadow-sm hover:shadow-md transition-shadow">
                    Search: {searchTerm}
                    <button onClick={() => setSearchTerm("")} className="ml-1 hover:bg-gray-300 rounded-full p-0.5 transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedStatuses.length < 2 && selectedStatuses.map(status => (
                  <Badge key={status} variant="secondary" className="gap-1 bg-white shadow-sm hover:shadow-md transition-shadow">
                    Status: {status}
                    <button onClick={() => toggleStatus(status)} className="ml-1 hover:bg-gray-300 rounded-full p-0.5 transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedDesignations.length < 4 && selectedDesignations.map(designation => (
                  <Badge key={designation} variant="secondary" className="gap-1 bg-white shadow-sm hover:shadow-md transition-shadow">
                    {designation}
                    <button onClick={() => toggleDesignation(designation)} className="ml-1 hover:bg-gray-300 rounded-full p-0.5 transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters} 
                  className="h-6 text-xs hover:bg-red-100 hover:text-red-600 transition-colors"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50/30 border-b">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Show</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 hover:border-blue-300 hover:bg-blue-50 transition-all">
                    {itemsPerPage}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => { setItemsPerPage(10); setCurrentPage(1); }}>10</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setItemsPerPage(25); setCurrentPage(1); }}>25</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setItemsPerPage(50); setCurrentPage(1); }}>50</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setItemsPerPage(100); setCurrentPage(1); }}>100</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="text-sm text-gray-600 font-medium">entries</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Showing {filteredEmployees.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} employees
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50/30">
                  <TableHead className="font-semibold">Employee ID</TableHead>
                  <TableHead className="font-semibold">Employee</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">Designation</TableHead>
                  <TableHead className="font-semibold">Joining Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Users className="h-12 w-12 opacity-20" />
                        <p className="font-medium">No employees found</p>
                        <p className="text-sm">Try adjusting your filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedEmployees.map((employee) => (
                    <TableRow key={employee.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                      <TableCell className="font-medium text-gray-900">{employee.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 ring-2 ring-blue-100 shadow-sm">
                            <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold">
                              {employee.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{employee.name}</p>
                            <p className="text-sm text-gray-500">{employee.designation}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm text-gray-900">{employee.email}</p>
                          <p className="text-sm text-gray-500">{employee.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium border-blue-200 text-blue-700 bg-blue-50">
                          {employee.designation}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">{employee.joiningDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={employee.status === "active" 
                            ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 hover:from-green-200 hover:to-emerald-200 border-green-200 shadow-sm cursor-pointer" 
                            : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 hover:from-red-200 hover:to-rose-200 border-red-200 shadow-sm cursor-pointer"
                          }
                          onClick={() => toggleEmployeeStatus(employee.id)}
                        >
                          <div className={`h-1.5 w-1.5 rounded-full mr-1.5 animate-pulse ${employee.status === "active" ? "bg-green-500" : "bg-red-500"}`} />
                          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="shadow-xl border-2">
                            <DropdownMenuItem className="hover:bg-blue-50 transition-colors cursor-pointer">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => openEditDialog(employee)}
                              className="hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Employee
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              onClick={() => openDeleteDialog(employee)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {paginatedEmployees.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t bg-gradient-to-r from-gray-50 to-blue-50/30">
              <p className="text-sm text-gray-600 font-medium">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-50"
                >
                  Previous
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 p-0 transition-all ${
                          currentPage === pageNum 
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg" 
                            : "hover:bg-blue-50 hover:border-blue-300"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Edit Employee
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name *</label>
              <Input 
                placeholder="Enter first name" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="border-2 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name *</label>
              <Input 
                placeholder="Enter last name" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="border-2 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email *</label>
              <Input 
                type="email" 
                placeholder="Enter email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="border-2 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input 
                placeholder="Enter phone number" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="border-2 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Designation</label>
              <Input 
                placeholder="Enter designation" 
                value={formData.designation}
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
                className="border-2 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Joining Date</label>
              <Input 
                type="text" 
                placeholder="Enter date"
                value={formData.joiningDate}
                onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                className="border-2 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => { 
                setIsEditDialogOpen(false); 
                setSelectedEmployee(null); 
                resetForm(); 
              }}
              className="hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleEditEmployee}
              disabled={!formData.firstName || !formData.lastName || !formData.email}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-600">
              Confirm Delete
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Are you sure you want to delete <span className="font-semibold">{selectedEmployee?.name}</span>? 
              This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => { 
                setIsDeleteDialogOpen(false); 
                setSelectedEmployee(null); 
              }}
              className="hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteEmployee}
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg"
            >
              Delete Employee
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}