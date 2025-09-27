"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Building2, Users, DollarSign, TrendingUp, Package, Globe, CreditCard, ShoppingCart } from "lucide-react"

const superAdminStats = [
  { title: "Total Companies", value: "1,432", change: "+12.5%", icon: Building2, color: "text-blue-600" },
  { title: "Active Users", value: "8,945", change: "+8.2%", icon: Users, color: "text-green-600" },
  { title: "Revenue", value: "$89,678.58", change: "+15.3%", icon: DollarSign, color: "text-purple-600" },
  { title: "Growth", value: "23.5%", change: "+2.1%", icon: TrendingUp, color: "text-orange-600" },
]

const revenueData = [
  { month: "Jan", revenue: 45000, subscriptions: 120 },
  { month: "Feb", revenue: 52000, subscriptions: 135 },
  { month: "Mar", revenue: 48000, subscriptions: 128 },
  { month: "Apr", revenue: 61000, subscriptions: 152 },
  { month: "May", revenue: 55000, subscriptions: 145 },
  { month: "Jun", revenue: 67000, subscriptions: 168 },
]

const planDistribution = [
  { name: "Basic", value: 45, color: "#3B82F6" },
  { name: "Professional", value: 35, color: "#10B981" },
  { name: "Enterprise", value: 20, color: "#F59E0B" },
]

const recentTransactions = [
  {
    id: 1,
    company: "Stellar Dynamics",
    plan: "Enterprise",
    amount: "$299.00",
    status: "completed",
    date: "2 mins ago",
  },
  {
    id: 2,
    company: "Quantum Nexus",
    plan: "Professional",
    amount: "$99.00",
    status: "completed",
    date: "5 mins ago",
  },
  {
    id: 3,
    company: "Acme Technologies",
    plan: "Basic",
    amount: "$29.00",
    status: "pending",
    date: "8 mins ago",
  },
]

const topPlans = [
  {
    name: "Enterprise Plan",
    subscribers: 245,
    revenue: "$73,255",
    growth: "+12%",
    color: "bg-blue-500",
  },
  {
    name: "Professional Plan",
    subscribers: 189,
    revenue: "$18,711",
    growth: "+8%",
    color: "bg-green-500",
  },
  {
    name: "Basic Plan",
    subscribers: 156,
    revenue: "$4,524",
    growth: "+5%",
    color: "bg-yellow-500",
  },
]

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome Back, Super Admin</h1>
              <p className="text-indigo-100">Monitor and manage all company subscriptions and revenue</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                Add Company
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white hover:text-indigo-500 bg-transparent"
              >
                View Reports
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {superAdminStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {planDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Transactions
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {transaction.company.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.company}</p>
                      <p className="text-sm text-gray-600">{transaction.plan}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{transaction.amount}</p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={transaction.status === "completed" ? "default" : "secondary"}
                        className={transaction.status === "completed" ? "bg-green-500" : ""}
                      >
                        {transaction.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{transaction.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Plans */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Top Plans
              <Button variant="ghost" size="sm">
                Manage Plans
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPlans.map((plan, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-12 ${plan.color} rounded-full`}></div>
                    <div>
                      <p className="font-medium">{plan.name}</p>
                      <p className="text-sm text-gray-600">{plan.subscribers} subscribers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{plan.revenue}</p>
                    <p className="text-sm text-green-600">{plan.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-gray-600">Active Packages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">89</p>
            <p className="text-sm text-gray-600">Domains Registered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <CreditCard className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">$45,678</p>
            <p className="text-sm text-gray-600">Monthly Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">234</p>
            <p className="text-sm text-gray-600">Total Purchases</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
