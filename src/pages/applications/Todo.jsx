 import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckCircle, Clock, Tag, AlertCircle, Plus, Trash2, Edit, Search } from "lucide-react"

const initialTodos = [
  {
    id: 1,
    title: "Finalize project proposal",
    dueDate: "15 Jan 2025",
    category: "Projects",
    status: "Onhold",
  },
  {
    id: 2,
    title: "Submit to supervisor by EOD",
    dueDate: "25 May 2024",
    category: "Internal",
    status: "Inprogress",
  },
  {
    id: 3,
    title: "Prepare presentation slides",
    dueDate: "15 Jan 2025",
    category: "Reminder",
    status: "Pending",
    priority: "Medium",
    priorityCount: "05",
  },
  {
    id: 4,
    title: "Check and respond to emails",
    dueDate: "Tomorrow",
    category: "Reminder",
    status: "Completed",
  },
  {
    id: 5,
    title: "Coordinate with department head on progress",
    dueDate: "25 May 2024",
    category: "Internal",
    status: "Inprogress",
  },
  {
    id: 6,
    title: "Plan tasks for the next day",
    dueDate: "Today",
    category: "Social",
    status: "Pending",
  },
]

const statuses = ["All", "Completed", "Inprogress", "Pending", "Onhold"]
const categories = ["All", "Projects", "Internal", "Reminder", "Social"]
const priorities = ["", "Low", "Medium", "High"]

export default function Todo() {
  const [todos, setTodos] = useState(initialTodos)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newTodo, setNewTodo] = useState({
    title: "",
    dueDate: "",
    category: "",
    status: "",
    priority: "",
    priorityCount: "",
  })
  const [editingTodo, setEditingTodo] = useState(null)
  const [error, setError] = useState("")

  const getStatusStyles = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Inprogress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Onhold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const validateTodo = (todo) => {
    const requiredFields = [
      { field: todo.title, name: "Title" },
      { field: todo.dueDate, name: "Due Date" },
      { field: todo.category, name: "Category" },
      { field: todo.status, name: "Status" },
    ]
    for (const { field, name } of requiredFields) {
      if (!field) {
        return `Please fill in the ${name} field.`
      }
    }
    return ""
  }

  const handleAddTodo = () => {
    const validationError = validateTodo(newTodo)
    if (validationError) {
      setError(validationError)
      return
    }

    const todo = {
      id: Date.now(),
      ...newTodo,
    }
    setTodos([...todos, todo])
    setNewTodo({
      title: "",
      dueDate: "",
      category: "",
      status: "",
      priority: "",
      priorityCount: "",
    })
    setError("")
    setIsAddDialogOpen(false)
  }

  const handleEditTodo = () => {
    if (editingTodo) {
      const validationError = validateTodo(editingTodo)
      if (validationError) {
        setError(validationError)
        return
      }

      setTodos(todos.map((t) => (t.id === editingTodo.id ? editingTodo : t)))
      setEditingTodo(null)
      setError("")
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" || todo.status === selectedStatus
    const matchesCategory = selectedCategory === "All" || todo.category === selectedCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  const totalTasks = todos.length
  const pendingTasks = todos.filter((t) => t.status === "Pending").length
  const completedTasks = todos.filter((t) => t.status === "Completed").length

  return (
    <div className="min-h-screen  p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Todo</h1>
          <p className="text-sm text-gray-600">Manage your tasks and reminders</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Todo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Todo</DialogTitle>
              <DialogDescription>Enter the todo details to add it to your list.</DialogDescription>
            </DialogHeader>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <label htmlFor="title" className="sm:text-right font-medium">
                  Title *
                </label>
                <Input
                  id="title"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                  className="sm:col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <label htmlFor="dueDate" className="sm:text-right font-medium">
                  Due Date *
                </label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                  className="sm:col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <label htmlFor="category" className="sm:text-right font-medium">
                  Category *
                </label>
                <Select
                  value={newTodo.category}
                  onValueChange={(value) => setNewTodo({ ...newTodo, category: value })}
                >
                  <SelectTrigger className="sm:col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((c) => c !== "All")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <label htmlFor="status" className="sm:text-right font-medium">
                  Status *
                </label>
                <Select
                  value={newTodo.status}
                  onValueChange={(value) => setNewTodo({ ...newTodo, status: value })}
                >
                  <SelectTrigger className="sm:col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses
                      .filter((s) => s !== "All")
                      .map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <label htmlFor="priority" className="sm:text-right font-medium">
                  Priority
                </label>
                <Select
                  value={newTodo.priority}
                  onValueChange={(value) => setNewTodo({ ...newTodo, priority: value })}
                >
                  <SelectTrigger className="sm:col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority || "None"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <label htmlFor="priorityCount" className="sm:text-right font-medium">
                  Priority Count
                </label>
                <Input
                  id="priorityCount"
                  value={newTodo.priorityCount}
                  onChange={(e) => setNewTodo({ ...newTodo, priorityCount: e.target.value })}
                  className="sm:col-span-3"
                  placeholder="e.g., 05"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTodo} className="bg-blue-600 hover:bg-blue-700">
                Add Todo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Card */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
            Total Todo
            <Badge className="ml-2 bg-blue-600 hover:bg-blue-600">+1</Badge>
          </CardTitle>
          <CheckCircle className="h-6 w-6 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold text-gray-800">{totalTasks}</p>
              <p className="text-xs text-gray-500">Total Tasks</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{pendingTasks}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{completedTasks}</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Todo List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTodos.map((todo) => (
          <Card key={todo.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-800">{todo.title}</h3>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {todo.dueDate}
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-600">
                    <Tag className="h-4 w-4 mr-1" />
                    {todo.category}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {todo.priority && (
                    <div className="flex items-center text-sm">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-yellow-800">
                        {todo.priority} ({todo.priorityCount})
                      </span>
                    </div>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v.01M12 12v.01M12 18v.01"
                          />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        setEditingTodo({ ...todo })
                        setIsEditDialogOpen(true)
                      }}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="mt-3">
                <Badge className={getStatusStyles(todo.status)}>{todo.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>Update the todo details.</DialogDescription>
          </DialogHeader>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {editingTodo && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <label htmlFor="edit-title" className="sm:text-right font-medium">
                  Title *
                </label>
                <Input
                  id="edit-title"
                  value={editingTodo.title}
                  onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                  className="sm:col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <label htmlFor="edit-dueDate" className="sm:text-right font-medium">
                  Due Date *
                </label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={editingTodo.dueDate}
                  onChange={(e) => setEditingTodo({ ...editingTodo, dueDate: e.target.value })}
                  className="sm:col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <label htmlFor="edit-category" className="sm:text-right font-medium">
                  Category *
                </label>
                <Select
                  value={editingTodo.category}
                  onValueChange={(value) => setEditingTodo({ ...editingTodo, category: value })}
                >
                  <SelectTrigger className="sm:col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((c) => c !== "All")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <label htmlFor="edit-status" className="sm:text-right font-medium">
                  Status *
                </label>
                <Select
                  value={editingTodo.status}
                  onValueChange={(value) => setEditingTodo({ ...editingTodo, status: value })}
                >
                  <SelectTrigger className="sm:col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses
                      .filter((s) => s !== "All")
                      .map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <label htmlFor="edit-priority" className="sm:text-right font-medium">
                  Priority
                </label>
                <Select
                  value={editingTodo.priority}
                  onValueChange={(value) => setEditingTodo({ ...editingTodo, priority: value })}
                >
                  <SelectTrigger className="sm:col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority || "None"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <label htmlFor="edit-priorityCount" className="sm:text-right font-medium">
                  Priority Count
                </label>
                <Input
                  id="edit-priorityCount"
                  value={editingTodo.priorityCount}
                  onChange={(e) => setEditingTodo({ ...editingTodo, priorityCount: e.target.value })}
                  className="sm:col-span-3"
                  placeholder="e.g., 05"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleEditTodo} className="bg-blue-600 hover:bg-blue-700">
              Update Todo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
