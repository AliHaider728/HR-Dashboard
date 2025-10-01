import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  TrendingUp,
  UserCheck,
  UserX,
  UserMinus,
  UserCog,
  BadgeCheck,
  AlertCircle,
  FileText,
  DollarSign,
  Clock as ClockIcon,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
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

const LeaveReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "employeeName", direction: "asc" });

  const stats = [
    {
      title: "Total Leaves",
      value: "15",
      change: "+17.02%",
      icon: Users,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Approved Leaves",
      value: "15",
      change: "+17.02%",
      icon: CheckCircle,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Pending Requests",
      value: "5",
      change: "+17.02%",
      icon: Clock,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      title: "Rejected Leaves",
      value: "5",
      change: "+17.02%",
      icon: XCircle,
      color: "text-red-600 bg-red-100",
    },
  ];

  const leaveTypes = [
    { name: "Annual", count: 8, color: "#3B82F6" },
    { name: "Casual", count: 4, color: "#10B981" },
    { name: "Medical", count: 2, color: "#EF4444" },
    { name: "Others", count: 1, color: "#8B5CF6" },
  ];

  const leaveRecords = [
    {
      id: "LV-001",
      employeeImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-32.jpg",
      employeeName: "Anthony Lewis",
      employeeRole: "Finance Manager",
      company: "BrightWave Innovations",
      createdDate: "15 Sep 2025",
      dueDate: "16 Sep 2025",
      amount: "$3000",
      status: "Approved",
      statusColor: "text-green-600 bg-green-100",
      leaveType: "Annual",
    },
    {
      id: "LV-002",
      employeeImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-09.jpg",
      employeeName: "Brian Villalobos",
      employeeRole: "Senior Developer",
      company: "Stellar Dynamics",
      createdDate: "15 Sep 2025",
      dueDate: "20 Sep 2025",
      amount: "$2500",
      status: "Pending",
      statusColor: "text-yellow-600 bg-yellow-100",
      leaveType: "Casual",
    },
    // ... (other records omitted for brevity, include all from your original code)
    {
      id: "LV-012",
      employeeImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-09.jpg",
      employeeName: "Lori Broaddus",
      employeeRole: "Frontend Developer",
      company: "CodeCraft Studios",
      createdDate: "05 Sep 2025",
      dueDate: "10 Sep 2025",
      amount: "$2700",
      status: "Pending",
      statusColor: "text-yellow-600 bg-yellow-100",
      leaveType: "Casual",
    },
  ];

  // Sorting function
  const sortRecords = (records, key, direction) => {
    return [...records].sort((a, b) => {
      if (key === "createdDate" || key === "dueDate") {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }
      if (key === "amount") {
        const amountA = parseFloat(a[key].replace("$", "")) || 0;
        const amountB = parseFloat(b[key].replace("$", "")) || 0;
        return direction === "asc" ? amountA - amountB : amountB - amountA;
      }
      const aValue = a[key] || "";
      const bValue = b[key] || "";
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  };

  // Filter and sort records
  const filteredRecords = useMemo(() => {
    let filtered = leaveRecords.filter(
      (record) =>
        record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return sortRecords(filtered, sortConfig.key, sortConfig.direction);
  }, [leaveRecords, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const paginatedRecords = filteredRecords.slice(
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
  const statusDistribution = [
    { name: "Approved", value: leaveRecords.filter(r => r.status === "Approved").length, color: "#10B981" },
    { name: "Pending", value: leaveRecords.filter(r => r.status === "Pending").length, color: "#F59E0B" },
    { name: "Rejected", value: leaveRecords.filter(r => r.status === "Rejected").length, color: "#EF4444" },
    { name: "Partially Approved", value: leaveRecords.filter(r => r.status === "Partially Approved").length, color: "#3B82F6" },
  ];

  const monthlyLeaveTrends = [
    { month: "Apr", leaves: 8 },
    { month: "May", leaves: 10 },
    { month: "Jun", leaves: 12 },
    { month: "Jul", leaves: 9 },
    { month: "Aug", leaves: 11 },
    { month: "Sep", leaves: 15 },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved": return BadgeCheck;
      case "Pending": return Clock;
      case "Rejected": return XCircle;
      case "Partially Approved": return UserCheck;
      default: return UserCog;
    }
  };

  const getLeaveTypeColor = (leaveType) => {
    const type = leaveTypes.find(t => t.name === leaveType);
    return type ? type.color : "#6B7280";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
                Leave Report
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Track and manage employee leave requests and approvals
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-xl sm:text-3xl font-bold text-gray-900 mt-2">
                        {stat.value}
                      </p>
                      <p
                        className={`text-xs sm:text-sm font-medium mt-1 ${
                          stat.change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        <TrendingUp
                          className={`inline w-3 h-3 mr-1 ${
                            stat.change.startsWith("+") ? "" : "rotate-180"
                          }`}
                        />
                        {stat.change} last month
                      </p>
                    </div>
                    <div className={`p-2 sm:p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Leave Types & Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Leave Types */}
          <Card className="bg-white shadow-sm lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg font-semibold flex items-center">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                Leave Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaveTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                      <span className="text-xs sm:text-sm font-medium text-gray-900">{type.name}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-600">{type.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution Pie Chart */}
          <Card className="bg-white shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg font-semibold flex items-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                Leave Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="min-h-[200px] sm:min-h-[300px]">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, `${name} requests`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends Chart */}
        <div className="grid grid-cols-1">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg font-semibold flex items-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                Monthly Leave Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="min-h-[200px] sm:min-h-[300px]">
                <BarChart data={monthlyLeaveTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value} leaves`, "Total Leaves"]} />
                  <Bar dataKey="leaves" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Leave Requests Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-base sm:text-lg font-semibold flex items-center">
                  <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
                  Leave Requests
                </CardTitle>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by employee, company, status, or leave type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <span>Rows Per Page:</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="px-2 py-1 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {paginatedRecords.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Search className="mx-auto h-10 w-10 sm:h-12 sm:w-12 mb-4 text-gray-400" />
                <h3 className="text-base sm:text-lg font-medium mb-2">No leave records found</h3>
                <p className="text-sm sm:text-base">Try adjusting your search criteria</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto min-w-[800px]">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">
                          <button
                            onClick={() => handleSort("id")}
                            className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600"
                          >
                            <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Request ID</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </button>
                        </th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">
                          <button
                            onClick={() => handleSort("employeeName")}
                            className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600"
                          >
                            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Employee</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </button>
                        </th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">
                          <button
                            onClick={() => handleSort("company")}
                            className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600"
                          >
                            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Company</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </button>
                        </th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">
                          <button
                            onClick={() => handleSort("createdDate")}
                            className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600"
                          >
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Created</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </button>
                        </th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">
                          <button
                            onClick={() => handleSort("dueDate")}
                            className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600"
                          >
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Due Date</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </button>
                        </th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">
                          <button
                            onClick={() => handleSort("amount")}
                            className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600"
                          >
                            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Amount</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </button>
                        </th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">
                          <button
                            onClick={() => handleSort("status")}
                            className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600"
                          >
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Status</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </button>
                        </th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">
                          <button
                            onClick={() => handleSort("leaveType")}
                            className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600"
                          >
                            <UserCog className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Type</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedRecords.map((record) => {
                        const StatusIcon = getStatusIcon(record.status);
                        return (
                          <tr key={record.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm">
                              <div className="font-medium text-gray-900">LV-{record.id}</div>
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4">
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                <img
                                  src={record.employeeImage}
                                  alt={record.employeeName}
                                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                                  onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/40x40/6B7280/FFFFFF?text=UA";
                                  }}
                                />
                                <div>
                                  <div className="font-medium text-gray-900 text-xs sm:text-sm">
                                    {record.employeeName}
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-500">
                                    {record.employeeRole}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">
                              {record.company}
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 text-gray-400" />
                                <span>{record.createdDate}</span>
                              </div>
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">
                              <div className="flex items-center space-x-1">
                                <ClockIcon className="w-3 h-3 text-gray-400" />
                                <span>{record.dueDate}</span>
                              </div>
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">
                              {record.amount}
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4">
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${record.statusColor}`}>
                                <StatusIcon className="w-3 h-3" />
                                <span>{record.status}</span>
                              </div>
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4">
                              <div className="flex items-center space-x-1">
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: getLeaveTypeColor(record.leaveType) }}
                                />
                                <span className="text-xs sm:text-sm font-medium text-gray-700">{record.leaveType}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                    <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-0">
                      <span className="font-medium">
                        Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                        {Math.min(currentPage * rowsPerPage, filteredRecords.length)}{" "}
                      </span>
                      of <span className="font-medium">{filteredRecords.length}</span> entries
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center space-x-1"
                      >
                        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Previous</span>
                      </button>
                      <span className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-md">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center space-x-1"
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
  );
};

export default LeaveReport;