import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Edit3,
  X,
  Check,
  Camera,
  Save,
  Loader2,
  Upload,
  Image as ImageIcon,
  Activity,
  Globe,
  Map,
} from "lucide-react";

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Anthony",
    lastName: "Lewis",
    email: "anthony.lewis@company.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave",
    country: "United States",
    state: "California",
    city: "San Francisco",
    postalCode: "94105",
    dateOfBirth: "1990-05-15",
    department: "Finance",
    position: "Finance Manager",
    bio: "Experienced finance professional with 10+ years in financial planning and analysis. Skilled in budgeting, forecasting, and financial reporting.",
  });

  const [profileImage, setProfileImage] = useState(
    "https://smarthr.co.in/demo/html/template/assets/img/users/user-32.jpg"
  );
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IN", name: "India" },
    { code: "JP", name: "Japan" },
    { code: "BR", name: "Brazil" },
    { code: "CN", name: "China" }
  ];

  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
  ];

  const departments = [
    "Finance", "IT Management", "Marketing", "Sales", "HR", "Administration",
    "Product Management", "Customer Support", "Operations", "Legal"
  ];

  const positions = [
    "Manager", "Senior Manager", "Director", "VP", "CFO", "CTO", "CEO",
    "Analyst", "Senior Analyst", "Developer", "Senior Developer",
    "Designer", "Senior Designer", "Consultant", "Senior Consultant"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.country) {
      newErrors.country = "Country is required";
    }
    if (!formData.state) {
      newErrors.state = "State is required";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.postalCode.replace(/\s/g, ''))) {
      newErrors.postalCode = "Postal code is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API call
      setTimeout(() => {
        setIsEditing(false);
        // In real app, save to backend here
        console.log("Profile updated:", formData);
      }, 1500);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reset to original data if needed
  };

  const handleImageUpload = (e) => {
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

      setIsUploading(true);
      
      // Simulate upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result);
          setImagePreview(reader.result);
          setIsUploading(false);
          // In real app, upload to server and get new URL
          console.log("Image uploaded:", file.name);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const removeImage = () => {
    setProfileImage("https://via.placeholder.com/120x120/6B7280/FFFFFF?text=UA");
    setImagePreview(null);
    // In real app, trigger API to remove profile picture
  };

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <div className=" bg-gray-50 py-8 font-[Inter]">
        <div className="space-y-6  max-w-ful mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-[Poppins] mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600">
              Update your personal information and manage your profile
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <a 
                  href="/profile" 
                  className="border-orange-500 text-orange-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  Profile Settings
                </a>
                <a 
                  href="/security" 
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  Security Settings
                </a>
                <a 
                  href="/notifications" 
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  Notifications
                </a>
                <a 
                  href="/connected-apps" 
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  Connected Apps
                </a>
              </nav>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <Card className="lg:col-span-1 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <User className="w-5 h-5 mr-2 text-orange-600" />
                  Profile Photo
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Recommended image size is 40px x 40px
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                    <div className="relative">
                      <img
                        src={imagePreview || profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      {isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                          <Loader2 className="w-6 h-6 text-white animate-spin" />
                        </div>
                      )}
                    </div>
                    
                    {!isUploading && (
                      <div className="absolute -inset-2 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <label className="cursor-pointer flex items-center space-x-2 bg-white bg-opacity-80 hover:bg-opacity-100 px-3 py-2 rounded-full text-sm font-medium text-gray-700 shadow-lg transition-all duration-200">
                          <Camera className="w-4 h-4" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          onClick={removeImage}
                          className="ml-2 p-2 bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full transition-all duration-200"
                          title="Remove photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Click on photo to upload new image
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG or GIF (max 2MB)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-lg font-semibold font-[Poppins]">
                    Basic Information
                  </CardTitle>
                  <div className="flex items-center space-x-3">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center space-x-2"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={!isEditing}
                          className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors flex items-center space-x-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-md transition-colors flex items-center space-x-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                                isEditing
                                  ? "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed"
                              } ${errors.firstName ? "border-red-300 focus:ring-red-500" : ""}`}
                            />
                          </div>
                          {errors.firstName && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              {errors.firstName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                                isEditing
                                  ? "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed"
                              } ${errors.lastName ? "border-red-300 focus:ring-red-500" : ""}`}
                            />
                          </div>
                          {errors.lastName && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                                isEditing
                                  ? "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed"
                              } ${errors.email ? "border-red-300 focus:ring-red-500" : ""}`}
                            />
                          </div>
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                                isEditing
                                  ? "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed"
                              } ${errors.phone ? "border-red-300 focus:ring-red-500" : ""}`}
                            />
                          </div>
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div>
                      <h3 className="text-lg font-semibold font-[Poppins] mb-4 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                        Address Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-6 md:space-y-0">
                        {/* Address Line */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="Street address"
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                                isEditing
                                  ? "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed"
                              } ${errors.address ? "border-red-300 focus:ring-red-500" : ""}`}
                            />
                          </div>
                          {errors.address && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              {errors.address}
                            </p>
                          )}
                        </div>

                        {/* Country */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 appearance-none ${
                                isEditing
                                  ? "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed"
                              } ${errors.country ? "border-red-300 focus:ring-red-500" : ""}`}
                            >
                              <option value="">Select Country</option>
                              {countries.map((country) => (
                                <option key={country.code} value={country.name}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                          {errors.country && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              {errors.country}
                            </p>
                          )}
                        </div>

                        {/* State */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 appearance-none ${
                                isEditing
                                  ? "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed"
                              } ${errors.state ? "border-red-300 focus:ring-red-500" : ""}`}
                            >
                              <option value="">Select State</option>
                              {states.map((state) => (
                                <option key={state} value={state}>{state}</option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                          {errors.state && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              {errors.state}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* City */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                                isEditing
                                  ? "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed"
                              } ${errors.city ? "border-red-300 focus:ring-red-500" : ""}`}
                            />
                          </div>
                          {errors.city && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              {errors.city}
                            </p>
                          )}
                        </div>

                        {/* Postal Code */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Postal Code <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                                isEditing
                                  ? "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed"
                              } ${errors.postalCode ? "border-red-300 focus:ring-red-500" : ""}`}
                            />
                          </div>
                          {errors.postalCode && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              {errors.postalCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Employment Information */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                                isEditing
                                  ? "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed"
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Department
                          </label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                              name="department"
                              value={formData.department}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 appearance-none ${
                                isEditing
                                  ? "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed"
                              }`}
                            >
                              {departments.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Position
                          </label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                              name="position"
                              value={formData.position}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 appearance-none ${
                                isEditing
                                  ? "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed"
                              }`}
                            >
                              {positions.map((pos) => (
                                <option key={pos} value={pos}>{pos}</option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio
                          </label>
                          <div className="relative">
                            <ImageIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <textarea
                              name="bio"
                              value={formData.bio}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              rows={3}
                              className={`w-full pl-10 pt-8 pr-4 py-2 border rounded-lg transition-all duration-200 resize-none ${
                                isEditing
                                  ? "border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed"
                              }`}
                              placeholder="Tell us about yourself..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold font-[Poppins] flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-600" />
                    Profile Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 font-[Poppins]">247</div>
                      <div className="text-sm text-gray-600 mt-1">Total Tasks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 font-[Poppins]">189</div>
                      <div className="text-sm text-gray-600 mt-1">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600 font-[Poppins]">58</div>
                      <div className="text-sm text-gray-600 mt-1">Pending</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;