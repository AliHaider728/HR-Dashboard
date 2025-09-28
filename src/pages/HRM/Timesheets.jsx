import { useState } from "react"
import { Clock, Plus, Download, Users, TrendingUp, Calendar, BarChart3 } from "lucide-react"

const Timesheets = () => {
  const [selectedDate, setSelectedDate] = useState("2025-09-14")
  const [selectedEmployee, setSelectedEmployee] = useState("All Employees")

  const timesheetData = [
    {
      id: 1,
      employee: "Anthony Lewis",
      department: "UI/UX Team",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
      date: "14 Sep 2025",
      project: "Website Redesign",
      task: "Homepage Design",
      hours: "8.5",
      description: "Working on homepage layout and user interface improvements",
      status: "Approved",
    },
    {
      id: 2,
      employee: "Brian Villalobos",
      department: "Development",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
      date: "14 Sep 2025",
      project: "Mobile App",
      task: "API Integration",
      hours: "7.0",
      description: "Integrating REST APIs for user authentication and data management",
      status: "Pending",
    },
    {
      id: 3,
      employee: "Harvey Smith",
      department: "HR",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&auto=format",
      date: "14 Sep 2025",
      project: "HR System",
      task: "Employee Onboarding",
      hours: "6.5",
      description: "Creating onboarding documentation and process workflows",
      status: "Approved",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-orange-40">
      {/* Enhanced Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>Employee Management</span>
                    <span className="mx-2">/</span>
                    <span className="text-orange-600 font-medium">Timesheets</span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Timesheet Management</h1>
                  <p className="text-gray-600">Track and manage employee work hours efficiently</p>
                </div>
              </div>
              
              {/* Illustration/Stats Area */}
              <div className="hidden lg:flex items-center space-x-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">24</div>
                  <div className="text-sm text-gray-500">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-2">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-500">Efficiency</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-500">Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-7xl mx-auto">
        {/* Action Buttons */}
        <div className="flex items-center justify-end mb-6 gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-xl hover:from-orange-700 hover:to-orange-400 transition-all shadow-lg hover:shadow-xl">
            <Plus className="w-4 h-4" />
            Add New Timesheet
          </button>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Calendar className="w-4 h-4" />
                Date Range
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/80 transition-all"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Users className="w-4 h-4" />
                Employee
              </label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/80 transition-all"
              >
                <option>All Employees</option>
                <option>Anthony Lewis</option>
                <option>Brian Villalobos</option>
                <option>Harvey Smith</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <BarChart3 className="w-4 h-4" />
                Project
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/80 transition-all">
                <option>All Projects</option>
                <option>Website Redesign</option>
                <option>Mobile App</option>
                <option>HR System</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Clock className="w-4 h-4" />
                Status
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/80 transition-all">
                <option>All Status</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">156</p>
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">142</p>
                <p className="text-sm font-medium text-gray-600">Approved Hours</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '91%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">14</p>
                <p className="text-sm font-medium text-gray-600">Pending Hours</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '9%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">0</p>
                <p className="text-sm font-medium text-gray-600">Rejected Hours</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{width: '0%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Timesheet Entries</h3>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Search timesheets..."
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm w-64 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/80"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/70">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Hours
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {timesheetData.map((entry) => (
                  <tr key={entry.id} className="hover:bg-white/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={entry.avatar}
                          alt={entry.employee}
                          className="w-12 h-12 rounded-full mr-4 border-2 border-white shadow-md"
                        />
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{entry.employee}</div>
                          <div className="text-sm text-gray-600">{entry.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.project}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.task}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-lg">{entry.hours}h</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{entry.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          entry.status === "Approved"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : entry.status === "Pending"
                              ? "bg-orange-100 text-orange-800 border border-orange-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-orange-600 hover:text-orange-900 hover:bg-orange-50 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing 1 - 3 of 3 entries</div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 bg-white rounded-lg text-sm hover:bg-gray-50 transition-colors">Previous</button>
              <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-lg text-sm font-medium">1</button>
              <button className="px-4 py-2 border border-gray-300 bg-white rounded-lg text-sm hover:bg-gray-50 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timesheets