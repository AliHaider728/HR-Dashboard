import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Wallet,
  TrendingUp,
  TrendingDown,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PayslipReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  const stats = [
    {
      title: "Total Payroll",
      value: "$250,000",
      change: "+20.01%",
      icon: DollarSign,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Deductions",
      value: "$50,000",
      change: "+17.01%",
      icon: TrendingDown,
      color: "text-red-600 bg-red-100",
    },
    {
      title: "Net Pay",
      value: "$200,000",
      change: "+10.01%",
      icon: Wallet,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Allowances",
      value: "$30,000",
      change: "-10.01%",
      icon: TrendingUp,
      color: "text-purple-600 bg-purple-100",
    },
  ];

  const payslips = [
    {
      id: 1,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-32.jpg",
      name: "Anthony Lewis",
      role: "Finance",
      paidAmount: 3000,
      paidMonth: "September",
      paidYear: "2025",
    },
    {
      id: 2,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-09.jpg",
      name: "Brian Villalobos",
      role: "Developer",
      paidAmount: 2500,
      paidMonth: "September",
      paidYear: "2025",
    },
    {
      id: 3,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-36.jpg",
      name: "Connie Waters",
      role: "Developer",
      paidAmount: 2800,
      paidMonth: "September",
      paidYear: "2025",
    },
    {
      id: 4,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
      name: "Doglas Martini",
      role: "Manager",
      paidAmount: 3300,
      paidMonth: "September",
      paidYear: "2025",
    },
    {
      id: 5,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-35.jpg",
      name: "Elliot Murray",
      role: "Finance",
      paidAmount: 3600,
      paidMonth: "September",
      paidYear: "2025",
    },
    {
      id: 6,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
      name: "Harvey Smith",
      role: "Developer",
      paidAmount: 2000,
      paidMonth: "September",
      paidYear: "2025",
    },
    {
      id: 7,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
      name: "Linda Ray",
      role: "Finance",
      paidAmount: 3400,
      paidMonth: "September",
      paidYear: "2025",
    },
    {
      id: 8,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-36.jpg",
      name: "Lori Broaddus",
      role: "Developer",
      paidAmount: 4000,
      paidMonth: "September",
      paidYear: "2025",
    },
    {
      id: 9,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
      name: "Rebecca Smith",
      role: "Executive",
      paidAmount: 4500,
      paidMonth: "September",
      paidYear: "2025",
    },
  ];

  // Sorting function
  const sortRecords = (records, key, direction) => {
    return [...records].sort((a, b) => {
      if (key === "paidAmount") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
      const aValue = a[key] || "";
      const bValue = b[key] || "";
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  };

  // Filter and sort payslips
  const filteredPayslips = useMemo(() => {
    let filtered = payslips.filter(
      (pay) =>
        pay.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pay.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pay.paidAmount.toString().includes(searchTerm) ||
        pay.paidMonth.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pay.paidYear.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return sortRecords(filtered, sortConfig.key, sortConfig.direction);
  }, [payslips, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredPayslips.length / rowsPerPage);
  const paginatedPayslips = filteredPayslips.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle column sorting
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Chart data
  const payrollDistribution = payslips.map((pay) => ({
    name: pay.name,
    value: pay.paidAmount,
  }));

  const monthlyPayrollTrends = [
    { month: "Apr", amount: 25000 },
    { month: "May", amount: 28000 },
    { month: "Jun", amount: 30000 },
    { month: "Jul", amount: 27000 },
    { month: "Aug", amount: 29000 },
    { month: "Sep", amount: 31000 },
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#F94D6A",
    "#A55FFA",
    "#50C878",
    "#EC4899",
    "#3B82F6",
  ];

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 font-[Inter]">
        <div className="max-w-full mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 font-[Poppins]">
                  Payslip Report
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Track and analyze payroll data for employees
                </p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
                          {stat.title}
                        </p>
                        <p className="text-xl sm:text-3xl font-bold text-gray-900 mt-2 font-[Poppins]">
                          {stat.value}
                        </p>
                        <p
                          className={`text-xs sm:text-sm font-medium mt-1 flex items-center ${
                            stat.change.startsWith("+")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          <TrendingUp
                            className={`w-3 h-3 mr-1 ${
                              stat.change.startsWith("+") ? "" : "rotate-180"
                            }`}
                          />
                          {stat.change} from last week
                        </p>
                      </div>
                      <div className={`p-2 sm:p-3 rounded-xl ${stat.color} shadow-sm`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Payroll Distribution Pie Chart */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg font-medium flex items-center font-[Poppins]">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                  Payroll Distribution by Employee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250} className="min-h-[200px] sm:min-h-[300px]">
                  <PieChart>
                    <Pie
                      data={payrollDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {payrollDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Payroll Trends Bar Chart */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg font-medium flex items-center font-[Poppins]">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                  Monthly Payroll Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250} className="min-h-[200px] sm:min-h-[300px]">
                  <BarChart data={monthlyPayrollTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Payslip Table */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
                    Payslip List
                  </CardTitle>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search by name, role, amount, month, or year..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                    />
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                    <span>Show:</span>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => setRowsPerPage(Number(e.target.value))}
                      className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-xs sm:text-sm"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                    <span>entries</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {paginatedPayslips.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Search className="mx-auto h-10 w-10 sm:h-12 sm:w-12 mb-4 text-gray-400" />
                  <h3 className="text-base sm:text-lg font-medium mb-2 font-[Poppins]">
                    No payslip records found
                  </h3>
                  <p className="text-xs sm:text-sm">Try adjusting your search criteria</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto min-w-[600px]">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                            <button
                              onClick={() => handleSort("name")}
                              className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600"
                            >
                              <span>Name</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </button>
                          </th>
                          <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                            <button
                              onClick={() => handleSort("paidAmount")}
                              className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600"
                            >
                              <span>Paid Amount</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </button>
                          </th>
                          <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                            <button
                              onClick={() => handleSort("paidMonth")}
                              className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600"
                            >
                              <span>Paid Month</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </button>
                          </th>
                          <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                            <button
                              onClick={() => handleSort("paidYear")}
                              className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600"
                            >
                              <span>Paid Year</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedPayslips.map((pay) => (
                          <tr key={pay.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-3 sm:py-4 px-2 sm:px-4">
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                <img
                                  src={pay.image}
                                  alt={pay.name}
                                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                                  onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/40x40/6B7280/FFFFFF?text=UA";
                                  }}
                                />
                                <div>
                                  <div className="text-xs sm:text-sm font-medium text-gray-900">
                                    {pay.name}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {pay.role}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-600">
                              ${pay.paidAmount}
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-600">
                              {pay.paidMonth}
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-600">
                              {pay.paidYear}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                      <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-0">
                        <span className="font-medium">
                          Showing{" "}
                          <span className="text-gray-900">
                            {(currentPage - 1) * rowsPerPage + 1}
                          </span>{" "}
                          to{" "}
                          <span className="text-gray-900">
                            {Math.min(currentPage * rowsPerPage, filteredPayslips.length)}
                          </span>{" "}
                          of{" "}
                          <span className="text-gray-900">{filteredPayslips.length}</span>{" "}
                          entries
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-md text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center space-x-1"
                        >
                          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Previous</span>
                        </button>
                        <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-md">
                          Page <span className="text-gray-900">{currentPage}</span> of{" "}
                          <span className="text-gray-900">{totalPages}</span>
                        </span>
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                          }
                          disabled={currentPage === totalPages}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-md text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center space-x-1"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PayslipReport;