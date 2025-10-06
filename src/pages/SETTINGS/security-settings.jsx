import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Shield,
  Lock,
  Key,
  Phone,
  Mail,
  Smartphone,
  Activity,
  AlertTriangle,
  Zap,
  CheckCircle,
  X,
  Edit3,
  Save,
  Loader2,
  UserX,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

const SecuritySettings = () => {
  const navigate = useNavigate();
  
  // Password state
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // 2FA state
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("sms");

  // Google Auth state
  const [isGoogleConnected, setIsGoogleConnected] = useState(true);

  // Device management state
  const [activeDevices, setActiveDevices] = useState([
    {
      id: 1,
      name: "iPhone 14 Pro - Anthony's iPhone",
      type: "mobile",
      lastActive: "2024-01-15 10:30 AM",
      location: "San Francisco, CA",
      isCurrent: true,
    },
    {
      id: 2,
      name: "MacBook Pro 2023",
      type: "desktop",
      lastActive: "2024-01-15 09:15 AM",
      location: "San Francisco, CA",
      isCurrent: false,
    },
    {
      id: 3,
      name: "Windows Desktop",
      type: "desktop",
      lastActive: "2024-01-10 03:45 PM",
      location: "New York, NY",
      isCurrent: false,
    },
  ]);

  // Activity state
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      action: "Login",
      ip: "192.168.1.100",
      location: "San Francisco, CA",
      device: "iPhone 14 Pro",
      time: "2024-01-15 10:30 AM",
      status: "success",
    },
    {
      id: 2,
      action: "Password Changed",
      ip: "192.168.1.101",
      location: "San Francisco, CA",
      device: "MacBook Pro",
      time: "2024-01-15 09:15 AM",
      status: "success",
    },
    {
      id: 3,
      action: "Login Attempt",
      ip: "203.0.113.50",
      location: "Unknown",
      device: "Unknown",
      time: "2024-01-14 11:20 PM",
      status: "failed",
    },
  ]);

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePassword = () => {
    const newErrors = {};
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      setIsUpdatingPassword(true);
      setTimeout(() => {
        setIsUpdatingPassword(false);
        setIsEditingPassword(false);
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        alert("Password updated successfully!");
      }, 2000);
    }
  };

  const handlePasswordCancel = () => {
    setIsEditingPassword(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordErrors({});
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleTogglePasswordVisibility = (field) => {
    switch(field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  const handleEnable2FA = async () => {
    setIsEnabling2FA(true);
    setTimeout(() => {
      setIsEnabling2FA(false);
      setIs2FAEnabled(true);
      alert("2FA has been enabled successfully!");
    }, 2000);
  };

  const handleDisable2FA = async () => {
    if (window.confirm("Are you sure you want to disable 2FA? This will make your account less secure.")) {
      setIs2FAEnabled(false);
      alert("2FA has been disabled.");
    }
  };

  const handleDisconnectGoogle = () => {
    if (window.confirm("Are you sure you want to disconnect your Google account?")) {
      setIsGoogleConnected(false);
      alert("Google account disconnected successfully.");
    }
  };

  const handleConnectGoogle = () => {
    alert("Redirecting to Google authentication...");
    setIsGoogleConnected(true);
  };

  const handleSignOutDevice = (deviceId) => {
    if (window.confirm("Are you sure you want to sign out this device?")) {
      setActiveDevices(prev => prev.map(device => 
        device.id === deviceId 
          ? { ...device, isCurrent: false, lastActive: new Date().toISOString() }
          : device
      ));
      alert("Device signed out successfully.");
    }
  };

  const handleSignOutAll = () => {
    if (window.confirm("Are you sure you want to sign out all devices except this one?")) {
      setActiveDevices(prev => prev.map(device => ({
        ...device,
        isCurrent: false
      })));
      alert("All devices signed out successfully.");
    }
  };

  const handleDeactivateAccount = () => {
    if (window.confirm("Are you sure you want to deactivate your account? You can reactivate it by signing in again.")) {
      alert("Account deactivated successfully. You will be redirected to login.");
      navigate('/login');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("This action cannot be undone. Are you sure you want to permanently delete your account?")) {
      if (window.confirm("This will permanently delete all your data. Type 'DELETE' to confirm:")) {
        const userInput = prompt("Type 'DELETE' to confirm account deletion:");
        if (userInput === 'DELETE') {
          alert("Account deleted permanently.");
          navigate('/login');
        }
      }
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screen bg-gray-50 py-6 sm:py-8 font-[Inter] px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <button 
                onClick={() => navigate('/profile')}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-[Poppins]">
                Security Settings
              </h1>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage your account security and privacy settings
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-6 sm:mb-8 text-center items-center">
            <div className="border-b border-gray-200">
              <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 sm:-mb-px">
                <button 
                  onClick={() => navigate('/profile')}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 sm:px-2 border-b-2 font-medium text-sm sm:text-base cursor-pointer"
                >
                  Profile Settings
                </button>
                <a 
                  href="#" 
                  className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 sm:px-2 border-b-2 font-medium text-sm sm:text-base"
                >
                  Security Settings
                </a>
                <button 
                  onClick={() => navigate('/notifications')}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 sm:px-2 border-b-2 font-medium text-sm sm:text-base cursor-pointer"
                >
                  Notifications
                </button>
                <button 
                  onClick={() => navigate('/connected-apps')}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 sm:px-2 border-b-2 font-medium text-sm sm:text-base cursor-pointer"
                >
                  Connected Apps
                </button>
              </nav>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - Main Security Settings */}
            <div className="space-y-4 sm:space-y-6">
              {/* Password Section */}
              <Card className="bg-white shadow-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-600" />
                    Password
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Set a unique password to protect your account
                  </CardDescription>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Last Changed: 03 Jan 2024, 09:00 AM
                  </p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {isEditingPassword ? (
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Current Password <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordInputChange}
                              className={`w-full pr-10 sm:pr-12 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                passwordErrors.currentPassword ? "border-red-300" : "border-gray-300"
                              }`}
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => handleTogglePasswordVisibility('current')}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          {passwordErrors.currentPassword && (
                            <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              {passwordErrors.currentPassword}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            New Password <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordInputChange}
                              className={`w-full pr-10 sm:pr-12 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                passwordErrors.newPassword ? "border-red-300" : "border-gray-300"
                              }`}
                              placeholder="Enter new password (min 8 characters)"
                            />
                            <button
                              type="button"
                              onClick={() => handleTogglePasswordVisibility('new')}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          {passwordErrors.newPassword && (
                            <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              {passwordErrors.newPassword}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Confirm New Password <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordInputChange}
                              className={`w-full pr-10 sm:pr-12 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                passwordErrors.confirmPassword ? "border-red-300" : "border-gray-300"
                              }`}
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => handleTogglePasswordVisibility('confirm')}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          {passwordErrors.confirmPassword && (
                            <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              {passwordErrors.confirmPassword}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 sm:space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={handlePasswordCancel}
                          className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center space-x-2 w-full sm:w-auto"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                        <button
                          type="submit"
                          disabled={isUpdatingPassword}
                          className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors flex items-center space-x-2 w-full sm:w-auto"
                        >
                          {isUpdatingPassword ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Updating...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              <span>Update Password</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          Your password was last changed on 03 Jan 2024
                        </p>
                      </div>
                      <button
                        onClick={() => setIsEditingPassword(true)}
                        className="px-3 sm:px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center space-x-2 mt-3 sm:mt-0 w-full sm:w-auto"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Change Password</span>
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Two Factor Authentication */}
              <Card className="bg-white shadow-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                    Two Factor Authentication
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Receive codes via SMS or email every time you login
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{is2FAEnabled ? "Enabled" : "Disabled"}</p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {is2FAEnabled 
                          ? `Codes are sent via ${selectedMethod.toUpperCase()}`
                          : "Add extra security to your account"
                        }
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 mt-3 sm:mt-0">
                      {is2FAEnabled ? (
                        <button
                          onClick={handleDisable2FA}
                          disabled={isEnabling2FA}
                          className="px-3 sm:px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors flex items-center space-x-2 w-full sm:w-auto"
                        >
                          <X className="w-4 h-4" />
                          <span>Disable</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleEnable2FA}
                          disabled={isEnabling2FA}
                          className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors flex items-center space-x-2 w-full sm:w-auto"
                        >
                          {isEnabling2FA ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Enabling...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>Enable</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {is2FAEnabled && (
                    <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            2FA is currently active
                          </p>
                          <p className="text-xs sm:text-sm text-blue-700">
                            You'll receive a code via {selectedMethod} for each login attempt.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Phone Number Verification */}
              <Card className="bg-white shadow-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                    Phone Number Verification
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    The phone number associated with the account
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Verified Mobile Number: +99264710583
                      </p>
                      <p className="text-xs sm:text-sm text-green-600 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified
                      </p>
                    </div>
                    <button className="px-3 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors mt-3 sm:mt-0 w-full sm:w-auto">
                      Change Number
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Email Verification */}
              <Card className="bg-white shadow-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                    Email Verification
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    The email address associated with the account
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Verified Email: anthony.lewis@company.com
                      </p>
                      <p className="text-xs sm:text-sm text-green-600 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified
                      </p>
                    </div>
                    <button className="px-3 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors mt-3 sm:mt-0 w-full sm:w-auto">
                      Change Email
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Additional Settings */}
            <div className="space-y-4 sm:space-y-6">
              {/* Google Authentication */}
              <Card className="bg-white shadow-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                    <Key className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-600" />
                    Google Authentication
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Connect your Google account for easier login
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {isGoogleConnected ? "Connected" : "Not Connected"}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {isGoogleConnected 
                          ? "You can sign in with your Google account"
                          : "Connect your Google account to enable single sign-on"
                        }
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 mt-3 sm:mt-0">
                      {isGoogleConnected ? (
                        <button
                          onClick={handleDisconnectGoogle}
                          className="px-3 sm:px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors flex items-center space-x-2 w-full sm:w-auto"
                        >
                          <X className="w-4 h-4" />
                          <span>Disconnect</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleConnectGoogle}
                          className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center space-x-2 w-full sm:w-auto"
                        >
                          <Key className="w-4 h-4" />
                          <span>Connect Google</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {isGoogleConnected && (
                    <div className="p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="p-2 bg-orange-100 rounded-full">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-orange-900">
                            Google account connected
                          </p>
                          <p className="text-xs sm:text-sm text-orange-700">
                            You can now sign in with your Google account
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Device Management */}
              <Card className="bg-white shadow-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                    Device Management
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    The devices associated with your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-3">
                    {activeDevices.map((device) => (
                      <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                            device.type === 'mobile' 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {device.type === 'mobile' ? (
                              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate">{device.name}</p>
                            <p className="text-xs text-gray-500 truncate">
                              Last active: {device.lastActive} • {device.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {device.isCurrent && (
                            <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                              Current
                            </span>
                          )}
                          {!device.isCurrent && (
                            <button
                              onClick={() => handleSignOutDevice(device.id)}
                              className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-full transition-colors"
                            >
                              Sign Out
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleSignOutAll}
                    className="w-full px-3 sm:px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors flex items-center justify-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Sign Out All Other Devices</span>
                  </button>
                </CardContent>
              </Card>

              {/* Account Activity */}
              <Card className="bg-white shadow-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-600" />
                    Account Activity
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Recent activities of your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className={`flex items-center space-x-2 sm:space-x-3 p-3 rounded-lg ${
                        activity.status === 'success' 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 capitalize truncate">
                            {activity.action} from {activity.device}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {activity.location} • {activity.ip} • {activity.time}
                          </p>
                        </div>
                        <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                          activity.status === 'success'
                            ? 'text-green-700 bg-green-100'
                            : 'text-red-700 bg-red-100'
                        }`}>
                          {activity.status === 'success' ? 'Success' : 'Failed'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-8 sm:mt-12">
            <Card className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins] text-red-800">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-red-700">
                  These actions are permanent and cannot be undone
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between p-4 sm:p-6 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Deactivate Account</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      This will shutdown your account. Your account will be reactivated when you sign in again.
                    </p>
                  </div>
                  <button
                    onClick={handleDeactivateAccount}
                    className="px-4 sm:px-6 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition-colors mt-3 md:mt-0 w-full md:w-auto"
                  >
                    Deactivate Account
                  </button>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between p-4 sm:p-6 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Delete Account</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Your account will be permanently deleted. This action cannot be undone.
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 sm:px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors mt-3 md:mt-0 w-full md:w-auto flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecuritySettings;