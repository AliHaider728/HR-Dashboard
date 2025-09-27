 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  Cell,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  XCircle,
  Zap,
  MessageCircle,
  Mail as MailIcon,
  Download,
  Plus,
  Search,
  Filter,
  Eye,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

// Define dealsByStageData (Fix for missing data)
const dealsByStageData = [
  { stage: "Qualification", deals: 50, color: "#3B82F6" },
  { stage: "Proposal", deals: 30, color: "#10B981" },
  { stage: "Negotiation", deals: 25, color: "#F59E0B" },
  { stage: "Closed", deals: 15, color: "#EF4444" },
];

export default function DealsDashboard() {
  const [timeRange, setTimeRange] = useState("this_month");
  const [activeTab, setActiveTab] = useState("all");
  const [timeFrame, setTimeFrame] = useState("This Month"); // Initialize with string value
  const timeOptions = ["This Month", "This Week", "Last Week"];

  // Stats Cards Data
  const dealsStats = [
    {
      title: "Total Deals",
      value: "126",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Won Deals",
      value: "86",
      change: "+8.3%",
      trend: "up",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Deals",
      value: "32",
      change: "-2.1%",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Lost Deals",
      value: "8",
      change: "+1.2%",
      trend: "up",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  // Top Deals Section Data
  const topDealsData = [
    {
      category: "Marketing",
      amount: 569877,
      icon: Zap,
      color: "bg-purple-100 text-purple-600",
      trend: "+12.5%",
    },
    {
      category: "Chat",
      amount: 484575,
      icon: MessageCircle,
      color: "bg-blue-100 text-blue-600",
      trend: "+8.3%",
    },
    {
      category: "Email",
      amount: 184575,
      icon: MailIcon,
      color: "bg-green-100 text-green-600",
      trend: "+5.2%",
    },
  ];

  const formatINRCurrency = (value) =>
    value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  // Deals by Country
  const dealsByCountry = [
    {
      country: "USA",
      flag: "https://smarthr.co.in/demo/html/template/assets/img/payment-gateway/country-01.svg",
      deals: 350,
      totalValue: 1065, // Store as number
      svgPoints:
        "0 19.5 15.52 0.5 31.04 19.5 46.57 6.83 62.09 13.16 77.61 0.5 93.14 13.16",
      isRed: false,
    },
    {
      country: "UAE",
      flag: "https://smarthr.co.in/demo/html/template/assets/img/payment-gateway/country-02.svg",
      deals: 221,
      totalValue: 966,
      svgPoints: "0 19 10 10 20 12 30 6 40 14 50 8 60 15",
      isRed: false,
    },
    {
      country: "Singapore",
      flag: "https://smarthr.co.in/demo/html/template/assets/img/payment-gateway/country-03.svg",
      deals: 236,
      totalValue: 959,
      svgPoints: "0 18 10 8 20 14 30 4 40 13 50 9 60 13",
      isRed: true,
    },
    {
      country: "France",
      flag: "https://smarthr.co.in/demo/html/template/assets/img/payment-gateway/country-04.svg",
      deals: 589,
      totalValue: 879,
      svgPoints:
        "0 19.5 15.52 0.5 31.04 19.5 46.57 6.83 62.09 13.16 77.61 0.5 93.14 13.16",
      isRed: false,
    },
    {
      country: "Norway",
      flag: "https://smarthr.co.in/demo/html/template/assets/img/payment-gateway/country-05.svg",
      deals: 221,
      totalValue: 632,
      svgPoints:
        "0 19.5 15.52 0.5 31.04 19.5 46.57 6.83 62.09 13.16 77.61 0.5 93.14 13.16",
      isRed: true,
    },
  ];

  function SparklineSVG({
    points,
    fillColor = "#D2F5E1",
    lineColor = "#1CCE6B",
  }) {
    return (
      <svg
        width="100%"
        height="20"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <polygon points={`0 19.5 ${points} 93.14 19.5`} fill={fillColor} />
        <polyline
          fill="none"
          stroke={lineColor}
          strokeWidth="1"
          strokeLinecap="square"
          points={points}
        />
      </svg>
    );
  }

  // Won Deals Stage Data
  const wonDealsStage = {
    total: 4589979, // Store as number
    stages: [
      { name: "Conversion", value: 48, color: "#3B82F6" },
      { name: "Calls", value: 24, color: "#10B981" },
      { name: "Email", value: 39, color: "#8B5CF6" },
      { name: "Chats", value: 20, color: "#F59E0B" },
    ],
  };

  // Recent Follow Up Data
  const recentFollowUp = [
    {
      name: "Alexander Jermai",
      role: "UI/UX Designer",
      avatar:
        "https://smarthr.co.in/demo/html/template/assets/img/users/user-27.jpg",
      status: "active",
    },
    {
      name: "Doglas Martini",
      role: "Product Designer",
      avatar:
        "https://smarthr.co.in/demo/html/template/assets/img/users/user-42.jpg",
      status: "active",
    },
    {
      name: "Daniel Esbella",
      role: "Project Manager",
      avatar:
        "https://smarthr.co.in/demo/html/template/assets/img/users/user-43.jpg",
      status: "away",
    },
    {
      name: "Daniel Esbella",
      role: "Team Lead",
      avatar:
        "https://smarthr.co.in/demo/html/template/assets/img/users/user-11.jpg",
      status: "active",
    },
    {
      name: "Stephan Peralt",
      role: "Team Lead",
      avatar:
        "https://smarthr.co.in/demo/html/template/assets/img/users/user-44.jpg",
      status: "busy",
    },
  ];

  const stageData = [
    {
      label: "Conversion",
      percent: 48,
      width: "w-[150px]",
      height: "h-[150px]",
      position: "relative",
      bg: "bg-[#3B7080] border border-[#3B7080]",
      z: "z-[1]",
    },
    {
      label: "Calls",
      percent: 24,
      width: "w-[85px]",
      height: "h-[85px]",
      position: "absolute right-5 top-0",
      bg: "bg-[#E70D0D] border border-[#E70D0D]",
      z: "z-[2]",
    },
    {
      label: "Email",
      percent: 39,
      width: "w-[110px]",
      height: "h-[110px]",
      position: "absolute right-[-40px] top-1/2 transform -translate-y-1/2",
      bg: "bg-[#FFC107] border border-[#FFC107]",
      z: "z-[3]",
    },
    {
      label: "Chats",
      percent: 20,
      width: "w-[95px]",
      height: "h-[95px]",
      position: "absolute right-[30px] bottom-0",
      bg: "bg-[#03C95A] border border-[#03C95A]",
      z: "z-[2]",
    },
  ];

  // Revenue Chart Data
  const revenueData = [
    { month: "Jan", revenue: 65, profit: 45 },
    { month: "Feb", revenue: 78, profit: 52 },
    { month: "Mar", revenue: 82, profit: 58 },
    { month: "Apr", revenue: 75, profit: 50 },
    { month: "May", revenue: 88, profit: 62 },
    { month: "Jun", revenue: 92, profit: 68 },
    { month: "Jul", revenue: 85, profit: 60 },
    { month: "Aug", revenue: 96, profit: 72 },
    { month: "Sep", revenue: 104, profit: 78 },
    { month: "Oct", revenue: 98, profit: 70 },
    { month: "Nov", revenue: 112, profit: 85 },
    { month: "Dec", revenue: 126, profit: 95 },
  ];

  //Deals By Compaines
  const dealsByCompanies = [
    {
      img: "https://smarthr.co.in/demo/html/template/assets/img/company/company-24.svg",
      title: "Pitch",
      description: "Closing Deal date 05 April, 2025",
      amount: 3655,
    },
    {
      img: "https://smarthr.co.in/demo/html/template/assets/img/company/company-25.svg",
      title: "Initech",
      description: "Closing Deal date 05 May, 2025",
      amount: 2185,
    },
    {
      img: "https://smarthr.co.in/demo/html/template/assets/img/company/company-26.svg",
      title: "Umbrella Corp",
      description: "Closing Deal date 29 April, 2025",
      amount: 1583,
    },
    {
      img: "https://smarthr.co.in/demo/html/template/assets/img/company/company-27.svg",
      title: "Capital Partners",
      description: "Closing Deal date 23 Mar, 2025",
      amount: 6584,
    },
    {
      img: "https://smarthr.co.in/demo/html/template/assets/img/company/company-28.svg",
      title: "Massive Dynamic",
      description: "Closing Deal date 23 Feb, 2025",
      amount: 2153,
    },
  ];

  const formatUSD = (value) => `$${value.toLocaleString("en-US")}`;

  // Recent Deals Table Data
  const recentDeals = [
    {
      id: "#DEAL-001",
      company: "TechCorp Solutions",
      contact: "John Smith",
      value: 45000, // Store as number
      stage: "Proposal",
      priority: "High",
      probability: "75%",
      lastContact: "2 hours ago",
    },
    {
      id: "#DEAL-002",
      company: "Global Innovations",
      contact: "Sarah Johnson",
      value: 32500,
      stage: "Negotiation",
      priority: "Medium",
      probability: "60%",
      lastContact: "4 hours ago",
    },
    {
      id: "#DEAL-003",
      company: "NextGen Tech",
      contact: "Mike Davis",
      value: 28000,
      stage: "Qualification",
      priority: "High",
      probability: "45%",
      lastContact: "1 day ago",
    },
  ];

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const config = {
      active: "bg-green-100 text-green-800",
      away: "bg-yellow-100 text-yellow-800",
      busy: "bg-red-100 text-red-800",
    };
    return <Badge className={config[status]}>{status}</Badge>;
  };

  // Format currency for display
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50/30 p-6 space-y-6 space-x-7">
      {/* Header Section */}
      <div className="flex flex-col ml-8 sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Deals Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Welcome back, John! Here's what's happening with your deals today.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-sm"
              size="sm"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-sm"
              size="sm"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 text-sm"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            Add New Deal
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dealsStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        from last month
                      </span>
                    </div>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Top Deals, Status, Marketing Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-6">
        {/* Top Deals */}
        <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Deals by Stage
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 mt-1">
                  Performance by Category
                </CardDescription>
              </div>
              <select
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {timeOptions.map((opt, i) => (
                  <option key={i} value={opt} className="text-gray-700">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Centered image */}
            <div className="flex justify-center mb-6">
              <img
                src="/TopDeals.png"
                alt="Top Deals Chart"
                className="w-full max-w-[300px] h-[200px] object-contain"
              />
            </div>

            {/* Status section */}
            <div className="text-center mb-6">
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                Status  
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-md">
                  <span className="text-sm font-medium text-gray-700">
                    Chat
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ₹4,84,575
                  </span>
                </div>
                <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-md">
                  <span className="text-sm font-medium text-gray-700">
                    Email
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ₹1,84,575
                  </span>
                </div>
                <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-md">
                  <span className="text-sm font-medium text-gray-700">
                    Marketing
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ₹5,69,877
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
          <div className="flex justify-between items-center">  <CardTitle className="md:text-base ">Deals By Companies</CardTitle>
           <select
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {timeOptions.map((opt, i) => (
                  <option key={i} value={opt} className="text-gray-700">
                    {opt}
                  </option>
                ))}
              </select></div>
            
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dealsByCompanies.map((company, i) => (
                <div
                  key={i}
                  className="flex justify-between  items-center p-3 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={company.img}
                      alt={company.title}
                      className="w-12 h-12 object-contain rounded"
                    />
                    <div>
                      <p className="font-semibold text-base text-gray-900">
                        {company.title}
                      </p>
                      <p className="text-[12px] font-semibold font-sans text-gray-500">
                        {company.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {formatUSD(company.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status - Won Deals Stage */}
        <Card className="w-full max-w-xl">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Won Deals Stage</CardTitle>
                <CardDescription>Sales Pipeline</CardDescription>
              </div>
              <select
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                className="border text-sm rounded px-2 py-1 focus:outline-none"
              >
                {timeOptions.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </CardHeader>

          <CardContent>
            <div className="relative mt-5 w-[235px] h-[235px] ml-2.5 mx-auto flex items-center justify-center z-10 ">
              {stageData.map((stage, idx) => (
                <div
                  key={idx}
                  className={`
                    ${stage.width} ${stage.height}
                    ${stage.position}
                    ${stage.bg}
                    ${stage.z}
                    rounded-full flex flex-col items-center justify-center text-white text-center text-xs font-medium
                  `}
                >
                  <div>{stage.label}</div>
                  <div className="text-base font-bold">{stage.percent}%</div>
                </div>
              ))}
            </div>

            <div className="mt-14 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Stages Won This Year</span>
                <span className="font-semibold">
                  {formatCurrency(wonDealsStage.total)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Stages Won Last Year</span>
                <span className="font-semibold">{formatCurrency(3245865)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Marketing - Recent Follow Up */}
        <Card>
          <CardHeader>
           <div className="flex justify-between items-center "><div className=""> <CardTitle className="text-base">Recent Follow Up</CardTitle>
            <CardDescription className="text-sm">Team members to follow up with</CardDescription></div>
           <NavLink to="/Candidates" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:scale-105 duration-300 transition-all hover:shadow-lg">View all</NavLink>

            
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFollowUp.map((person, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback>
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{person.name}</p>
                      <p className="text-sm text-gray-600">{person.role}</p>
                    </div>
                  </div>
                  <StatusBadge status={person.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deal by Country */}
        <Card > 
          <CardHeader>
           <div className="justify-between flex items-center"> <div className=""><CardTitle className="text-base" >Deals by Country</CardTitle>
            <CardDescription className="md:text-sm" >Performance by region</CardDescription></div>
            <NavLink to="/content/locations/countries" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:scale-105 duration-300 transition-all hover:shadow-lg">View all</NavLink>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 ">
            {dealsByCountry.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border p-4 rounded-md"
              >
                <div className="flex items-start gap-3 w-1/3">
                  <img
                    src={item.flag}
                    alt={item.country}
                    className="w-8 h-8 rounded-sm"
                  />
                  <div>
                    <p className="font-semibold">{item.country}</p>
                    <p className="text-sm text-muted-foreground">
                      Deals: {item.deals}
                    </p>
                  </div>
                </div>
                <div className="w-1/3 px-2">
                  <SparklineSVG
                    points={item.svgPoints}
                    fillColor={item.isRed ? "#FCDDDD" : "#D2F5E1"}
                    lineColor={item.isRed ? "#FF4D4F" : "#1CCE6B"}
                  />
                </div>
                <div className="text-right w-1/3">
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(item.totalValue)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue performance</CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this_week">This Week</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
                <SelectItem value="this_quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10B981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deals by Stage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Deals by Stage</CardTitle>
            <CardDescription>
              Distribution across pipeline stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dealsByStageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="deals" radius={[4, 4, 0, 0]}>
                  {dealsByStageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {dealsByStageData.map((stage, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="text-sm font-medium">{stage.stage}</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {stage.deals} deals
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Deals Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Recent Deals</CardTitle>
              <CardDescription>
                Latest deal activities and status
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search deals..."
                  className="pl-10 w-[200px]"
                />
              </div>
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Deals</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal ID</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.id}</TableCell>
                  <TableCell className="font-semibold">
                    {deal.company}
                  </TableCell>
                  <TableCell>{deal.contact}</TableCell>
                  <TableCell className="font-bold">
                    {formatCurrency(deal.value)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{deal.stage}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        deal.priority === "High" ? "destructive" : "secondary"
                      }
                    >
                      {deal.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Progress
                      value={parseInt(deal.probability)}
                      className="h-2 w-16"
                    />
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {deal.lastContact}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
