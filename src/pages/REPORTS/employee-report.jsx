import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, UserCheck, UserX, Calendar, Mail, Phone, Search, Filter } from 'lucide-react';
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
  Legend
} from 'recharts';

const EmployeeReport = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState('09/14/2025 - 09/20/2025');

  const stats = [
    { title: 'Total Employee', value: 600, change: '+20.01%', icon: Users, color: 'text-blue-600 bg-blue-100' },
    { title: 'Active Employee', value: 600, change: '+20.01%', icon: UserCheck, color: 'text-green-600 bg-green-100' },
    { title: 'New Employee', value: 600, change: '+20.01%', icon: UserPlus, color: 'text-purple-600 bg-purple-100' },
    { title: 'Inactive Employee', value: 600, change: '+20.01%', icon: UserX, color: 'text-red-600 bg-red-100' }
  ];

   const allEmployees = [
    {
      id: 'Emp-001',
      image: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-09.jpg',
      name: 'Anthony Lewis',
      role: 'Finance',
      email: 'anthony@example.com',
      department: 'Finance',
      phone: '(123) 4567 890',
      joiningDate: '12 Sep 2024',
      status: 'Active'
    },
    {
      id: 'Emp-002',
      image: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-09.jpg',
      name: 'Brian Villalobos',
      role: 'Developer',
      email: 'brian@example.com',
      department: 'Application Development',
      phone: '(179) 7382 829',
      joiningDate: '24 Oct 2024',
      status: 'Active'
    },
    {
      id: 'Emp-003',
      image: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg',
      name: 'Harvey Smith',
      role: 'Developer',
      email: 'harvey@example.com',
      department: 'IT Management',
      phone: '(184) 2719 738',
      joiningDate: '18 Feb 2024',
      status: 'Active'
    },
    {
      id: 'Emp-004',
      image: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-38.jpg',
      name: 'Stephan Peralt',
      role: 'Executive Officer',
      email: 'peral@example.com',
      department: 'Web Development',
      phone: '(193) 7839 748',
      joiningDate: '17 Oct 2024',
      status: 'Active'
    },
    {
      id: 'Emp-005',
      image: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-38.jpg',
      name: 'Doglas Martini',
      role: 'Manager',
      email: 'martniwr@example.com',
      department: 'Sales',
      phone: '(183) 9302 890',
      joiningDate: '20 Jul 2024',
      status: 'Active'
    },
    {
      id: 'Emp-006',
      image: 'https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=LR',
      name: 'Linda Ray',
      role: 'Finance',
      email: 'ray456@example.com',
      department: 'UI / UX',
      phone: '(120) 3728 039',
      joiningDate: '10 Apr 2024',
      status: 'Active'
    },
    {
      id: 'Emp-007',
      image: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-38.jpg',
      name: 'Elliot Murray',
      role: 'Finance',
      email: 'murray@example.com',
      department: 'Account Management',
      phone: '(102) 8480 832',
      joiningDate: '29 Aug 2024',
      status: 'Active'
    },
    {
      id: 'Emp-008',
      image: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-38.jpg',
      name: 'Rebecca Smtih',
      role: 'Executive',
      email: 'smtih@example.com',
      department: 'Marketing',
      phone: '(162) 8920 713',
      joiningDate: '22 Feb 2024',
      status: 'Inactive'
    },
    {
      id: 'Emp-009',
      image: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-38.jpg',
      name: 'Connie Waters',
      role: 'Developer',
      email: 'connie@example.com',
      department: 'Administration',
      phone: '(189) 0920 723',
      joiningDate: '03 Nov 2024',
      status: 'Active'
    },
    {
      id: 'Emp-010',
      image: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-38.jpg',
      name: 'Lori Broaddus',
      role: 'Developer',
      email: 'broaddus@example.com',
      department: 'Business Development',
      phone: '(168) 8392 823',
      joiningDate: '17 Dec 2024',
      status: 'Active'
    }
  ];

  // Filter employees based on tab and search
  const filteredEmployees = allEmployees
    .filter(emp => activeTab === 'all' || emp.status.toLowerCase() === activeTab)
    .filter(emp =>
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getStatusColor = (status) => {
    return status === 'Active' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  // Sample data for charts (added based on typical employee dashboard)
  const departmentData = [
    { name: 'Finance', value: 150 },
    { name: 'IT Management', value: 120 },
    { name: 'Marketing', value: 100 },
    { name: 'Sales', value: 80 },
    { name: 'UI / UX', value: 70 },
    { name: 'Administration', value: 50 },
    { name: 'Business Development', value: 30 }
  ];

  const statusData = [
    { name: 'Active', value: 550 },
    { name: 'Inactive', value: 50 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#F94D6A', '#A55FFA', '#50C878'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Employees List</h1>
          <p className="text-gray-600">{dateRange}</p>
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
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
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
          {/* Department Distribution Pie Chart */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Employees by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    nameKey="name"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Distribution Bar Chart */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Employee Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Employee Table Section */}
        <Card className="bg-white">
          <CardHeader className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Employee List
              </CardTitle>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-4 py-2 text-sm rounded-md ${
                    activeTab === 'active'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Active Employees
                </button>
                <button
                  onClick={() => setActiveTab('inactive')}
                  className={`px-4 py-2 text-sm rounded-md ${
                    activeTab === 'inactive'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Inactive Employees
                </button>
              </div>
            </div>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
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
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Emp ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Joining Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedEmployees.map((emp) => (
                    <tr key={emp.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{emp.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={emp.image}
                            alt={emp.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{emp.name}</div>
                            <div className="text-sm text-gray-500">{emp.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{emp.email}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{emp.department}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{emp.phone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{emp.joiningDate}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(emp.status)}`}>
                          {emp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
              <span>
                Showing { (currentPage - 1) * rowsPerPage + 1 } to { Math.min(currentPage * rowsPerPage, filteredEmployees.length) } of { filteredEmployees.length } entries
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
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

export default EmployeeReport;