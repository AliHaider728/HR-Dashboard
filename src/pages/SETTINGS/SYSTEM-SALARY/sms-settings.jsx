import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Settings,
  Edit,
  Save,
  Loader2,
  Key,
  Hash,
} from "lucide-react";

const SmsSettings = () => {
  const navigate = useNavigate();
  
  const [twilio, setTwilio] = useState({
    connected: true,
    accountSid: "",
    authToken: "",
    fromNumber: "",
    isEditing: false,
  });

  const [textlocal, setTextlocal] = useState({
    connected: true,
    apiKey: "",
    senderId: "",
    isEditing: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("twilio"); // 'twilio' or 'textlocal'

  const handleInputChange = (section, field, value) => {
    if (section === 'twilio') {
      setTwilio(prev => ({ ...prev, [field]: value }));
    } else {
      setTextlocal(prev => ({ ...prev, [field]: value }));
    }
  };

  const toggleEdit = (section) => {
    if (section === 'twilio') {
      setTwilio(prev => ({ ...prev, isEditing: !prev.isEditing }));
    } else {
      setTextlocal(prev => ({ ...prev, isEditing: !prev.isEditing }));
    }
  };

  const handleSave = async (section) => {
    setIsSaving(true);
    try {
      // Simulate API call
      setTimeout(() => {
        if (section === 'twilio') {
          setTwilio(prev => ({ ...prev, isEditing: false }));
        } else {
          setTextlocal(prev => ({ ...prev, isEditing: false }));
        }
        setIsSaving(false);
        alert(`${section.toUpperCase()} settings updated successfully!`);
      }, 1500);
    } catch (error) {
      setIsSaving(false);
      alert(`Error saving ${section} settings. Please try again.`);
    }
  };

  const getStatusIcon = (connected) => {
    return connected ? (
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-500" />
    );
  };

  const renderTwilioForm = (config) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2  items-center">
          <Key className="w-4 h-4 mr-2 text-orange-600" />
          Account SID
        </label>
        <input
          type="text"
          value={config.accountSid}
          onChange={(e) => handleInputChange('twilio', 'accountSid', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="Your Twilio Account SID"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2  items-center">
          <Key className="w-4 h-4 mr-2 text-orange-600" />
          Auth Token
        </label>
        <input
          type="password"
          value={config.authToken}
          onChange={(e) => handleInputChange('twilio', 'authToken', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="Your Twilio Auth Token"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2  items-center">
          <Hash className="w-4 h-4 mr-2 text-orange-600" />
          From Number
        </label>
        <input
          type="text"
          value={config.fromNumber}
          onChange={(e) => handleInputChange('twilio', 'fromNumber', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="+1234567890"
        />
      </div>
    </div>
  );

  const renderTextlocalForm = (config) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2  items-center">
          <Key className="w-4 h-4 mr-2 text-green-600" />
          API Key
        </label>
        <input
          type="text"
          value={config.apiKey}
          onChange={(e) => handleInputChange('textlocal', 'apiKey', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="Your TextLocal API Key"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2  items-center">
          <Hash className="w-4 h-4 mr-2 text-green-600" />
          Sender ID
        </label>
        <input
          type="text"
          value={config.senderId}
          onChange={(e) => handleInputChange('textlocal', 'senderId', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="Your Sender ID"
        />
      </div>
    </div>
  );

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screen bg-gray-50 py-8 font-[Inter]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <button 
                onClick={() => navigate('/settings')}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-[Poppins]">
                  SMS Settings
                </h1>
                <p className="text-gray-600 mt-1">
                  Configure SMS delivery methods for notifications and communications
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Twilio Card */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                    <MessageCircle className="w-5 h-5 mr-2 text-orange-600" />
                    Twilio
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(twilio.connected)}
                    <span className={`text-sm font-medium ${twilio.connected ? 'text-green-600' : 'text-red-600'}`}>
                      {twilio.connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
                <CardDescription>
                  Cloud communications platform for sending SMS messages globally.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {twilio.isEditing ? (
                  <>
                    {renderTwilioForm(twilio)}
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={() => toggleEdit('twilio')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave('twilio')}
                        disabled={isSaving}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-end">
                    <button
                      onClick={() => toggleEdit('twilio')}
                      className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* TextLocal Card */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                    <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                    TextLocal
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(textlocal.connected)}
                    <span className={`text-sm font-medium ${textlocal.connected ? 'text-green-600' : 'text-red-600'}`}>
                      {textlocal.connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
                <CardDescription>
                  SMS gateway service for sending bulk messages in India.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {textlocal.isEditing ? (
                  <>
                    {renderTextlocalForm(textlocal)}
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={() => toggleEdit('textlocal')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave('textlocal')}
                        disabled={isSaving}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-end">
                    <button
                      onClick={() => toggleEdit('textlocal')}
                      className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Test SMS Section */}
          <Card className="bg-white shadow-sm mt-8">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                <Settings className="w-5 h-5 mr-2 text-purple-600" />
                Test SMS Configuration
              </CardTitle>
              <CardDescription>
                Send a test SMS to verify your configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end">
                <button className="px-6 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Test SMS</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SmsSettings;