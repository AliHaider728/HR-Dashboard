import React, { useState, useRef, useEffect } from 'react';
import {
  Phone,
  PhoneOff,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  UserPlus,
  MessageCircle,
  Monitor,
  MoreVertical,
  ArrowLeft,
  Clock,
  User,
  MapPin,
  Star,
  Bell,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Optional: for navigation

// Custom CSS for animation delay
const styles = `
  .animation-delay-75 {
    animation-delay: 75ms;
  }
`;

const OutgoingCall = () => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState('calling'); // 'calling', 'connecting', 'connected', 'ended', 'error'
  const [isRinging, setIsRinging] = useState(true);
  const [callError, setCallError] = useState(null);
  const [callStartTime, setCallStartTime] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const videoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const navigate = useNavigate(); // Optional: for navigation

  // Mock contact data
  const contact = {
    name: 'Sarah Johnson',
    role: 'HR Manager',
    department: 'Human Resources',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@company.com',
    avatar: 'https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-24.jpg',
    status: 'Available',
    company: 'SmartHR Solutions',
    location: 'New York, USA',
    isFavorite: true,
    lastSeen: '2 minutes ago',
  };

  // Recent contacts
  const recentContacts = [
    { id: 1, name: 'Mike Chen', role: 'Developer', avatar: 'https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-27.jpg', status: 'online' },
    { id: 2, name: 'Lisa Wong', role: 'Designer', avatar: 'https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-27.jpg', status: 'busy' },
    { id: 3, name: 'John Smith', role: 'Manager', avatar: 'https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-27.jpg', status: 'away' },
    { id: 4, name: 'Anna Davis', role: 'Analyst', avatar: 'https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-27.jpg', status: 'offline' },
  ];

  // WebRTC setup (simplified)
  useEffect(() => {
    const setupWebRTC = async () => {
      try {
        peerConnectionRef.current = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });

        if (isCameraOn || isMicOn) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: isCameraOn,
            audio: isMicOn,
          });
          stream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }

        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            console.log('ICE candidate:', event.candidate);
          }
        };

        peerConnectionRef.current.onconnectionstatechange = () => {
          if (peerConnectionRef.current.connectionState === 'connected') {
            setCallStatus('connected');
            setCallStartTime(new Date());
          } else if (peerConnectionRef.current.connectionState === 'failed') {
            setCallStatus('error');
            setCallError('Connection failed. Please check your network.');
          }
        };

        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
      } catch (err) {
        setCallStatus('error');
        setCallError('Failed to initialize call: ' + err.message);
      }
    };

    if (callStatus === 'calling') {
      setupWebRTC();
    }

    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [callStatus, isCameraOn, isMicOn]);

  // Call timer effect
  useEffect(() => {
    let timer;
    if (callStatus === 'connected') {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  // Simulate call connection
  useEffect(() => {
    if (callStatus === 'calling') {
      const connectionTimer = setTimeout(() => {
        setCallStatus('connecting');
        setIsRinging(false);
      }, 3000);
      return () => clearTimeout(connectionTimer);
    }
  }, [callStatus]);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setIsRinging(false);
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const handleCallAgain = () => {
    setCallStatus('calling');
    setCallDuration(0);
    setCallError(null);
    setIsRinging(true);
    setCallStartTime(null);
    setShowChat(false);
  };

  const handleCloseModal = () => {
    // Reset all call-related states
    setCallStatus('idle'); // New state to indicate no active call
    setCallDuration(0);
    setCallError(null);
    setIsRinging(false);
    setCallStartTime(null);
    setShowChat(false);
    setIsCameraOn(true);
    setIsMicOn(true);
    setIsSpeakerOn(true);

    // Clean up WebRTC resources
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    // Optional: Navigate to home page if using react-router-dom
    // If not using react-router-dom, the UI resets to an idle state
    navigate('/'); // Replace with your desired route, e.g., '/home'
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const getCallStatusText = () => {
    switch (callStatus) {
      case 'calling':
        return 'Calling...';
      case 'connecting':
        return 'Connecting...';
      case 'connected':
        return `Connected • ${formatDuration(callDuration)}`;
      case 'ended':
        return 'Call Ended';
      case 'error':
        return callError || 'Call Error';
      case 'idle':
        return 'Call Ended';
      default:
        return 'Calling...';
    }
  };

  const getCallStatusColor = () => {
    switch (callStatus) {
      case 'calling':
        return 'text-blue-400';
      case 'connecting':
        return 'text-yellow-400';
      case 'connected':
        return 'text-green-400';
      case 'ended':
      case 'error':
      case 'idle':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <style>{styles}</style>

      {/* Sidebar */}
      <div
        className={`bg-white border-r transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && <h2 className="text-lg font-semibold">Recent Contacts</h2>}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronDown size={20} className={sidebarCollapsed ? 'rotate-90' : ''} />
          </button>
        </div>
        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {recentContacts.map(contact => (
              <div key={contact.id} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.role} • {contact.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Go back"
              onClick={handleCloseModal} // Use handleCloseModal for back button
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Outgoing Call</h1>
              <p className="text-sm text-gray-500">Voice Call Interface</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Notifications">
              <Bell size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Settings">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Call Interface */}
        {callStatus !== 'idle' ? (
          <div className="flex-1 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
              <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-400 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400 rounded-full blur-xl"></div>
            </div>

            {/* Call Status Indicator */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
              <div className={`flex items-center space-x-2 ${getCallStatusColor()}`}>
                {isRinging && callStatus === 'calling' && (
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                )}
                {callStatus === 'connecting' && (
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                )}
                {callStatus === 'connected' && (
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                )}
                {callStatus === 'error' && (
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                )}
                <span className="text-lg font-medium">{getCallStatusText()}</span>
              </div>
            </div>

            {/* Main Contact Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white z-10">
                {isCameraOn && callStatus === 'connected' ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-48 h-48 rounded-full border-4 border-white/20 shadow-2xl mx-auto mb-8"
                  />
                ) : (
                  <div className="relative mb-8">
                    <div
                      className={`absolute inset-0 rounded-full ${
                        isRinging ? 'animate-ping' : ''
                      } ${
                        callStatus === 'calling'
                          ? 'bg-blue-400/30'
                          : callStatus === 'connecting'
                          ? 'bg-yellow-400/30'
                          : callStatus === 'connected'
                          ? 'bg-green-400/30'
                          : 'bg-gray-400/30'
                      }`}
                    ></div>
                    <div
                      className={`absolute inset-2 rounded-full ${
                        isRinging ? 'animate-ping' : ''
                      } ${
                        callStatus === 'calling'
                          ? 'bg-blue-400/40'
                          : callStatus === 'connecting'
                          ? 'bg-yellow-400/40'
                          : callStatus === 'connected'
                          ? 'bg-green-400/40'
                          : 'bg-gray-400/40'
                      } animation-delay-75`}
                    ></div>
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="relative w-48 h-48 rounded-full border-4 border-white/20 shadow-2xl"
                    />
                    {contact.isFavorite && (
                      <div className="absolute top-4 right-4 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Star size={20} fill="white" className="text-white" />
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2 mb-8">
                  <h2 className="text-3xl font-bold">{contact.name}</h2>
                  <p className="text-xl text-blue-200">{contact.role}</p>
                  <p className="text-lg text-white/80">{contact.department}</p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-white/70">
                    <span>{contact.phone}</span>
                    <span>•</span>
                    <span>{contact.company}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-white/60">
                    <MapPin size={14} />
                    <span>{contact.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 mb-8">
                  <Phone size={20} className="text-white/70" />
                  <span className="text-white/70">Voice Call</span>
                </div>
              </div>
            </div>

            {/* Control Bar */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isMicOn
                    ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                aria-label={isMicOn ? 'Turn off microphone' : 'Turn on microphone'}
              >
                {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
              </button>

              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isCameraOn
                    ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                aria-label={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
              >
                {isCameraOn ? <Video size={24} /> : <VideoOff size={24} />}
              </button>

              <button
                onClick={handleEndCall}
                className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all shadow-2xl transform hover:scale-105"
                aria-label="End call"
              >
                <PhoneOff size={28} />
              </button>

              <button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isSpeakerOn
                    ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                aria-label={isSpeakerOn ? 'Turn off speaker' : 'Turn on speaker'}
              >
                {isSpeakerOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </button>

              <button
                className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm flex items-center justify-center transition-all"
                aria-label="Add participant"
                onClick={() => alert('Add participant functionality not implemented')}
              >
                <UserPlus size={24} />
              </button>
            </div>

            {/* Additional Actions - Top Right */}
            <div className="absolute top-8 right-8 flex space-x-3">
              <button
                onClick={() => setShowChat(!showChat)}
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all"
                aria-label="Toggle chat"
              >
                <MessageCircle size={20} />
              </button>
              <button
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all"
                aria-label="Share screen"
                onClick={() => alert('Screen sharing not implemented')}
              >
                <Monitor size={20} />
              </button>
              <button
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all"
                aria-label="More options"
              >
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Call Information Panel - Bottom Left */}
            <div className="absolute bottom-8 left-8 bg-black/30 backdrop-blur-md rounded-lg p-4 text-white max-w-xs">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock size={14} />
                  <span>Started: {callStartTime ? callStartTime.toLocaleTimeString() : 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <User size={14} />
                  <span>Status: {contact.status}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone size={14} />
                  <span>Audio Quality: {callStatus === 'connected' ? 'HD' : 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Connection Quality Indicator */}
            <div className="absolute top-8 left-8 flex items-center space-x-2 text-white">
              <div className="flex space-x-1">
                <div className={`w-1 h-4 rounded-full ${callStatus === 'connected' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                <div className={`w-1 h-6 rounded-full ${callStatus === 'connected' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                <div className={`w-1 h-5 rounded-full ${callStatus === 'connected' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                <div className={`w-1 h-7 rounded-full ${callStatus === 'connected' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              </div>
              <span className="text-sm text-white/80">{callStatus === 'connected' ? 'Excellent' : 'N/A'}</span>
            </div>

            {/* Chat Panel */}
            {showChat && (
              <div className="absolute bottom-8 right-8 bg-white rounded-lg p-4 w-80 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Chat</h3>
                <div className="h-40 overflow-y-auto mb-2">
                  <p className="text-gray-600">Chat functionality not fully implemented.</p>
                </div>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full p-2 border rounded-lg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') alert('Message sent: ' + e.target.value);
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800">No Active Call</h2>
              <p className="text-gray-600 mt-2">Start a new call or select a contact.</p>
              <button
                onClick={handleCallAgain}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start New Call
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Call Ended Modal */}
      {callStatus === 'ended' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneOff size={32} className="text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Ended</h3>
            <p className="text-gray-600 mb-6">
              Your call with {contact.name} has ended.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleCallAgain}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Call again"
              >
                Call Again
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Close call"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {callStatus === 'error' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneOff size={32} className="text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Error</h3>
            <p className="text-gray-600 mb-6">{callError}</p>
            <div className="flex space-x-3">
              <button
                onClick={handleCallAgain}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Try again"
              >
                Try Again
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Close call"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutgoingCall;