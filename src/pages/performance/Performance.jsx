 

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Search, Filter, Download, TrendingUp, Award, Target, Users } from "lucide-react"

const Performance = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const performanceData = [
    { month: "Jan", productivity: 85, quality: 90, teamwork: 88, innovation: 75 },
    { month: "Feb", productivity: 88, quality: 92, teamwork: 85, innovation: 80 },
    { month: "Mar", productivity: 92, quality: 89, teamwork: 90, innovation: 85 },
    { month: "Apr", productivity: 87, quality: 94, teamwork: 92, innovation: 82 },
    { month: "May", productivity: 90, quality: 91, teamwork: 89, innovation: 88 },
    { month: "Jun", productivity: 94, quality: 93, teamwork: 94, innovation: 90 },
  ]

  const employeePerformance = [
    {
      id: "EMP-001",
      name: "John Smith",
      department: "Engineering",
      position: "Senior Developer",
      overallScore: 92,
      productivity: 95,
      quality: 90,
      teamwork: 88,
      innovation: 94,
      goals: { completed: 8, total: 10 },
      trend: "up",
    },
    {
      id: "EMP-002",
      name: "Sarah Johnson",
      department: "Marketing",
      position: "Marketing Manager",
      overallScore: 88,
      productivity: 90,
      quality: 92,
      teamwork: 85,
      innovation: 86,
      goals: { completed: 7, total: 9 },
      trend: "up",
    },
    {
      id: "EMP-003",
      name: "Mike Wilson",
      department: "Sales",
      position: "Sales Representative",
      overallScore: 85,
      productivity: 88,
      quality: 85,
      teamwork: 90,
      innovation: 78,
      goals: { completed: 6, total: 8 },
      trend: "down",
    },
    {
      id: "EMP-004",
      name: "Emily Davis",
      department: "Design",
      position: "UI/UX Designer",
      overallScore: 91,
      productivity: 89,
      quality: 95,
      teamwork: 92,
      innovation: 88,
      goals: { completed: 9, total: 10 },
      trend: "up",
    },
  ]

  const radarData = [
    { subject: "Productivity", A: 92, fullMark: 100 },
    { subject: "Quality", A: 89, fullMark: 100 },
    { subject: "Teamwork", A: 94, fullMark: 100 },
    { subject: "Innovation", A: 85, fullMark: 100 },
    { subject: "Leadership", A: 88, fullMark: 100 },
    { subject: "Communication", A: 91, fullMark: 100 },
  ]

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score) => {
    if (score >= 90) return "bg-green-100"
    if (score >= 80) return "bg-yellow-100"
    return "bg-red-100"
  }

  const averageScore = employeePerformance.reduce((sum, emp) => sum + emp.overallScore, 0) / employeePerformance.length
  const topPerformers = employeePerformance.filter((emp) => emp.overallScore >= 90).length
  const improvingEmployees = employeePerformance.filter((emp) => emp.trend === "up").length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Management</h1>
          <p className="text-gray-600">Track and evaluate employee performance</p>
        </div>
        <div className="flex gap-3">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{averageScore.toFixed(1)}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+5.2%</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Top Performers</p>
              <p className="text-2xl font-bold text-gray-900">{topPerformers}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+2 this month</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Improving</p>
              <p className="text-2xl font-bold text-gray-900">{improvingEmployees}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">Trending up</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{employeePerformance.length}</p>
              <div className="flex items-center mt-2">
                <Users className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">Active reviews</span>
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="productivity" fill="#3B82F6" name="Productivity" />
              <Bar dataKey="quality" fill="#10B981" name="Quality" />
              <Bar dataKey="teamwork" fill="#F59E0B" name="Teamwork" />
              <Bar dataKey="innovation" fill="#EF4444" name="Innovation" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Radar */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Skills Assessment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Performance" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Employee Performance Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Employee Performance</h3>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overall Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productivity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quality
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teamwork
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Goals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeePerformance.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-lg mr-3">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(employee.overallScore)} ${getScoreColor(employee.overallScore)}`}
                    >
                      {employee.overallScore}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${employee.productivity}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{employee.productivity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${employee.quality}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-900">{employee.quality}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-yellow-600 h-2 rounded-full"
                          style={{ width: `${employee.teamwork}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{employee.teamwork}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {employee.goals.completed}/{employee.goals.total}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.round((employee.goals.completed / employee.goals.total) * 100)}% complete
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center ${employee.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      <TrendingUp className={`w-4 h-4 mr-1 ${employee.trend === "down" ? "rotate-180" : ""}`} />
                      <span className="text-sm capitalize">{employee.trend}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Performance
