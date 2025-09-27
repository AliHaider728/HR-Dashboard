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
   ChevronRight
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
    {
      id: "LV-003",
      employeeImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-36.jpg",
      employeeName: "Cameron Drake",
      employeeRole: "Director",
      company: "Quantum Nexus",
      createdDate: "14 Sep 2025",
      dueDate: "18 Sep 2025",
      amount: "$2800",
      status: "Partially Approved",
      statusColor: "text-blue-600 bg-blue-100",
      leaveType: "Medical",
    },
    {
      id: "LV-004",
      employeeImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
      employeeName: "Doris Crowley",
      employeeRole: "HR Consultant",
      company: "EcoVision Enterprises",
      createdDate: "13 Sep 2025",
      dueDate: "17 Sep 2025",
      amount: "$3300",
      status: "Rejected",
      statusColor: "text-red-600 bg-red-100",
      leaveType: "Annual",
    },
    {
      id: "LV-005",
      employeeImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-35.jpg",
      employeeName: "Doglas Martini",
      employeeRole: "Operations Manager",
      company: "Aurora Technologies",
      createdDate: "12 Sep 2025",
      dueDate: "19 Sep 2025",
      amount: "$3600",
      status: "Approved",
      statusColor: "text-green-600 bg-green-100",
      leaveType: "Casual",
    },
    {
      id: "LV-006",
      employeeImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
      employeeName: "Elliot Murray",
      employeeRole: "Finance Analyst",
      company: "BlueSky Ventures",
      createdDate: "11 Sep 2025",
      dueDate: "16 Sep 2025",
      amount: "$2000",
      status: "Partially Approved",
      statusColor: "text-blue-600 bg-blue-100",
      leaveType: "Medical",
    },
    {
      id: "LV-007",
      employeeImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
      employeeName: "Harvey Smith",
      employeeRole: "Full Stack Developer",
      company: "TerraFusion Energy",
      createdDate: "10 Sep 2025",
      dueDate: "15 Sep 2025",
      amount: "$3400",
      status: "Pending",
      statusColor: "text-yellow-600 bg-yellow-100",
      leaveType: "Annual",
    },
    {
      id: "LV-008",
      employeeImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-36.jpg",
      employeeName: "Linda Ray",
      employeeRole: "Senior Accountant",
      company: "UrbanPulse Design",
      createdDate: "09 Sep 2025",
      dueDate: "14 Sep 2025",
      amount: "$4000",
      status: "Approved",
      statusColor: "text-green-600 bg-green-100",
      leaveType: "Casual",
    },
    {
      id: "LV-009",
      employeeImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
      employeeName: "Rebecca Smith",
      employeeRole: "Executive Assistant",
      company: "Nimbus Networks",
      createdDate: "08 Sep 2025",
      dueDate: "13 Sep 2025",
      amount: "$4500",
      status: "Partially Approved",
      statusColor: "text-blue-600 bg-blue-100",
      leaveType: "Others",
    },
    {
      id: "LV-010",
      employeeImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
      employeeName: "Angela Thomas",
      employeeRole: "HR Consultant",
      company: "Epicurean Delights",
      createdDate: "07 Sep 2025",
      dueDate: "12 Sep 2025",
      amount: "$3800",
      status: "Approved",
      statusColor: "text-green-600 bg-green-100",
      leaveType: "Annual",
    },
    // Additional records for pagination
    {
      id: "LV-011",
      employeeImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-35.jpg",
      employeeName: "Connie Waters",
      employeeRole: "Software Engineer",
      company: "TechNova Solutions",
      createdDate: "06 Sep 2025",
      dueDate: "11 Sep 2025",
      amount: "$3200",
      status: "Rejected",
      statusColor: "text-red-600 bg-red-100",
      leaveType: "Medical",
    },
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

  // Filter leave records based on search
  const filteredRecords = useMemo(() => 
    leaveRecords.filter(
      (record) =>
        record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.id.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [leaveRecords, searchTerm]
  );

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Leave Report
              </h1>
              <p className="text-gray-600">
                Track and manage employee leave requests and approvals
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white shadow-sm">
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
                        className={`text-sm font-medium mt-1 ${
                          stat.change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        <TrendingUp className={`inline w-3 h-3 mr-1 ${stat.change.startsWith("+") ? "" : "rotate-180"}`} />
                        {stat.change} last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Leave Types & Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leave Types */}
          <Card className="bg-white shadow-sm lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Leave Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaveTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                      <span className="text-sm font-medium text-gray-900">{type.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">{type.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution Pie Chart */}
          <Card className="bg-white shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Leave Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [value, `${name} requests`]} 
                  />
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
              <CardTitle className="text-lg font-semibold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Monthly Leave Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyLeaveTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} leaves`, "Total Leaves"]} 
                  />
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
                <CardTitle className="text-lg font-semibold flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-gray-600" />
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
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Rows Per Page:</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <Search className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">No leave records found</h3>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>Request ID</span>
                          </div>
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>Employee</span>
                          </div>
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4" />
                            <span>Company</span>
                          </div>
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Created</span>
                          </div>
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Due Date</span>
                          </div>
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4" />
                            <span>Amount</span>
                          </div>
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Status</span>
                          </div>
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <UserCog className="w-4 h-4" />
                            <span>Type</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedRecords.map((record) => {
                        const StatusIcon = getStatusIcon(record.status);
                        return (
                          <tr key={record.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="font-medium text-gray-900">LV-{record.id}</div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={record.employeeImage}
                                  alt={record.employeeName}
                                  className="w-10 h-10 rounded-full object-cover"
                                  onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/40x40/6B7280/FFFFFF?text=UA";
                                  }}
                                />
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {record.employeeName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {record.employeeRole}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-medium text-gray-900">{record.company}</div>
                            </td>
                            <td className="py-4 px-4 text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 text-gray-400" />
                                <span>{record.createdDate}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-600">
                              <div className="flex items-center space-x-1">
                                <ClockIcon className="w-3 h-3 text-gray-400" />
                                <span>{record.dueDate}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 font-medium text-gray-900">
                              {record.amount}
                            </td>
                            <td className="py-4 px-4">
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${record.statusColor}`}>
                                <StatusIcon className="w-3 h-3" />
                                <span>{record.status}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-1">
                                <div 
                                  className="w-2 h-2 rounded-full" 
                                  style={{ backgroundColor: getLeaveTypeColor(record.leaveType) }}
                                />
                                <span className="text-sm font-medium text-gray-700">{record.leaveType}</span>
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
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2 sm:mb-0">
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
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center space-x-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                      <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center space-x-1"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
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