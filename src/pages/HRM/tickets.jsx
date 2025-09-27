 
import { useState } from "react"
import { Plus, MessageSquare, CheckCircle, Clock, AlertTriangle, MoreVertical } from "lucide-react"

const Tickets = () => {
  const [selectedPriority, setSelectedPriority] = useState("Priority")
  const [selectedStatus, setSelectedStatus] = useState("Select Status")
  const [sortBy, setSortBy] = useState("Last 7 Days")

  const ticketStats = [
    {
      label: "New Tickets",
      count: 120,
      percentage: "+19.01%",
      color: "orange",
      icon: MessageSquare,
      chartData: [40, 45, 35, 50, 49, 60, 70, 91, 125, 85, 100, 120],
    },
    {
      label: "Open Tickets",
      count: 60,
      percentage: "+19.01%",
      color: "purple",
      icon: AlertTriangle,
      chartData: [30, 40, 35, 50, 49, 60, 70, 81, 95, 75, 80, 60],
    },
    {
      label: "Solved Tickets",
      count: 50,
      percentage: "+19.01%",
      color: "green",
      icon: CheckCircle,
      chartData: [20, 25, 30, 35, 40, 45, 50, 55, 60, 45, 50, 50],
    },
    {
      label: "Pending Tickets",
      count: 10,
      percentage: "+19.01%",
      color: "blue",
      icon: Clock,
      chartData: [5, 8, 12, 15, 18, 20, 15, 12, 10, 8, 12, 10],
    },
  ]

  const ticketData = [
    {
      id: "TIC-001",
      category: "IT Support",
      title: "Laptop Issue",
      priority: "High",
      status: "Open",
      assignedTo: {
        name: "Edgar Hansel",
        avatar: "/placeholder.svg?key=eh1",
      },
      updatedTime: "10 hours ago",
      comments: 9,
    },
    {
      id: "TIC-002",
      category: "IT Support",
      title: "Payment Issue",
      priority: "On Hold",
      status: "Low",
      assignedTo: {
        name: "Ann Lynch",
        avatar: "/placeholder.svg?key=al4",
      },
      updatedTime: "15 hours ago",
      comments: 9,
    },
    {
      id: "TIC-003",
      category: "IT Support",
      title: "Bug Report",
      priority: "Reopened",
      status: "Medium",
      assignedTo: {
        name: "Juan Hermann",
        avatar: "/placeholder.svg?key=jh1",
      },
      updatedTime: "20 hours ago",
      comments: 9,
    },
    {
      id: "TIC-004",
      category: "IT Support",
      title: "Access Denied",
      priority: "Open",
      status: "Low",
      assignedTo: {
        name: "Jessie Otero",
        avatar: "/placeholder.svg?key=jo1",
      },
      updatedTime: "23 hours ago",
      comments: 9,
    },
  ]

  const ticketCategories = [
    { name: "Internet Issue", count: 0 },
    { name: "Computer", count: 1 },
    { name: "Redistribute", count: 0 },
    { name: "Payment", count: 2 },
    { name: "Complaint", count: 1 },
  ]

  const supportAgents = [
    { name: "Edgar Hansel", count: 0, avatar: "/placeholder.svg?key=eh2" },
    { name: "Ann Lynch", count: 1, avatar: "/placeholder.svg?key=al5" },
    { name: "Juan Hermann", count: 0, avatar: "/placeholder.svg?key=jh2" },
    { name: "Jessie Otero", count: 2, avatar: "/placeholder.svg?key=jo2" },
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      case "Low":
        return "bg-green-100 text-green-800"
      case "On Hold":
        return "bg-yellow-100 text-yellow-800"
      case "Reopened":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800"
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderMiniChart = (data, color) => {
    const max = Math.max(...data)
    const height = 40

    return (
      <div className="flex items-end gap-1 h-10">
        {data.map((value, index) => (
          <div
            key={index}
            className={`w-2 rounded-t ${
              color === "orange"
                ? "bg-orange-400"
                : color === "purple"
                  ? "bg-purple-400"
                  : color === "green"
                    ? "bg-green-400"
                    : "bg-blue-400"
            }`}
            style={{ height: `${(value / max) * height}px` }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>Employee</span>
            <span className="mx-2">/</span>
            <span>Tickets</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Tickets</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <span>88</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus className="w-4 h-4" />
            Add Ticket
          </button>
        </div>
      </div>

      {/* Ticket Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {ticketStats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${
                    stat.color === "orange"
                      ? "bg-orange-50"
                      : stat.color === "purple"
                        ? "bg-purple-50"
                        : stat.color === "green"
                          ? "bg-green-50"
                          : "bg-blue-50"
                  }`}
                >
                  <IconComponent
                    className={`w-6 h-6 ${
                      stat.color === "orange"
                        ? "text-orange-600"
                        : stat.color === "purple"
                          ? "text-purple-600"
                          : stat.color === "green"
                            ? "text-green-600"
                            : "text-blue-600"
                    }`}
                  />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.percentage}</span>
              </div>
              <div className="mb-4">
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
              <div className="flex justify-center">{renderMiniChart(stat.chartData, stat.color)}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Ticket List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Ticket List</h3>
                <div className="flex items-center gap-4">
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option>Priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option>Select Status</option>
                    <option>Open</option>
                    <option>Closed</option>
                    <option>In Progress</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option>Sort By : Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Month</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {ticketData.map((ticket) => (
                <div key={ticket.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                          {ticket.category}
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getPriorityColor(ticket.priority)}`}
                        >
                          {ticket.priority}
                        </span>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">{ticket.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <img
                            src={ticket.assignedTo.avatar || "/placeholder.svg"}
                            alt={ticket.assignedTo.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>Assigned to {ticket.assignedTo.name}</span>
                        </div>
                        <span>Updated {ticket.updatedTime}</span>
                        <span>{ticket.comments} Comments</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getStatusColor(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t bg-gray-50 flex items-center justify-center">
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Load More
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Categories */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Categories</h3>
            <div className="space-y-3">
              {ticketCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{category.name}</span>
                  <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-gray-900 bg-gray-100 rounded-full">
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Support Agents */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Agents</h3>
            <div className="space-y-3">
              {supportAgents.map((agent, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={agent.avatar || "/placeholder.svg"} alt={agent.name} className="w-8 h-8 rounded-full" />
                    <span className="text-sm text-gray-900">{agent.name}</span>
                  </div>
                  <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-gray-900 bg-gray-100 rounded-full">
                    {agent.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tickets
