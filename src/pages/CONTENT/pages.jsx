import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Search,
  Save,
  Loader2,
  AlertCircle,
  FileText,
  Eye,
} from "lucide-react";

const Pages = () => {
  const navigate = useNavigate();
  
  const [pages, setPages] = useState([
    {
      id: 1,
      name: "Employee",
      slug: "employee",
      status: "active",
    },
    {
      id: 2,
      name: "Clients",
      slug: "clients",
      status: "active",
    },
    {
      id: 3,
      name: "Projects",
      slug: "projects",
      status: "active",
    },
    {
      id: 4,
      name: "Tickets",
      slug: "tickets",
      status: "active",
    },
    {
      id: 5,
      name: "Contacts",
      slug: "contacts",
      status: "active",
    },
    {
      id: 6,
      name: "Companies",
      slug: "companies",
      status: "active",
    },
    {
      id: 7,
      name: "Deals",
      slug: "deals",
      status: "active",
    },
    {
      id: 8,
      name: "Leads",
      slug: "leads",
      status: "active",
    },
    {
      id: 9,
      name: "Pipeline",
      slug: "pipeline",
      status: "active",
    },
    {
      id: 10,
      name: "Dashboard",
      slug: "dashboard",
      status: "inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    status: "active",
  });

  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "slug") {
      // Auto-generate slug from name if name is being edited
      const slugValue = value === "" && formData.name !== ""
        ? formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
        : value;
      setFormData(prev => ({ ...prev, [name]: slugValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleToggleStatus = (id) => {
    setPages(prev => 
      prev.map(page => 
        page.id === id 
          ? { ...page, status: page.status === 'active' ? 'inactive' : 'active' }
          : page
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this page? This action cannot be undone.")) {
      setPages(prev => prev.filter(page => page.id !== id));
      alert("Page deleted successfully!");
    }
  };

  const handleEdit = (page) => {
    setFormData({ ...page });
    setEditingPage(page);
    setShowAddModal(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      setTimeout(() => {
        if (editingPage) {
          setPages(prev => 
            prev.map(page => 
              page.id === editingPage.id ? { ...formData, id: editingPage.id } : page
            )
          );
          alert("Page updated successfully!");
        } else {
          const newPage = {
            ...formData,
            id: Date.now(),
          };
          setPages(prev => [...prev, newPage]);
          alert("Page added successfully!");
        }
        setShowAddModal(false);
        setEditingPage(null);
        setFormData({ name: "", slug: "", status: "active" });
        setIsSaving(false);
      }, 1500);
    } catch (error) {
      setIsSaving(false);
      alert("Error saving page. Please try again.");
    }
  };

  const handleCloseModal = () => {
    if (window.confirm("Discard changes?")) {
      setShowAddModal(false);
      setEditingPage(null);
      setFormData({ name: "", slug: "", status: "active" });
    }
  };

  const modalTitle = editingPage ? "Edit Page" : "Add Page";

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
                  Pages
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage website pages and navigation
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg font-semibold font-[Poppins]">
                  Pages List
                </CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search pages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setEditingPage(null);
                      setFormData({ name: "", slug: "", status: "active" });
                      setShowAddModal(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Page</span>
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Page
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Page Slug
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPages.map((page) => (
                      <tr key={page.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-100">
                                <FileText className="w-5 h-5 text-orange-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {page.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {page.slug}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            page.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {page.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => window.open(`/${page.slug}`, '_blank')}
                            className="text-orange-600 hover:text-orange-900 p-2 rounded-lg hover:bg-orange-50 transition-colors"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(page.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              page.status === 'active'
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                            title={page.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            {page.status === 'active' ? (
                              <XCircle className="w-4 h-4" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(page)}
                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(page.id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredPages.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg">No pages found</p>
                          <p className="text-sm">
                            {searchTerm ? 'Try adjusting your search terms.' : 'Add your first page to get started.'}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit Page Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">{modalTitle}</h2>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-400 hover:text-gray-600"
                      disabled={isSaving}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Page Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter page name (e.g., Employee)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Page Slug <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center space-x-2">
                         
                        <input
                          type="text"
                          name="slug"
                          value={formData.slug}
                          onChange={handleInputChange}
                          required
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter page slug (e.g., employee)"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        URL-friendly version of the page name
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        disabled={isSaving}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving || !formData.name || !formData.slug}
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
                            <span>{editingPage ? "Update" : "Add"} Page</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pages;