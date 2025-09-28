import { useState, useEffect } from "react"
import { MapPin, Camera, CheckCircle, XCircle, Clock, Calendar, Users, TrendingUp, Award, Coffee, Target, AlertCircle } from "lucide-react"

const AttendanceEmployee = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState(null)
  const [workingHours, setWorkingHours] = useState("00:00:00")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      if (checkInTime) {
        const diff = new Date() - checkInTime
        const hours = Math.floor(diff / 3600000)
        const minutes = Math.floor((diff % 3600000) / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        setWorkingHours(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [checkInTime])

  const attendanceHistory = [
    {
      date: "14 Sep 2025",
      checkIn: "09:00 AM",
      checkOut: "06:30 PM",
      break: "45 Min",
      workHours: "8.75 Hrs",
      status: "Present",
      production: "10.00 Hrs",
      overtime: "1.25 Hrs"
    },
    {
      date: "13 Sep 2025",
      checkIn: "09:15 AM",
      checkOut: "06:45 PM",
      break: "30 Min",
      workHours: "9.00 Hrs",
      status: "Late",
      production: "9.30 Hrs",
      overtime: "1.30 Hrs"
    },
    {
      date: "12 Sep 2025",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      break: "60 Min",
      workHours: "8.00 Hrs",
      status: "Present",
      production: "8.00 Hrs",
      overtime: "0.00 Hrs"
    },
    { 
      date: "11 Sep 2025", 
      checkIn: "-", 
      checkOut: "-", 
      break: "-", 
      workHours: "0.00 Hrs", 
      status: "Absent",
      production: "0.00 Hrs",
      overtime: "0.00 Hrs"
    },
    {
      date: "10 Sep 2025",
      checkIn: "09:30 AM",
      checkOut: "06:30 PM",
      break: "45 Min",
      workHours: "8.25 Hrs",
      status: "Late",
      production: "8.25 Hrs",
      overtime: "0.25 Hrs"
    },
  ]

  const handleCheckIn = () => {
    setIsCheckedIn(true)
    setCheckInTime(new Date())
  }

  const handleCheckOut = () => {
    setIsCheckedIn(false)
    setCheckInTime(null)
    setWorkingHours("00:00:00")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-indigo-50">
      {/* Enhanced Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <Clock className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>Employee Portal</span>
                    <span className="mx-2">/</span>
                    <span className="text-green-600 font-medium">Attendance</span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">My Attendance</h1>
                  <p className="text-gray-600">Track your daily attendance and working hours</p>
                </div>
              </div>
              
              {/* User Profile Area */}
              <div className="hidden lg:flex items-center space-x-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format" 
                      alt="Profile" 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg"
                    />
                  </div>
                  <div className="text-sm font-semibold text-gray-900">John Doe</div>
                  <div className="text-xs text-gray-500">Software Engineer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-7xl mx-auto">
        {/* Time Display Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-8">
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-900 mb-2 font-mono">
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
            <div className="text-xl text-gray-600 mb-6">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-3 text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                <MapPin className="w-5 h-5 text-green-500" />
                <span className="font-medium">Office Location</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                <Camera className="w-5 h-5 text-orange-500" />
                <span className="font-medium">Face Recognition</span>
              </div>
            </div>

            <div className="flex justify-center gap-6">
              {!isCheckedIn ? (
                <button
                  onClick={handleCheckIn}
                  className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
                >
                  <CheckCircle className="w-6 h-6" />
                  Check In
                </button>
              ) : (
                <button
                  onClick={handleCheckOut}
                  className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl hover:from-red-600 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
                >
                  <XCircle className="w-6 h-6" />
                  Check Out
                </button>
              )}
            </div>

            {isCheckedIn && checkInTime && (
              <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <div className="flex items-center justify-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <p className="text-green-800 text-lg font-semibold">
                    Checked in at {checkInTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className="mt-3 text-green-700 font-mono text-xl">
                  Working Time: {workingHours}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Today's Summary</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Check In</span>
                  <span className="font-bold text-lg">
                    {isCheckedIn ? checkInTime?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Check Out</span>
                  <span className="font-bold text-lg">--:--</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Break Time</span>
                  <span className="font-bold text-lg">00:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Work Hours</span>
                  <span className="font-bold text-lg text-green-600">{workingHours}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Status</span>
                  <span className={`font-bold text-lg ${isCheckedIn ? "text-green-600" : "text-gray-600"}`}>
                    {isCheckedIn ? "Present" : "Not Checked In"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">This Week</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Total Work Hours</span>
                  <span className="font-bold text-lg">34.00 Hrs</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Present Days</span>
                  <span className="font-bold text-lg text-green-600">4</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Absent Days</span>
                  <span className="font-bold text-lg text-red-600">1</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Late Days</span>
                  <span className="font-bold text-lg text-orange-600">2</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Overtime</span>
                  <span className="font-bold text-lg text-orange-600">2.80 Hrs</span>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Attendance</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">8.2</div>
                <div className="text-sm text-gray-600">Avg Hours</div>
              </div>
            </div>
          </div>

          {/* Attendance History */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    <Clock className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Attendance History</h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/70">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Check In</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Check Out</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Break</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Work Hours</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Production</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Overtime</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {attendanceHistory.map((record, index) => (
                      <tr key={index} className="hover:bg-white/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{record.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.checkIn}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.checkOut}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.break}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{record.workHours}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">{record.production}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">{record.overtime}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${
                              record.status === "Present"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : record.status === "Late"
                                  ? "bg-orange-100 text-orange-800 border-orange-200"
                                  : "bg-red-100 text-red-800 border-red-200"
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
        </div>

        {/* Monthly Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">22</div>
            <div className="text-sm font-medium text-gray-600">Working Days</div>
            <div className="mt-2 text-xs text-green-600">This Month</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">20</div>
            <div className="text-sm font-medium text-gray-600">Present Days</div>
            <div className="mt-2 text-xs text-green-600">91% Attendance</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">2</div>
            <div className="text-sm font-medium text-gray-600">Late Arrivals</div>
            <div className="mt-2 text-xs text-orange-600">9% of Days</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">18.5</div>
            <div className="text-sm font-medium text-gray-600">Break Hours</div>
            <div className="mt-2 text-xs text-purple-600">Total This Month</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendanceEmployee