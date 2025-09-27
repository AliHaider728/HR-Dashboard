import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Shield,
  CheckCircle2,
  AlertCircle,
  Settings,
  Edit,
  Save,
  Loader2,
  Clock,
  Hash,
  Smartphone,
  Mail,
  Key,
} from "lucide-react";

const OtpSettings = () => {
  const navigate = useNavigate();
  
  const [otpConfig, setOtpConfig] = useState({
    enabled: true,
    otpType: "numeric", // 'numeric', 'alphanumeric'
    digitLimit: 6,
    expireTime: 5, // minutes
    isEditing: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setOtpConfig(prev => ({ ...prev, [field]: value }));
  };

  const toggleEdit = () => {
    setOtpConfig(prev => ({ ...prev, isEditing: !prev.isEditing }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setOtpConfig(prev => ({ ...prev, isEditing: false }));
        setIsSaving(false);
        alert("OTP settings updated successfully!");
      }, 1500);
    } catch (error) {
      setIsSaving(false);
      alert("Error saving OTP settings. Please try again.");
    }
  };

  const getStatusIcon = (enabled) => {
    return enabled ? (
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-500" />
    );
  };

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
                  OTP Settings
                </h1>
                <p className="text-gray-600 mt-1">
                  Configure One-Time Password settings for authentication
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* OTP Type Card */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <Shield className="w-5 h-5 mr-2 text-orange-600" />
                  OTP Type
                </CardTitle>
                <CardDescription>
                  Select the type of OTP to be generated
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {otpConfig.isEditing ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="numeric"
                        name="otpType"
                        value="numeric"
                        checked={otpConfig.otpType === "numeric"}
                        onChange={(e) => handleInputChange('otpType', e.target.value)}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                      />
                      <label htmlFor="numeric" className="text-sm font-medium text-gray-700 cursor-pointer">
                        <Key className="w-4 h-4 inline mr-2" />
                        Numeric (0-9)
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="alphanumeric"
                        name="otpType"
                        value="alphanumeric"
                        checked={otpConfig.otpType === "alphanumeric"}
                        onChange={(e) => handleInputChange('otpType', e.target.value)}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                      />
                      <label htmlFor="alphanumeric" className="text-sm font-medium text-gray-700 cursor-pointer">
                        <Key className="w-4 h-4 inline mr-2" />
                        Alphanumeric (A-Z, 0-9)
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="flex justify-center mb-3">
                      <Key className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {otpConfig.otpType}
                    </p>
                    <p className="text-xs text-gray-500">
                      {otpConfig.otpType === 'numeric' ? 'Numbers only' : 'Letters and numbers'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* OTP Digit Limit Card */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <Hash className="w-5 h-5 mr-2 text-green-600" />
                  OTP Digit Limit
                </CardTitle>
                <CardDescription>
                  Set the length of the OTP code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {otpConfig.isEditing ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Length</label>
                      <input
                        type="number"
                        value={otpConfig.digitLimit}
                        onChange={(e) => handleInputChange('digitLimit', parseInt(e.target.value))}
                        min="4"
                        max="10"
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                      />
                    </div>
                    <div className="flex justify-center space-x-1 mt-4">
                      {[...Array(otpConfig.digitLimit)].map((_, i) => (
                        <div key={i} className="w-6 h-8 bg-gray-100 rounded border flex items-center justify-center">
                          <span className="text-xs text-gray-500">*</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      {otpConfig.digitLimit} {otpConfig.digitLimit === 1 ? 'digit' : 'digits'}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="flex justify-center mb-3">
                      <Hash className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {otpConfig.digitLimit} {otpConfig.digitLimit === 1 ? 'digit' : 'digits'}
                    </p>
                    <p className="text-xs text-gray-500">OTP length</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* OTP Expire Time Card */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <Clock className="w-5 h-5 mr-2 text-purple-600" />
                  OTP Expire Time
                </CardTitle>
                <CardDescription>
                  Set how long OTP remains valid
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {otpConfig.isEditing ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Expiry</label>
                      <input
                        type="number"
                        value={otpConfig.expireTime}
                        onChange={(e) => handleInputChange('expireTime', parseInt(e.target.value))}
                        min="1"
                        max="30"
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                      />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      <Clock className="w-5 h-5 text-purple-600 mr-2" />
                      <span className="text-sm text-gray-500">{otpConfig.expireTime} minutes</span>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Now</span>
                        <span className={`text-sm font-medium ${
                          otpConfig.expireTime >= 5 ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {otpConfig.expireTime} min
                        </span>
                        <span className="text-gray-500">Expired</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            otpConfig.expireTime >= 5 
                              ? 'bg-green-500' 
                              : otpConfig.expireTime >= 2 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                          }`} 
                          style={{ width: `${Math.min((otpConfig.expireTime / 30) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="flex justify-center mb-3">
                      <Clock className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {otpConfig.expireTime} {otpConfig.expireTime === 1 ? 'minute' : 'minutes'}
                    </p>
                    <p className="text-xs text-gray-500">OTP validity</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Actions Card */}
          <Card className="bg-white shadow-sm mt-8">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                <Settings className="w-5 h-5 mr-2 text-gray-600" />
                Configuration Actions
              </CardTitle>
              <CardDescription>
                Manage and test your OTP settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <input
                  type="checkbox"
                  id="otp-enabled"
                  checked={otpConfig.enabled}
                  onChange={(e) => handleInputChange('enabled', e.target.checked)}
                  disabled={!otpConfig.isEditing}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                />
                <label htmlFor="otp-enabled" className="text-sm font-medium text-gray-700">
                  Enable OTP Authentication System
                </label>
              </div>

              {otpConfig.isEditing ? (
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={toggleEdit}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
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
                        <span>Save Settings</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={toggleEdit}
                    className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Settings</span>
                  </button>
                  {otpConfig.enabled && (
                    <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Test OTP</span>
                    </button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OtpSettings;