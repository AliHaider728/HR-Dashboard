import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  UserX,
  Award,
  Clock,
  Search,
  TrendingUp,
  Users,
  Clock as ClockIcon,
  Activity,
  CheckCircle,
  XCircle,
  PauseCircle,
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

const AttendanceReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    {
      title: "Total Working Days",
      value: "25",
      change: "+20.01%",
      icon: Calendar,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Total Leave Taken",
      value: "12",
      change: "+20.01%",
      icon: UserX,
      color: "text-red-600 bg-red-100",
    },
    {
      title: "Total Holidays",
      value: "6",
      change: "+20.01%",
      icon: Award,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Total Halfdays",
      value: "5",
      change: "+20.01%",
      icon: Clock,
      color: "text-purple-600 bg-purple-100",
    },
  ];

  const attendanceRecords = [
    {
      id: 1,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-32.jpg",
      name: "Anthony Lewis",
      role: "Finance",
      date: "21 Sep 2025",
      checkIn: "09:00 AM",
      status: "Present",
      statusIcon: CheckCircle,
      checkOut: "06:45 PM",
      breakTime: "30 Min",
      late: "32 Min",
      overtime: "20 Min",
      productionHours: "8.55 Hrs",
    },
    {
      id: 2,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-09.jpg",
      name: "Brian Villalobos",
      role: "Developer",
      date: "21 Sep 2025",
      checkIn: "09:00 AM",
      status: "Present",
      statusIcon: CheckCircle,
      checkOut: "06:12 PM",
      breakTime: "20 Min",
      late: "-",
      overtime: "45 Min",
      productionHours: "7.54 Hrs",
    },
    {
      id: 3,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-36.jpg",
      name: "Harvey Smith",
      role: "Developer",
      date: "21 Sep 2025",
      checkIn: "09:00 AM",
      status: "Present",
      statusIcon: CheckCircle,
      checkOut: "06:13 PM",
      breakTime: "50 Min",
      late: "-",
      overtime: "33 Min",
      productionHours: "8.45 Hrs",
    },
    {
      id: 4,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
      name: "Stephan Peralt",
      role: "Executive Officer",
      date: "21 Sep 2025",
      checkIn: "09:00 AM",
      status: "Present",
      statusIcon: CheckCircle,
      checkOut: "06:23 PM",
      breakTime: "41 Min",
      late: "-",
      overtime: "50 Min",
      productionHours: "8.55 Hrs",
    },
    {
      id: 5,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-35.jpg",
      name: "Doglas Martini",
      role: "Manager",
      date: "21 Sep 2025",
      checkIn: "09:00 AM",
      status: "Present",
      statusIcon: CheckCircle,
      checkOut: "06:43 PM",
      breakTime: "23 Min",
      late: "-",
      overtime: "10 Min",
      productionHours: "8.22 Hrs",
    },
    {
      id: 6,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
      name: "Linda Ray",
      role: "Finance",
      date: "21 Sep 2025",
      checkIn: "09:00 AM",
      status: "Present",
      statusIcon: CheckCircle,
      checkOut: "07:15 PM",
      breakTime: "03 Min",
      late: "-",
      overtime: "-",
      productionHours: "8.32 Hrs",
    },
    {
      id: 7,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
      name: "Elliot Murray",
      role: "Finance",
      date: "21 Sep 2025",
      checkIn: "09:00 AM",
      status: "Present",
      statusIcon: CheckCircle,
      checkOut: "07:13 PM",
      breakTime: "32 Min",
      late: "-",
      overtime: "-",
      productionHours: "9.15 Hrs",
    },
    {
      id: 8,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-36.jpg",
      name: "Rebecca Smith",
      role: "Executive",
      date: "21 Sep 2025",
      checkIn: "09:00 AM",
      status: "Present",
      statusIcon: CheckCircle,
      checkOut: "09:17 PM",
      breakTime: "14 Min",
      late: "12 Min",
      overtime: "-",
      productionHours: "9.25 Hrs",
    },
    {
      id: 9,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
      name: "Connie Waters",
      role: "Developer",
      date: "21 Sep 2025",
      checkIn: "09:00 AM",
      status: "Present",
      statusIcon: CheckCircle,
      checkOut: "08:15 PM",
      breakTime: "12 Min",
      late: "-",
      overtime: "-",
      productionHours: "8.35 Hrs",
    },
    {
      id: 10,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
      name: "Lori Broaddus",
      role: "Developer",
      date: "21 Sep 2025",
      checkIn: "09:00 AM",
      status: "Absent",
      statusIcon: XCircle,
      checkOut: "09:23 PM",
      breakTime: "10 Min",
      late: "-",
      overtime: "-",
      productionHours: "9.15 Hrs",
    },
    // Additional records for pagination demo
    {
      id: 11,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-35.jpg",
      name: "Anthony Lewis",
      role: "Finance",
      date: "20 Sep 2025",
      checkIn: "09:00 AM",
      status: "Present",
      statusIcon: CheckCircle,
      checkOut: "06:00 PM",
      breakTime: "30 Min",
      late: "-",
      overtime: "-",
      productionHours: "8.00 Hrs",
    },
    {
      id: 12,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-09.jpg",
      name: "Brian Villalobos",
      role: "Developer",
      date: "20 Sep 2025",
      checkIn: "08:45 AM",
      status: "Present",
      statusIcon: CheckCircle,
      checkOut: "05:30 PM",
      breakTime: "15 Min",
      late: "-",
      overtime: "-",
      productionHours: "7.75 Hrs",
    },
  ];

  // Filter attendance records based on search
  const filteredRecords = useMemo(() => 
    attendanceRecords.filter(
      (record) =>
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.status.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [attendanceRecords, searchTerm]
  );

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Chart data
  const statusDistribution = [
    { name: "Present", value: attendanceRecords.filter(r => r.status === "Present").length, color: "#10B981" },
    { name: "Absent", value: attendanceRecords.filter(r => r.status === "Absent").length, color: "#EF4444" },
  ];

  const monthlyAttendanceTrends = [
    { month: "Apr", days: 22 },
    { month: "May", days: 20 },
    { month: "Jun", days: 23 },
    { month: "Jul", days: 21 },
    { month: "Aug", days: 22 },
    { month: "Sep", days: 25 },
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Present": return "text-green-600 bg-green-100";
      case "Absent": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIconColor = (status) => {
    switch (status) {
      case "Present": return "text-green-600";
      case "Absent": return "text-red-600";
      default: return "text-gray-600";
    }
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
                Attendance Report
              </h1>
              <p className="text-gray-600">
                Track and analyze employee attendance data
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
                        {stat.change} from last month
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Distribution Pie Chart */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Attendance Status Distribution
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
                    formatter={(value, name) => [value, `${name} employees`]} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Attendance Trends Bar Chart */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-600" />
                Monthly Working Days Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyAttendanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} days`, "Working Days"]} 
                  />
                  <Bar dataKey="days" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2 text-gray-600" />
                  Attendance Records
                </CardTitle>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by name, date, or status..."
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
                <h3 className="text-lg font-medium mb-2">No records found</h3>
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
                            <Users className="w-4 h-4" />
                            <span>Name</span>
                          </div>
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Date</span>
                          </div>
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="w-4 h-4" />
                            <span>Check In</span>
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
                            <ClockIcon className="w-4 h-4" />
                            <span>Check Out</span>
                          </div>
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <PauseCircle className="w-4 h-4" />
                            <span>Break</span>
                          </div>
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 rotate-180" />
                            <span>Late</span>
                          </div>
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4" />
                            <span>Overtime</span>
                          </div>
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="w-4 h-4" />
                            <span>Hours</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedRecords.map((record) => {
                        const StatusIcon = record.statusIcon;
                        return (
                          <tr key={record.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={record.image}
                                  alt={record.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                  onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/40x40/6B7280/FFFFFF?text=UA";
                                  }}
                                />
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {record.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {record.role}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 text-gray-400" />
                                <span>{record.date}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-1 text-gray-600">
                                <ClockIcon className="w-3 h-3 text-gray-400" />
                                <span>{record.checkIn}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                                <StatusIcon className={`w-3 h-3 ${getStatusIconColor(record.status)}`} />
                                <span>{record.status}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-1 text-gray-600">
                                <ClockIcon className="w-3 h-3 text-gray-400" />
                                <span>{record.checkOut}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-600">
                              {record.breakTime}
                            </td>
                            <td className="py-4 px-4 text-gray-600">
                              {record.late}
                            </td>
                            <td className="py-4 px-4 text-gray-600">
                              {record.overtime}
                            </td>
                            <td className="py-4 px-4 font-medium text-gray-900">
                              {record.productionHours}
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

export default AttendanceReport;