import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Users, Award, TrendingUp, Briefcase, X, ChevronLeft, ChevronRight, ArrowUpDown, Filter, Download, SlidersHorizontal, Eye } from "lucide-react"

const designationsData = [
  {
    id: 1,
    title: "Senior Developer",
    department: "Engineering",
    level: "Senior",
    description: "Experienced software developer responsible for complex projects and mentoring",
    employees: 12,
    salaryRange: "$80,000 - $120,000",
    requirements: ["5+ years experience", "Bachelor's degree", "Leadership skills"],
    responsibilities: ["Code development", "Team mentoring", "Architecture decisions"],
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    level: "Senior",
    description: "Strategic product planning and cross-functional team coordination",
    employees: 8,
    salaryRange: "$90,000 - $140,000",
    requirements: ["3+ years PM experience", "MBA preferred", "Analytics skills"],
    responsibilities: ["Product strategy", "Roadmap planning", "Stakeholder management"],
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    level: "Mid",
    description: "User experience design and research for digital products",
    employees: 6,
    salaryRange: "$70,000 - $100,000",
    requirements: ["3+ years UX experience", "Design degree", "Portfolio required"],
    responsibilities: ["User research", "Wireframing", "Prototyping"],
  },
  {
    id: 4,
    title: "Sales Manager",
    department: "Sales",
    level: "Senior",
    description: "Lead sales team and drive revenue growth initiatives",
    employees: 5,
    salaryRange: "$85,000 - $130,000",
    requirements: ["5+ years sales experience", "Management experience", "CRM proficiency"],
    responsibilities: ["Team management", "Sales strategy", "Client relationships"],
  },
  {
    id: 5,
    title: "Marketing Specialist",
    department: "Marketing",
    level: "Junior",
    description: "Digital marketing campaigns and brand promotion activities",
    employees: 10,
    salaryRange: "$50,000 - $75,000",
    requirements: ["2+ years marketing experience", "Digital marketing skills", "Analytics knowledge"],
    responsibilities: ["Campaign management", "Content creation", "Performance analysis"],
  },
  {
    id: 6,
    title: "HR Manager",
    department: "HR",
    level: "Senior",
    description: "Human resources management and organizational development",
    employees: 4,
    salaryRange: "$75,000 - $110,000",
    requirements: ["5+ years HR experience", "SHRM certification", "Employee relations"],
    responsibilities: ["Recruitment", "Employee development", "Policy management"],
  },
]

const departments = ["Engineering", "Product", "Design", "Sales", "Marketing", "HR", "Finance"]
const levels = ["Junior", "Mid", "Senior", "Executive"]

export default function Designations() {
  const [designations, setDesignations] = useState(designationsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [salaryFilter, setSalaryFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })
  const [newDesignation, setNewDesignation] = useState({
    title: "",
    department: "",
    level: "",
    description: "",
    salaryRange: "",
    requirements: "",
    responsibilities: "",
  })
  const [editDesignation, setEditDesignation] = useState(null)
  const [viewDesignation, setViewDesignation] = useState(null)
  const [deleteDesignationId, setDeleteDesignationId] = useState(null)
  const [errors, setErrors] = useState({})

  // Apply filters
  const filteredDesignations = designations.filter((designation) => {
    const matchesSearch =
      designation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designation.department.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = departmentFilter === "all" || designation.department === departmentFilter
    const matchesLevel = levelFilter === "all" || designation.level === levelFilter
    
    const matchesSalary = 
      salaryFilter === "all" ||
      (salaryFilter === "high" && parseInt(designation.salaryRange.split("-")[1].replace(/[$,\s]/g, "")) >= 100000) ||
      (salaryFilter === "medium" && parseInt(designation.salaryRange.split("-")[1].replace(/[$,\s]/g, "")) >= 70000 && parseInt(designation.salaryRange.split("-")[1].replace(/[$,\s]/g, "")) < 100000) ||
      (salaryFilter === "low" && parseInt(designation.salaryRange.split("-")[1].replace(/[$,\s]/g, "")) < 70000)

    return matchesSearch && matchesDepartment && matchesLevel && matchesSalary
  })

  // Sorting
  const sortedDesignations = [...filteredDesignations].sort((a, b) => {
    if (!sortConfig.key) return 0
    const key = sortConfig.key
    const direction = sortConfig.direction === "asc" ? 1 : -1
    
    if (key === "employees") {
      return (a.employees - b.employees) * direction
    }
    if (key === "title" || key === "department" || key === "level") {
      return a[key].localeCompare(b[key]) * direction
    }
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedDesignations.length / rowsPerPage)
  const paginatedDesignations = sortedDesignations.slice(
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
    setDepartmentFilter("all")
    setLevelFilter("all")
    setSalaryFilter("all")
    setCurrentPage(1)
  }

  const activeFiltersCount = [
    departmentFilter !== "all",
    levelFilter !== "all",
    salaryFilter !== "all",
  ].filter(Boolean).length

  const validateForm = (data) => {
    const newErrors = {}
    if (!data.title.trim()) newErrors.title = "Title is required"
    if (!data.department) newErrors.department = "Department is required"
    if (!data.level) newErrors.level = "Level is required"
    if (!data.salaryRange.trim()) newErrors.salaryRange = "Salary range is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddDesignation = () => {
    if (validateForm(newDesignation)) {
      const designation = {
        id: designations.length + 1,
        ...newDesignation,
        employees: 0,
        requirements: newDesignation.requirements.split(",").map((r) => r.trim()).filter(r => r),
        responsibilities: newDesignation.responsibilities.split(",").map((r) => r.trim()).filter(r => r),
      }
      setDesignations([...designations, designation])
      setNewDesignation({
        title: "",
        department: "",
        level: "",
        description: "",
        salaryRange: "",
        requirements: "",
        responsibilities: "",
      })
      setIsAddDialogOpen(false)
      setErrors({})
      setCurrentPage(1)
    }
  }

  const handleEditDesignation = () => {
    if (validateForm(editDesignation)) {
      setDesignations(
        designations.map((des) =>
          des.id === editDesignation.id ? {
            ...editDesignation,
            requirements: typeof editDesignation.requirements === 'string' 
              ? editDesignation.requirements.split(",").map((r) => r.trim()).filter(r => r)
              : editDesignation.requirements,
            responsibilities: typeof editDesignation.responsibilities === 'string'
              ? editDesignation.responsibilities.split(",").map((r) => r.trim()).filter(r => r)
              : editDesignation.responsibilities,
          } : des
        )
      )
      setIsEditDialogOpen(false)
      setEditDesignation(null)
      setErrors({})
    }
  }

  const handleDeleteDesignation = () => {
    setDesignations(designations.filter((des) => des.id !== deleteDesignationId))
    setIsDeleteDialogOpen(false)
    setDeleteDesignationId(null)
    if (paginatedDesignations.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleEditClick = (designation) => {
    setEditDesignation({
      ...designation,
      requirements: designation.requirements.join(", "),
      responsibilities: designation.responsibilities.join(", "),
    })
    setIsEditDialogOpen(true)
  }

  const handleViewClick = (designation) => {
    setViewDesignation(designation)
    setIsViewDialogOpen(true)
  }

  const handleDeleteClick = (id) => {
    setDeleteDesignationId(id)
    setIsDeleteDialogOpen(true)
  }

  const totalDesignations = designations.length
  const totalEmployees = designations.reduce((sum, des) => sum + des.employees, 0)
  const seniorRoles = designations.filter((d) => d.level === "Senior").length
  const uniqueDepartments = new Set(designations.map((d) => d.department)).size

  const getLevelColor = (level) => {
    const colors = {
      Junior: "bg-blue-100 text-blue-800 border-blue-200",
      Mid: "bg-orange-100 text-orange-800 border-orange-200",
      Senior: "bg-orange-100 text-orange-800 border-orange-200",
      Executive: "bg-red-100 text-red-800 border-red-200",
    }
    return colors[level] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
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
          background: linear-gradient(to right, #fdf4ff, #fae8ff);
          cursor: pointer;
        }
      `}</style>

      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="glass-card rounded-2xl p-6 shadow-xl animate-slide-down">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Designations
              </h1>
              <p className="text-slate-600 mt-1">Manage job titles and role definitions</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Designation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto animate-scale-in">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Add New Designation</DialogTitle>
                  <DialogDescription>Create a new job designation with requirements</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-semibold">Job Title *</Label>
                    <Input
                      id="title"
                      value={newDesignation.title}
                      onChange={(e) => setNewDesignation({ ...newDesignation, title: e.target.value })}
                      className="focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Senior Developer"
                    />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-sm font-semibold">Department *</Label>
                      <Select onValueChange={(value) => setNewDesignation({ ...newDesignation, department: value })}>
                        <SelectTrigger className="focus:ring-2 focus:ring-orange-500">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.department && <p className="text-red-500 text-xs">{errors.department}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level" className="text-sm font-semibold">Level *</Label>
                      <Select onValueChange={(value) => setNewDesignation({ ...newDesignation, level: value })}>
                        <SelectTrigger className="focus:ring-2 focus:ring-orange-500">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.level && <p className="text-red-500 text-xs">{errors.level}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
                    <Textarea
                      id="description"
                      value={newDesignation.description}
                      onChange={(e) => setNewDesignation({ ...newDesignation, description: e.target.value })}
                      className="focus:ring-2 focus:ring-orange-500"
                      placeholder="Brief description of the role"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryRange" className="text-sm font-semibold">Salary Range *</Label>
                    <Input
                      id="salaryRange"
                      value={newDesignation.salaryRange}
                      onChange={(e) => setNewDesignation({ ...newDesignation, salaryRange: e.target.value })}
                      className="focus:ring-2 focus:ring-orange-500"
                      placeholder="$50,000 - $75,000"
                    />
                    {errors.salaryRange && <p className="text-red-500 text-xs">{errors.salaryRange}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requirements" className="text-sm font-semibold">Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={newDesignation.requirements}
                      onChange={(e) => setNewDesignation({ ...newDesignation, requirements: e.target.value })}
                      className="focus:ring-2 focus:ring-orange-500"
                      placeholder="Comma separated (e.g., 5+ years experience, Bachelor's degree)"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="responsibilities" className="text-sm font-semibold">Responsibilities</Label>
                    <Textarea
                      id="responsibilities"
                      value={newDesignation.responsibilities}
                      onChange={(e) => setNewDesignation({ ...newDesignation, responsibilities: e.target.value })}
                      className="focus:ring-2 focus:ring-orange-500"
                      placeholder="Comma separated (e.g., Code development, Team mentoring)"
                      rows={2}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddDesignation} className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700">
                    Create Designation
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
              <CardTitle className="text-sm font-semibold text-slate-600">Total Designations</CardTitle>
              <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg">
                <Award className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">{totalDesignations}</div>
              <p className="text-xs text-slate-500 mt-1">Active job titles</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Total Employees</CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">{totalEmployees}</div>
              <p className="text-xs text-slate-500 mt-1">Across all designations</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Senior Roles</CardTitle>
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">{seniorRoles}</div>
              <p className="text-xs text-slate-500 mt-1">Senior level positions</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Departments</CardTitle>
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">{uniqueDepartments}</div>
              <p className="text-xs text-slate-500 mt-1">With active roles</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Table */}
        <Card className="glass-card border-0 shadow-xl animate-fade-in">
          <CardHeader>
            <div className="space-y-4">
              {/* Search and Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search designations, departments..."
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
                      <Button variant="outline" className="relative bg-white hover:text-black hover:bg-slate-50">
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
                        <Label className="text-sm font-semibold">Department</Label>
                        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                          <SelectTrigger className="bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Level</Label>
                        <Select value={levelFilter} onValueChange={setLevelFilter}>
                          <SelectTrigger className="bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            {levels.map(level => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Salary Range</Label>
                        <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                          <SelectTrigger className="bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Ranges</SelectItem>
                            <SelectItem value="high">High ($100k+)</SelectItem>
                            <SelectItem value="medium">Medium ($70k-$100k)</SelectItem>
                            <SelectItem value="low">Entry (&lt;$70k)</SelectItem>
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

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2">
                  {departmentFilter !== "all" && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Department: {departmentFilter}
                      <X 
                        className="ml-2 h-3 w-3 cursor-pointer" 
                        onClick={() => setDepartmentFilter("all")}
                      />
                    </Badge>
                  )}
                  {levelFilter !== "all" && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Level: {levelFilter}
                      <X 
                        className="ml-2 h-3 w-3 cursor-pointer" 
                        onClick={() => setLevelFilter("all")}
                      />
                    </Badge>
                  )}
                  {salaryFilter !== "all" && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Salary: {salaryFilter}
                      <X 
                        className="ml-2 h-3 w-3 cursor-pointer" 
                        onClick={() => setSalaryFilter("all")}
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
                    <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
                      <TableHead className="sortable-header font-semibold" onClick={() => handleSort("title")}>
                        <div className="flex items-center gap-2">
                          Designation
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="sortable-header font-semibold" onClick={() => handleSort("department")}>
                        <div className="flex items-center gap-2">
                          Department
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="sortable-header font-semibold" onClick={() => handleSort("level")}>
                        <div className="flex items-center gap-2">
                          Level
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="sortable-header font-semibold" onClick={() => handleSort("employees")}>
                        <div className="flex items-center gap-2">
                          Employees
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold">Salary Range</TableHead>
                      <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedDesignations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12">
                          <div className="flex flex-col items-center gap-2 text-slate-400">
                            <Award className="h-12 w-12" />
                            <p className="text-lg font-medium">No designations found</p>
                            <p className="text-sm">Try adjusting your filters or search term</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedDesignations.map((designation) => (
                        <TableRow 
                          key={designation.id} 
                          className="hover:bg-orange-50/50 transition-colors duration-150"
                        >
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-semibold text-slate-800">{designation.title}</div>
                              <div className="text-sm text-slate-500 line-clamp-1">{designation.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-slate-300">{designation.department}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getLevelColor(designation.level)} border`}>
                              {designation.level}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                              <Users className="h-3 w-3 mr-1" />
                              {designation.employees}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-slate-800">{designation.salaryRange}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleViewClick(designation)} className="cursor-pointer">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditClick(designation)} className="cursor-pointer">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600 cursor-pointer focus:text-red-600"
                                  onClick={() => handleDeleteClick(designation.id)}
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
                    Showing {sortedDesignations.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to{" "}
                    {Math.min(currentPage * rowsPerPage, sortedDesignations.length)} of {sortedDesignations.length}
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

        {/* View Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-2xl">{viewDesignation?.title}</DialogTitle>
              <DialogDescription>
                Complete details for this designation
              </DialogDescription>
            </DialogHeader>
            {viewDesignation && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Department</Label>
                    <p className="mt-1 text-slate-800">{viewDesignation.department}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Level</Label>
                    <div className="mt-1">
                      <Badge className={`${getLevelColor(viewDesignation.level)} border`}>
                        {viewDesignation.level}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Employees</Label>
                    <p className="mt-1 text-slate-800">{viewDesignation.employees} people</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Salary Range</Label>
                    <p className="mt-1 text-slate-800 font-semibold">{viewDesignation.salaryRange}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-slate-600">Description</Label>
                  <p className="mt-2 text-slate-700 leading-relaxed">{viewDesignation.description}</p>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-slate-600">Requirements</Label>
                  <ul className="mt-2 space-y-2">
                    {viewDesignation.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span className="text-slate-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-slate-600">Responsibilities</Label>
                  <ul className="mt-2 space-y-2">
                    {viewDesignation.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-pink-600 mt-1">•</span>
                        <span className="text-slate-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-2xl">Edit Designation</DialogTitle>
              <DialogDescription>Update designation information</DialogDescription>
            </DialogHeader>
            {editDesignation && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title" className="text-sm font-semibold">Job Title *</Label>
                  <Input
                    id="edit-title"
                    value={editDesignation.title}
                    onChange={(e) => setEditDesignation({ ...editDesignation, title: e.target.value })}
                    className="focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-department" className="text-sm font-semibold">Department *</Label>
                    <Select value={editDesignation.department} onValueChange={(value) => setEditDesignation({ ...editDesignation, department: value })}>
                      <SelectTrigger className="focus:ring-2 focus:ring-orange-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.department && <p className="text-red-500 text-xs">{errors.department}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-level" className="text-sm font-semibold">Level *</Label>
                    <Select value={editDesignation.level} onValueChange={(value) => setEditDesignation({ ...editDesignation, level: value })}>
                      <SelectTrigger className="focus:ring-2 focus:ring-orange-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.level && <p className="text-red-500 text-xs">{errors.level}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description" className="text-sm font-semibold">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editDesignation.description}
                    onChange={(e) => setEditDesignation({ ...editDesignation, description: e.target.value })}
                    className="focus:ring-2 focus:ring-orange-500"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-salaryRange" className="text-sm font-semibold">Salary Range *</Label>
                  <Input
                    id="edit-salaryRange"
                    value={editDesignation.salaryRange}
                    onChange={(e) => setEditDesignation({ ...editDesignation, salaryRange: e.target.value })}
                    className="focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.salaryRange && <p className="text-red-500 text-xs">{errors.salaryRange}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-requirements" className="text-sm font-semibold">Requirements</Label>
                  <Textarea
                    id="edit-requirements"
                    value={editDesignation.requirements}
                    onChange={(e) => setEditDesignation({ ...editDesignation, requirements: e.target.value })}
                    className="focus:ring-2 focus:ring-orange-500"
                    placeholder="Comma separated"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-responsibilities" className="text-sm font-semibold">Responsibilities</Label>
                  <Textarea
                    id="edit-responsibilities"
                    value={editDesignation.responsibilities}
                    onChange={(e) => setEditDesignation({ ...editDesignation, responsibilities: e.target.value })}
                    className="focus:ring-2 focus:ring-orange-500"
                    placeholder="Comma separated"
                    rows={2}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEditDesignation} className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px] animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-2xl">Delete Designation</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this designation? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDeleteDesignation} className="bg-red-600 hover:bg-red-700">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}