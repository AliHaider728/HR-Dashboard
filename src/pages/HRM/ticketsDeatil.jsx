 

import { useState } from "react"
import { ArrowLeft, Clock, Tag, AlertCircle, MessageSquare, Paperclip, Send } from "lucide-react"
import { useNavigate } from "react-router-dom"

const TicketDetails = () => {
  const navigate = useNavigate()
  const [newComment, setNewComment] = useState("")

  const ticketInfo = {
    id: "TIC-001",
    title: "Laptop Issue - Unable to connect to company network",
    category: "IT Support",
    priority: "High",
    status: "Open",
    createdDate: "14 Sep 2024, 10:30 AM",
    updatedDate: "14 Sep 2024, 2:45 PM",
    assignedTo: {
      name: "Edgar Hansel",
      role: "IT Support Specialist",
      avatar: "/placeholder.svg?key=eh3",
    },
    reporter: {
      name: "Anthony Lewis",
      role: "UI/UX Designer",
      avatar: "/placeholder.svg?key=al6",
    },
    description:
      "I am unable to connect my laptop to the company network. The WiFi shows as connected but I cannot access any internal resources or the internet. This is affecting my ability to work remotely. I have tried restarting my laptop and reconnecting to the network multiple times but the issue persists.",
    attachments: [
      { name: "network-error-screenshot.png", size: "2.4 MB", type: "image" },
      { name: "system-logs.txt", size: "156 KB", type: "text" },
    ],
  }

  const comments = [
    {
      id: 1,
      author: {
        name: "Edgar Hansel",
        role: "IT Support",
        avatar: "/placeholder.svg?key=eh4",
      },
      content:
        'Thank you for reporting this issue. I can see from the screenshot that there might be a DNS configuration problem. Can you please try the following steps:\n\n1. Open Command Prompt as administrator\n2. Run "ipconfig /flushdns"\n3. Restart your network adapter\n\nLet me know if this resolves the issue.',
      timestamp: "14 Sep 2024, 11:15 AM",
      isInternal: false,
    },
    {
      id: 2,
      author: {
        name: "Anthony Lewis",
        role: "Reporter",
        avatar: "/placeholder.svg?key=al7",
      },
      content:
        "Hi Edgar, I tried the steps you mentioned but the issue still persists. The DNS flush completed successfully but I still cannot access internal resources. Should I try anything else?",
      timestamp: "14 Sep 2024, 1:30 PM",
      isInternal: false,
    },
    {
      id: 3,
      author: {
        name: "Edgar Hansel",
        role: "IT Support",
        avatar: "/placeholder.svg?key=eh5",
      },
      content:
        "I see. Let me check the network configuration on our end. There might be an issue with the DHCP server. I'll escalate this to the network team and get back to you within 2 hours.",
      timestamp: "14 Sep 2024, 2:45 PM",
      isInternal: false,
    },
  ]

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      // Handle comment submission
      console.log("New comment:", newComment)
      setNewComment("")
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-orange-100 text-orange-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/tickets")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tickets
        </button>
        <div className="h-6 w-px bg-gray-300" />
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <span>Employee</span>
            <span className="mx-2">/</span>
            <span>Tickets</span>
            <span className="mx-2">/</span>
            <span>Ticket Details</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Ticket Details</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium text-gray-500">#{ticketInfo.id}</span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                    {ticketInfo.category}
                  </span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getPriorityColor(ticketInfo.priority)}`}
                  >
                    {ticketInfo.priority}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{ticketInfo.title}</h2>
              </div>
              <span
                className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(ticketInfo.status)}`}
              >
                {ticketInfo.status}
              </span>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700">{ticketInfo.description}</p>
            </div>

            {/* Attachments */}
            {ticketInfo.attachments.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Attachments</h4>
                <div className="space-y-2">
                  {ticketInfo.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-xs text-gray-500">{attachment.size}</p>
                      </div>
                      <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">Download</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Comments ({comments.length})
              </h3>
            </div>

            <div className="divide-y divide-gray-200">
              {comments.map((comment) => (
                <div key={comment.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={comment.author.avatar || "/placeholder.svg"}
                      alt={comment.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{comment.author.name}</h4>
                        <span className="text-xs text-gray-500">{comment.author.role}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 whitespace-pre-line">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="p-6 border-t bg-gray-50">
              <form onSubmit={handleSubmitComment}>
                <div className="mb-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button type="button" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                    <Paperclip className="w-4 h-4" />
                    Attach files
                  </button>
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Send Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Info */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Created</p>
                  <p className="text-sm text-gray-500">{ticketInfo.createdDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Last Updated</p>
                  <p className="text-sm text-gray-500">{ticketInfo.updatedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Category</p>
                  <p className="text-sm text-gray-500">{ticketInfo.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertCircle className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Priority</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getPriorityColor(ticketInfo.priority)}`}
                  >
                    {ticketInfo.priority}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned To */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned To</h3>
            <div className="flex items-center gap-3">
              <img
                src={ticketInfo.assignedTo.avatar || "/placeholder.svg"}
                alt={ticketInfo.assignedTo.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{ticketInfo.assignedTo.name}</p>
                <p className="text-sm text-gray-500">{ticketInfo.assignedTo.role}</p>
              </div>
            </div>
          </div>

          {/* Reporter */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reporter</h3>
            <div className="flex items-center gap-3">
              <img
                src={ticketInfo.reporter.avatar || "/placeholder.svg"}
                alt={ticketInfo.reporter.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{ticketInfo.reporter.name}</p>
                <p className="text-sm text-gray-500">{ticketInfo.reporter.role}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Update Status
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Reassign Ticket
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Change Priority
              </button>
              <button className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetails
