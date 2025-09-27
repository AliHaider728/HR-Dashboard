 
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter, Edit2, Trash2, X, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const initialExpenses = [
  {
    id: "EXP-0001",
    name: "Online Course",
    date: "2024-01-14",
    paymentMethod: "Cash",
    amount: 3000,
  },
  {
    id: "EXP-0002",
    name: "Travel",
    date: "2024-02-20",
    paymentMethod: "Cheque",
    amount: 2800,
  },
  {
    id: "EXP-0003",
    name: "Office Supplies",
    date: "2024-03-15",
    paymentMethod: "Cash",
    amount: 3300,
  },
  {
    id: "EXP-0004",
    name: "Welcome Kit",
    date: "2024-04-12",
    paymentMethod: "Cheque",
    amount: 3600,
  },
  {
    id: "EXP-0005",
    name: "Equipment",
    date: "2024-04-20",
    paymentMethod: "Cheque",
    amount: 2000,
  },
  {
    id: "EXP-0006",
    name: "Miscellaneous",
    date: "2024-07-06",
    paymentMethod: "Cash",
    amount: 3400,
  },
  {
    id: "EXP-0007",
    name: "Payroll",
    date: "2024-09-02",
    paymentMethod: "Cheque",
    amount: 4000,
  },
  {
    id: "EXP-0008",
    name: "Cafeteria",
    date: "2024-11-15",
    paymentMethod: "Cash",
    amount: 4500,
  },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const ExpensesReport = () => {
  const [expenseList, setExpenseList] = useState(initialExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: '',
    amount: '',
  });
  const [errors, setErrors] = useState({});

  // Calculate stats
  const totalExpense = expenseList.reduce((sum, exp) => sum + exp.amount, 0);
  const approvedExpense = Math.floor(totalExpense * 0.95); // Assuming 95% approved
  const netPay = Math.floor(totalExpense * 0.85); // Assuming 85% net pay
  const allowances = Math.floor(totalExpense * 0.05); // Assuming 5% allowances

  // Generate next expense ID
  const generateExpenseId = () => {
    const lastId = expenseList.length > 0 
      ? Math.max(...expenseList.map(exp => parseInt(exp.id.split('-')[1]))) 
      : 0;
    return `EXP-${String(lastId + 1).padStart(4, '0')}`;
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Expense name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newExpense = {
      id: editIndex !== null ? expenseList[editIndex].id : generateExpenseId(),
      name: formData.name,
      date: formData.date,
      paymentMethod: formData.paymentMethod,
      amount: parseFloat(formData.amount),
    };

    if (editIndex !== null) {
      setExpenseList(prev => {
        const updatedList = [...prev];
        updatedList[editIndex] = newExpense;
        return updatedList;
      });
      alert(`Expense "${newExpense.name}" has been updated successfully!`);
    } else {
      setExpenseList(prev => [...prev, newExpense]);
      alert(`Expense "${newExpense.name}" has been added successfully with ID: ${newExpense.id}`);
    }

    setShowAddModal(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      amount: '',
    });
    setErrors({});
    setEditIndex(null);
  };

  // Handle edit
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData({
      name: expenseList[index].name,
      date: expenseList[index].date,
      paymentMethod: expenseList[index].paymentMethod,
      amount: expenseList[index].amount.toString(),
    });
    setShowAddModal(true);
  };

  // Handle delete
  const handleDelete = (index) => {
    if (confirm(`Are you sure you want to delete the expense "${expenseList[index].name}"?`)) {
      setExpenseList(prev => prev.filter((_, i) => i !== index));
      alert('Expense deleted successfully!');
    }
  };

  // Filter expenses
  const filteredExpenses = useMemo(() => {
    return expenseList.filter(expense => {
      const matchesSearch = expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMethod = selectedMethod === 'all' || expense.paymentMethod === selectedMethod;
      return matchesSearch && matchesMethod;
    });
  }, [expenseList, searchTerm, selectedMethod]);

  // Open add modal
  const openAddModal = () => {
    setEditIndex(null);
    resetForm();
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Expenses Report</h1>
              <p className="text-gray-600">Manage your company expenses and payments</p>
            </div>
            <Button 
              className="mt-4 md:mt-0 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
              onClick={openAddModal}
            >
              <Plus className="w-4 h-4" />
              Add Expense
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          <Card className="border-0 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Expense</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpense)}</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-orange-600" />
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
                  <p className="text-sm font-medium text-gray-600 mb-1">Approved Expense</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(approvedExpense)}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +17.01% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Net Pay</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(netPay)}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +10.13% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Allowances</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(allowances)}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                -10.17% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-xl mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Search expenses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Select
                  value={selectedMethod}
                  onValueChange={setSelectedMethod}
                >
                  <SelectTrigger className="w-[180px] border-gray-300 focus:ring-2 focus:ring-orange-500">
                    <SelectValue placeholder="All Methods" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                    <SelectItem value="Transfer">Transfer</SelectItem>
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

        {/* Expense Table */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Expense Details</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-sm font-medium text-gray-700">Expense Name</TableHead>
                    <TableHead className="text-sm font-medium text-gray-700">Date</TableHead>
                    <TableHead className="text-sm font-medium text-gray-700">Payment Method</TableHead>
                    <TableHead className="text-sm font-medium text-gray-700">Amount</TableHead>
                    <TableHead className="text-sm font-medium text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((expense, index) => (
                    <TableRow 
                      key={expense.id} 
                      className="border-b hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-gray-900">{expense.name}</TableCell>
                      <TableCell className="text-sm text-gray-600">{formatDate(expense.date)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          expense.paymentMethod === 'Cash' ? 'bg-green-100 text-green-800' :
                          expense.paymentMethod === 'Cheque' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {expense.paymentMethod}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-gray-900">{formatCurrency(expense.amount)}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(index)}
                            className="h-8 w-8 p-0 hover:bg-orange-100 transition-colors duration-200"
                          >
                            <Edit2 className="h-4 w-4 text-orange-600" />
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
            {filteredExpenses.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No expenses found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Expense Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{editIndex !== null ? 'Edit Expense' : 'Add New Expense'}</h2>
                  <p className="text-sm text-gray-600">Expense ID: {editIndex !== null ? expenseList[editIndex].id : generateExpenseId()}</p>
                </div>
                <Button 
                  variant="ghost"
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Expense Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expense Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter expense name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className={`w-full ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange('paymentMethod', value)}
                    >
                      <SelectTrigger className={`w-full ${errors.paymentMethod ? 'border-red-500' : 'border-gray-300'}`}>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Cheque">Cheque</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                        <SelectItem value="Transfer">Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>}
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
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      className={`w-full ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter amount"
                    />
                    {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="border-t p-6 bg-gray-50">
                <div className="flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => { setShowAddModal(false); resetForm(); }}
                    className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700 hover:text-white transition-colors duration-200"
                  >
                    {editIndex !== null ? 'Update Expense' : 'Add Expense'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesReport;
