import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Link,
  Smartphone,
  Calendar,
  Mail,
  Code2,
  Shield,
  Activity,
  Save,
  Loader2,
  CheckCircle,
  X,
  Settings,
  ExternalLink,
  XCircle,
  MessageSquare,
} from "lucide-react";

const ConnectedApps = () => {
  const navigate = useNavigate();
  
  // Connected apps state
  const [connectedApps, setConnectedApps] = useState({
    slack: true,
    googleCalendar: true,
    gmail: true,
    github: false,
  });

  const [isConnecting, setIsConnecting] = useState({});

  const apps = [
    {
      id: "slack",
      title: "Slack",
      description: "Team communication platform with channels for group discussions and direct messaging.",
      image: "https://smarthr.co.in/demo/html/template/assets/img/apps/slack.png",
      icon: MessageSquare,
      color: "text-orange-600",
      connected: () => connectedApps.slack,
    },
    {
      id: "googleCalendar",
      title: "Google Calendar",
      description: "Google Calendar is a web-based scheduling tool that allows users to create, manage, and share events.",
      image: "https://smarthr.co.in/demo/html/template/assets/img/apps/google-calendar.png",
      icon: Calendar,
      color: "text-red-600",
      connected: () => connectedApps.googleCalendar,
    },
    {
      id: "gmail",
      title: "Gmail",
      description: "Gmail is a free email service by Google that offers robust spam protection & 15GB of storage.",
      image: "https://smarthr.co.in/demo/html/template/assets/img/apps/gmail.png",
      icon: Mail,
      color: "text-red-600",
      connected: () => connectedApps.gmail,
    },
    {
      id: "github",
      title: "Github",
      description: "Github is a web-based platform for version control and collaboration, allowing developers to host & review code.",
      image: "https://smarthr.co.in/demo/html/template/assets/img/apps/github.png",
      icon: Code2,
      color: "text-gray-800",
      connected: () => connectedApps.github,
    },
  ];

  const handleConnect = async (appId) => {
    setIsConnecting(prev => ({ ...prev, [appId]: true }));
    setTimeout(() => {
      setConnectedApps(prev => ({ ...prev, [appId]: true }));
      setIsConnecting(prev => ({ ...prev, [appId]: false }));
      alert(`${apps.find(app => app.id === appId).title} connected successfully!`);
    }, 2000);
  };

  const handleDisconnect = async (appId) => {
    if (window.confirm(`Are you sure you want to disconnect ${apps.find(app => app.id === appId).title}?`)) {
      setConnectedApps(prev => ({ ...prev, [appId]: false }));
      alert(`${apps.find(app => app.id === appId).title} disconnected successfully.`);
    }
  };

  const handleRevokeAccess = (appId) => {
    if (window.confirm(`Revoke all access for ${apps.find(app => app.id === appId).title}?`)) {
      setConnectedApps(prev => ({ ...prev, [appId]: false }));
      alert(`Access revoked for ${apps.find(app => app.id === appId).title}.`);
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 font-[Inter] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 mb-2 sm:mb-3">
              <button 
                onClick={() => navigate('/profile')}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 font-[Poppins]">
                Connected Apps
              </h1>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
              Manage the third-party applications connected to your account
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-4 sm:mb-6">
            <div className="border-b border-gray-200 text-center">
              <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 -mb-px overflow-x-auto">
                <button 
                  onClick={() => navigate('/profile')}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-2 border-b-2 font-medium text-xs sm:text-sm cursor-pointer"
                >
                  Profile Settings
                </button>
                <button 
                  onClick={() => navigate('/security-settings')}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-2 border-b-2 font-medium text-xs sm:text-sm cursor-pointer"
                >
                  Security Settings
                </button>
                <button 
                  onClick={() => navigate('/notifications')}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-2 border-b-2 font-medium text-xs sm:text-sm cursor-pointer"
                >
                  Notifications
                </button>
                <a 
                  href="#" 
                  className="border-orange-500 text-orange-600 whitespace-nowrap py-2 px-2 border-b-2 font-medium text-xs sm:text-sm"
                >
                  Connected Apps
                </a>
              </nav>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Connected Apps Grid */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <Card className="bg-white shadow-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                    <Link className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-600" />
                    Connected Applications
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Review and manage apps with access to your Smarthr account
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {apps.map((app) => {
                      const isConnected = app.connected();
                      const connecting = isConnecting[app.id];
                      return (
                        <Card key={app.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                          <CardHeader className="p-3 sm:p-4">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${app.color} bg-opacity-10 p-2`}>
                                <app.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-gray-900 truncate">{app.title}</h3>
                              </div>
                              <div className="flex-shrink-0">
                                {isConnected ? (
                                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                    Connected
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                                    Disconnected
                                  </span>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="p-3 sm:p-4 space-y-3">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <img 
                                src={app.image} 
                                alt={app.title} 
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover border"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/48x48/6B7280/FFFFFF?text=' + app.title.charAt(0);
                                }}
                              />
                              <div className="flex-1">
                                <p className="text-xs text-gray-600 line-clamp-2">{app.description}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              {isConnected ? (
                                <>
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Access Level:</span>
                                    <span className="font-medium text-gray-900">Read & Write</span>
                                  </div>
                                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                    <button
                                      onClick={() => handleDisconnect(app.id)}
                                      className="flex-1 px-3 py-2 text-xs sm:text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors flex items-center justify-center space-x-1"
                                    >
                                      <XCircle className="w-4 h-4" />
                                      <span>Disconnect</span>
                                    </button>
                                    <button
                                      onClick={() => handleRevokeAccess(app.id)}
                                      className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center justify-center space-x-1"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                      <span>Revoke Access</span>
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <button
                                  onClick={() => handleConnect(app.id)}
                                  disabled={connecting}
                                  className="w-full px-3 py-2 text-xs sm:text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors flex items-center justify-center space-x-1"
                                >
                                  {connecting ? (
                                    <>
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                      <span>Connecting...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Link className="w-4 h-4" />
                                      <span>Connect {app.title}</span>
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* App Permissions Summary */}
              <Card className="bg-white shadow-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                    App Permissions Summary
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Overview of permissions granted to connected applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">App</th>
                          <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                          <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Connected On</th>
                          <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Last Used</th>
                          <th className="px-2 py-2 sm:px-4 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide领0 divide-y divide-gray-200">
                        {apps.filter(app => app.connected()).map((app) => (
                          <tr key={app.id} className="hover:bg-gray-50">
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-gray-900 flex items-center space-x-2">
                              <app.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${app.color}`} />
                              <span className="truncate">{app.title}</span>
                            </td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-500">
                              Read & Write
                            </td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                              {new Date().toLocaleDateString()}
                            </td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                              Today
                            </td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-right text-xs sm:text-sm font-medium space-x-1 sm:space-x-2">
                              <button
                                onClick={() => handleDisconnect(app.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Disconnect
                              </button>
                              <button
                                onClick={() => handleRevokeAccess(app.id)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Revoke
                              </button>
                            </td>
                          </tr>
                        ))}
                        {apps.filter(app => !app.connected()).length === apps.length && (
                          <tr>
                            <td colSpan={5} className="px-2 py-2 sm:px-4 sm:py-3 text-center text-xs sm:text-sm text-gray-500">
                              No apps connected yet. Connect an app to get started.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white shadow-sm lg:col-span-1">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-2">
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                  <span>View All Integrations</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span>Manage Permissions</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <span>Explore More Apps</span>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectedApps;