"use client"

import { useState } from "react"
import { Plus, Edit, Search, User, CheckCircle, XCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Checkbox } from "../../components/ui/Checkbox"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../components/ui/pagination"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"  
const initialRolesData = [
  { id: 1, role: "Admin", createdDate: "2024-09-12", status: "Active", permissions: { read: true, write: true, create: true, delete: true, import: true, export: true } },
  { id: 2, role: "HR Manager", createdDate: "2024-10-24", status: "Active", permissions: { read: true, write: true, create: true, delete: false, import: true, export: true } },
  { id: 3, role: "Recruitment Manager", createdDate: "2024-02-18", status: "Active", permissions: { read: true, write: true, create: true, delete: false, import: false, export: true } },
  { id: 4, role: "Payroll Manager", createdDate: "2024-10-17", status: "Active", permissions: { read: true, write: true, create: false, delete: false, import: true, export: true } },
  { id: 5, role: "Leave Manager", createdDate: "2024-07-20", status: "Active", permissions: { read: true, write: true, create: true, delete: false, import: false, export: false } },
  { id: 6, role: "Performance Manager", createdDate: "2024-04-10", status: "Active", permissions: { read: true, write: true, create: false, delete: false, import: false, export: true } },
  { id: 7, role: "Reports Analyst", createdDate: "2024-08-29", status: "Active", permissions: { read: true, write: false, create: false, delete: false, import: false, export: true } },
  { id: 8, role: "Employee", createdDate: "2024-02-22", status: "Inactive", permissions: { read: true, write: false, create: false, delete: false, import: false, export: false } },
  { id: 9, role: "Client", createdDate: "2024-11-03", status: "Active", permissions: { read: true, write: false, create: false, delete: false, import: false, export: false } },
  { id: 10, role: "Department Head", createdDate: "2024-12-17", status: "Active", permissions: { read: true, write: true, create: true, delete: true, import: true, export: true } },
]

export default function RolesPermissions() {
  const [roles, setRoles] = useState(initialRolesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState(null)
  const [formData, setFormData] = useState({
    role: "",
    status: "Active",
    permissions: { read: false, write: false, create: false, delete: false, import: false, export: false },
  })

  const filteredRoles = roles.filter((role) => {
    const matchesSearch = role.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || role.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredRoles.length / rowsPerPage)
  const paginatedRoles = filteredRoles.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

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

  const handleAddRole = () => {
    const newRole = {
      id: roles.length + 1,
      ...formData,
      createdDate: new Date().toISOString().split("T")[0],
    }
    setRoles([...roles, newRole])
    setFormData({ role: "", status: "Active", permissions: { read: false, write: false, create: false, delete: false, import: false, export: false } })
    setIsAddOpen(false)
  }

  const handleEditRole = () => {
    setRoles(roles.map((role) => (role.id === currentRole.id ? { ...role, ...formData } : role)))
    setFormData({ role: "", status: "Active", permissions: { read: false, write: false, create: false, delete: false, import: false, export: false } })
    setIsEditOpen(false)
    setCurrentRole(null)
  }

  const handleEditClick = (role) => {
    setCurrentRole(role)
    setFormData({ role: role.role, status: role.status, permissions: { ...role.permissions } })
    setIsEditOpen(true)
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Roles & Permissions</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage roles and their permissions</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="role">Role Name</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Enter role name"
                />
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
             
              <Button className="w-full" onClick={handleAddRole}>
                Add Role
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
                <p className="text-sm font-medium text-gray-600">Total Roles</p>
                <p className="text-2xl font-bold">{roles.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Roles</p>
                <p className="text-2xl font-bold text-blue-600">
                  {roles.filter((r) => r.status === "Active").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive Roles</p>
                <p className="text-2xl font-bold text-blue-600">
                  {roles.filter((r) => r.status === "Inactive").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Roles List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
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

          {filteredRoles.length === 0 ? (
            <p className="text-center text-gray-500">No roles found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${role.role}&background=random`} />
                          <AvatarFallback>{role.role.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{role.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(role.createdDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(role.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(role.status)}
                          {role.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(role.permissions).map(([perm, enabled]) =>
                          enabled ? (
                            <Badge key={perm} variant="outline" className="capitalize">
                              {perm}
                            </Badge>
                          ) : null
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(role)}>
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
              Showing {paginatedRoles.length} of {filteredRoles.length} entries
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

      {/* Edit Role Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="role">Role Name</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Enter role name"
              />
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
            <div>
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {["read", "write", "create", "delete", "import", "export"].map((perm) => (
                  <div key={perm} className="flex items-center space-x-2">
                    <Checkbox
                      id={perm}
                      checked={formData.permissions[perm]}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          permissions: { ...formData.permissions, [perm]: checked },
                        })
                      }
                    />
                    <Label htmlFor={perm} className="capitalize">
                      {perm}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full" onClick={handleEditRole}>
              Update Role
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
