import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Users, Building, TrendingUp, DollarSign, X, ChevronLeft, ChevronRight, ArrowUpDown, Filter, Download, SlidersHorizontal } from "lucide-react"

const departmentsData = [
  {
    id: 1,
    name: "Engineering",
    description: "Software development and technical operations",
    head: "Sarah Johnson",
    headAvatar: "https://images.pexels.com/photos/20889990/pexels-photo-20889990.jpeg",
    employees: 45,
    budget: "$2,400,000",
    performance: 95,
    location: "New York",
    established: "2020-01-15",
  },
  {
    id: 2,
    name: "Sales",
    description: "Revenue generation and client acquisition",
    head: "Mike Davis",
    headAvatar: "https://images.pexels.com/photos/7035238/pexels-photo-7035238.jpeg",
    employees: 28,
    budget: "$1,800,000",
    performance: 88,
    location: "San Francisco",
    established: "2020-03-20",
  },
  {
    id: 3,
    name: "Marketing",
    description: "Brand promotion and digital marketing",
    head: "Emily Brown",
    headAvatar: "https://images.pexels.com/photos/783243/pexels-photo-783243.jpeg",
    employees: 18,
    budget: "$1,200,000",
    performance: 92,
    location: "Austin",
    established: "2020-06-10",
  },
  {
    id: 4,
    name: "Human Resources",
    description: "Employee relations and organizational development",
    head: "David Wilson",
    headAvatar: "https://images.pexels.com/photos/20889986/pexels-photo-20889986.jpeg",
    employees: 12,
    budget: "$800,000",
    performance: 90,
    location: "Chicago",
    established: "2020-02-01",
  },
  {
    id: 5,
    name: "Finance",
    description: "Financial planning and accounting operations",
    head: "Lisa Anderson",
    headAvatar: "https://images.pexels.com/photos/33692533/pexels-photo-33692533.jpeg",
    employees: 15,
    budget: "$1,000,000",
    performance: 94,
    location: "New York",
    established: "2020-01-30",
  },
  {
    id: 6,
    name: "Operations",
    description: "Business operations and process optimization",
    head: "Robert Chen",
    headAvatar: "https://images.pexels.com/photos/33590313/pexels-photo-33590313.jpeg",
    employees: 22,
    budget: "$1,500,000",
    performance: 87,
    location: "Seattle",
    established: "2020-04-15",
  },
]

export default function Departments() {
  const [departments, setDepartments] = useState(departmentsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [performanceFilter, setPerformanceFilter] = useState("all")
  const [employeesFilter, setEmployeesFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
    head: "",
    budget: "",
    location: "",
  })
  const [editDepartment, setEditDepartment] = useState(null)
  const [deleteDepartmentId, setDeleteDepartmentId] = useState(null)
  const [errors, setErrors] = useState({})
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Get unique locations
  const uniqueLocations = [...new Set(departments.map(d => d.location))]

  // Apply filters
  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch = 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesLocation = locationFilter === "all" || dept.location === locationFilter
    
    const matchesPerformance = 
      performanceFilter === "all" ||
      (performanceFilter === "high" && dept.performance >= 90) ||
      (performanceFilter === "medium" && dept.performance >= 80 && dept.performance < 90) ||
      (performanceFilter === "low" && dept.performance < 80)
    
    const matchesEmployees =
      employeesFilter === "all" ||
      (employeesFilter === "large" && dept.employees >= 30) ||
      (employeesFilter === "medium" && dept.employees >= 15 && dept.employees < 30) ||
      (employeesFilter === "small" && dept.employees < 15)
    
    return matchesSearch && matchesLocation && matchesPerformance && matchesEmployees
  })

  // Sorting logic
  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
    if (!sortConfig.key) return 0
    const key = sortConfig.key
    const direction = sortConfig.direction === "asc" ? 1 : -1
    if (key === "budget") {
      const aValue = parseInt(a[key].replace(/[$,]/g, ""))
      const bValue = parseInt(b[key].replace(/[$,]/g, ""))
      return (aValue - bValue) * direction
    }
    if (key === "employees" || key === "performance") {
      return (a[key] - b[key]) * direction
    }
    if (key === "head" || key === "name" || key === "location") {
      return a[key].localeCompare(b[key]) * direction
    }
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedDepartments.length / rowsPerPage)
  const paginatedDepartments = sortedDepartments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setLocationFilter("all")
    setPerformanceFilter("all")
    setEmployeesFilter("all")
    setCurrentPage(1)
  }

  const activeFiltersCount = [
    locationFilter !== "all",
    performanceFilter !== "all",
    employeesFilter !== "all",
  ].filter(Boolean).length

  const validateForm = (data) => {
    const newErrors = {}
    if (!data.name.trim()) newErrors.name = "Department name is required"
    if (!data.head.trim()) newErrors.head = "Department head is required"
    if (!data.budget.trim()) newErrors.budget = "Budget is required"
    else if (!/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/.test(data.budget.replace(/\s/g, "")))
      newErrors.budget = "Invalid budget format (e.g., $1,000,000)"
    if (!data.location.trim()) newErrors.location = "Location is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddDepartment = () => {
    if (validateForm(newDepartment)) {
      const department = {
        id: departments.length + 1,
        ...newDepartment,
        headAvatar: "https://images.pexels.com/photos/33590313/pexels-photo-33590313.jpeg",
        employees: 0,
        performance: 0,
        established: new Date().toISOString().split("T")[0],
      }
      setDepartments([...departments, department])
      setNewDepartment({ name: "", description: "", head: "", budget: "", location: "" })
      setIsAddDialogOpen(false)
      setErrors({})
      setCurrentPage(1)
    }
  }

  const handleEditDepartment = () => {
    if (validateForm(editDepartment)) {
      setDepartments(
        departments.map((dept) =>
          dept.id === editDepartment.id ? { ...editDepartment, headAvatar: dept.headAvatar } : dept
        )
      )
      setIsEditDialogOpen(false)
      setEditDepartment(null)
      setErrors({})
    }
  }

  const handleDeleteDepartment = () => {
    setDepartments(departments.filter((dept) => dept.id !== deleteDepartmentId))
    setIsDeleteDialogOpen(false)
    setDeleteDepartmentId(null)
    if (paginatedDepartments.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleEditClick = (department) => {
    setEditDepartment({ ...department })
    setIsEditDialogOpen(true)
  }

  const handleDeleteClick = (id) => {
    setDeleteDepartmentId(id)
    setIsDeleteDialogOpen(true)
  }

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employees, 0)
  const totalBudget = departments.reduce((sum, dept) => sum + parseInt(dept.budget.replace(/[$,]/g, "")), 0)
  const avgPerformance = Math.round(departments.reduce((sum, dept) => sum + dept.performance, 0) / departments.length)

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return "bg-emerald-500"
    if (performance >= 80) return "bg-orange-500"
    return "bg-amber-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        .sortable-header:hover {
          background: linear-gradient(to right, #eff6ff, #dbeafe);
          cursor: pointer;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="glass-card rounded-2xl p-6 shadow-xl animate-slide-down">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-transparent">
                Departments
              </h1>
              <p className="text-slate-600 mt-1">Manage organizational structure and teams</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Department
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] animate-scale-in">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Add New Department</DialogTitle>
                  <DialogDescription>Create a new department in your organization</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">Department Name *</Label>
                    <Input
                      id="name"
                      value={newDepartment.name}
                      onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                      className="focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Engineering"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
                    <Textarea
                      id="description"
                      value={newDepartment.description}
                      onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                      className="focus:ring-2 focus:ring-orange-500"
                      placeholder="Brief description of the department"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="head" className="text-sm font-semibold">Department Head *</Label>
                    <Input
                      id="head"
                      value={newDepartment.head}
                      onChange={(e) => setNewDepartment({ ...newDepartment, head: e.target.value })}
                      className="focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Sarah Johnson"
                    />
                    {errors.head && <p className="text-red-500 text-xs">{errors.head}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-sm font-semibold">Budget *</Label>
                      <Input
                        id="budget"
                        value={newDepartment.budget}
                        onChange={(e) => setNewDepartment({ ...newDepartment, budget: e.target.value })}
                        className="focus:ring-2 focus:ring-orange-500"
                        placeholder="$1,000,000"
                      />
                      {errors.budget && <p className="text-red-500 text-xs">{errors.budget}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-semibold">Location *</Label>
                      <Input
                        id="location"
                        value={newDepartment.location}
                        onChange={(e) => setNewDepartment({ ...newDepartment, location: e.target.value })}
                        className="focus:ring-2 focus:ring-orange-500"
                        placeholder="e.g., New York"
                      />
                      {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddDepartment} className="bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-700 hover:to-orange-700">
                    Create Department
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
          <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Total Departments</CardTitle>
              <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-500 rounded-lg">
                <Building className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">{departments.length}</div>
              <p className="text-xs text-slate-500 mt-1">Active departments</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Total Employees</CardTitle>
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">{totalEmployees}</div>
              <p className="text-xs text-slate-500 mt-1">Across all departments</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Total Budget</CardTitle>
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">${(totalBudget / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-slate-500 mt-1">Annual allocation</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Avg Performance</CardTitle>
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-slate-800">{avgPerformance}%</div>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getPerformanceColor(avgPerformance)} transition-all duration-500`}
                    style={{ width: `${avgPerformance}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1">Organization average</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Table */}
        <Card className="glass-card border-0 shadow-xl animate-fade-in">
          <CardHeader>
            <div className="space-y-4">
              {/* Search and Actions Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search departments, heads, or descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-10 bg-white border-slate-200 focus:ring-2 focus:ring-orange-500"
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setSearchTerm("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="relative bg-white hover:bg-slate-50 hover:text-black">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-600 text-white text-xs">
                            {activeFiltersCount}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 p-4 space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Location</Label>
                        <Select value={locationFilter} onValueChange={setLocationFilter}>
                          <SelectTrigger className="bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            {uniqueLocations.map(loc => (
                              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Performance</Label>
                        <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
                          <SelectTrigger className="bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Performance</SelectItem>
                            <SelectItem value="high">High (90%+)</SelectItem>
                            <SelectItem value="medium">Medium (80-89%)</SelectItem>
                            <SelectItem value="low">Low (&lt;80%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Team Size</Label>
                        <Select value={employeesFilter} onValueChange={setEmployeesFilter}>
                          <SelectTrigger className="bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Sizes</SelectItem>
                            <SelectItem value="large">Large (30+)</SelectItem>
                            <SelectItem value="medium">Medium (15-29)</SelectItem>
                            <SelectItem value="small">Small (&lt;15)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {activeFiltersCount > 0 && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={clearFilters}
                        >
                          Clear All Filters
                        </Button>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button variant="outline" className="bg-white hover:bg-slate-50">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Active Filters Display */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2">
                  {locationFilter !== "all" && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Location: {locationFilter}
                      <X 
                        className="ml-2 h-3 w-3 cursor-pointer" 
                        onClick={() => setLocationFilter("all")}
                      />
                    </Badge>
                  )}
                  {performanceFilter !== "all" && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Performance: {performanceFilter}
                      <X 
                        className="ml-2 h-3 w-3 cursor-pointer" 
                        onClick={() => setPerformanceFilter("all")}
                      />
                    </Badge>
                  )}
                  {employeesFilter !== "all" && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Team Size: {employeesFilter}
                      <X 
                        className="ml-2 h-3 w-3 cursor-pointer" 
                        onClick={() => setEmployeesFilter("all")}
                      />
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200">
                      <TableHead className="sortable-header font-semibold" onClick={() => handleSort("name")}>
                        <div className="flex items-center gap-2">
                          Department
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="sortable-header font-semibold" onClick={() => handleSort("head")}>
                        <div className="flex items-center gap-2">
                          Head
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="sortable-header font-semibold" onClick={() => handleSort("employees")}>
                        <div className="flex items-center gap-2">
                          Team Size
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="sortable-header font-semibold" onClick={() => handleSort("budget")}>
                        <div className="flex items-center gap-2">
                          Budget
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="sortable-header font-semibold" onClick={() => handleSort("performance")}>
                        <div className="flex items-center gap-2">
                          Performance
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="sortable-header font-semibold" onClick={() => handleSort("location")}>
                        <div className="flex items-center gap-2">
                          Location
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedDepartments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12">
                          <div className="flex flex-col items-center gap-2 text-slate-400">
                            <Building className="h-12 w-12" />
                            <p className="text-lg font-medium">No departments found</p>
                            <p className="text-sm">Try adjusting your filters or search term</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedDepartments.map((department, index) => (
                        <TableRow 
                          key={department.id} 
                          className="hover:bg-orange-50/50 transition-colors duration-150"
                        >
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-semibold text-slate-800">{department.name}</div>
                              <div className="text-sm text-slate-500 line-clamp-1">{department.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 ring-2 ring-white shadow-md">
                                <AvatarImage src={department.headAvatar} alt={department.head} />
                                <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-500 text-white">
                                  {department.head.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-slate-700">{department.head}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                              <Users className="h-3 w-3 mr-1" />
                              {department.employees}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-slate-800">{department.budget}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-semibold text-slate-800">{department.performance}%</div>
                              <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${getPerformanceColor(department.performance)} transition-all duration-500`}
                                  style={{ width: `${department.performance}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-slate-300">{department.location}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEditClick(department)} className="cursor-pointer">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600 cursor-pointer focus:text-red-600"
                                  onClick={() => handleDeleteClick(department.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
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
            </div>

            {/* Pagination */}
            {totalPages > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Rows per page:</span>
                  <Select value={String(rowsPerPage)} onValueChange={(val) => {
                    setRowsPerPage(Number(val))
                    setCurrentPage(1)
                  }}>
                    <SelectTrigger className="w-20 h-9 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-slate-600 ml-4">
                    Showing {sortedDepartments.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to{" "}
                    {Math.min(currentPage * rowsPerPage, sortedDepartments.length)} of {sortedDepartments.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="h-9"
                  >
                    First
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="h-9"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium text-slate-700 px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="h-9"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="h-9"
                  >
                    Last
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px] animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-2xl">Edit Department</DialogTitle>
              <DialogDescription>Update department information</DialogDescription>
            </DialogHeader>
            {editDepartment && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name" className="text-sm font-semibold">Department Name *</Label>
                  <Input
                    id="edit-name"
                    value={editDepartment.name}
                    onChange={(e) => setEditDepartment({ ...editDepartment, name: e.target.value })}
                    className="focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description" className="text-sm font-semibold">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editDepartment.description}
                    onChange={(e) => setEditDepartment({ ...editDepartment, description: e.target.value })}
                    className="focus:ring-2 focus:ring-orange-500"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-head" className="text-sm font-semibold">Department Head *</Label>
                  <Input
                    id="edit-head"
                    value={editDepartment.head}
                    onChange={(e) => setEditDepartment({ ...editDepartment, head: e.target.value })}
                    className="focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.head && <p className="text-red-500 text-xs">{errors.head}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-budget" className="text-sm font-semibold">Budget *</Label>
                    <Input
                      id="edit-budget"
                      value={editDepartment.budget}
                      onChange={(e) => setEditDepartment({ ...editDepartment, budget: e.target.value })}
                      className="focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.budget && <p className="text-red-500 text-xs">{errors.budget}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-location" className="text-sm font-semibold">Location *</Label>
                    <Input
                      id="edit-location"
                      value={editDepartment.location}
                      onChange={(e) => setEditDepartment({ ...editDepartment, location: e.target.value })}
                      className="focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEditDepartment} className="bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-700 hover:to-orange-700">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px] animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-2xl">Delete Department</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this department? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDeleteDepartment} className="bg-red-600 hover:bg-red-700">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}