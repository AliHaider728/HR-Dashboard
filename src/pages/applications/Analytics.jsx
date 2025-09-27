 import React from 'react';
import { 
  BarChart, 
  Bar, 
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
  AreaChart,
  Area
} from 'recharts';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Eye,
  MousePointer,
  Clock,
  Award,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const AnalyticsDashboard = () => {
  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', sales: 4000, users: 2400, revenue: 2400 },
    { month: 'Feb', sales: 3000, users: 1398, revenue: 2210 },
    { month: 'Mar', sales: 2000, users: 9800, revenue: 2290 },
    { month: 'Apr', sales: 2780, users: 3908, revenue: 2000 },
    { month: 'May', sales: 1890, users: 4800, revenue: 2181 },
    { month: 'Jun', sales: 2390, users: 3800, revenue: 2500 },
    { month: 'Jul', sales: 3490, users: 4300, revenue: 2100 }
  ];

  const trafficData = [
    { name: 'Organic', value: 45, color: '#0ea5e9' },
    { name: 'Direct', value: 30, color: '#10b981' },
    { name: 'Referral', value: 15, color: '#f59e0b' },
    { name: 'Social', value: 10, color: '#ef4444' }
  ];

  const dailyStats = [
    { day: 'Mon', visitors: 1200 },
    { day: 'Tue', visitors: 1900 },
    { day: 'Wed', visitors: 800 },
    { day: 'Thu', visitors: 1600 },
    { day: 'Fri', visitors: 2200 },
    { day: 'Sat', visitors: 1800 },
    { day: 'Sun', visitors: 1400 }
  ];

  // Stat cards data
  const statsCards = [
    {
      title: 'Total Users',
      value: '24,532',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Revenue',
      value: '$48,259',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Orders',
      value: '3,847',
      change: '-2.4%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      title: 'Growth',
      value: '18.6%',
      change: '+4.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex items-center mt-4">
        {trend === 'up' ? (
          <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-1">from last month</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Monitor your business performance and key metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Performance Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>Last 7 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="sales" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {trafficData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Trend and Daily Visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#0ea5e9" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Metrics</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Page Views</p>
                  <p className="text-xs text-gray-500">Today</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">12,847</p>
                <p className="text-xs text-green-600">+15.3%</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MousePointer className="w-5 h-5 text-green-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Clicks</p>
                  <p className="text-xs text-gray-500">Today</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">3,247</p>
                <p className="text-xs text-green-600">+8.7%</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-orange-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Avg. Session</p>
                  <p className="text-xs text-gray-500">Duration</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">2m 34s</p>
                <p className="text-xs text-red-600">-2.1%</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="w-5 h-5 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Conversion</p>
                  <p className="text-xs text-gray-500">Rate</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">3.24%</p>
                <p className="text-xs text-green-600">+0.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Visitors Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Visitors</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="visitors" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: '#10b981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New user registration</p>
                <p className="text-xs text-gray-500">john.doe@example.com joined</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">2 minutes ago</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Sale completed</p>
                <p className="text-xs text-gray-500">Order #12847 - $299.00</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">5 minutes ago</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Traffic spike detected</p>
                <p className="text-xs text-gray-500">25% increase in last hour</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">12 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;