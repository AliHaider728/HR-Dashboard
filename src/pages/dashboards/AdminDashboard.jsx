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
import { Users,  MessageSquare , Phone , CreditCard, FileCheck, DollarSign, Briefcase, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, AlertCircle, Calendar, Star, MapPin, Edit, Trash2, Plus, Filter, Search, MoreVertical, FileText, Award, Download, Eye, User, } from "lucide-react";

const statsData = [
  {
    title: "Pending Approvals",
    value: "21",
    subValue: "Leave Requests",
    change: "+2.1%",
    trend: "up",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    title: "Total Employees",
    value: "154",
    subValue: "120 Active",
    change: "+2.1%",
    trend: "up",
    icon: Users,
    color: "text-emerald-600",
    bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
  },
  {
    title: "Total Projects",
    value: "86",
    subValue: "69 Active",
    change: "-11.2%",
    trend: "down",
    icon: Briefcase,
    color: "text-orange-600",
    bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
  },
  {
    title: "Earnings",
    value: "$21,445",
    subValue: "This Month",
    change: "+10.2%",
    trend: "up",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
  },
  {
    title: "Total Attendance",
    value: "120",
    subValue: "59% Present",
    change: "+2.1%",
    trend: "up",
    icon: Clock,
    color: "text-indigo-600",
    bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
  },
  {
    title: "Total Tasks",
    value: "124/165",
    subValue: "24% Ongoing",
    change: "-11.2%",
    trend: "down",
    icon: Award,
    color: "text-red-600",
    bgColor: "bg-gradient-to-br from-red-50 to-red-100",
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
    trend: "+12%",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-01.jpg",
  },
];

const recentActivities = [
  {
    user: "Matt Morgan",
    action: "Added New Project",
    details: "HRMS Dashboard",
    time: "05:30 PM",
    type: "project",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-38.jpg",
  },
  {
    user: "Jay Ze",
    action: "Commented on",
    details: "Uploaded Document",
    time: "05:00 PM",
    type: "comment",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
  },
  {
    user: "Mary Donald",
    action: "Approved Task",
    details: "Projects",
    time: "05:30 PM",
    type: "approval",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-19.jpg",
  },
  {
    user: "George David",
    action: "Requesting Access to",
    details: "Module Tickets",
    time: "06:00 PM",
    type: "request",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-11.jpg",
  },
  {
    user: "Aaron Zeen",
    action: "Downloaded",
    details: "App Reports",
    time: "06:30 PM",
    type: "download",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-20.jpg",
  },
  {
    user: "Hendry Daniel",
    action: "Completed New Project",
    details: "HMS",
    time: "05:30 PM",
    type: "completion",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-08.jpg",
  },
];

const birthdays = [
  {
    name: "Andrew Jermia",
    role: "IOS Developer",
    date: "Today",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
  },
  {
    name: "Mary Zeen",
    role: "UI/UX Designer",
    date: "Tomorrow",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-03.jpg",
  },
  {
    name: "Antony Lewis",
    role: "Android Developer",
    date: "Tomorrow",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-04.jpg",
  },
  {
    name: "Doglas Martini",
    role: ".Net Developer",
    date: "25 Jan 2025",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-05.jpg",
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
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-01.jpg",
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
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-02.jpg",
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
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-03.jpg",
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
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-04.jpg",
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
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-05.jpg",
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
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-06.jpg",
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
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-01.jpg",
  },
  {
    id: "INVOO5",
    name: "Module Completion",
    client: "Yip Corp",
    status: "Unpaid",
    amount: "$4175",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-02.jpg",
  },
  {
    id: "INVOO3",
    name: "Change on Emp Module",
    client: "Ignis LLP",
    status: "Unpaid",
    amount: "$6985",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-03.jpg",
  },
  {
    id: "INVOO2",
    name: "Changes on the Board",
    client: "Ignis LLP",
    status: "Unpaid",
    amount: "$1457",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-04.jpg",
  },
  {
    id: "INVOO6",
    name: "Hospital Management",
    client: "HCL Corp",
    status: "Paid",
    amount: "$6458",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-05.jpg",
  },
];

const employees = [
  {
    name: "Brian Villalobos",
    department: "Finance",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
  },
  {
    name: "Brian Villalobos",
    department: "Development",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
  },
  {
    name: "Stephan Peralt",
    department: "Marketing",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-03.jpg",
  },
  {
    name: "Doglas Martini",
    department: "Manager",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-04.jpg",
  },
  {
    name: "Anthony Lewis",
    department: "UI/UX Design",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-05.jpg",
  },
];
const todoItems = [
  { id: 1, task: "Add Holidays", completed: false, priority: "high" },
  { id: 2, task: "Add Meeting to Client", completed: false, priority: "medium" },
  { id: 3, task: "Chat with Adrian", completed: true, priority: "low" },
  { id: 4, task: "Management Call", completed: false, priority: "high" },
  { id: 5, task: "Add Payroll", completed: false, priority: "medium" },
  { id: 6, task: "Add Policy for Increment", completed: false, priority: "low" },
];

const jobApplicants = [
  {
    name: "Brian Villalobos",
    experience: "5+ Years",
    location: "USA",
    role: "UI/UX Designer",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
  },
  {
    name: "Anthony Lewis",
    experience: "4+ Years",
    location: "USA",
    role: "Python Developer",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
  },
  {
    name: "Stephan Peralt",
    experience: "6+ Years",
    location: "USA",
    role: "Android Developer",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-03.jpg",
  },
  {
    name: "Doglas Martini",
    experience: "2+ Years",
    location: "USA",
    role: "React Developer",
    avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-04.jpg",
  },
];

const schedules = [
  {
    position: "UI/UX Designer",
    event: "Interview Candidates - UI/UX Designer",
    date: "Thu, 15 Feb 2025",
    time: "01:00 PM - 02:20 PM",
    teamMembers: [
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-49.jpg",
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-13.jpg", 
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-11.jpg",
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-22.jpg",
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-58.jpg"
    ]
  },
  {
    position: "IOS Developer",
    event: "Interview Candidates - IOS Developer", 
    date: "Thu, 15 Feb 2025",
    time: "02:00 PM - 04:20 PM",
    teamMembers: [
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-49.jpg",
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-13.jpg",
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-11.jpg",
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-22.jpg",
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-58.jpg",
      "https://smarthr.co.in/demo/html/template/assets/img/users/user-49.jpg"
    ]
  },
];

