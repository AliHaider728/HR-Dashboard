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
  Calendar,
  Tag,
} from "lucide-react";

const BlogCategories = () => {
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Evlovution",
      createdDate: "12 Sep 2024",
      status: "active",
    },
    {
      id: 2,
      name: "Guide",
      createdDate: "24 Oct 2024",
      status: "active",
    },
    {
      id: 3,
      name: "Security",
      createdDate: "18 Feb 2024",
      status: "active",
    },
    {
      id: 4,
      name: "Recruitment",
      createdDate: "17 Oct 2024",
      status: "active",
    },
    {
      id: 5,
      name: "Payroll",
      createdDate: "20 Jul 2024",
      status: "active",
    },
    {
      id: 6,
      name: "Benefits",
      createdDate: "10 Apr 2024",
      status: "active",
    },
    {
      id: 7,
      name: "Employee",
      createdDate: "29 Aug 2024",
      status: "active",
    },
    {
      id: 8,
      name: "Onboarding",
      createdDate: "22 Feb 2024",
      status: "active",
    },
    {
      id: 9,
      name: "Implementation",
      createdDate: "03 Nov 2024",
      status: "active",
    },
    {
      id: 10,
      name: "Management",
      createdDate: "17 Dec 2024",
      status: "inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
  });

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleStatus = (id) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === id 
          ? { ...category, status: category.status === 'active' ? 'inactive' : 'active' }
          : category
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category? This will affect all blogs in this category.")) {
      setCategories(prev => prev.filter(category => category.id !== id));
      alert("Category deleted successfully!");
    }
  };

  const handleEdit = (category) => {
    setFormData({ ...category });
    setEditingCategory(category);
    setShowAddModal(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      setTimeout(() => {
        if (editingCategory) {
          setCategories(prev => 
            prev.map(category => 
              category.id === editingCategory.id ? { ...formData, id: editingCategory.id } : category
            )
          );
          alert("Category updated successfully!");
        } else {
          const newCategory = {
            ...formData,
            id: Date.now(),
            createdDate: new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            }),
          };
          setCategories(prev => [...prev, newCategory]);
          alert("Category added successfully!");
        }
        setShowAddModal(false);
        setEditingCategory(null);
        setFormData({ name: "", status: "active" });
        setIsSaving(false);
      }, 1500);
    } catch (error) {
      setIsSaving(false);
      alert("Error saving category. Please try again.");
    }
  };

  const handleCloseModal = () => {
    if (window.confirm("Discard changes?")) {
      setShowAddModal(false);
      setEditingCategory(null);
      setFormData({ name: "", status: "active" });
    }
  };

  const modalTitle = editingCategory ? "Edit Category" : "Add Category";

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
                  Blog Categories
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage categories for your blog posts
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg font-semibold font-[Poppins]">
                  Categories List
                </CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setEditingCategory(null);
                      setFormData({ name: "", status: "active" });
                      setShowAddModal(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Category</span>
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
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created Date
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
                    {filteredCategories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100">
                                <Tag className="w-5 h-5 text-purple-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {category.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {category.createdDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            category.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {category.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleToggleStatus(category.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              category.status === 'active'
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                            title={category.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            {category.status === 'active' ? (
                              <XCircle className="w-4 h-4" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(category)}
                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredCategories.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                          <Tag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg">No categories found</p>
                          <p className="text-sm">
                            {searchTerm ? 'Try adjusting your search terms.' : 'Add your first category to get started.'}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit Category Modal */}
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
                        Category Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter category name (e.g., Technology)"
                      />
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
                        disabled={isSaving || !formData.name}
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
                            <span>{editingCategory ? "Update" : "Add"} Category</span>
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

export default BlogCategories;