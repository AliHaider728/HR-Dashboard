 

import { useState } from "react"
import { Plus, Target, TrendingUp, Calendar, CheckCircle } from "lucide-react"

const GoalTracking = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Q4 2024")

  const goalData = [
    {
      id: 1,
      employee: {
        name: "Anthony Lewis",
        department: "UI/UX Team",
        avatar: "/placeholder.svg?key=al3",
      },
      goalTitle: "Improve Design System",
      goalType: "Professional Development",
      targetDate: "31 Dec 2024",
      progress: 85,
      status: "In Progress",
      priority: "High",
      description: "Create comprehensive design system for all products",
    },
    {
      id: 2,
      employee: {
        name: "Brian Villalobos",
        department: "Development",
        avatar: "/placeholder.svg?key=bv3",
      },
      goalTitle: "Complete React Migration",
      goalType: "Technical",
      targetDate: "15 Jan 2025",
      progress: 60,
      status: "In Progress",
      priority: "High",
      description: "Migrate legacy components to React framework",
    },
    {
      id: 3,
      employee: {
        name: "Harvey Smith",
        department: "HR",
        avatar: "/placeholder.svg?key=hs3",
      },
      goalTitle: "Employee Satisfaction Survey",
      goalType: "Organizational",
      targetDate: "20 Dec 2024",
      progress: 100,
      status: "Completed",
      priority: "Medium",
      description: "Conduct quarterly employee satisfaction survey",
    },
  ]

  const stats = [
    { label: "Total Goals", value: "156", icon: Target, color: "blue" },
    { label: "Completed Goals", value: "89", icon: CheckCircle, color: "green" },
    { label: "In Progress", value: "52", icon: TrendingUp, color: "orange" },
    { label: "Overdue", value: "15", icon: Calendar, color: "red" },
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      case "Not Started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>Performance</span>
            <span className="mx-2">/</span>
            <span>Goal Tracking</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Goal Tracking</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          <Plus className="w-4 h-4" />
          Add Goal
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          const colorClasses = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            orange: "bg-orange-50 text-orange-600",
            red: "bg-red-50 text-red-600",
          }

          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option>Q4 2024</option>
              <option>Q3 2024</option>
              <option>Q2 2024</option>
              <option>Q1 2024</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option>All Departments</option>
              <option>Development</option>
              <option>Design</option>
              <option>HR</option>
              <option>Finance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Goal Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option>All Types</option>
              <option>Professional Development</option>
              <option>Technical</option>
              <option>Organizational</option>
              <option>Personal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option>All Status</option>
              <option>Completed</option>
              <option>In Progress</option>
              <option>Not Started</option>
              <option>Overdue</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option>All Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Goals Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Goal Tracking</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search goals..."
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-64"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Goal Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Goal Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {goalData.map((goal) => (
                <tr key={goal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={goal.employee.avatar || "/placeholder.svg"}
                        alt={goal.employee.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{goal.employee.name}</div>
                        <div className="text-sm text-gray-500">{goal.employee.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{goal.goalTitle}</div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">{goal.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{goal.goalType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{goal.targetDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[80px]">
                        <div
                          className={`h-2 rounded-full ${
                            goal.progress === 100
                              ? "bg-green-500"
                              : goal.progress >= 70
                                ? "bg-blue-500"
                                : goal.progress >= 40
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                          }`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{goal.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(goal.priority)}`}
                    >
                      {goal.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(goal.status)}`}
                    >
                      {goal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-orange-600 hover:text-orange-900">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing 1 - 3 of 3 entries</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">Previous</button>
            <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoalTracking
