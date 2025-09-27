 

import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Filter,
  Edit2,
  Trash2,
  X,
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Initial invoices data
const initialInvoices = [
  {
    id: "INV-0001",
    clientName: "Cameron Drake, Director",
    companyName: "Tech Corp Inc.",
    createdDate: "2024-01-15",
    dueDate: "2024-02-15",
    amount: 3000,
    status: "Paid",
  },
  {
    id: "INV-0002",
    clientName: "Sarah Johnson",
    companyName: "Design Studio Ltd.",
    createdDate: "2024-02-20",
    dueDate: "2024-03-20",
    amount: 4500,
    status: "Partially Paid",
  },
  {
    id: "INV-0003",
    clientName: "Michael Chen",
    companyName: "Consulting Group",
    createdDate: "2024-03-10",
    dueDate: "2024-04-10",
    amount: 2800,
    status: "Sent",
  },
  {
    id: "INV-0004",
    clientName: "Emily Rodriguez",
    companyName: "Marketing Agency",
    createdDate: "2024-04-05",
    dueDate: "2024-05-05",
    amount: 5200,
    status: "Overdue",
  },
  {
    id: "INV-0005",
    clientName: "David Wilson",
    companyName: "Software Solutions",
    createdDate: "2024-05-12",
    dueDate: "2024-06-12",
    amount: 3800,
    status: "Unpaid",
  },
  {
    id: "INV-0006",
    clientName: "Lisa Thompson",
    companyName: "HR Services",
    createdDate: "2024-06-18",
    dueDate: "2024-07-18",
    amount: 4200,
    status: "Paid",
  },
  {
    id: "INV-0007",
    clientName: "Robert Lee",
    companyName: "Finance Firm",
    createdDate: "2024-07-22",
    dueDate: "2024-08-22",
    amount: 2900,
    status: "Partially Paid",
  },
  {
    id: "INV-0008",
    clientName: "Anna Davis",
    companyName: "Event Planning Co.",
    createdDate: "2024-08-30",
    dueDate: "2024-09-30",
    amount: 6100,
    status: "Sent",
  },
];

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-800";
    case "Partially Paid":
      return "bg-yellow-100 text-yellow-800";
    case "Sent":
      return "bg-blue-100 text-blue-800";
    case "Overdue":
      return "bg-red-100 text-red-800";
    case "Unpaid":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Generate random avatar URL using ui-avatars.com
const getAvatarUrl = (name) => {
  const cleanName = name.split(",")[0].trim().replace(/\s+/g, "+");
  return `https://ui-avatars.com/api/?name=${cleanName}&size=32&background=random&color=fff`;
};

