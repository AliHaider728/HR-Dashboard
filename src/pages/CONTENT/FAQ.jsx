import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Plus,
  Loader2,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

const FAQ = () => {
  const navigate = useNavigate();

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "What is an HRMS?",
      answer: "Software system that automates and manages various human resources tasks",
      category: "General",
    },
    {
      id: 2,
      question: "How does an HRMS benefit organizations?",
      answer: "It enhances operational efficiency, reduces manual errors, and centralizes HR tasks",
      category: "General",
    },
    {
      id: 3,
      question: "Is the data stored in an SmartHR secure?",
      answer: "Yes, SmartHR is design with advanced security measures, including data encryption",
      category: "Feature",
    },
    {
      id: 4,
      question: "How do I add a new employee to the HRMS?",
      answer: "Add new employees by entering their personal details & setting up their profiles.",
      category: "Employee",
    },
    {
      id: 5,
      question: "How do I generate custom reports in the SmartHR?",
      answer: "Custom reports can be generated using the reporting module within the HRMS",
      category: "Reports",
    },
    {
      id: 6,
      question: "How do I schedule training sessions in the HRMS?",
      answer: "Creating training events, setting dates and times, and enrolling employees",
      category: "Leaves",
    },
    {
      id: 7,
      question: "How do I process payroll in the SmartHR?",
      answer: "Reviewing employee hours and deductions and executing payments.",
      category: "Payroll",
    },
    {
      id: 8,
      question: "How do I export reports from the HRMS?",
      answer: "Export reports by selecting the desired report format and using the export function",
      category: "Reports",
    },
    {
      id: 9,
      question: "Can I track employee attendance and absences?",
      answer: "Yes, track attendance and absences by using the attendance management",
      category: "Employee",
    },
    {
      id: 10,
      question: "Can I track employee attendance and absences?",
      answer: "Yes, track attendance and absences by using the attendance management",
      category: "Employee",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
  });

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFaqs.length / rowsPerPage);
  const paginatedFaqs = filteredFaqs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs(prev => prev.filter(faq => faq.id !== id));
      if (paginatedFaqs.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
      alert("FAQ deleted successfully!");
    }
  };

  const handleEdit = (faq) => {
    setFormData({ ...faq });
    setEditingFaq(faq);
    setShowAddModal(true);
  };

  const handleSave = async () => {
    if (!formData.question.trim() || !formData.answer.trim() || !formData.category.trim()) {
      alert("Question, answer, and category cannot be empty.");
      return;
    }
    setIsSaving(true);
    try {
      setTimeout(() => {
        if (editingFaq) {
          setFaqs(prev =>
            prev.map(faq =>
              faq.id === editingFaq.id
                ? { ...formData, id: editingFaq.id }
                : faq
            )
          );
          alert("FAQ updated successfully!");
        } else {
          const newFaq = {
            ...formData,
            id: Date.now(),
          };
          setFaqs(prev => [...prev, newFaq]);
          alert("FAQ added successfully!");
        }
        setShowAddModal(false);
        setEditingFaq(null);
        setFormData({ question: "", answer: "", category: "" });
        setIsSaving(false);
      }, 1500);
    } catch (error) {
      setIsSaving(false);
      alert("Error saving FAQ. Please try again.");
    }
  };

  const handleCloseModal = () => {
    if (window.confirm("Discard changes?")) {
      setShowAddModal(false);
      setEditingFaq(null);
      setFormData({ question: "", answer: "", category: "" });
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const modalTitle = editingFaq ? "Edit FAQ" : "Add FAQ";

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
                  FAQs
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage frequently asked questions for SmartHR
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg font-semibold font-[Poppins]">
                  FAQ List
                </CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search FAQs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setEditingFaq(null);
                      setFormData({ question: "", answer: "", category: "" });
                      setShowAddModal(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add FAQ</span>
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
                        Question
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Answer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedFaqs.map((faq) => (
                      <tr key={faq.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-md truncate" title={faq.question}>
                            {faq.question}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-md truncate" title={faq.answer}>
                            {faq.answer}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <HelpCircle className="w-4 h-4 mr-2 text-gray-400" />
                            {faq.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEdit(faq)}
                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(faq.id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {paginatedFaqs.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                          <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg">No FAQs found</p>
                          <p className="text-sm">
                            {searchTerm ? 'Try adjusting your search terms.' : 'Add your first FAQ to get started.'}
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
                    {Math.min(currentPage * rowsPerPage, filteredFaqs.length)} of{" "}
                    {filteredFaqs.length} entries
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
                        Question <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="question"
                        value={formData.question}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter question"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Answer <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="answer"
                        value={formData.answer}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter answer"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="" disabled>Select a category</option>
                        <option value="General">General</option>
                        <option value="Feature">Feature</option>
                        <option value="Employee">Employee</option>
                        <option value="Reports">Reports</option>
                        <option value="Leaves">Leaves</option>
                        <option value="Payroll">Payroll</option>
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
                        disabled={isSaving || !formData.question.trim() || !formData.answer.trim() || !formData.category}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <HelpCircle className="w-4 h-4" />
                            <span>{editingFaq ? "Update" : "Add"} FAQ</span>
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

export default FAQ;