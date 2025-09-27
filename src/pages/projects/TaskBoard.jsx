import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from  "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { CircleCheck as CheckCircle, Clock, CircleAlert as AlertCircle, Plus, ListFilter as Filter, Calendar, User, ChartBar as BarChart3, TrendingUp } from 'lucide-react'

const TaskBoard = () => {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Implement user dashboard",
      description: "Create a comprehensive dashboard for user analytics and metrics",
      status: "in-progress",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2024-01-20",
      estimatedHours: 24,
      actualHours: 16,
      progress: 65,
      tags: ["Frontend", "React", "Dashboard"]
    },
    {
      id: 2,
      title: "API integration testing",
      description: "Test all API endpoints and ensure proper error handling",
      status: "pending",
      priority: "medium",
      assignee: "Jane Smith",
      dueDate: "2024-01-25",
      estimatedHours: 16,
      actualHours: 0,
      progress: 0,
      tags: ["Backend", "Testing", "API"]
    },
    {
      id: 3,
      title: "Database optimization",
      description: "Optimize database queries and improve performance",
      status: "completed",
      priority: "high",
      assignee: "Mike Johnson",
      dueDate: "2024-01-15",
      estimatedHours: 20,
      actualHours: 18,
      progress: 100,
      tags: ["Database", "Performance", "Backend"]
    },
    {
      id: 4,
      title: "Mobile app testing",
      description: "Comprehensive testing on iOS and Android devices",
      status: "in-progress",
      priority: "medium",
      assignee: "Sarah Wilson",
      dueDate: "2024-01-18",
      estimatedHours: 12,
      actualHours: 8,
      progress: 75,
      tags: ["Mobile", "Testing", "QA"]
    },
    {
      id: 5,
      title: "Security audit",
      description: "Conduct security review and vulnerability assessment",
      status: "pending",
      priority: "high",
      assignee: "Tom Brown",
      dueDate: "2024-01-12",
      estimatedHours: 32,
      actualHours: 0,
      progress: 0,
      tags: ["Security", "Audit", "Backend"]
    },
    {
      id: 6,
      title: "UI/UX improvements",
      description: "Enhance user interface based on user feedback",
      status: "completed",
      priority: "low",
      assignee: "Lisa Davis",
      dueDate: "2024-01-10",
      estimatedHours: 14,
      actualHours: 16,
      progress: 100,
      tags: ["Frontend", "UI/UX", "Design"]
    }
  ])

  const statusOptions = [
    { id: 'all', name: 'All Tasks', icon: BarChart3 },
    { id: 'pending', name: 'Pending', icon: Clock },
    { id: 'in-progress', name: 'In Progress', icon: TrendingUp },
    { id: 'completed', name: 'Completed', icon: CheckCircle }
  ]

  const priorityOptions = [
    { id: 'all', name: 'All Priorities' },
    { id: 'high', name: 'High Priority' },
    { id: 'medium', name: 'Medium Priority' },
    { id: 'low', name: 'Low Priority' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const isOverdue = (dueDate, status) => {
    const today = new Date()
    const due = new Date(dueDate)
    return due < today && status !== 'completed'
  }

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority
    return matchesStatus && matchesPriority
  })

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => isOverdue(t.dueDate, t.status)).length
  }

  const TaskCard = ({ task }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{task.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
          </div>
          {isOverdue(task.dueDate, task.status) && (
            <AlertCircle className="w-5 h-5 text-red-500 ml-2" />
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {task.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{task.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span>{task.assignee}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className={isOverdue(task.dueDate, task.status) ? 'text-red-600' : ''}>
              {task.dueDate}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm mb-4">
          <div className="text-gray-600">
            <span>Est: {task.estimatedHours}h</span>
            <span className="mx-2">•</span>
            <span>Actual: {task.actualHours}h</span>
          </div>
          <div className={`text-sm ${
            task.actualHours > task.estimatedHours ? 'text-red-600' : 'text-green-600'
          }`}>
            {task.actualHours > task.estimatedHours ? '+' : ''}
            {task.actualHours - task.estimatedHours}h
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge className={getStatusColor(task.status)}>
              {task.status.replace('-', ' ')}
            </Badge>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Task Board</h1>
        <p className="text-gray-600">Track and manage your project tasks</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => {
            const Icon = status.icon
            return (
              <Button
                key={status.id}
                variant={selectedStatus === status.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus(status.id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {status.name}
              </Button>
            )
          })}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {priorityOptions.map((priority) => (
            <Button
              key={priority.id}
              variant={selectedPriority === priority.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPriority(priority.id)}
            >
              {priority.name}
            </Button>
          ))}
        </div>

        <Button className="ml-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No tasks found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default TaskBoard