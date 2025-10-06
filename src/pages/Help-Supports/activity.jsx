 
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter, Edit2, Trash2, X } from "lucide-react";

const initialActivities = [
  {
    id: "ACT-0001",
    title: "We scheduled a meeting for next week",
    type: "Meeting",
    dueDate: "2024-01-16",
    owner: "Hendry Milner",
    createdDate: "2024-01-14",
  },
  {
    id: "ACT-0002",
    title: "Had conversation with Fred regarding task",
    type: "Calls",
    dueDate: "2024-01-24",
    owner: "Guilory Berggren",
    createdDate: "2024-01-21",
  },
  {
    id: "ACT-0003",
    title: "Analysing latest time estimation for new project",
    type: "Tasks",
    dueDate: "2024-02-23",
    owner: "Jami Carlile",
    createdDate: "2024-02-20",
  },
  {
    id: "ACT-0004",
    title: "Store and manage contact data",
    type: "Email",
    dueDate: "2024-03-18",
    owner: "Theresa Nelson",
    createdDate: "2024-03-15",
  },
  {
    id: "ACT-0005",
    title: "Call John and discuss about project",
    type: "Calls",
    dueDate: "2024-04-14",
    owner: "Smith Cooper",
    createdDate: "2024-04-12",
  },
  {
    id: "ACT-0006",
    title: "Will have a meeting before project start",
    type: "Meeting",
    dueDate: "2024-04-22",
    owner: "Martin Lewis",
    createdDate: "2024-04-20",
  },
  {
    id: "ACT-0007",
    title: "Will have a meeting before project start",
    type: "Meeting",
    dueDate: "2024-04-22",
    owner: "Martin Lewis",
    createdDate: "2024-04-20",
  },
  {
    id: "ACT-0008",
    title: "Built landing pages",
    type: "Email",
    dueDate: "2024-07-08",
    owner: "Newell Egan",
    createdDate: "2024-07-06",
  },
  {
    id: "ACT-0009",
    title: "Discussed budget proposal with Edwin",
    type: "Calls",
    dueDate: "2024-09-05",
    owner: "Janet Carlson",
    createdDate: "2024-09-02",
  },
  {
    id: "ACT-0010",
    title: "Attach final proposal for upcoming project",
    type: "Tasks",
    dueDate: "2024-11-18",
    owner: "Craig Byrne",
    createdDate: "2024-11-15",
  },
  {
    id: "ACT-0011",
    title: "Regarding latest updates in project",
    type: "Meeting",
    dueDate: "2024-12-12",
    owner: "Daniel Brown",
    createdDate: "2024-12-10",
  },
];

