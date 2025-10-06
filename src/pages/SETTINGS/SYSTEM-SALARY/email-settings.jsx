import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  Settings,
  Edit,
  Save,
  Loader2,
} from "lucide-react";

const EmailSettings = () => {
  const navigate = useNavigate();
  
  const [phpMailer, setPhpMailer] = useState({
    connected: true,
    host: "localhost",
    port: 25,
    username: "",
    password: "",
    fromEmail: "",
    fromName: "",
    isEditing: false,
  });

  const [smtp, setSmtp] = useState({
    connected: true,
    host: "smtp.gmail.com",
    port: 587,
    username: "",
    password: "",
    fromEmail: "",
    fromName: "",
    encryption: "tls",
    auth: true,
    isEditing: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("php"); // 'php' or 'smtp'

  const handleInputChange = (section, field, value) => {
    if (section === 'php') {
      setPhpMailer(prev => ({ ...prev, [field]: value }));
    } else {
      setSmtp(prev => ({ ...prev, [field]: value }));
    }
  };

  const toggleEdit = (section) => {
    if (section === 'php') {
      setPhpMailer(prev => ({ ...prev, isEditing: !prev.isEditing }));
    } else {
      setSmtp(prev => ({ ...prev, isEditing: !prev.isEditing }));
    }
  };

  const handleSave = async (section) => {
    setIsSaving(true);
    try {
      // Simulate API call
      setTimeout(() => {
        if (section === 'php') {
          setPhpMailer(prev => ({ ...prev, isEditing: false }));
        } else {
          setSmtp(prev => ({ ...prev, isEditing: false }));
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

  const renderForm = (config, section) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Host</label>
        <input
          type="text"
          value={config.host}
          onChange={(e) => handleInputChange(section, 'host', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={!config.isEditing}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
          <input
            type="number"
            value={config.port}
            onChange={(e) => handleInputChange(section, 'port', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={!config.isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
          <select
            value={config.encryption}
            onChange={(e) => handleInputChange(section, 'encryption', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={!config.isEditing || section === 'php'}
          >
            <option value="none">None</option>
            <option value="ssl">SSL</option>
            <option value="tls">TLS</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
        <input
          type="email"
          value={config.username}
          onChange={(e) => handleInputChange(section, 'username', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={!config.isEditing}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <input
          type="password"
          value={config.password}
          onChange={(e) => handleInputChange(section, 'password', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={!config.isEditing}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
          <input
            type="email"
            value={config.fromEmail}
            onChange={(e) => handleInputChange(section, 'fromEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={!config.isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
          <input
            type="text"
            value={config.fromName}
            onChange={(e) => handleInputChange(section, 'fromName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={!config.isEditing}
          />
        </div>
      </div>
      {section === 'smtp' && (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="auth"
            checked={config.auth}
            onChange={(e) => handleInputChange(section, 'auth', e.target.checked)}
            disabled={!config.isEditing}
          />
          <label htmlFor="auth" className="text-sm font-medium text-gray-700">Require Authentication</label>
        </div>
      )}
    </div>
  );

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screen bg-gray-50 py-8 font-[Inter]">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
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
                  Email Settings
                </h1>
                <p className="text-gray-600 mt-1">
                  Configure email delivery methods for notifications and communications
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PHP Mailer Card */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                    <Mail className="w-5 h-5 mr-2 text-orange-600" />
                    PHP Mailer
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(phpMailer.connected)}
                    <span className={`text-sm font-medium ${phpMailer.connected ? 'text-green-600' : 'text-red-600'}`}>
                      {phpMailer.connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
                <CardDescription>
                  Used to send emails safely and easily via PHP code from a web server.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {phpMailer.isEditing ? (
                  <>
                    {renderForm(phpMailer, 'php')}
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={() => toggleEdit('php')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave('php')}
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
                      onClick={() => toggleEdit('php')}
                      className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* SMTP Card */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                    <Mail className="w-5 h-5 mr-2 text-green-600" />
                    SMTP
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(smtp.connected)}
                    <span className={`text-sm font-medium ${smtp.connected ? 'text-green-600' : 'text-red-600'}`}>
                      {smtp.connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
                <CardDescription>
                  SMTP is used to send, relay or forward messages from a mail client.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {smtp.isEditing ? (
                  <>
                    {renderForm(smtp, 'smtp')}
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={() => toggleEdit('smtp')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave('smtp')}
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
                      onClick={() => toggleEdit('smtp')}
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

          {/* Test Email Section */}
          <Card className="bg-white shadow-sm mt-8">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                <Settings className="w-5 h-5 mr-2 text-purple-600" />
                Test Email Configuration
              </CardTitle>
              <CardDescription>
                Send a test email to verify your configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end">
                <button className="px-6 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Send Test Email</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EmailSettings;