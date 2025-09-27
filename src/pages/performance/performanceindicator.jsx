import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Filter, Edit2, Trash2, X, Info } from "lucide-react";

const initialIndicators = [
  {
    id: "IND-0001",
    designation: "Technical",
    department: "Designing",
    approvedBy: "John Doe",
    approvedByImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-34.jpg",
    createdDate: "2024-01-14",
    status: "Active",
  },
  {
    id: "IND-0002",
    designation: "Customer Experience",
    department: "Developer",
    approvedBy: "Jane Smith",
    approvedByImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-34.jpg",
    createdDate: "2024-01-21",
    status: "Active",
  },
  {
    id: "IND-0003",
    designation: "Marketing",
    department: "Developer",
    approvedBy: "Alice Johnson",
    approvedByImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-34.jpg",
    createdDate: "2024-02-18",
    status: "Active",
  },
  {
    id: "IND-0004",
    designation: "Management",
    department: "Developer",
    approvedBy: "Bob Brown",
    approvedByImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-34.jpg",
    createdDate: "2024-02-24",
    status: "Active",
  },
  {
    id: "IND-0005",
    designation: "Administration",
    department: "DevOps",
    approvedBy: "Emma Wilson",
    approvedByImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-34.jpg",
    createdDate: "2024-03-11",
    status: "Active",
  },
];

const designationOptions = [
  "Technical",
  "Customer Experience",
  "Marketing",
  "Management",
  "Administration",
  "Presentation Skills",
  "Quality of Work",
  "Efficiency",
  "Organizational",
  "Integrity",
  "Professionalism",
  "Team Work",
  "Critical Thinking",
  "Conflict Management",
  "Attendance",
  "Ability To Meet Deadline",
];

const PerformanceIndicator = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [indicators, setIndicators] = useState(initialIndicators);
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    designation: '',
    department: '',
    approvedBy: '',
    createdDate: '',
    status: 'Active',
  });
  const [errors, setErrors] = useState({});

  // Filter indicators
  const filteredIndicators = indicators.filter(indicator => {
    const matchesSearch = 
      indicator.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicator.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicator.approvedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicator.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || indicator.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'
      : 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium';
  };

  const generateIndicatorId = () => {
    const lastId = indicators.length > 0 
      ? Math.max(...indicators.map(ind => parseInt(ind.id.split('-')[1]))) 
      : 0;
    return `IND-${String(lastId + 1).padStart(4, '0')}`;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.approvedBy.trim()) newErrors.approvedBy = 'Approved By is required';
    if (!formData.createdDate) newErrors.createdDate = 'Created Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newIndicator = {
      id: generateIndicatorId(),
      designation: formData.designation,
      department: formData.department,
      approvedBy: formData.approvedBy,
      approvedByImage: "https://smarthr.co.in/demo/html/template/assets/img/users/user-34.jpg",
      createdDate: formData.createdDate,
      status: formData.status,
    };

    setIndicators(prev => [...prev, newIndicator]);
    setShowAddModal(false);
    resetForm();
    alert(`Performance indicator added successfully with ID: ${newIndicator.id}`);
  };

  const handleEdit = (indicator) => {
    setFormData({
      designation: indicator.designation,
      department: indicator.department,
      approvedBy: indicator.approvedBy,
      createdDate: indicator.createdDate,
      status: indicator.status,
    });
    setSelectedIndicator(indicator);
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedIndicator = {
      ...selectedIndicator,
      designation: formData.designation,
      department: formData.department,
      approvedBy: formData.approvedBy,
      approvedByImage: selectedIndicator.approvedByImage,
      createdDate: formData.createdDate,
      status: formData.status,
    };

    setIndicators(prev => prev.map(ind => ind.id === updatedIndicator.id ? updatedIndicator : ind));
    setShowEditModal(false);
    resetForm();
    alert(`Performance indicator updated successfully.`);
  };

  const handleDelete = (indicatorId) => {
    if (window.confirm('Are you sure you want to delete this performance indicator?')) {
      setIndicators(prev => prev.filter(ind => ind.id !== indicatorId));
      alert('Performance indicator deleted successfully.');
    }
  };

  const resetForm = () => {
    setFormData({
      designation: '',
      department: '',
      approvedBy: '',
      createdDate: '',
      status: 'Active',
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Performance Indicators</h1>
              <p className="text-gray-600">Manage performance indicators</p>
            </div>
            <button 
              className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-4 h-4" />
              Add Indicator
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search indicators..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
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

        {/* Indicators Table */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-900">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-medium text-gray-700">Designation</th>
                    <th className="px-4 py-3 font-medium text-gray-700">Department</th>
                    <th className="px-4 py-3 font-medium text-gray-700">Approved By</th>
                    <th className="px-4 py-3 font-medium text-gray-700">Created Date</th>
                    <th className="px-4 py-3 font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIndicators.map((indicator) => (
                    <tr key={indicator.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{indicator.designation || '-'}</td>
                      <td className="px-4 py-3">{indicator.department}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={indicator.approvedByImage}
                            alt={indicator.approvedBy}
                            className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                            onError={(e) => (e.target.src = "https://via.placeholder.com/32")}
                          />
                          <span>{indicator.approvedBy}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{new Date(indicator.createdDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={getStatusBadge(indicator.status)}>
                          {indicator.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button 
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                          onClick={() => handleEdit(indicator)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 text-red-600 hover:bg-red-100 rounded"
                          onClick={() => handleDelete(indicator.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredIndicators.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No indicators found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Indicator Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Add New Indicator</h2>
                  <p className="text-sm text-gray-600">Indicator ID: {generateIndicatorId()}</p>
                </div>
                <button 
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Designation <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.designation}
                        onChange={(e) => handleInputChange('designation', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.designation ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Designation</option>
                        {designationOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.department ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Department</option>
                        <option value="Designing">Designing</option>
                        <option value="Developer">Developer</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                      </select>
                      {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Approved By <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.approvedBy}
                        onChange={(e) => handleInputChange('approvedBy', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.approvedBy ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter approver name"
                      />
                      {errors.approvedBy && <p className="text-red-500 text-xs mt-1">{errors.approvedBy}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Created Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.createdDate}
                        onChange={(e) => handleInputChange('createdDate', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.createdDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.createdDate && <p className="text-red-500 text-xs mt-1">{errors.createdDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

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
                    Add Indicator
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Indicator Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Edit Indicator</h2>
                  <p className="text-sm text-gray-600">Indicator ID: {selectedIndicator.id}</p>
                </div>
                <button 
                  onClick={() => { setShowEditModal(false); resetForm(); }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                <form onSubmit={handleUpdate} className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Designation <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.designation}
                        onChange={(e) => handleInputChange('designation', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.designation ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Designation</option>
                        {designationOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.department ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Department</option>
                        <option value="Designing">Designing</option>
                        <option value="Developer">Developer</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                      </select>
                      {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Approved By <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.approvedBy}
                        onChange={(e) => handleInputChange('approvedBy', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.approvedBy ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter approver name"
                      />
                      {errors.approvedBy && <p className="text-red-500 text-xs mt-1">{errors.approvedBy}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Created Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.createdDate}
                        onChange={(e) => handleInputChange('createdDate', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.createdDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.createdDate && <p className="text-red-500 text-xs mt-1">{errors.createdDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              <div className="border-t p-6 bg-gray-50">
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => { setShowEditModal(false); resetForm(); }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Update Indicator
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

export default PerformanceIndicator;