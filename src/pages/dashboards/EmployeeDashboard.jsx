 

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Progress } from "../../components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Clock, Calendar, Target, Award, TrendingUp, CheckCircle, Plus, Bell, Cake, FileText, Users } from "lucide-react"

export default function EmployeeDashboard() {
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete project documentation", completed: false },
    { id: 2, title: "Attend team meeting", completed: true },
    { id: 3, title: "Review code changes", completed: false },
  ])
  const [newTask, setNewTask] = useState("")

  const leaveData = [
    { type: "Total Leaves", used: 10, total: 16, color: "bg-blue-500" },
    { type: "Remaining", used: 6, total: 16, color: "bg-green-500" },
    { type: "Sick Leave", used: 2, total: 10, color: "bg-red-500" },
    { type: "Casual Leave", used: 3, total: 15, color: "bg-orange-500" },
  ]

  const performanceData = [
    { month: "Jan", score: 85 },
    { month: "Feb", score: 88 },
    { month: "Mar", score: 92 },
    { month: "Apr", score: 89 },
    { month: "May", score: 95 },
    { month: "Jun", score: 93 },
  ]

  const timeData = [
    { day: "Mon", hours: 8.5 },
    { day: "Tue", hours: 9.0 },
    { day: "Wed", hours: 8.0 },
    { day: "Thu", hours: 8.5 },
    { day: "Fri", hours: 7.5 },
  ]

  const notifications = [
    { id: 1, message: "Lex Murphy requested access to UNIX", time: "Today at 9:42 AM" },
    { id: 2, message: "EY_review.pdf", time: "Today at 10:00 AM" },
    { id: 3, message: "Lex Murphy requested access to UNIX", time: "Today at 10:50 AM" },
    { id: 4, message: "Lex Murphy requested access to UNIX", time: "Today at 12:00 PM" },
    { id: 5, message: "Lex Murphy requested access to UNIX", time: "Today at 05:00 PM" },
  ]

  const meetings = [
    { time: "09:25 AM", title: "Marketing Strategy Presentation", type: "Marketing" },
    { time: "09:20 AM", title: "Design Review Hospital, doctors Management Project", type: "Review" },
    { time: "09:18 AM", title: "Birthday Celebration of Employee", type: "Celebration" },
    { time: "09:10 AM", title: "Update of Project Flow", type: "Development" },
  ]

  const handleClockInOut = () => {
    setIsClockedIn(!isClockedIn)
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: tasks.length + 1, title: newTask, completed: false }])
      setNewTask("")
    }
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/professional-female-avatar.png" />
            <AvatarFallback>SP</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Good Morning, Stephan Peralt!</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Senior Product Designer, UI/UX Design</p>
            <p className="text-muted-foreground text-xs">Your Leave Request on "24th April 2024" has been Approved!</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Calendar className="mr-2 h-4 w-4" />
            Apply Leave
          </Button>
          <Button 
            className={`flex-1 sm:flex-none ${isClockedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-primary hover:bg-orange-600'}`}
            onClick={handleClockInOut}
          >
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </Button>
        </div>
      </div>

      {/* Employee Info */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-medium">+1 324 3453 545</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="font-medium">Steperde124@example.com</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Report Office</p>
              <p className="font-medium">Doglas Martini</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Joined on</p>
              <p className="font-medium">15 Jan 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Tracking and Attendance */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Punch In</p>
                <p className="text-xl sm:text-2xl font-bold">08:35 AM, 11 Mar 2025</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Hours Today</p>
                <p className="text-xl sm:text-2xl font-bold">8.36 / 9</p>
                <p className="text-sm">5% This Week</p>
              </div>
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Overtime this Month</p>
                <p className="text-xl sm:text-2xl font-bold">16 / 28</p>
                <p className="text-sm">6% Last Month</p>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Production</p>
                <p className="text-xl sm:text-2xl font-bold">3.45 hrs</p>
              </div>
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Details and Performance */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Leave Details</CardTitle>
            <CardDescription>Better than 85% of Employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">On Time</p>
                <p className="font-medium">1254</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Late Attendance</p>
                <p className="font-medium">32</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Work From Home</p>
                <p className="font-medium">658</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="font-medium">14</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sick Leave</p>
                <p className="font-medium">68</p>
              </div>
            </div>
            <div className="space-y-4">
              {leaveData.map((leave, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{leave.type}</span>
                    <span>{leave.used}/{leave.total}</span>
                  </div>
                  <Progress value={(leave.used / leave.total) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>98% (12% vs last year)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="hsl(16 100% 60%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Projects, Tasks, and Skills */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Your ongoing projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Office Management", leader: "Anthony Lewis", deadline: "14 Jan 2024", tasks: "6/10", time: "65/120 Hrs", status: "In Progress" },
                { name: "Office Management", leader: "Anthony Lewis", deadline: "14 Jan 2024", tasks: "6/10", time: "65/120 Hrs", status: "In Progress" },
              ].map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{project.name}</span>
                    <Badge variant={project.status === "Completed" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Project Leader: {project.leader}</p>
                  <p className="text-xs text-muted-foreground">Deadline: {project.deadline}</p>
                  <p className="text-xs text-muted-foreground">Tasks: {project.tasks}</p>
                  <Progress value={65 / 120 * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">{project.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
            <CardDescription>Manage your tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <form onSubmit={handleAddTask} className="flex gap-2">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add new task"
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </form>
              {[
                { title: "Patient appointment booking", status: "Onhold" },
                { title: "Appointment booking with payment", status: "Inprogress" },
                { title: "Patient and Doctor video conferencing", status: "Completed" },
                { title: "Private chat module", status: "Pending" },
                { title: "Go-Live and Post-Implementation Support", status: "Inprogress" },
              ].map((task, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTaskCompletion(index + 1)}
                  >
                    <CheckCircle className={`h-4 w-4 ${task.status === "Completed" ? 'text-green-500' : 'text-gray-400'}`} />
                  </Button>
                  <div>
                    <span className={`text-sm ${task.status === "Completed" ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </span>
                    <Badge variant={task.status === "Completed" ? "default" : "secondary"} className="ml-2">{task.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Skills</CardTitle>
            <CardDescription>Skill development progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { skill: "Figma", level: 95, updated: "15 May 2025" },
                { skill: "HTML", level: 85, updated: "12 May 2025" },
                { skill: "CSS", level: 70, updated: "12 May 2025" },
                { skill: "Wordpress", level: 61, updated: "15 May 2025" },
                { skill: "Javascript", level: 58, updated: "13 May 2025" },
              ].map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{skill.skill}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                  <p className="text-xs text-muted-foreground">Updated: {skill.updated}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Your team contacts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Alexander Jermai", role: "UI/UX Designer", status: "online" },
                { name: "Doglas Martini", role: "Product Designer", status: "offline" },
                { name: "Daniel Esbella", role: "Project Manager", status: "online" },
                { name: "Daniel Esbella", role: "Team Lead", status: "online" },
                { name: "Stephan Peralt", role: "Team Lead", status: "online" },
                { name: "Andrew Jermia", role: "Project Lead", status: "offline" },
              ].map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/professional-male-avatar.png" />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  <div
                    className={`h-2 w-2 rounded-full ${member.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Birthday</CardTitle>
            <CardDescription>Upcoming team birthdays</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/professional-male-avatar.png" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">Andrew Jermia</p>
                <p className="text-xs text-muted-foreground">IOS Developer</p>
              </div>
              <Button variant="outline" size="sm">
                <Cake className="mr-2 h-4 w-4" />
                Send Wishes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Policy & Holiday</CardTitle>
            <CardDescription>Company policies and holidays</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Leave Policy</p>
                <p className="text-xs text-muted-foreground">Last Updated: Today</p>
                <Button variant="link" className="p-0 h-auto">View All</Button>
              </div>
              <div>
                <p className="text-sm font-medium">Next Holiday</p>
                <p className="text-xs text-muted-foreground">Diwali, 15 Sep 2025</p>
                <Button variant="link" className="p-0 h-auto">View All</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Recent updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meetings Schedule</CardTitle>
            <CardDescription>Upcoming meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meetings.map((meeting, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-16">
                    <p className="text-sm font-medium">{meeting.time}</p>
                    <Badge>{meeting.type}</Badge>
                  </div>
                  <p className="text-sm">{meeting.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}