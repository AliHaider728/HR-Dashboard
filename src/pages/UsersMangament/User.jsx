"use client"

import { useState } from "react"
import { Plus, Edit, Search, User, Briefcase, CheckCircle, XCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../components/ui/pagination"

const initialUsersData = [
  { id: 1, name: "Anthony Lewis", email: "anthony.lewis@example.com", createdDate: "2024-09-12", role: "Employee", status: "Active", avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg` },
  { id: 2, name: "Brian Villalobos", email: "brian.villalobos@example.com", createdDate: "2024-10-24", role: "Employee", status: "Active", avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg` },
  { id: 3, name: "Sophie Headrick", email: "sophie.headrick@example.com", createdDate: "2024-02-18", role: "Client", status: "Active", avatar: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg` },
  { id: 4, name: "Stephan Peralt", email: "stephan.peralt@example.com", createdDate: "2024-10-17", role: "Employee", status: "Active", avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg` },
  { id: 5, name: "Thomas Bordelon", email: "thomas.bordelon@example.com", createdDate: "2024-07-20", role: "Client", status: "Active", avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg` },
  { id: 6, name: "Doglas Martini", email: "doglas.martini@example.com", createdDate: "2024-04-10", role: "Employee", status: "Active", avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg` },
  { id: 7, name: "Cameron Drake", email: "cameron.drake@example.com", createdDate: "2024-08-29", role: "Client", status: "Active", avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg` },
  { id: 8, name: "Harvey Smith", email: "harvey.smith@example.com", createdDate: "2024-02-22", role: "Employee", status: "Inactive", avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg` },
  { id: 9, name: "Michael Walker", email: "michael.walker@example.com", createdDate: "2024-11-03", role: "Client", status: "Active", avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg` },
  { id: 10, name: "Doris Crowley", email: "doris.crowley@example.com", createdDate: "2024-12-17", role: "Client", status: "Active", avatar: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg` },
]

export default function Users() {
  const [users, setUsers] = useState(initialUsersData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [formData, setFormData] = useState({ name: "", email: "", role: "", status: "Active" })

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4" />
      case "Inactive":
        return <XCircle className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      ...formData,
      createdDate: new Date().toISOString().split("T")[0],
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${Math.floor(Math.random() * 100)}.jpg`,
    }
    setUsers([...users, newUser])
    setFormData({ name: "", email: "", role: "", status: "Active" })
    setIsAddOpen(false)
  }

  const handleEditUser = () => {
    setUsers(users.map((user) => (user.id === currentUser.id ? { ...user, ...formData } : user)))
    setFormData({ name: "", email: "", role: "", status: "Active" })
    setIsEditOpen(false)
    setCurrentUser(null)
  }

  const handleEditClick = (user) => {
    setCurrentUser(user)
    setFormData({ name: user.name, email: user.email, role: user.role, status: user.status })
    setIsEditOpen(true)
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users List</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage employees and clients</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employee">Employee</SelectItem>
                    <SelectItem value="Client">Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handleAddUser}>
                Add User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Employees</p>
                <p className="text-2xl font-bold text-blue-600">
                  {users.filter((u) => u.role === "Employee").length}
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clients</p>
                <p className="text-2xl font-bold text-blue-600">
                  {users.filter((u) => u.role === "Client").length}
                </p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
                <SelectItem value="Client">Client</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-500">No users found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{new Date(user.createdDate).toLocaleDateString()}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(user.status)}
                          {user.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {paginatedUsers.length} of {filteredUsers.length} entries
            </div>
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  />
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit User Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="Client">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={handleEditUser}>
              Update User
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}