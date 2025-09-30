"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Progress } from "../components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  Users,
  DollarSign,
  Briefcase,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Calendar,
  Target,
  FileText,
} from "lucide-react"

// Sample data
const statsData = [
  {
    title: "Total Employees",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Total Projects",
    value: "156",
    change: "+8%",
    trend: "up",
    icon: Briefcase,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Revenue",
    value: "$2.4M",
    change: "+15%",
    trend: "up",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Active Tasks",
    value: "1,247",
    change: "-3%",
    trend: "down",
    icon: CheckCircle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

const monthlyData = [
  { month: "Jan", employees: 2400, revenue: 180000, projects: 120 },
  { month: "Feb", employees: 2450, revenue: 195000, projects: 125 },
  { month: "Mar", employees: 2500, revenue: 210000, projects: 135 },
  { month: "Apr", employees: 2600, revenue: 225000, projects: 140 },
  { month: "May", employees: 2700, revenue: 240000, projects: 150 },
  { month: "Jun", employees: 2847, revenue: 260000, projects: 156 },
]

const departmentData = [
  { name: "Engineering", value: 45, color: "#8b5cf6" },
  { name: "Sales", value: 25, color: "#06d6a0" },
  { name: "Marketing", value: 15, color: "#f72585" },
  { name: "HR", value: 10, color: "#ffd166" },
  { name: "Finance", value: 5, color: "#073b4c" },
]

const attendanceData = [
  { day: "Mon", present: 95, absent: 5 },
  { day: "Tue", present: 92, absent: 8 },
  { day: "Wed", present: 88, absent: 12 },
  { day: "Thu", present: 94, absent: 6 },
  { day: "Fri", present: 89, absent: 11 },
  { day: "Sat", present: 45, absent: 55 },
  { day: "Sun", present: 12, absent: 88 },
]

const recentActivities = [
  {
    id: 1,
    user: "John Smith",
    action: "completed project",
    target: "Website Redesign",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    action: "submitted leave request",
    target: "Annual Leave",
    time: "4 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    user: "Mike Davis",
    action: "created new task",
    target: "Database Migration",
    time: "6 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    user: "Emily Brown",
    action: "approved expense",
    target: "$1,250 Travel",
    time: "8 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Team Meeting",
    time: "10:00 AM",
    date: "Today",
    type: "meeting",
    attendees: 12,
  },
  {
    id: 2,
    title: "Project Deadline",
    time: "5:00 PM",
    date: "Tomorrow",
    type: "deadline",
    project: "Mobile App",
  },
  {
    id: 3,
    title: "Performance Review",
    time: "2:00 PM",
    date: "Dec 15",
    type: "review",
    employee: "John Doe",
  },
  {
    id: 4,
    title: "Company Event",
    time: "6:00 PM",
    date: "Dec 20",
    type: "event",
    location: "Main Hall",
  },
]

const topPerformers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Senior Developer",
    score: 98,
    projects: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Bob Wilson",
    role: "Project Manager",
    score: 95,
    projects: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Carol Davis",
    role: "UX Designer",
    score: 92,
    projects: 6,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Brown",
    role: "Sales Manager",
    score: 90,
    projects: 15,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your company.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`rounded-full p-2 ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and growth trends</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employee distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {departmentData.map((dept, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: dept.color }} />
                    <span>{dept.name}</span>
                  </div>
                  <span className="font-medium">{dept.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance and Activities */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Weekly Attendance */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
            <CardDescription>Employee attendance patterns this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" stackId="a" fill="#06d6a0" name="Present" />
                <Bar dataKey="absent" stackId="a" fill="#f72585" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Top Performers */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Employees with highest performance scores this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={performer.id} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={performer.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {performer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{performer.name}</p>
                        <p className="text-sm text-muted-foreground">{performer.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{performer.score}%</p>
                        <p className="text-sm text-muted-foreground">{performer.projects} projects</p>
                      </div>
                    </div>
                    <Progress value={performer.score} className="mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {event.type === "meeting" && <Users className="h-4 w-4 text-primary" />}
                    {event.type === "deadline" && <Clock className="h-4 w-4 text-orange-500" />}
                    {event.type === "review" && <Target className="h-4 w-4 text-blue-500" />}
                    {event.type === "event" && <Calendar className="h-4 w-4 text-green-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{event.title}</p>
                      <Badge variant="outline" className="text-xs">
                        {event.date}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                    {event.attendees && <p className="text-xs text-muted-foreground">{event.attendees} attendees</p>}
                    {event.project && <p className="text-xs text-muted-foreground">Project: {event.project}</p>}
                    {event.employee && <p className="text-xs text-muted-foreground">Employee: {event.employee}</p>}
                    {event.location && <p className="text-xs text-muted-foreground">Location: {event.location}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
