import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  User,
  Calendar,
  Edit,
  Trash2,
  Search,
  Plus,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Testimonials = () => {
  const navigate = useNavigate();

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      author: "Ivan Lucas",
      role: "HR Manager",
      content: "This system streamlined our HR processes, saving us time and boosting team efficiency.",
      createdDate: "12 Sep 2024",
      image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-01.jpg",
    },
    {
      id: 2,
      author: "John Mason",
      role: "HR Manager",
      content: "This system has made payroll and attendance tracking so much easier for our team.",
      createdDate: "24 Oct 2024",
      image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-02.jpg",
    },
    {
      id: 3,
      author: "Susan Hill",
      role: "HR Manager",
      content: "We've significantly reduced paperwork and manual errors since implementing this platform.",
      createdDate: "18 Feb 2024",
      image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-03.jpg",
    },
    {
      id: 4,
      author: "Gary Payton",
      role: "HR Manager",
      content: "Managing employee leave requests and benefits is now a hassle-free process.",
      createdDate: "17 Oct 2024",
      image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-04.jpg",
    },
    {
      id: 5,
      author: "Jennifer Vaughn",
      role: "HR Manager",
      content: "This platform has drastically cut down the time we spend on recruitment and onboarding.",
      createdDate: "20 Jul 2024",
      image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-05.jpg",
    },
    {
      id: 6,
      author: "Ricky Easley",
      role: "HR Manager",
      content: "The system's ease of use has greatly improved our HR team's productivity.",
      createdDate: "10 Apr 2024",
      image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-06.jpg",
    },
    {
      id: 7,
      author: "David Rodriguez",
      role: "HR Manager",
      content: "The platform allows me to update my personal details and view my payslips instantly.",
      createdDate: "29 Aug 2024",
      image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-07.jpg",
    },
    {
      id: 8,
      author: "Dennis Lorenzo",
      role: "Employee",
      content: "Submitting my timesheets and checking my attendance is super easy with this tool.",
      createdDate: "22 Feb 2024",
      image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-08.jpg",
    },
    {
      id: 9,
      author: "Barry Ducote",
      role: "Manager",
      content: "Enhanced employee performance tracking and simplified payroll management effortlessly.",
      createdDate: "03 Nov 2024",
      image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-09.jpg",
    },
    {
      id: 10,
      author: "Judy Walton",
      role: "Employee",
      content: "It’s great to see all my benefits and compensation details in one user-friendly interface.",
      createdDate: "17 Dec 2024",
      image: "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-01.jpg",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [formData, setFormData] = useState({
    author: "",
    role: "",
    content: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTestimonials.length / rowsPerPage);
  const paginatedTestimonials = filteredTestimonials.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
      if (paginatedTestimonials.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
      alert("Testimonial deleted successfully!");
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({ ...testimonial });
    setImagePreview(testimonial.image);
    setEditingTestimonial(testimonial);
    setShowAddModal(true);
  };

  const handleSave = async () => {
    if (!formData.author.trim() || !formData.role.trim() || !formData.content.trim()) {
      alert("Author, role, and content cannot be empty.");
      return;
    }
    setIsSaving(true);
    try {
      setTimeout(() => {
        if (editingTestimonial) {
          setTestimonials(prev =>
            prev.map(testimonial =>
              testimonial.id === editingTestimonial.id
                ? { ...formData, id: editingTestimonial.id, createdDate: testimonial.createdDate }
                : testimonial
            )
          );
          alert("Testimonial updated successfully!");
        } else {
          const newTestimonial = {
            ...formData,
            id: Date.now(),
            createdDate: new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
            image: formData.image || "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-01.jpg",
          };
          setTestimonials(prev => [...prev, newTestimonial]);
          alert("Testimonial added successfully!");
        }
        setShowAddModal(false);
        setEditingTestimonial(null);
        setFormData({ author: "", role: "", content: "", image: "" });
        setImagePreview(null);
        setIsSaving(false);
      }, 1500);
    } catch (error) {
      setIsSaving(false);
      alert("Error saving testimonial. Please try again.");
    }
  };

  const handleCloseModal = () => {
    if (window.confirm("Discard changes?")) {
      setShowAddModal(false);
      setEditingTestimonial(null);
      setFormData({ author: "", role: "", content: "", image: "" });
      setImagePreview(null);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const modalTitle = editingTestimonial ? "Edit Testimonial" : "Add Testimonial";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screen bg-gray-50 py-8 font-[Inter]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
               
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-[Poppins]">
                  Testimonials
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage testimonials for your application
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg font-semibold font-[Poppins]">
                  Testimonials List
                </CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search testimonials..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setEditingTestimonial(null);
                      setFormData({ author: "", role: "", content: "", image: "" });
                      setImagePreview(null);
                      setShowAddModal(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Testimonial</span>
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
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedTestimonials.map((testimonial) => (
                      <tr key={testimonial.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                src={testimonial.image}
                                alt={testimonial.author}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {testimonial.author}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            {testimonial.role}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-md truncate" title={testimonial.content}>
                            {testimonial.content}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {testimonial.createdDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEdit(testimonial)}
                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial.id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {paginatedTestimonials.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                          <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg">No testimonials found</p>
                          <p className="text-sm">
                            {searchTerm ? 'Try adjusting your search terms.' : 'Add your first testimonial to get started.'}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 px-6">
                  <div className="text-sm text-gray-700">
                    Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                    {Math.min(currentPage * rowsPerPage, filteredTestimonials.length)} of{" "}
                    {filteredTestimonials.length} entries
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

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
                        Author <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter author name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="" disabled>Select a role</option>
                        <option value="HR Manager">HR Manager</option>
                        <option value="Manager">Manager</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter testimonial content"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Image (optional)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-24 w-24 rounded-full object-cover"
                          />
                        </div>
                      )}
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
                        disabled={isSaving || !formData.author.trim() || !formData.role || !formData.content.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <User className="w-4 h-4" />
                            <span>{editingTestimonial ? "Update" : "Add"} Testimonial</span>
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

export default Testimonials;