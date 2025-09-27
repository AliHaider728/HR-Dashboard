"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./../../components/ui/card"
import { Badge } from "./../../components/ui/badge"
import { Button } from "./../../components/ui/button"
import { Input } from "./../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../../components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./../../components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./../../components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/AlertDialog"
import { Search, Filter, Download, Eye, Trash, CreditCard, DollarSign, TrendingUp, Calendar } from "lucide-react"
import { jsPDF } from "jspdf"
import { toast } from "react-hot-toast"

// Fallback image URL for when logos fail to load
const FALLBACK_LOGO = "https://via.placeholder.com/100x40?text=Logo+Not+Found"

const invoiceData = [
  { id: "INV001", customer: "BrightWave Innovations", email: "michael@brightwave.com", createdDate: "12 Sep 2024", amount: 200, paymentMethod: "Credit Card", status: "Paid", logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-01.svg" },
  { id: "INV002", customer: "Stellar Dynamics", email: "sophie@stellardynamics.com", createdDate: "24 Oct 2024", amount: 100, paymentMethod: "Paypal", status: "Paid", logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-02.svg" },
  { id: "INV003", customer: "Quantum Nexus", email: "contact@quantumnexus.com", createdDate: "18 Feb 2024", amount: 200, paymentMethod: "Debit Card", status: "Paid", logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-03.svg" },
  { id: "INV004", customer: "Everest Enterprises", email: "info@everest.com", createdDate: "17 Oct 2024", amount: 200, paymentMethod: "Paypal", status: "Paid", logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-04.svg" },
  { id: "INV005", customer: "Acme Technologies", email: "support@acmetech.com", createdDate: "20 Jul 2024", amount: 500, paymentMethod: "Credit Card", status: "Paid", logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-05.svg" },
  { id: "INV006", customer: "Blue Sky Ventures", email: "admin@bluesky.com", createdDate: "10 Apr 2024", amount: 200, paymentMethod: "Paypal", status: "Paid", logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-06.svg" },
  { id: "INV007", customer: "TechFlow Enterprises", email: "support@techflow.com", createdDate: "29 Aug 2024", amount: 1200, paymentMethod: "Credit Card", status: "Paid", logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-07.svg" },
  { id: "INV008", customer: "Upward Dynamics", email: "info@upward.com", createdDate: "22 Feb 2024", amount: 100, paymentMethod: "Credit Card", status: "Unpaid", logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-08.svg" },
  { id: "INV009", customer: "Nexlify Networks", email: "contact@nexlify.com", createdDate: "03 Nov 2024", amount: 100, paymentMethod: "Paypal", status: "Paid", logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-09.svg" },
  { id: "INV010", customer: "Edge Dynamics", email: "admin@edgedynamics.com", createdDate: "17 Dec 2024", amount: 200, paymentMethod: "Credit Card", status: "Paid", logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-10.svg" },
]

const transactionStats = [
  { title: "Total Transactions", value: invoiceData.length.toString(), change: "+10%", icon: CreditCard, color: "text-blue-600" },
  { title: "Total Revenue", value: `$${invoiceData.reduce((sum, inv) => sum + inv.amount, 0)}`, change: "+12%", icon: DollarSign, color: "text-green-600" },
  { title: "This Month", value: `$${invoiceData.filter(inv => new Date(inv.createdDate).getMonth() === new Date().getMonth()).reduce((sum, inv) => sum + inv.amount, 0)}`, change: "+8%", icon: TrendingUp, color: "text-purple-600" },
  { title: "Pending", value: invoiceData.filter(inv => inv.status === "Unpaid").length.toString(), change: "-5%", icon: Calendar, color: "text-orange-600" },
]

export default function PurchaseTransaction() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all")
  const [invoices, setInvoices] = useState(invoiceData)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [invoiceToDelete, setInvoiceToDelete] = useState(null)
  const [logoError, setLogoError] = useState({}) // Track logo errors by invoice ID

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || invoice.status.toLowerCase() === selectedStatus
    const matchesPaymentMethod = selectedPaymentMethod === "all" || invoice.paymentMethod === selectedPaymentMethod
    return matchesSearch && matchesStatus && matchesPaymentMethod
  })

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice)
    setIsModalOpen(true)
  }

  const handleDownloadInvoice = (invoice) => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text("Invoice", 20, 20)
    doc.setFontSize(12)
    doc.text(`Invoice ID: ${invoice.id}`, 20, 30)
    doc.text(`Issue Date: ${invoice.createdDate}`, 20, 40)
    doc.text(`Due Date: ${new Date(new Date(invoice.createdDate).setMonth(new Date(invoice.createdDate).getMonth() + 1)).toLocaleDateString()}`, 20, 50)
    doc.text("From: SmartHR, 367 Hillcrest Lane, Irvine, CA, smarthr@example.com", 20, 60)
    doc.text(`To: ${invoice.customer}, ${invoice.email}`, 20, 70)
    doc.text(`Amount: $${invoice.amount.toFixed(2)}`, 20, 80)
    doc.text(`Payment Method: ${invoice.paymentMethod}`, 20, 90)
    doc.text("Terms: All payments must be made according to the agreed schedule.", 20, 100)
    doc.save(`invoice_${invoice.id}.pdf`)
    toast.success(`Invoice ${invoice.id} downloaded successfully`)
  }

  const handleDeleteInvoice = (id) => {
    setInvoiceToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteInvoice = () => {
    setInvoices(invoices.filter((inv) => inv.id !== invoiceToDelete))
    toast.success(`Invoice ${invoiceToDelete} deleted successfully`)
    setIsDeleteDialogOpen(false)
    setInvoiceToDelete(null)
  }

  // Handle image load error for a specific invoice
  const handleLogoError = (invoiceId) => {
    setLogoError((prev) => ({ ...prev, [invoiceId]: true }))
    toast.error(`Failed to load logo for invoice ${invoiceId}`)
  }

  return (
    <div className="mt-3 space-y-6 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Purchase Transactions</h1>
          <p className="text-gray-600">Super Admin / Purchase Transaction</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button>
            <CreditCard className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {transactionStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Credit Card</span>
                </div>
                <span className="font-medium">{((invoices.filter(inv => inv.paymentMethod === "Credit Card").length / invoices.length) * 100).toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Paypal</span>
                </div>
                <span className="font-medium">{((invoices.filter(inv => inv.paymentMethod === "Paypal").length / invoices.length) * 100).toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Debit Card</span>
                </div>
                <span className="font-medium">{((invoices.filter(inv => inv.paymentMethod === "Debit Card").length / invoices.length) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Invoices</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search invoices..."
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Status: {selectedStatus === "all" ? "All" : selectedStatus}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedStatus("all")}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("paid")}>Paid</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("unpaid")}>Unpaid</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Payment Method: {selectedPaymentMethod === "all" ? "All" : selectedPaymentMethod}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedPaymentMethod("all")}>All Methods</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedPaymentMethod("Credit Card")}>Credit Card</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedPaymentMethod("Paypal")}>Paypal</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedPaymentMethod("Debit Card")}>Debit Card</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {logoError[invoice.id] ? (
                        <span className="text-red-500 text-sm">Logo N/A</span>
                      ) : (
                        <img
                          src={invoice.logo || FALLBACK_LOGO}
                          alt={`${invoice.customer} Logo`}
                          className="h-6 w-auto object-contain"
                          onError={() => handleLogoError(invoice.id)}
                        />
                      )}
                      <span>{invoice.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell>{invoice.email}</TableCell>
                  <TableCell>{invoice.createdDate}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge
                      variant={invoice.status === "Paid" ? "default" : "secondary"}
                      className={invoice.status === "Paid" ? "bg-green-500" : "bg-red-500"}
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewInvoice(invoice)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadInvoice(invoice)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteInvoice(invoice.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invoice View Modal */}
      {selectedInvoice && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Invoice {selectedInvoice.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p><strong>Issue Date:</strong> {selectedInvoice.createdDate}</p>
                  <p><strong>Due Date:</strong> {new Date(new Date(selectedInvoice.createdDate).setMonth(new Date(selectedInvoice.createdDate).getMonth() + 1)).toLocaleDateString()}</p>
                </div>
                <div>
                  {logoError[selectedInvoice.id] ? (
                    <span className="text-red-500 text-sm">Logo not available</span>
                  ) : (
                    <img
                      src={selectedInvoice.logo || FALLBACK_LOGO}
                      alt={`${selectedInvoice.customer} Logo`}
                      className="h-10 w-auto object-contain"
                      onError={() => handleLogoError(selectedInvoice.id)}
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Invoice From:</h3>
                  <p>SmartHR</p>
                  <p>367 Hillcrest Lane, Irvine, California, United States</p>
                  <p>smarthr@example.com</p>
                </div>
                <div>
                  <h3 className="font-semibold">Invoice To:</h3>
                  <div className="flex items-center gap-2">
                    {logoError[selectedInvoice.id] ? (
                      <span className="text-red-500 text-sm">Logo N/A</span>
                    ) : (
                      <img
                        src={selectedInvoice.logo || FALLBACK_LOGO}
                        alt={`${selectedInvoice.customer} Logo`}
                        className="h-6 w-auto object-contain"
                        onError={() => handleLogoError(selectedInvoice.id)}
                      />
                    )}
                    <span>{selectedInvoice.customer}</span>
                  </div>
                  <p>{selectedInvoice.email}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Plan Details:</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan</TableHead>
                      <TableHead>Billing Cycle</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Expiring On</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Advanced (Monthly)</TableCell>
                      <TableCell>30 Days</TableCell>
                      <TableCell>{selectedInvoice.createdDate}</TableCell>
                      <TableCell>{new Date(new Date(selectedInvoice.createdDate).setMonth(new Date(selectedInvoice.createdDate).getMonth() + 1)).toLocaleDateString()}</TableCell>
                      <TableCell>${selectedInvoice.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div>
                <h3 className="font-semibold">Payment Info:</h3>
                <p>{selectedInvoice.paymentMethod} - {selectedInvoice.paymentMethod === "Credit Card" ? "123***********789" : "N/A"}</p>
              </div>
              <div className="flex justify-end">
                <div>
                  <p><strong>Sub Total:</strong> ${selectedInvoice.amount.toFixed(2)}</p>
                  <p><strong>Tax:</strong> $0.00</p>
                  <p><strong>Total:</strong> ${selectedInvoice.amount.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Terms & Conditions:</h3>
                <p>All payments must be made according to the agreed schedule. Late payments may incur additional fees.</p>
                <p>We are not liable for any indirect, incidental, or consequential damages, including loss of profits, revenue, or data.</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation AlertDialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Invoice</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete invoice {invoiceToDelete}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteInvoice}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}