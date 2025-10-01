 
import { useState } from "react"
import { FileText, Plus, Edit, Trash2, Search, Download, Send, Eye } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"


const invoicesData = [
  {
    id: 1,
    invoiceNumber: "INV-2024-001",
    client: "TechCorp Inc.",
    amount: 15000,
    status: "Paid",
    issueDate: "2024-01-15",
    dueDate: "2024-02-15",
    description: "SmartHR Enterprise License - Q1 2024",
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-002",
    client: "Global Solutions",
    amount: 8500,
    status: "Pending",
    issueDate: "2024-02-01",
    dueDate: "2024-03-01",
    description: "HR Consulting Services - February 2024",
  },
  {
    id: 3,
    invoiceNumber: "INV-2024-003",
    client: "Finance Corp",
    amount: 12000,
    status: "Overdue",
    issueDate: "2024-01-01",
    dueDate: "2024-02-01",
    description: "Payroll Integration Setup",
  },
  {
    id: 4,
    invoiceNumber: "INV-2024-004",
    client: "Retail Corp",
    amount: 6500,
    status: "Draft",
    issueDate: "2024-02-10",
    dueDate: "2024-03-10",
    description: "Employee Management System Setup",
  },
]

export default function Invoices() {
  const [invoices, setInvoices] = useState(invoicesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidAmount = invoices.filter((i) => i.status === "Paid").reduce((sum, invoice) => sum + invoice.amount, 0)
  const pendingAmount = invoices.filter((i) => i.status === "Pending").reduce((sum, invoice) => sum + invoice.amount, 0)
  const overdueAmount = invoices.filter((i) => i.status === "Overdue").reduce((sum, invoice) => sum + invoice.amount, 0)

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-ful mt-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your billing and invoices</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input id="invoiceNumber" placeholder="INV-2024-XXX" />
                </div>
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TechCorp Inc.">TechCorp Inc.</SelectItem>
                      <SelectItem value="Global Solutions">Global Solutions</SelectItem>
                      <SelectItem value="Finance Corp">Finance Corp</SelectItem>
                      <SelectItem value="Retail Corp">Retail Corp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input id="issueDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter invoice description" />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Create Invoice</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold">{invoices.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold">${totalAmount.toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-green-600">${paidAmount.toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search invoices..."
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
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{invoice.invoiceNumber}</p>
                      <p className="text-sm text-gray-500">{invoice.description}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{invoice.client}</TableCell>
                  <TableCell className="font-medium">${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Download">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Send">
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
