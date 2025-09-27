 
import { useState } from "react"
import { Plus, Calendar, Users, BookOpen, Clock, Star, Edit, Trash2 } from "lucide-react"

const Training = () => {
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedType, setSelectedType] = useState("All Types")

  const trainingData = [
    {
      id: 1,
      title: "React Development Fundamentals",
      type: "Technical",
      trainer: {
        name: "Douglas Martini",
        avatar: "/placeholder.svg?key=dm6",
      },
      startDate: "15 Oct 2024",
      endDate: "25 Oct 2024",
      duration: "40 Hours",
      participants: 25,
      maxParticipants: 30,
      status: "Active",
      description: "Comprehensive training on React development including hooks, state management, and best practices.",
      cost: "$1,200",
      location: "Conference Room A",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Leadership Skills Workshop",
      type: "Soft Skills",
      trainer: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?key=sj1",
      },
      startDate: "20 Oct 2024",
      endDate: "22 Oct 2024",
      duration: "24 Hours",
      participants: 15,
      maxParticipants: 20,
      status: "Upcoming",
      description: "Develop essential leadership skills including team management, communication, and decision making.",
      cost: "$800",
      location: "Training Center",
      rating: 4.6,
    },
    {
      id: 3,
      title: "Digital Marketing Strategies",
      type: "Marketing",
      trainer: {
        name: "Mike Wilson",
        avatar: "/placeholder.svg?key=mw1",
      },
      startDate: "05 Oct 2024",
      endDate: "12 Oct 2024",
      duration: "32 Hours",
      participants: 20,
      maxParticipants: 25,
      status: "Completed",
      description: "Learn modern digital marketing techniques including SEO, social media, and content marketing.",
      cost: "$950",
      location: "Online",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Project Management Certification",
      type: "Management",
      trainer: {
        name: "Jennifer Davis",
        avatar: "/placeholder.svg?key=jd1",
      },
      startDate: "01 Nov 2024",
      endDate: "15 Nov 2024",
      duration: "60 Hours",
      participants: 12,
      maxParticipants: 15,
      status: "Upcoming",
      description: "Comprehensive project management training leading to PMP certification preparation.",
      cost: "$1,500",
      location: "Conference Room B",
      rating: 4.9,
    },
  ]

  const stats = [
    { label: "Total Trainings", value: "48", icon: BookOpen, color: "blue" },
    { label: "Active Trainings", value: "12", icon: Calendar, color: "green" },
    { label: "Total Participants", value: "324", icon: Users, color: "purple" },
    { label: "Completed Trainings", value: "36", icon: Clock, color: "orange" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Upcoming":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "Technical":
        return "bg-blue-100 text-blue-800"
      case "Soft Skills":
        return "bg-purple-100 text-purple-800"
      case "Marketing":
        return "bg-orange-100 text-orange-800"
      case "Management":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />)
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>Training</span>
            <span className="mx-2">/</span>
            <span>Training</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Training</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          <Plus className="w-4 h-4" />
          Add Training
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

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Training Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option>All Types</option>
              <option>Technical</option>
              <option>Soft Skills</option>
              <option>Marketing</option>
              <option>Management</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Upcoming</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trainer</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option>All Trainers</option>
              <option>Douglas Martini</option>
              <option>Sarah Johnson</option>
              <option>Mike Wilson</option>
              <option>Jennifer Davis</option>
            </select>
          </div>
        </div>
      </div>

      {/* Training Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {trainingData.map((training) => (
          <div key={training.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getTypeColor(training.type)}`}
                  >
                    {training.type}
                  </span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getStatusColor(training.status)}`}
                  >
                    {training.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{training.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{training.description}</p>
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

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Trainer</p>
                <div className="flex items-center gap-2">
                  <img
                    src={training.trainer.avatar || "/placeholder.svg"}
                    alt={training.trainer.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-900">{training.trainer.name}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Duration</p>
                <p className="text-sm font-medium text-gray-900">{training.duration}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Start Date</p>
                <p className="text-sm font-medium text-gray-900">{training.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">End Date</p>
                <p className="text-sm font-medium text-gray-900">{training.endDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <p className="text-sm font-medium text-gray-900">{training.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Cost</p>
                <p className="text-sm font-medium text-gray-900">{training.cost}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {training.participants}/{training.maxParticipants} participants
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(training.rating)}
                  <span className="text-sm text-gray-600 ml-1">{training.rating}</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Training Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">All Training Programs</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search trainings..."
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
                  Training
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trainer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trainingData.map((training) => (
                <tr key={training.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{training.title}</div>
                      <div className="text-sm text-gray-500">
                        {training.startDate} - {training.endDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getTypeColor(training.type)}`}
                    >
                      {training.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <img
                        src={training.trainer.avatar || "/placeholder.svg"}
                        alt={training.trainer.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-900">{training.trainer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{training.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {training.participants}/{training.maxParticipants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getStatusColor(training.status)}`}
                    >
                      {training.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {renderStars(training.rating)}
                      <span className="text-sm text-gray-600 ml-1">{training.rating}</span>
                    </div>
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
          <div className="text-sm text-gray-500">Showing 1 - 4 of 4 entries</div>
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

export default Training
