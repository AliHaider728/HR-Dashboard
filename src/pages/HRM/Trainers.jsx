 

import { useState } from "react"
import { Plus, Star, Users, BookOpen, Award, Edit, Trash2, Mail, Phone } from "lucide-react"

const Trainers = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations")
  const [selectedStatus, setSelectedStatus] = useState("All Status")

  const trainerData = [
    {
      id: 1,
      name: "Douglas Martini",
      email: "douglas.martini@company.com",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder.svg?key=dm7",
      specialization: "Technical Training",
      experience: "8 Years",
      rating: 4.9,
      totalTrainings: 45,
      activeTrainings: 3,
      totalStudents: 1250,
      status: "Active",
      joinDate: "15 Jan 2020",
      certifications: ["PMP", "Scrum Master", "AWS Certified"],
      bio: "Experienced technical trainer with expertise in software development, cloud technologies, and project management.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 234-5678",
      avatar: "/placeholder.svg?key=sj2",
      specialization: "Soft Skills",
      experience: "6 Years",
      rating: 4.7,
      totalTrainings: 32,
      activeTrainings: 2,
      totalStudents: 890,
      status: "Active",
      joinDate: "20 Mar 2021",
      certifications: ["Certified Coach", "Leadership Development"],
      bio: "Leadership and communication expert focused on developing interpersonal skills and team dynamics.",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
      phone: "+1 (555) 345-6789",
      avatar: "/placeholder.svg?key=mw2",
      specialization: "Marketing",
      experience: "5 Years",
      rating: 4.6,
      totalTrainings: 28,
      activeTrainings: 1,
      totalStudents: 675,
      status: "Active",
      joinDate: "10 Jul 2022",
      certifications: ["Google Ads Certified", "HubSpot Certified"],
      bio: "Digital marketing specialist with extensive experience in SEO, social media, and content marketing strategies.",
    },
    {
      id: 4,
      name: "Jennifer Davis",
      email: "jennifer.davis@company.com",
      phone: "+1 (555) 456-7890",
      avatar: "/placeholder.svg?key=jd2",
      specialization: "Management",
      experience: "10 Years",
      rating: 4.8,
      totalTrainings: 38,
      activeTrainings: 2,
      totalStudents: 980,
      status: "Active",
      joinDate: "05 Sep 2019",
      certifications: ["MBA", "Six Sigma Black Belt", "Change Management"],
      bio: "Senior management consultant specializing in organizational development and strategic planning.",
    },
  ]

  const stats = [
    { label: "Total Trainers", value: "24", icon: Users, color: "blue" },
    { label: "Active Trainers", value: "18", icon: Award, color: "green" },
    { label: "Total Trainings", value: "143", icon: BookOpen, color: "purple" },
    { label: "Average Rating", value: "4.7", icon: Star, color: "orange" },
  ]

  const getSpecializationColor = (specialization) => {
    switch (specialization) {
      case "Technical Training":
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
            <span>Trainers</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Trainers</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          <Plus className="w-4 h-4" />
          Add Trainer
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option>All Specializations</option>
              <option>Technical Training</option>
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
              <option>Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option>All Experience</option>
              <option>0-2 Years</option>
              <option>3-5 Years</option>
              <option>6-10 Years</option>
              <option>10+ Years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option>All Ratings</option>
              <option>4.5+ Stars</option>
              <option>4.0+ Stars</option>
              <option>3.5+ Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trainer Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {trainerData.map((trainer) => (
          <div key={trainer.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <img src={trainer.avatar || "/placeholder.svg"} alt={trainer.name} className="w-16 h-16 rounded-full" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{trainer.name}</h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getSpecializationColor(trainer.specialization)}`}
                  >
                    {trainer.specialization}
                  </span>
                  <div className="flex items-center gap-1 mt-2">
                    {renderStars(trainer.rating)}
                    <span className="text-sm text-gray-600 ml-1">{trainer.rating}</span>
                  </div>
                </div>
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

            <p className="text-sm text-gray-600 mb-4">{trainer.bio}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Experience</p>
                <p className="text-sm font-medium text-gray-900">{trainer.experience}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Trainings</p>
                <p className="text-sm font-medium text-gray-900">{trainer.totalTrainings}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Active Trainings</p>
                <p className="text-sm font-medium text-blue-600">{trainer.activeTrainings}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Students</p>
                <p className="text-sm font-medium text-gray-900">{trainer.totalStudents}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Certifications</p>
              <div className="flex flex-wrap gap-1">
                {trainer.certifications.map((cert, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{trainer.email}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{trainer.phone}</span>
                </div>
              </div>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                  trainer.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {trainer.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Trainers Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">All Trainers</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search trainers..."
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
                  Trainer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trainings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
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
              {trainerData.map((trainer) => (
                <tr key={trainer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={trainer.avatar || "/placeholder.svg"}
                        alt={trainer.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
                        <div className="text-sm text-gray-500">{trainer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getSpecializationColor(trainer.specialization)}`}
                    >
                      {trainer.specialization}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trainer.experience}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {renderStars(trainer.rating)}
                      <span className="text-sm text-gray-600 ml-1">{trainer.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{trainer.totalTrainings} Total</div>
                      <div className="text-blue-600">{trainer.activeTrainings} Active</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trainer.totalStudents}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                        trainer.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {trainer.status}
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

export default Trainers