export default function AdminDashboard() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("This Week");
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddLeave, setShowAddLeave] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
   const [todos, setTodos] = useState(todoItems);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 sm:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 shadow-lg ring-4 ring-blue-100">
              <AvatarImage src="https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-31.jpg" />
              <AvatarFallback className="text-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">AD</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Welcome Back, Adrian!
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              You have 21 Pending Approvals & 14 Leave Requests
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 lg:mt-0">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-300"
            onClick={() => setShowAddProject(true)}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Project</span>
            <span className="sm:hidden">Project</span>
          </Button>
          <Button
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 flex items-center justify-center gap-2 h-12 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setShowAddLeave(true)}
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Add Leave Request</span>
            <span className="sm:hidden">Leave</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ease-out border-0 shadow-lg overflow-hidden relative"
            >
              <div className={`absolute inset-0 ${stat.bgColor} opacity-50`}></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-xl p-3 ${stat.bgColor} ring-1 ring-white/20 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-600 mb-2">{stat.subValue}</p>
                <div className="flex items-center text-xs">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1.5 h-3 w-3 text-emerald-500" />
                  ) : (
                    <TrendingDown className="mr-1.5 h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={`font-medium ${
                      stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">vs last week</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Row 1: Employees by Department & Employee Status */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6 sm:mb-8">
        <Card className="lg:col-span-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Employees By Department</CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                No of Employees increased by +20% from last Week
              </CardDescription>
            </div>
            <Select
              value={selectedTimeFilter}
              onValueChange={setSelectedTimeFilter}
            >
              <SelectTrigger className="w-full sm:w-32 rounded-xl border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="This Month">This Month</SelectItem>
                <SelectItem value="Last Week">Last Week</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900">Total Employee</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">154</div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="department" 
                    fontSize={12}
                    tick={{ fontSize: 11 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="url(#barGradient)" 
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Employee Status</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Current workforce distribution</CardDescription>
            </div>
            <Link to="/EmployeesGrid">
              <Button variant="outline" size="sm" className="rounded-xl">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={employeeStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percentage }) => `${name}: ${percentage}`}
                  >
                    {employeeStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Top Performers Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                <h4 className="font-semibold text-sm text-gray-900">Top Performers</h4>
              </div>

              <div className="space-y-3">
                {topPerformers.map((performer, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-all duration-300 border border-amber-100"
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12 ring-2 ring-amber-200">
                        <AvatarImage src={performer.avatar} />
                        <AvatarFallback className="text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                          {performer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                        <Star className="h-3 w-3 text-white fill-current" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">
                        {performer.name}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {performer.role}
                      </p>
                      <div className="mt-2">
                        <Progress
                          value={performer.performance}
                          className="h-2"
                        />
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                        <span className="text-xs font-medium text-emerald-600">
                          {performer.trend}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
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
      <div className="grid gap-6 lg:grid-cols-3 mb-6 sm:mb-8">
        <Card className="lg:col-span-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Attendance Overview</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Total Attendance: 120</CardDescription>
            </div>
            <Link to="/attendance/admin">
              <Button variant="outline" size="sm" className="rounded-xl">
                View Details
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-100">
                <div className="text-2xl font-bold text-emerald-600">59%</div>
                <div className="text-sm text-gray-700 font-medium">Present</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-100">
                <div className="text-2xl font-bold text-orange-600">21%</div>
                <div className="text-sm text-gray-700 font-medium">Late</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">2%</div>
                <div className="text-sm text-gray-700 font-medium">Permission</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-100">
                <div className="text-2xl font-bold text-red-600">15%</div>
                <div className="text-sm text-gray-700 font-medium">Absent</div>
              </div>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="present"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="absent"
                    stroke="#EF4444"
                    strokeWidth={3}
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Clock In/Out</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Recent activity</CardDescription>
            </div>
            <Link to="/attendance/employee">
              <Button variant="outline" size="sm" className="rounded-xl">
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
                  avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg",
                },
                {
                  name: "Doglas Martini",
                  time: "09:36",
                  role: "Project Manager",
                  status: "Late",
                  avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-02.jpg",
                },
                {
                  name: "Brian Villalobos",
                  time: "09:15",
                  role: "PHP Developer",
                  status: "Present",
                  avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-03.jpg",
                },
                {
                  name: "Anthony Lewis",
                  time: "08:35",
                  role: "Marketing Head",
                  status: "Present",
                  late: "30 Min",
                  avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-04.jpg",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border-b last:border-b-0"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-gray-100">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback className="text-xs">
                      {activity.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{activity.name}</p>
                    <p className="text-xs text-gray-600 truncate">{activity.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{activity.time}</p>
                    <Badge
                      variant={activity.status === "Present" ? "default" : "secondary"}
                      className={`text-xs mt-1 ${
                        activity.status === "Present" 
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                          : "bg-orange-100 text-orange-700 border-orange-200"
                      }`}
                    >
                      {activity.status}
                    </Badge>
                    {activity.late && (
                      <p className="text-xs text-orange-600 mt-1 font-medium">
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
      <div className="grid gap-6 md:grid-cols-2 mb-6 sm:mb-8">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Jobs Applicants</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Current openings</CardDescription>
            </div>
            <Link to="/Jobs">
              <Button variant="outline" size="sm" className="rounded-xl">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobOpenings.map((job, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white p-2 shadow-sm">
                      <img
                        src={job.icon}
                        alt={job.title}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900">{job.title}</h4>
                      <p className="text-xs text-gray-600">
                        Openings: <span className="font-medium">{job.openings}</span> | 
                        Applicants: <span className="font-medium">{job.applicants}</span>
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

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Employees</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Latest employees</CardDescription>
            </div>
            <Link to="/EmployeesGrid">
              <Button variant="outline" size="sm" className="rounded-xl">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {employees.map((employee, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-gray-100">
                    <AvatarImage src={employee.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs">
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{employee.name}</p>
                    <p className="text-xs text-gray-600 truncate">{employee.department}</p>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 4: Sales Overview, Task Statistics & Tasks Progress */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6 sm:mb-8">
        {/* Sales Overview */}
       <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
  <CardHeader className="pb-3">
    <div className="flex items-center justify-between">
      <div>
        <CardTitle className="text-lg font-bold text-gray-900">Sales Overview</CardTitle>
        <CardDescription className="text-gray-500 text-sm">Last Updated at 11:30PM</CardDescription>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
          <span className="text-gray-700">Income</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          <span className="text-gray-700">Expenses</span>
        </div>
      </div>
    </div>
  </CardHeader>
  <CardContent className="pt-0">
    <div className="w-full" style={{ aspectRatio: '16/9' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={salesData}>
          <defs>
            <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="expensesColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 2" stroke="#f1f5f9" />
          <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              fontSize: '12px'
            }}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#10B981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#incomeColor)"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#EF4444"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#expensesColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </CardContent>
</Card>

        {/* Task Statistics */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900">Task Statistics</CardTitle>
                <CardDescription className="text-gray-500 text-sm">124/165 Total</CardDescription>
              </div>
              <Link to="/tasks">
                <Button variant="outline" size="sm" className="rounded-lg text-xs h-8">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-lg font-bold text-blue-600">24%</div>
                <p className="text-xs text-gray-700 font-medium">Ongoing</p>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                <div className="text-lg font-bold text-emerald-600">40%</div>
                <p className="text-xs text-gray-700 font-medium">Completed</p>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">10%</div>
                <p className="text-xs text-gray-700 font-medium">On Hold</p>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                <div className="text-lg font-bold text-red-600">16%</div>
                <p className="text-xs text-gray-700 font-medium">Overdue</p>
              </div>
            </div>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={55}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.98)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center p-2.5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100 mt-3">
              <p className="text-sm font-semibold text-gray-900">389/689 hrs</p>
              <p className="text-xs text-gray-600">This Week</p>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Progress */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900">Tasks Progress</CardTitle>
                <CardDescription className="text-gray-500 text-sm">Weekly Overview</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {[
                { name: "Website Redesign", progress: 85, color: "bg-blue-500", bg: "bg-blue-50", team: 4 },
                { name: "Mobile App Dev", progress: 65, color: "bg-emerald-500", bg: "bg-emerald-50", team: 3 },
                { name: "Database Migration", progress: 45, color: "bg-orange-500", bg: "bg-orange-50", team: 2 },
                { name: "API Integration", progress: 90, color: "bg-purple-500", bg: "bg-purple-50", team: 5 },
                { name: "Testing & QA", progress: 30, color: "bg-red-500", bg: "bg-red-50", team: 3 }
              ].map((task, index) => (
                <div key={index} className={`p-3 ${task.bg} rounded-lg border border-gray-100`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{task.name}</h4>
                    <span className="text-xs font-bold text-gray-900">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-white/60 rounded-full h-2 mb-2">
                    <div 
                      className={`${task.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-1.5">
                      {Array.from({ length: Math.min(task.team, 3) }).map((_, i) => (
                        <div 
                          key={i}
                          className="w-5 h-5 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full border-2 border-white flex items-center justify-center"
                        >
                          <span className="text-xs text-white font-medium">
                            {String.fromCharCode(65 + i)}
                          </span>
                        </div>
                      ))}
                      {task.team > 3 && (
                        <div className="w-5 h-5 bg-gray-200 border-2 border-white rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-600">+{task.team - 3}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-600">{task.team} members</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
         <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Todo</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Tasks to complete</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                    todo.completed 
                      ? "bg-emerald-50 border-emerald-200" 
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      todo.completed
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-gray-300 hover:border-emerald-500"
                    }`}
                  >
                    {todo.completed && (
                      <CheckCircle className="h-3 w-3 text-white" />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          todo.completed
                            ? "text-emerald-700 line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {todo.task}
                      </span>
                      <Badge
                        className={`text-xs px-2 py-1 ${
                          todo.priority === "high"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : todo.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {todo.priority}
                      </Badge>
                    </div>
                    
                    {/* Icons for specific tasks */}
                    <div className="flex items-center gap-1 mt-1">
                      {todo.task.includes("Meeting") && <Calendar className="h-3 w-3 text-gray-400" />}
                      {todo.task.includes("Chat") && <MessageSquare className="h-3 w-3 text-gray-400" />}
                      {todo.task.includes("Call") && <Phone className="h-3 w-3 text-gray-400" />}
                      {todo.task.includes("Payroll") && <CreditCard className="h-3 w-3 text-gray-400" />}
                      {todo.task.includes("Policy") && <FileCheck className="h-3 w-3 text-gray-400" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-bold text-blue-600">
                  {todos.filter(t => t.completed).length}/{todos.length}
                </span>
              </div>
              <Progress
                value={(todos.filter(t => t.completed).length / todos.length) * 100}
                className="mt-2 h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 5: Projects Overview Table */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm mb-6 sm:mb-8">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Projects Overview</CardTitle>
            <CardDescription className="text-gray-600 mt-1">Total Tasks: 124/165</CardDescription>
          </div>
          <Link to="/projects">
            <Button variant="outline" size="sm" className="rounded-xl">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-900">ID</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Name</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Team</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Progress</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Deadline</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Priority</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{project.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 ring-2 ring-gray-100">
                          <AvatarImage src={project.avatar} />
                          <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            {project.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900 truncate max-w-[200px]">{project.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex -space-x-2">
                        {project.teamMembers.slice(0, 3).map((member, i) => (
                          <Avatar
                            key={i}
                            className="h-8 w-8 border-2 border-white ring-1 ring-gray-200"
                          >
                            <AvatarFallback className="text-xs bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                              {member.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.teamMembers.length > 3 && (
                          <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white ring-1 ring-gray-200">
                            +{project.teamMembers.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="w-24">
                        <Progress
                          value={
                            (parseInt(project.hours.split("/")[0]) /
                              parseInt(project.hours.split("/")[1])) *
                            100
                          }
                          className="h-2"
                        />
                        <span className="text-xs text-gray-600 block mt-1 font-medium">
                          {project.hours} Hrs
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700 font-medium">{project.deadline}</td>
                    <td className="p-4">
                      <Badge
                        className={`font-medium px-3 py-1 rounded-full ${
                          project.priority === "High"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : project.priority === "Medium"
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {project.priority}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProject(project)}
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
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
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <p className="text-sm text-gray-700 font-medium">
              <span className="font-semibold">389/689 hrs</span> - Spent on Overall Tasks This Week
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Row 6: Job Applicants List & Invoices */}
      <div className="grid gap-6 md:grid-cols-2 mb-6 sm:mb-8">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Job Applicants</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Recent applications</CardDescription>
            </div>
            <Link to="/Candidates">
              <Button variant="outline" size="sm" className="rounded-xl">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {jobApplicants.map((applicant, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100"
                >
                  <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                    <AvatarImage src={applicant.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                      {applicant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{applicant.name}</p>
                    <p className="text-xs text-gray-600 truncate">{applicant.role}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {applicant.experience} • {applicant.location}
                    </p>
                  </div>
                  <Eye className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Invoices</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Recent invoices</CardDescription>
            </div>
            <Link to="/invoices">
              <Button variant="outline" size="sm" className="rounded-xl">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-gray-100">
                    <AvatarImage src={invoice.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                      {invoice.client.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">{invoice.name}</p>
                        <p className="text-xs text-gray-600 truncate">
                          #{invoice.id} • {invoice.client}
                        </p>
                      </div>
                      <div className="text-right ml-3">
                        <p className="font-bold text-sm text-gray-900">{invoice.amount}</p>
                        <Badge
                          className={`text-xs mt-1 font-medium px-2 py-1 rounded-full ${
                            invoice.status === "Paid" 
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                              : "bg-orange-100 text-orange-700 border-orange-200"
                          }`}
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
      <div className="grid gap-6 lg:grid-cols-3 mb-6 sm:mb-8">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Schedules</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Upcoming interviews</CardDescription>
            </div>
            <Link to="/shift-schedule">
              <Button variant="outline" size="sm" className="rounded-xl">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedules.map((schedule, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <h4 className="font-bold text-gray-900 text-sm">{schedule.position}</h4>
                        </div>
                        <p className="text-sm text-gray-700 mb-2 leading-relaxed">{schedule.event}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                          <Calendar className="h-3 w-3" />
                          <span className="font-medium">{schedule.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-blue-100">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {schedule.teamMembers.slice(0, 3).map((avatar, i) => (
                            <Avatar key={i} className="h-7 w-7 border-2 border-white shadow-sm">
                              <AvatarImage src={avatar} />
                              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-xs">
                                {String.fromCharCode(65 + i)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {schedule.teamMembers.length > 3 && (
                            <div className="h-7 w-7 bg-gradient-to-r from-gray-200 to-gray-300 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                              <span className="text-xs font-bold text-gray-700">+{schedule.teamMembers.length - 3}</span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">{schedule.teamMembers.length} members</span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Clock className="h-3 w-3 text-blue-500" />
                          <span className="text-xs font-bold text-blue-600">{schedule.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Recent Activities</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Latest updates</CardDescription>
            </div>
            <Link to="/help/activities">
              <Button variant="outline" size="sm" className="rounded-xl">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.slice(0, 5).map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0"
                >
                  <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-gray-100">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold text-gray-900">{activity.user}</span>{" "}
                      <span className="text-gray-600">{activity.action}</span>{" "}
                      <span className="font-medium text-gray-900">{activity.details}</span>
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Birthdays</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Upcoming celebrations</CardDescription>
            </div>
            
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {birthdays.map((birthday, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100"
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 ring-2 ring-purple-200">
                      <AvatarImage src={birthday.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                        {birthday.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 text-yellow-400">
                      🎂
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{birthday.name}</p>
                    <p className="text-xs text-gray-600 truncate">{birthday.role}</p>
                    <p className="text-xs text-purple-600 font-medium">{birthday.date}</p>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs px-3 py-1 rounded-lg shadow-sm">
                    Send Wish
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold text-gray-900">Add New Project</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Create a new project for your team</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleProjectSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Project ID</Label>
                    <Input
                      value={projectForm.projectId}
                      readOnly
                      className="bg-gray-50 border-gray-200 rounded-lg font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Upload Project Logo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "logo")}
                      className="border-gray-200 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700"
                    />
                    <p className="text-xs text-gray-500">Image should be below 4 MB</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Project Name</Label>
                  <Input
                    placeholder="Enter project name"
                    value={projectForm.projectName}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        projectName: e.target.value,
                      }))
                    }
                    className="border-gray-200 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Client</Label>
                    <Input
                      placeholder="Enter client name"
                      value={projectForm.client}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          client: e.target.value,
                        }))
                      }
                      className="border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Priority</Label>
                    <Select
                      value={projectForm.priority}
                      onValueChange={(value) =>
                        setProjectForm((prev) => ({ ...prev, priority: value }))
                      }
                    >
                      <SelectTrigger className="border-gray-200 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Start Date</Label>
                    <Input 
                      type="date"
                      value={projectForm.startDate}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      className="border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">End Date</Label>
                    <Input
                      type="date"
                      value={projectForm.endDate}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                      className="border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Team Members</Label>
                  <Input
                    placeholder="Add team members (comma separated)"
                    value={projectForm.members.join(", ")}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        members: e.target.value.split(", "),
                      }))
                    }
                    className="border-gray-200 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Description</Label>
                  <Textarea
                    placeholder="Project description"
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={4}
                    className="border-gray-200 rounded-lg"
                  />
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-100">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-lg"
                  >
                    Create Project
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddProject(false)}
                    className="flex-1 border-gray-200 rounded-lg"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold text-gray-900">Edit Project</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Update project details</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleProjectSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Project ID</Label>
                    <Input
                      value={projectForm.projectId}
                      readOnly
                      className="bg-gray-50 border-gray-200 rounded-lg font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Upload Project Logo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "logo")}
                      className="border-gray-200 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-50 file:text-orange-700"
                    />
                    <p className="text-xs text-gray-500">Image should be below 4 MB</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Project Name</Label>
                  <Input
                    placeholder="Enter project name"
                    value={projectForm.projectName}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        projectName: e.target.value,
                      }))
                    }
                    className="border-gray-200 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Client</Label>
                    <Input
                      placeholder="Enter client name"
                      value={projectForm.client}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          client: e.target.value,
                        }))
                      }
                      className="border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Priority</Label>
                    <Select
                      value={projectForm.priority}
                      onValueChange={(value) =>
                        setProjectForm((prev) => ({ ...prev, priority: value }))
                      }
                    >
                      <SelectTrigger className="border-gray-200 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Start Date</Label>
                    <Input
                      type="date"
                      value={projectForm.startDate}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      className="border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">End Date</Label>
                    <Input
                      type="date"
                      value={projectForm.endDate}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                      className="border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Team Members</Label>
                  <Input
                    placeholder="Add team members (comma separated)"
                    value={projectForm.members.join(", ")}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        members: e.target.value.split(", "),
                      }))
                    }
                    className="border-gray-200 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Description</Label>
                  <Textarea
                    placeholder="Project description"
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={4}
                    className="border-gray-200 rounded-lg"
                  />
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-100">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-lg shadow-lg"
                  >
                    Update Project
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowEditProject(false);
                      setEditingProject(null);
                    }}
                    className="flex-1 border-gray-200 rounded-lg"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold text-gray-900">Add Leave Request</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Submit new leave request</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleLeaveSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Employee Name</Label>
                  <Input
                    placeholder="Enter employee name"
                    value={leaveForm.employeeName}
                    onChange={(e) =>
                      setLeaveForm((prev) => ({
                        ...prev,
                        employeeName: e.target.value,
                      }))
                    }
                    className="border-gray-200 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Leave Type</Label>
                  <Select
                    value={leaveForm.leaveType}
                    onValueChange={(value) =>
                      setLeaveForm((prev) => ({ ...prev, leaveType: value }))
                    }
                  >
                    <SelectTrigger className="border-gray-200 rounded-lg">
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      <SelectItem value="Sick">Sick Leave</SelectItem>
                      <SelectItem value="Casual">Casual Leave</SelectItem>
                      <SelectItem value="Annual">Annual Leave</SelectItem>
                      <SelectItem value="Maternity">Maternity Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">From Date</Label>
                    <Input
                      type="date"
                      value={leaveForm.fromDate}
                      onChange={(e) =>
                        setLeaveForm((prev) => ({
                          ...prev,
                          fromDate: e.target.value,
                        }))
                      }
                      className="border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">To Date</Label>
                    <Input
                      type="date"
                      value={leaveForm.toDate}
                      onChange={(e) =>
                        setLeaveForm((prev) => ({
                          ...prev,
                          toDate: e.target.value,
                        }))
                      }
                      className="border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">No of Days</Label>
                    <Input
                      type="number"
                      value={leaveForm.noOfDays}
                      onChange={(e) =>
                        setLeaveForm((prev) => ({
                          ...prev,
                          noOfDays: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="text-right border-gray-200 rounded-lg font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Remaining Days</Label>
                    <Input
                      type="number"
                      value={leaveForm.remainingDays}
                      readOnly
                      className="bg-gray-50 text-right border-gray-200 rounded-lg font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Reason</Label>
                  <Textarea
                    placeholder="Enter reason for leave"
                    value={leaveForm.reason}
                    onChange={(e) =>
                      setLeaveForm((prev) => ({
                        ...prev,
                        reason: e.target.value,
                      }))
                    }
                    rows={4}
                    className="border-gray-200 rounded-lg"
                  />
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-100">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg shadow-lg"
                  >
                    Submit Request
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddLeave(false)}
                    className="flex-1 border-gray-200 rounded-lg"
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