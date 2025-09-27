 
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
import { Search, Plus, MoreHorizontal, Filter, Download, Eye, Edit, Trash2, AlertTriangle } from "lucide-react"

const Termination = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const terminations = [
    {
      id: 1,
      employee: "Michael Johnson",
      employeeId: "EMP005",
      designation: "Sales Executive",
      department: "Sales",
      terminationDate: "2024-01-15",
      terminationType: "Voluntary",
      reason: "Performance Issues",
      noticePeriod: "Immediate",
      terminatedBy: "Sarah Wilson",
      status: "Completed",
    },
    {
      id: 2,
      employee: "Lisa Anderson",
      employeeId: "EMP006",
      designation: "Customer Service Rep",
      department: "Customer Service",
      terminationDate: "2024-01-20",
      terminationType: "Involuntary",
      reason: "Misconduct",
      noticePeriod: "Immediate",
      terminatedBy: "Mike Johnson",
      status: "Processing",
    },
    {
      id: 3,
      employee: "David Wilson",
      employeeId: "EMP007",
      designation: "Accountant",
      department: "Finance",
      terminationDate: "2024-01-10",
      terminationType: "Voluntary",
      reason: "Redundancy",
      noticePeriod: "15 days",
      terminatedBy: "Lisa Davis",
      status: "Completed",
    },
    {
      id: 4,
      employee: "Sarah Miller",
      employeeId: "EMP008",
      designation: "Project Manager",
      department: "IT",
      terminationDate: "2024-01-25",
      terminationType: "Involuntary",
      reason: "Policy Violation",
      noticePeriod: "Immediate",
      terminatedBy: "David Miller",
      status: "Pending",
    },
  ]

  const stats = [
    { title: "Total Terminations", value: "45", change: "+8%", color: "text-red-600" },
    { title: "Voluntary", value: "28", change: "+5%", color: "text-blue-600" },
    { title: "Involuntary", value: "17", change: "+3%", color: "text-orange-600" },
    { title: "This Month", value: "4", change: "+1%", color: "text-purple-600" },
  ]

  const getTypeBadge = (type) => {
    const variants = {
      Voluntary: "bg-blue-100 text-blue-800",
      Involuntary: "bg-red-100 text-red-800",
    }
    return variants[type] || "bg-gray-100 text-gray-800"
  }

  const getStatusBadge = (status) => {
    const variants = {
      Completed: "bg-green-100 text-green-800",
      Processing: "bg-orange-100 text-orange-800",
      Pending: "bg-yellow-100 text-yellow-800",
    }
    return variants[status] || "bg-gray-100 text-gray-800"
  }

  const filteredTerminations = terminations.filter((termination) => {
    const matchesSearch =
      termination.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      termination.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || termination.terminationType.toLowerCase() === typeFilter.toLowerCase()
    return matchesSearch && matchesType
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Terminations</h1>
          <p className="text-gray-600">Manage employee terminations and exit procedures</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Termination
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
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Termination Records
            </CardTitle>
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
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="voluntary">Voluntary</SelectItem>
                  <SelectItem value="involuntary">Involuntary</SelectItem>
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
                  <TableHead>Termination Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Notice Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Terminated By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTerminations.map((termination) => (
                  <TableRow key={termination.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-red-600">
                            {termination.employee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{termination.employee}</div>
                          <div className="text-sm text-gray-500">{termination.employeeId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{termination.designation}</div>
                        <div className="text-sm text-gray-500">{termination.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>{termination.terminationDate}</TableCell>
                    <TableCell>
                      <Badge className={getTypeBadge(termination.terminationType)}>{termination.terminationType}</Badge>
                    </TableCell>
                    <TableCell>{termination.reason}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{termination.noticePeriod}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(termination.status)}>{termination.status}</Badge>
                    </TableCell>
                    <TableCell>{termination.terminatedBy}</TableCell>
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

export default Termination
