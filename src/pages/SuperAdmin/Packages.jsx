"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./../../components/ui/card"
import { Badge } from "./../../components/ui/badge"
import { Button } from "./../../components/ui/button"
import { Input } from "./../../components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./../../components/ui/dialog"
import { Switch } from "../../components/ui/Switch"
import { 
  Check, 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Users, 
  Star, 
  Zap,
  Eye,
  Search,
  Filter,
  Download,
  Calendar,
  DollarSign,
  X
} from "lucide-react"

const initialPackagesData = [
  {
    id: 1,
    name: "Basic",
    planType: "Monthly", 
    totalSubscribers: 56,
    price: 50,
    createdDate: "14 Jan 2024",
    status: "Active",
    features: ["5 Users", "10GB Storage", "Email Support", "Basic Analytics"],
    description: "Perfect for small teams and startups",
  },
  {
    id: 2,
    name: "Premium", 
    planType: "Monthly",
    totalSubscribers: 99,
    price: 200,
    createdDate: "21 Jan 2024", 
    status: "Active",
    features: ["25 Users", "100GB Storage", "Priority Support", "Advanced Analytics", "API Access"],
    description: "Ideal for growing businesses",
  },
  {
    id: 3,
    name: "Enterprise",
    planType: "Monthly",
    totalSubscribers: 58, 
    price: 300,
    createdDate: "10 Feb 2024",
    status: "Active",
    features: ["100 Users", "500GB Storage", "24/7 Support", "Premium Analytics", "Custom Integrations"],
    description: "For large organizations",
  },
  {
    id: 4,
    name: "Professional",
    planType: "Monthly",
    totalSubscribers: 67,
    price: 400,
    createdDate: "18 Feb 2024",
    status: "Active",
    features: ["50 Users", "250GB Storage", "Phone Support", "Advanced Reports", "Team Collaboration"],
    description: "Perfect for professional teams", 
  },
  {
    id: 5,
    name: "Basic",
    planType: "Yearly",
    totalSubscribers: 78,
    price: 600,
    createdDate: "15 Mar 2024",
    status: "Active",
    features: ["5 Users", "10GB Storage", "Email Support", "Basic Analytics"],
    description: "Perfect for small teams and startups (Yearly)",
  },
  {
    id: 6,
    name: "Premium",
    planType: "Yearly", 
    totalSubscribers: 99,
    price: 2400,
    createdDate: "26 Mar 2024",
    status: "Active",
    features: ["25 Users", "100GB Storage", "Priority Support", "Advanced Analytics", "API Access"],
    description: "Ideal for growing businesses (Yearly)",
  },
  {
    id: 7,
    name: "Enterprise",
    planType: "Yearly",
    totalSubscribers: 48,
    price: 3600, 
    createdDate: "05 Apr 2024",
    status: "Inactive",
    features: ["100 Users", "500GB Storage", "24/7 Support", "Premium Analytics", "Custom Integrations"],
    description: "For large organizations (Yearly)",
  },
  {
    id: 8,
    name: "Professional", 
    planType: "Yearly",
    totalSubscribers: 17,
    price: 4800,
    createdDate: "16 Apr 2024",
    status: "Active",
    features: ["50 Users", "250GB Storage", "Phone Support", "Advanced Reports", "Team Collaboration"],
    description: "Perfect for professional teams (Yearly)",
  },
]

