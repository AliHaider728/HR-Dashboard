 
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
import { Search, Plus, MoreHorizontal, Download, Eye, Edit, Trash2, Receipt, Calendar, Paperclip } from "lucide-react"

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const expenses = [
    {
      id: 1,
      expenseNumber: "EXP-001",
      employee: "John Doe",
      category: "Travel",
      description: "Business trip to New York",
      amount: "$1,250",
      date: "2024-01-15",
      status: "Approved",
      receipt: true,
      approvedBy: "Sarah Wilson",
    },
    {
      id: 2,
      expenseNumber: "EXP-002",
      employee: "Jane Smith",
      category: "Office Supplies",
      description: "Laptop and accessories",
      amount: "$2,500",
      date: "2024-01-20",
      status: "Pending",
      receipt: true,
      approvedBy: null,
    },
    {
      id: 3,
      expenseNumber: "EXP-003",
      employee: "Robert Brown",
      category: "Meals",
      description: "Client dinner meeting",
      amount: "$180",
      date: "2024-01-10",
      status: "Rejected",
      receipt: false,
      approvedBy: "Mike Johnson",
    },
    {
      id: 4,
      expenseNumber: "EXP-004",
      employee: "Emily Wilson",
      category: "Training",
      description: "Professional development course",
      amount: "$800",
      date: "2024-01-25",
      status: "Approved",
      receipt: true,
      approvedBy: "Lisa Davis",
    },
  ]

  const stats = [
    { title: "Total Expenses", value: "$45,230", change: "+15%", color: "text-red-600" },
    { title: "Pending Approval", value: "$8,750", change: "+5%", color: "text-orange-600" },
    { title: "This Month", value: "$12,500", change: "+8%", color: "text-blue-600" },
    { title: "Reimbursed", value: "$32,480", change: "+12%", color: "text-green-600" },
  ]

  const categories = [
    { name: "Travel", amount: "$15,230", percentage: 34 },
    { name: "Office Supplies", amount: "$8,750", percentage: 19 },
    { name: "Meals", amount: "$6,500", percentage: 14 },
    { name: "Training", amount: "$5,200", percentage: 12 },
    { name: "Others", amount: "$9,550", percentage: 21 },
  ]

  const getStatusBadge = (status) => {
    const variants = {
      Approved: "bg-green-100 text-green-800",
      Pending: "bg-orange-100 text-orange-800",
      Rejected: "bg-red-100 text-red-800",
      Draft: "bg-gray-100 text-gray-800",
    }
    return variants[status] || "bg-gray-100 text-gray-800"
  }

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.expenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || expense.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesCategory = categoryFilter === "all" || expense.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600">Track and manage employee expenses</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
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

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${category.percentage}%` }}></div>
                  </div>
                  <span className="font-medium text-gray-900 w-20 text-right">{category.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="flex items-center">
              <Receipt className="w-5 h-5 mr-2 text-orange-600" />
              Expense Records
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search expenses..."
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
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="office supplies">Office Supplies</SelectItem>
                  <SelectItem value="meals">Meals</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                </SelectContent>
              </Select>
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
                  <TableHead>Expense #</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.expenseNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-orange-600">
                            {expense.employee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <span>{expense.employee}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{expense.category}</Badge>
                    </TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {expense.date}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{expense.amount}</TableCell>
                    <TableCell>
                      {expense.receipt ? (
                        <Paperclip className="w-4 h-4 text-green-600" />
                      ) : (
                        <span className="text-red-600 text-sm">No receipt</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(expense.status)}>{expense.status}</Badge>
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

export default Expenses
