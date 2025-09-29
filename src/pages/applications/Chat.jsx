import { useState, useEffect, useRef } from "react"
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, ArrowLeft, Menu, X, Image, FileText, Mic, MicOff } from "lucide-react"

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState("1")
  const [message, setMessage] = useState("")
  const [showSidebar, setShowSidebar] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John Smith",
      content: "Hey, can we discuss the project timeline?",
      time: "2:30 PM",
      isOwn: false,
      timestamp: Date.now() - 300000,
    },
    {
      id: 2,
      sender: "You",
      content: "I have some concerns about the current deadlines.",
      time: "2:32 PM",
      isOwn: true,
      timestamp: Date.now() - 240000,
    },
    {
      id: 3,
      sender: "John Smith",
      content: "What specific areas are you worried about?",
      time: "2:33 PM",
      isOwn: false,
      timestamp: Date.now() - 180000,
    },
    {
      id: 4,
      sender: "You",
      content: "The backend integration might take longer than expected. We should add a buffer.",
      time: "2:35 PM",
      isOwn: true,
      timestamp: Date.now() - 120000,
    },
  ])

  const messagesEndRef = useRef(null)

  const chats = [
    {
      id: "1",
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      lastMessage: "Hey, can we discuss the project timeline?",
      time: "2:30 PM",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "https://images.pexels.com/photos/7433157/pexels-photo-7433157.jpeg",
      lastMessage: "The marketing campaign looks great!",
      time: "1:45 PM",
      unread: 0,
      online: true,
    },
    {
      id: "3",
      name: "Team Development",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150",
      lastMessage: "Mike: Code review completed",
      time: "12:20 PM",
      unread: 5,
      online: false,
      isGroup: true,
    },
    {
      id: "4",
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      lastMessage: "Design mockups are ready for review",
      time: "11:30 AM",
      unread: 1,
      online: false,
    },
  ]

  const currentChat = chats.find(chat => chat.id === selectedChat)

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        content: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        timestamp: Date.now(),
      }
      
      setMessages(prev => [...prev, newMessage])
      setMessage("")
      setIsTyping(false)

      // Simulate response after 2 seconds
      setTimeout(() => {
        const responses = [
          "That's a great point!",
          "I'll look into that right away.",
          "Let me check with the team.",
          "Thanks for the update!",
          "Sounds good to me.",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        
        const responseMessage = {
          id: messages.length + 2,
          sender: currentChat?.name || "John Smith",
          content: randomResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
          timestamp: Date.now(),
        }
        
        setMessages(prev => [...prev, responseMessage])
      }, 2000)
    }
  }

  const handleTyping = (e) => {
    setMessage(e.target.value)
    setIsTyping(e.target.value.length > 0)
  }

  const selectChat = (chatId) => {
    setSelectedChat(chatId)
    setShowSidebar(false)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        // Simulate voice message
        const voiceMessage = {
          id: messages.length + 1,
          sender: "You",
          content: "🎵 Voice message",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: true,
          timestamp: Date.now(),
          isVoice: true,
        }
        setMessages(prev => [...prev, voiceMessage])
      }, 3000)
    }
  }

  return (
    <div className="h-screen flex bg-gray-50 relative">
      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Chat List */}
      <div className={`
        ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 fixed lg:relative z-50 lg:z-0
        w-80 lg:w-1/3 xl:w-1/4 h-full
        bg-white border-r border-gray-200 flex flex-col
        transition-transform duration-300 ease-in-out
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            <button
              onClick={() => setShowSidebar(false)}
              className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No conversations found
            </div>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => selectChat(chat.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === chat.id ? "bg-blue-50 border-blue-200" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500 flex-shrink-0">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                      {chat.unread > 99 ? '99+' : chat.unread}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSidebar(true)}
                className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {currentChat && (
                <>
                  <img 
                    src={currentChat.avatar} 
                    alt={currentChat.name} 
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0" 
                  />
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 truncate">{currentChat.name}</h2>
                    <p className={`text-sm ${currentChat.online ? 'text-green-600' : 'text-gray-500'}`}>
                      {isTyping ? 'Typing...' : currentChat.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={msg.id}>
              {/* Date separator */}
              {index === 0 || new Date(msg.timestamp).toDateString() !== new Date(messages[index - 1].timestamp).toDateString() ? (
                <div className="flex justify-center my-4">
                  <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {new Date(msg.timestamp).toDateString()}
                  </span>
                </div>
              ) : null}
              
              <div className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs sm:max-w-sm lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.isOwn 
                      ? "bg-blue-600 text-white rounded-br-md" 
                      : "bg-white border border-gray-200 text-gray-900 rounded-bl-md shadow-sm"
                  }`}
                >
                  {msg.isVoice ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mic className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 h-1 bg-gray-300 rounded">
                        <div className="h-1 bg-blue-600 rounded w-1/3"></div>
                      </div>
                      <span className="text-xs">0:03</span>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  )}
                  <p className={`text-xs mt-1 ${msg.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end space-x-2">
            <div className="flex space-x-1">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <Image className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 relative">
              <textarea
                rows={1}
                value={message}
                onChange={handleTyping}
                placeholder="Type a message..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32 text-sm"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                style={{ minHeight: '40px' }}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                <Smile className="w-4 h-4" />
              </button>
            </div>
            
            {message.trim() ? (
              <button 
                onClick={handleSendMessage} 
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button 
                onClick={toggleRecording}
                className={`p-2 rounded-full transition-colors ${
                  isRecording ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400 hover:text-gray-600'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
          </div>
          
          {isRecording && (
            <div className="mt-2 flex items-center justify-center space-x-2 text-red-600">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-sm">Recording...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat