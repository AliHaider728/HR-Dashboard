import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, DollarSign, Building, User, Award, Save, X } from "lucide-react"

// Sample employee data (in real app, this would come from API)
const employeeData = {
  id: 1,
  name: "John Smith",
  email: "john.smith@company.com",
  phone: "+1 (555) 123-4567",
  position: "Senior Developer",
  department: "Engineering",
  status: "Active",
  joinDate: "2022-01-15",
  salary: "$85,000",
  location: "New York",
  avatar: "/placeholder.svg?height=120&width=120",
  skills: ["React", "Node.js", "Python", "TypeScript", "AWS"],
  projects: 8,
  performance: 95,
  manager: "Sarah Johnson",
  employeeId: "EMP001",
  bio: "Experienced full-stack developer with 5+ years in web development. Passionate about creating scalable applications and mentoring junior developers.",
}

const projectHistory = [
  {
    id: 1,
    name: "E-commerce Platform",
    status: "Completed",
    startDate: "2023-01-15",
    endDate: "2023-06-30",
    role: "Lead Developer",
    completion: 100,
  },
  {
    id: 2,
    name: "Mobile App Redesign",
    status: "In Progress",
    startDate: "2023-07-01",
    endDate: "2023-12-15",
    role: "Senior Developer",
    completion: 75,
  },
  {
    id: 3,
    name: "API Integration",
    status: "Completed",
    startDate: "2023-03-01",
    endDate: "2023-04-30",
    role: "Backend Developer",
    completion: 100,
  },
]

const attendanceData = [
  { month: "Jan", present: 22, absent: 0, late: 1 },
  { month: "Feb", present: 20, absent: 1, late: 0 },
  { month: "Mar", present: 23, absent: 0, late: 2 },
  { month: "Apr", present: 21, absent: 1, late: 1 },
  { month: "May", present: 22, absent: 0, late: 0 },
  { month: "Jun", present: 21, absent: 1, late: 1 },
]

const performanceMetrics = [
  { metric: "Code Quality", score: 95, target: 90 },
  { metric: "Project Delivery", score: 92, target: 85 },
  { metric: "Team Collaboration", score: 98, target: 90 },
  { metric: "Innovation", score: 88, target: 80 },
  { metric: "Leadership", score: 85, target: 75 },
]

export default function EmployeeDetails() {
  const { id } = useParams()
  const [employee, setEmployee] = useState(employeeData) // In real app, fetch by ID
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(employeeData)
  const [errors, setErrors] = useState({})

  const getStatusBadge = (status) => {
    const variants = {
      Active: "default",
      "On Leave": "secondary",
      Inactive: "destructive",
      Completed: "default",
      "In Progress": "secondary",
    }
    return <Badge variant={variants[status] || "default"}>{status}</Badge>
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.position.trim()) newErrors.position = "Position is required"
    if (!formData.department.trim()) newErrors.department = "Department is required"
    if (!formData.salary.trim()) newErrors.salary = "Salary is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.bio.trim()) newErrors.bio = "Bio is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setEmployee(formData)
      setIsEditing(false)
      // In real app, update via API
      console.log("Employee updated:", formData)
    }
  }

  const handleCancel = () => {
    setFormData(employee)
    setIsEditing(false)
    setErrors({})
  }

  const averageAttendance = attendanceData.reduce((acc, curr) => {
    const total = curr.present + curr.absent
    return acc + (curr.present / total) * 100
  }, 0) / attendanceData.length

  const averagePerformance = performanceMetrics.reduce((acc, curr) => acc + curr.score, 0) / performanceMetrics.length

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      <style>{`
        @media (max-width: 640px) {
          .nav-tabs {
            flex-wrap: nowrap;
            overflow-x: auto;
            scrollbar-width: thin;
            -webkit-overflow-scrolling: touch;
          }
          .nav-tabs::-webkit-scrollbar {
            height: 6px;
          }
          .nav-tabs::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 3px;
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/employees">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Employees
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Employee Details</h1>
            <p className="text-sm sm:text-base text-muted-foreground">View and manage employee information</p>
          </div>
          {isEditing ? (
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Employee
            </Button>
          )}
        </div>

        {/* Employee Profile Card */}
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarImage src={isEditing ? formData.avatar : employee.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xl sm:text-2xl">
                  {(isEditing ? formData.name : employee.name)
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="text-xl sm:text-2xl font-bold border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
                    />
                  ) : (
                    <h2 className="text-xl sm:text-2xl font-bold">{employee.name}</h2>
                  )}
                  {getStatusBadge(employee.status)}
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="text-base sm:text-lg text-muted-foreground border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                  />
                ) : (
                  <p className="text-base sm:text-lg text-muted-foreground mb-3">{employee.position}</p>
                )}
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="text-sm text-muted-foreground border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 w-full resize-none"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mb-4">{employee.bio}</p>
                )}
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                {errors.position && <p className="text-red-500 text-xs">{errors.position}</p>}
                {errors.bio && <p className="text-red-500 text-xs">{errors.bio}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                      />
                    ) : (
                      <a href={`mailto:${employee.email}`} className="hover:underline">{employee.email}</a>
                    )}
                  </div>
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                      />
                    ) : (
                      <a href={`tel:${employee.phone}`} className="hover:underline">{employee.phone}</a>
                    )}
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                      />
                    ) : (
                      <span>{employee.location}</span>
                    )}
                  </div>
                  {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                      />
                    ) : (
                      <span>{employee.department}</span>
                    )}
                  </div>
                  {errors.department && <p className="text-red-500 text-xs">{errors.department}</p>}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employee ID</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{employee.employeeId}</div>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Join Date</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{new Date(employee.joinDate).toLocaleDateString()}</div>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Salary</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="text-xl sm:text-2xl font-bold border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                />
              ) : (
                <div className="text-xl sm:text-2xl font-bold">{employee.salary}</div>
              )}
            </CardContent>
            {errors.salary && <p className="text-red-500 text-xs px-6 pb-4">{errors.salary}</p>}
          </Card>
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Performance</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{employee.performance}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-4 mt-6">
          <TabsList className="nav-tabs">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                  <CardDescription>Technical and professional skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Reporting Structure</CardTitle>
                  <CardDescription>Management hierarchy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Reports to:</p>
                    <p className="text-sm text-muted-foreground">{employee.manager}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Department:</p>
                    <p className="text-sm text-muted-foreground">{employee.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Projects:</p>
                    <p className="text-sm text-muted-foreground">{employee.projects} projects</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Project History</CardTitle>
                <CardDescription>All projects this employee has worked on</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Completion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectHistory.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.role}</TableCell>
                        <TableCell>{getStatusBadge(project.status)}</TableCell>
                        <TableCell>
                          {new Date(project.startDate).toLocaleDateString()} -{" "}
                          {new Date(project.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={project.completion} className="w-16" />
                            <span className="text-sm">{project.completion}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Average Score: {Math.round(averagePerformance)}%</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <span className="text-sm text-muted-foreground">
                        {metric.score}% / {metric.target}%
                      </span>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Attendance Record</CardTitle>
                <CardDescription>Average Rate: {Math.round(averageAttendance)}%</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Late</TableHead>
                      <TableHead>Attendance Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((record, index) => {
                      const total = record.present + record.absent
                      const rate = Math.round((record.present / total) * 100)
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{record.month}</TableCell>
                          <TableCell>{record.present}</TableCell>
                          <TableCell>{record.absent}</TableCell>
                          <TableCell>{record.late}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={rate} className="w-16" />
                              <span className="text-sm">{rate}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}