 
import { useState } from "react"
import { Clock, UserCheck, UserX, AlertCircle, FileText, Download } from "lucide-react"

const AttendanceAdmin = () => {
  const [dateRange, setDateRange] = useState("09/08/2025 - 09/14/2025")
  const [department, setDepartment] = useState("Department")
  const [status, setStatus] = useState("Select Status")
  const [sortBy, setSortBy] = useState("Last 7 Days")
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const attendanceStats = [
    {
      label: "Present",
      count: 250,
      percentage: "+1%",
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: UserCheck,
    },
    { label: "Late Login", count: 45, percentage: "-1%", color: "text-red-600", bgColor: "bg-red-50", icon: Clock },
    {
      label: "Uninformed",
      count: 15,
      percentage: "-12%",
      color: "text-red-600",
      bgColor: "bg-red-50",
      icon: AlertCircle,
    },
    {
      label: "Permission",
      count: 3,
      percentage: "+1%",
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: FileText,
    },
    { label: "Absent", count: 12, percentage: "-19%", color: "text-red-600", bgColor: "bg-red-50", icon: UserX },
  ]

  const attendanceData = [
    {
      id: 1,
      name: "Anthony Lewis",
      department: "UI/UX Team",
      avatar: "/anthony-lewis.jpg",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:45 PM",
      break: "30 Min",
      late: "32 Min",
      productionHours: "8.55 Hrs",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      name: "Brian Villalobos",
      department: "Development",
      avatar: "/placeholder-aclwi.png",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:12 PM",
      break: "20 Min",
      late: "20 Min",
      productionHours: "7.54 Hrs",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      name: "Harvey Smith",
      department: "HR",
      avatar: "/placeholder-ji7bv.png",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:13 PM",
      break: "50 Min",
      late: "23 Min",
      productionHours: "8.45 Hrs",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 4,
      name: "Stephan Peralt",
      department: "Management",
      avatar: "/placeholder-pc1o5.png",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:23 PM",
      break: "41 Min",
      late: "50 Min",
      productionHours: "8.35 Hrs",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 5,
      name: "Lori Broaddus",
      department: "Finance",
      avatar: "/placeholder-8ukcs.png",
      status: "Absent",
      checkIn: "-",
      checkOut: "-",
      break: "-",
      late: "-",
      productionHours: "0.00 Hrs",
      statusColor: "bg-red-100 text-red-800",
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
            <span>Attendance Admin</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Attendance Admin</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <FileText className="w-4 h-4" />
            Report
          </button>
        </div>
      </div>

      {/* Attendance Stats */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Attendance Details Today</h2>
            <p className="text-sm text-gray-500">Data from the 800+ total no of employees</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Total Absentees today</span>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`/employee-.jpg?height=32&width=32&query=employee ${i}`}
                  alt={`Employee ${i}`}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center border-2 border-white">
                +8
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {attendanceStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-medium ${stat.color}`}>{stat.percentage}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Admin Attendance</h3>
            <div className="flex items-center gap-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option>{dateRange}</option>
              </select>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option>{department}</option>
                <option>Development</option>
                <option>Design</option>
                <option>HR</option>
                <option>Finance</option>
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option>{status}</option>
                <option>Present</option>
                <option>Absent</option>
                <option>Late</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option>{sortBy}</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Row Per Page</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-500">Entries</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search"
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
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Break
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Production Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={employee.avatar || "/placeholder.svg"}
                        alt={employee.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${employee.statusColor}`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.checkOut}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.break}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.late}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        employee.status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {employee.productionHours}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-orange-600 hover:text-orange-900">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
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
          <div className="text-sm text-gray-500">Showing 1 - 10 of 10 entries</div>
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

export default AttendanceAdmin
