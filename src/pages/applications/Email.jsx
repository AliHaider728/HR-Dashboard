import { useState } from "react"
import { Search, Star, Archive, Trash2, Reply, Forward, MoreHorizontal, Paperclip, Send, Menu, X, ChevronLeft } from "lucide-react"

const Email = () => {
  const [selectedEmail, setSelectedEmail] = useState("1")
  const [composing, setComposing] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [emails, setEmails] = useState([
    {
      id: "1",
      from: "John Smith",
      email: "john.smith@company.com",
      subject: "Project Update - Q1 Goals",
      preview: "Hi team, I wanted to share the latest updates on our Q1 project goals...",
      time: "2:30 PM",
      read: false,
      starred: true,
      important: true,
    },
    {
      id: "2",
      from: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      subject: "Marketing Campaign Results",
      preview: "The latest marketing campaign has exceeded our expectations with a 25% increase...",
      time: "1:45 PM",
      read: true,
      starred: false,
      important: false,
    },
    {
      id: "3",
      from: "HR Department",
      email: "hr@company.com",
      subject: "New Employee Onboarding",
      preview: "Welcome to the team! Please find attached the onboarding documents...",
      time: "12:20 PM",
      read: false,
      starred: false,
      important: true,
    },
    {
      id: "4",
      from: "Mike Wilson",
      email: "mike.wilson@company.com",
      subject: "Code Review Request",
      preview: "Could you please review the latest changes to the authentication module...",
      time: "11:30 AM",
      read: true,
      starred: true,
      important: false,
    },
  ])

  const folders = [
    { name: "Inbox", count: 12, active: true },
    { name: "Starred", count: 3, active: false },
    { name: "Sent", count: 45, active: false },
    { name: "Drafts", count: 2, active: false },
    { name: "Archive", count: 128, active: false },
    { name: "Trash", count: 5, active: false },
  ]

  const toggleStar = (id) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, starred: !email.starred } : email
    ))
  }

  const markAsRead = (id) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, read: true } : email
    ))
  }

  const deleteEmail = (id) => {
    setEmails(emails.filter(email => email.id !== id))
    if (selectedEmail === id) {
      setSelectedEmail(null)
    }
  }

  const filteredEmails = emails.filter(email =>
    email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedEmailData = emails.find((email) => email.id === selectedEmail)

  const handleEmailClick = (id) => {
    setSelectedEmail(id)
    markAsRead(id)
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Email</h1>
        <button
          onClick={() => setComposing(true)}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-blue-700 text-sm"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">New</span>
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 shadow-xl lg:shadow-none`}>
        <div className="p-4 border-b border-gray-200 mt-14 lg:mt-0">
          <div className="flex items-center justify-between lg:justify-center mb-3">
            <h2 className="text-xl font-bold text-gray-900 lg:hidden">Menu</h2>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => {
              setComposing(true)
              setSidebarOpen(false)
            }}
            className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            <Send className="w-4 h-4" />
            Compose
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {folders.map((folder) => (
              <a
                key={folder.name}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setSidebarOpen(false)
                }}
                className={`flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-all ${
                  folder.active 
                    ? "bg-blue-50 text-blue-700 font-medium border border-blue-200" 
                    : "text-gray-700 hover:bg-gray-50 hover:border hover:border-gray-200"
                }`}
              >
                <span>{folder.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  folder.active ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                }`}>
                  {folder.count}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Email List */}
      <div className={`${selectedEmail && !composing ? 'hidden lg:flex' : 'flex'} w-full lg:w-1/3 bg-white border-r border-gray-200 flex-col mt-14 lg:mt-0`}>
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredEmails.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <p>No emails found</p>
            </div>
          ) : (
            filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => handleEmailClick(email.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${
                  selectedEmail === email.id 
                    ? "bg-blue-50 border-l-4 border-l-blue-600" 
                    : "hover:bg-gray-50 border-l-4 border-l-transparent"
                } ${!email.read ? "bg-blue-25" : ""}`}
              >
                <div className="flex items-start space-x-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleStar(email.id)
                    }}
                    className="flex-shrink-0 mt-1 hover:scale-110 transition-transform"
                  >
                    <Star className={`w-4 h-4 ${email.starred ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-sm truncate ${!email.read ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}
                      >
                        {email.from}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2">{email.time}</span>
                    </div>
                    <p className={`text-sm truncate mt-1 ${!email.read ? "font-medium text-gray-900" : "text-gray-600"}`}>
                      {email.subject}
                    </p>
                    <p className="text-sm text-gray-500 truncate mt-1">{email.preview}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      {email.important && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                          Important
                        </span>
                      )}
                      {!email.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Email Content */}
      <div className={`${selectedEmail && !composing ? 'flex' : 'hidden lg:flex'} flex-1 flex-col mt-14 lg:mt-0`}>
        {selectedEmailData && !composing ? (
          <>
            {/* Email Header */}
            <div className="bg-white border-b border-gray-200 p-4 lg:p-6">
              <button
                onClick={() => setSelectedEmail(null)}
                className="lg:hidden mb-3 flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="flex items-start justify-between mb-4 gap-3">
                <h1 className="text-lg lg:text-xl font-semibold text-gray-900 flex-1">{selectedEmailData.subject}</h1>
                <div className="flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
                  <button 
                    onClick={() => toggleStar(selectedEmailData.id)}
                    className="p-2 text-gray-400 hover:text-yellow-500 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <Star className={`w-4 h-4 ${selectedEmailData.starred ? 'text-yellow-400 fill-current' : ''}`} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all">
                    <Archive className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteEmail(selectedEmailData.id)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {selectedEmailData.from.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{selectedEmailData.from}</h3>
                    <p className="text-sm text-gray-500">{selectedEmailData.email}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{selectedEmailData.time}</span>
              </div>
            </div>

            {/* Email Body */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-white">
              <div className="prose max-w-none text-sm lg:text-base">
                <p>Hi team,</p>
                <p>
                  I wanted to share the latest updates on our Q1 project goals and discuss the progress we've made so
                  far. The team has been working incredibly hard, and I'm pleased to report that we're ahead of schedule
                  on several key initiatives.
                </p>
                <p>Key highlights:</p>
                <ul className="space-y-1">
                  <li>Website redesign is 75% complete</li>
                  <li>Mobile app development is progressing well</li>
                  <li>CRM integration has been successfully implemented</li>
                  <li>Security audit is scheduled for next week</li>
                </ul>
                <p>
                  Please review the attached documents and let me know if you have any questions or concerns. I'd like
                  to schedule a team meeting next week to discuss our next steps.
                </p>
                <p>
                  Best regards,
                  <br />
                  John Smith
                </p>
              </div>
            </div>

            {/* Email Actions */}
            <div className="bg-white border-t border-gray-200 p-3 lg:p-4">
              <div className="flex items-center space-x-2">
                <button className="bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm hover:shadow-md text-sm">
                  <Reply className="w-4 h-4" />
                  <span className="hidden sm:inline">Reply</span>
                </button>
                <button className="border border-gray-300 text-gray-700 px-3 lg:px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all text-sm">
                  <Forward className="w-4 h-4" />
                  <span className="hidden sm:inline">Forward</span>
                </button>
              </div>
            </div>
          </>
        ) : composing ? (
          /* Compose Email */
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="border-b border-gray-200 p-3 lg:p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">New Message</h2>
                <button 
                  onClick={() => setComposing(false)} 
                  className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-3 lg:space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="recipient@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Email subject"
                />
              </div>
              <div className="flex-1 min-h-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  className="w-full h-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  placeholder="Write your message..."
                ></textarea>
              </div>
            </div>
            <div className="border-t border-gray-200 p-3 lg:p-4 bg-gray-50">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-white transition-all text-sm">
                  <Paperclip className="w-4 h-4" />
                  <span className="hidden sm:inline">Attach files</span>
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setComposing(false)}
                    className="px-3 lg:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button className="bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm hover:shadow-md text-sm">
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center px-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No email selected</h3>
              <p className="text-gray-500 text-sm">Choose an email from the list to read it here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Email