 
import { useState } from "react"
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react"

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState("1")
  const [message, setMessage] = useState("")

  const chats = [
    {
      id: "1",
      name: "John Smith",
      avatar: "/professional-male-avatar.png",
      lastMessage: "Hey, can we discuss the project timeline?",
      time: "2:30 PM",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "/professional-female-avatar.png",
      lastMessage: "The marketing campaign looks great!",
      time: "1:45 PM",
      unread: 0,
      online: true,
    },
    {
      id: "3",
      name: "Team Development",
      avatar: "/team-group-avatar.jpg",
      lastMessage: "Mike: Code review completed",
      time: "12:20 PM",
      unread: 5,
      online: false,
      isGroup: true,
    },
    {
      id: "4",
      name: "Emily Davis",
      avatar: "/professional-female-designer.png",
      lastMessage: "Design mockups are ready for review",
      time: "11:30 AM",
      unread: 1,
      online: false,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "John Smith",
      content: "Hey, can we discuss the project timeline?",
      time: "2:30 PM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "I have some concerns about the current deadlines.",
      time: "2:32 PM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "John Smith",
      content: "What specific areas are you worried about?",
      time: "2:33 PM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      content: "The backend integration might take longer than expected. We should add a buffer.",
      time: "2:35 PM",
      isOwn: true,
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message logic here
      setMessage("")
    }
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Chat List */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedChat === chat.id ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={chat.avatar || "/placeholder.svg"}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/professional-male-avatar.png" alt="John Smith" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">John Smith</h2>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.isOwn ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.isOwn ? "text-blue-100" : "text-gray-500"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                <Smile className="w-4 h-4" />
              </button>
            </div>
            <button onClick={handleSendMessage} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
