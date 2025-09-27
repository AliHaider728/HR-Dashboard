import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
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
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { Users, DollarSign, Briefcase, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, AlertCircle, Calendar, Star, MapPin, Edit, Trash2, Plus, Filter, Search, MoreVertical, FileText, Award, Download, Eye, User, } from "lucide-react";
const statsData = [
  {
    title: "Pending Approvals",
    value: "21",
    subValue: "Leave Requests",
    change: "+2.1%",
    trend: "up",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Total Employees",
    value: "154",
    subValue: "120 Active",
    change: "+2.1%",
    trend: "up",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Total Projects",
    value: "86",
    subValue: "69 Active",
    change: "-11.2%",
    trend: "down",
    icon: Briefcase,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Earnings",
    value: "$21,445",
    subValue: "This Month",
    change: "+10.2%",
    trend: "up",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Total Attendance",
    value: "120",
    subValue: "59% Present",
    change: "+2.1%",
    trend: "up",
    icon: Clock,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Total Tasks",
    value: "124/165",
    subValue: "24% Ongoing",
    change: "-11.2%",
    trend: "down",
    icon: Award,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
];

const departmentData = [
  { department: "Engineering", count: 45, color: "#3B82F6" },
  { department: "Sales", count: 32, color: "#EF4444" },
  { department: "Marketing", count: 28, color: "#10B981" },
  { department: "HR", count: 15, color: "#F59E0B" },
  { department: "Finance", count: 12, color: "#8B5CF6" },
  { department: "Operations", count: 22, color: "#06B6D4" },
];

const employeeStatusData = [
  { name: "Full-time", value: 112, color: "#3B82F6", percentage: "48%" },
  { name: "Contract", value: 31, color: "#10B981", percentage: "20%" },
  { name: "Probation", value: 34, color: "#F59E0B", percentage: "22%" },
  { name: "WFH", value: 31, color: "#8B5CF6", percentage: "20%" },
];

const attendanceData = [
  { day: "Mon", present: 145, absent: 9 },
  { day: "Tue", present: 142, absent: 12 },
  { day: "Wed", present: 148, absent: 6 },
  { day: "Thu", present: 144, absent: 10 },
  { day: "Fri", present: 139, absent: 15 },
];

const taskStatusData = [
  { name: "Ongoing", value: 24, color: "#3B82F6" },
  { name: "On Hold", value: 10, color: "#F59E0B" },
  { name: "Overdue", value: 16, color: "#EF4444" },
  { name: "Completed", value: 40, color: "#10B981" },
];

const salesData = [
  { month: "Jan", income: 12000, expenses: 8000 },
  { month: "Feb", income: 15000, expenses: 9500 },
  { month: "Mar", income: 18000, expenses: 11000 },
  { month: "Apr", income: 16000, expenses: 10500 },
  { month: "May", income: 20000, expenses: 12000 },
  { month: "Jun", income: 22000, expenses: 13000 },
];

const topPerformers = [
  {
    name: "Daniel Esbella",
    role: "IOS Developer",
    performance: 99,
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-01.jpg",
  },
];

const recentActivities = [
  {
    user: "Matt Morgan",
    action: "Added New Project",
    details: "HRMS Dashboard",
    time: "05:30 PM",
    type: "project",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-38.jpg",
  },
  {
    user: "Jay Ze",
    action: "Commented on",
    details: "Uploaded Document",
    time: "05:00 PM",
    type: "comment",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
  },
  {
    user: "Mary Donald",
    action: "Approved Task",
    details: "Projects",
    time: "05:30 PM",
    type: "approval",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-19.jpg",
  },
  {
    user: "George David",
    action: "Requesting Access to",
    details: "Module Tickets",
    time: "06:00 PM",
    type: "request",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-11.jpg",
  },
  {
    user: "Aaron Zeen",
    action: "Downloaded",
    details: "App Reports",
    time: "06:30 PM",
    type: "download",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-20.jpg",
  },
  {
    user: "Hendry Daniel",
    action: "Completed New Project",
    details: "HMS",
    time: "05:30 PM",
    type: "completion",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-08.jpg",
  },
];

const birthdays = [
  {
    name: "Andrew Jermia",
    role: "IOS Developer",
    date: "Today",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
  },
  {
    name: "Mary Zeen",
    role: "UI/UX Designer",
    date: "Tomorrow",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-03.jpg",
  },
  {
    name: "Antony Lewis",
    role: "Android Developer",
    date: "Tomorrow",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-04.jpg",
  },
  {
    name: "Doglas Martini",
    role: ".Net Developer",
    date: "25 Jan 2025",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-05.jpg",
  },
];

const projects = [
  {
    id: "PRO-001",
    name: "Office Management App",
    team: 3,
    hours: "15/255",
    deadline: "12 Sep 2024",
    priority: "High",
    status: "Ongoing",
    teamMembers: ["John", "Sarah", "Mike"],
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-01.jpg",
  },
  {
    id: "PRO-002",
    name: "Clinic Management",
    team: 1,
    hours: "15/255",
    deadline: "24 Oct 2024",
    priority: "Low",
    status: "On Hold",
    teamMembers: ["Alice"],
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-02.jpg",
  },
  {
    id: "PRO-003",
    name: "Educational Platform",
    team: 3,
    hours: "40/255",
    deadline: "18 Feb 2024",
    priority: "Medium",
    status: "Ongoing",
    teamMembers: ["Bob", "Carol", "David"],
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-03.jpg",
  },
  {
    id: "PRO-004",
    name: "Chat & Call Mobile App",
    team: 3,
    hours: "35/155",
    deadline: "19 Feb 2024",
    priority: "High",
    status: "Ongoing",
    teamMembers: ["Eve", "Frank", "Grace"],
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-04.jpg",
  },
  {
    id: "PRO-005",
    name: "Travel Planning Website",
    team: 3,
    hours: "50/235",
    deadline: "18 Feb 2024",
    priority: "Medium",
    status: "Ongoing",
    teamMembers: ["Henry", "Ivy", "Jack"],
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-05.jpg",
  },
  {
    id: "PRO-006",
    name: "Service Booking Software",
    team: 3,
    hours: "40/255",
    deadline: "20 Feb 2024",
    priority: "Low",
    status: "Ongoing",
    teamMembers: ["Kate", "Liam", "Mia"],
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-06.jpg",
  },
  {
    id: "PRO-008",
    name: "Travel Planning Website",
    team: 1,
    hours: "15/255",
    deadline: "17 Oct 2024",
    priority: "Medium",
    status: "On Hold",
    teamMembers: ["Noah"],
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-07.jpg",
  },
];

const jobOpenings = [
  {
    title: "Senior IOS Developer",
    openings: 25,
    applicants: 45,
    icon: "https://smarthr.co.in/demo/html/template/assets/img/icons/apple.svg",
  },
  {
    title: "Junior PHP Developer",
    openings: 20,
    applicants: 28,
    icon: "https://smarthr.co.in/demo/html/template/assets/img/icons/php.svg",
  },
  {
    title: "Junior React Developer",
    openings: 30,
    applicants: 35,
    icon: "https://smarthr.co.in/demo/html/template/assets/img/icons/react.svg",
  },
  {
    title: "Senior Laravel Developer",
    openings: 40,
    applicants: 52,
    icon: "https://smarthr.co.in/demo/html/template/assets/img/icons/laravel-icon.svg",
  },
];

const invoices = [
  {
    id: "INVOO2",
    name: "Redesign Website",
    client: "Logistics",
    status: "Unpaid",
    amount: "$3560",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-01.jpg",
  },
  {
    id: "INVOO5",
    name: "Module Completion",
    client: "Yip Corp",
    status: "Unpaid",
    amount: "$4175",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-02.jpg",
  },
  {
    id: "INVOO3",
    name: "Change on Emp Module",
    client: "Ignis LLP",
    status: "Unpaid",
    amount: "$6985",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-03.jpg",
  },
  {
    id: "INVOO2",
    name: "Changes on the Board",
    client: "Ignis LLP",
    status: "Unpaid",
    amount: "$1457",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-04.jpg",
  },
  {
    id: "INVOO6",
    name: "Hospital Management",
    client: "HCL Corp",
    status: "Paid",
    amount: "$6458",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-05.jpg",
  },
];

const employees = [
  {
    name: "Brian Villalobos",
    department: "Finance",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
  },
  {
    name: "Brian Villalobos",
    department: "Development",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
  },
  {
    name: "Stephan Peralt",
    department: "Marketing",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-03.jpg",
  },
  {
    name: "Doglas Martini",
    department: "Manager",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-04.jpg",
  },
  {
    name: "Anthony Lewis",
    department: "UI/UX Design",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-05.jpg",
  },
];

const jobApplicants = [
  {
    name: "Brian Villalobos",
    experience: "5+ Years",
    location: "USA",
    role: "UI/UX Designer",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
  },
  {
    name: "Anthony Lewis",
    experience: "4+ Years",
    location: "USA",
    role: "Python Developer",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
  },
  {
    name: "Stephan Peralt",
    experience: "6+ Years",
    location: "USA",
    role: "Android Developer",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-03.jpg",
  },
  {
    name: "Doglas Martini",
    experience: "2+ Years",
    location: "USA",
    role: "React Developer",
    avatar:
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-04.jpg",
  },
];

const todoList = [
  {
    id: 1,
    task: "Review Q4 performance reports",
    priority: "High",
    deadline: "Dec 15",
  },
  {
    id: 2,
    task: "Prepare budget presentation",
    priority: "Medium",
    deadline: "Dec 18",
  },
  {
    id: 3,
    task: "Team building event planning",
    priority: "Low",
    deadline: "Dec 22",
  },
];

const schedules = [
  {
    position: "UI/UX Designer",
    event: "Interview Candidates - UI/UX Designer",
    date: "Thu, 15 Feb 2025",
    time: "01:00 PM - 02:20 PM",
  },
  {
    position: "IOS Developer",
    event: "Interview Candidates - IOS Developer",
    date: "Thu, 15 Feb 2025",
    time: "02:00 PM - 04:20 PM",
  },
];

export default function AdminDashboard() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("This Week");
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddLeave, setShowAddLeave] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [todoListState, setTodoList] = useState(todoList);

  // Add Project Form State
  const [projectForm, setProjectForm] = useState({
    projectId: "PRO-0004",
    projectName: "",
    client: "",
    startDate: "2024-05-02",
    endDate: "2024-05-02",
    priority: "Medium",
    projectValue: "",
    totalHours: "",
    extraTime: "",
    description: "",
    members: [],
    logo: null,
  });

  // Add Leave Request Form State
  const [leaveForm, setLeaveForm] = useState({
    employeeName: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    noOfDays: 0,
    remainingDays: 15,
    reason: "",
  });

  const addTodo = (task, priority, deadline) => {
    const newTodo = {
      id: todoListState.length + 1,
      task,
      priority,
      deadline,
    };
    setTodoList([...todoListState, newTodo]);
    setShowAddTodo(false);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    console.log("Project submitted:", projectForm);
    setShowAddProject(false);
    setProjectForm({
      projectId: `PRO-${Math.floor(Math.random() * 10000)}`,
      projectName: "",
      client: "",
      startDate: "2024-05-02",
      endDate: "2024-05-02",
      priority: "Medium",
      projectValue: "",
      totalHours: "",
      extraTime: "",
      description: "",
      members: [],
      logo: null,
    });
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      projectId: project.id,
      projectName: project.name,
      client: "",
      startDate: "2024-05-02",
      endDate: "2024-05-02",
      priority: project.priority,
      projectValue: "",
      totalHours: "",
      extraTime: "",
      description: "",
      members: project.teamMembers,
      logo: null,
    });
    setShowEditProject(true);
  };

  const handleDeleteProject = (projectId) => {
    if (confirm("Are you sure you want to delete this project?")) {
      // Update projects state if needed
    }
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    console.log("Leave request submitted:", leaveForm);
    setShowAddLeave(false);
    setLeaveForm({
      employeeName: "",
      leaveType: "",
      fromDate: "",
      toDate: "",
      noOfDays: 0,
      remainingDays: 15,
      reason: "",
    });
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (type === "logo" && file) {
      if (file.size > 4 * 1024 * 1024) {
        alert("Image should be below 4 MB");
        return;
      }
      setProjectForm((prev) => ({ ...prev, logo: file }));
    }
  };

  return (
    <div className="space-y-6 pl-9 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="md:flex block items-center justify-between bg-white md:p-6 p-8 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-31.jpg" />
            <AvatarFallback className="text-lg">AD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back, Adrian!
            </h1>
            <p className="text-gray-600">
              You have 21 Pending Approvals & 14 Leave Requests
            </p>
          </div>
        </div>
        <div className="flex mt-3 items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowAddProject(true)}
          >
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
            onClick={() => setShowAddLeave(true)}
          >
            <FileText className="h-4 w-4" />
            Add Leave Request
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="  transition-all duration-300 hover:-translate-y-2 ease-in-out hover:shadow-lg "
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-full p-2 ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500 mb-1">{stat.subValue}</p>
                <div className="flex items-center text-xs">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Row 1: Employees by Department & Top Performer */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Employees By Department</CardTitle>
              <CardDescription>
                No of Employees increased by +20% from last Week
              </CardDescription>
            </div>
            <Select
              value={selectedTimeFilter}
              onValueChange={setSelectedTimeFilter}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="This Month">This Month</SelectItem>
                <SelectItem value="Last Week">Last Week</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Employee</h3>
              <div className="text-2xl font-bold text-blue-600">154</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#F97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Employee Status</CardTitle>
              <CardDescription>Best employee this month</CardDescription>
            </div>
            <Link to="/employees">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {/* Employee Status Pie Chart */}
            <div className="mt-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={employeeStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) =>
                      `${name}: ${value} (${
                        employeeStatusData.find((d) => d.name === name)
                          .percentage
                      })`
                    }
                  >
                    {employeeStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-500" />
                <h4 className="font-medium text-sm text-gray-900">
                  Top Performers
                </h4>
              </div>

              <div className="space-y-3">
                {topPerformers.map((performer, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={performer.avatar} />
                        <AvatarFallback className="text-xs">
                          {performer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                          <Star className="h-2.5 w-2.5 text-white fill-current" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {performer.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {performer.role}
                      </p>
                      <div className="mt-1.5">
                        <Progress
                          value={performer.performance}
                          className="h-1.5"
                        />
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium text-green-600">
                          {performer.trend}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {performer.performance}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Attendance Overview & Clock In */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Total Attendance: 120</CardDescription>
            </div>
            <Link to="/attendance">
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-4 gap-4 text-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">59%</div>
                <div className="text-sm text-gray-600">Present</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">21%</div>
                <div className="text-sm text-gray-600">Late</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2%</div>
                <div className="text-sm text-gray-600">Permission</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-600">15%</div>
                <div className="text-sm text-gray-600">Absent</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#10B981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="absent"
                  stroke="#EF4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Clock In/Out</CardTitle>
              <CardDescription>Recent activity</CardDescription>
            </div>
            <Link to="/attendance">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  name: "Daniel Esbella",
                  time: "09:15",
                  role: "UI/UX Designer",
                  status: "Present",
                  avatar:
                    "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
                },
                {
                  name: "Doglas Martini",
                  time: "09:36",
                  role: "Project Manager",
                  status: "Late",
                  avatar:
                    "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
                },
                {
                  name: "Brian Villalobos",
                  time: "09:15",
                  role: "PHP Developer",
                  status: "Present",
                  avatar:
                    "https://smarthr.co.in/demo/html/template/assets/img/users/user-03.jpg",
                },
                {
                  name: "Anthony Lewis",
                  time: "08:35",
                  role: "Marketing Head",
                  status: "Present",
                  late: "30 Min",
                  avatar:
                    "https://smarthr.co.in/demo/html/template/assets/img/users/user-04.jpg",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 pb-2 border-b last:border-b-0"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback className="text-xs">
                      {activity.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.name}</p>
                    <p className="text-xs text-gray-500">{activity.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">{activity.time}</p>
                    <Badge
                      variant={
                        activity.status === "Present" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                    {activity.late && (
                      <p className="text-xs text-orange-600 mt-1">
                        {activity.late}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Jobs Applicants & Employees Table */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Jobs Applicants</CardTitle>
              <CardDescription>Current openings</CardDescription>
            </div>
            <Link to="/Jobs">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {jobOpenings.map((job, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={job.icon}
                      alt={job.title}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{job.title}</h4>
                      <p className="text-xs text-gray-600">
                        No of Openings: {job.openings}
                      </p>
                    </div>
                  </div>
                  <Progress
                    value={(job.applicants / 60) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Employees</CardTitle>
              <CardDescription>Latest employees</CardDescription>
            </div>
            <Link to="/EmployeesGrid">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {employees.map((employee, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={employee.avatar} />
                    <AvatarFallback>
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{employee.name}</p>
                    <p className="text-xs text-gray-500">
                      {employee.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 4: Sales Overview with Chart & Task Statistics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* Sales Overview with Area Chart */}
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Last Updated at 11:30PM</CardDescription>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Income
              </div>
              <div className="flex items-center gap-1 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Expenses
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[calc(100%-3rem)] flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="expensesColor"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#incomeColor)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#EF4444"
                  fillOpacity={1}
                  fill="url(#expensesColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Statistics */}
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Total Tasks</CardTitle>
              <CardDescription>124/165</CardDescription>
            </div>
            <Link to="/tasks">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">124/165</div>
                <p className="text-sm text-gray-600">Total Tasks</p>
              </div>

              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-base font-semibold text-blue-600">
                    24%
                  </div>
                  <p className="text-xs text-gray-600">Ongoing</p>
                </div>
                <div>
                  <div className="text-base font-semibold text-yellow-600">
                    10%
                  </div>
                  <p className="text-xs text-gray-600">On Hold</p>
                </div>
                <div>
                  <div className="text-base font-semibold text-red-600">
                    16%
                  </div>
                  <p className="text-xs text-gray-600">Overdue</p>
                </div>
                <div>
                  <div className="text-base font-semibold text-green-600">
                    40%
                  </div>
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
              </div>

              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">389/689 hrs</p>
                <p className="text-xs text-gray-500">
                  Spent on Overall Tasks This Week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 5: Projects Overview Table */}
      <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Projects Overview</CardTitle>
            <CardDescription>Total Tasks: 124/165</CardDescription>
          </div>
          <Link to="/projects">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Team</th>
                  <th className="text-left p-3">Hours</th>
                  <th className="text-left p-3">Deadline</th>
                  <th className="text-left p-3">Priority</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3  font-normal">{project.id}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={project.avatar}
                          alt={project.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span>{project.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex -space-x-1">
                        {project.teamMembers.slice(0, 3).map((member, i) => (
                          <Avatar
                            key={i}
                            className="h-6 w-6 border-2 border-white"
                          >
                            <AvatarFallback className="text-xs bg-gray-300">
                              {member.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.teamMembers.length > 3 && (
                          <div className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                            +{project.teamMembers.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="w-20">
                        <Progress
                          value={
                            (parseInt(project.hours.split("/")[0]) /
                              parseInt(project.hours.split("/")[1])) *
                            100
                          }
                          className="h-2"
                        />
                        <span className="text-xs text-gray-500 block mt-1">
                          {project.hours} Hrs
                        </span>
                      </div>
                    </td>
                    <td className="p-3">{project.deadline}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          project.priority === "High"
                            ? "destructive"
                            : project.priority === "Medium"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {project.priority}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProject(project)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>389/689 hrs - Spent on Overall Tasks This Week</p>
          </div>
        </CardContent>
      </Card>

      {/* Row 6: Job Applicants List & Invoices */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Job Applicants</CardTitle>
              <CardDescription>Recent applications</CardDescription>
            </div>
            <Link to="/Candidates">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {jobApplicants.map((applicant, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={applicant.avatar} />
                    <AvatarFallback>
                      {applicant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{applicant.name}</p>
                    <p className="text-xs text-gray-500">{applicant.role}</p>
                    <p className="text-xs text-gray-400">
                      {applicant.experience} • {applicant.location}
                    </p>
                  </div>
                  <Eye className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Recent invoices</CardDescription>
            </div>
            <Link to="/invoices">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={invoice.avatar} />
                    <AvatarFallback>{invoice.client.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{invoice.name}</p>
                        <p className="text-xs text-gray-500">
                          #{invoice.id} • {invoice.client}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{invoice.amount}</p>
                        <Badge
                          variant={
                            invoice.status === "Paid" ? "default" : "secondary"
                          }
                          className="text-xs mt-1"
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 7: Schedules & Recent Activities & Birthdays */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-1 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Schedules</CardTitle>
              <CardDescription>Upcoming interviews</CardDescription>
            </div>
            <Link to="/schedules">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedules.map((schedule, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{schedule.position}</p>
                      <p className="text-xs text-gray-600">{schedule.event}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium">{schedule.date}</p>
                      <p className="text-xs text-gray-500">{schedule.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates</CardDescription>
            </div>
            <Link to="/activities">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.slice(0, 5).map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-2 border-b last:border-b-0"
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium">{activity.details}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Birthdays</CardTitle>
              <CardDescription>Upcoming celebrations</CardDescription>
            </div>
            <Link to="/birthdays">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {birthdays.map((birthday, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={birthday.avatar} />
                    <AvatarFallback>
                      {birthday.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{birthday.name}</p>
                    <p className="text-xs text-gray-500">{birthday.role}</p>
                    <p className="text-xs text-gray-400">{birthday.date}</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Send
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add Project</CardTitle>
              <CardDescription>Create new project</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Project ID</Label>
                    <Input
                      value={projectForm.projectId}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label>Upload Project Logo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "logo")}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Image should be below 4 MB
                    </p>
                  </div>
                </div>

                <div>
                  <Label>Project Name</Label>
                  <Input
                    placeholder="Enter project name"
                    value={projectForm.projectName}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        projectName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Client</Label>
                    <Input
                      placeholder="Enter client name"
                      value={projectForm.client}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          client: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Select
                      value={projectForm.priority}
                      onValueChange={(value) =>
                        setProjectForm((prev) => ({ ...prev, priority: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input 
                      type="date"
                      value={projectForm.startDate}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={projectForm.endDate}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Members</Label>
                  <Input
                    placeholder="Add team members (comma separated)"
                    value={projectForm.members.join(", ")}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        members: e.target.value.split(", "),
                      }))
                    }
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Project description"
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    Create Project
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddProject(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {showEditProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Edit Project</CardTitle>
              <CardDescription>Update project details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Project ID</Label>
                    <Input
                      value={projectForm.projectId}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label>Upload Project Logo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "logo")}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Image should be below 4 MB
                    </p>
                  </div>
                </div>

                <div>
                  <Label>Project Name</Label>
                  <Input
                    placeholder="Enter project name"
                    value={projectForm.projectName}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        projectName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Client</Label>
                    <Input
                      placeholder="Enter client name"
                      value={projectForm.client}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          client: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Select
                      value={projectForm.priority}
                      onValueChange={(value) =>
                        setProjectForm((prev) => ({ ...prev, priority: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={projectForm.startDate}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={projectForm.endDate}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Members</Label>
                  <Input
                    placeholder="Add team members (comma separated)"
                    value={projectForm.members.join(", ")}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        members: e.target.value.split(", "),
                      }))
                    }
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Project description"
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    Update Project
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowEditProject(false);
                      setEditingProject(null);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {showAddLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add Leave Request</CardTitle>
              <CardDescription>Submit new leave request</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLeaveSubmit} className="space-y-4">
                <div>
                  <Label>Employee Name</Label>
                  <Input
                    placeholder="Enter employee name"
                    value={leaveForm.employeeName}
                    onChange={(e) =>
                      setLeaveForm((prev) => ({
                        ...prev,
                        employeeName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label>Leave Type</Label>
                  <Select
                    value={leaveForm.leaveType}
                    onValueChange={(value) =>
                      setLeaveForm((prev) => ({ ...prev, leaveType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sick">Sick Leave</SelectItem>
                      <SelectItem value="Casual">Casual Leave</SelectItem>
                      <SelectItem value="Annual">Annual Leave</SelectItem>
                      <SelectItem value="Maternity">Maternity Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>From</Label>
                    <Input
                      type="date"
                      value={leaveForm.fromDate}
                      onChange={(e) =>
                        setLeaveForm((prev) => ({
                          ...prev,
                          fromDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>To</Label>
                    <Input
                      type="date"
                      value={leaveForm.toDate}
                      onChange={(e) =>
                        setLeaveForm((prev) => ({
                          ...prev,
                          toDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>No of Days</Label>
                    <Input
                      type="number"
                      value={leaveForm.noOfDays}
                      onChange={(e) =>
                        setLeaveForm((prev) => ({
                          ...prev,
                          noOfDays: parseInt(e.target.value),
                        }))
                      }
                      className="text-right"
                    />
                  </div>
                  <div>
                    <Label>Remaining Days</Label>
                    <Input
                      type="number"
                      value={leaveForm.remainingDays}
                      readOnly
                      className="bg-gray-50 text-right"
                    />
                  </div>
                </div>

                <div>
                  <Label>Reason</Label>
                  <Textarea
                    placeholder="Enter reason for leave"
                    value={leaveForm.reason}
                    onChange={(e) =>
                      setLeaveForm((prev) => ({
                        ...prev,
                        reason: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    Submit Request
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddLeave(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
