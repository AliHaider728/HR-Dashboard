 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  DollarSign,
  Calculator,
  Edit3,
  Trash2,
  Plus,
  Filter,
  Save,
  Loader2,
  User,
  Briefcase,
  Percent,
} from "lucide-react";

const SalarySettings = () => {
  const navigate = useNavigate();
  
  // Global salary components state
  const [salaryComponents, setSalaryComponents] = useState({
    daPercent: 10,
    hraPercent: 24,
    providentFund: {
      employeeShare: 12,
      organizationShare: 12,
    },
    esi: {
      employeeShare: 0.75,
      organizationShare: 3.25,
    },
    tdsSlabs: [
      {
        id: 1,
        salaryFrom: 0,
        salaryTo: 250000,
        percentage: 0,
      },
      {
        id: 2,
        salaryFrom: 250001,
        salaryTo: 500000,
        percentage: 5,
      },
      {
        id: 3,
        salaryFrom: 500001,
        salaryTo: 1000000,
        percentage: 20,
      },
      {
        id: 4,
        salaryFrom: 1000001,
        salaryTo: Infinity,
        percentage: 30,
      },
    ],
  });

  const [originalComponents, setOriginalComponents] = useState(salaryComponents);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddSlabModal, setShowAddSlabModal] = useState(false);
  const [editingSlab, setEditingSlab] = useState(null);
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);

  // Check for unsaved changes
  useEffect(() => {
    const hasChanges = JSON.stringify(salaryComponents) !== JSON.stringify(originalComponents);
    setShowUnsavedChanges(hasChanges);
  }, [salaryComponents, originalComponents]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('providentFund') || name.includes('esi')) {
      const [section, share] = name.split('.');
      setSalaryComponents(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [share]: parseFloat(value) || 0,
        },
      }));
    } else {
      setSalaryComponents(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    }
  };

  const handleSaveComponents = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setOriginalComponents(salaryComponents);
        setIsSaving(false);
        setShowUnsavedChanges(false);
        alert("Salary components updated successfully!");
      }, 1500);
    } catch (error) {
      setIsSaving(false);
      alert("Error saving components. Please try again.");
    }
  };

  const handleCancelChanges = () => {
    if (window.confirm("Discard all unsaved changes?")) {
      setSalaryComponents(originalComponents);
      setShowUnsavedChanges(false);
    }
  };

  const handleAddSlab = () => {
    setEditingSlab(null);
    setShowAddSlabModal(true);
  };

  const handleEditSlab = (slab) => {
    const slabCopy = { ...slab };
    if (slabCopy.salaryTo === Infinity) {
      slabCopy.salaryTo = 0;
    }
    setEditingSlab(slabCopy);
    setShowAddSlabModal(true);
  };

  const validateSlabs = (slabs) => {
    const sorted = [...slabs].sort((a, b) => a.salaryFrom - b.salaryFrom);
    for (let i = 0; i < sorted.length - 1; i++) {
      const currentTo = sorted[i].salaryTo === Infinity ? Infinity : sorted[i].salaryTo;
      if (sorted[i + 1].salaryFrom < currentTo) {
        return false;
      }
    }
    return true;
  };

  const handleDeleteSlab = (id) => {
    if (window.confirm("Are you sure you want to delete this TDS slab? This action cannot be undone.")) {
      setSalaryComponents(prev => {
        const newSlabs = prev.tdsSlabs.filter(slab => slab.id !== id);
        return {
          ...prev,
          tdsSlabs: newSlabs.sort((a, b) => a.salaryFrom - b.salaryFrom),
        };
      });
      alert("TDS slab deleted successfully!");
    }
  };

  const handleSaveSlab = async (slabData) => {
    setIsSaving(true);
    try {
      setTimeout(() => {
        if (editingSlab) {
          const updatedSlabs = salaryComponents.tdsSlabs.map(slab => 
            slab.id === editingSlab.id ? { ...slabData, id: editingSlab.id } : slab
          );
          if (!validateSlabs(updatedSlabs)) {
            setIsSaving(false);
            alert("Error: Slab ranges would overlap. Please adjust.");
            return;
          }
          setSalaryComponents(prev => ({
            ...prev,
            tdsSlabs: updatedSlabs.sort((a, b) => a.salaryFrom - b.salaryFrom),
          }));
          alert("TDS slab updated successfully!");
        } else {
          const newSlab = { ...slabData, id: Date.now() };
          const newSlabs = [...salaryComponents.tdsSlabs, newSlab];
          if (!validateSlabs(newSlabs)) {
            setIsSaving(false);
            alert("Error: Slab ranges would overlap. Please adjust.");
            return;
          }
          setSalaryComponents(prev => ({
            ...prev,
            tdsSlabs: newSlabs.sort((a, b) => a.salaryFrom - b.salaryFrom),
          }));
          alert("TDS slab added successfully!");
        }
        setShowAddSlabModal(false);
        setEditingSlab(null);
        setIsSaving(false);
      }, 1500);
    } catch (error) {
      setIsSaving(false);
      alert("Error saving slab. Please try again.");
    }
  };

  const handleCloseModal = () => {
    if (window.confirm("Discard changes to this slab?")) {
      setShowAddSlabModal(false);
      setEditingSlab(null);
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screen bg-gray-50 py-8 font-[Inter]">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
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
                  Salary Settings
                </h1>
                <p className="text-gray-600 mt-1">
                  Configure global salary components and TDS slabs
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* DA & HRA Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  DA & HRA
                </CardTitle>
                <CardDescription>
                  Dearness Allowance and House Rent Allowance percentages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2  items-center">
                      <Percent className="w-4 h-4 mr-2 text-green-600" />
                      DA (%)
                    </label>
                    <input
                      type="number"
                      name="daPercent"
                      value={salaryComponents.daPercent}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter DA percentage"
                    />
                    <p className="text-xs text-gray-500 mt-1">Dearness Allowance as percentage of basic salary</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2  items-center">
                      <Percent className="w-4 h-4 mr-2 text-green-600" />
                      HRA (%)
                    </label>
                    <input
                      type="number"
                      name="hraPercent"
                      value={salaryComponents.hraPercent}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter HRA percentage"
                    />
                    <p className="text-xs text-gray-500 mt-1">House Rent Allowance as percentage of basic salary</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provident Fund Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <DollarSign className="w-5 h-5 mr-2 text-orange-600" />
                  Provident Fund
                </CardTitle>
                <CardDescription>
                  Employee and Organization PF contributions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2   items-center">
                      <User className="w-4 h-4 mr-2 text-orange-600" />
                      Employee Share (%)
                    </label>
                    <input
                      type="number"
                      name="providentFund.employeeShare"
                      value={salaryComponents.providentFund.employeeShare}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter employee PF %"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2  items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-orange-600" />
                      Organization Share (%)
                    </label>
                    <input
                      type="number"
                      name="providentFund.organizationShare"
                      value={salaryComponents.providentFund.organizationShare}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter organization PF %"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ESI Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                  ESI
                </CardTitle>
                <CardDescription>
                  Employee State Insurance contributions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2  items-center">
                      <User className="w-4 h-4 mr-2 text-purple-600" />
                      Employee Share (%)
                    </label>
                    <input
                      type="number"
                      name="esi.employeeShare"
                      value={salaryComponents.esi.employeeShare}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter employee ESI %"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2   items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-purple-600" />
                      Organization Share (%)
                    </label>
                    <input
                      type="number"
                      name="esi.organizationShare"
                      value={salaryComponents.esi.organizationShare}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter organization ESI %"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TDS Slabs Section */}
            <Card className="bg-white shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center font-[Poppins]">
                  <Calculator className="w-5 h-5 mr-2 text-red-600" />
                  TDS Annual Salary
                </CardTitle>
                <CardDescription>
                  Tax Deducted at Source slabs based on annual salary ranges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">TDS Slabs</span>
                  </div>
                  <button 
                    onClick={handleAddSlab}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Slab</span>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Salary From (₹)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Salary To (₹)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Percentage (%)
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {salaryComponents.tdsSlabs.map((slab) => (
                        <tr key={slab.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                              ₹{slab.salaryFrom.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {slab.salaryTo === Infinity ? 'No Limit' : `₹${slab.salaryTo.toLocaleString()}`}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-red-600">
                              {slab.percentage}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleEditSlab(slab)}
                              className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                              title="Edit Slab"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSlab(slab.id)}
                              className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                              title="Delete Slab"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {salaryComponents.tdsSlabs.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                            <Calculator className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-lg">No TDS slabs configured</p>
                            <p className="text-sm">Add your first TDS slab to get started</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save/Cancel Buttons */}
          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={handleCancelChanges}
              disabled={!showUnsavedChanges || isSaving}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSaveComponents}
              disabled={!showUnsavedChanges || isSaving}
              className="px-6 py-3 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
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

          {/* TDS Slab Modal */}
          {showAddSlabModal && (
            <TdsSlabModal
              slab={editingSlab}
              onSave={handleSaveSlab}
              onClose={handleCloseModal}
              isSaving={isSaving}
            />
          )}
        </div>
      </div>
    </>
  );
};

// TDS Slab Modal Component
const TdsSlabModal = ({ slab, onSave, onClose, isSaving }) => {
  const [formData, setFormData] = useState({
    salaryFrom: 0,
    salaryTo: 0,
    percentage: 0,
  });

  const [originalSlab, setOriginalSlab] = useState(null);
  const [hasSlabChanges, setHasSlabChanges] = useState(false);

  useEffect(() => {
    if (slab) {
      const slabCopy = { ...slab };
      if (slabCopy.salaryTo === Infinity) {
        slabCopy.salaryTo = 0;
      }
      setFormData(slabCopy);
      setOriginalSlab(slabCopy);
    } else {
      setFormData({
        salaryFrom: 0,
        salaryTo: 0,
        percentage: 0,
      });
      setOriginalSlab(null);
    }
    setHasSlabChanges(false);
  }, [slab]);

  // Check for slab changes
  useEffect(() => {
    if (originalSlab) {
      const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalSlab);
      setHasSlabChanges(hasChanges);
    } else {
      setHasSlabChanges(formData.salaryFrom > 0 || formData.percentage > 0);
    }
  }, [formData, originalSlab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.salaryFrom < 0 || formData.percentage < 0) {
      alert("Please enter valid values");
      return;
    }
    if (formData.salaryTo > 0 && formData.salaryFrom >= formData.salaryTo) {
      alert("Salary To must be greater than Salary From when specified");
      return;
    }
    const data = {
      ...formData,
      salaryTo: formData.salaryTo === 0 ? Infinity : formData.salaryTo,
    };
    onSave(data);
  };

  const handleCancel = () => {
    if (!hasSlabChanges || window.confirm("Discard changes to this slab?")) {
      onClose();
    }
  };

  const modalTitle = slab ? "Edit TDS Slab" : "Add TDS Slab";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{modalTitle}</h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
              disabled={isSaving}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary From <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="salaryFrom"
                value={formData.salaryFrom}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Annual salary from (₹)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary To
              </label>
              <input
                type="number"
                name="salaryTo"
                value={formData.salaryTo}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Annual salary to (₹) or leave blank for no limit"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Percentage <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                required
                min="0"
                max="100"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Tax percentage (%)"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving || !hasSlabChanges}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{slab ? "Update Slab" : "Add Slab"}</span>
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

export default SalarySettings;