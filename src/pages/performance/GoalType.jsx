 
import { useState } from "react"
import { Plus, Edit, Trash2, Target, Tag } from "lucide-react"

const GoalType = () => {
  const [showAddModal, setShowAddModal] = useState(false)

  const goalTypes = [
    {
      id: 1,
      name: "Professional Development",
      description: "Goals related to skill enhancement and career growth",
      color: "#3B82F6",
      totalGoals: 45,
      activeGoals: 32,
      completedGoals: 13,
      status: "Active",
      createdDate: "15 Jan 2024",
    },
    {
      id: 2,
      name: "Technical Skills",
      description: "Goals focused on technical competency and expertise",
      color: "#10B981",
      totalGoals: 38,
      activeGoals: 25,
      completedGoals: 13,
      status: "Active",
      createdDate: "20 Jan 2024",
    },
    {
      id: 3,
      name: "Leadership",
      description: "Goals aimed at developing leadership and management skills",
      color: "#F59E0B",
      totalGoals: 22,
      activeGoals: 15,
      completedGoals: 7,
      status: "Active",
      createdDate: "25 Jan 2024",
    },
    {
      id: 4,
      name: "Team Collaboration",
      description: "Goals to improve teamwork and communication",
      color: "#8B5CF6",
      totalGoals: 31,
      activeGoals: 20,
      completedGoals: 11,
      status: "Active",
      createdDate: "30 Jan 2024",
    },
    {
      id: 5,
      name: "Innovation",
      description: "Goals focused on creative thinking and innovation",
      color: "#EF4444",
      totalGoals: 18,
      activeGoals: 12,
      completedGoals: 6,
      status: "Active",
      createdDate: "05 Feb 2024",
    },
  ]

  const stats = [
    { label: "Total Goal Types", value: "12", icon: Tag, color: "blue" },
    { label: "Active Types", value: "10", icon: Target, color: "green" },
    { label: "Total Goals", value: "154", icon: Target, color: "purple" },
    { label: "Completion Rate", value: "68%", icon: Target, color: "orange" },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>Performance</span>
            <span className="mx-2">/</span>
            <span>Goal Type</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Goal Type</h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          <Plus className="w-4 h-4" />
          Add Goal Type
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          const colorClasses = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            purple: "bg-purple-50 text-purple-600",
            orange: "bg-orange-50 text-orange-600",
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

      {/* Goal Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {goalTypes.map((type) => (
          <div key={type.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: type.color }}></div>
                <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-orange-600 hover:text-orange-900">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{type.description}</p>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Goals</span>
                <span className="text-sm font-medium text-gray-900">{type.totalGoals}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Active Goals</span>
                <span className="text-sm font-medium text-blue-600">{type.activeGoals}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Completed Goals</span>
                <span className="text-sm font-medium text-green-600">{type.completedGoals}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Completion Rate</span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.round((type.completedGoals / type.totalGoals) * 100)}%
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    type.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {type.status}
                </span>
                <span className="text-xs text-gray-500">Created: {type.createdDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Goal Types Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">All Goal Types</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search goal types..."
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
                  Goal Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Goals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Goals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed Goals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Rate
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
              {goalTypes.map((type) => (
                <tr key={type.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                      <div className="text-sm font-medium text-gray-900">{type.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{type.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{type.totalGoals}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">{type.activeGoals}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    {type.completedGoals}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[60px]">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(type.completedGoals / type.totalGoals) * 100}%` }}
                        ></div>
                      </div>
                      <span>{Math.round((type.completedGoals / type.totalGoals) * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        type.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {type.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button className="text-orange-600 hover:text-orange-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing 1 - 5 of 5 entries</div>
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

export default GoalType
