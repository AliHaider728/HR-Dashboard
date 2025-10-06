import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Building,
  Image,
  Upload,
  Camera,
  Save,
  Loader2,
  X,
  Edit3,
  CheckCircle,
  AlertCircle,
  Settings,
  Globe,
  Palette,
} from "lucide-react";

const BusinessSettings = () => {
  const navigate = useNavigate();
  
  // Logo states
  const [isUploading, setIsUploading] = useState({});
  const [logos, setLogos] = useState({
    main: "https://smarthr.co.in/demo/html/template/assets/img/logo/logo.png",
    white: "https://smarthr.co.in/demo/html/template/assets/img/logo/logo-white.png",
    dark: "https://smarthr.co.in/demo/html/template/assets/img/logo/logo-dark.png",
    miniWhite: "https://smarthr.co.in/demo/html/template/assets/img/logo/logo-mini-white.png",
    miniDark: "https://smarthr.co.in/demo/html/template/assets/img/logo/logo-mini-dark.png",
    favicon: "https://smarthr.co.in/demo/html/template/assets/img/logo/favicon.png",
    appleIcon: "https://smarthr.co.in/demo/html/template/assets/img/logo/apple-icon.png",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);

  const logoTypes = [
    {
      id: "main",
      title: "Company Logo",
      description: "Main company logo for general use",
      recommendedSize: "200px x 60px",
      currentImage: logos.main,
      preview: null,
    },
    {
      id: "white",
      title: "White Logo",
      description: "White version for dark backgrounds",
      recommendedSize: "160px x 50px",
      currentImage: logos.white,
      preview: null,
    },
    {
      id: "dark",
      title: "Dark Logo",
      description: "Dark version for light backgrounds",
      recommendedSize: "160px x 50px",
      currentImage: logos.dark,
      preview: null,
    },
    {
      id: "miniWhite",
      title: "White Mini Logo",
      description: "Small white logo for navigation",
      recommendedSize: "80px x 80px",
      currentImage: logos.miniWhite,
      preview: null,
    },
    {
      id: "miniDark",
      title: "Dark Mini Logo",
      description: "Small dark logo for navigation",
      recommendedSize: "80px x 80px",
      currentImage: logos.miniDark,
      preview: null,
    },
    {
      id: "favicon",
      title: "Favicon",
      description: "Browser favicon for bookmarks",
      recommendedSize: "128px x 128px",
      currentImage: logos.favicon,
      preview: null,
    },
    {
      id: "appleIcon",
      title: "Apple Icon",
      description: "Apple touch icon for iOS devices",
      recommendedSize: "180px x 180px",
      currentImage: logos.appleIcon,
      preview: null,
    },
  ];

  const handleImageUpload = async (logoId, e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB");
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert("Please select a valid image file");
        return;
      }

      setIsUploading(prev => ({ ...prev, [logoId]: true }));
      
      // Simulate upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogos(prev => ({ ...prev, [logoId]: reader.result }));
          setShowUnsavedChanges(true);
          setIsUploading(prev => ({ ...prev, [logoId]: false }));
          // Update preview for this specific logo
          logoTypes.find(type => type.id === logoId).preview = reader.result;
          console.log(`${logoId} uploaded:`, file.name);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleRemoveImage = (logoId) => {
    if (window.confirm(`Are you sure you want to remove the ${logoTypes.find(type => type.id === logoId).title}?`)) {
      // Reset to default placeholder
      const defaultImage = getDefaultImage(logoId);
      setLogos(prev => ({ ...prev, [logoId]: defaultImage }));
      setShowUnsavedChanges(true);
      // Clear preview
      logoTypes.find(type => type.id === logoId).preview = null;
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    // Simulate API call to save all logos
    setTimeout(() => {
      setIsSaving(false);
      setShowUnsavedChanges(false);
      alert("All business settings saved successfully!");
    }, 2000);
  };

  const handleCancelChanges = () => {
    if (window.confirm("Discard all unsaved changes?")) {
      // Reset all logos to initial state
      setLogos({
        main: "https://smarthr.co.in/demo/html/template/assets/img/logo/logo.png",
        white: "https://smarthr.co.in/demo/html/template/assets/img/logo/logo-white.png",
        dark: "https://smarthr.co.in/demo/html/template/assets/img/logo/logo-dark.png",
        miniWhite: "https://smarthr.co.in/demo/html/template/assets/img/logo/logo-mini-white.png",
        miniDark: "https://smarthr.co.in/demo/html/template/assets/img/logo/logo-mini-dark.png",
        favicon: "https://smarthr.co.in/demo/html/template/assets/img/logo/favicon.png",
        appleIcon: "https://smarthr.co.in/demo/html/template/assets/img/logo/apple-icon.png",
      });
      // Clear all previews
      logoTypes.forEach(type => type.preview = null);
      setShowUnsavedChanges(false);
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 font-[Inter] px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
              <button 
                onClick={() => navigate('/profile')}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 font-[Poppins]">
                Business Settings
              </h1>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">
              Configure your company's branding and visual identity
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
                <button 
                  onClick={() => navigate('/connected-apps')}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-2 border-b-2 font-medium text-xs sm:text-sm cursor-pointer"
                >
                  Connected Apps
                </button>
                <a 
                  href="#" 
                  className="border-orange-500 text-orange-600 whitespace-nowrap py-2 px-2 border-b-2 font-medium text-xs sm:text-sm"
                >
                  Business Settings
                </a>
              </nav>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Company Images Section */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <Card className="bg-white shadow-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                    <Image className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-600" />
                    Company Images
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Upload and manage your company logos and icons
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {logoTypes.slice(0, 4).map((logo) => (
                      <LogoUploadCard
                        key={logo.id}
                        logo={logo}
                        isUploading={isUploading[logo.id]}
                        onUpload={(e) => handleImageUpload(logo.id, e)}
                        onRemove={() => handleRemoveImage(logo.id)}
                      />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {logoTypes.slice(4, 6).map((logo) => (
                      <LogoUploadCard
                        key={logo.id}
                        logo={logo}
                        isUploading={isUploading[logo.id]}
                        onUpload={(e) => handleImageUpload(logo.id, e)}
                        onRemove={() => handleRemoveImage(logo.id)}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {logoTypes.slice(6).map((logo) => (
                      <LogoUploadCard
                        key={logo.id}
                        logo={logo}
                        isUploading={isUploading[logo.id]}
                        onUpload={(e) => handleImageUpload(logo.id, e)}
                        onRemove={() => handleRemoveImage(logo.id)}
                      />
                    ))}
                  </div>

                  {/* Save Actions */}
                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 sm:pt-6 border-t border-gray-200">
                    <button
                      onClick={handleCancelChanges}
                      disabled={!showUnsavedChanges}
                      className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors flex items-center justify-center space-x-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel Changes</span>
                    </button>
                    <button
                      onClick={handleSaveAll}
                      disabled={!showUnsavedChanges || isSaving}
                      className="px-3 py-2 text-xs sm:text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors flex items-center justify-center space-x-1"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save All Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Company Information Section */}
            <Card className="bg-white shadow-sm lg:col-span-1">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  Company Information
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Basic company details and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Smarthr Solutions Inc."
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Business Email
                    </label>
                    <input
                      type="email"
                      defaultValue="contact@smarthr.com"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter business email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      defaultValue="https://smarthr.co.in"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter website URL"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Branding Settings Section */}
            <Card className="bg-white shadow-sm lg:col-span-1">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                  Branding Settings
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Configure your brand colors and theme
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Primary Color
                    </label>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-6 sm:w-10 sm:h-8 bg-orange-600 rounded-lg border-2 border-orange-200"></div>
                      <input
                        type="color"
                        defaultValue="#2563EB"
                        className="w-8 h-6 sm:w-10 sm:h-8 rounded-lg cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm text-gray-500">#2563EB</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Secondary Color
                    </label>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-6 sm:w-10 sm:h-8 bg-purple-600 rounded-lg border-2 border-purple-200"></div>
                      <input
                        type="color"
                        defaultValue="#7C3AED"
                        className="w-8 h-6 sm:w-10 sm:h-8 rounded-lg cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm text-gray-500">#7C3AED</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Enable Dark Mode</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Card className="bg-white shadow-sm lg:col-span-2">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg font-semibold flex items-center font-[Poppins]">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-600" />
                  Live Preview
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  See how your branding will appear across the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="bg-gray-900 rounded-lg p-4 sm:p-6 text-white">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6">
                    {/* Header Preview */}
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-0">
                      <img 
                        src={logos.main} 
                        alt="Company Logo" 
                        className="h-10 w-auto sm:h-12"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200x60/2563EB/FFFFFF?text=LOGO';
                        }}
                      />
                      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">Smarthr Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 sm:px-3 sm:py-1 bg-orange-600 text-white rounded-full text-xs sm:text-sm">Live</span>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    </div>
                  </div>

                  {/* Navigation Preview */}
                  <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 sm:items-center">
                      <img 
                        src={logos.miniWhite} 
                        alt="Mini Logo" 
                        className="h-6 w-auto sm:h-8"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80/FFFFFF/000000?text=SM';
                        }}
                      />
                      <a href="#" className="text-gray-700 hover:text-orange-600 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm">Dashboard</a>
                      <a href="#" className="text-gray-700 hover:text-orange-600 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm">Employees</a>
                      <a href="#" className="text-gray-700 hover:text-orange-600 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm">Analytics</a>
                    </nav>
                  </div>

                  {/* Content Preview */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Building className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Company Overview</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Your business settings are looking great!</p>
                      </div>
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

// Logo Upload Card Component
const LogoUploadCard = ({ logo, isUploading, onUpload, onRemove }) => {
  const imageSrc = logo.preview || logo.currentImage;
  const sizes = {
    main: "w-32 h-10 sm:w-40 sm:h-12 lg:w-48 lg:h-16",
    white: "w-28 h-8 sm:w-32 sm:h-10 lg:w-40 lg:h-12",
    dark: "w-28 h-8 sm:w-32 sm:h-10 lg:w-40 lg:h-12",
    miniWhite: "w-16 h-16 sm:w-20 sm:h-20",
    miniDark: "w-16 h-16 sm:w-20 sm:h-20",
    favicon: "w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32",
    appleIcon: "w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36",
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900">{logo.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-2">{logo.description}</p>
        <p className="text-xs text-gray-400">Recommended: {logo.recommendedSize}</p>
      </div>
      
      <div className="relative group">
        <div className="relative">
          <img
            src={imageSrc}
            alt={`${logo.title} preview`}
            className={`${sizes[logo.id]} object-contain bg-gray-100 rounded-lg border-2 border-dashed border-gray-300`}
            onError={(e) => {
              e.target.src = getDefaultImage(logo.id);
            }}
          />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
              <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-spin" />
            </div>
          )}
        </div>
        
        {!isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2 bg-white bg-opacity-90 hover:bg-opacity-100 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
              <label className="cursor-pointer flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium text-gray-700">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Change</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onUpload}
                  className="hidden"
                />
              </label>
              {imageSrc !== getDefaultImage(logo.id) && (
                <button
                  onClick={onRemove}
                  className="p-1 text-red-600 hover:text-red-800 rounded"
                  title="Remove image"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Default image function for fallback
const getDefaultImage = (logoId) => {
  const defaults = {
    main: "https://via.placeholder.com/200x60/2563EB/FFFFFF?text=LOGO",
    white: "https://via.placeholder.com/160x50/FFFFFF/000000?text=LOGO",
    dark: "https://via.placeholder.com/160x50/1F2937/FFFFFF?text=LOGO",
    miniWhite: "https://via.placeholder.com/80x80/FFFFFF/000000?text=SM",
    miniDark: "https://via.placeholder.com/80x80/1F2937/FFFFFF?text=SM",
    favicon: "https://via.placeholder.com/128x128/2563EB/FFFFFF?text=F",
    appleIcon: "https://via.placeholder.com/180x180/2563EB/FFFFFF?text=A",
  };
  return defaults[logoId] || "https://via.placeholder.com/160x50/6B7280/FFFFFF?text=LOGO";
};

export default BusinessSettings;