const InvoiceReport = () => {
  const [invoiceList, setInvoiceList] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    clientName: "",
    companyName: "",
    createdDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    amount: "",
    status: "Sent",
  });
  const [errors, setErrors] = useState({});

  // Calculate stats
  const totalInvoices = invoiceList.length;
  const paidInvoices = invoiceList.filter((inv) => inv.status === "Paid").length;
  const partiallyPaid = invoiceList.filter(
    (inv) => inv.status === "Partially Paid"
  ).length;
  const overdueInvoices = invoiceList.filter(
    (inv) => inv.status === "Overdue"
  ).length;
  const unpaidInvoices = invoiceList.filter(
    (inv) => inv.status === "Unpaid"
  ).length;
  const totalRevenue = invoiceList.reduce((sum, inv) => sum + inv.amount, 0);

  // Prepare data for Recharts
  const chartData = useMemo(() => {
    const statusTotals = invoiceList.reduce((acc, inv) => {
      acc[inv.status] = (acc[inv.status] || 0) + inv.amount;
      return acc;
    }, {});
    return [
      { status: "Paid", amount: statusTotals["Paid"] || 0 },
      { status: "Partially Paid", amount: statusTotals["Partially Paid"] || 0 },
      { status: "Sent", amount: statusTotals["Sent"] || 0 },
      { status: "Overdue", amount: statusTotals["Overdue"] || 0 },
      { status: "Unpaid", amount: statusTotals["Unpaid"] || 0 },
    ];
  }, [invoiceList]);

  // Generate next invoice ID
  const generateInvoiceId = () => {
    const lastId =
      invoiceList.length > 0
        ? Math.max(...invoiceList.map((inv) => parseInt(inv.id.split("-")[1])))
        : 0;
    return `INV-${String(lastId + 1).padStart(4, "0")}`;
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.clientName.trim())
      newErrors.clientName = "Client name is required";
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!formData.createdDate) newErrors.createdDate = "Created date is required";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";
    if (
      !formData.amount ||
      isNaN(formData.amount) ||
      parseFloat(formData.amount) <= 0
    ) {
      newErrors.amount = "Valid amount is required";
    }
    if (!formData.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    const newInvoice = {
      id: editIndex !== null ? invoiceList[editIndex].id : generateInvoiceId(),
      clientName: formData.clientName,
      companyName: formData.companyName,
      createdDate: formData.createdDate,
      dueDate: formData.dueDate,
      amount: parseFloat(formData.amount),
      status: formData.status,
    };

    if (editIndex !== null) {
      setInvoiceList((prev) => {
        const updatedList = [...prev];
        updatedList[editIndex] = newInvoice;
        return updatedList;
      });
      alert(`Invoice "${newInvoice.id}" has been updated successfully!`);
    } else {
      setInvoiceList((prev) => [...prev, newInvoice]);
      alert(`Invoice "${newInvoice.id}" has been added successfully!`);
    }

    setShowAddDialog(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      clientName: "",
      companyName: "",
      createdDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      amount: "",
      status: "Sent",
    });
    setErrors({});
    setEditIndex(null);
  };

  // Handle edit
  const handleEdit = (index) => {
    setEditIndex(index);
    const invoice = invoiceList[index];
    setFormData({
      clientName: invoice.clientName,
      companyName: invoice.companyName,
      createdDate: invoice.createdDate,
      dueDate: invoice.dueDate,
      amount: invoice.amount.toString(),
      status: invoice.status,
    });
    setShowAddDialog(true);
  };

  // Handle delete
  const handleDelete = (index) => {
    if (
      confirm(
        `Are you sure you want to delete the invoice "${invoiceList[index].id}"?`
      )
    ) {
      setInvoiceList((prev) => prev.filter((_, i) => i !== index));
      alert("Invoice deleted successfully!");
    }
  };

  // Filter invoices
  const filteredInvoices = useMemo(() => {
    return invoiceList.filter((invoice) => {
      const matchesSearch =
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || invoice.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [invoiceList, searchTerm, selectedStatus]);

  // Open add dialog
  const openAddDialog = () => {
    setEditIndex(null);
    resetForm();
    setShowAddDialog(true);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Invoice Report
              </h1>
              <p className="text-gray-600">
                Manage your company invoices and payments
              </p>
            </div>
            <Button
              className="mt-4 md:mt-0 bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
              onClick={openAddDialog}
            >
              <Plus className="w-4 h-4" />
              Add Invoice
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          <Card className="border-0 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Invoices
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalInvoices}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +19.01% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Partially Paid
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {partiallyPaid}
                  </p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +19.01% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Paid Invoices
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {paidInvoices}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +19.01% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Overdue Invoices
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {overdueInvoices}
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                +5.23% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Unpaid Invoices
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {unpaidInvoices}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                -3.45% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalRevenue)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +19.01% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="border-0 shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Invoice Amounts by Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar
                    dataKey="amount"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                    barSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="border-0 shadow-xl mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Search invoices..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-[180px] border-gray-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                    <SelectItem value="Sent">Sent</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="px-4 py-2 border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Table */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">
              Invoice Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-sm font-bold text-gray-900">
                      Invoice ID
                    </TableHead>
                    <TableHead className="text-sm font-bold text-gray-900">
                      Client Name
                    </TableHead>
                    <TableHead className="text-sm font-bold text-gray-900">
                      Company Name
                    </TableHead>
                    <TableHead className="text-sm font-bold text-gray-900">
                      Created Date
                    </TableHead>
                    <TableHead className="text-sm font-bold text-gray-900">
                      Due Date
                    </TableHead>
                    <TableHead className="text-sm font-bold text-gray-900">
                      Amount
                    </TableHead>
                    <TableHead className="text-sm font-bold text-gray-900">
                      Status
                    </TableHead>
                    <TableHead className="text-sm font-bold text-gray-900">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice, index) => (
                    <TableRow
                      key={invoice.id}
                      className="border-b hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-gray-900">
                        {invoice.id}
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <img
                            src={getAvatarUrl(invoice.clientName)}
                            alt={`${invoice.clientName} avatar`}
                            className="w-8 h-8 rounded-full"
                          />
                          {invoice.clientName}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {invoice.companyName}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(invoice.createdDate)}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(invoice.dueDate)}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(
                            invoice.status
                          )}`}
                        >
                          {invoice.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(index)}
                            className="h-8 w-8 p-0 hover:bg-blue-100 transition-colors duration-200"
                          >
                            <Edit2 className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(index)}
                            className="h-8 w-8 p-0 hover:bg-red-100 transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredInvoices.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No invoices found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Invoice Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>
                {editIndex !== null ? "Edit Invoice" : "Add New Invoice"}
              </DialogTitle>
              <DialogDescription>
                Invoice ID:{" "}
                {editIndex !== null ? invoiceList[editIndex].id : generateInvoiceId()}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Client Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
                  className={`w-full ${
                    errors.clientName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter client name"
                />
                {errors.clientName && (
                  <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  className={`w-full ${
                    errors.companyName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter company name"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                )}
              </div>

              {/* Created Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created Date <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={formData.createdDate}
                  onChange={(e) => handleInputChange("createdDate", e.target.value)}
                  className={`w-full ${
                    errors.createdDate ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter created date"
                />
                {errors.createdDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.createdDate}</p>
                )}
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  className={`w-full ${
                    errors.dueDate ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter due date"
                />
                {errors.dueDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className={`w-full ${
                    errors.amount ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter amount"
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger
                    className={`w-full ${
                      errors.status ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                    <SelectItem value="Sent">Sent</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">{errors.status}</p>
                )}
              </div>
            </form>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddDialog(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleSubmit}>
                {editIndex !== null ? "Update Invoice" : "Add Invoice"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default InvoiceReport;
