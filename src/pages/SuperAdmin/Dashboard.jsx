"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./../../components/ui/card"
import { Badge } from "./../../components/ui/badge"
import { Button } from "./../../components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"
import { 
  Users, 
  FileText, 
  User, 
  Briefcase, 
  Building2,
  DollarSign,
  TrendingUp,
  Calendar,
  Mail,
  Bell,
  Eye,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Globe,
  Plus,
  Star
} from "lucide-react"
 
const statsData = [
  { 
    title: "Total Companies", 
    value: "5468", 
    change: "+6% 5 Companies from last month", 
    icon: Building2, 
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  { 
    title: "Active Companies", 
    value: "4598", 
    change: "+2.1% from last month", 
    icon: CheckCircle2, 
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  { 
    title: "Total Subscribers", 
    value: "3698", 
    change: "+8.2% from last month", 
    icon: Users, 
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  { 
    title: "Total Earnings", 
    value: "$89,878,58", 
    change: "+40% increased from last year", 
    icon: DollarSign, 
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
]

// Revenue data for chart
const revenueData = [
  { name: "Jan", revenue: 45000, companies: 120 },
  { name: "Feb", revenue: 52000, companies: 145 },
  { name: "Mar", revenue: 48000, companies: 132 },
  { name: "Apr", revenue: 61000, companies: 168 },
  { name: "May", revenue: 55000, companies: 156 },
  { name: "Jun", revenue: 67000, companies: 189 },
  { name: "Jul", revenue: 45787, companies: 203 }
]

// Top Plans data
const topPlansData = [
  { name: "Basic", value: 60, color: "#3B82F6" },
  { name: "Premium", value: 20, color: "#10B981" },
  { name: "Enterprise", value: 20, color: "#F59E0B" }
]

// Recent Transactions data
const recentTransactions = [
  {
    id: 1,
    company: "Stellar Dynamics",
    transactionId: "#1245714",
    date: "Jan 2025",
    amount: "+$245",
    plan: "Basic (Monthly)",
    status: "completed",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-02.svg"
  },
  {
    id: 2,
    company: "Quantum Nexus", 
    transactionId: "#659741",
    date: "14 Jan 2025",
    amount: "+$395",
    plan: "Enterprise (Yearly)",
    status: "completed",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-03.svg"
  },
  {
    id: 3,
    company: "Aurora Technologies",
    transactionId: "#224571",
    date: "4 Jan 2025", 
    amount: "+$145",
    plan: "Advanced (Monthly)",
    status: "completed",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-05.svg"
  },
  {
    id: 4,
    company: "TerraFusion Energy",
    transactionId: "#434121",
    date: "4 Jan 2025",
    amount: "+$145", 
    plan: "Enterprise (Monthly)",
    status: "completed",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-07.svg"
  },
  {
    id: 5,
    company: "Epicurean Delights",
    transactionId: "#435671",
    date: "4 Jan 2025",
    amount: "+$977",
    plan: "Premium (Yearly)",
    status: "completed",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-08.svg"
  }
]

// Recently Registered companies
const recentlyRegistered = [
  {
    id: 1,
    company: "Pitch",
    plan: "Basic (Monthly)",
    users: "150 Users",
    domain: "pitch.example.com",
    status: "active",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/icons/company-icon-11.svg"
  },
  {
    id: 2,
    company: "Initech",
    plan: "Enterprise (Yearly)", 
    users: "200 Users",
    domain: "initech.example.com",
    status: "active",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/icons/company-icon-12.svg"
  },
  {
    id: 3,
    company: "Umbrella Corp",
    plan: "Advanced (Monthly)",
    users: "129 Users", 
    domain: "umbcorp.example.com",
    status: "active",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/icons/company-icon-13.svg"
  },
  {
    id: 4,
    company: "Capital Partners",
    plan: "Enterprise (Monthly)",
    users: "103 Users",
    domain: "capitalpart.example.com", 
    status: "active",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/icons/company-icon-14.svg"
  },
  {
    id: 5,
    company: "Massive Dynamic",
    plan: "Premium (Yearly)",
    users: "108 Users",
    domain: "msdynamic.example.com",
    status: "active",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/icons/company-icon-15.svg"
  }
]

// Recent Plan Expired
const expiredPlans = [
  {
    id: 1,
    company: "Silicon Corp",
    expired: "10 Apr 2025",
    plan: "Basic (Monthly)",
    domain: "silicon.example.com",
    status: "expired",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/icons/company-icon-16.svg"
  },
  {
    id: 2,
    company: "Hubspot", 
    expired: "12 Jun 2025",
    plan: "Enterprise (Yearly)",
    domain: "hubspot.example.com",
    status: "expired",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/icons/company-icon-14.svg"
  },
  {
    id: 3,
    company: "Licon Industries",
    expired: "16 Jun 2025",
    plan: "Advanced (Monthly)",
    domain: "licon.example.com", 
    status: "expired",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/icons/company-icon-18.svg"
  },
  {
    id: 4,
    company: "TerraFusion Energy",
    expired: "12 May 2025",
    plan: "Enterprise (Monthly)",
    domain: "fusion.example.com",
    status: "expired",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-07.svg"
  },
  {
    id: 5,
    company: "Epicurean Delights",
    expired: "15 May 2025", 
    plan: "Premium (Yearly)",
    domain: "epicuran.example.com",
    status: "expired",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-08.svg"
  }
]

export default function SuperDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month")

  const sendReminder = (companyId) => {
     
    console.log(`Sending reminder to company ID: ${companyId}`)
   
  }

  return (
    <div className="min-h-screen  p-6 space-y-6">
      {/*   Welcome Banner */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <CardContent className="relative p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Building2 className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">Welcome Back, Adrian</h1>
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    <span className="text-orange-100 font-medium">14 New Companies Subscribed Today !!!</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                onClick={() => window.open('/super-admin/companies', '_self')}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Companies
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white/50 hover:bg-white/10 bg-transparent backdrop-blur-sm"
                onClick={() => window.open('/super-admin/packages', '_self')}
              >
                <FileText className="h-4 w-4 mr-2" />
                All Packages
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/*   Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 group-hover:from-gray-50 group-hover:to-white transition-all duration-300"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-full ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Revenue and Top Plans Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                Revenue
              </CardTitle>
              <p className="text-2xl font-bold text-orange-500 mt-2">$45,787</p>
              <p className="text-sm text-green-600 font-medium">+40% increased from last year</p>
            </div>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#F97316" 
                    strokeWidth={3}
                    dot={{ fill: '#F97316', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#F97316' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Plans */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Top Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topPlansData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {topPlansData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {topPlansData.map((plan, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: plan.color }}
                    ></div>
                    <span className="font-medium">{plan.name}</span>
                  </div>
                  <Badge variant="outline" className="font-bold">
                    {plan.value}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions and Recently Registered */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Recent Transactions
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 hover:text-blue-700"
              onClick={() => window.open('/super-admin/purchase-transaction', '_self')}
            >
              <Eye className="h-4 w-4 mr-1" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={transaction.logo} 
                      alt={transaction.company}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0Y5FAFBQSI+PC9yZWN0Pgo8cGF0aCBkPSJNMTIgMTZIMjhWMjRIMTJWMTZaIiBmaWxsPSIjNjY2NjY2Ij48L3BhdGg+CjwvcmVnPg=='
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate mb-1">
                      {transaction.company}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      {transaction.transactionId} • {transaction.date}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {transaction.plan}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{transaction.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recently Registered */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-500" />
              Recently Registered
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 hover:text-blue-700"
              onClick={() => window.open('/super-admin/purchase-transaction', '_self')}
            >
              <Eye className="h-4 w-4 mr-1" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentlyRegistered.map((company) => (
                <div key={company.id} className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <img 
                      src={company.logo} 
                      alt={company.company}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzMzODVGRiI+PC9yZWN0Pgo8cGF0aCBkPSJNMTIgMTZIMjhWMjRIMTJWMTZaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPgo8L3N2Zz4K'
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                        {company.company}
                      </h4>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        New
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{company.plan}</p>
                    <p className="text-sm text-gray-500 mb-1">{company.users}</p>
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-blue-600">{company.domain}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Plan Expired */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Recent Plan Expired
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-600 hover:text-blue-700"
            onClick={() => window.open('/super-admin/purchase-transaction', '_self')}
          >
            <Eye className="h-4 w-4 mr-1" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {expiredPlans.map((expired) => (
              <div key={expired.id} className="p-4 bg-red-50 border border-red-200 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <img 
                      src={expired.logo} 
                      alt={expired.company}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0VGNDQ0NCI+PC9yZWN0Pgo8cGF0aCBkPSJNMTIgMTZIMjhWMjRIMTJWMTZaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPgo8L3N2Zz4K'
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{expired.company}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-red-600 mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">Expired: {expired.expired}</span>
                </div>
                <Badge variant="outline" className="border-red-300 text-red-700 text-xs mb-3 block w-fit">
                  {expired.plan}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                  <Globe className="h-3 w-3" />
                  <span className="truncate">{expired.domain}</span>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-xs"
                  onClick={() => sendReminder(expired.id)}
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Send Reminder
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}