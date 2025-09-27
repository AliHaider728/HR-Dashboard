import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Globe,
  Flag,
  Languages,
  CheckCircle,
  AlertCircle,
  Edit3,
  Trash2,
  Plus,
  Upload,
  Search,
  Filter,
  Loader2,
  LanguagesIcon,
} from "lucide-react";

const LanguageSettings = () => {
  const navigate = useNavigate();

  // Language data
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // Sample language data
  const initialLanguages = [
    {
      id: 1,
      name: "English",
      code: "en",
      flag: "🇺🇸",
      rtl: false,
      isDefault: true,
      total: 1620,
      done: 1296,
      progress: 80,
      status: "Active",
    },
    {
      id: 2,
      name: "Arabic",
      code: "ar",
      flag: "🇸🇦",
      rtl: true,
      isDefault: false,
      total: 1620,
      done: 810,
      progress: 50,
      status: "Active",
    },
    {
      id: 3,
      name: "German",
      code: "de",
      flag: "🇩🇪",
      isDefault: false,
      total: 1620,
      done: 972,
      progress: 60,
      status: "Active",
    },
    {
      id: 4,
      name: "Spanish",
      code: "es",
      flag: "🇪🇸",
      rtl: false,
      isDefault: false,
      total: 1620,
      done: 1458,
      progress: 90,
      status: "Active",
    },
    {
      id: 5,
      name: "French",
      code: "fr",
      flag: "🇫🇷",
      isDefault: false,
      total: 1620,
      done: 648,
      progress: 40,
      status: "Draft",
    },
    {
      id: 6,
      name: "Italian",
      code: "it",
      flag: "🇮🇹",
      rtl: false,
      isDefault: false,
      total: 1620,
      done: 324,
      progress: 20,
      status: "Draft",
    },
  ];

  // Load initial data
  useEffect(() => {
    setTimeout(() => {
      setLanguages(initialLanguages);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search languages (memoized for performance)
  const filteredLanguages = useMemo(() => {
    return languages.filter((language) => {
      const matchesSearch =
        language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        language.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || language.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [languages, searchTerm, filterStatus]);

  const handleEditLanguage = (language) => {
    setEditingLanguage({ ...language });
    setShowAddModal(true);
  };

  const handleDeleteLanguage = (id) => {
    if (window.confirm("Are you sure you want to delete this language? This action cannot be undone.")) {
      setLanguages((prev) => prev.filter((lang) => lang.id !== id));
      alert("Language deleted successfully!");
    }
  };

  const handleSetDefault = (id) => {
    if (window.confirm("Are you sure you want to set this as the default language?")) {
      setLanguages((prev) =>
        prev.map((lang) => ({
          ...lang,
          isDefault: lang.id === id,
        }))
      );
      alert("Default language updated successfully!");
    }
  };

  const handleSaveLanguage = async (languageData) => {
    setIsSaving(true);
    setTimeout(() => {
      if (editingLanguage) {
        setLanguages((prev) =>
          prev.map((lang) => (lang.id === editingLanguage.id ? languageData : lang))
        );
        alert("Language updated successfully!");
      } else {
        const newLanguage = {
          ...languageData,
          id: Date.now(),
          total: 1620,
          done: 0,
          progress: 0,
          status: "Draft",
        };
        setLanguages((prev) => [...prev, newLanguage]);
        alert("Language added successfully!");
      }
      setShowAddModal(false);
      setEditingLanguage(null);
      setIsSaving(false);
    }, 1500);
  };

  const handleImportLanguage = (file) => {
    if (file) {
      setIsSaving(true);
      setTimeout(() => {
        alert("Language file imported successfully!");
        setShowImportModal(false);
        setIsSaving(false);
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading languages...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={() => navigate("/settings")}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Go back to settings"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-sans">
                Language Settings
              </h1>
              <p className="text-gray-600 mt-1">Manage multilingual support and translation progress</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{languages.length}</div>
              <div className="text-sm text-gray-600">Total Languages</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {languages.filter((lang) => lang.status === "Active").length}
              </div>
              <div className="text-sm text-gray-600">Active Languages</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
                <LanguagesIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {Math.round(
                  languages.reduce((sum, lang) => sum + lang.progress, 0) / languages.length
                ) || 0}
                %
              </div>
              <div className="text-sm text-gray-600">Avg Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="bg-white shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  aria-label="Search languages"
                />
              </div>

              <div className="flex items-center space-x-2 flex-1 max-w-md">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  aria-label="Filter by status"
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowImportModal(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-2"
                  aria-label="Import language file"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                </button>
                <button
                  onClick={() => {
                    setEditingLanguage(null);
                    setShowAddModal(true);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2"
                  aria-label="Add new language"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Language</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center font-sans">
              <LanguagesIcon className="w-5 h-5 mr-2 text-orange-600" />
              Language List
            </CardTitle>
            <CardDescription>Manage translations and track localization progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Language
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Code
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      RTL
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Default
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Done
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Progress
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLanguages.map((language) => (
                    <tr key={language.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <span className="text-2xl" role="img" aria-label={language.name}>
                              {language.flag}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{language.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900 font-mono">{language.code}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            language.rtl ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {language.rtl ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            language.isDefault
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {language.isDefault ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {language.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {language.done.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                language.progress >= 80
                                  ? "bg-green-600"
                                  : language.progress >= 50
                                  ? "bg-yellow-600"
                                  : "bg-red-600"
                              }`}
                              style={{ width: `${language.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {language.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            language.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {language.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleSetDefault(language.id)}
                          disabled={language.isDefault}
                          className={`p-2 rounded-lg transition-colors ${
                            language.isDefault
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-orange-600 hover:text-orange-900 hover:bg-orange-50"
                          }`}
                          title={language.isDefault ? "Already Default" : "Set as Default"}
                          aria-label={language.isDefault ? "Already Default" : "Set as Default"}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditLanguage(language)}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                          title="Edit Language"
                          aria-label="Edit Language"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLanguage(language.id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Language"
                          aria-label="Delete Language"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredLanguages.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                        <Globe className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-lg">No languages found</p>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Language Modal */}
        {showAddModal && (
          <LanguageModal
            language={editingLanguage}
            onSave={handleSaveLanguage}
            onClose={() => {
              setShowAddModal(false);
              setEditingLanguage(null);
            }}
            isSaving={isSaving}
          />
        )}

        {/* Import Language Modal */}
        {showImportModal && (
          <ImportLanguageModal
            onImport={handleImportLanguage}
            onClose={() => setShowImportModal(false)}
            isSaving={isSaving}
          />
        )}
      </div>
    </div>
  );
};

// Language Modal Component
const LanguageModal = ({ language, onSave, onClose, isSaving }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    rtl: false,
    isDefault: false,
    status: "Draft",
  });

  const availableLanguages = [
    { name: "Afrikaans", code: "af" },
    { name: "Arabic", code: "ar" },
    { name: "Bengali", code: "bn" },
    { name: "Bulgarian", code: "bg" },
    { name: "Catalan", code: "ca" },
    { name: "Chinese (Simplified)", code: "zh-CN" },
    { name: "Chinese (Traditional)", code: "zh-TW" },
    { name: "Croatian", code: "hr" },
    { name: "Czech", code: "cs" },
    { name: "Danish", code: "da" },
    { name: "Dutch", code: "nl" },
    { name: "English", code: "en" },
    { name: "Esperanto", code: "eo" },
    { name: "Estonian", code: "et" },
    { name: "Faroese", code: "fo" },
    { name: "Finnish", code: "fi" },
    { name: "French", code: "fr" },
    { name: "German", code: "de" },
    { name: "Greek", code: "el" },
    { name: "Hebrew", code: "he" },
    { name: "Hindi", code: "hi" },
    { name: "Hungarian", code: "hu" },
    { name: "Icelandic", code: "is" },
    { name: "Indonesian", code: "id" },
    { name: "Irish", code: "ga" },
    { name: "Italian", code: "it" },
    { name: "Japanese", code: "ja" },
    { name: "Korean", code: "ko" },
    { name: "Kurdish", code: "ku" },
    { name: "Latin", code: "la" },
    { name: "Latvian", code: "lv" },
    { name: "Lithuanian", code: "lt" },
    { name: "Macedonian", code: "mk" },
    { name: "Malay", code: "ms" },
    { name: "Norwegian", code: "no" },
    { name: "Polish", code: "pl" },
    { name: "Portuguese", code: "pt" },
    { name: "Romanian", code: "ro" },
    { name: "Russian", code: "ru" },
    { name: "Serbian", code: "sr" },
    { name: "Slovak", code: "sk" },
    { name: "Slovenian", code: "sl" },
    { name: "Spanish", code: "es" },
    { name: "Swahili", code: "sw" },
    { name: "Swedish", code: "sv" },
    { name: "Thai", code: "th" },
    { name: "Turkish", code: "tr" },
    { name: "Ukrainian", code: "uk" },
    { name: "Urdu", code: "ur" },
    { name: "Vietnamese", code: "vi" },
    { name: "Welsh", code: "cy" },
    { name: "Yiddish", code: "yi" },
  ];

  useEffect(() => {
    if (language) {
      setFormData({
        name: language.name,
        code: language.code,
        rtl: language.rtl,
        isDefault: language.isDefault,
        status: language.status,
      });
    }
  }, [language]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) {
      alert("Please fill in all required fields");
      return;
    }
    onSave(formData);
  };

  const modalTitle = language ? "Edit Language" : "Add New Language";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{modalTitle}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              disabled={isSaving}
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language Name <span className="text-red-500">*</span>
              </label>
              <select
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                aria-label="Select language name"
              >
                <option value="">Select Language</option>
                {availableLanguages.map((lang) => (
                  <option key={lang.code} value={lang.name}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language Code <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <select
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  aria-label="Select language code"
                >
                  <option value="">Select Code</option>
                  {availableLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.code}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-500">ISO 639-1</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="rtl"
                checked={formData.rtl}
                onChange={handleChange}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                id="rtl-checkbox"
              />
              <label htmlFor="rtl-checkbox" className="text-sm font-medium text-gray-700">
                Right-to-Left (RTL) Language
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-4 w-4"
                id="default-checkbox"
              />
              <label htmlFor="default-checkbox" className="text-sm font-medium text-gray-700">
                Set as Default Language
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                aria-label="Select language status"
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={isSaving}
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
                aria-label={language ? "Update Language" : "Add Language"}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>{language ? "Update Language" : "Add Language"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Import Language Modal Component
const ImportLanguageModal = ({ onImport, onClose, isSaving }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onImport(file);
    } else {
      alert("Please select a file to import");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Import Language File</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              disabled={isSaving}
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language File <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-1 text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor--font-sansbg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".json,.po,.pot,.mo"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500">Supported: JSON, PO, POT, MO</p>
                </div>
                {file && (
                  <p className="mt-2 text-sm font-medium text-orange-600 truncate">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={isSaving}
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving || !file}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
                aria-label="Import language file"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Importing...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Import File</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;