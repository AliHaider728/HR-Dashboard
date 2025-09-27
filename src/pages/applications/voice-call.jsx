
import { useState } from "react"

const VoiceCallPage = () => {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [callDuration, setCallDuration] = useState("00:00")
  const [selectedContact, setSelectedContact] = useState(null)

  const contacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "HR Manager",
      phone: "+1 (555) 123-4567",
      avatar: "SJ",
      status: "available",
      department: "Human Resources",
    },  
    {
      id: 2,
      name: "Mike Chen",
      role: "Developer",
      phone: "+1 (555) 234-5678",
      avatar: "MC",
      status: "busy",
      department: "Engineering",
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Designer",
      phone: "+1 (555) 345-6789",
      avatar: "ED",
      status: "available",
      department: "Design",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Project Manager",
      phone: "+1 (555) 456-7890",
      avatar: "DW",
      status: "away",
      department: "Operations",
    },
    {
      id: 5,
      name: "Lisa Brown",
      role: "Marketing Lead",
      phone: "+1 (555) 567-8901",
      avatar: "LB",
      status: "available",
      department: "Marketing",
    },
  ]

  const recentCalls = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      type: "incoming",
      status: "answered",
      duration: "5:23",
      time: "2 hours ago",
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "MC",
      type: "outgoing",
      status: "missed",
      duration: "0:00",
      time: "4 hours ago",
    },
    {
      id: 3,
      name: "Emily Davis",
      avatar: "ED",
      type: "incoming",
      status: "answered",
      duration: "12:45",
      time: "Yesterday",
    },
    {
      id: 4,
      name: "David Wilson",
      avatar: "DW",
      type: "outgoing",
      status: "answered",
      duration: "8:12",
      time: "Yesterday",
    },
  ]

  const handleCall = (contact) => {
    setSelectedContact(contact)
    setIsCallActive(true)
    // Simulate call duration timer
    let seconds = 0
    const timer = setInterval(() => {
      seconds++
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      setCallDuration(`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`)
    }, 1000)

    // Auto end call after demo
    setTimeout(() => {
      clearInterval(timer)
      setIsCallActive(false)
      setCallDuration("00:00")
      setSelectedContact(null)
    }, 10000)
  }

  const handleEndCall = () => {
    setIsCallActive(false)
    setCallDuration("00:00")
    setSelectedContact(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-red-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  const getCallIcon = (type, status) => {
    if (type === "incoming") {
      return status === "missed" ? (
        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586l-3.293-3.293a1 1 0 00-1.414 1.414L11.586 7l-3.293 3.293a1 1 0 001.414 1.414L13 8.414l3.293 3.293a1 1 0 001.414-1.414L14.414 7z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586l-3.293-3.293a1 1 0 00-1.414 1.414L11.586 7l-3.293 3.293a1 1 0 001.414 1.414L13 8.414l3.293 3.293a1 1 0 001.414-1.414L14.414 7z" />
        </svg>
      )
    } else {
      return (
        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586l-3.293-3.293a1 1 0 00-1.414 1.414L11.586 7l-3.293 3.293a1 1 0 001.414 1.414L13 8.414l3.293 3.293a1 1 0 001.414-1.414L14.414 7z" />
        </svg>
      )
    }
  }

  if (isCallActive && selectedContact) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-300 rounded-full opacity-30"></div>

        <div className="relative z-10 text-center text-white">
          <div className="mb-8">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white border-opacity-30">
              <span className="text-4xl font-bold text-white">{selectedContact.avatar}</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">{selectedContact.name}</h2>
            <p className="text-xl text-orange-100 mb-2">{selectedContact.role}</p>
            <p className="text-lg text-orange-200">{selectedContact.phone}</p>
          </div>

          <div className="mb-8">
            <p className="text-2xl font-mono">{callDuration}</p>
            <p className="text-orange-100">Call in progress...</p>
          </div>

          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                isMuted ? "bg-red-500 hover:bg-red-600" : "bg-white bg-opacity-20 hover:bg-opacity-30"
              } backdrop-blur-sm border border-white border-opacity-30`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMuted ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                )}
              </svg>
            </button>

            <button
              onClick={handleEndCall}
              className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 3l18 18"
                />
              </svg>
            </button>

            <button className="w-16 h-16 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white border-opacity-30">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-3 space-y-6 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Voice Calls</h1>
          <p className="text-gray-600 mt-1">Make and manage voice calls with your team</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-200">
            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            New Call
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contacts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Team Contacts</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">{contact.avatar}</span>
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-white`}
                      ></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                      <p className="text-xs text-gray-500">
                        {contact.role} • {contact.department}
                      </p>
                      <p className="text-xs text-gray-400">{contact.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCall(contact)}
                    disabled={contact.status === "busy"}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Calls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Calls</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div key={call.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{call.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        {getCallIcon(call.type, call.status)}
                        <p className="text-sm font-medium text-gray-900">{call.name}</p>
                      </div>
                      <p className="text-xs text-gray-500">{call.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{call.duration}</p>
                    <p className={`text-xs ${call.status === "missed" ? "text-red-500" : "text-green-500"}`}>
                      {call.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Calls Today</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Duration</p>
              <p className="text-2xl font-bold text-gray-900">8:45</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Answered Calls</p>
              <p className="text-2xl font-bold text-gray-900">21</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Missed Calls</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceCallPage
