import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Users, Award, TrendingUp, DollarSign } from "lucide-react"

// Sample designations data
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
]

const departments = ["All", "Engineering", "Product", "Design", "Sales", "Marketing", "HR", "Finance"]
const levels = ["All", "Junior", "Mid", "Senior", "Executive"]

export default function Designations() {
  const [designations, setDesignations] = useState(designationsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newDesignation, setNewDesignation] = useState({
    title: "",
    department: "",
    level: "",
    description: "",
    salaryRange: "",
    requirements: "",
    responsibilities: "",
  })

  // Filter designations
  const filteredDesignations = designations.filter((designation) => {
    const matchesSearch =
      designation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designation.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "All" || designation.department === selectedDepartment
    const matchesLevel = selectedLevel === "All" || designation.level === selectedLevel

    return matchesSearch && matchesDepartment && matchesLevel
  })

  const handleAddDesignation = () => {
    const designation = {
      id: designations.length + 1,
      ...newDesignation,
      employees: 0,
      requirements: newDesignation.requirements.split(",").map((r) => r.trim()),
      responsibilities: newDesignation.responsibilities.split(",").map((r) => r.trim()),
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
  }

  const handleDeleteDesignation = (id) => {
    setDesignations(designations.filter((des) => des.id !== id))
  }

  const totalDesignations = designations.length
  const totalEmployees = designations.reduce((sum, des) => sum + des.employees, 0)

  const getLevelBadge = (level) => {
    const variants = {
      Junior: "secondary",
      Mid: "default",
      Senior: "default",
      Executive: "destructive",
    }
    return <Badge variant={variants[level] || "default"}>{level}</Badge>
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-ful mt-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Designations</h1>
          <p className="text-muted-foreground">Manage job titles and role definitions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Designation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Designation</DialogTitle>
              <DialogDescription>
                Create a new job designation with requirements and responsibilities.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newDesignation.title}
                  onChange={(e) => setNewDesignation({ ...newDesignation, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Select onValueChange={(value) => setNewDesignation({ ...newDesignation, department: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments
                      .filter((d) => d !== "All")
                      .map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="level" className="text-right">
                  Level
                </Label>
                <Select onValueChange={(value) => setNewDesignation({ ...newDesignation, level: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels
                      .filter((l) => l !== "All")
                      .map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newDesignation.description}
                  onChange={(e) => setNewDesignation({ ...newDesignation, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salaryRange" className="text-right">
                  Salary Range
                </Label>
                <Input
                  id="salaryRange"
                  value={newDesignation.salaryRange}
                  onChange={(e) => setNewDesignation({ ...newDesignation, salaryRange: e.target.value })}
                  className="col-span-3"
                  placeholder="$50,000 - $75,000"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="requirements" className="text-right">
                  Requirements
                </Label>
                <Textarea
                  id="requirements"
                  value={newDesignation.requirements}
                  onChange={(e) => setNewDesignation({ ...newDesignation, requirements: e.target.value })}
                  className="col-span-3"
                  placeholder="Comma separated requirements"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="responsibilities" className="text-right">
                  Responsibilities
                </Label>
                <Textarea
                  id="responsibilities"
                  value={newDesignation.responsibilities}
                  onChange={(e) => setNewDesignation({ ...newDesignation, responsibilities: e.target.value })}
                  className="col-span-3"
                  placeholder="Comma separated responsibilities"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddDesignation}>
                Add Designation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Designations</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDesignations}</div>
            <p className="text-xs text-muted-foreground">Active job titles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Across all designations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Senior Roles</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{designations.filter((d) => d.level === "Senior").length}</div>
            <p className="text-xs text-muted-foreground">Senior level positions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(designations.map((d) => d.department)).size}</div>
            <p className="text-xs text-muted-foreground">With active roles</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search designations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Salary Range</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDesignations.map((designation) => (
                <TableRow key={designation.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{designation.title}</div>
                      <div className="text-sm text-muted-foreground">{designation.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{designation.department}</TableCell>
                  <TableCell>{getLevelBadge(designation.level)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{designation.employees}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{designation.salaryRange}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteDesignation(designation.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
