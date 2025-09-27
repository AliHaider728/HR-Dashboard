 
import { useState } from "react"
import { Search, Plus, Calendar, Users, Clock, CheckCircle, AlertCircle, MoreHorizontal } from "lucide-react"

const Projects = () => {
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const projects = [
    {
      id: "PRJ-001",
      name: "Website Redesign",
      description: "Complete overhaul of company website with modern design",
      status: "in_progress",
      priority: "high",
      progress: 75,
      startDate: "2024-01-01",
      endDate: "2024-03-15",
      budget: 50000,
      spent: 37500,
      team: ["John Smith", "Sarah Johnson", "Mike Wilson"],
      tasks: { total: 24, completed: 18 },
    },
    {
      id: "PRJ-002",
      name: "Mobile App Development",
      description: "Native mobile application for iOS and Android",
      status: "planning",
      priority: "medium",
      progress: 15,
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      budget: 120000,
      spent: 18000,
      team: ["Emily Davis", "Alex Brown", "Lisa Chen"],
      tasks: { total: 45, completed: 7 },
    },
    {
      id: "PRJ-003",
      name: "CRM Integration",
      description: "Integrate new CRM system with existing tools",
      status: "completed",
      priority: "high",
      progress: 100,
      startDate: "2023-11-01",
      endDate: "2024-01-31",
      budget: 75000,
      spent: 72000,
      team: ["David Wilson", "Maria Garcia"],
      tasks: { total: 32, completed: 32 },
    },
    {
      id: "PRJ-004",
      name: "Security Audit",
      description: "Comprehensive security assessment and improvements",
      status: "on_hold",
      priority: "low",
      progress: 30,
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      budget: 25000,
      spent: 7500,
      team: ["Robert Taylor"],
      tasks: { total: 15, completed: 5 },
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-orange-100 text-orange-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
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

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage and track project progress</p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-orange-600">
                {projects.filter((p) => p.status === "in_progress").length}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {projects.filter((p) => p.status === "completed").length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On Hold</p>
              <p className="text-2xl font-bold text-red-600">{projects.filter((p) => p.status === "on_hold").length}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-orange-100 text-orange-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${viewMode === "list" ? "bg-orange-100 text-orange-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <div className="w-4 h-4 flex flex-col gap-0.5">
                <div className="bg-current h-0.5 rounded"></div>
                <div className="bg-current h-0.5 rounded"></div>
                <div className="bg-current h-0.5 rounded"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-2 mb-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}
                  >
                    {project.status.replace("_", " ").charAt(0).toUpperCase() +
                      project.status.replace("_", " ").slice(1)}
                  </span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(project.priority)}`}
                  >
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Budget:</span>
                    <span>${project.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spent:</span>
                    <span>${project.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tasks:</span>
                    <span>
                      {project.tasks.completed}/{project.tasks.total}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{project.team.length} members</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{project.endDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-500">{project.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}
                      >
                        {project.status.replace("_", " ").charAt(0).toUpperCase() +
                          project.status.replace("_", " ").slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                          <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-900">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${project.budget.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">Spent: ${project.spent.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{project.team.length} members</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {project.endDate}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects
