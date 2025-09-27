 
import { useState } from "react"
import { Clock, Plus, Download } from "lucide-react"

const Timesheets = () => {
  const [selectedDate, setSelectedDate] = useState("2025-09-14")
  const [selectedEmployee, setSelectedEmployee] = useState("All Employees")

  const timesheetData = [
    {
      id: 1,
      employee: "Anthony Lewis",
      department: "UI/UX Team",
      avatar: "/anthony-lewis.jpg",
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
      avatar: "/placeholder-aclwi.png",
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
      avatar: "/placeholder-ji7bv.png",
      date: "14 Sep 2025",
      project: "HR System",
      task: "Employee Onboarding",
      hours: "6.5",
      description: "Creating onboarding documentation and process workflows",
      status: "Approved",
    },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>Employee</span>
            <span className="mx-2">/</span>
            <span>Timesheets</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Timesheets</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus className="w-4 h-4" />
            Add Timesheet
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employee</label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option>All Employees</option>
              <option>Anthony Lewis</option>
              <option>Brian Villalobos</option>
              <option>Harvey Smith</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option>All Projects</option>
              <option>Website Redesign</option>
              <option>Mobile App</option>
              <option>HR System</option>
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

      {/* Timesheet Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-500">Total Hours</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">142</p>
              <p className="text-sm text-gray-500">Approved Hours</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">14</p>
              <p className="text-sm text-gray-500">Pending Hours</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">Rejected Hours</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Timesheets Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Timesheet Entries</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search timesheets..."
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
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
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
              {timesheetData.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={entry.avatar || "/placeholder.svg"}
                        alt={entry.employee}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{entry.employee}</div>
                        <div className="text-sm text-gray-500">{entry.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.task}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.hours}h</td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{entry.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        entry.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : entry.status === "Pending"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {entry.status}
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

export default Timesheets
