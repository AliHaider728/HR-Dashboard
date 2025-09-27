 
import { useState } from "react"
import { Search, Star, Archive, Trash2, Reply, Forward, MoreHorizontal, Paperclip, Send } from "lucide-react"

const Email = () => {
  const [selectedEmail, setSelectedEmail] = useState("1")
  const [composing, setComposing] = useState(false)

  const emails = [
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
  ]

  const folders = [
    { name: "Inbox", count: 12, active: true },
    { name: "Starred", count: 3, active: false },
    { name: "Sent", count: 45, active: false },
    { name: "Drafts", count: 2, active: false },
    { name: "Archive", count: 128, active: false },
    { name: "Trash", count: 5, active: false },
  ]

  const selectedEmailData = emails.find((email) => email.id === selectedEmail)

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setComposing(true)}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
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
                className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg ${
                  folder.active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{folder.name}</span>
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{folder.count}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Email List */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedEmail === email.id ? "bg-blue-50 border-blue-200" : ""
              } ${!email.read ? "bg-blue-25" : ""}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {email.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-sm truncate ${!email.read ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}
                    >
                      {email.from}
                    </h3>
                    <span className="text-xs text-gray-500">{email.time}</span>
                  </div>
                  <p className={`text-sm truncate mt-1 ${!email.read ? "font-medium text-gray-900" : "text-gray-600"}`}>
                    {email.subject}
                  </p>
                  <p className="text-sm text-gray-500 truncate mt-1">{email.preview}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    {email.important && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Important
                      </span>
                    )}
                    {!email.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 flex flex-col">
        {selectedEmailData && !composing ? (
          <>
            {/* Email Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold text-gray-900">{selectedEmailData.subject}</h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Archive className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src="/professional-avatar.png"
                    alt={selectedEmailData.from}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{selectedEmailData.from}</h3>
                    <p className="text-sm text-gray-500">{selectedEmailData.email}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{selectedEmailData.time}</span>
              </div>
            </div>

            {/* Email Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <div className="prose max-w-none">
                <p>Hi team,</p>
                <p>
                  I wanted to share the latest updates on our Q1 project goals and discuss the progress we've made so
                  far. The team has been working incredibly hard, and I'm pleased to report that we're ahead of schedule
                  on several key initiatives.
                </p>
                <p>Key highlights:</p>
                <ul>
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
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                  <Reply className="w-4 h-4" />
                  Reply
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                  <Forward className="w-4 h-4" />
                  Forward
                </button>
              </div>
            </div>
          </>
        ) : composing ? (
          /* Compose Email */
          <div className="flex-1 flex flex-col bg-white">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">New Message</h2>
                <button onClick={() => setComposing(false)} className="text-gray-400 hover:text-gray-600">
                  ×
                </button>
              </div>
            </div>
            <div className="flex-1 flex flex-col p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="recipient@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email subject"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  className="w-full h-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Write your message..."
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                  <Paperclip className="w-4 h-4" />
                  Attach files
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setComposing(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No email selected</h3>
              <p className="text-gray-500">Choose an email from the list to read it here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Email
