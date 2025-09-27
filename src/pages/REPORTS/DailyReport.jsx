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
  Activity,
  Building,
  Clock as ClockIcon,
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

const DailyReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    {
      title: "Total Present",
      value: "300",
      change: "+12.5%",
      icon: CheckCircle,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Completed Tasks",
      value: "100",
      change: "+8.2%",
      icon: Activity,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Total Absent",
      value: "15",
      change: "+2.1%",
      icon: XCircle,
      color: "text-red-600 bg-red-100",
    },
    {
      title: "Pending Tasks",
      value: "125",
      change: "-3.4%",
      icon: Clock,
      color: "text-yellow-600 bg-yellow-100",
    },
  ];

  const dailyAttendance = [
    {
      id: 1,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-32.jpg",
      name: "Anthony Lewis",
      department: "Finance",
      date: "21 Sep 2025",
      status: "Present",
      statusColor: "text-green-600 bg-green-100",
      statusIcon: CheckCircle,
    },
    {
      id: 2,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-09.jpg",
      name: "Brian Villalobos",
      department: "Application Development",
      date: "21 Sep 2025",
      status: "Present",
      statusColor: "text-green-600 bg-green-100",
      statusIcon: CheckCircle,
    },
    {
      id: 3,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-36.jpg",
      name: "Harvey Smith",
      department: "IT Management",
      date: "21 Sep 2025",
      status: "Present",
      statusColor: "text-green-600 bg-green-100",
      statusIcon: CheckCircle,
    },
    {
      id: 4,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
      name: "Stephan Peralt",
      department: "Web Development",
      date: "21 Sep 2025",
      status: "Present",
      statusColor: "text-green-600 bg-green-100",
      statusIcon: CheckCircle,
    },
    {
      id: 5,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-35.jpg",
      name: "Doglas Martini",
      department: "Sales",
      date: "21 Sep 2025",
      status: "Present",
      statusColor: "text-green-600 bg-green-100",
      statusIcon: CheckCircle,
    },
    {
      id: 6,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
      name: "Linda Ray",
      department: "UI / UX",
      date: "21 Sep 2025",
      status: "Present",
      statusColor: "text-green-600 bg-green-100",
      statusIcon: CheckCircle,
    },
    {
      id: 7,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
      name: "Elliot Murray",
      department: "Finance",
      date: "21 Sep 2025",
      status: "Present",
      statusColor: "text-green-600 bg-green-100",
      statusIcon: CheckCircle,
    },
    {
      id: 8,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-36.jpg",
      name: "Rebecca Smith",
      department: "Marketing",
      date: "21 Sep 2025",
      status: "Present",
      statusColor: "text-green-600 bg-green-100",
      statusIcon: CheckCircle,
    },
    {
      id: 9,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
      name: "Connie Waters",
      department: "Administration",
      date: "21 Sep 2025",
      status: "Present",
      statusColor: "text-green-600 bg-green-100",
      statusIcon: CheckCircle,
    },
    {
      id: 10,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
      name: "Lori Broaddus",
      department: "Business Development",
      date: "21 Sep 2025",
      status: "Absent",
      statusColor: "text-red-600 bg-red-100",
      statusIcon: XCircle,
    },
    // Additional records for pagination
    {
      id: 11,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-35.jpg",
      name: "Cameron Drake",
      department: "Product Management",
      date: "21 Sep 2025",
      status: "Present",
      statusColor: "text-green-600 bg-green-100",
      statusIcon: CheckCircle,
    },
    {
      id: 12,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-09.jpg",
      name: "Doris Crowley",
      department: "HR Operations",
      date: "21 Sep 2025",
      status: "Present",
      statusColor: "text-green-600 bg-green-100",
      statusIcon: CheckCircle,
    },
    {
      id: 13,
      image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-32.jpg",
      name: "Angela Thomas",
      department: "Quality Assurance",
      date: "21 Sep 2025",
      status: "Absent",
      statusColor: "text-red-600 bg-red-100",
      statusIcon: XCircle,
    },
  ];

  // Filter attendance records based on search
  const filteredRecords = useMemo(() => 
    dailyAttendance.filter(
      (record) =>
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.date.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [dailyAttendance, searchTerm]
  );

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Chart data
  const statusDistribution = [
    { name: "Present", value: dailyAttendance.filter(r => r.status === "Present").length, color: "#10B981" },
    { name: "Absent", value: dailyAttendance.filter(r => r.status === "Absent").length, color: "#EF4444" },
  ];

  const departmentDistribution = [
    { name: "Finance", value: 25, color: "#3B82F6" },
    { name: "IT Management", value: 45, color: "#10B981" },
    { name: "Marketing", value: 20, color: "#F59E0B" },
    { name: "Sales", value: 30, color: "#8B5CF6" },
    { name: "HR", value: 15, color: "#EF4444" },
    { name: "Administration", value: 18, color: "#06B6D4" },
  ];

  const taskProgress = [
    { task: "Design", completed: 25, total: 30 },
    { task: "Development", completed: 35, total: 50 },
    { task: "Testing", completed: 20, total: 25 },
    { task: "Deployment", completed: 10, total: 15 },
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

  const getStatusIcon = (status) => {
    return status === "Present" ? CheckCircle : XCircle;
  };

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screen bg-gray-50 p-6 font-[Inter]">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1 font-[Poppins]">
                  Daily Report
                </h1>
                <p className="text-gray-600 text-sm">
                  Today's attendance and task overview
                </p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-semibold text-gray-900 mt-2 font-[Poppins]">
                          {stat.value}
                        </p>
                        <p
                          className={`text-xs font-medium mt-1 flex items-center ${
                            stat.change.startsWith("+")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          <TrendingUp 
                            className={`w-3 h-3 mr-1 ${stat.change.startsWith("+") ? "" : "rotate-180"}`} 
                          />
                          {stat.change} from yesterday
                        </p>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.color} shadow-sm`}>
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
                <CardTitle className="text-base font-medium flex items-center font-[Poppins]">
                  <UserCheck className="w-5 h-5 mr-2 text-green-600" />
                  Today's Attendance Status
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

            {/* Department Distribution Bar Chart */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center font-[Poppins]">
                  <Building className="w-5 h-5 mr-2 text-purple-600" />
                  Department Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} employees`, "Present"]} 
                    />
                    <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Task Progress Chart */}
          <div className="grid grid-cols-1">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center font-[Poppins]">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Task Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={taskProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="task" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name, props) => {
                        const total = props.payload.total;
                        const percentage = ((value / total) * 100).toFixed(1);
                        return [`${value} / ${total} (${percentage}%)`, "Tasks"];
                      }} 
                    />
                    <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Daily Attendance Table */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                    <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                    Daily Attendance
                  </CardTitle>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search by name, department, or status..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Show:</span>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => setRowsPerPage(Number(e.target.value))}
                      className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
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
              {paginatedRecords.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Search className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                  <h3 className="text-base font-medium mb-2 font-[Poppins]">No records found</h3>
                  <p className="text-sm">Try adjusting your search criteria</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 px-4 font-medium text-gray-700 text-xs uppercase tracking-wider">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" />
                              <span>Name</span>
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700 text-xs uppercase tracking-wider">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>Date</span>
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700 text-xs uppercase tracking-wider">
                            <div className="flex items-center space-x-2">
                              <Building className="w-4 h-4" />
                              <span>Department</span>
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700 text-xs uppercase tracking-wider">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4" />
                              <span>Status</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedRecords.map((record) => {
                          const StatusIcon = getStatusIcon(record.status);
                          return (
                            <tr key={record.id} className="border-b hover:bg-gray-50 transition-colors">
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={record.image}
                                    alt={record.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                    onError={(e) => {
                                      e.target.src = "https://via.placeholder.com/32x32/6B7280/FFFFFF?text=UA";
                                    }}
                                  />
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {record.name}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5">
                                      {record.department}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2 text-gray-600">
                                  <Calendar className="w-3 h-3 text-gray-400" />
                                  <span className="text-sm">{record.date}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  {record.department}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${record.statusColor}`}>
                                  <StatusIcon className="w-3 h-3" />
                                  <span>{record.status}</span>
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
                          Showing <span className="text-gray-900">
                            {(currentPage - 1) * rowsPerPage + 1}
                          </span> to <span className="text-gray-900">
                            {Math.min(currentPage * rowsPerPage, filteredRecords.length)}
                          </span> of <span className="text-gray-900">
                            {filteredRecords.length}
                          </span> entries
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center space-x-1"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous</span>
                        </button>
                        <span className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md">
                          Page <span className="text-gray-900">{currentPage}</span> of <span className="text-gray-900">{totalPages}</span>
                        </span>
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                          }
                          disabled={currentPage === totalPages}
                          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center space-x-1"
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
    </>
  );
};

export default DailyReport;