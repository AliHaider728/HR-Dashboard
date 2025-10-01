import { useState } from "react"
import { ArrowLeft, Clock, Tag, AlertCircle, MessageSquare, Paperclip, Send, User, Calendar, X, Check, Edit2, Download } from "lucide-react"

const TicketDetails = () => {
  const [newComment, setNewComment] = useState("")
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showPriorityModal, setShowPriorityModal] = useState(false)
  const [currentStatus, setCurrentStatus] = useState("Open")
  const [currentPriority, setCurrentPriority] = useState("High")
  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        name: "Edgar Hansel",
        role: "IT Support",
        avatar: "EH",
      },
      content:
        'Thank you for reporting this issue. I can see from the screenshot that there might be a DNS configuration problem. Can you please try the following steps:\n\n1. Open Command Prompt as administrator\n2. Run "ipconfig /flushdns"\n3. Restart your network adapter\n\nLet me know if this resolves the issue.',
      timestamp: "14 Sep 2024, 11:15 AM",
    },
    {
      id: 2,
      author: {
        name: "Anthony Lewis",
        role: "Reporter",
        avatar: "AL",
      },
      content:
        "Hi Edgar, I tried the steps you mentioned but the issue still persists. The DNS flush completed successfully but I still cannot access internal resources. Should I try anything else?",
      timestamp: "14 Sep 2024, 1:30 PM",
    },
    {
      id: 3,
      author: {
        name: "Edgar Hansel",
        role: "IT Support",
        avatar: "EH",
      },
      content:
        "I see. Let me check the network configuration on our end. There might be an issue with the DHCP server. I'll escalate this to the network team and get back to you within 2 hours.",
      timestamp: "14 Sep 2024, 2:45 PM",
    },
  ])

  const ticketInfo = {
    id: "TIC-001",
    title: "Laptop Issue - Unable to connect to company network",
    category: "IT Support",
    createdDate: "14 Sep 2024, 10:30 AM",
    updatedDate: "14 Sep 2024, 2:45 PM",
    assignedTo: {
      name: "Edgar Hansel",
      role: "IT Support Specialist",
      avatar: "EH",
    },
    reporter: {
      name: "Anthony Lewis",
      role: "UI/UX Designer",
      avatar: "AL",
    },
    description:
      "I am unable to connect my laptop to the company network. The WiFi shows as connected but I cannot access any internal resources or the internet. This is affecting my ability to work remotely. I have tried restarting my laptop and reconnecting to the network multiple times but the issue persists.",
    attachments: [
      { name: "network-error-screenshot.png", size: "2.4 MB", type: "image" },
      { name: "system-logs.txt", size: "156 KB", type: "text" },
    ],
  }

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        author: {
          name: "Current User",
          role: "Employee",
          avatar: "CU",
        },
        content: newComment,
        timestamp: new Date().toLocaleString('en-US', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric', 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
      }
      setComments([...comments, newCommentObj])
      setNewComment("")
    }
  }

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus)
    setShowStatusModal(false)
  }

  const handlePriorityChange = (newPriority) => {
    setCurrentPriority(newPriority)
    setShowPriorityModal(false)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-700 border-red-200"
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Low":
        return "bg-green-50 text-green-700 border-green-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "In Progress":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "Resolved":
        return "bg-green-50 text-green-700 border-green-200"
      case "Closed":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-indigo-500",
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-full mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors mb-4 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Tickets</span>
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Employee</span>
            <span>/</span>
            <span>Tickets</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Ticket Details</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Ticket Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ticket Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        #{ticketInfo.id}
                      </span>
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                        {ticketInfo.category}
                      </span>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(currentPriority)}`}
                      >
                        {currentPriority}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{ticketInfo.title}</h2>
                  </div>
                  <span
                    className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full border ${getStatusColor(currentStatus)}`}
                  >
                    {currentStatus}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Description</h3>
                <p className="text-gray-700 leading-relaxed">{ticketInfo.description}</p>

                {/* Attachments */}
                {ticketInfo.attachments.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Attachments</h4>
                    <div className="space-y-2">
                      {ticketInfo.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors group"
                        >
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Paperclip className="w-4 h-4 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                            <p className="text-xs text-gray-500">{attachment.size}</p>
                          </div>
                          <button className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                  Comments
                  <span className="text-sm font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                    {comments.length}
                  </span>
                </h3>
              </div>

              <div className="divide-y divide-gray-100">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(comment.author.name)}`}
                      >
                        {comment.author.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-sm font-semibold text-gray-900">{comment.author.name}</h4>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {comment.author.role}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="mb-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment to this ticket..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none transition-all"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 font-medium transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                    Attach files
                  </button>
                  <button
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Send Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                Ticket Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Created</p>
                    <p className="text-sm text-gray-900 font-medium">{ticketInfo.createdDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Updated</p>
                    <p className="text-sm text-gray-900 font-medium">{ticketInfo.updatedDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Tag className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</p>
                    <p className="text-sm text-gray-900 font-medium">{ticketInfo.category}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Priority</p>
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border mt-1 ${getPriorityColor(currentPriority)}`}
                    >
                      {currentPriority}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned To Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned To</h3>
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-orange-50/50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                  {ticketInfo.assignedTo.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{ticketInfo.assignedTo.name}</p>
                  <p className="text-xs text-gray-600">{ticketInfo.assignedTo.role}</p>
                </div>
              </div>
            </div>

            {/* Reporter Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reporter</h3>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {ticketInfo.reporter.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{ticketInfo.reporter.name}</p>
                  <p className="text-xs text-gray-600">{ticketInfo.reporter.role}</p>
                </div>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowStatusModal(true)}
                  className="w-full px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Update Status
                </button>
                <button className="w-full px-4 py-2.5 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-orange-300 hover:bg-orange-50 font-medium transition-all flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  Reassign Ticket
                </button>
                <button
                  onClick={() => setShowPriorityModal(true)}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-orange-300 hover:bg-orange-50 font-medium transition-all flex items-center justify-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  Change Priority
                </button>
                <button className="w-full px-4 py-2.5 border-2 border-red-200 text-red-700 rounded-lg hover:bg-red-50 hover:border-red-300 font-medium transition-all flex items-center justify-center gap-2">
                  <X className="w-4 h-4" />
                  Close Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Update Status</h3>
              <button onClick={() => setShowStatusModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {["Open", "In Progress", "Resolved", "Closed"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`w-full px-4 py-3 rounded-lg border-2 text-left font-medium transition-all ${
                    currentStatus === status
                      ? "bg-orange-50 border-orange-500 text-orange-700"
                      : "border-gray-200 hover:border-orange-300 text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{status}</span>
                    {currentStatus === status && <Check className="w-5 h-5 text-orange-600" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Priority Modal */}
      {showPriorityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Change Priority</h3>
              <button onClick={() => setShowPriorityModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {["High", "Medium", "Low"].map((priority) => (
                <button
                  key={priority}
                  onClick={() => handlePriorityChange(priority)}
                  className={`w-full px-4 py-3 rounded-lg border-2 text-left font-medium transition-all ${
                    currentPriority === priority
                      ? "bg-orange-50 border-orange-500 text-orange-700"
                      : "border-gray-200 hover:border-orange-300 text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{priority}</span>
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(priority)}`}>
                        {priority}
                      </span>
                    </div>
                    {currentPriority === priority && <Check className="w-5 h-5 text-orange-600" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TicketDetails