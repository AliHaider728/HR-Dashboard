import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";

const Countries = () => {
  const navigate = useNavigate();

  // Helper to get flag image URL
  const getFlagUrl = (code) =>
    code ? `https://flagcdn.com/48x36/${code.toLowerCase()}.png` : "";

  const [countries, setCountries] = useState([
    { id: 1, name: "Pakistan", code: "PK", status: "active" },
    { id: 2, name: "Canada", code: "CA", status: "active" },
    { id: 3, name: "United Kingdom", code: "GB", status: "active" },
    { id: 4, name: "Germany", code: "DE", status: "active" },
    { id: 5, name: "France", code: "FR", status: "active" },
    { id: 6, name: "Argentina", code: "AR", status: "active" },
    { id: 7, name: "India", code: "IN", status: "active" },
    { id: 8, name: "Italy", code: "IT", status: "active" },
    { id: 9, name: "New Zealand", code: "NZ", status: "active" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    status: "active",
  });

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
  };

  const handleToggleStatus = (id) => {
    setCountries((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "active" ? "inactive" : "active" }
          : c
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      setCountries((prev) => prev.filter((c) => c.id !== id));
      alert("Country deleted successfully!");
    }
  };

  const handleEdit = (country) => {
    setFormData({ ...country });
    setEditingCountry(country);
    setShowAddModal(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.code.trim()) {
      alert("Country name and code cannot be empty.");
      return;
    }
    if (!/^[A-Z]{2}$/.test(formData.code)) {
      alert("Country code must be exactly 2 uppercase letters (e.g., US).");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      if (editingCountry) {
        setCountries((prev) =>
          prev.map((c) =>
            c.id === editingCountry.id ? { ...formData, id: editingCountry.id } : c
          )
        );
        alert("Country updated successfully!");
      } else {
        const newCountry = { ...formData, id: Date.now() };
        setCountries((prev) => [...prev, newCountry]);
        alert("Country added successfully!");
      }
      setShowAddModal(false);
      setEditingCountry(null);
      setFormData({ name: "", code: "", status: "active" });
      setIsSaving(false);
    }, 1200);
  };

  const handleCloseModal = () => {
    if (window.confirm("Discard changes?")) {
      setShowAddModal(false);
      setEditingCountry(null);
      setFormData({ name: "", code: "", status: "active" });
    }
  };

  const modalTitle = editingCountry ? "Edit Country" : "Add Country";

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center space-x-3">
          <button
            onClick={() => navigate("/settings")}
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-sans">
              Countries
            </h1>
            <p className="text-gray-600 mt-1">Manage countries for your app</p>
          </div>
        </div>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg font-semibold font-[Poppins]">
                Countries List
              </CardTitle>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                  />
                </div>
                <button
                  onClick={() => {
                    setEditingCountry(null);
                    setFormData({ name: "", code: "", status: "active" });
                    setShowAddModal(true);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Country</span>
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
                      Country
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
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
                  {filteredCountries.map((country) => (
                    <tr key={country.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {country.code && (
                            <img
                              src={getFlagUrl(country.code)}
                              alt={`${country.name} flag`}
                              className="h-6 w-8 object-cover rounded shadow-sm"
                            />
                          )}
                          <div className="ml-4 text-sm font-medium text-gray-900">
                            {country.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                        <Code className="w-4 h-4 text-gray-400" /> {country.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            country.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {country.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleToggleStatus(country.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            country.status === "active"
                              ? "text-green-600 hover:bg-green-50"
                              : "text-red-600 hover:bg-red-50"
                          }`}
                        >
                          {country.status === "active" ? (
                            <XCircle className="w-4 h-4" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEdit(country)}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(country.id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCountries.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                        <span className="text-4xl">🌍</span>
                        <p className="text-lg mt-4">No countries found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Country Modal */}
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
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., United States"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      required
                      maxLength={2}
                      pattern="[A-Z]{2}"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., US"
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
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving || !formData.name.trim() || !formData.code.trim()}
                      className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 rounded-lg flex items-center space-x-2"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          {formData.code && (
                            <img
                              src={getFlagUrl(formData.code)}
                              alt="flag preview"
                              className="h-5 w-7 object-cover rounded"
                            />
                          )}
                          <span>{editingCountry ? "Update" : "Add"} Country</span>
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
  );
};

export default Countries;
