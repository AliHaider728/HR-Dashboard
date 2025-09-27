 
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, DollarSign, Building, User, Award } from "lucide-react"

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
  const [employee] = useState(employeeData) // In real app, fetch by ID

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/employees">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employees
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Employee Details</h1>
          <p className="text-muted-foreground">View and manage employee information</p>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Edit Employee
        </Button>
      </div>

      {/* Employee Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={employee.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{employee.name}</h2>
                {getStatusBadge(employee.status)}
              </div>
              <p className="text-lg text-muted-foreground mb-3">{employee.position}</p>
              <p className="text-sm text-muted-foreground mb-4">{employee.bio}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{employee.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{employee.department}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employee ID</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employee.employeeId}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Join Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(employee.joinDate).toLocaleDateString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employee.salary}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employee.performance}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
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
            <Card>
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
          <Card>
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
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators and targets</CardDescription>
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
          <Card>
            <CardHeader>
              <CardTitle>Attendance Record</CardTitle>
              <CardDescription>Monthly attendance summary</CardDescription>
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
  )
}