const getTypeColor = (type) => {
  switch (type) {
    case 'Meeting': return 'bg-blue-100 text-blue-800';
    case 'Calls': return 'bg-green-100 text-green-800';
    case 'Tasks': return 'bg-yellow-100 text-yellow-800';
    case 'Email': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const ActivityPage = () => {
  const [activityList, setActivityList] = useState(initialActivities);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    dueDate: '',
    owner: '',
    createdDate: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState({});

  // Generate next activity ID
  const generateActivityId = () => {
    const lastId = activityList.length > 0 
      ? Math.max(...activityList.map(act => parseInt(act.id.split('-')[1]))) 
      : 0;
    return `ACT-${String(lastId + 1).padStart(4, '0')}`;
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.type) newErrors.type = 'Activity type is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.owner.trim()) newErrors.owner = 'Owner is required';
    if (!formData.createdDate) newErrors.createdDate = 'Created date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newActivity = {
      id: editIndex !== null ? activityList[editIndex].id : generateActivityId(),
      title: formData.title,
      type: formData.type,
      dueDate: formData.dueDate,
      owner: formData.owner,
      createdDate: formData.createdDate,
    };

    if (editIndex !== null) {
      setActivityList(prev => {
        const updatedList = [...prev];
        updatedList[editIndex] = newActivity;
        return updatedList;
      });
      alert(`Activity "${newActivity.title}" has been updated successfully!`);
    } else {
      setActivityList(prev => [...prev, newActivity]);
      alert(`Activity "${newActivity.title}" has been added successfully with ID: ${newActivity.id}`);
    }

    setShowAddModal(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      type: '',
      dueDate: '',
      owner: '',
      createdDate: new Date().toISOString().split('T')[0],
    });
    setErrors({});
    setEditIndex(null);
  };

  // Handle edit
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData({
      title: activityList[index].title,
      type: activityList[index].type,
      dueDate: activityList[index].dueDate,
      owner: activityList[index].owner,
      createdDate: activityList[index].createdDate,
    });
    setShowAddModal(true);
  };

  // Handle delete
  const handleDelete = (index) => {
    if (confirm(`Are you sure you want to delete the activity "${activityList[index].title}"?`)) {
      setActivityList(prev => prev.filter((_, i) => i !== index));
      alert('Activity deleted successfully!');
    }
  };

  // Filter activities
  const filteredActivities = useMemo(() => {
    return activityList.filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || activity.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [activityList, searchTerm, selectedType]);

  // Open add modal
  const openAddModal = () => {
    setEditIndex(null);
    resetForm();
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen p-4 md:p-6  ">
      <div className="max-w-full mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Activities</h1>
              <p className="text-gray-600">Manage your team activities and tasks</p>
            </div>
            <Button 
              className="mt-4 md:mt-0 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
              onClick={openAddModal}
            >
              <Plus className="w-4 h-4" />
              Add Activity
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-xl mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Search activities..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Select
                  value={selectedType}
                  onValueChange={setSelectedType}
                >
                  <SelectTrigger className="w-[180px] border-gray-300 focus:ring-2 focus:ring-orange-500">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Meeting">Meeting</SelectItem>
                    <SelectItem value="Calls">Calls</SelectItem>
                    <SelectItem value="Tasks">Tasks</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  className="px-4 py-2 border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Table Card */}
        <Card className="border-0 shadow-xl mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Activity Log</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-sm font-medium text-gray-700">Title</TableHead>
                    <TableHead className="text-sm font-medium text-gray-700">Activity Type</TableHead>
                    <TableHead className="text-sm font-medium text-gray-700">Due Date</TableHead>
                    <TableHead className="text-sm font-medium text-gray-700">Owner</TableHead>
                    <TableHead className="text-sm font-medium text-gray-700">Created Date</TableHead>
                    <TableHead className="text-sm font-medium text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivities.map((activity, index) => (
                    <TableRow 
                      key={activity.id} 
                      className="border-b hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-gray-900">{activity.title}</TableCell>
                      <TableCell>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(activity.type)}`}>
                          {activity.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{new Date(activity.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</TableCell>
                      <TableCell className="text-sm font-medium text-gray-900">{activity.owner}</TableCell>
                      <TableCell className="text-sm text-gray-600">{new Date(activity.createdDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(index)}
                            className="h-8 w-8 p-0 hover:bg-orange-100 transition-colors duration-200"
                          >
                            <Edit2 className="h-4 w-4 text-orange-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(index)}
                            className="h-8 w-8 p-0 hover:bg-red-100 transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Activity Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{editIndex !== null ? 'Edit Activity' : 'Add New Activity'}</h2>
                  <p className="text-sm text-gray-600">Activity ID: {editIndex !== null ? activityList[editIndex].id : generateActivityId()}</p>
                </div>
                <Button 
                  variant="ghost"
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={`w-full ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter activity title"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                  </div>

                  {/* Activity Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Activity Type <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => handleInputChange('type', value)}
                    >
                      <SelectTrigger className={`w-full ${errors.type ? 'border-red-500' : 'border-gray-300'}`}>
                        <SelectValue placeholder="Select activity type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Meeting">Meeting</SelectItem>
                        <SelectItem value="Calls">Calls</SelectItem>
                        <SelectItem value="Tasks">Tasks</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      className={`w-full ${errors.dueDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
                  </div>

                  {/* Owner */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Owner <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      value={formData.owner}
                      onChange={(e) => handleInputChange('owner', e.target.value)}
                      className={`w-full ${errors.owner ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter owner name"
                    />
                    {errors.owner && <p className="text-red-500 text-xs mt-1">{errors.owner}</p>}
                  </div>

                  {/* Created Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Created Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      value={formData.createdDate}
                      onChange={(e) => handleInputChange('createdDate', e.target.value)}
                      className={`w-full ${errors.createdDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.createdDate && <p className="text-red-500 text-xs mt-1">{errors.createdDate}</p>}
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="border-t p-6 bg-gray-50">
                <div className="flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => { setShowAddModal(false); resetForm(); }}
                    className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700 hover:text-white transition-colors duration-200"
                  >
                    {editIndex !== null ? 'Update Activity' : 'Add Activity'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityPage;
