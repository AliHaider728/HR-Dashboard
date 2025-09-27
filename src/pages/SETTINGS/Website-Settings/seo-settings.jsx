import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Search,
  Globe,
  Share2,
  Image,
  FileText,
  Code,
  Upload,
  Camera,
  Save,
  Loader2,
  X,
  Edit3,
  CheckCircle,
  AlertCircle,
  Settings,
  Link2,
  Twitter,
  Facebook,
} from "lucide-react";

const SeoSettings = () => {
  const navigate = useNavigate();

  // SEO state
  const [seoData, setSeoData] = useState({
    metaTitle: "Smarthr - HR Management & Analytics Platform",
    metaDescription: "Streamline your HR processes with Smarthr. Advanced analytics, employee management, and seamless integration for modern businesses.",
    keywords: "HR management, employee analytics, payroll software, onboarding, performance reviews",
    ogTitle: "Smarthr - HR Management & Analytics Platform",
    ogDescription: "Streamline your HR processes with Smarthr. Advanced analytics, employee management, and seamless integration for modern businesses.",
    ogImage: "https://smarthr.co.in/demo/html/template/assets/img/logo/og-image.png",
    twitterCard: "summary_large_image",
    twitterTitle: "Smarthr - HR Management & Analytics Platform",
    twitterDescription: "Streamline your HR processes with Smarthr.",
    twitterImage: "https://smarthr.co.in/demo/html/template/assets/img/logo/twitter-image.png",
    canonicalUrl: "https://smarthr.co.in",
    robotsTxt: `User-agent: *
Allow: /
Sitemap: https://smarthr.co.in/sitemap.xml`,
    isIndexingEnabled: true,
    isFollowEnabled: true,
  });

  const [isUploadingOgImage, setIsUploadingOgImage] = useState(false);
  const [isUploadingTwitterImage, setIsUploadingTwitterImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSeoData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setShowUnsavedChanges(true);
  };

  const handleOgImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("OG Image size must be less than 2MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      setIsUploadingOgImage(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSeoData((prev) => ({ ...prev, ogImage: reader.result }));
        setIsUploadingOgImage(false);
        setShowUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTwitterImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Twitter Image size must be less than 2MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      setIsUploadingTwitterImage(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSeoData((prev) => ({ ...prev, twitterImage: reader.result }));
        setIsUploadingTwitterImage(false);
        setShowUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowUnsavedChanges(false);
      alert("SEO settings updated successfully!");
    }, 1500);
  };

  const handleCancel = () => {
    if (window.confirm("Discard unsaved changes?")) {
      // Reset to initial state
      setSeoData({
        metaTitle: "Smarthr - HR Management & Analytics Platform",
        metaDescription: "Streamline your HR processes with Smarthr. Advanced analytics, employee management, and seamless integration for modern businesses.",
        keywords: "HR management, employee analytics, payroll software, onboarding, performance reviews",
        ogTitle: "Smarthr - HR Management & Analytics Platform",
        ogDescription: "Streamline your HR processes with Smarthr. Advanced analytics, employee management, and seamless integration for modern businesses.",
        ogImage: "https://smarthr.co.in/demo/html/template/assets/img/logo/og-image.png",
        twitterCard: "summary_large_image",
        twitterTitle: "Smarthr - HR Management & Analytics Platform",
        twitterDescription: "Streamline your HR processes with Smarthr.",
        twitterImage: "https://smarthr.co.in/demo/html/template/assets/img/logo/twitter-image.png",
        canonicalUrl: "https://smarthr.co.in",
        robotsTxt: `User-agent: *
Allow: /
Sitemap: https://smarthr.co.in/sitemap.xml`,
        isIndexingEnabled: true,
        isFollowEnabled: true,
      });
      setShowUnsavedChanges(false);
    }
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
                onClick={() => navigate("/profile")}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h1 className="text-3xl font-bold text-gray-900 font-[Poppins]">
                SEO Settings
              </h1>
            </div>
            <p className="text-gray-600">
              Optimize your website for search engines and social media sharing
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => navigate("/profile")}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm cursor-pointer"
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => navigate("/security-settings")}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm cursor-pointer"
                >
                  Security Settings
                </button>
                <button
                  onClick={() => navigate("/notifications")}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm cursor-pointer"
                >
                  Notifications
                </button>
                <button
                  onClick={() => navigate("/connected-apps")}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm cursor-pointer"
                >
                  Connected Apps
                </button>
                <button
                  onClick={() => navigate("/business-settings")}
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm cursor-pointer"
                >
                  Business Settings
                </button>
                <a
                  href="#"
                  className="border-orange-500 text-orange-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  SEO Settings
                </a>
              </nav>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic SEO Settings */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <Search className="w-5 h-5 mr-2 text-green-600" />
                  Basic SEO
                </CardTitle>
                <CardDescription>
                  Configure meta tags for search engine optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={seoData.metaTitle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter meta title (max 60 characters)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Current length: {seoData.metaTitle.length}/60
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      value={seoData.metaDescription}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      placeholder="Enter meta description (max 160 characters)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Current length: {seoData.metaDescription.length}/160
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keywords
                    </label>
                    <input
                      type="text"
                      name="keywords"
                      value={seoData.keywords}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter keywords separated by commas"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use relevant keywords for better search ranking
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Canonical URL
                    </label>
                    <input
                      type="url"
                      name="canonicalUrl"
                      value={seoData.canonicalUrl}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Open Graph Settings */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <Share2 className="w-5 h-5 mr-2 text-orange-600" />
                  Open Graph (Social Media)
                </CardTitle>
                <CardDescription>
                  Settings for Facebook, LinkedIn, and other platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OG Title
                    </label>
                    <input
                      type="text"
                      name="ogTitle"
                      value={seoData.ogTitle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter OG title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OG Description
                    </label>
                    <textarea
                      name="ogDescription"
                      value={seoData.ogDescription}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      placeholder="Enter OG description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OG Image
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Recommended image size is 1200px x 630px
                    </p>
                    <div className="relative group">
                      <div className="relative">
                        <img
                          src={seoData.ogImage}
                          alt="OG Image Preview"
                          className="w-32 h-20 object-cover rounded-lg border"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/1200x630/6B7280/FFFFFF?text=OG+Image";
                          }}
                        />
                        {isUploadingOgImage && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                          </div>
                        )}
                      </div>
                      {!isUploadingOgImage && (
                        <div className="absolute -inset-2 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <label className="cursor-pointer flex items-center space-x-2 bg-white bg-opacity-80 hover:bg-opacity-100 px-3 py-2 rounded-lg text-sm font-medium text-gray-700">
                            <Camera className="w-4 h-4" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleOgImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Twitter Card Settings */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <Twitter className="w-5 h-5 mr-2 text-orange-400" />
                  Twitter Card
                </CardTitle>
                <CardDescription>Configure Twitter-specific meta tags</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-gray-700">
                      Card Type
                    </label>
                    <select
                      name="twitterCard"
                      value={seoData.twitterCard}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="summary">Summary</option>
                      <option value="summary_large_image">Summary Large Image</option>
                      <option value="app">App</option>
                      <option value="player">Player</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter Title
                    </label>
                    <input
                      type="text"
                      name="twitterTitle"
                      value={seoData.twitterTitle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter Twitter title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter Description
                    </label>
                    <textarea
                      name="twitterDescription"
                      value={seoData.twitterDescription}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      placeholder="Enter Twitter description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter Image
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Recommended image size is 1200px x 675px
                    </p>
                    <div className="relative group">
                      <div className="relative">
                        <img
                          src={seoData.twitterImage}
                          alt="Twitter Image Preview"
                          className="w-32 h-20 object-cover rounded-lg border"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/1200x675/1DA1F2/FFFFFF?text=Twitter+Image";
                          }}
                        />
                        {isUploadingTwitterImage && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                          </div>
                        )}
                      </div>
                      {!isUploadingTwitterImage && (
                        <div className="absolute -inset-2 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <label className="cursor-pointer flex items-center space-x-2 bg-white bg-opacity-80 hover:bg-opacity-100 px-3 py-2 rounded-lg text-sm font-medium text-gray-700">
                            <Camera className="w-4 h-4" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleTwitterImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced SEO Settings */}
            <Card className="bg-white shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <Settings className="w-5 h-5 mr-2 text-purple-600" />
                  Advanced Settings
                </CardTitle>
                <CardDescription>
                  Crawler directives and additional configurations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="isIndexingEnabled"
                        checked={seoData.isIndexingEnabled}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Allow Indexing
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="isFollowEnabled"
                        checked={seoData.isFollowEnabled}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Allow Follow Links
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Robots.txt
                    </label>
                    <textarea
                      name="robotsTxt"
                      value={seoData.robotsTxt}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none font-mono text-sm"
                      placeholder="User-agent: *\nAllow: /"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Configure crawler directives
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Card className="bg-white shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <Globe className="w-5 h-5 mr-2 text-indigo-600" />
                  SEO Preview
                </CardTitle>
                <CardDescription>
                  See how your meta tags will appear in search results and social shares
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Search Engine Preview */}
                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Search Engine Result
                    </h4>
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Search className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {seoData.metaTitle}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {seoData.metaDescription}
                        </p>
                        <p className="text-sm text-orange-600">
                          https://smarthr.co.in{" "}
                          {seoData.metaDescription.length > 100 ? "..." : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Facebook Share
                      </h4>
                      <div className="flex items-start space-x-3">
                        <img
                          src={seoData.ogImage}
                          alt="OG Preview"
                          className="w-20 h-12 object-cover rounded flex-shrink-0"
                          onError={(e) =>
                            (e.target.src =
                              "https://placehold.co/1200x630/6B7280/FFFFFF?text=OG+Image")
                          }
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {seoData.ogTitle}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {seoData.ogDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Twitter Card
                      </h4>
                      <div className="flex items-start space-x-3">
                        <img
                          src={seoData.twitterImage}
                          alt="Twitter Preview"
                          className="w-20 h-12 object-cover rounded flex-shrink-0"
                          onError={(e) =>
                            (e.target.src =
                              "https://placehold.co/1200x675/1DA1F2/FFFFFF?text=Twitter+Image")
                          }
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {seoData.twitterTitle}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {seoData.twitterDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Actions */}
          <div className="mt-8 flex justify-end space-x-3">
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
        </div>
      </div>
    </>
  );
};

export default SeoSettings;