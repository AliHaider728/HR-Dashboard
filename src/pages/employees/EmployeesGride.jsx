import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Search, Plus, Filter, MoreVertical, Edit2, Trash2, Eye, X, Upload, User, Lock, Info } from "lucide-react";

const employees = [
  {
    id: "EMP-0001",
    name: "Anthony Lewis",
    role: "Software Developer",
    department: "Development",
    projects: 20,
    done: 13,
    progress: 7,
    productivity: 65,
    status: "Active",
    joinDate: "2023-01-15",
    email: "anthony@smarthr.com",
    phone: "+1 234 567 8901",
    image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
  },
  {
    id: "EMP-0002",
    name: "Harvey Smith",
    role: "Developer",
    department: "Development",
    projects: 25,
    done: 7,
    progress: 18,
    productivity: 20,
    status: "Active",
    joinDate: "2022-11-20",
    email: "harvey@smarthr.com",
    phone: "+1 234 567 8902",
    image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-37.jpg",
  },
  {
    id: "EMP-0003",
    name: "Stephan Peralt",
    role: "Software Developer",
    department: "Development",
    projects: 15,
    done: 13,
    progress: 2,
    productivity: 90,
    status: "Active",
    joinDate: "2023-03-10",
    email: "stephan@smarthr.com",
    phone: "+1 234 567 8903",
    image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-38.jpg",
  },
  {
    id: "EMP-0004",
    name: "Doglas Martini",
    role: "Full Stack Developer",
    department: "Development",
    projects: 15,
    done: 2,
    progress: 13,
    productivity: 10,
    status: "Inactive",
    joinDate: "2022-08-05",
    email: "doglas@smarthr.com",
    phone: "+1 234 567 8904",
    image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-34.jpg",
  },
  {
    id: "EMP-0005",
    name: "Linda Ray",
    role: "Software Developer",
    department: "Development",
    projects: 20,
    done: 10,
    progress: 10,
    productivity: 50,
    status: "Active",
    joinDate: "2023-05-22",
    email: "linda@smarthr.com",
    phone: "+1 234 567 8905",
    image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-27.jpg",
  },
  {
    id: "EMP-0006",
    name: "Elliot Murray",
    role: "Developer",
    department: "Development",
    projects: 40,
    done: 35,
    progress: 5,
    productivity: 93,
    status: "Active",
    joinDate: "2021-12-10",
    email: "elliot@smarthr.com",
    phone: "+1 234 567 8906",
    image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-07.jpg",
  },
  {
    id: "EMP-0007",
    name: "Connie Waters",
    role: "Software Developer",
    department: "Development",
    projects: 25,
    done: 11,
    progress: 14,
    productivity: 35,
    status: "Active",
    joinDate: "2022-09-15",
    email: "connie@smarthr.com",
    phone: "+1 234 567 8907",
    image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-12.jpg",
  },
  {
    id: "EMP-0008",
    name: "Lori Broaddus",
    role: "Full Stack Developer",
    department: "Development",
    projects: 40,
    done: 27,
    progress: 16,
    productivity: 75,
    status: "Active",
    joinDate: "2023-02-28",
    email: "lori@smarthr.com",
    phone: "+1 234 567 8908",
    image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-01.jpg",
  },
  {
    id: "EMP-0009",
    name: "Trent Frazier",
    role: "Software Developer",
    department: "Development",
    projects: 30,
    done: 17,
    progress: 13,
    productivity: 60,
    status: "Active",
    joinDate: "2022-07-12",
    email: "trent@smarthr.com",
    phone: "+1 234 567 8909",
    image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-25.jpg",
  },
  {
    id: "EMP-0010",
    name: "Norene Valle",
    role: "Trainee",
    department: "Training",
    projects: 10,
    done: 1,
    progress: 9,
    productivity: 10,
    status: "Active",
    joinDate: "2023-06-01",
    email: "norene@smarthr.com",
    phone: "+1 234 567 8910",
    image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-09.jpg",
  },
  {
    id: "EMP-0011",
    name: "John Doe",
    role: "Software Engineer",
    department: "Development",
    projects: 30,
    done: 22,
    progress: 8,
    productivity: 80,
    status: "Active",
    joinDate: "2022-04-18",
    email: "john@smarthr.com",
    phone: "+1 234 567 8911",
    image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-13.jpg",
  },
  {
    id: "EMP-0012",
    name: "Jane Smith",
    role: "Frontend Developer",
    department: "Development",
    projects: 35,
    done: 20,
    progress: 15,
    productivity: 70,
    status: "Active",
    joinDate: "2023-01-25",
    email: "jane@smarthr.com",
    phone: "+1 234 567 8912",
    image: "https://smarthr.co.in/demo/html/template/assets/img/users/user-33.jpg",
  },
];

const EmployeeGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [employeeList, setEmployeeList] = useState(employees);
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    joiningDate: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    company: '',
    department: '',
    designation: '',
    about: '',
    profileImage: null
  });
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  // Calculate stats
  const totalEmployees = employeeList.length;
  const activeEmployees = employeeList.filter(emp => emp.status === 'Active').length;
  const inactiveEmployees = employeeList.filter(emp => emp.status === 'Inactive').length;
  const newJoiners = employeeList.filter(emp => {
    const joinDate = new Date(emp.joinDate);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return joinDate > threeMonthsAgo;
  }).length;

  // Filter employees
  const filteredEmployees = employeeList.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || employee.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getProductivityColor = (productivity) => {
    if (productivity >= 80) return 'text-green-600';
    if (productivity >= 60) return 'text-blue-600';
    if (productivity >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'
      : 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium';
  };

  // Generate next employee ID
  const generateEmployeeId = () => {
    const lastId = employeeList.length > 0 
      ? Math.max(...employeeList.map(emp => parseInt(emp.id.split('-')[1]))) 
      : 0;
    return `EMP-${String(lastId + 1).padStart(4, '0')}`;
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profileImage: 'Image should be below 4 MB' }));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        handleInputChange('profileImage', file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.joiningDate) newErrors.joiningDate = 'Joining date is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.about.trim()) newErrors.about = 'About is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newEmployee = {
      id: formData.employeeId || generateEmployeeId(),
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      role: formData.designation,
      department: formData.department,
      projects: 0,
      done: 0,
      progress: 0,
      productivity: 0,
      status: 'Active',
      joinDate: formData.joiningDate,
      email: formData.email,
      phone: formData.phone,
      image: previewImage || "https://via.placeholder.com/48",
    };

    setEmployeeList(prev => [...prev, newEmployee]);
    setShowAddModal(false);
    resetForm();
    
    // Show success message
    alert(`${newEmployee.name} has been added successfully with Employee ID: ${newEmployee.id}`);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      employeeId: '',
      joiningDate: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      company: '',
      department: '',
      designation: '',
      about: '',
      profileImage: null
    });
    setErrors({});
    setPreviewImage(null);
    setActiveTab('basic');
  };

  // Open add modal with auto-generated ID
  const openAddModal = () => {
    setFormData(prev => ({ ...prev, employeeId: generateEmployeeId() }));
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen   p-4 md:p-6">
      <div className="max-w-8xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Employees</h1>
              <p className="text-gray-600">Manage your team members</p>
            </div>
            <button 
              className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              onClick={openAddModal}
            >
              <Plus className="w-4 h-4" />
              Add Employee
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          <Card className="border-0 shadow-xl hover:-translate-y-3  transition-all duration-300 ease-in-out ">
            <CardContent className="p-6 ">
              <div className="flex items-center justify-between ">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Employees</p>
                  <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium mt-2">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl  hover:-translate-y-3  transition-all duration-300 ease-in-out  ">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{activeEmployees}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-600 rounded"></div>
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium mt-2">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl  hover:-translate-y-3  transition-all duration-300 ease-in-out  ">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Inactive</p>
                  <p className="text-2xl font-bold text-gray-900">{inactiveEmployees}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-600 rounded"></div>
                </div>
              </div>
              <p className="text-red-600 text-sm font-medium mt-2">-2% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl  hover:-translate-y-3  transition-all duration-300 ease-in-out  ">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">New Joiners</p>
                  <p className="text-2xl font-bold text-gray-900">{newJoiners}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-600 rounded"></div>
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium mt-2">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-xl  mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  <option value="Development">Development</option>
                  <option value="Training">Training</option>
                </select>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredEmployees.map((employee, index) => (
            <Card key={employee.id} className="border-0 shadow-xl  hover:shadow-md transition-all duration-300 group">
              <CardContent className="p-6">
                {/* Employee Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/48")}
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        employee.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{employee.name}</h3>
                      <p className="text-xs text-gray-500">{employee.id}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Employee Info */}
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{employee.role}</p>
                    <p className="text-xs text-gray-500">{employee.department}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className={getStatusBadge(employee.status)}>
                      {employee.status}
                    </span>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold text-gray-900">{employee.projects}</p>
                      <p className="text-xs text-gray-600">Projects</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">{employee.done}</p>
                      <p className="text-xs text-gray-600">Done</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600">{employee.progress}</p>
                      <p className="text-xs text-gray-600">Progress</p>
                    </div>
                  </div>
                </div>

                {/* Productivity */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Productivity</span>
                    <span className={`text-sm font-semibold ${getProductivityColor(employee.productivity)}`}>
                      {employee.productivity}%
                    </span>
                  </div>
                  <Progress 
                    value={employee.productivity} 
                    className="h-2"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Add Employee Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Add New Employee</h2>
                  <p className="text-sm text-gray-600">Employee ID: {formData.employeeId}</p>
                </div>
                <button 
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="border-b">
                <div className="flex">
                  <button
                    className={`px-6 py-3 text-sm font-medium border-b-2 flex items-center gap-2 ${
                      activeTab === 'basic' 
                        ? 'border-blue-600 text-blue-600 bg-blue-50' 
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab('basic')}
                  >
                    <Info className="w-4 h-4" />
                    Basic Information
                  </button>
                  <button
                    className={`px-6 py-3 text-sm font-medium border-b-2 flex items-center gap-2 ${
                      activeTab === 'permissions' 
                        ? 'border-blue-600 text-blue-600 bg-blue-50' 
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab('permissions')}
                  >
                    <Lock className="w-4 h-4" />
                    Permissions
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                <form onSubmit={handleSubmit} className="p-6">
                  {activeTab === 'basic' && (
                    <div className="space-y-6">
                      {/* Profile Image Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Profile Image
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                            {previewImage ? (
                              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <Upload className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="profileImage"
                            />
                            <label
                              htmlFor="profileImage"
                              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              Choose File
                            </label>
                            <p className="text-xs text-gray-500 mt-1">Image should be below 4 MB</p>
                            {errors.profileImage && <p className="text-red-500 text-xs mt-1">{errors.profileImage}</p>}
                          </div>
                        </div>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.firstName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter first name"
                          />
                          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>

                      {/* Employee ID and Joining Date */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Employee ID <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.employeeId}
                            onChange={(e) => handleInputChange('employeeId', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.employeeId ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="EMP-0001"
                          />
                          {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Joining Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={formData.joiningDate}
                            onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.joiningDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.joiningDate && <p className="text-red-500 text-xs mt-1">{errors.joiningDate}</p>}
                        </div>
                      </div>

                      {/* Username and Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.username ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter username"
                          />
                          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter email address"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      {/* Password Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter password"
                          />
                          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Confirm password"
                          />
                          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>
                      </div>

                      {/* Phone and Company */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter phone number"
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter company name"
                          />
                        </div>
                      </div>

                      {/* Department and Designation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                          <select
                            value={formData.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Department</option>
                            <option value="Finance">Finance</option>
                            <option value="Development">Development</option>
                            <option value="Executive">Executive</option>
                            <option value="HR">HR</option>
                            <option value="Marketing">Marketing</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                          <select
                            value={formData.designation}
                            onChange={(e) => handleInputChange('designation', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Designation</option>
                            <option value="Software Developer">Software Developer</option>
                            <option value="Senior Developer">Senior Developer</option>
                            <option value="Team Lead">Team Lead</option>
                            <option value="Project Manager">Project Manager</option>
                            <option value="Finance Manager">Finance Manager</option>
                            <option value="Executive">Executive</option>
                            <option value="HR Manager">HR Manager</option>
                          </select>
                        </div>
                      </div>

                      {/* About */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          About <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={formData.about}
                          onChange={(e) => handleInputChange('about', e.target.value)}
                          rows={4}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                            errors.about ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter employee description"
                        />
                        {errors.about && <p className="text-red-500 text-xs mt-1">{errors.about}</p>}
                      </div>
                    </div>
                  )}

                  {activeTab === 'permissions' && (
                    <div className="space-y-6">
                      <div className="text-center py-12">
                        <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Permissions Settings</h3>
                        <p className="text-gray-600">Permission management functionality will be available soon.</p>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Modal Footer */}
              <div className="border-t p-6 bg-gray-50">
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => { setShowAddModal(false); resetForm(); }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Employee
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeGrid;