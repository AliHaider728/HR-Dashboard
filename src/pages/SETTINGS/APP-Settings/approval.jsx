import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ArrowLeft,
  UserCheck,
  CheckCircle,
  Save,
  Plus,
  Trash2,
  Edit2,
} from "lucide-react";

const ApprovalSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("expense"); // Tabs: expense, leave, offer
  const [expenseFormData, setExpenseFormData] = useState({
    defaultApproval: true,
    sequenceApproval: false,
    simultaneousApproval: false,
    approvers: [
      { id: 1, name: "John Doe", role: "Manager", department: "Finance" },
      { id: 2, name: "Jane Smith", role: "Director", department: "HR" },
    ],
  });
  const [leaveFormData, setLeaveFormData] = useState({
    defaultApproval: true,
    sequenceApproval: false,
    simultaneousApproval: false,
    approvers: [
      { id: 1, name: "Alice Johnson", role: "HR Manager", department: "HR" },
    ],
  });
  const [offerFormData, setOfferFormData] = useState({
    defaultApproval: true,
    sequenceApproval: false,
    simultaneousApproval: false,
    approvers: [
      { id: 1, name: "Bob Wilson", role: "Recruitment Lead", department: "HR" },
    ],
  });
  const [showApproverModal, setShowApproverModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentSection, setCurrentSection] = useState(""); // Tracks section: expense, leave, offer
  const [currentApprover, setCurrentApprover] = useState({ id: null, name: "", role: "", department: "" });

  const handleInputChange = (section, e) => {
    const { name, type, checked, value } = e.target;
    const updateForm = (prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    });
    if (section === "expense") {
      setExpenseFormData(updateForm);
    } else if (section === "leave") {
      setLeaveFormData(updateForm);
    } else if (section === "offer") {
      setOfferFormData(updateForm);
    }
  };

  const handleAddApprover = (e) => {
    e.preventDefault();
    if (currentApprover.name && currentApprover.role && currentApprover.department) {
      const newApproverData = { ...currentApprover, id: Date.now() };
      if (currentSection === "expense") {
        setExpenseFormData((prev) => ({
          ...prev,
          approvers: [...prev.approvers, newApproverData],
        }));
      } else if (currentSection === "leave") {
        setLeaveFormData((prev) => ({
          ...prev,
          approvers: [...prev.approvers, newApproverData],
        }));
      } else if (currentSection === "offer") {
        setOfferFormData((prev) => ({
          ...prev,
          approvers: [...prev.approvers, newApproverData],
        }));
      }
      resetModal();
    }
  };

  const handleEditApprover = (section, approver) => {
    setModalMode("edit");
    setCurrentSection(section);
    setCurrentApprover(approver);
    setShowApproverModal(true);
  };

  const handleUpdateApprover = (e) => {
    e.preventDefault();
    if (currentApprover.name && currentApprover.role && currentApprover.department) {
      if (currentSection === "expense") {
        setExpenseFormData((prev) => ({
          ...prev,
          approvers: prev.approvers.map((app) =>
            app.id === currentApprover.id ? currentApprover : app
          ),
        }));
      } else if (currentSection === "leave") {
        setLeaveFormData((prev) => ({
          ...prev,
          approvers: prev.approvers.map((app) =>
            app.id === currentApprover.id ? currentApprover : app
          ),
        }));
      } else if (currentSection === "offer") {
        setOfferFormData((prev) => ({
          ...prev,
          approvers: prev.approvers.map((app) =>
            app.id === currentApprover.id ? currentApprover : app
          ),
        }));
      }
      resetModal();
    }
  };

  const handleDeleteApprover = (section, id) => {
    if (section === "expense") {
      setExpenseFormData((prev) => ({
        ...prev,
        approvers: prev.approvers.filter((app) => app.id !== id),
      }));
    } else if (section === "leave") {
      setLeaveFormData((prev) => ({
        ...prev,
        approvers: prev.approvers.filter((app) => app.id !== id),
      }));
    } else if (section === "offer") {
      setOfferFormData((prev) => ({
        ...prev,
        approvers: prev.approvers.filter((app) => app.id !== id),
      }));
    }
  };

  const handleSaveSettings = (section) => {
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
  };

  const resetModal = () => {
    setShowApproverModal(false);
    setModalMode("add");
    setCurrentSection("");
    setCurrentApprover({ id: null, name: "", role: "", department: "" });
  };

  const renderApprovalSection = (section, formData, setFormData) => (
    <div className="space-y-6">
      {/* Default Approval Toggle */}
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <UserCheck className="w-5 h-5 mr-2 text-orange-600" />
            Default {section.charAt(0).toUpperCase() + section.slice(1)} Approval
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Require approval for all {section} claims by default.
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="defaultApproval"
            checked={formData.defaultApproval}
            onChange={(e) => handleInputChange(section, e)}
            className="sr-only peer"
            aria-label={`Toggle default ${section} approval`}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
        </label>
      </div>

      {/* Sequence Approval (Chain) */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Sequence Approval (Chain)</CardTitle>
          <CardDescription>Require approvals in a specific order.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="sequenceApproval"
              checked={formData.sequenceApproval}
              onChange={(e) => handleInputChange(section, e)}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
              id={`${section}-sequence-approval`}
              aria-label={`Enable sequential ${section} approval`}
            />
            <label
              htmlFor={`${section}-sequence-approval`}
              className="text-sm font-medium text-gray-700"
            >
              Enable Sequential Approval
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Simultaneous Approval */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Simultaneous Approval</CardTitle>
          <CardDescription>Allow multiple approvers to approve concurrently.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="simultaneousApproval"
              checked={formData.simultaneousApproval}
              onChange={(e) => handleInputChange(section, e)}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
              id={`${section}-simultaneous-approval`}
              aria-label={`Enable simultaneous ${section} approval`}
            />
            <label
              htmlFor={`${section}-simultaneous-approval`}
              className="text-sm font-medium text-gray-700"
            >
              Enable Simultaneous Approval
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Approvers Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {section.charAt(0).toUpperCase() + section.slice(1)} Approvers
          </CardTitle>
          <button
            onClick={() => {
              setModalMode("add");
              setCurrentSection(section);
              setCurrentApprover({ id: null, name: "", role: "", department: "" });
              setShowApproverModal(true);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center space-x-2"
            aria-label={`Add new ${section} approver`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Approver</span>
          </button>
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
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.approvers.map((approver) => (
                  <tr key={approver.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {approver.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{approver.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{approver.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditApprover(section, approver)}
                        className="text-orange-600 hover:text-orange-900 p-1 rounded"
                        aria-label={`Edit ${approver.name}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteApprover(section, approver.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        aria-label={`Delete ${approver.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {formData.approvers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      No approvers added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end pt-6">
        <button
          onClick={() => handleSaveSettings(section)}
          className="px-6 py-3 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center space-x-2"
          aria-label={`Save ${section} settings`}
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Random Celebrity Image */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={() => navigate("/settings")}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
              aria-label="Back to Settings"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Approval Settings</h1>
                <p className="text-gray-600 mt-1">Configure approval workflows for expenses, leaves, and offers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Card className="bg-white shadow-sm mb-6">
          <CardContent className="p-0">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("expense")}
                  className={`${
                    activeTab === "expense"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-1`}
                  aria-label="Expense Approval Settings"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Expense Approval</span>
                </button>
                <button
                  onClick={() => setActiveTab("leave")}
                  className={`${
                    activeTab === "leave"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-1`}
                  aria-label="Leave Approval Settings"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Leave Approval</span>
                </button>
                <button
                  onClick={() => setActiveTab("offer")}
                  className={`${
                    activeTab === "offer"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-1`}
                  aria-label="Offer Approval Settings"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Offer Approval</span>
                </button>
              </nav>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            {activeTab === "expense" &&
              renderApprovalSection("expense", expenseFormData, setExpenseFormData)}
            {activeTab === "leave" && renderApprovalSection("leave", leaveFormData, setLeaveFormData)}
            {activeTab === "offer" && renderApprovalSection("offer", offerFormData, setOfferFormData)}
          </CardContent>
        </Card>

        {/* Add/Edit Approver Modal */}
        {showApproverModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {modalMode === "add"
                    ? `Add New ${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} Approver`
                    : `Edit ${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} Approver`}
                </h2>
                <form onSubmit={modalMode === "add" ? handleAddApprover : handleUpdateApprover} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={currentApprover.name}
                      onChange={(e) => setCurrentApprover({ ...currentApprover, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      required
                      aria-label="Approver Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <input
                      type="text"
                      value={currentApprover.role}
                      onChange={(e) => setCurrentApprover({ ...currentApprover, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      required
                      aria-label="Approver Role"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <input
                      type="text"
                      value={currentApprover.department}
                      onChange={(e) => setCurrentApprover({ ...currentApprover, department: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      required
                      aria-label="Approver Department"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={resetModal}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                      aria-label="Cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center space-x-2"
                      aria-label={modalMode === "add" ? "Add Approver" : "Update Approver"}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{modalMode === "add" ? "Add Approver" : "Update Approver"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalSettings;