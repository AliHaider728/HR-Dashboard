 

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Search, Plus, Mail, Phone, MapPin, Calendar, Star, Download } from "lucide-react"

const CandidatesGrid = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [positionFilter, setPositionFilter] = useState("all")

  const candidates = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      position: "Software Developer",
      location: "New York, NY",
      experience: "5 years",
      status: "Interview Scheduled",
      appliedDate: "2024-01-15",
      rating: 4.5,
      skills: ["React", "Node.js", "Python"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 234-5678",
      position: "Marketing Manager",
      location: "Los Angeles, CA",
      experience: "7 years",
      status: "Under Review",
      appliedDate: "2024-01-20",
      rating: 4.2,
      skills: ["Digital Marketing", "SEO", "Analytics"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "+1 (555) 345-6789",
      position: "UX Designer",
      location: "San Francisco, CA",
      experience: "4 years",
      status: "Hired",
      appliedDate: "2024-01-10",
      rating: 4.8,
      skills: ["Figma", "Sketch", "Prototyping"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 456-7890",
      position: "Financial Analyst",
      location: "Chicago, IL",
      experience: "3 years",
      status: "Rejected",
      appliedDate: "2024-01-25",
      rating: 3.8,
      skills: ["Excel", "Financial Modeling", "SQL"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@email.com",
      phone: "+1 (555) 567-8901",
      position: "Sales Representative",
      location: "Miami, FL",
      experience: "6 years",
      status: "New Application",
      appliedDate: "2024-01-28",
      rating: 4.0,
      skills: ["CRM", "Lead Generation", "Negotiation"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "+1 (555) 678-9012",
      position: "HR Specialist",
      location: "Boston, MA",
      experience: "4 years",
      status: "Interview Scheduled",
      appliedDate: "2024-01-22",
      rating: 4.3,
      skills: ["Recruitment", "Employee Relations", "HRIS"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const stats = [
    { title: "Total Candidates", value: "1,234", change: "+18%", color: "text-blue-600" },
    { title: "New Applications", value: "89", change: "+12%", color: "text-green-600" },
    { title: "Interviews Scheduled", value: "45", change: "+8%", color: "text-orange-600" },
    { title: "Hired This Month", value: "23", change: "+15%", color: "text-purple-600" },
  ]

  const getStatusBadge = (status) => {
    const variants = {
      "New Application": "bg-blue-100 text-blue-800",
      "Under Review": "bg-yellow-100 text-yellow-800",
      "Interview Scheduled": "bg-orange-100 text-orange-800",
      Hired: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    }
    return variants[status] || "bg-gray-100 text-gray-800"
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || candidate.status.toLowerCase().includes(statusFilter.toLowerCase())
    const matchesPosition =
      positionFilter === "all" || candidate.position.toLowerCase().includes(positionFilter.toLowerCase())
    return matchesSearch && matchesStatus && matchesPosition
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600">Manage job applications and candidate profiles</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Candidate
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${stat.color}`}>{stat.change}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Candidate Profiles</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New Application</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="analyst">Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-medium text-orange-600">
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                          <p className="text-sm text-gray-600">{candidate.position}</p>
                        </div>
                      </div>
                      <Badge className={getStatusBadge(candidate.status)}>{candidate.status}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {candidate.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {candidate.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Applied: {candidate.appliedDate}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {renderStars(candidate.rating)}
                        <span className="text-sm text-gray-600 ml-2">{candidate.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">{candidate.experience}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CandidatesGrid
