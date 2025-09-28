import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from  "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Search, Filter, Download, Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { Link } from "react-router-dom"

const employeeStats = [
  { title: "Total", value: "1007", change: "+19.01%", color: "bg-gray-100 text-gray-800" },
  { title: "Active", value: "1007", change: "+19.01%", color: "bg-green-100 text-green-800" },
  { title: "Inactive", value: "1007", change: "+19.01%", color: "bg-red-100 text-red-800" },
  { title: "New", value: "67", change: "+19.01%", color: "bg-blue-100 text-blue-800" },
]

const employeesData = [
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
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDesignation, setSelectedDesignation] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredEmployees = employeesData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || employee.status === selectedStatus
    const matchesDesignation = selectedDesignation === "all" || employee.designation === selectedDesignation

    return matchesSearch && matchesStatus && matchesDesignation
  })

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen  p-3 sm:p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-9">
        <div>
          <h1 className="text-2xl font-bold">Employee</h1>
          <p className="text-gray-600">Employee / Employee List</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Enter last name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="Enter email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Designation</label>
                  <Input placeholder="Enter designation" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Joining Date</label>
                  <Input type="date" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add Employee</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {employeeStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <Badge className={stat.color}>{stat.title.charAt(0)}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Plan List</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search employees..."
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Designation
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedDesignation("all")}>All Designations</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDesignation("Finance")}>Finance</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDesignation("Developer")}>Developer</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDesignation("Manager")}>Manager</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDesignation("Executive")}>Executive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Select Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedStatus("all")}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("inactive")}>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Row Per Page</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {itemsPerPage}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setItemsPerPage(10)}>10</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setItemsPerPage(25)}>25</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setItemsPerPage(50)}>50</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="text-sm">Entries</span>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Emp ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-gray-600">{employee.designation}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          {employee.designation}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Finance</DropdownMenuItem>
                        <DropdownMenuItem>Developer</DropdownMenuItem>
                        <DropdownMenuItem>Manager</DropdownMenuItem>
                        <DropdownMenuItem>Executive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>{employee.joiningDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={employee.status === "active" ? "default" : "secondary"}
                      className={employee.status === "active" ? "bg-green-500" : "bg-red-500"}
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                          <Link to={`/employees/${employee.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredEmployees.length)} of{" "}
              {filteredEmployees.length} entries
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
