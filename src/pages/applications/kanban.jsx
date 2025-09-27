import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, MessageCircle, Paperclip, Calendar, Search, Filter, Pencil, Trash2, DollarSign, Clock, Users } from 'lucide-react';

const Kanbanview = () => {
  const teamImages = [
    { employeeImage: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-32.jpg' },
    { employeeImage: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-09.jpg' },
    { employeeImage: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-36.jpg' },
    { employeeImage: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg' },
    { employeeImage: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-35.jpg' },
    { employeeImage: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg' },
  ];

  const [tasks, setTasks] = useState({
    new: [
      {
        id: 'PRJ-154',
        title: 'Web Layout',
        priority: 'low',
        budget: '$24,000',
        tasksCompleted: 12,
        tasksTotal: 15,
        dueDate: '2024-04-15',
        comments: 14,
        attachments: 14,
        tags: ['Design', 'UI/UX'],
        employeeImages: teamImages.slice(0, 5),
        createdDate: '2024-03-01',
      },
      {
        id: 'PRJ-155',
        title: 'Mobile App Development',
        priority: 'high',
        budget: '$35,000',
        tasksCompleted: 8,
        tasksTotal: 12,
        dueDate: '2024-04-20',
        comments: 21,
        attachments: 8,
        tags: ['Mobile', 'React Native'],
        employeeImages: teamImages.slice(0, 4),
        createdDate: '2024-03-05',
      },
    ],
    inprogress: [
      {
        id: 'PRJ-156',
        title: 'E-commerce Platform',
        priority: 'high',
        budget: '$50,000',
        tasksCompleted: 18,
        tasksTotal: 25,
        dueDate: '2024-05-15',
        comments: 32,
        attachments: 19,
        tags: ['Backend', 'Security'],
        employeeImages: teamImages.slice(0, 6),
        createdDate: '2024-03-10',
      },
      {
        id: 'PRJ-169',
        title: 'Data Analytics Dashboard',
        priority: 'medium',
        budget: '$28,000',
        tasksCompleted: 9,
        tasksTotal: 15,
        dueDate: '2024-04-30',
        comments: 16,
        attachments: 12,
        tags: ['Analytics', 'Dashboard'],
        employeeImages: teamImages.slice(0, 3),
        createdDate: '2024-04-25',
      },
    ],
    onhold: [
      {
        id: 'PRJ-159',
        title: 'CRM System',
        priority: 'low',
        budget: '$42,000',
        tasksCompleted: 5,
        tasksTotal: 20,
        dueDate: '2024-06-15',
        comments: 8,
        attachments: 6,
        tags: ['CRM', 'Database'],
        employeeImages: teamImages.slice(0, 4),
        createdDate: '2024-03-02',
      },
      {
        id: 'PRJ-160',
        title: 'Marketing Website',
        priority: 'medium',
        budget: '$18,000',
        tasksCompleted: 7,
        tasksTotal: 10,
        dueDate: '2024-05-01',
        comments: 12,
        attachments: 9,
        tags: ['Frontend', 'Marketing'],
        employeeImages: teamImages.slice(0, 3),
        createdDate: '2024-03-06',
      },
    ],
    completed: [
      {
        id: 'PRJ-177',
        title: 'Authentication System',
        priority: 'high',
        budget: '$15,000',
        tasksCompleted: 10,
        tasksTotal: 10,
        dueDate: '2024-03-25',
        comments: 25,
        attachments: 15,
        tags: ['Security', 'Backend'],
        employeeImages: teamImages.slice(0, 4),
        createdDate: '2024-02-01',
      },
      {
        id: 'PRJ-178',
        title: 'Payment Integration',
        priority: 'medium',
        budget: '$22,000',
        tasksCompleted: 8,
        tasksTotal: 8,
        dueDate: '2024-03-30',
        comments: 18,
        attachments: 11,
        tags: ['Payment', 'Integration'],
        employeeImages: teamImages.slice(0, 5),
        createdDate: '2024-02-15',
      },
    ],
  });

  const [stats, setStats] = useState({ totalTasks: 0, pendingTasks: 0, completedTasks: 0 });
  const [filter, setFilter] = useState({ search: '', priority: 'all', createdDate: '', dueDate: '', sortBy: 'default' });
  const [viewMode, setViewMode] = useState('kanban');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentColumn, setCurrentColumn] = useState('');
  const [newProject, setNewProject] = useState({
    title: '',
    priority: 'low',
    budget: '',
    tasksTotal: 0,
    tasksCompleted: 0,
    dueDate: '',
    comments: 0,
    attachments: 0,
    tags: [],
    employeeImages: [],
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    let total = 0;
    let pending = 0;
    let completed = 0;
    Object.values(tasks).forEach((column) => {
      column.forEach((task) => {
        total += task.tasksTotal;
        pending += task.tasksTotal - task.tasksCompleted;
        completed += task.tasksCompleted;
      });
    });
    setStats({ totalTasks: total, pendingTasks: pending, completedTasks: completed });
  }, [tasks]);

  const columns = [
    { id: 'new', title: 'New', color: 'bg-blue-50 border-t-4 border-blue-400', headerColor: 'text-blue-700' },
    { id: 'inprogress', title: 'In Progress', color: 'bg-yellow-50 border-t-4 border-yellow-400', headerColor: 'text-yellow-700' },
    { id: 'onhold', title: 'On Hold', color: 'bg-orange-50 border-t-4 border-orange-400', headerColor: 'text-orange-700' },
    { id: 'completed', title: 'Completed', color: 'bg-green-50 border-t-4 border-green-400', headerColor: 'text-green-700' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusTitle = (statusId) => {
    const column = columns.find((col) => col.id === statusId);
    return column ? column.title : statusId;
  };

  const filteredTasks = (columnId) => {
    let columnTasks = tasks[columnId] || [];
    if (filter.search) {
      columnTasks = columnTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
          task.id.toLowerCase().includes(filter.search.toLowerCase())
      );
    }
    if (filter.priority !== 'all') {
      columnTasks = columnTasks.filter((task) => task.priority === filter.priority);
    }
    if (filter.createdDate) {
      columnTasks = columnTasks.filter((task) => task.createdDate >= filter.createdDate);
    }
    if (filter.dueDate) {
      columnTasks = columnTasks.filter((task) => task.dueDate >= filter.dueDate);
    }
    let sortedTasks = [...columnTasks];
    if (filter.sortBy !== 'default') {
      if (filter.sortBy === 'Newest') {
        sortedTasks.sort((a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate));
      } else if (filter.sortBy === 'Oldest') {
        sortedTasks.sort((a, b) => Date.parse(a.createdDate) - Date.parse(b.createdDate));
      } else if (filter.sortBy === 'A-Z') {
        sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
      } else if (filter.sortBy === 'Z-A') {
        sortedTasks.sort((a, b) => b.title.localeCompare(a.title));
      }
    }
    return sortedTasks;
  };

  const getAllFilteredTasks = () => {
    let allTasks = [];
    Object.entries(tasks).forEach(([colId, colTasks]) => {
      colTasks.forEach((task) => allTasks.push({ ...task, status: colId }));
    });

    if (filter.search) {
      allTasks = allTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
          task.id.toLowerCase().includes(filter.search.toLowerCase())
      );
    }
    if (filter.priority !== 'all') {
      allTasks = allTasks.filter((task) => task.priority === filter.priority);
    }
    if (filter.createdDate) {
      allTasks = allTasks.filter((task) => task.createdDate >= filter.createdDate);
    }
    if (filter.dueDate) {
      allTasks = allTasks.filter((task) => task.dueDate >= filter.dueDate);
    }
    let sortedTasks = [...allTasks];
    if (filter.sortBy !== 'default') {
      if (filter.sortBy === 'Newest') {
        sortedTasks.sort((a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate));
      } else if (filter.sortBy === 'Oldest') {
        sortedTasks.sort((a, b) => Date.parse(a.createdDate) - Date.parse(b.createdDate));
      } else if (filter.sortBy === 'A-Z') {
        sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
      } else if (filter.sortBy === 'Z-A') {
        sortedTasks.sort((a, b) => b.title.localeCompare(a.title));
      }
    }
    return sortedTasks;
  };

  const validateForm = (project) => {
    const errors = {};
    if (!project.title.trim()) errors.title = 'Title is required';
    if (!project.budget || isNaN(parseFloat(project.budget.replace('$', '')))) errors.budget = 'Valid budget is required';
    if (project.tasksCompleted > project.tasksTotal) errors.tasksCompleted = 'Completed tasks cannot exceed total tasks';
    if (!project.dueDate) errors.dueDate = 'Due date is required';
    return errors;
  };

  const handleAddProject = () => {
    const errors = validateForm(newProject);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const projectId = `PRJ-${Date.now()}`;
    const createdDate = new Date().toISOString().slice(0, 10);
    const newTask = {
      ...newProject,
      id: projectId,
      employeeImages: newProject.employeeImages.length ? newProject.employeeImages : teamImages.slice(0, Math.floor(Math.random() * 5) + 1),
      createdDate,
      tags: newProject.tags || [],
      budget: `$${parseFloat(newProject.budget.replace('$', '')).toLocaleString()}`,
    };
    setTasks((prev) => ({ ...prev, new: [newTask, ...prev.new] }));
    setIsAddModalOpen(false);
    resetNewProject();
    setFormErrors({});
  };

  const handleAddTask = () => {
    const errors = validateForm(newProject);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const projectId = `PRJ-${Date.now()}`;
    const createdDate = new Date().toISOString().slice(0, 10);
    const newTask = {
      ...newProject,
      id: projectId,
      employeeImages: newProject.employeeImages.length ? newProject.employeeImages : teamImages.slice(0, Math.floor(Math.random() * 5) + 1),
      createdDate,
      tags: newProject.tags || [],
      budget: `$${parseFloat(newProject.budget.replace('$', '')).toLocaleString()}`,
    };
    setTasks((prev) => ({ ...prev, [currentColumn]: [newTask, ...prev[currentColumn]] }));
    setIsAddTaskModalOpen(false);
    resetNewProject();
    setCurrentColumn('');
    setFormErrors({});
  };

  const resetNewProject = () => {
    setNewProject({
      title: '',
      priority: 'low',
      budget: '',
      tasksTotal: 0,
      tasksCompleted: 0,
      dueDate: '',
      comments: 0,
      attachments: 0,
      tags: [],
      employeeImages: [],
    });
  };

  const handleEditProject = () => {
    const errors = validateForm(currentProject);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const updatedTasks = { ...tasks };
    const columnTasks = [...updatedTasks[currentColumn]];
    const index = columnTasks.findIndex((task) => task.id === currentProject.id);
    if (index !== -1) {
      columnTasks[index] = { ...currentProject, budget: `$${parseFloat(currentProject.budget.replace('$', '')).toLocaleString()}` };
      updatedTasks[currentColumn] = columnTasks;
      setTasks(updatedTasks);
    }
    setIsEditModalOpen(false);
    setCurrentProject(null);
    setCurrentColumn('');
    setFormErrors({});
  };

  const handleDeleteProject = () => {
    const updatedTasks = { ...tasks };
    updatedTasks[currentColumn] = updatedTasks[currentColumn].filter((task) => task.id !== currentProject.id);
    setTasks(updatedTasks);
    setIsDeleteModalOpen(false);
    setCurrentProject(null);
    setCurrentColumn('');
  };

  const openEditModal = (task, columnId) => {
    setCurrentProject({ ...task });
    setCurrentColumn(columnId);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (task, columnId) => {
    setCurrentProject(task);
    setCurrentColumn(columnId);
    setIsDeleteModalOpen(true);
  };

  const openAddTaskModal = (columnId) => {
    setCurrentColumn(columnId);
    setIsAddTaskModalOpen(true);
  };

  const TaskCard = ({ task, columnId }) => (
    <Card className="mb-4 hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 bg-white w-full max-w-[300px] sm:max-w-[350px] mx-auto">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-base mb-2">{task.title}</h4>
            <Badge 
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityColor(task.priority)} border capitalize`}
              variant="outline"
            >
              {task.priority}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 ml-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 w-9 p-0 hover:bg-blue-50"
              onClick={() => openEditModal(task, columnId)}
            >
              <Pencil className="w-4 h-4 text-blue-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 w-9 p-0 hover:bg-red-50"
              onClick={() => openDeleteModal(task, columnId)}
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 font-medium mb-4">ID: {task.id}</p>
        <div className="flex items-center gap-2 mb-4 bg-gray-50 rounded-lg p-2.5">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-gray-700">Budget</span>
          <span className="text-sm font-semibold text-green-600 ml-auto">{task.budget}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {task.tags.map((tag, idx) => (
            <Badge 
              key={idx} 
              variant="secondary" 
              className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 px-2.5 py-1"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mb-4 bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-medium text-gray-700">Tasks</span>
            <span className="text-sm font-semibold text-gray-900">{task.tasksCompleted}/{task.tasksTotal}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(task.tasksCompleted / task.tasksTotal) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4 bg-orange-50 rounded-lg p-2.5">
          <Clock className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-medium text-gray-700">Due on</span>
          <span className="text-sm font-semibold text-orange-600 ml-auto">
            {new Date(task.dueDate).toLocaleDateString('en-GB', { 
              day: '2-digit', 
              month: 'short', 
              year: 'numeric' 
            })}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex -space-x-2.5">
            {task.employeeImages.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img.employeeImage}
                alt="team member"
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
              />
            ))}
            {task.employeeImages.length > 4 && (
              <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600 border-2 border-white">
                +{task.employeeImages.length - 4}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 font-medium">{task.comments}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Paperclip className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 font-medium">{task.attachments}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen overflow-y-auto">
     

      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 max-w-[1400px] mx-auto">
        <div>
          <div className="flex items-center mb-3">
            <h1 className="text-2xl font-bold text-gray-900 mr-4">Projects</h1>
            <div className="flex -space-x-2.5">
              {teamImages.slice(0, 3).map((img, idx) => (
                <img 
                  key={idx}
                  src={img.employeeImage} 
                  alt="team" 
                  className="w-9 h-9 rounded-full border-2 border-white shadow-sm" 
                />
              ))}
              <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600 border-2 border-white">
                1+
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 text-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Total Task: <span className="font-semibold text-gray-900">{stats.totalTasks}</span></span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Pending: <span className="font-semibold text-gray-900">{stats.pendingTasks}</span></span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Completed: <span className="font-semibold text-gray-900">{stats.completedTasks}</span></span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant={viewMode === 'kanban' ? 'default' : 'outline'}
            onClick={() => setViewMode('kanban')}
            className="px-4 py-2"
          >
            Kanban View
          </Button>
          <Button 
            variant={viewMode === 'table' ? 'default' : 'outline'}
            onClick={() => setViewMode('table')}
            className="px-4 py-2"
          >
            Table View
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className={formErrors.title ? 'border-red-500' : ''}
                  />
                  {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                </div>
                <div>
                  <Label htmlFor="budget">Budget <span className="text-red-500">*</span></Label>
                  <Input
                    id="budget"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    placeholder="$0"
                    className={formErrors.budget ? 'border-red-500' : ''}
                  />
                  {formErrors.budget && <p className="text-red-500 text-xs mt-1">{formErrors.budget}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tasksTotal">Total Tasks</Label>
                    <Input
                      id="tasksTotal"
                      type="number"
                      value={newProject.tasksTotal}
                      onChange={(e) => setNewProject({ ...newProject, tasksTotal: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tasksCompleted">Completed Tasks</Label>
                    <Input
                      id="tasksCompleted"
                      type="number"
                      value={newProject.tasksCompleted}
                      onChange={(e) => setNewProject({ ...newProject, tasksCompleted: parseInt(e.target.value) || 0 })}
                      className={formErrors.tasksCompleted ? 'border-red-500' : ''}
                    />
                    {formErrors.tasksCompleted && <p className="text-red-500 text-xs mt-1">{formErrors.tasksCompleted}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date <span className="text-red-500">*</span></Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newProject.dueDate}
                    onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                    className={formErrors.dueDate ? 'border-red-500' : ''}
                  />
                  {formErrors.dueDate && <p className="text-red-500 text-xs mt-1">{formErrors.dueDate}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="comments">Comments</Label>
                    <Input
                      id="comments"
                      type="number"
                      value={newProject.comments}
                      onChange={(e) => setNewProject({ ...newProject, comments: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="attachments">Attachments</Label>
                    <Input
                      id="attachments"
                      type="number"
                      value={newProject.attachments}
                      onChange={(e) => setNewProject({ ...newProject, attachments: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={newProject.tags.join(', ')}
                    onChange={(e) => setNewProject({ ...newProject, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newProject.priority} onValueChange={(val) => setNewProject({ ...newProject, priority: val })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="team">Team Members</Label>
                  <Select
                    onValueChange={(val) => {
                      const selectedImages = newProject.employeeImages || [];
                      if (!selectedImages.includes(teamImages[val])) {
                        setNewProject({ ...newProject, employeeImages: [...selectedImages, teamImages[val]] });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team members" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamImages.map((img, idx) => (
                        <SelectItem key={idx} value={idx.toString()}>
                          Member {idx + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2 mt-2">
                    {(newProject.employeeImages || []).map((img, idx) => (
                      <div key={idx} className="relative">
                        <img src={img.employeeImage} alt="team member" className="w-8 h-8 rounded-full" />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 p-0"
                          onClick={() => {
                            const updatedImages = (newProject.employeeImages || []).filter((_, i) => i !== idx);
                            setNewProject({ ...newProject, employeeImages: updatedImages });
                          }}
                        >
                          x
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProject}>
                    Add Project
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center bg-white p-4 rounded-lg shadow-sm border max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search projects..."
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            className="border-0 focus-visible:ring-0 shadow-none"
          />
        </div>
        <div className="flex items-center gap-2 min-w-[120px]">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select value={filter.priority} onValueChange={(val) => setFilter({ ...filter, priority: val })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 min-w-[160px]">
          <Calendar className="w-4 h-4 text-gray-500" />
          <Input
            type="date"
            value={filter.createdDate}
            onChange={(e) => setFilter({ ...filter, createdDate: e.target.value })}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2 min-w-[160px]">
          <Calendar className="w-4 h-4 text-gray-500" />
          <Input
            type="date"
            value={filter.dueDate}
            onChange={(e) => setFilter({ ...filter, dueDate: e.target.value })}
            className="w-full"
          />
        </div>
        <Select value={filter.sortBy} onValueChange={(val) => setFilter({ ...filter, sortBy: val })}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="Newest">Newest</SelectItem>
            <SelectItem value="Oldest">Oldest</SelectItem>
            <SelectItem value="A-Z">A-Z</SelectItem>
            <SelectItem value="Z-A">Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1400px] mx-auto">
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col w-full min-w-[250px] max-w-[360px]">
              <div className={`${column.color} rounded-lg p-4 mb-4 shadow-sm`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-semibold text-lg ${column.headerColor}`}>
                    {column.title}
                  </h3>
                  <Badge variant="secondary" className="bg-white/80 text-gray-700 font-medium">
                    {filteredTasks(column.id).length}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  onClick={() => openAddTaskModal(column.id)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
              <div className="flex-1 space-y-4">
                {filteredTasks(column.id).map((task) => (
                  <TaskCard key={task.id} task={task} columnId={column.id} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-x-auto max-w-[1400px] mx-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="w-[100px]">Priority</TableHead>
                <TableHead className="w-[100px]">Budget</TableHead>
                <TableHead className="w-[150px]">Tasks Completed/Total</TableHead>
                <TableHead className="w-[120px]">Due Date</TableHead>
                <TableHead className="w-[100px]">Comments</TableHead>
                <TableHead className="w-[100px]">Attachments</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getAllFilteredTasks().map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell className="truncate max-w-[200px]">{task.title}</TableCell>
                  <TableCell>{getStatusTitle(task.status)}</TableCell>
                  <TableCell>
                    <Badge className={`capitalize ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.budget}</TableCell>
                  <TableCell>{task.tasksCompleted}/{task.tasksTotal}</TableCell>
                  <TableCell>
                    {new Date(task.dueDate).toLocaleDateString('en-GB', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </TableCell>
                  <TableCell>{task.comments}</TableCell>
                  <TableCell>{task.attachments}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => openEditModal(task, task.status)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => openDeleteModal(task, task.status)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isAddTaskModalOpen} onOpenChange={setIsAddTaskModalOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Task to {getStatusTitle(currentColumn)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-title">Title <span className="text-red-500">*</span></Label>
              <Input
                id="task-title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className={formErrors.title ? 'border-red-500' : ''}
              />
              {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
            </div>
            <div>
              <Label htmlFor="task-budget">Budget <span className="text-red-500">*</span></Label>
              <Input
                id="task-budget"
                value={newProject.budget}
                onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                placeholder="$0"
                className={formErrors.budget ? 'border-red-500' : ''}
              />
              {formErrors.budget && <p className="text-red-500 text-xs mt-1">{formErrors.budget}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="task-tasksTotal">Total Tasks</Label>
                <Input
                  id="task-tasksTotal"
                  type="number"
                  value={newProject.tasksTotal}
                  onChange={(e) => setNewProject({ ...newProject, tasksTotal: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="task-tasksCompleted">Completed Tasks</Label>
                <Input
                  id="task-tasksCompleted"
                  type="number"
                  value={newProject.tasksCompleted}
                  onChange={(e) => setNewProject({ ...newProject, tasksCompleted: parseInt(e.target.value) || 0 })}
                  className={formErrors.tasksCompleted ? 'border-red-500' : ''}
                />
                {formErrors.tasksCompleted && <p className="text-red-500 text-xs mt-1">{formErrors.tasksCompleted}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="task-dueDate">Due Date <span className="text-red-500">*</span></Label>
              <Input
                id="task-dueDate"
                type="date"
                value={newProject.dueDate}
                onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                className={formErrors.dueDate ? 'border-red-500' : ''}
              />
              {formErrors.dueDate && <p className="text-red-500 text-xs mt-1">{formErrors.dueDate}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="task-comments">Comments</Label>
                <Input
                  id="task-comments"
                  type="number"
                  value={newProject.comments}
                  onChange={(e) => setNewProject({ ...newProject, comments: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="task-attachments">Attachments</Label>
                <Input
                  id="task-attachments"
                  type="number"
                  value={newProject.attachments}
                  onChange={(e) => setNewProject({ ...newProject, attachments: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="task-tags">Tags (comma separated)</Label>
              <Input
                id="task-tags"
                value={newProject.tags.join(', ')}
                onChange={(e) => setNewProject({ ...newProject, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
              />
            </div>
            <div>
              <Label htmlFor="task-priority">Priority</Label>
              <Select value={newProject.priority} onValueChange={(val) => setNewProject({ ...newProject, priority: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="task-team">Team Members</Label>
              <Select
                onValueChange={(val) => {
                  const selectedImages = newProject.employeeImages || [];
                  if (!selectedImages.includes(teamImages[val])) {
                    setNewProject({ ...newProject, employeeImages: [...selectedImages, teamImages[val]] });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team members" />
                </SelectTrigger>
                <SelectContent>
                  {teamImages.map((img, idx) => (
                    <SelectItem key={idx} value={idx.toString()}>
                      Member {idx + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2 mt-2">
                {(newProject.employeeImages || []).map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img.employeeImage} alt="team member" className="w-8 h-8 rounded-full" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 p-0"
                      onClick={() => {
                        const updatedImages = (newProject.employeeImages || []).filter((_, i) => i !== idx);
                        setNewProject({ ...newProject, employeeImages: updatedImages });
                      }}
                    >
                      x
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsAddTaskModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTask}>
                Add Task
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {currentProject && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title <span className="text-red-500">*</span></Label>
                <Input
                  id="edit-title"
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                  className={formErrors.title ? 'border-red-500' : ''}
                />
                {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
              </div>
              <div>
                <Label htmlFor="edit-budget">Budget <span className="text-red-500">*</span></Label>
                <Input
                  id="edit-budget"
                  value={currentProject.budget}
                  onChange={(e) => setCurrentProject({ ...currentProject, budget: e.target.value })}
                  placeholder="$0"
                  className={formErrors.budget ? 'border-red-500' : ''}
                />
                {formErrors.budget && <p className="text-red-500 text-xs mt-1">{formErrors.budget}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-tasksTotal">Total Tasks</Label>
                  <Input
                    id="edit-tasksTotal"
                    type="number"
                    value={currentProject.tasksTotal}
                    onChange={(e) => setCurrentProject({ ...currentProject, tasksTotal: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-tasksCompleted">Completed Tasks</Label>
                  <Input
                    id="edit-tasksCompleted"
                    type="number"
                    value={currentProject.tasksCompleted}
                    onChange={(e) => setCurrentProject({ ...currentProject, tasksCompleted: parseInt(e.target.value) || 0 })}
                    className={formErrors.tasksCompleted ? 'border-red-500' : ''}
                  />
                  {formErrors.tasksCompleted && <p className="text-red-500 text-xs mt-1">{formErrors.tasksCompleted}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="edit-dueDate">Due Date <span className="text-red-500">*</span></Label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={currentProject.dueDate}
                  onChange={(e) => setCurrentProject({ ...currentProject, dueDate: e.target.value })}
                  className={formErrors.dueDate ? 'border-red-500' : ''}
                />
                {formErrors.dueDate && <p className="text-red-500 text-xs mt-1">{formErrors.dueDate}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-comments">Comments</Label>
                  <Input
                    id="edit-comments"
                    type="number"
                    value={currentProject.comments}
                    onChange={(e) => setCurrentProject({ ...currentProject, comments: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-attachments">Attachments</Label>
                  <Input
                    id="edit-attachments"
                    type="number"
                    value={currentProject.attachments}
                    onChange={(e) => setCurrentProject({ ...currentProject, attachments: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                <Input
                  id="edit-tags"
                  value={currentProject.tags.join(', ')}
                  onChange={(e) => setCurrentProject({ ...currentProject, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                />
              </div>
              <div>
                <Label htmlFor="edit-priority">Priority</Label>
                <Select
                  value={currentProject.priority}
                  onValueChange={(val) => setCurrentProject({ ...currentProject, priority: val })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-team">Team Members</Label>
                <Select
                  onValueChange={(val) => {
                    const selectedImages = currentProject.employeeImages || [];
                    if (!selectedImages.includes(teamImages[val])) {
                      setCurrentProject({ ...currentProject, employeeImages: [...selectedImages, teamImages[val]] });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team members" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamImages.map((img, idx) => (
                      <SelectItem key={idx} value={idx.toString()}>
                        Member {idx + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2 mt-2">
                  {(currentProject.employeeImages || []).map((img, idx) => (
                    <div key={idx} className="relative">
                      <img src={img.employeeImage} alt="team member" className="w-8 h-8 rounded-full" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 p-0"
                        onClick={() => {
                          const updatedImages = (currentProject.employeeImages || []).filter((_, i) => i !== idx);
                          setCurrentProject({ ...currentProject, employeeImages: updatedImages });
                        }}
                      >
                        x
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditProject}>
                  Update Project
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 mb-4">Are you sure you want to delete this project? This action cannot be undone.</p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProject}>
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Kanbanview;