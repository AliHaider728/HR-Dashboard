import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend } from 'recharts';
import { Users, UserPlus, UserMinus, UserCheck, Shield, Calendar, Mail, Phone, MapPin, Search, Filter, Eye, Edit, Trash2, Download, RefreshCw, Plus, X, CheckCircle, AlertCircle, Clock, MoreVertical } from 'lucide-react';

const UserReportDashboard = () => {
  const [selectedChart, setSelectedChart] = useState('bar');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // User statistics data with dynamic calculations
  const [usersData, setUsersData] = useState([
    { id: 1, name: 'John Anderson', email: 'john.anderson@company.com', phone: '+1 234-567-8901', role: 'Manager', department: 'IT', status: 'Active', createdDate: '2024-01-15', lastLogin: '2 hours ago', avatar: 'JA', loginCount: 245, tasksCompleted: 87 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', phone: '+1 234-567-8902', role: 'Employee', department: 'Sales', status: 'Active', createdDate: '2024-01-22', lastLogin: '1 day ago', avatar: 'SJ', loginCount: 198, tasksCompleted: 124 },
    { id: 3, name: 'Michael Brown', email: 'michael.brown@company.com', phone: '+1 234-567-8903', role: 'Team Lead', department: 'Marketing', status: 'Active', createdDate: '2024-02-08', lastLogin: '30 mins ago', avatar: 'MB', loginCount: 312, tasksCompleted: 156 },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@company.com', phone: '+1 234-567-8904', role: 'HR', department: 'HR', status: 'Active', createdDate: '2024-02-14', lastLogin: '3 hours ago', avatar: 'ED', loginCount: 176, tasksCompleted: 89 },
    { id: 5, name: 'David Wilson', email: 'david.wilson@company.com', phone: '+1 234-567-8905', role: 'Admin', department: 'IT', status: 'Inactive', createdDate: '2024-02-28', lastLogin: '2 weeks ago', avatar: 'DW', loginCount: 456, tasksCompleted: 203 },
    { id: 6, name: 'Lisa Martinez', email: 'lisa.martinez@company.com', phone: '+1 234-567-8906', role: 'Employee', department: 'Finance', status: 'Active', createdDate: '2024-03-12', lastLogin: '5 hours ago', avatar: 'LM', loginCount: 134, tasksCompleted: 76 },
    { id: 7, name: 'Robert Taylor', email: 'robert.taylor@company.com', phone: '+1 234-567-8907', role: 'Manager', department: 'Operations', status: 'Active', createdDate: '2024-03-25', lastLogin: '1 hour ago', avatar: 'RT', loginCount: 289, tasksCompleted: 142 },
    { id: 8, name: 'Jennifer Garcia', email: 'jennifer.garcia@company.com', phone: '+1 234-567-8908', role: 'Employee', department: 'Support', status: 'Active', createdDate: '2024-04-15', lastLogin: '4 hours ago', avatar: 'JG', loginCount: 167, tasksCompleted: 93 },
    { id: 9, name: 'Christopher Lee', email: 'christopher.lee@company.com', phone: '+1 234-567-8909', role: 'Team Lead', department: 'Sales', status: 'Active', createdDate: '2024-04-28', lastLogin: '6 hours ago', avatar: 'CL', loginCount: 223, tasksCompleted: 118 },
    { id: 10, name: 'Amanda White', email: 'amanda.white@company.com', phone: '+1 234-567-8910', role: 'Employee', department: 'Marketing', status: 'Inactive', createdDate: '2024-05-10', lastLogin: '1 week ago', avatar: 'AW', loginCount: 98, tasksCompleted: 45 },
    { id: 11, name: 'James Miller', email: 'james.miller@company.com', phone: '+1 234-567-8911', role: 'Employee', department: 'IT', status: 'Active', createdDate: '2024-06-05', lastLogin: '8 hours ago', avatar: 'JM', loginCount: 145, tasksCompleted: 67 },
    { id: 12, name: 'Maria Rodriguez', email: 'maria.rodriguez@company.com', phone: '+1 234-567-8912', role: 'Manager', department: 'HR', status: 'Active', createdDate: '2024-06-20', lastLogin: '2 hours ago', avatar: 'MR', loginCount: 189, tasksCompleted: 98 }
  ]);

  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Employee',
    department: 'IT',
    status: 'Active'
  });

  // Calculate dynamic statistics
  const userStatsData = useMemo(() => {
    const activeUsers = usersData.filter(user => user.status === 'Active').length;
    const inactiveUsers = usersData.filter(user => user.status === 'Inactive').length;
    const thisMonth = new Date();
    thisMonth.setMonth(thisMonth.getMonth() - 1);
    const newUsers = usersData.filter(user => new Date(user.createdDate) > thisMonth).length;
    
    return [
      { name: 'Active Users', value: activeUsers, count: activeUsers, color: '#22c55e', icon: UserCheck },
      { name: 'Inactive Users', value: inactiveUsers, count: inactiveUsers, color: '#ef4444', icon: UserMinus },
      { name: 'New Users (This Month)', value: newUsers, count: newUsers, color: '#3b82f6', icon: UserPlus },
      { name: 'Total Users', value: usersData.length, count: usersData.length, color: '#8b5cf6', icon: Users }
    ];
  }, [usersData]);

  // Monthly user registration data
  const monthlyUserData = [
    { month: 'Jan', active: 380, inactive: 70, new: 25, total: 450 },
    { month: 'Feb', active: 395, inactive: 68, new: 28, total: 463 },
    { month: 'Mar', active: 410, inactive: 72, new: 30, total: 482 },
    { month: 'Apr', active: 425, inactive: 75, new: 22, total: 500 },
    { month: 'May', active: 435, inactive: 78, new: 35, total: 513 },
    { month: 'Jun', active: 445, inactive: 82, new: 28, total: 527 },
    { month: 'Jul', active: 450, inactive: 85, new: 32, total: 535 }
  ];

  // Dynamic role and department distributions
  const roleDistributionData = useMemo(() => {
    const roleCounts = usersData.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    const colors = {
      'Employee': '#3b82f6',
      'Manager': '#f59e0b', 
      'HR': '#22c55e',
      'Admin': '#ef4444',
      'Team Lead': '#8b5cf6'
    };

    return Object.entries(roleCounts).map(([role, count]) => ({
      role,
      count,
      color: colors[role] || '#6b7280'
    }));
  }, [usersData]);

  const departmentData = useMemo(() => {
    const deptCounts = usersData.reduce((acc, user) => {
      acc[user.department] = (acc[user.department] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(deptCounts).map(([department, users]) => ({
      department,
      users,
      color: '#3b82f6'
    }));
  }, [usersData]);

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Inactive': return 'text-red-600 bg-red-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'text-purple-600 bg-purple-100';
      case 'Manager': return 'text-blue-600 bg-blue-100';
      case 'HR': return 'text-green-600 bg-green-100';
      case 'Team Lead': return 'text-orange-600 bg-orange-100';
      case 'Employee': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Inactive': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = usersData.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.phone.includes(searchTerm);
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
      const matchesRole = roleFilter === 'All' || user.role === roleFilter;
      const matchesDepartment = departmentFilter === 'All' || user.department === departmentFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'All') {
        const userDate = new Date(user.createdDate);
        const now = new Date();
        switch (dateFilter) {
          case 'Today':
            matchesDate = userDate.toDateString() === now.toDateString();
            break;
          case 'This Week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = userDate >= weekAgo;
            break;
          case 'This Month':
            matchesDate = userDate.getMonth() === now.getMonth() && userDate.getFullYear() === now.getFullYear();
            break;
        }
      }
      
      return matchesSearch && matchesStatus && matchesRole && matchesDepartment && matchesDate;
    });

    // Sort users
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'createdDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    return filtered;
  }, [usersData, searchTerm, statusFilter, roleFilter, departmentFilter, dateFilter, sortField, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = filteredAndSortedUsers.slice(startIndex, endIndex);
  const startEntry = startIndex + 1;
  const endEntryCount = Math.min(endIndex, filteredAndSortedUsers.length);

  // CRUD Operations
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user = {
        ...newUser,
        id: Math.max(...usersData.map(u => u.id)) + 1,
        createdDate: new Date().toISOString().split('T')[0],
        lastLogin: 'Never',
        avatar: newUser.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        loginCount: 0,
        tasksCompleted: 0
      };
      setUsersData([...usersData, user]);
      setNewUser({ name: '', email: '', phone: '', role: 'Employee', department: 'IT', status: 'Active' });
      setShowAddUserModal(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      setUsersData(usersData.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      setEditingUser(null);
      setShowEditUserModal(false);
    }
  };

  const handleDeleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsersData(usersData.filter(user => user.id !== userId));
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'activate':
        setUsersData(usersData.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'Active' } : user
        ));
        break;
      case 'deactivate':
        setUsersData(usersData.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'Inactive' } : user
        ));
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
          setUsersData(usersData.filter(user => !selectedUsers.includes(user.id)));
        }
        break;
    }
    setSelectedUsers([]);
    setShowBulkActions(false);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleExport = (format) => {
    const data = filteredAndSortedUsers.map(user => ({
      Name: user.name,
      Email: user.email,
      Phone: user.phone,
      Role: user.role,
      Department: user.department,
      Status: user.status,
      'Created Date': user.createdDate,
      'Last Login': user.lastLogin,
      'Login Count': user.loginCount,
      'Tasks Completed': user.tasksCompleted
    }));

    if (format === 'csv') {
      const csv = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).join(','))
      ].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users-report.csv';
      a.click();
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map(user => user.id));
    }
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyUserData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="active" fill="#22c55e" name="Active Users" />
              <Bar dataKey="inactive" fill="#ef4444" name="Inactive Users" />
              <Bar dataKey="new" fill="#3b82f6" name="New Users" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyUserData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={3} name="Total Users" />
              <Line type="monotone" dataKey="active" stroke="#22c55e" strokeWidth={2} name="Active Users" />
              <Line type="monotone" dataKey="new" stroke="#3b82f6" strokeWidth={2} name="New Users" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyUserData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="active" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} name="Active" />
              <Area type="monotone" dataKey="inactive" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Inactive" />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">User Report Dashboard</h1>
              <p className="text-gray-600">Monitor user activities, registrations, and system usage</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                {showBulkActions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                    <button
                      onClick={() => handleExport('csv')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-t-lg"
                    >
                      Export as CSV
                    </button>
                    <button
                      onClick={() => handleExport('excel')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-b-lg"
                    >
                      Export as Excel
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userStatsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </CardTitle>
                  <IconComponent className="w-5 h-5" style={{ color: stat.color }} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
                  <div className="flex items-center mt-1">
                    <div 
                      className="w-full h-2 rounded-full mt-2"
                      style={{ backgroundColor: stat.color + '20' }}
                    >
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ 
                          backgroundColor: stat.color, 
                          width: `${Math.min((stat.count / userStatsData[3].count) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Analytics Chart */}
          <Card className="lg:col-span-2 bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">User Analytics</CardTitle>
                <div className="flex space-x-2">
                  {['bar', 'line', 'area'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedChart(type)}
                      className={`px-3 py-1 text-sm rounded-md capitalize transition-colors ${
                        selectedChart === type
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {renderChart()}
            </CardContent>
          </Card>

          {/* Role Distribution */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Role Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roleDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                    label={({ role, percent }) => `${role} ${(percent * 100).toFixed(0)}%`}
                  >
                    {roleDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Department Distribution */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Department Wise User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Advanced Filters */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Advanced Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              
              <select 
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>

              <select 
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="HR">HR</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Employee">Employee</option>
              </select>

              <select 
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={departmentFilter}
                onChange={(e) => {
                  setDepartmentFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Departments</option>
                <option value="IT">IT</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Support">Support</option>
              </select>

              <select 
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Time</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
              </select>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {filteredAndSortedUsers.length} of {usersData.length} users
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('All');
                    setRoleFilter('All');
                    setDepartmentFilter('All');
                    setDateFilter('All');
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-blue-700">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">{selectedUsers.length} user(s) selected</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBulkAction('activate')}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => handleBulkAction('deactivate')}
                    className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                  >
                    Deactivate
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedUsers([])}
                    className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Users Table */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Users List</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Rows Per Page:</span>
                <select 
                  className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th 
                      className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        User
                        {sortField === 'name' && (
                          <span className="ml-1 text-blue-500">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                    <th 
                      className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('role')}
                    >
                      <div className="flex items-center">
                        Role
                        {sortField === 'role' && (
                          <span className="ml-1 text-blue-500">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('department')}
                    >
                      <div className="flex items-center">
                        Department
                        {sortField === 'department' && (
                          <span className="ml-1 text-blue-500">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        Status
                        {sortField === 'status' && (
                          <span className="ml-1 text-blue-500">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('createdDate')}
                    >
                      <div className="flex items-center">
                        Created Date
                        {sortField === 'createdDate' && (
                          <span className="ml-1 text-blue-500">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xs font-bold text-white">{user.avatar}</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-gray-600 text-sm">
                            <Phone className="w-3 h-3 mr-1" />
                            {user.phone}
                          </div>
                          <div className="text-xs text-gray-500">
                            Last login: {user.lastLogin}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.department}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getStatusIcon(user.status)}
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{new Date(user.createdDate).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <div className="text-xs space-y-1">
                          <div className="text-blue-600 font-medium">Logins: {user.loginCount}</div>
                          <div className="text-green-600 font-medium">Tasks: {user.tasksCompleted}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-1">
                          <button 
                            onClick={() => {/* View user details */}}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEditUser(user)}
                            className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                            title="Edit User"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600">
                Showing {startEntry} to {endEntryCount} of {filteredAndSortedUsers.length} entries
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <div className="flex space-x-1">
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + index;
                    if (pageNum <= totalPages) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 text-sm border rounded transition-colors ${
                            currentPage === pageNum
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                User Activity Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Daily Active Users</span>
                  <span className="text-lg font-bold text-blue-600">324</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Monthly Active Users</span>
                  <span className="text-lg font-bold text-green-600">487</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Session Duration</span>
                  <span className="text-lg font-bold text-purple-600">2h 15m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Login Success Rate</span>
                  <span className="text-lg font-bold text-orange-600">98.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-500" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">New user registrations</span>
                  <span className="text-green-600 font-medium">+5 today</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Password reset requests</span>
                  <span className="text-orange-600 font-medium">12 this week</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Failed login attempts</span>
                  <span className="text-red-600 font-medium">8 today</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Account deactivations</span>
                  <span className="text-gray-600 font-medium">2 this month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-500" />
                Security Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">2FA Enabled Users</span>
                  <span className="text-purple-600 font-medium">78%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Strong Passwords</span>
                  <span className="text-green-600 font-medium">92%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Suspicious Activities</span>
                  <span className="text-red-600 font-medium">3 flagged</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Security Score</span>
                  <span className="text-blue-600 font-medium">8.5/10</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add User Modal */}
        {showAddUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New User</h3>
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  >
                    <option value="Employee">Employee</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Manager">Manager</option>
                    <option value="HR">HR</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newUser.department}
                    onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                  >
                    <option value="IT">IT</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleAddUser}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add User
                </button>
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditUserModal && editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit User</h3>
                <button
                  onClick={() => setShowEditUserModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  >
                    <option value="Employee">Employee</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Manager">Manager</option>
                    <option value="HR">HR</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editingUser.department}
                    onChange={(e) => setEditingUser({...editingUser, department: e.target.value})}
                  />
                    <option value="IT">IT</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Support">Support</option>
                  
                  <div/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleUpdateUser}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Update User
                </button>
                <button
                  onClick={() => setShowEditUserModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default UserReportDashboard;