 
import { useState } from "react"
import { Search, Plus, Filter, Calendar, User, Clock, CheckCircle, AlertCircle, Circle } from "lucide-react"

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const tasks = [
    {
      id: "TSK-001",
      title: "Update website homepage design",
      description: "Redesign the homepage layout with new branding guidelines",
      project: "Website Redesign",
      assignee: "John Smith",
      status: "in_progress",
      priority: "high",
      dueDate: "2024-01-20",
      progress: 75,
      tags: ["Design", "Frontend"],
    },
    {
      id: "TSK-002",
      title: "Implement user authentication",
      description: "Add login and registration functionality to the mobile app",
      project: "Mobile App Development",
      assignee: "Sarah Johnson",
      status: "todo",
      priority: "high",
      dueDate: "2024-01-25",
      progress: 0,
      tags: ["Backend", "Security"],
    },
    {
      id: "TSK-003",
      title: "Database optimization",
      description: "Optimize database queries for better performance",
      project: "CRM Integration",
      assignee: "Mike Wilson",
      status: "completed",
      priority: "medium",
      dueDate: "2024-01-15",
      progress: 100,
      tags: ["Database", "Performance"],
    },
    {
      id: "TSK-004",
      title: "Security vulnerability assessment",
      description: "Conduct comprehensive security audit of the system",
      project: "Security Audit",
      assignee: "Emily Davis",
      status: "on_hold",
      priority: "low",
      dueDate: "2024-02-01",
      progress: 30,
      tags: ["Security", "Testing"],
    },
    {
      id: "TSK-005",
      title: "API documentation update",
      description: "Update API documentation with latest endpoints",
      project: "Website Redesign",
      assignee: "Alex Brown",
      status: "in_progress",
      priority: "medium",
      dueDate: "2024-01-22",
      progress: 60,
      tags: ["Documentation", "API"],
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-orange-100 text-orange-800"
      case "todo":
        return "bg-gray-100 text-gray-800"
      case "on_hold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "in_progress":
        return <Clock className="w-5 h-5 text-orange-600" />
      case "on_hold":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Circle className="w-5 h-5 text-gray-600" />
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const completedTasks = filteredTasks.filter((task) => task.status === "completed").length
  const inProgressTasks = filteredTasks.filter((task) => task.status === "in_progress").length
  const overdueTasks = filteredTasks.filter((task) => {
    const dueDate = new Date(task.dueDate)
    const today = new Date()
    return dueDate < today && task.status !== "completed"
  }).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Manage and track project tasks</p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700">
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{filteredTasks.length}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-orange-600">{inProgressTasks}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{overdueTasks}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(task.status)}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {task.assignee}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Due: {task.dueDate}
                      </span>
                      <span>Project: {task.project}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}
                  >
                    {task.status.replace("_", " ").charAt(0).toUpperCase() + task.status.replace("_", " ").slice(1)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${task.progress}%` }}></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {task.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm text-orange-600 hover:bg-orange-50 rounded">Edit</button>
                  <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">Complete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks
