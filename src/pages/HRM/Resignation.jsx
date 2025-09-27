 

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from  "../../components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Search, Plus, MoreHorizontal, Filter, Download, Eye, Edit, Trash2, Calendar } from "lucide-react"

const Resignation = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const resignations = [
    {
      id: 1,
      employee: "John Doe",
      employeeId: "EMP001",
      designation: "Software Developer",
      department: "IT",
      resignationDate: "2024-01-15",
      lastWorkingDay: "2024-02-15",
      noticePeriod: "30 days",
      reason: "Better Opportunity",
      status: "Approved",
      approvedBy: "Sarah Wilson",
    },
    {
      id: 2,
      employee: "Jane Smith",
      employeeId: "EMP002",
      designation: "Marketing Manager",
      department: "Marketing",
      resignationDate: "2024-01-20",
      lastWorkingDay: "2024-02-20",
      noticePeriod: "30 days",
      reason: "Personal Reasons",
      status: "Pending",
      approvedBy: "Mike Johnson",
    },
    {
      id: 3,
      employee: "Robert Brown",
      employeeId: "EMP003",
      designation: "HR Executive",
      department: "Human Resources",
      resignationDate: "2024-01-10",
      lastWorkingDay: "2024-02-10",
      noticePeriod: "30 days",
      reason: "Career Change",
      status: "Rejected",
      approvedBy: "Lisa Davis",
    },
    {
      id: 4,
      employee: "Emily Wilson",
      employeeId: "EMP004",
      designation: "Senior Accountant",
      department: "Finance",
      resignationDate: "2024-01-25",
      lastWorkingDay: "2024-02-25",
      noticePeriod: "30 days",
      reason: "Higher Studies",
      status: "Approved",
      approvedBy: "David Miller",
    },
  ]

  const stats = [
    { title: "Total Resignations", value: "89", change: "+15%", color: "text-red-600" },
    { title: "Pending Approvals", value: "12", change: "+3%", color: "text-orange-600" },
    { title: "This Month", value: "8", change: "+2%", color: "text-blue-600" },
    { title: "Notice Period", value: "15", change: "+5%", color: "text-purple-600" },
  ]

  const getStatusBadge = (status) => {
    const variants = {
      Approved: "bg-green-100 text-green-800",
      Pending: "bg-orange-100 text-orange-800",
      Rejected: "bg-red-100 text-red-800",
    }
    return variants[status] || "bg-gray-100 text-gray-800"
  }

  const filteredResignations = resignations.filter((resignation) => {
    const matchesSearch =
      resignation.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resignation.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || resignation.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resignations</h1>
          <p className="text-gray-600">Manage employee resignations and exit process</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Resignation
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${stat.color}`}>{stat.change}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Resignation Records</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Resignation Date</TableHead>
                  <TableHead>Last Working Day</TableHead>
                  <TableHead>Notice Period</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResignations.map((resignation) => (
                  <TableRow key={resignation.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-orange-600">
                            {resignation.employee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{resignation.employee}</div>
                          <div className="text-sm text-gray-500">{resignation.employeeId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{resignation.designation}</div>
                        <div className="text-sm text-gray-500">{resignation.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {resignation.resignationDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {resignation.lastWorkingDay}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{resignation.noticePeriod}</Badge>
                    </TableCell>
                    <TableCell>{resignation.reason}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(resignation.status)}>{resignation.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Resignation
