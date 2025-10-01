import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend } from 'recharts';
import { Calendar, Clock, TrendingUp, Users, CheckCircle, XCircle, AlertCircle, Pause } from 'lucide-react';

const TaskReportDashboard = () => {
  const [selectedChart, setSelectedChart] = useState('bar');

  // Sample data based on the original page
  const taskStatusData = [
    { name: 'Completed', value: 40, count: 320, color: '#22c55e' },
    { name: 'Pending', value: 30, count: 240, color: '#f59e0b' },
    { name: 'In Progress', value: 20, count: 160, color: '#3b82f6' },
    { name: 'On Hold', value: 10, count: 80, color: '#ef4444' }
  ];

  const monthlyTaskData = [
    { month: 'Jan', completed: 65, pending: 28, inprogress: 20, onhold: 15 },
    { month: 'Feb', completed: 72, pending: 32, inprogress: 25, onhold: 12 },
    { month: 'Mar', completed: 68, pending: 35, inprogress: 22, onhold: 18 },
    { month: 'Apr', completed: 85, pending: 28, inprogress: 30, onhold: 10 },
    { month: 'May', completed: 92, pending: 25, inprogress: 35, onhold: 8 },
    { month: 'Jun', completed: 78, pending: 40, inprogress: 28, onhold: 14 },
    { month: 'Jul', completed: 95, pending: 22, inprogress: 42, onhold: 6 }
  ];

  const priorityData = [
    { priority: 'High', count: 45, color: '#ef4444' },
    { priority: 'Medium', count: 62, color: '#f59e0b' },
    { priority: 'Low', count: 38, color: '#22c55e' }
  ];

  const tasksTableData = [
    { id: 1, taskName: 'Patient Appointment Booking', projectName: 'Hospital Administration', createdDate: '14 Jan 2024', dueDate: '15 Jan 2024', priority: 'Low', status: 'Completed' },
    { id: 2, taskName: 'Payment Gateway', projectName: 'Educational Platform', createdDate: '21 Jan 2024', dueDate: '25 Jan 2024', priority: 'Medium', status: 'In Progress' },
    { id: 3, taskName: 'Doctor available module', projectName: 'Clinic Management', createdDate: '20 Feb 2024', dueDate: '22 Feb 2024', priority: 'High', status: 'Completed' },
    { id: 4, taskName: 'Video Conferencing Module', projectName: 'Chat & Call Mobile App', createdDate: '15 Mar 2024', dueDate: '17 Mar 2024', priority: 'Low', status: 'On Hold' },
    { id: 5, taskName: 'Private Chat Module', projectName: 'Travel Planning Website', createdDate: '12 Apr 2024', dueDate: '16 Apr 2024', priority: 'High', status: 'Completed' },
    { id: 6, taskName: 'Services List & Grid View', projectName: 'Service Booking Software', createdDate: '20 Apr 2024', dueDate: '21 Apr 2024', priority: 'Low', status: 'Pending' },
    { id: 7, taskName: 'Car Detail Module', projectName: 'Car & Bike Rental Software', createdDate: '06 Jul 2024', dueDate: '06 Jul 2024', priority: 'Medium', status: 'In Progress' },
    { id: 8, taskName: 'Location Module', projectName: 'Food Order App', createdDate: '02 Sep 2024', dueDate: '04 Sep 2024', priority: 'Low', status: 'Completed' },
    { id: 9, taskName: 'Hotel List & Grid View', projectName: 'Hotel Booking App', createdDate: '15 Nov 2024', dueDate: '15 Nov 2024', priority: 'Medium', status: 'Completed' },
    { id: 10, taskName: 'Warehouse Module', projectName: 'POS Admin Software', createdDate: '01 Sep 2025', dueDate: '05 Sep 2025', priority: 'Medium', status: 'Pending' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'On Hold': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'In Progress': return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case 'On Hold': return <Pause className="w-4 h-4 text-red-600" />;
      default: return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyTaskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#22c55e" name="Completed" />
              <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              <Bar dataKey="inprogress" fill="#3b82f6" name="In Progress" />
              <Bar dataKey="onhold" fill="#ef4444" name="On Hold" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTaskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={3} />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="inprogress" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="onhold" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTaskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="completed" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
              <Area type="monotone" dataKey="inprogress" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="pending" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              <Area type="monotone" dataKey="onhold" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Task Report Dashboard</h1>
          <p className="text-gray-600">Track and analyze task performance across projects</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {taskStatusData.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.name} Tasks
                </CardTitle>
                {getStatusIcon(stat.name)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
                <div className="flex items-center mt-1">
                  <div className="text-xs text-gray-500 mr-2">{stat.value}% of total</div>
                  <div 
                    className="w-16 h-2 rounded-full"
                    style={{ backgroundColor: stat.color + '20' }}
                  >
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        backgroundColor: stat.color, 
                        width: `${stat.value}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <Card className="lg:col-span-2 bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Task Analytics</CardTitle>
                <div className="flex space-x-2">
                  {['bar', 'pie', 'line', 'area'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedChart(type)}
                      className={`px-3 py-1 text-sm rounded-md capitalize ${
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

          {/* Priority Distribution */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Priority Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {priorityData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.priority}</span>
                    </div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Table */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Tasks List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Task Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Project Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Created Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Due Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksTableData.map((task) => (
                    <tr key={task.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{task.taskName}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{task.projectName}</td>
                      <td className="py-3 px-4 text-gray-600">{task.createdDate}</td>
                      <td className="py-3 px-4 text-gray-600">{task.dueDate}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getStatusIcon(task.status)}
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="text-lg font-bold text-green-600">67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Task Duration</span>
                  <span className="text-lg font-bold text-blue-600">3.2 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Overdue Tasks</span>
                  <span className="text-lg font-bold text-red-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Projects</span>
                  <span className="text-lg font-bold text-purple-600">12</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Team Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-green-600">AH</span>
                    </div>
                    <span className="text-sm text-gray-700">Adrian Herman</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">95% Complete</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-blue-600">JS</span>
                    </div>
                    <span className="text-sm text-gray-700">John Smith</span>
                  </div>
                  <span className="text-sm font-medium text-blue-600">87% Complete</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-yellow-600">MJ</span>
                    </div>
                    <span className="text-sm text-gray-700">Mary Johnson</span>
                  </div>
                  <span className="text-sm font-medium text-yellow-600">72% Complete</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskReportDashboard;