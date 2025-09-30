"use client"

import { useState, useEffect } from "react"
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
  const [logoError, setLogoError] = useState({})
  const [viewMode, setViewMode] = useState('table') // 'table' or 'card'

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // sm breakpoint
        setViewMode('card')
      } else if (!viewMode) {
        setViewMode('table')
      }
    }

    handleResize() // Set initial view
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  const handleLogoError = (invoiceId) => {
    setLogoError((prev) => ({ ...prev, [invoiceId]: true }))
    toast.error(`Failed to load logo for invoice ${invoiceId}`)
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 max-w-8xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Purchase Transactions</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Super Admin / Purchase Transaction</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm" aria-label="Export all invoices">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {transactionStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-600">{stat.title}</p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-xs sm:text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-2xl text-gray-900">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm sm:text-base">Credit Card</span>
                </div>
                <span className="font-medium text-sm sm:text-base">{((invoices.filter(inv => inv.paymentMethod === "Credit Card").length / invoices.length) * 100).toFixed(1)}%</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm sm:text-base">Paypal</span>
                </div>
                <span className="font-medium text-sm sm:text-base">{((invoices.filter(inv => inv.paymentMethod === "Paypal").length / invoices.length) * 100).toFixed(1)}%</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm sm:text-base">Debit Card</span>
                </div>
                <span className="font-medium text-sm sm:text-base">{((invoices.filter(inv => inv.paymentMethod === "Debit Card").length / invoices.length) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-lg sm:text-xl md:text-2xl text-gray-900">All Invoices</CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" aria-hidden="true" />
                <Input
                  placeholder="Search invoices..."
                  className="pl-10 text-sm sm:text-base w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search invoices"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto" aria-label="Filter by status">
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
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto" aria-label="Filter by payment method">
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
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant={viewMode === 'table' ? "default" : "outline"}
              onClick={() => setViewMode('table')}
              className="text-xs sm:text-sm"
              aria-label="Switch to table view"
            >
              Table  
            </Button>
            <Button
              variant={viewMode === 'card' ? "default" : "outline"}
              onClick={() => setViewMode('card')}
              className="text-xs sm:text-sm"
              aria-label="Switch to card view"
            >
              Card  
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Invoice ID</TableHead>
                    <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Customer</TableHead>
                    <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Email</TableHead>
                    <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Created Date</TableHead>
                    <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Amount</TableHead>
                    <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Payment Method</TableHead>
                    <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <TableCell className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base text-gray-900">{invoice.id}</TableCell>
                        <TableCell className="py-3 sm:py-4 px-2 sm:px-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            {logoError[invoice.id] ? (
                              <span className="text-red-500 text-xs sm:text-sm">Logo N/A</span>
                            ) : (
                              <img
                                src={invoice.logo || FALLBACK_LOGO}
                                alt={`${invoice.customer} Logo`}
                                className="h-5 w-auto sm:h-6 object-contain"
                                onError={() => handleLogoError(invoice.id)}
                              />
                            )}
                            <span className="text-sm sm:text-base text-gray-900">{invoice.customer}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base text-gray-900">{invoice.email}</TableCell>
                        <TableCell className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base text-gray-900">{invoice.createdDate}</TableCell>
                        <TableCell className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base text-gray-900">${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base text-gray-900">{invoice.paymentMethod}</TableCell>
                        <TableCell className="py-3 sm:py-4 px-2 sm:px-4">
                          <Badge
                            variant={invoice.status === "Paid" ? "default" : "secondary"}
                            className={`text-xs sm:text-sm ${invoice.status === "Paid" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3 sm:py-4 px-2 sm:px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewInvoice(invoice)} className="text-xs sm:text-sm" aria-label={`View invoice ${invoice.id}`}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDownloadInvoice(invoice)} className="text-xs sm:text-sm" aria-label={`Download invoice ${invoice.id}`}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteInvoice(invoice.id)} className="text-xs sm:text-sm" aria-label={`Delete invoice ${invoice.id}`}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="py-8 text-center text-gray-500 text-sm sm:text-base">
                        No invoices found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <Card key={invoice.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">{invoice.id}</h3>
                        <Badge
                          variant={invoice.status === "Paid" ? "default" : "secondary"}
                          className={`text-xs ${invoice.status === "Paid" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        {logoError[invoice.id] ? (
                          <span className="text-red-500 text-xs">Logo N/A</span>
                        ) : (
                          <img
                            src={invoice.logo || FALLBACK_LOGO}
                            alt={`${invoice.customer} Logo`}
                            className="h-5 w-auto object-contain"
                            onError={() => handleLogoError(invoice.id)}
                          />
                        )}
                        <span className="text-sm text-gray-900 font-medium">{invoice.customer}</span>
                      </div>
                      <p className="text-xs text-gray-600">{invoice.email}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>{invoice.createdDate}</span>
                      </div>
                      <p className="text-sm font-semibold text-green-600">${invoice.amount.toFixed(2)}</p>
                      <p className="text-xs text-gray-600">{invoice.paymentMethod}</p>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewInvoice(invoice)} className="text-xs flex-1" aria-label={`View invoice ${invoice.id}`}>
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDownloadInvoice(invoice)} className="text-xs flex-1" aria-label={`Download invoice ${invoice.id}`}>
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteInvoice(invoice.id)} className="text-xs flex-1" aria-label={`Delete invoice ${invoice.id}`}>
                          <Trash className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 text-sm sm:text-base py-8">No invoices found matching your criteria.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoice View Modal */}
      {selectedInvoice && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-full sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl md:text-2xl text-gray-900">Invoice {selectedInvoice.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-sm sm:text-base"><strong>Issue Date:</strong> {selectedInvoice.createdDate}</p>
                  <p className="text-sm sm:text-base"><strong>Due Date:</strong> {new Date(new Date(selectedInvoice.createdDate).setMonth(new Date(selectedInvoice.createdDate).getMonth() + 1)).toLocaleDateString()}</p>
                </div>
                <div>
                  {logoError[selectedInvoice.id] ? (
                    <span className="text-red-500 text-xs sm:text-sm">Logo not available</span>
                  ) : (
                    <img
                      src={selectedInvoice.logo || FALLBACK_LOGO}
                      alt={`${selectedInvoice.customer} Logo`}
                      className="h-8 w-auto sm:h-10 object-contain"
                      onError={() => handleLogoError(selectedInvoice.id)}
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900">Invoice From:</h3>
                  <p className="text-sm sm:text-base">SmartHR</p>
                  <p className="text-sm sm:text-base">367 Hillcrest Lane, Irvine, California, United States</p>
                  <p className="text-sm sm:text-base">smarthr@example.com</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900">Invoice To:</h3>
                  <div className="flex items-center gap-2 sm:gap-3">
                    {logoError[selectedInvoice.id] ? (
                      <span className="text-red-500 text-xs sm:text-sm">Logo N/A</span>
                    ) : (
                      <img
                        src={selectedInvoice.logo || FALLBACK_LOGO}
                        alt={`${selectedInvoice.customer} Logo`}
                        className="h-5 w-auto sm:h-6 object-contain"
                        onError={() => handleLogoError(selectedInvoice.id)}
                      />
                    )}
                    <span className="text-sm sm:text-base text-gray-900">{selectedInvoice.customer}</span>
                  </div>
                  <p className="text-sm sm:text-base">{selectedInvoice.email}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">Plan Details:</h3>
                <div className="overflow-x-auto">
                  <Table className="min-w-[600px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Plan</TableHead>
                        <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Billing Cycle</TableHead>
                        <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Created Date</TableHead>
                        <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Expiring On</TableHead>
                        <TableHead className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base text-gray-900">Advanced (Monthly)</TableCell>
                        <TableCell className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base text-gray-900">30 Days</TableCell>
                        <TableCell className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base text-gray-900">{selectedInvoice.createdDate}</TableCell>
                        <TableCell className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base text-gray-900">{new Date(new Date(selectedInvoice.createdDate).setMonth(new Date(selectedInvoice.createdDate).getMonth() + 1)).toLocaleDateString()}</TableCell>
                        <TableCell className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base text-gray-900">${selectedInvoice.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">Payment Info:</h3>
                <p className="text-sm sm:text-base">{selectedInvoice.paymentMethod} - {selectedInvoice.paymentMethod === "Credit Card" ? "123***********789" : "N/A"}</p>
              </div>
              <div className="flex justify-end">
                <div className="space-y-2">
                  <p className="text-sm sm:text-base"><strong>Sub Total:</strong> ${selectedInvoice.amount.toFixed(2)}</p>
                  <p className="text-sm sm:text-base"><strong>Tax:</strong> $0.00</p>
                  <p className="text-sm sm:text-base"><strong>Total:</strong> ${selectedInvoice.amount.toFixed(2)}</p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">Terms & Conditions:</h3>
                <p className="text-sm sm:text-base">All payments must be made according to the agreed schedule. Late payments may incur additional fees.</p>
                <p className="text-sm sm:text-base">We are not liable for any indirect, incidental, or consequential damages, including loss of profits, revenue, or data.</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation AlertDialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="max-w-full sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl text-gray-900">Delete Invoice</AlertDialogTitle>
            <AlertDialogDescription className="text-sm sm:text-base text-gray-600">
              Are you sure you want to delete invoice {invoiceToDelete}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto text-xs sm:text-sm" aria-label="Cancel delete">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteInvoice} className="w-full sm:w-auto text-xs sm:text-sm bg-red-600 hover:bg-red-700" aria-label="Confirm delete">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}