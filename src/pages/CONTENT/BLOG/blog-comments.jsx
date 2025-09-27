import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  MessageCircle,
  Calendar,
  Star,
  BookOpen,
  User,
  Edit,
  Trash2,
  Search,
  Plus,
  Loader2,
  AlertCircle,
} from "lucide-react";

const BlogComments = () => {
  const navigate = useNavigate();

  // Available ratings for random assignment
  const possibleRatings = [4.0, 4.2, 4.3, 4.5, 4.7, 5.0];

  const [comments, setComments] = useState([
    {
      id: 1,
      comment: "Useful breakdown of HRMS evolution!",
      createdDate: "12 Sep 2024",
      review: 4.5,
      blog: "The Evolution of HRMS: From Manual to Digital",
      by: "Gertrude",
    },
    {
      id: 2,
      comment: "Easy-to-follow HRMS guide!",
      createdDate: "24 Oct 2024",
      review: 5.0,
      blog: "HRMS Implementation: A Step-by-Step Guide",
      by: "Edward",
    },
    {
      id: 3,
      comment: "Essential tips on HRMS data security!",
      createdDate: "18 Feb 2024",
      review: 4.3,
      blog: "Data Security in HRMS: What Matters",
      by: "Mark",
    },
    {
      id: 4,
      comment: "Great HRMS recruitment tips",
      createdDate: "17 Oct 2024",
      review: 4.7,
      blog: "Improving Recruitment with HRMS",
      by: "Nidia",
    },
    {
      id: 5,
      comment: "Great look at how HRMS affects culture",
      createdDate: "20 Jul 2024",
      review: 4.0,
      blog: "Impact of HRMS on Company Culture",
      by: "Rebecca",
    },
    {
      id: 6,
      comment: "Valuable points on HRMS benefits",
      createdDate: "10 Apr 2024",
      review: 4.2,
      blog: "Key Benefits of Implementing HRMS",
      by: "Jimmy",
    },
    {
      id: 7,
      comment: "Great points on why an HRMS is crucial",
      createdDate: "29 Aug 2024",
      review: 4.5,
      blog: "Why Your Company Needs an HRMS",
      by: "Richard",
    },
    {
      id: 8,
      comment: "Great take on HRMS technology’s future",
      createdDate: "22 Feb 2024",
      review: 4.7,
      blog: "The Future of HRMS Technology",
      by: "Rachael",
    },
    {
      id: 9,
      comment: "Valuable insights on scaling HR with HRMS!",
      createdDate: "03 Nov 2024",
      review: 5.0,
      blog: "Scaling Your HR Operations with HRMS",
      by: "Tammy",
    },
    {
      id: 10,
      comment: "Useful points on how HRMS drives success",
      createdDate: "17 Dec 2024",
      review: 4.3,
      blog: "How HRMS Drives Organizational Success",
      by: "Judith",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    comment: "",
    review: "",
    blog: "",
    by: "",
  });

  const filteredComments = comments.filter(comment =>
    comment.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.blog.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.by.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "review") {
      // Allow empty input or valid number between 0 and 5
      if (value === "" || (!isNaN(value) && Number(value) >= 0 && Number(value) <= 5)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments(prev => prev.filter(comment => comment.id !== id));
      alert("Comment deleted successfully!");
    }
  };

  const handleEdit = (comment) => {
    setFormData({ ...comment, review: comment.review || "" });
    setEditingComment(comment);
    setShowAddModal(true);
  };

  const handleSave = async () => {
    if (formData.review && (isNaN(formData.review) || Number(formData.review) < 0 || Number(formData.review) > 5)) {
      alert("Review rating must be a number between 0 and 5.");
      return;
    }
    setIsSaving(true);
    try {
      setTimeout(() => {
        if (editingComment) {
          setComments(prev =>
            prev.map(comment =>
              comment.id === editingComment.id
                ? { ...formData, id: editingComment.id, review: formData.review ? Number(formData.review) : null }
                : comment
            )
          );
          alert("Comment updated successfully!");
        } else {
          const newComment = {
            ...formData,
            id: Date.now(),
            createdDate: new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            }),
            review: formData.review ? Number(formData.review) : null,
          };
          setComments(prev => [...prev, newComment]);
          alert("Comment added successfully!");
        }
        setShowAddModal(false);
        setEditingComment(null);
        setFormData({ comment: "", review: "", blog: "", by: "" });
        setIsSaving(false);
      }, 1500);
    } catch (error) {
      setIsSaving(false);
      alert("Error saving comment. Please try again.");
    }
  };

  const handleCloseModal = () => {
    if (window.confirm("Discard changes?")) {
      setShowAddModal(false);
      setEditingComment(null);
      setFormData({ comment: "", review: "", blog: "", by: "" });
    }
  };

  const modalTitle = editingComment ? "Edit Comment" : "Add Comment";

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
                  Blog Comments
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage comments on your blog posts
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg font-semibold font-[Poppins]">
                  Comments List
                </CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search comments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setEditingComment(null);
                      setFormData({ comment: "", review: "", blog: "", by: "" });
                      setShowAddModal(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Comment</span>
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
                        Comment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Review
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Blog
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        By
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredComments.map((comment) => (
                      <tr key={comment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                                <MessageCircle className="w-5 h-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {comment.comment}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {comment.createdDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {comment.review ? (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              <Star className="w-3 h-3 mr-1" />
                              {comment.review.toFixed(1)} ★
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500">No review</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="truncate max-w-xs" title={comment.blog}>
                              {comment.blog}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            {comment.by}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEdit(comment)}
                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(comment.id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredComments.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg">No comments found</p>
                          <p className="text-sm">
                            {searchTerm ? 'Try adjusting your search terms.' : 'Add your first comment to get started.'}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit Comment Modal */}
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
                        Comment <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="comment"
                        value={formData.comment}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter comment text"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Review Rating (0-5, Optional)
                      </label>
                      <input
                        type="number"
                        name="review"
                        value={formData.review}
                        onChange={handleInputChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter rating (e.g., 4.5)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blog Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="blog"
                        value={formData.blog}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter blog title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        By (Author) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="by"
                        value={formData.by}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter commenter name"
                      />
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
                        disabled={isSaving || !formData.comment || !formData.blog || !formData.by}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <MessageCircle className="w-4 h-4" />
                            <span>{editingComment ? "Update" : "Add"} Comment</span>
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

export default BlogComments;