 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Bell,
  Smartphone,
  MessageSquare,
  Mail,
  UserPlus,
  Calendar,
  Star,
  DollarSign,
  Shield,
  Activity,
  Save,
  Loader2,
  CheckCircle,
  X,
  Settings,
} from "lucide-react";

const NotificationSettings = () => {
  const navigate = useNavigate();
  
  // Notification preferences state
  const [notifications, setNotifications] = useState({
    newHire: {
      push: true,
      sms: false,
      email: true,
    },
    timeOff: {
      push: true,
      sms: true,
      email: true,
    },
    performance: {
      push: false,
      sms: false,
      email: true,
    },
    payroll: {
      push: true,
      sms: true,
      email: true,
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);

  const modules = [
    {
      id: "newHire",
      title: "New Hire and Onboarding Notifications",
      description: "Alerts when a new hire is added to the system.",
      icon: UserPlus,
      color: "text-green-600",
    },
    {
      id: "timeOff",
      title: "Time Off and Leave Requests",
      description: "Notifications when leave requests are approved or rejected.",
      icon: Calendar,
      color: "text-orange-600",
    },
    {
      id: "performance",
      title: "Employee Performance and Review Updates",
      description: "Notifications when performance reviews are updated or feedback is available.",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      id: "payroll",
      title: "Payroll and Compensation",
      description: "Alerts when payroll is processed or pending approval.",
      icon: DollarSign,
      color: "text-purple-600",
    },
  ];

  const handleNotificationToggle = (moduleId, type) => {
    setNotifications(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [type]: !prev[moduleId][type],
      },
    }));
    setShowUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowUnsavedChanges(false);
      alert("Notification settings updated successfully!");
    }, 1500);
  };

  const handleCancel = () => {
    // Reset to initial state if needed, or just close unsaved changes dialog
    setShowUnsavedChanges(false);
  };

  const handleDiscardChanges = () => {
    // Reset all toggles to initial state
    const initialState = {
      newHire: { push: true, sms: false, email: true },
      timeOff: { push: true, sms: true, email: true },
      performance: { push: false, sms: false, email: true },
      payroll: { push: true, sms: true, email: true },
    };
    setNotifications(initialState);
    setShowUnsavedChanges(false);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screen bg-gray-50 py-8 font-[Inter]">
        <div className=" max-w-ful  mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <button 
                onClick={() => navigate('/profile')}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-3xl font-bold text-gray-900 font-[Poppins]">
                Notification Settings
              </h1>
            </div>
            <p className="text-gray-600">
              Manage your notification preferences for different modules
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button 
                  onClick={() => navigate('/profile')}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm cursor-pointer"
                >
                  Profile Settings
                </button>
                <button 
                  onClick={() => navigate('/security-settings')}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm cursor-pointer"
                >
                  Security Settings
                </button>
                <a 
                  href="#" 
                  className="border-orange-500 text-orange-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  Notifications
                </a>
                <button 
                  onClick={() => navigate('/connected-apps')}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm cursor-pointer"
                >
                  Connected Apps
                </button>
              </nav>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {/* Main Notification Settings Card */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <Bell className="w-5 h-5 mr-2 text-orange-600" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications for each module
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notification Modules Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Modules
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Push
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SMS
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {modules.map((module) => (
                        <tr key={module.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${module.color} bg-opacity-10`}>
                                <module.icon className="w-4 h-4" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{module.title}</div>
                                <div className="text-sm text-gray-500">{module.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifications[module.id].push}
                                onChange={() => handleNotificationToggle(module.id, 'push')}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                            </label>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifications[module.id].sms}
                                onChange={() => handleNotificationToggle(module.id, 'sms')}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifications[module.id].email}
                                onChange={() => handleNotificationToggle(module.id, 'email')}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* General Notification Settings */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold font-[Poppins] mb-4 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-gray-600" />
                    General Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                      <span className="text-sm font-medium text-gray-700">Enable sound notifications</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                      <span className="text-sm font-medium text-gray-700">Group similar notifications</span>
                    </div>
                  </div>
                </div>

                {/* Save Actions */}
                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    onClick={handleCancel}
                    disabled={!showUnsavedChanges}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!showUnsavedChanges || isSaving}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors flex items-center space-x-2"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications Preview */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <Activity className="w-5 h-5 mr-2 text-indigo-600" />
                  Recent Notifications
                </CardTitle>
                <CardDescription>
                  Preview of your recent notification activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <Bell className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New hire added: John Doe</p>
                      <p className="text-xs text-gray-500">2 minutes ago • via Email</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Leave request approved</p>
                      <p className="text-xs text-gray-500">1 hour ago • via Push</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Payroll processed for this month</p>
                      <p className="text-xs text-gray-500">Yesterday • via SMS</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationSettings;