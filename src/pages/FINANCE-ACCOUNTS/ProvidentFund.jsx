 
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
import { Search, Plus, MoreHorizontal, Filter, Download, Eye, Edit, Trash2, PiggyBank, TrendingUp } from "lucide-react"

const ProvidentFund = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const pfRecords = [
    {
      id: 1,
      employee: "John Doe",
      employeeId: "EMP001",
      pfNumber: "PF001",
      basicSalary: "$5,000",
      employeeContribution: "$600",
      employerContribution: "$600",
      totalContribution: "$1,200",
      balance: "$15,600",
      status: "Active",
    },
    {
      id: 2,
      employee: "Jane Smith",
      employeeId: "EMP002",
      pfNumber: "PF002",
      basicSalary: "$4,500",
      employeeContribution: "$540",
      employerContribution: "$540",
      totalContribution: "$1,080",
      balance: "$12,960",
      status: "Active",
    },
    {
      id: 3,
      employee: "Robert Brown",
      employeeId: "EMP003",
      pfNumber: "PF003",
      basicSalary: "$3,800",
      employeeContribution: "$456",
      employerContribution: "$456",
      totalContribution: "$912",
      balance: "$8,208",
      status: "Inactive",
    },
    {
      id: 4,
      employee: "Emily Wilson",
      employeeId: "EMP004",
      pfNumber: "PF004",
      basicSalary: "$5,500",
      employeeContribution: "$660",
      employerContribution: "$660",
      totalContribution: "$1,320",
      balance: "$18,480",
      status: "Active",
    },
  ]

  const stats = [
    { title: "Total PF Balance", value: "$2.5M", change: "+12%", color: "text-green-600" },
    { title: "Active Members", value: "156", change: "+8%", color: "text-blue-600" },
    { title: "Monthly Contribution", value: "$125K", change: "+15%", color: "text-orange-600" },
    { title: "Interest Rate", value: "8.5%", change: "+0.5%", color: "text-purple-600" },
  ]

  const contributionBreakdown = [
    { type: "Employee Contribution", amount: "$62,500", percentage: 50 },
    { type: "Employer Contribution", amount: "$62,500", percentage: 50 },
  ]

  const getStatusBadge = (status) => {
    const variants = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-red-100 text-red-800",
      Suspended: "bg-orange-100 text-orange-800",
    }
    return variants[status] || "bg-gray-100 text-gray-800"
  }

  const filteredRecords = pfRecords.filter((record) => {
    const matchesSearch =
      record.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.pfNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Provident Fund</h1>
          <p className="text-gray-600">Manage employee provident fund contributions and balances</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add PF Record
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

      {/* Contribution Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PiggyBank className="w-5 h-5 mr-2 text-orange-600" />
              Monthly Contribution Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contributionBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    <span className="font-medium">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="font-medium text-gray-900 w-20 text-right">{item.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              PF Growth Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Opening Balance</span>
                <span className="font-medium">$2.2M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Contributions</span>
                <span className="font-medium text-green-600">+$250K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Interest Earned</span>
                <span className="font-medium text-green-600">+$50K</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Current Balance</span>
                  <span className="font-bold text-lg">$2.5M</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PF Records Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Provident Fund Records</CardTitle>
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
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
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
                  <TableHead>PF Number</TableHead>
                  <TableHead>Basic Salary</TableHead>
                  <TableHead>Employee Contribution</TableHead>
                  <TableHead>Employer Contribution</TableHead>
                  <TableHead>Total Contribution</TableHead>
                  <TableHead>PF Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-orange-600">
                            {record.employee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{record.employee}</div>
                          <div className="text-sm text-gray-500">{record.employeeId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{record.pfNumber}</TableCell>
                    <TableCell>{record.basicSalary}</TableCell>
                    <TableCell className="text-blue-600 font-medium">{record.employeeContribution}</TableCell>
                    <TableCell className="text-green-600 font-medium">{record.employerContribution}</TableCell>
                    <TableCell className="font-bold">{record.totalContribution}</TableCell>
                    <TableCell className="font-bold text-green-600">{record.balance}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(record.status)}>{record.status}</Badge>
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
                            View Statement
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download Statement
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

export default ProvidentFund
