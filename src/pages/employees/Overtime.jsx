 

import { useState } from "react"
import { Clock, Plus, Calendar, DollarSign, TrendingUp } from "lucide-react"

const Overtime = () => {
  const [selectedMonth, setSelectedMonth] = useState("September 2025")

  const overtimeData = [
    {
      id: 1,
      employee: "Anthony Lewis",
      department: "UI/UX Team",
      avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-32.jpg",
      date: "14 Sep 2025",
      regularHours: "8.0",
      overtimeHours: "2.5",
      totalHours: "10.5",
      overtimeRate: "$25/hr",
      overtimePay: "$62.50",
      status: "Approved",
    },
    {
      id: 2,
      employee: "Brian Villalobos",
      department: "Development",
      avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-09.jpg",
      date: "13 Sep 2025",
      regularHours: "8.0",
      overtimeHours: "3.0",
      totalHours: "11.0",
      overtimeRate: "$30/hr",
      overtimePay: "$90.00",
      status: "Pending",
    },
    {
      id: 3,
      employee: "Harvey Smith",
      department: "HR",
      avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-37.jpg",
      date: "12 Sep 2025",
      regularHours: "8.0",
      overtimeHours: "1.5",
      totalHours: "9.5",
      overtimeRate: "$22/hr",
      overtimePay: "$33.00",
      status: "Approved",
    },
     {
      id: 4,
      employee: "Connie Waters",
      department: "Mangament",
      avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-38.jpg",
      date: "15 Nov 2024",
      regularHours: "8.0",
      overtimeHours: "66",
      totalHours: "9.5",
      overtimeRate: "$22/hr",
      overtimePay: "$33.00",
      status: "Approved",
    },
    {
      id: 5,
      employee: "Doglas Martini",
      department: "Office Management",
      avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-34.jpg",
      date: "12 Apr 2024",
      regularHours: "8.0",
      overtimeHours: "36",
      totalHours: "9.5",
      overtimeRate: "$22/hr",
      overtimePay: "$33.00",
      status: "Approved",
    },
     {
      id: 6,
      employee: "Elliot Murray",
      department: "Developer",
      avatar: "https://smarthr.co.in/demo/html/template/assets/img/users/user-35.jpg",
      date: "12 Apr 2024",
      regularHours: "8.0",
      overtimeHours: "57",
      totalHours: "9.5",
      overtimeRate: "$22/hr",
      overtimePay: "$33.00",
      status: "Rejected",
    },
  ]

  const overtimeStats = [
    { label: "Total Overtime Hours", value: "156.5", icon: Clock, color: "blue" },
    { label: "Approved Overtime", value: "142.0", icon: TrendingUp, color: "green" },
    { label: "Pending Approval", value: "14.5", icon: Calendar, color: "orange" },
    { label: "Total Overtime Pay", value: "$4,250", icon: DollarSign, color: "purple" },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>Employee</span>
            <span className="mx-2">/</span>
            <span>Overtime</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Overtime</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          <Plus className="w-4 h-4" />
          Add Overtime
        </button>
      </div>

      {/* Overtime Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {overtimeStats.map((stat, index) => {
          const IconComponent = stat.icon
          const colorClasses = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            orange: "bg-orange-50 text-orange-600",
            purple: "bg-purple-50 text-purple-600",
          }

          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option>September 2025</option>
              <option>August 2025</option>
              <option>July 2025</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employee</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option>All Employees</option>
              <option>Anthony Lewis</option>
              <option>Brian Villalobos</option>
              <option>Harvey Smith</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option>All Departments</option>
              <option>Development</option>
              <option>Design</option>
              <option>HR</option>
              <option>Finance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option>All Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overtime Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Overtime Records</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search overtime records..."
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-64"
              />
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Regular Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overtime Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overtime Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overtime Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {overtimeData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={record.avatar || "/placeholder.svg"}
                        alt={record.employee}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.employee}</div>
                        <div className="text-sm text-gray-500">{record.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.regularHours}h</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">
                    {record.overtimeHours}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.totalHours}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.overtimeRate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {record.overtimePay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        record.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : record.status === "Pending"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-orange-600 hover:text-orange-900 mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing 1 - 3 of 3 entries</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">Previous</button>
            <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overtime