export default function Packages() {
  const [packagesData, setPackagesData] = useState(initialPackagesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [planTypeFilter, setPlanTypeFilter] = useState("All")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    planType: "Monthly",
    price: "",
    status: "Active",
    description: "",
    features: ""
  })

  // Filter and search functionality
  const filteredData = useMemo(() => {
    return packagesData.filter(plan => {
      const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plan.planType.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "All" || plan.status === statusFilter
      const matchesPlanType = planTypeFilter === "All" || plan.planType === planTypeFilter
      
      return matchesSearch && matchesStatus && matchesPlanType
    })
  }, [packagesData, searchTerm, statusFilter, planTypeFilter])

  // Calculate stats
  const totalPlans = packagesData.length
  const activePlans = packagesData.filter(p => p.status === "Active").length
  const inactivePlans = packagesData.filter(p => p.status === "Inactive").length
  const planTypes = [...new Set(packagesData.map(p => p.planType))].length
  const totalRevenue = packagesData.reduce((sum, plan) => sum + (plan.price * plan.totalSubscribers), 0)

  // Form handlers
  const resetForm = () => {
    setFormData({
      name: "",
      planType: "Monthly",
      price: "",
      status: "Active",
      description: "",
      features: ""
    })
  }

  const handleAdd = () => {
    if (!formData.name || !formData.price) return
    
    const newPlan = {
      id: packagesData.length + 1,
      name: formData.name,
      planType: formData.planType,
      price: parseInt(formData.price),
      status: formData.status,
      description: formData.description,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      totalSubscribers: 0,
      createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    }
    
    setPackagesData([...packagesData, newPlan])
    setShowAddDialog(false)
    resetForm()
  }

  const handleEdit = (plan) => {
    setSelectedPlan(plan)
    setFormData({
      name: plan.name,
      planType: plan.planType,
      price: plan.price.toString(),
      status: plan.status,
      description: plan.description,
      features: plan.features.join(', ')
    })
    setShowEditDialog(true)
  }

  const handleUpdate = () => {
    if (!formData.name || !formData.price) return
    
    const updatedData = packagesData.map(plan => 
      plan.id === selectedPlan.id 
        ? {
            ...plan,
            name: formData.name,
            planType: formData.planType,
            price: parseInt(formData.price),
            status: formData.status,
            description: formData.description,
            features: formData.features.split(',').map(f => f.trim()).filter(f => f)
          }
        : plan
    )
    
    setPackagesData(updatedData)
    setShowEditDialog(false)
    resetForm()
  }

  const handleDelete = (plan) => {
    setSelectedPlan(plan)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    setPackagesData(packagesData.filter(plan => plan.id !== selectedPlan.id))
    setShowDeleteDialog(false)
    setSelectedPlan(null)
  }

  const handleView = (plan) => {
    setSelectedPlan(plan)
    setShowViewDialog(true)
  }

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Plan Name,Plan Type,Total Subscribers,Price,Created Date,Status\n" +
      packagesData.map(plan => 
        `${plan.name},${plan.planType},${plan.totalSubscribers},${plan.price},${plan.createdDate},${plan.status}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "packages_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Packages</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your subscription plans and pricing</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={exportData} className="w-full sm:w-auto text-xs sm:text-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={() => setShowAddDialog(true)} 
            className="bg-orange-500 hover:scale-x-105 duration-300 transition-all ease-in-out hover:bg-orange-600 w-full sm:w-auto text-xs sm:text-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Plan
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm sm:text-base">Total Plans</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">{totalPlans.toString().padStart(2, '0')}</p>
              </div>
              <Package className="h-8 w-8 sm:h-10 sm:w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm sm:text-base">Active Plans</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">{activePlans.toString().padStart(2, '0')}</p>
              </div>
              <Check className="h-8 w-8 sm:h-10 sm:w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm sm:text-base">Inactive Plans</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">{inactivePlans}</p>
              </div>
              <X className="h-8 w-8 sm:h-10 sm:w-10 text-red-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm sm:text-base">Plan Types</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">{planTypes.toString().padStart(2, '0')}</p>
              </div>
              <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm sm:text-base">Total Revenue</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 sm:h-10 sm:w-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-auto"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select 
                value={planTypeFilter}
                onChange={(e) => setPlanTypeFilter(e.target.value)}
                className="px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-auto"
              >
                <option value="All">All Types</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Plan List Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
            <span>Plan List</span>
            <Badge variant="outline" className="text-xs sm:text-sm">{filteredData.length} plans</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Plan Name</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Plan Type</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Subscribers</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Price</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Revenue</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Created Date</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Status</th>
                  <th className="text-center py-3 sm:py-4 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((plan) => (
                    <tr key={plan.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">{plan.name}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{plan.description}</div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <Badge variant={plan.planType === "Monthly" ? "default" : "secondary"} className="text-xs sm:text-sm">
                          {plan.planType}
                        </Badge>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <div className="flex items-center text-sm sm:text-base">
                          <Users className="h-4 w-4 text-gray-400 mr-1" />
                          {plan.totalSubscribers}
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 font-semibold text-sm sm:text-base">${plan.price}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 font-semibold text-green-600 text-sm sm:text-base">
                        ${(plan.price * plan.totalSubscribers).toLocaleString()}
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <div className="flex items-center text-gray-600 text-sm sm:text-base">
                          <Calendar className="h-4 w-4 mr-1" />
                          {plan.createdDate}
                          </div>
                        </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <Badge 
                          variant={plan.status === "Active" ? "default" : "secondary"}
                          className={plan.status === "Active" 
                            ? "bg-green-100 text-green-800 border-green-200 text-xs sm:text-sm" 
                            : "bg-gray-100 text-gray-800 border-gray-200 text-xs sm:text-sm"
                          }
                        >
                          {plan.status}
                        </Badge>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleView(plan)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs sm:text-sm"
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(plan)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50 text-xs sm:text-sm"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(plan)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500 text-sm sm:text-base">
                      No plans found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Plan Dialog */}
      {showViewDialog && selectedPlan && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-full sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl md:text-2xl">Plan Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">Plan Name</label>
                  <p className="text-base sm:text-lg font-semibold">{selectedPlan.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Plan Type</label>
                  <p className="text-base sm:text-lg"><Badge>{selectedPlan.planType}</Badge></p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Price</label>
                  <p className="text-base sm:text-lg font-semibold text-green-600">${selectedPlan.price}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Total Subscribers</label>
                  <p className="text-base sm:text-lg font-semibold">{selectedPlan.totalSubscribers}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <p className="text-base sm:text-lg">
                    <Badge variant={selectedPlan.status === "Active" ? "default" : "secondary"}>
                      {selectedPlan.status}
                    </Badge>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Created Date</label>
                  <p className="text-base sm:text-lg">{selectedPlan.createdDate}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Description</label>
                <p className="text-gray-800 mt-1 text-sm sm:text-base">{selectedPlan.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Features</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedPlan.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 text-xs sm:text-sm">
                      <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm sm:text-base">Total Revenue:</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                    ${(selectedPlan.price * selectedPlan.totalSubscribers).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <Button variant="outline" onClick={() => setShowViewDialog(false)} className="w-full sm:w-auto text-xs sm:text-sm">
                Close
              </Button>
              <Button 
                onClick={() => {
                  setShowViewDialog(false)
                  handleEdit(selectedPlan)
                }}
                className="w-full sm:w-auto text-xs sm:text-sm"
              >
                Edit Plan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add New Plan Dialog */}
      {showAddDialog && (
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-full sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl md:text-2xl">Add New Plan</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Plan Name *</label>
                <Input 
                  placeholder="Enter plan name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Plan Type</label>
                <select 
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-sm sm:text-base"
                  value={formData.planType}
                  onChange={(e) => setFormData({...formData, planType: e.target.value})}
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price *</label>
                <Input 
                  type="number" 
                  placeholder="Enter price" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select 
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-sm sm:text-base"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input 
                  placeholder="Enter plan description" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <label className="text-sm font-medium">Features</label>
                <Input 
                  placeholder="Enter features (comma separated)" 
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddDialog(false)
                  resetForm()
                }}
                className="w-full sm:w-auto text-xs sm:text-sm"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAdd}
                className="w-full sm:w-auto text-xs sm:text-sm"
              >
                Add Plan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Plan Dialog */}
      {showEditDialog && selectedPlan && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-full sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl md:text-2xl">Edit Plan</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Plan Name *</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Plan Type</label>
                <select 
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-sm sm:text-base" 
                  value={formData.planType}
                  onChange={(e) => setFormData({...formData, planType: e.target.value})}
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price *</label>
                <Input 
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select 
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-sm sm:text-base" 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <label className="text-sm font-medium">Features</label>
                <Input 
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowEditDialog(false)
                  resetForm()
                }}
                className="w-full sm:w-auto text-xs sm:text-sm"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdate}
                className="w-full sm:w-auto text-xs sm:text-sm"
              >
                Update Plan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && selectedPlan && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="max-w-full sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl md:text-2xl">Confirm Delete</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm sm:text-base text-gray-600">
                Are you sure you want to delete the plan "<strong>{selectedPlan.name}</strong>"? 
                This action cannot be undone and will affect {selectedPlan.totalSubscribers} subscribers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteDialog(false)}
                className="w-full sm:w-auto text-xs sm:text-sm"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 w-full sm:w-auto text-xs sm:text-sm"
              >
                Delete Plan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}