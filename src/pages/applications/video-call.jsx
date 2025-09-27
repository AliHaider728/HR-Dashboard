import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  Settings, 
  MessageCircle, 
  Send,
  MoreVertical,
  Users,
  Search,
  Bell,
  User,
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Plus,
  Grid3X3,
  Maximize2,
  Volume2,
  VolumeX
} from 'lucide-react';

const VideoCall = () => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenShare, setIsScreenShare] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const messagesEndRef = useRef(null);

  // Mock data for participants
  const participants = [
    { id: 1, name: 'Adrian Herman', role: 'System Admin', avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg', isHost: true, isMuted: false, isCameraOn: true },
    { id: 2, name: 'Sarah Johnson', role: 'HR Manager', avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg', isHost: false, isMuted: true, isCameraOn: true },
    { id: 3, name: 'Mike Chen', role: 'Developer', avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg', isHost: false, isMuted: false, isCameraOn: false },
    { id: 4, name: 'Lisa Wong', role: 'Designer', avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg', isHost: false, isMuted: false, isCameraOn: true },
  ];

  // Mock chat messages
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Adrian Herman', message: 'Hi Everyone.!', time: '10:00 AM', avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg' },
    { id: 2, user: 'System', message: 'Good Morning..! Today we have meeting about the new policy.', time: '10:00', isSystem: true },
    { id: 3, user: 'Sarah Johnson', message: 'Great.! This is the second new product that comes in this week.', time: '10:00 AM', avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg' },
    { id: 4, user: 'Adrian Herman', message: 'Nice..which category it belongs to?', time: '10:00 AM', avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg' },
    { id: 5, user: 'Mike Chen', message: 'Hi.! Good Morning all.', time: '10:00 AM', avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg' },
  ]);

  // Timer effect for call duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: 'Adrian Herman',
        message: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '/api/placeholder/32/32'
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessage('');
    }
  };

  const sidebarMenuItems = [
    { category: 'Main', items: [
      { name: 'Dashboard', active: false },
      { name: 'Super Admin', active: false },
      { name: 'Applications', active: false },
      { name: 'Layouts', active: false },
    ]},
    { category: 'Projects', items: [
      { name: 'Clients', active: false },
      { name: 'Projects', active: false },
    ]},
    { category: 'CRM', items: [
      { name: 'Calls', active: true },
    ]},
    { category: 'HRM', items: [
      { name: 'Employees', active: false },
      { name: 'Tickets', active: false },
      { name: 'Holidays', active: false },
      { name: 'Attendance', active: false },
      { name: 'Performance', active: false },
    ]},
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Video Call</h1>
            <p className="text-sm text-gray-500">Conference Room - Meeting in progress</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live • {formatDuration(callDuration)}</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Video Call Interface */}
        <div className="flex-1 flex">
          {/* Main Video Area */}
          <div className="flex-1 bg-gray-900 relative">
            {/* Main Video Stream */}
            <div className="w-full h-full relative">
              <div className="absolute inset-0  flex items-center justify-center" style={{backgroundImage:"url('https://smarthr.co.in/demo/html/template/assets/img/video/video.jpg')"}}>
                <div className="text-center text-white">
                  
                   
                </div>
              </div>
            </div>

            {/* Participants Grid */}
            <div className="absolute top-4 right-4 space-y-2">
              {participants.slice(1).map((participant) => (
                <div key={participant.id} className="w-40 h-28 bg-gray-800 rounded-lg overflow-hidden relative">
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    {participant.isCameraOn ? (
                      <div className="text-center text-white">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1 mx-auto">
                          <User size={16} />
                        </div>
                        <span className="text-xs">{participant.name.split(' ')[0]}</span>
                      </div>
                    ) : (
                      <div className="text-center text-white">
                        <VideoOff size={20} className="mb-1" />
                        <span className="text-xs">{participant.name.split(' ')[0]}</span>
                      </div>
                    )}
                  </div>
                  {participant.isMuted && (
                    <div className="absolute bottom-2 left-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <MicOff size={12} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Control Bar */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/50 backdrop-blur-md rounded-full px-6 py-3">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isMicOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              
              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isCameraOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isCameraOn ? <Video size={20} /> : <VideoOff size={20} />}
              </button>

              <button
                onClick={() => setIsScreenShare(!isScreenShare)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isScreenShare ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                <Monitor size={20} />
              </button>

              <button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isSpeakerOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isSpeakerOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>

              <div className="w-px h-8 bg-gray-600"></div>

              <button className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors">
                <PhoneOff size={20} />
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <Maximize2 size={20} />
              </button>
            </div>

            {/* Participants Count */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-white">
              <div className="flex items-center space-x-2">
                <Users size={16} />
                <span className="text-sm">{participants.length} participants</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Chat & Participants */}
          <div className="w-80 bg-white border-l flex flex-col">
            {/* Panel Tabs */}
            <div className="border-b">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'chat'
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MessageCircle size={16} className="inline mr-2" />
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('participants')}
                  className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'participants'
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Users size={16} className="inline mr-2" />
                  Participants ({participants.length})
                </button>
              </div>
            </div>

            {activeTab === 'chat' ? (
              <>
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="flex space-x-3">
                      {!msg.isSystem && (
                        <img 
                          src={msg.avatar} 
                          alt={msg.user}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                      )}
                      <div className={`flex-1 ${msg.isSystem ? 'text-center' : ''}`}>
                        {!msg.isSystem && (
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-800">{msg.user}</span>
                            <span className="text-xs text-gray-500">{msg.time}</span>
                          </div>
                        )}
                        <div className={`text-sm ${msg.isSystem ? 'text-gray-600 italic bg-gray-100 rounded-lg p-2' : 'text-gray-700'}`}>
                          {msg.message}
                        </div>
                        {msg.isSystem && (
                          <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={sendMessage}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Participants List */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-3">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img 
                              src={participant.avatar} 
                              alt={participant.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              participant.isCameraOn ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-800">{participant.name}</span>
                              {participant.isHost && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Host</span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{participant.role}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {participant.isMuted ? (
                            <MicOff size={16} className="text-red-500" />
                          ) : (
                            <Mic size={16} className="text-green-500" />
                          )}
                          {participant.isCameraOn ? (
                            <Video size={16} className="text-green-500" />
                          ) : (
                            <VideoOff size={16} className="text-red-500" />
                          )}
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Participant */}
                <div className="border-t p-4">
                  <button className="w-full flex items-center justify-center space-x-2 p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
                    <Plus size={16} />
                    <span>Add Participant</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Event Modal (Optional) */}
      <div className="fixed bottom-4 right-4 w-72 bg-white rounded-lg shadow-xl border p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-800">Upcoming Event</h4>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={16} />
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar size={14} />
            <span>26 July, 2024 to 31 July, 2024</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock size={14} />
            <span>11:00 AM to 12:15 PM</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin size={14} />
            <span>Las Vegas, US</span>
          </div>
          <p className="text-sm text-gray-700 mt-2">
            A recurring or repeating event is simply any event that you will occur more than once on your calendar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;