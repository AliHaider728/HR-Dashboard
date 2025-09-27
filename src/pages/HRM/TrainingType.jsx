 

import { useState } from "react"
import { Plus, Edit, Trash2, BookOpen, Users, Clock } from "lucide-react"

const TrainingType = () => {
  const [showAddModal, setShowAddModal] = useState(false)

  const trainingTypes = [
    {
      id: 1,
      name: "Technical Training",
      description: "Training programs focused on technical skills and software development",
      color: "#3B82F6",
      totalTrainings: 28,
      activeTrainings: 8,
      totalParticipants: 450,
      avgDuration: "40 Hours",
      status: "Active",
      createdDate: "15 Jan 2024",
    },
    {
      id: 2,
      name: "Soft Skills",
      description: "Training programs for communication, leadership, and interpersonal skills",
      color: "#8B5CF6",
      totalTrainings: 22,
      activeTrainings: 6,
      totalParticipants: 320,
      avgDuration: "24 Hours",
      status: "Active",
      createdDate: "20 Jan 2024",
    },
    {
      id: 3,
      name: "Marketing",
      description: "Digital marketing, SEO, social media, and content marketing training",
      color: "#F59E0B",
      totalTrainings: 18,
      activeTrainings: 4,
      totalParticipants: 280,
      avgDuration: "32 Hours",
      status: "Active",
      createdDate: "25 Jan 2024",
    },
    {
      id: 4,
      name: "Management",
      description: "Leadership, project management, and organizational development training",
      color: "#10B981",
      totalTrainings: 25,
      activeTrainings: 7,
      totalParticipants: 380,
      avgDuration: "48 Hours",
      status: "Active",
      createdDate: "30 Jan 2024",
    },
    {
      id: 5,
      name: "Compliance",
      description: "Regulatory compliance, safety training, and policy awareness programs",
      color: "#EF4444",
      totalTrainings: 15,
      activeTrainings: 3,
      totalParticipants: 200,
      avgDuration: "16 Hours",
      status: "Active",
      createdDate: "05 Feb 2024",
    },
    {
      id: 6,
      name: "Sales Training",
      description: "Sales techniques, customer relationship management, and negotiation skills",
      color: "#06B6D4",
      totalTrainings: 12,
      activeTrainings: 2,
      totalParticipants: 150,
      avgDuration: "28 Hours",
      status: "Active",
      createdDate: "10 Feb 2024",
    },
  ]

  const stats = [
    { label: "Total Training Types", value: "12", icon: BookOpen, color: "blue" },
    { label: "Active Types", value: "10", icon: BookOpen, color: "green" },
    { label: "Total Trainings", value: "120", icon: Users, color: "purple" },
    { label: "Total Participants", value: "1,780", icon: Clock, color: "orange" },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>Training</span>
            <span className="mx-2">/</span>
            <span>Training Type</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Training Type</h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          <Plus className="w-4 h-4" />
          Add Training Type
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

      {/* Training Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {trainingTypes.map((type) => (
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
                <span className="text-sm text-gray-500">Total Trainings</span>
                <span className="text-sm font-medium text-gray-900">{type.totalTrainings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Active Trainings</span>
                <span className="text-sm font-medium text-blue-600">{type.activeTrainings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Participants</span>
                <span className="text-sm font-medium text-green-600">{type.totalParticipants}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Avg Duration</span>
                <span className="text-sm font-medium text-gray-900">{type.avgDuration}</span>
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

      {/* Training Types Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">All Training Types</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search training types..."
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
                  Training Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Trainings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Trainings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Duration
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
              {trainingTypes.map((type) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{type.totalTrainings}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                    {type.activeTrainings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    {type.totalParticipants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{type.avgDuration}</td>
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
          <div className="text-sm text-gray-500">Showing 1 - 6 of 6 entries</div>
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

export default TrainingType
