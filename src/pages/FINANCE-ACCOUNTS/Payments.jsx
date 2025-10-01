 

import { useState } from "react"
import { CreditCard, Plus, Edit, Trash2, Search, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from  "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"


const paymentsData = [
  {
    id: 1,
    transactionId: "TXN-2024-001",
    invoiceNumber: "INV-2024-001",
    client: "TechCorp Inc.",
    amount: 15000,
    method: "Bank Transfer",
    status: "Completed",
    date: "2024-02-15",
    reference: "REF-001-2024",
  },
  {
    id: 2,
    transactionId: "TXN-2024-002",
    invoiceNumber: "INV-2024-002",
    client: "Global Solutions",
    amount: 8500,
    method: "Credit Card",
    status: "Processing",
    date: "2024-02-10",
    reference: "REF-002-2024",
  },
  {
    id: 3,
    transactionId: "TXN-2024-003",
    invoiceNumber: "INV-2024-003",
    client: "Finance Corp",
    amount: 12000,
    method: "Check",
    status: "Failed",
    date: "2024-02-05",
    reference: "REF-003-2024",
  },
  {
    id: 4,
    transactionId: "TXN-2024-004",
    invoiceNumber: "INV-2024-004",
    client: "Retail Corp",
    amount: 6500,
    method: "PayPal",
    status: "Pending",
    date: "2024-02-12",
    reference: "REF-004-2024",
  },
]

export default function FiancePayments() {
  const [payments, setPayments] = useState(paymentsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterMethod, setFilterMethod] = useState("all")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus
    const matchesMethod = filterMethod === "all" || payment.method === filterMethod
    return matchesSearch && matchesStatus && matchesMethod
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />
      case "Processing":
        return <Clock className="h-4 w-4" />
      case "Pending":
        return <Clock className="h-4 w-4" />
      case "Failed":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const completedAmount = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const pendingAmount = payments
    .filter((p) => p.status === "Pending" || p.status === "Processing")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const failedAmount = payments.filter((p) => p.status === "Failed").reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-ful mt-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage payment transactions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Record New Payment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transactionId">Transaction ID</Label>
                  <Input id="transactionId" placeholder="TXN-2024-XXX" />
                </div>
                <div>
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select invoice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INV-2024-001">INV-2024-001</SelectItem>
                      <SelectItem value="INV-2024-002">INV-2024-002</SelectItem>
                      <SelectItem value="INV-2024-003">INV-2024-003</SelectItem>
                      <SelectItem value="INV-2024-004">INV-2024-004</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="method">Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Check">Check</SelectItem>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Payment Date</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reference">Reference</Label>
                  <Input id="reference" placeholder="Enter reference number" />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Enter payment notes" />
              </div>
              <Button className="w-full">Record Payment</Button>
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
                <p className="text-sm font-medium text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
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
              <CreditCard className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">${completedAmount.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterMethod} onValueChange={setFilterMethod}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Check">Check</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{payment.transactionId}</p>
                      <p className="text-sm text-gray-500">{payment.reference}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                  <TableCell>{payment.client}</TableCell>
                  <TableCell className="font-medium">${payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
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
