 

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Search, Plus, MapPin, Clock, DollarSign, Users, Briefcase, CheckCircle } from "lucide-react"

// Ensure the following dependencies are installed:
// npm install lucide-react
// Ensure UI components (Card, Button, etc.) are set up (e.g., via ShadCN/UI)
// Update import paths if your UI components are in a different directory

const JobGrid = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("postedDate desc")
  const [selectedJob, setSelectedJob] = useState(null)
  const [isNewJobOpen, setIsNewJobOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newJob, setNewJob] = useState({
    title: "",
    department: "IT",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
    experience: "",
    totalPositions: 0,
  })

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Software Developer",
      department: "IT",
      location: "New York, NY",
      type: "Full-time",
      salary: "$80,000 - $120,000",
      applicants: 45,
      postedDate: "2024-01-15",
      status: "Active",
      description: "We are looking for an experienced software developer to join our team...",
      languages: ["js", "react", "nodejs"],
      experience: "3+ years",
      filled: 5,
      totalPositions: 10,
    },
    {
      id: 2,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$70,000 - $90,000",
      applicants: 32,
      postedDate: "2024-01-20",
      status: "Active",
      description: "Lead our marketing initiatives and drive brand awareness...",
      languages: [],
      experience: "5+ years",
      filled: 3,
      totalPositions: 8,
    },
    {
      id: 3,
      title: "HR Specialist",
      department: "Human Resources",
      location: "Chicago, IL",
      type: "Part-time",
      salary: "$45,000 - $55,000",
      applicants: 28,
      postedDate: "2024-01-10",
      status: "Closed",
      description: "Support HR operations and employee relations...",
      languages: [],
      experience: "2 years",
      filled: 10,
      totalPositions: 10,
    },
    {
      id: 4,
      title: "Financial Analyst",
      department: "Finance",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$60,000 - $80,000",
      applicants: 19,
      postedDate: "2024-01-25",
      status: "Active",
      description: "Analyze financial data and prepare reports...",
      languages: [],
      experience: "3 years",
      filled: 2,
      totalPositions: 5,
    },
    {
      id: 5,
      title: "UX Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Contract",
      salary: "$65,000 - $85,000",
      applicants: 67,
      postedDate: "2024-01-18",
      status: "Active",
      description: "Create intuitive user experiences for our products...",
      languages: ["figma", "css", "html"],
      experience: "2+ years",
      filled: 15,
      totalPositions: 20,
    },
    {
      id: 6,
      title: "Sales Representative",
      department: "Sales",
      location: "Miami, FL",
      type: "Full-time",
      salary: "$50,000 - $70,000",
      applicants: 41,
      postedDate: "2024-01-12",
      status: "Active",
      description: "Drive sales growth and build client relationships...",
      languages: [],
      experience: "1 year",
      filled: 4,
      totalPositions: 10,
    },
  ])

  const stats = [
    { title: "Total Jobs", value: jobs.length, change: "+12%", color: "text-blue-600" },
    { title: "Active Jobs", value: jobs.filter((j) => j.status === "Active").length, change: "+8%", color: "text-green-600" },
    { title: "Applications", value: jobs.reduce((sum, j) => sum + j.applicants, 0), change: "+25%", color: "text-orange-600" },
    { title: "Hired This Month", value: "23", change: "+15%", color: "text-purple-600" },
  ]

  const getStatusBadge = (status) => {
    const variants = {
      Active: "bg-green-100 text-green-800",
      Closed: "bg-red-100 text-red-800",
      Draft: "bg-gray-100 text-gray-800",
    }
    return variants[status] || "bg-gray-100 text-gray-800"
  }

  const getTypeBadge = (type) => {
    const variants = {
      "Full-time": "bg-blue-100 text-blue-800",
      "Part-time": "bg-orange-100 text-orange-800",
      Contract: "bg-purple-100 text-purple-800",
    }
    return variants[type] || "bg-gray-100 text-gray-800"
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment =
      departmentFilter === "all" || job.department.toLowerCase() === departmentFilter.toLowerCase()
    const matchesType = typeFilter === "all" || job.type.toLowerCase() === typeFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesDepartment && matchesType && matchesStatus
  })

  let sortedJobs = [...filteredJobs]
  if (sortBy === "postedDate desc") {
    sortedJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
  } else if (sortBy === "postedDate asc") {
    sortedJobs.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate))
  } else if (sortBy === "applicants desc") {
    sortedJobs.sort((a, b) => b.applicants - a.applicants)
  } else if (sortBy === "applicants asc") {
    sortedJobs.sort((a, b) => a.applicants - b.applicants)
  }

  const handleNewJobChange = (field, value) => {
    setNewJob({ ...newJob, [field]: value })
  }

  const handleAddNewJob = (e) => {
    e.preventDefault()
    const today = new Date().toISOString().slice(0, 10)
    setJobs([
      ...jobs,
      {
        ...newJob,
        id: jobs.length + 1,
        applicants: 0,
        postedDate: today,
        status: "Active",
        languages: [],
        filled: 0,
      },
    ])
    setIsNewJobOpen(false)
    setNewJob({
      title: "",
      department: "IT",
      location: "",
      type: "Full-time",
      salary: "",
      description: "",
      experience: "",
      totalPositions: 0,
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Openings</h1>
          <p className="text-gray-600">Manage job postings and recruitment</p>
        </div>
        <Dialog open={isNewJobOpen} onOpenChange={setIsNewJobOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Job</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddNewJob} className="space-y-4">
              <Input
                placeholder="Job Title"
                value={newJob.title}
                onChange={(e) => handleNewJobChange("title", e.target.value)}
                required
              />
              <Select value={newJob.department} onValueChange={(v) => handleNewJobChange("department", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Location (e.g., New York, NY)"
                value={newJob.location}
                onChange={(e) => handleNewJobChange("location", e.target.value)}
                required
              />
              <Select value={newJob.type} onValueChange={(v) => handleNewJobChange("type", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Salary Range (e.g., $80,000 - $120,000)"
                value={newJob.salary}
                onChange={(e) => handleNewJobChange("salary", e.target.value)}
                required
              />
              <Input
                placeholder="Experience (e.g., 3+ years)"
                value={newJob.experience}
                onChange={(e) => handleNewJobChange("experience", e.target.value)}
                required
              />
              <Input
                type="number"
                placeholder="Total Positions"
                value={newJob.totalPositions}
                onChange={(e) => handleNewJobChange("totalPositions", parseInt(e.target.value) || 0)}
                required
              />
              <Input
                placeholder="Description"
                value={newJob.description}
                onChange={(e) => handleNewJobChange("description", e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Save Job
              </Button>
            </form>
          </DialogContent>
        </Dialog>
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
            <CardTitle>Available Positions</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="human resources">HR</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="postedDate desc">Newest First</SelectItem>
                  <SelectItem value="postedDate asc">Oldest First</SelectItem>
                  <SelectItem value="applicants desc">Most Applicants</SelectItem>
                  <SelectItem value="applicants asc">Least Applicants</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow w-full max-w-sm min-h-[400px] flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="space-y-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.department}</p>
                      </div>
                      <Badge className={getStatusBadge(job.status)}>{job.status}</Badge>
                    </div>
                    <div className="flex gap-2">
                      {job.languages?.map((lang) => (
                        <img
                          key={lang}
                          src={`https://skillicons.dev/icons?i=${lang}`}
                          alt={lang.toUpperCase()}
                          className="w-6 h-6"
                        />
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {job.experience} experience
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <Badge className={getTypeBadge(job.type)} variant="outline">
                          {job.type}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {job.salary}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {job.applicants} applicants
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {job.filled} of {job.totalPositions} filled
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

                    <div className="flex gap-2 pt-2 mt-auto">
                      <Button size="sm" className="flex-1" onClick={() => setSelectedJob(job)}>
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setIsDeleteDialogOpen(true)}
                      >
                        Delete Job
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Details Modal */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p><strong>Department:</strong> {selectedJob?.department}</p>
            <p><strong>Location:</strong> {selectedJob?.location}</p>
            <p><strong>Type:</strong> {selectedJob?.type}</p>
            <p><strong>Salary:</strong> {selectedJob?.salary}</p>
            <p><strong>Experience:</strong> {selectedJob?.experience}</p>
            <p><strong>Positions:</strong> {selectedJob?.filled} of {selectedJob?.totalPositions} filled</p>
            <p><strong>Applicants:</strong> {selectedJob?.applicants}</p>
            <p><strong>Posted:</strong> {selectedJob?.postedDate}</p>
            <p><strong>Status:</strong> {selectedJob?.status}</p>
            <p><strong>Description:</strong> {selectedJob?.description}</p>
            {selectedJob?.languages?.length > 0 && (
              <div>
                <strong>Languages/Skills:</strong>
                <div className="flex gap-2 mt-2">
                  {selectedJob.languages.map((lang) => (
                    <img
                      key={lang}
                      src={`https://skillicons.dev/icons?i=${lang}`}
                      alt={lang.toUpperCase()}
                      className="w-8 h-8"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Restriction Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Access Denied</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">Only admin can delete this job.</p>
          <Button onClick={() => setIsDeleteDialogOpen(false)} className="mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default JobGrid