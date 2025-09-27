 

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
import { Search, Plus, MoreHorizontal, Filter, Download, Eye, Edit, Trash2, FileText, Calendar } from "lucide-react"

const Estimates = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const estimates = [
    {
      id: 1,
      estimateNumber: "EST-001",
      client: "Acme Corporation",
      project: "Website Development",
      estimateDate: "2024-01-15",
      expiryDate: "2024-02-15",
      amount: "$15,000",
      tax: "$1,500",
      total: "$16,500",
      status: "Sent",
    },
    {
      id: 2,
      estimateNumber: "EST-002",
      client: "Tech Solutions Inc",
      project: "Mobile App Development",
      estimateDate: "2024-01-20",
      expiryDate: "2024-02-20",
      amount: "$25,000",
      tax: "$2,500",
      total: "$27,500",
      status: "Accepted",
    },
    {
      id: 3,
      estimateNumber: "EST-003",
      client: "Global Enterprises",
      project: "System Integration",
      estimateDate: "2024-01-10",
      expiryDate: "2024-02-10",
      amount: "$35,000",
      tax: "$3,500",
      total: "$38,500",
      status: "Declined",
    },
    {
      id: 4,
      estimateNumber: "EST-004",
      client: "StartUp Ventures",
      project: "E-commerce Platform",
      estimateDate: "2024-01-25",
      expiryDate: "2024-02-25",
      amount: "$20,000",
      tax: "$2,000",
      total: "$22,000",
      status: "Draft",
    },
  ]

  const stats = [
    { title: "Total Estimates", value: "156", change: "+12%", color: "text-blue-600" },
    { title: "Sent Estimates", value: "89", change: "+8%", color: "text-orange-600" },
    { title: "Accepted", value: "45", change: "+15%", color: "text-green-600" },
    { title: "Total Value", value: "$2.5M", change: "+22%", color: "text-purple-600" },
  ]

  const getStatusBadge = (status) => {
    const variants = {
      Draft: "bg-gray-100 text-gray-800",
      Sent: "bg-blue-100 text-blue-800",
      Accepted: "bg-green-100 text-green-800",
      Declined: "bg-red-100 text-red-800",
      Expired: "bg-orange-100 text-orange-800",
    }
    return variants[status] || "bg-gray-100 text-gray-800"
  }

  const filteredEstimates = estimates.filter((estimate) => {
    const matchesSearch =
      estimate.estimateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || estimate.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estimates</h1>
          <p className="text-gray-600">Create and manage project estimates</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Estimate
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

      {/* Estimates Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-orange-600" />
              Estimate Records
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search estimates..."
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
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
                  <TableHead>Estimate #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Estimate Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEstimates.map((estimate) => (
                  <TableRow key={estimate.id}>
                    <TableCell className="font-medium">{estimate.estimateNumber}</TableCell>
                    <TableCell>{estimate.client}</TableCell>
                    <TableCell>{estimate.project}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {estimate.estimateDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {estimate.expiryDate}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{estimate.amount}</TableCell>
                    <TableCell className="font-bold text-green-600">{estimate.total}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(estimate.status)}>{estimate.status}</Badge>
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
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
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

export default Estimates
