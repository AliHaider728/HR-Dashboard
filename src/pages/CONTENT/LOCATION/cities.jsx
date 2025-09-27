import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Map,
  MapPin,
  Globe,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Edit,
  Trash2,
  Loader2,
  AlertCircle,
} from "lucide-react";

const Cities = () => {
  const navigate = useNavigate();

  // Valid countries and states from previous components
  const validCountries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Argentina",
    "India",
    "Italy",
    "New Zealand",
    "Australia",
  ];

  const validStates = [
    { name: "California", country: "United States" },
    { name: "New York", country: "United States" },
    { name: "Texas", country: "United States" },
    { name: "Bavaria", country: "Germany" },
    { name: "Quebec", country: "Canada" },
    { name: "Ontario", country: "Canada" },
    { name: "Florida", country: "United States" },
    { name: "Berlin", country: "Germany" },
    { name: "Victoria", country: "Australia" },
    { name: "Alberta", country: "Canada" }, // Added for Calgary
  ];

  const [cities, setCities] = useState([
    { id: 1, name: "Los Angeles", state: "California", country: "United States", status: "active" },
    { id: 2, name: "New York City", state: "New York", country: "United States", status: "active" }, // Corrected state
    { id: 3, name: "Houston", state: "Texas", country: "United States", status: "active" },
    { id: 4, name: "Munich", state: "Bavaria", country: "Germany", status: "active" },
    { id: 5, name: "Montreal", state: "Quebec", country: "Canada", status: "active" },
    { id: 6, name: "Toronto", state: "Ontario", country: "Canada", status: "active" },
    { id: 7, name: "Miami", state: "Florida", country: "United States", status: "active" },
    { id: 8, name: "Calgary", state: "Alberta", country: "Canada", status: "active" }, // Corrected state
    { id: 9, name: "Melbourne", state: "Victoria", country: "Australia", status: "active" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    country: "",
    status: "active",
  });

  // Filter states based on selected country
  const availableStates = validStates.filter(state => state.country === formData.country);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset state when country changes to ensure valid selection
      ...(name === "country" ? { state: "" } : {}),
    }));
  };

  const handleToggleStatus = (id) => {
    setCities(prev =>
      prev.map(city =>
        city.id === id
          ? { ...city, status: city.status === "active" ? "inactive" : "active" }
          : city
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      setCities(prev => prev.filter(city => city.id !== id));
      alert("City deleted successfully!");
    }
  };

  const handleEdit = (city) => {
    setFormData({ ...city });
    setEditingCity(city);
    setShowAddModal(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.state || !formData.country) {
      alert("City name, state, and country cannot be empty.");
      return;
    }
    if (!validCountries.includes(formData.country)) {
      alert("Please select a valid country.");
      return;
    }
    if (!validStates.find(state => state.name === formData.state && state.country === formData.country)) {
      alert("Please select a valid state for the selected country.");
      return;
    }
    setIsSaving(true);
    try {
      setTimeout(() => {
        if (editingCity) {
          setCities(prev =>
            prev.map(city =>
              city.id === editingCity.id ? { ...formData, id: editingCity.id } : city
            )
          );
          alert("City updated successfully!");
        } else {
          const newCity = {
            ...formData,
            id: Date.now(),
          };
          setCities(prev => [...prev, newCity]);
          alert("City added successfully!");
        }
        setShowAddModal(false);
        setEditingCity(null);
        setFormData({ name: "", state: "", country: "", status: "active" });
        setIsSaving(false);
      }, 1500);
    } catch (error) {
      setIsSaving(false);
      alert("Error saving city. Please try again.");
    }
  };

  const handleCloseModal = () => {
    if (window.confirm("Discard changes?")) {
      setShowAddModal(false);
      setEditingCity(null);
      setFormData({ name: "", state: "", country: "", status: "active" });
    }
  };

  const modalTitle = editingCity ? "Edit City" : "Add City";

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
                  Cities
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage cities for your application
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg font-semibold font-[Poppins]">
                  Cities List
                </CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search cities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setEditingCity(null);
                      setFormData({ name: "", state: "", country: "", status: "active" });
                      setShowAddModal(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add City</span>
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
                        City Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        State Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Country Name
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
                    {filteredCities.map((city) => (
                      <tr key={city.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                                <Map className="w-5 h-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {city.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            {city.state}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Globe className="w-4 h-4 mr-2 text-gray-400" />
                            {city.country}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            city.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {city.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleToggleStatus(city.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              city.status === 'active'
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                            title={city.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            {city.status === 'active' ? (
                              <XCircle className="w-4 h-4" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(city)}
                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(city.id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredCities.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                          <Map className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg">No cities found</p>
                          <p className="text-sm">
                            {searchTerm ? 'Try adjusting your search terms.' : 'Add your first city to get started.'}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit City Modal */}
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
                        City Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter city name (e.g., Los Angeles)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country Name <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="" disabled>Select a country</option>
                        {validCountries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State Name <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        disabled={!formData.country}
                      >
                        <option value="" disabled>Select a state</option>
                        {availableStates.map(state => (
                          <option key={state.name} value={state.name}>{state.name}</option>
                        ))}
                      </select>
                      {!formData.country && (
                        <p className="text-sm text-gray-500 mt-1">Select a country first to see available states.</p>
                      )}
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
                        disabled={isSaving || !formData.name.trim() || !formData.state || !formData.country}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Map className="w-4 h-4" />
                            <span>{editingCity ? "Update" : "Add"} City</span>
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

export default Cities;