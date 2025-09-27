import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Users, Building, TrendingUp, DollarSign } from "lucide-react"

// Sample departments data
const departmentsData = [
  {
    id: 1,
    name: "Engineering",
    description: "Software development and technical operations",
    head: "Sarah Johnson",
    headAvatar: "/placeholder.svg?height=32&width=32",
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
    headAvatar: "/placeholder.svg?height=32&width=32",
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
    headAvatar: "/placeholder.svg?height=32&width=32",
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
    headAvatar: "/placeholder.svg?height=32&width=32",
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
    headAvatar: "/placeholder.svg?height=32&width=32",
    employees: 15,
    budget: "$1,000,000",
    performance: 94,
    location: "New York",
    established: "2020-01-30",
  },
]

export default function Departments() {
  const [departments, setDepartments] = useState(departmentsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
    head: "",
    budget: "",
    location: "",
  })

  // Filter departments
  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddDepartment = () => {
    const department = {
      id: departments.length + 1,
      ...newDepartment,
      headAvatar: "/placeholder.svg?height=32&width=32",
      employees: 0,
      performance: 0,
      established: new Date().toISOString().split("T")[0],
    }
    setDepartments([...departments, department])
    setNewDepartment({
      name: "",
      description: "",
      head: "",
      budget: "",
      location: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id))
  }

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employees, 0)
  const totalBudget = departments.reduce((sum, dept) => sum + Number.parseInt(dept.budget.replace(/[$,]/g, "")), 0)
  const avgPerformance = Math.round(departments.reduce((sum, dept) => sum + dept.performance, 0) / departments.length)

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-ful mt-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
          <p className="text-muted-foreground">Manage organizational departments and their structure</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>Create a new department in your organization.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newDepartment.description}
                  onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="head" className="text-right">
                  Department Head
                </Label>
                <Input
                  id="head"
                  value={newDepartment.head}
                  onChange={(e) => setNewDepartment({ ...newDepartment, head: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="budget" className="text-right">
                  Budget
                </Label>
                <Input
                  id="budget"
                  value={newDepartment.budget}
                  onChange={(e) => setNewDepartment({ ...newDepartment, budget: e.target.value })}
                  className="col-span-3"
                  placeholder="$1,000,000"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  value={newDepartment.location}
                  onChange={(e) => setNewDepartment({ ...newDepartment, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddDepartment}>
                Add Department
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalBudget / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Annual budget allocation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPerformance}%</div>
            <p className="text-xs text-muted-foreground">Organization average</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Head</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{department.name}</div>
                      <div className="text-sm text-muted-foreground">{department.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={department.headAvatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {department.head
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{department.head}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{department.employees}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{department.budget}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">{department.performance}%</div>
                      <div className="w-16 h-2 bg-muted rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${department.performance}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{department.location}</TableCell>
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
                          onClick={() => handleDeleteDepartment(department.id)}
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
