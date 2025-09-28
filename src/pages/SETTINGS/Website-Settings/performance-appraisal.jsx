import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Users,
  Calendar,
  TrendingUp,
  Star,
  User,
  Briefcase,
  Award,
  Edit3,
  Search,
  Filter,
  Download,
  Plus,
  Trash2,
  Loader2,
  CheckCircle,
  AlertCircle,
  Settings,
} from "lucide-react";

const PerformanceAppraisal = () => {
  const navigate = useNavigate();
  
  // State management
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Sample employee data with competencies
  const initialEmployees = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      designation: "Web Designer",
      department: "Designing",
      appraisalDate: "14/01/2024",
      status: "Active",
      technicalCompetencies: {
        "Customer Experience": { expected: "Intermediate", set: "Advanced" },
        "Marketing": { expected: "Advanced", set: "Advanced" },
        "Management": { expected: "Advanced", set: "Expert / Leader" },
        "Administration": { expected: "Advanced", set: "Advanced" },
        "Presentation Skill": { expected: "Expert / Leader", set: "Expert / Leader" },
        "Quality Of Work": { expected: "Expert / Leader", set: "Expert / Leader" },
        "Efficiency": { expected: "Expert / Leader", set: "Expert / Leader" },
      },
      lastReview: "10/01/2024",
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      designation: "Web Developer",
      department: "Developer",
      appraisalDate: "21/01/2024",
      status: "Active",
      technicalCompetencies: {
        "Customer Experience": { expected: "Intermediate", set: "Advanced" },
        "Marketing": { expected: "Advanced", set: "Advanced" },
        "Management": { expected: "Advanced", set: "Advanced" },
        "Administration": { expected: "Advanced", set: "Expert / Leader" },
        "Presentation Skill": { expected: "Expert / Leader", set: "Expert / Leader" },
        "Quality Of Work": { expected: "Expert / Leader", set: "Expert / Leader" },
        "Efficiency": { expected: "Expert / Leader", set: "Expert / Leader" },
      },
      lastReview: "15/01/2024",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      designation: "iOS Developer",
      department: "Developer",
      appraisalDate: "18/02/2024",
      status: "Active",
      technicalCompetencies: {
        "Customer Experience": { expected: "Intermediate", set: "Intermediate" },
        "Marketing": { expected: "Advanced", set: "Advanced" },
        "Management": { expected: "Advanced", set: "Advanced" },
        "Administration": { expected: "Advanced", set: "Advanced" },
        "Presentation Skill": { expected: "Expert / Leader", set: "Expert / Leader" },
        "Quality Of Work": { expected: "Expert / Leader", set: "Expert / Leader" },
        "Efficiency": { expected: "Expert / Leader", set: "Advanced" },
      },
      lastReview: "10/02/2024",
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      designation: "Android Developer",
      department: "Developer",
      appraisalDate: "24/02/2024",
      status: "Active",
      technicalCompetencies: {
        "Customer Experience": { expected: "Intermediate", set: "Advanced" },
        "Marketing": { expected: "Advanced", set: "Advanced" },
        "Management": { expected: "Advanced", set: "Advanced" },
        "Administration": { expected: "Advanced", set: "Advanced" },
        "Presentation Skill": { expected: "Expert / Leader", set: "Expert / Leader" },
        "Quality Of Work": { expected: "Expert / Leader", set: "Expert / Leader" },
        "Efficiency": { expected: "Expert / Leader", set: "Expert / Leader" },
      },
      lastReview: "20/02/2024",
    },
    {
      id: 5,
      name: "Lisa Patel",
      avatar: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=150&h=150&fit=crop&crop=face",
      designation: "DevOps Engineer",
      department: "DevOps",
      appraisalDate: "11/03/2024",
      status: "Active",
      technicalCompetencies: {
        "Customer Experience": { expected: "Intermediate", set: "Advanced" },
        "Marketing": { expected: "Advanced", set: "Advanced" },
        "Management": { expected: "Advanced", set: "Expert / Leader" },
        "Administration": { expected: "Advanced", set: "Expert / Leader" },
        "Presentation Skill": { expected: "Expert / Leader", set: "Expert / Leader" },
        "Quality Of Work": { expected: "Expert / Leader", set: "Expert / Leader" },
        "Efficiency": { expected: "Expert / Leader", set: "Expert / Leader" },
      },
      lastReview: "05/03/2024",
    },
  ];

  // Load initial data
  useEffect(() => {
    setTimeout(() => {
      setEmployees(initialEmployees);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === "all" || employee.department === filterDept;
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus;
    return matchesSearch && matchesDept && matchesStatus;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(a.appraisalDate.split('/').reverse().join('-')) - new Date(b.appraisalDate.split('/').reverse().join('-'));
      default:
        return 0;
    }
  });

  const departments = ["all", ...new Set(employees.map(emp => emp.department))];
  const statuses = ["all", ...new Set(employees.map(emp => emp.status))];

  const handleEditEmployee = (employee) => {
    setEditingEmployee({ ...employee });
    setShowAddModal(true);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this appraisal? This action cannot be undone.")) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      alert("Appraisal deleted successfully!");
    }
  };

  const handleSaveEmployee = async (employeeData) => {
    setIsSaving(true);
    setTimeout(() => {
      if (editingEmployee) {
        setEmployees(prev => prev.map(emp => 
          emp.id === editingEmployee.id ? employeeData : emp
        ));
        alert("Appraisal updated successfully!");
      } else {
        const newEmployee = {
          ...employeeData,
          id: Date.now(),
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          lastReview: new Date().toLocaleDateString('en-GB'),
        };
        setEmployees(prev => [...prev, newEmployee]);
        alert("Appraisal added successfully!");
      }
      setShowAddModal(false);
      setEditingEmployee(null);
      setIsSaving(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 font-[Inter]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading performance data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screen bg-gray-50 py-8 font-[Inter]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-[Poppins]">
                  Performance Appraisal
                </h1>
                <p className="text-gray-600 mt-1">
                  Track and manage employee performance reviews and appraisals
                </p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{employees.length}</div>
                <div className="text-sm text-gray-600">Total Appraisals</div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {employees.filter(emp => emp.status === "Active").length}
                </div>
                <div className="text-sm text-gray-600">Active Reviews</div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {employees.filter(emp => new Date(emp.appraisalDate.split('/').reverse().join('-')) <= new Date()).length}
                </div>
                <div className="text-sm text-gray-600">Completed This Month</div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <Card className="bg-white shadow-sm mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-2 flex-1 max-w-md">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-2 flex-1 max-w-md">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filterDept}
                    onChange={(e) => setFilterDept(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept === "all" ? "All Departments" : dept}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2 flex-1 max-w-md">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status === "all" ? "All Statuses" : status}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="date">Sort by Date</option>
                  </select>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button 
                    onClick={() => {
                      setEditingEmployee(null);
                      setShowAddModal(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Appraisal</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employees Table */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                <Users className="w-5 h-5 mr-2 text-orange-600" />
                Employee Performance Reviews
              </CardTitle>
              <CardDescription>
                Track progress and manage upcoming appraisals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Designation
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Appraisal Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={employee.avatar}
                              alt={employee.name}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/40x40/6B7280/FFFFFF?text=' + employee.name.charAt(0);
                              }}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                              <div className="text-sm text-gray-500">{employee.lastReview}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employee.designation}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            employee.department === 'Developer' ? 'bg-orange-100 text-orange-800' :
                            employee.department === 'Designing' ? 'bg-green-100 text-green-800' :
                            employee.department === 'DevOps' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {employee.department}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.appraisalDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {employee.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEditEmployee(employee)}
                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                            title="Edit Appraisal"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEmployee(employee.id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete Appraisal"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredEmployees.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg">No appraisals found</p>
                          <p className="text-sm">Try adjusting your search or filter criteria</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit Employee Modal */}
          {showAddModal && (
            <AppraisalModal
              employee={editingEmployee}
              onSave={handleSaveEmployee}
              onClose={() => {
                setShowAddModal(false);
                setEditingEmployee(null);
              }}
              isSaving={isSaving}
            />
          )}
        </div>
      </div>
    </>
  );
};

// Appraisal Modal Component
const AppraisalModal = ({ employee, onSave, onClose, isSaving }) => {
  const [formData, setFormData] = useState({
    name: "",
    appraisalDate: "",
    status: "Active",
    technicalCompetencies: {
      "Customer Experience": { expected: "Intermediate", set: "Intermediate" },
      "Marketing": { expected: "Advanced", set: "Advanced" },
      "Management": { expected: "Advanced", set: "Advanced" },
      "Administration": { expected: "Advanced", set: "Advanced" },
      "Presentation Skill": { expected: "Expert / Leader", set: "Expert / Leader" },
      "Quality Of Work": { expected: "Expert / Leader", set: "Expert / Leader" },
      "Efficiency": { expected: "Expert / Leader", set: "Expert / Leader" },
    },
  });

  const competencyLevels = ["Intermediate", "Advanced", "Expert / Leader"];

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        appraisalDate: employee.appraisalDate,
        status: employee.status,
        technicalCompetencies: employee.technicalCompetencies,
      });
    } else {
      // Reset to default for new appraisal
      setFormData({
        name: "",
        appraisalDate: "",
        status: "Active",
        technicalCompetencies: {
          "Customer Experience": { expected: "Intermediate", set: "Intermediate" },
          "Marketing": { expected: "Advanced", set: "Advanced" },
          "Management": { expected: "Advanced", set: "Advanced" },
          "Administration": { expected: "Advanced", set: "Advanced" },
          "Presentation Skill": { expected: "Expert / Leader", set: "Expert / Leader" },
          "Quality Of Work": { expected: "Expert / Leader", set: "Expert / Leader" },
          "Efficiency": { expected: "Expert / Leader", set: "Expert / Leader" },
        },
      });
    }
  }, [employee]);

  const handleCompetencyChange = (indicator, type, value) => {
    setFormData(prev => ({
      ...prev,
      technicalCompetencies: {
        ...prev.technicalCompetencies,
        [indicator]: {
          ...prev.technicalCompetencies[indicator],
          [type]: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.appraisalDate) {
      alert("Please fill in all required fields");
      return;
    }
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const modalTitle = employee ? "Edit Appraisal" : "Add Appraisal";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{modalTitle}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              disabled={isSaving}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee and Date Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter employee name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appraisal Date <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="appraisalDate"
                    value={formData.appraisalDate}
                    onChange={handleChange}
                    required
                    placeholder="dd/mm/yyyy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <Calendar className="w-5 h-5 text-gray-400 ml-2" />
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Technical Competencies Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-orange-600" />
                Technical Competencies
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-700 mb-1">Indicator</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-700 mb-1">Expected Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-700 mb-1">Set Value</div>
                  </div>
                </div>

                {Object.entries(formData.technicalCompetencies).map(([indicator, values]) => (
                  <div key={indicator} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-gray-200 pb-3 last:border-b-0">
                    <div className="text-sm font-medium text-gray-900">{indicator}</div>
                    <div className="text-center">
                      <select
                        value={values.expected}
                        onChange={(e) => handleCompetencyChange(indicator, "expected", e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                      >
                        {competencyLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    <div className="text-center">
                      <select
                        value={values.set}
                        onChange={(e) => handleCompetencyChange(indicator, "set", e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                      >
                        {competencyLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{employee ? "Updating" : "Adding"}...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>{employee ? "Update Appraisal" : "Add Appraisal"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAppraisal;