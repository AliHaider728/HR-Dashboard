 

import { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Search, Plus, MoreHorizontal, Filter, Download, Eye, Edit, Trash2 } from "lucide-react"

const Promotion = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const promotions = [
    {
      id: 1,
      employee: "John Doe",
      employeeId: "EMP001",
      currentDesignation: "Software Developer",
      promotedDesignation: "Senior Software Developer",
      currentDepartment: "IT",
      promotedDepartment: "IT",
      promotionDate: "2024-01-15",
      effectiveDate: "2024-02-01",
      status: "Approved",
      promotedBy: "Sarah Wilson",
    },
    {
      id: 2,
      employee: "Jane Smith",
      employeeId: "EMP002",
      currentDesignation: "Marketing Executive",
      promotedDesignation: "Marketing Manager",
      currentDepartment: "Marketing",
      promotedDepartment: "Marketing",
      promotionDate: "2024-01-20",
      effectiveDate: "2024-02-15",
      status: "Pending",
      promotedBy: "Mike Johnson",
    },
    {
      id: 3,
      employee: "Robert Brown",
      employeeId: "EMP003",
      currentDesignation: "HR Executive",
      promotedDesignation: "HR Manager",
      currentDepartment: "Human Resources",
      promotedDepartment: "Human Resources",
      promotionDate: "2024-01-10",
      effectiveDate: "2024-01-25",
      status: "Rejected",
      promotedBy: "Lisa Davis",
    },
    {
      id: 4,
      employee: "Emily Wilson",
      employeeId: "EMP004",
      currentDesignation: "Accountant",
      promotedDesignation: "Senior Accountant",
      currentDepartment: "Finance",
      promotedDepartment: "Finance",
      promotionDate: "2024-01-25",
      effectiveDate: "2024-02-10",
      status: "Approved",
      promotedBy: "David Miller",
    },
  ]

  const stats = [
    { title: "Total Promotions", value: "156", change: "+12%", color: "text-blue-600" },
    { title: "Pending Approvals", value: "23", change: "+5%", color: "text-orange-600" },
    { title: "This Month", value: "18", change: "+8%", color: "text-green-600" },
    { title: "Rejected", value: "7", change: "-2%", color: "text-red-600" },
  ]

  const getStatusBadge = (status) => {
    const variants = {
      Approved: "bg-green-100 text-green-800",
      Pending: "bg-orange-100 text-orange-800",
      Rejected: "bg-red-100 text-red-800",
    }
    return variants[status] || "bg-gray-100 text-gray-800"
  }

  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch =
      promotion.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || promotion.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promotions</h1>
          <p className="text-gray-600">Manage employee promotions and career advancement</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Promotion
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
            <CardTitle>Promotion Records</CardTitle>
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
                  <TableHead>Current Position</TableHead>
                  <TableHead>Promoted To</TableHead>
                  <TableHead>Promotion Date</TableHead>
                  <TableHead>Effective Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Promoted By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.map((promotion) => (
                  <TableRow key={promotion.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-orange-600">
                            {promotion.employee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{promotion.employee}</div>
                          <div className="text-sm text-gray-500">{promotion.employeeId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{promotion.currentDesignation}</div>
                        <div className="text-sm text-gray-500">{promotion.currentDepartment}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{promotion.promotedDesignation}</div>
                        <div className="text-sm text-gray-500">{promotion.promotedDepartment}</div>
                      </div>
                    </TableCell>
                    <TableCell>{promotion.promotionDate}</TableCell>
                    <TableCell>{promotion.effectiveDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(promotion.status)}>{promotion.status}</Badge>
                    </TableCell>
                    <TableCell>{promotion.promotedBy}</TableCell>
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

export default Promotion
