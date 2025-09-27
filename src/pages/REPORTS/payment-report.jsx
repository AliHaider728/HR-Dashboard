 

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
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Calendar,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

// Initial payments data (based on template)
const initialPayments = [
  {
    id: "Inv-001",
    clientName: "Michael Walker",
    clientTitle: "CEO",
    companyName: "BrightWave Innovations",
    paymentType: "Paypal",
    paidDate: "2024-01-15",
    amount: 3000,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "Inv-002",
    clientName: "Sophie Headrick",
    clientTitle: "Manager",
    companyName: "Stellar Dynamics",
    paymentType: "Paypal",
    paidDate: "2024-01-25",
    amount: 2500,
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: "Inv-003",
    clientName: "Cameron Drake",
    clientTitle: "Director",
    companyName: "Quantum Nexus",
    paymentType: "Paypal",
    paidDate: "2024-02-22",
    amount: 2800,
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: "Inv-004",
    clientName: "Doris Crowley",
    clientTitle: "Consultant",
    companyName: "EcoVision Enterprises",
    paymentType: "Paypal",
    paidDate: "2024-03-15",
    amount: 3300,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "Inv-005",
    clientName: "Thomas Bordelon",
    clientTitle: "Manager",
    companyName: "Aurora Technologies",
    paymentType: "Paypal",
    paidDate: "2024-04-16",
    amount: 3600,
    image: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    id: "Inv-006",
    clientName: "Kathleen Gutierrez",
    clientTitle: "Director",
    companyName: "BlueSky Ventures",
    paymentType: "Paypal",
    paidDate: "2024-04-21",
    amount: 2000,
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: "Inv-007",
    clientName: "Bruce Wright",
    clientTitle: "CEO",
    companyName: "TerraFusion Energy",
    paymentType: "Paypal",
    paidDate: "2024-07-06",
    amount: 3400,
    image: "https://randomuser.me/api/portraits/men/39.jpg",
  },
  {
    id: "Inv-008",
    clientName: "Estelle Morgan",
    clientTitle: "Manager",
    companyName: "UrbanPulse Design",
    paymentType: "Paypal",
    paidDate: "2024-09-04",
    amount: 4000,
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    id: "Inv-009",
    clientName: "Stephen Dias",
    clientTitle: "CEO",
    companyName: "Nimbus Networks",
    paymentType: "Paypal",
    paidDate: "2024-11-15",
    amount: 4500,
    image: "https://randomuser.me/api/portraits/men/27.jpg",
  },
  {
    id: "Inv-010",
    clientName: "Angela Thomas",
    clientTitle: "Consultant",
    companyName: "Apex Solutions",
    paymentType: "Paypal",
    paidDate: "2024-11-20",
    amount: 3800,
    image: "https://randomuser.me/api/portraits/women/19.jpg",
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
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getAvatarUrl = (name) => {
  if (!name) return "";
  const cleanName = name.replace(/\s+/g, "+");
  return `https://ui-avatars.com/api/?name=${cleanName}&size=32&background=random&color=fff`;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PaymentReport = () => {
  const [paymentList, setPaymentList] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    clientName: "",
    clientTitle: "",
    companyName: "",
    paymentType: "Paypal",
    paidDate: new Date().toISOString().split("T")[0],
    amount: "",
  });
  const [errors, setErrors] = useState({});

  // Calculate stats (matching template)
  const totalPayments = paymentList.reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = Math.floor(totalPayments * 0.1); // Demo: 10% pending
  const failedPayments = 10470; // From template
  const successRate = "90%";

  // Chart data for Payments by Method (demo data matching template values)
  const chartData = useMemo(() => [
    { name: "Paypal", value: 54071 },
    { name: "Credit Card", value: 54210 },
    { name: "Bank Transfer", value: 32210 },
    { name: "Cash", value: 18000 },
  ], []);

  // Generate next payment ID
  const generatePaymentId = () => {
    const lastId = paymentList.length > 0 ? Math.max(...paymentList.map(p => parseInt(p.id.split("-")[1]))) : 0;
    return `Inv-${String(lastId + 1).padStart(3, "0")}`;
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
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.paymentType) newErrors.paymentType = "Payment type is required";
    if (!formData.paidDate) newErrors.paidDate = "Paid date is required";
    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Valid amount is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    const newPayment = {
      id: editIndex !== null ? paymentList[editIndex].id : generatePaymentId(),
      clientName: formData.clientName,
      clientTitle: formData.clientTitle,
      companyName: formData.companyName,
      paymentType: formData.paymentType,
      paidDate: formData.paidDate,
      amount: parseFloat(formData.amount),
    };

    if (editIndex !== null) {
      setPaymentList((prev) => {
        const updatedList = [...prev];
        updatedList[editIndex] = newPayment;
        return updatedList;
      });
      alert(`Payment "${newPayment.id}" has been updated successfully!`);
    } else {
      setPaymentList((prev) => [...prev, newPayment]);
      alert(`Payment "${newPayment.id}" has been added successfully!`);
    }

    setShowAddDialog(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      clientName: "",
      clientTitle: "",
      companyName: "",
      paymentType: "Paypal",
      paidDate: new Date().toISOString().split("T")[0],
      amount: "",
    });
    setErrors({});
    setEditIndex(null);
  };

  // Handle edit
  const handleEdit = (index) => {
    setEditIndex(index);
    const payment = paymentList[index];
    setFormData({
      clientName: payment.clientName,
      clientTitle: payment.clientTitle,
      companyName: payment.companyName,
      paymentType: payment.paymentType,
      paidDate: payment.paidDate,
      amount: payment.amount.toString(),
    });
    setShowAddDialog(true);
  };

  // Handle delete
  const handleDelete = (index) => {
    if (confirm(`Are you sure you want to delete the payment "${paymentList[index].id}"?`)) {
      setPaymentList((prev) => prev.filter((_, i) => i !== index));
      alert("Payment deleted successfully!");
    }
  };

  // Filter payments
  const filteredPayments = useMemo(() => {
    return paymentList.filter((payment) => {
      const matchesSearch =
        payment.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "all" || payment.paymentType === selectedType;
      return matchesSearch && matchesType;
    });
  }, [paymentList, searchTerm, selectedType]);

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
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Payment Report</h1>
              <p className="text-gray-600">Manage your company payments</p>
            </div>
            <Button
              className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
              onClick={openAddDialog}
            >
              <Plus className="w-4 h-4" />
              Add Payment
            </Button>
          </div>
        </div>

        {/* Stats Cards - Matching template */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          <Card className="border-0 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Payments</p>
                  <p className="text-2xl font-bold text-gray-900">$45,221</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +20.01% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Pending Payments</p>
                  <p className="text-2xl font-bold text-gray-900">$45,221</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +20.01% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Failed Payments</p>
                  <p className="text-2xl font-bold text-gray-900">$10,470</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +20.01% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Payment Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">90%</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +20.01% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payments By Payment Methods Chart - Elegant Pie Chart */}
        <Card className="border-0 shadow-xl mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Payments By Payment Methods</CardTitle>
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +14% vs last year
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
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
                  placeholder="Search payments..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[180px] border-gray-300 focus:ring-2 focus:ring-green-500">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Paypal">Paypal</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
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

        {/* Payment Table */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-sm font-bold text-gray-900">Invoice ID</TableHead>
                    <TableHead className="text-sm font-bold text-gray-900">Client Name</TableHead>
                    <TableHead className="text-sm font-bold text-gray-900">Company Name</TableHead>
                    <TableHead className="text-sm font-bold text-gray-900">Payment Type</TableHead>
                    <TableHead className="text-sm font-bold text-gray-900">Paid Date</TableHead>
                    <TableHead className="text-sm font-bold text-gray-900">Paid Amount</TableHead>
                    <TableHead className="text-sm font-bold text-gray-900">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment, index) => (
                    <TableRow
                      key={payment.id}
                      className="border-b hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-gray-900">
                        <a href="#" className="text-blue-600 hover:underline">{payment.id}</a>
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          {payment.clientName && (
                            <>
                              <img
                                src={getAvatarUrl(payment.clientName)}
                                alt={`${payment.clientName} avatar`}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <p className="font-semibold">{payment.clientName}</p>
                                <p className="text-xs text-gray-500">{payment.clientTitle}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{payment.companyName}</TableCell>
                      <TableCell>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {payment.paymentType}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(payment.paidDate)}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-gray-900">
                        {formatCurrency(payment.amount)}
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(index)}
                            className="h-8 w-8 p-0 hover:bg-green-100 transition-colors duration-200"
                          >
                            <Edit2 className="h-4 w-4 text-green-600" />
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
            {filteredPayments.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No payments found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Payment Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>{editIndex !== null ? "Edit Payment" : "Add New Payment"}</DialogTitle>
              <DialogDescription>
                Payment ID: {editIndex !== null ? paymentList[editIndex].id : generatePaymentId()}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Client Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <Input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
                  className="w-full border-gray-300"
                  placeholder="Enter client name"
                />
              </div>

              {/* Client Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Title</label>
                <Input
                  type="text"
                  value={formData.clientTitle}
                  onChange={(e) => handleInputChange("clientTitle", e.target.value)}
                  className="w-full border-gray-300"
                  placeholder="Enter client title (e.g., Director)"
                />
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
                  className={`w-full ${errors.companyName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter company name"
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
              </div>

              {/* Payment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Type <span className="text-red-500">*</span>
                </label>
                <Select value={formData.paymentType} onValueChange={(value) => handleInputChange("paymentType", value)}>
                  <SelectTrigger className={`w-full ${errors.paymentType ? "border-red-500" : "border-gray-300"}`}>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paypal">Paypal</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
                {errors.paymentType && <p className="text-red-500 text-xs mt-1">{errors.paymentType}</p>}
              </div>

              {/* Paid Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paid Date <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={formData.paidDate}
                  onChange={(e) => handleInputChange("paidDate", e.target.value)}
                  className={`w-full ${errors.paidDate ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.paidDate && <p className="text-red-500 text-xs mt-1">{errors.paidDate}</p>}
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
                  className={`w-full ${errors.amount ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter amount"
                />
                {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
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
                {editIndex !== null ? "Update Payment" : "Add Payment"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PaymentReport;