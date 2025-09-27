import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Wallet,
  TrendingUp,
  TrendingDown,
  Search,
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
      name: "Rebecca Smtih",
      role: "Executive",
      paidAmount: 4500,
      paidMonth: "September",
      paidYear: "2025",
    },
  ];

  // Filter payslips based on search
  const filteredPayslips = payslips.filter(
    (pay) =>
      pay.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.paidAmount.toString().includes(searchTerm)
  );

  // Pagination
  const totalPages = Math.ceil(filteredPayslips.length / rowsPerPage);
  const paginatedPayslips = filteredPayslips.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payslip Report
          </h1>
          <p className="text-gray-600">
            Track and analyze payroll data for employees
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {stat.value}
                      </p>
                      <p
                        className={`text-sm ${
                          stat.change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change} from last week
                      </p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payroll Distribution Pie Chart */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Payroll Distribution by Employee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={payrollDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
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
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Monthly Payroll Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyPayrollTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Payslip Table */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Payslip List
            </CardTitle>
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 mt-2">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Row Per Page</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded-md"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>Entries</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Paid Amount
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Paid Month
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Paid Year
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPayslips.map((pay) => (
                    <tr key={pay.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={pay.image}
                            alt={pay.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {pay.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {pay.role}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        ${pay.paidAmount}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {pay.paidMonth}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {pay.paidYear}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
              <span>
                Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                {Math.min(currentPage * rowsPerPage, filteredPayslips.length)}{" "}
                of {filteredPayslips.length} entries
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayslipReport;
