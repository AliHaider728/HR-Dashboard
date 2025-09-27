 

import { useState } from "react"
import { MapPin, Camera, CheckCircle, XCircle } from "lucide-react"

const AttendanceEmployee = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState(null)

  const attendanceHistory = [
    {
      date: "14 Sep 2025",
      checkIn: "09:00 AM",
      checkOut: "06:30 PM",
      break: "45 Min",
      workHours: "8.75 Hrs",
      status: "Present",
    },
    {
      date: "13 Sep 2025",
      checkIn: "09:15 AM",
      checkOut: "06:45 PM",
      break: "30 Min",
      workHours: "9.00 Hrs",
      status: "Late",
    },
    {
      date: "12 Sep 2025",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      break: "60 Min",
      workHours: "8.00 Hrs",
      status: "Present",
    },
    { date: "11 Sep 2025", checkIn: "-", checkOut: "-", break: "-", workHours: "0.00 Hrs", status: "Absent" },
    {
      date: "10 Sep 2025",
      checkIn: "09:30 AM",
      checkOut: "06:30 PM",
      break: "45 Min",
      workHours: "8.25 Hrs",
      status: "Late",
    },
  ]

  const handleCheckIn = () => {
    setIsCheckedIn(true)
    setCheckInTime(new Date())
  }

  const handleCheckOut = () => {
    setIsCheckedIn(false)
    setCheckInTime(null)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>Employee</span>
          <span className="mx-2">/</span>
          <span>Attendance Employee</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Attendance Employee</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Check In/Out Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
              <div className="text-gray-500">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Office Location</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Camera className="w-4 h-4" />
                <span>Face Recognition</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              {!isCheckedIn ? (
                <button
                  onClick={handleCheckIn}
                  className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  Check In
                </button>
              ) : (
                <button
                  onClick={handleCheckOut}
                  className="flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                  Check Out
                </button>
              )}
            </div>

            {isCheckedIn && checkInTime && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg text-center">
                <p className="text-green-800">
                  Checked in at {checkInTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Today's Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Check In</span>
                <span className="font-medium">
                  {isCheckedIn ? checkInTime?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check Out</span>
                <span className="font-medium">--:--</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Break Time</span>
                <span className="font-medium">00:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Work Hours</span>
                <span className="font-medium">00:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium ${isCheckedIn ? "text-green-600" : "text-gray-600"}`}>
                  {isCheckedIn ? "Present" : "Not Checked In"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Work Hours</span>
                <span className="font-medium">34.00 Hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Present Days</span>
                <span className="font-medium text-green-600">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Absent Days</span>
                <span className="font-medium text-red-600">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Late Days</span>
                <span className="font-medium text-orange-600">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Attendance History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Break
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Work Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceHistory.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkOut}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.break}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.workHours}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        record.status === "Present"
                          ? "bg-green-100 text-green-800"
                          : record.status === "Late"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {record.status}
                    </span>
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

export default AttendanceEmployee
