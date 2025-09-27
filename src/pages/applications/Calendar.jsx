 
import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from "lucide-react"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState("month")

  const events = [
    {
      id: 1,
      title: "Team Meeting",
      date: "2024-01-15",
      time: "10:00 AM",
      duration: "1 hour",
      location: "Conference Room A",
      attendees: ["John Smith", "Sarah Johnson", "Mike Wilson"],
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Client Presentation",
      date: "2024-01-16",
      time: "2:00 PM",
      duration: "2 hours",
      location: "Meeting Room B",
      attendees: ["Emily Davis", "Alex Brown"],
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Project Review",
      date: "2024-01-18",
      time: "9:00 AM",
      duration: "30 minutes",
      location: "Online",
      attendees: ["David Wilson", "Maria Garcia"],
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Training Session",
      date: "2024-01-20",
      time: "11:00 AM",
      duration: "3 hours",
      location: "Training Room",
      attendees: ["All Staff"],
      color: "bg-orange-500",
    },
  ]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }

  const getEventsForDate = (day) => {
    const dateStr = `2024-01-${day.toString().padStart(2, "0")}`
    return events.filter((event) => event.date === dateStr)
  }

  const days = getDaysInMonth(currentDate)
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Manage your schedule and events</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          New Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Calendar Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{formatDate(currentDate)}</h2>
                <div className="flex items-center space-x-2">
                  <div className="flex border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setView("month")}
                      className={`px-3 py-1 text-sm ${
                        view === "month" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                      } rounded-l-lg`}
                    >
                      Month
                    </button>
                    <button
                      onClick={() => setView("week")}
                      className={`px-3 py-1 text-sm ${
                        view === "week" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Week
                    </button>
                    <button
                      onClick={() => setView("day")}
                      className={`px-3 py-1 text-sm ${
                        view === "day" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                      } rounded-r-lg`}
                    >
                      Day
                    </button>
                  </div>
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
              <div className="grid grid-cols-7 gap-1 mb-4">
                {weekDays.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border border-gray-100 rounded-lg ${
                      day ? "bg-white hover:bg-gray-50" : "bg-gray-50"
                    }`}
                  >
                    {day && (
                      <>
                        <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
                        <div className="space-y-1">
                          {getEventsForDate(day).map((event) => (
                            <div key={event.id} className={`text-xs p-1 rounded text-white truncate ${event.color}`}>
                              {event.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
            </div>
            <div className="p-6 space-y-4">
              {events.slice(0, 4).map((event) => (
                <div key={event.id} className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${event.color}`}></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{event.title}</h4>
                    <div className="mt-1 space-y-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.time} ({event.duration})
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        {event.attendees.length} attendees
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="flex items-center">
                  <Plus className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Schedule Meeting</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Block Time</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Team Event</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
