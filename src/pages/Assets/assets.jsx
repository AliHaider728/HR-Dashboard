 
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form.jsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Search,
  Plus,
  MoreHorizontal,
  Download,
  Edit,
  Trash2,
  FileText,
  Package,
  Tag,
  Calendar,
  User,
  Settings,
  Eye,
  AlertCircle,
  DollarSign,
  Filter,
  Grid3x3,
  List,
  TrendingUp,
  Building2,
  Monitor,
  Smartphone,
  Laptop,
} from "lucide-react"

// Toast Component with better animations
const Toast = ({ message, type = "success", duration = 3000 }) => {
  const [visible, setVisible] = useState(!!message)

  useEffect(() => {
    if (message) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), duration)
      return () => clearTimeout(timer)
    }
  }, [message, duration])

  if (!visible || !message) return null

  const bgColor = type === "success" ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-red-500 to-red-600"
  const IconComponent = type === "success" ? Package : AlertCircle

  return (
    <div className={`fixed top-4 right-4 z-[9999] ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-sm transform transition-all duration-500 ease-out ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <IconComponent className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}

// Form validation schemas
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  status: z.string().min(1, "Status is required"),
})

const assetSchema = z.object({
  name: z.string().min(1, "Asset name is required"),
  categoryId: z.string().min(1, "Category is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  purchaseDate: z.string().min(1, "Purchase date is required"),
  purchasePrice: z.string().min(1, "Purchase price is required"),
  status: z.string().min(1, "Status is required"),
  assignedTo: z.string().optional(),
})

// Mock API with realistic delays
const mockAPI = {
  getAssetCategories: async (page = 1, limit = 10, filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    let data = [
      { id: 1, name: "Laptops", status: "Active", createdAt: "2024-01-10", assetsCount: 15, icon: "laptop" },
      { id: 2, name: "Mobile Phones", status: "Active", createdAt: "2024-01-12", assetsCount: 8, icon: "smartphone" },
      { id: 3, name: "Office Furniture", status: "Active", createdAt: "2024-01-15", assetsCount: 25, icon: "building" },
      { id: 4, name: "Printers", status: "Active", createdAt: "2024-01-18", assetsCount: 6, icon: "printer" },
      { id: 5, name: "Keyboards", status: "Active", createdAt: "2024-01-20", assetsCount: 12, icon: "keyboard" },
      { id: 6, name: "Monitors", status: "Active", createdAt: "2024-01-22", assetsCount: 20, icon: "monitor" },
      { id: 7, name: "Headsets", status: "Active", createdAt: "2024-01-25", assetsCount: 10, icon: "headphones" },
      { id: 8, name: "Scanners", status: "Inactive", createdAt: "2024-01-28", assetsCount: 3, icon: "scanner" },
    ]

    let filtered = [...data]
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.status.toLowerCase().includes(searchLower)
      )
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginated = filtered.slice(startIndex, endIndex)

    return {
      data: paginated,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    }
  },

  getAssets: async (page = 1, limit = 10, filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    let data = [
      { 
        id: 1, 
        name: "Dell Latitude 7420", 
        categoryId: "1", 
        categoryName: "Laptops",
        serialNumber: "DLT7420-001",
        purchaseDate: "2024-01-15",
        purchasePrice: "$1,200",
        status: "In Use",
        assignedTo: "John Doe",
        createdAt: "2024-01-15",
        condition: "Good"
      },
      { 
        id: 2, 
        name: "iPhone 14 Pro", 
        categoryId: "2", 
        categoryName: "Mobile Phones",
        serialNumber: "IP14P-001",
        purchaseDate: "2024-01-20",
        purchasePrice: "$999",
        status: "Available",
        assignedTo: null,
        createdAt: "2024-01-20",
        condition: "Excellent"
      },
      { 
        id: 3, 
        name: "Executive Desk", 
        categoryId: "3", 
        categoryName: "Office Furniture",
        serialNumber: "EXD-001",
        purchaseDate: "2023-12-10",
        purchasePrice: "$450",
        status: "In Use",
        assignedTo: "Sarah Wilson",
        createdAt: "2023-12-10",
        condition: "Good"
      },
      { 
        id: 4, 
        name: "HP LaserJet Pro", 
        categoryId: "4", 
        categoryName: "Printers",
        serialNumber: "HPLP-001",
        purchaseDate: "2024-02-01",
        purchasePrice: "$250",
        status: "In Maintenance",
        assignedTo: null,
        createdAt: "2024-02-01",
        condition: "Needs Repair"
      },
    ]

    let filtered = [...data]
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.categoryName.toLowerCase().includes(searchLower) ||
        item.serialNumber.toLowerCase().includes(searchLower) ||
        (item.assignedTo && item.assignedTo.toLowerCase().includes(searchLower))
      )
    }

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(item => item.categoryId === filters.category)
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(item => item.status === filters.status)
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginated = filtered.slice(startIndex, endIndex)

    return {
      data: paginated,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    }
  },

  createCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { 
      ...category, 
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      assetsCount: 0
    }
  },

  getCategoriesForDropdown: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [
      { id: "1", name: "Laptops" },
      { id: "2", name: "Mobile Phones" },
      { id: "3", name: "Office Furniture" },
      { id: "4", name: "Printers" },
    ]
  }
}

const AssetManagement = () => {
  const [activeTab, setActiveTab] = useState('assets')
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [categories, setCategories] = useState([])
  const [viewMode, setViewMode] = useState('table')
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("success")

  // Forms
  const categoryForm = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      status: "Active",
    },
  })

  const assetForm = useForm({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      serialNumber: "",
      purchaseDate: "",
      purchasePrice: "",
      status: "Available",
      assignedTo: "",
    },
  })

  const notify = (message, type = "success") => {
    setToastMessage(message)
    setToastType(type)
    setTimeout(() => setToastMessage(""), 3000)
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const filters = {
        search: searchTerm,
        category: categoryFilter,
        status: statusFilter,
      }
      
      let response
      if (activeTab === 'categories') {
        response = await mockAPI.getAssetCategories(currentPage, 10, filters)
      } else {
        response = await mockAPI.getAssets(currentPage, 10, filters)
      }
      
      setItems(response.data)
      setTotal(response.total)
      setTotalPages(response.totalPages)
    } catch (error) {
      notify("Failed to fetch data", "error")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const categoriesData = await mockAPI.getCategoriesForDropdown()
      setCategories(categoriesData)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchData()
  }, [activeTab, currentPage, searchTerm, categoryFilter, statusFilter])

  const handleCreateItem = async (data) => {
    try {
      if (activeTab === 'categories') {
        await mockAPI.createCategory(data)
        categoryForm.reset()
      } else {
        // Mock asset creation
        assetForm.reset()
      }
      setIsAddModalOpen(false)
      notify(`${activeTab === 'categories' ? 'Category' : 'Asset'} created successfully!`)
      fetchData()
    } catch (error) {
      notify(`Failed to create ${activeTab === 'categories' ? 'category' : 'asset'}`, "error")
    }
  }

  const getStatusBadge = (status, type = "asset") => {
    const variants = type === "asset" ? {
      "Available": "bg-emerald-50 text-emerald-700 border border-emerald-200",
      "In Use": "bg-orange-50 text-orange-700 border border-orange-200",
      "In Maintenance": "bg-amber-50 text-amber-700 border border-amber-200",
      "Retired": "bg-red-50 text-red-700 border border-red-200",
    } : {
      "Active": "bg-emerald-50 text-emerald-700 border border-emerald-200",
      "Inactive": "bg-red-50 text-red-700 border border-red-200",
    }
    return variants[status] || "bg-gray-50 text-gray-700 border border-gray-200"
  }

  const getStats = () => {
    if (activeTab === 'categories') {
      const activeCount = items.filter(i => i.status === "Active").length
      const totalAssets = items.reduce((sum, i) => sum + (i.assetsCount || 0), 0)

      return [
        { 
          title: "Total Categories", 
          value: total.toString(), 
          change: "+2%", 
          trend: "up",
          icon: Tag,
          color: "text-orange-600",
          bg: "bg-gradient-to-br from-orange-50 to-orange-100"
        },
        { 
          title: "Active Categories", 
          value: activeCount.toString(), 
          change: "+5%", 
          trend: "up",
          icon: TrendingUp,
          color: "text-emerald-600",
          bg: "bg-gradient-to-br from-emerald-50 to-emerald-100"
        },
        { 
          title: "Total Assets", 
          value: totalAssets.toString(), 
          change: "+8%", 
          trend: "up",
          icon: Package,
          color: "text-purple-600",
          bg: "bg-gradient-to-br from-purple-50 to-purple-100"
        },
      ]
    } else {
      const availableCount = items.filter(i => i.status === "Available").length
      const inUseCount = items.filter(i => i.status === "In Use").length
      const totalValue = items.reduce((sum, i) => {
        const price = i.purchasePrice ? parseFloat(i.purchasePrice.replace(/[$,]/g, '')) : 0
        return sum + price
      }, 0)

      return [
        { 
          title: "Total Assets", 
          value: total.toString(), 
          change: "+3%", 
          trend: "up",
          icon: Package,
          color: "text-orange-600",
          bg: "bg-gradient-to-br from-orange-50 to-orange-100"
        },
        { 
          title: "Available", 
          value: availableCount.toString(), 
          change: "+2%", 
          trend: "up",
          icon: TrendingUp,
          color: "text-emerald-600",
          bg: "bg-gradient-to-br from-emerald-50 to-emerald-100"
        },
        { 
          title: "In Use", 
          value: inUseCount.toString(), 
          change: "+1%", 
          trend: "up",
          icon: User,
          color: "text-indigo-600",
          bg: "bg-gradient-to-br from-indigo-50 to-indigo-100"
        },
        { 
          title: "Total Value", 
          value: `$${totalValue.toLocaleString()}`, 
          change: "+8%", 
          trend: "up",
          icon: DollarSign,
          color: "text-purple-600",
          bg: "bg-gradient-to-br from-purple-50 to-purple-100"
        },
      ]
    }
  }

  const getCategoryIcon = (iconType) => {
    const icons = {
      laptop: Laptop,
      smartphone: Smartphone,
      building: Building2,
      monitor: Monitor,
      default: Package
    }
    return icons[iconType] || icons.default
  }

  return (
    <>
      <Toast message={toastMessage} type={toastType} duration={3000} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50/30">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Asset Management
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">Manage your company assets and categories with ease</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button 
                onClick={() => setIsAddModalOpen(true)} 
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add {activeTab === 'categories' ? 'Category' : 'Asset'}
              </Button>
            </div>
          </div>

          {/* Enhanced Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {getStats().map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
                  <CardContent className={`p-6 ${stat.bg} relative overflow-hidden`}>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                        <div className="flex items-center space-x-1">
                          <span className={`text-xs font-semibold ${stat.color}`}>{stat.change}</span>
                          <TrendingUp className={`w-3 h-3 ${stat.color}`} />
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Enhanced Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <TabsList className="grid w-full sm:w-auto grid-cols-2 bg-white shadow-md border">
                <TabsTrigger 
                  value="assets" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-orange-700 data-[state=active]:text-white transition-all duration-200"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Assets
                </TabsTrigger>
                <TabsTrigger 
                  value="categories"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-orange-700 data-[state=active]:text-white transition-all duration-200"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  Categories
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="hidden sm:flex"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="hidden sm:flex"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Assets Tab */}
            <TabsContent value="assets" className="mt-0">
              <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader className="pb-4 space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <CardTitle className="flex items-center text-xl">
                      <Package className="w-5 h-5 mr-2 text-orange-600" />
                      Asset Inventory 
                      <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">
                        {total}
                      </Badge>
                    </CardTitle>
                  </div>

                  {/* Enhanced Filters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search assets..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                          setCurrentPage(1)
                        }}
                        className="pl-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                      />
                    </div>
                    
                    <select 
                      value={categoryFilter} 
                      onChange={(e) => {
                        setCategoryFilter(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="flex h-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    
                    <select 
                      value={statusFilter} 
                      onChange={(e) => {
                        setStatusFilter(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="flex h-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    >
                      <option value="all">All Status</option>
                      <option value="Available">Available</option>
                      <option value="In Use">In Use</option>
                      <option value="In Maintenance">In Maintenance</option>
                      <option value="Retired">Retired</option>
                    </select>
                    
                    <Button variant="outline" className="border-gray-200 hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4">
                      <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                      <p className="text-gray-500">Loading assets...</p>
                    </div>
                  ) : items.length === 0 ? (
                    <div className="text-center py-16 px-6">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Package className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No assets found</h3>
                      <p className="text-gray-500 mb-8 max-w-md mx-auto">Get started by adding your first asset to track and manage your inventory</p>
                      <Button onClick={() => setIsAddModalOpen(true)} className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Asset
                      </Button>
                    </div>
                  ) : (
                    <div className="p-6">
                      {/* Desktop Table View */}
                      <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left p-4 font-semibold text-gray-900">Asset</th>
                              <th className="text-left p-4 font-semibold text-gray-900">Category</th>
                              <th className="text-left p-4 font-semibold text-gray-900">Serial No.</th>
                              <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                              <th className="text-left p-4 font-semibold text-gray-900">Assigned To</th>
                              <th className="text-right p-4 font-semibold text-gray-900">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item) => (
                              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                <td className="p-4">
                                  <div className="font-semibold text-gray-900">{item.name}</div>
                                  <div className="text-sm text-gray-500">{item.purchasePrice}</div>
                                </td>
                                <td className="p-4 text-gray-700">{item.categoryName}</td>
                                <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-mono text-gray-600">{item.serialNumber}</span>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <Badge className={`${getStatusBadge(item.status)} px-3 py-1`} variant="secondary">
                                    {item.status}
                                  </Badge>
                                </td>
                                <td className="p-4">
                                  {item.assignedTo ? (
                                    <div className="flex items-center gap-2">
                                      <User className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm text-gray-700">{item.assignedTo}</span>
                                    </div>
                                  ) : (
                                    <span className="text-sm text-gray-400">Unassigned</span>
                                  )}
                                </td>
                                <td className="p-4 text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                      <DropdownMenuItem className="cursor-pointer">
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="cursor-pointer">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Asset
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Asset
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Card View */}
                      <div className="lg:hidden space-y-4">
                        {items.map((item) => (
                          <Card key={item.id} className="hover:shadow-md transition-shadow border border-gray-200">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                  <p className="text-sm text-gray-500">{item.categoryName}</p>
                                </div>
                                <Badge className={`${getStatusBadge(item.status)} px-2 py-1 text-xs`} variant="secondary">
                                  {item.status}
                                </Badge>
                              </div>
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Serial:</span>
                                  <span className="font-mono text-gray-900">{item.serialNumber}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Price:</span>
                                  <span className="font-semibold text-gray-900">{item.purchasePrice}</span>
                                </div>
                                {item.assignedTo && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Assigned to:</span>
                                    <span className="text-gray-900">{item.assignedTo}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex justify-end mt-4">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit Asset
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Enhanced Pagination */}
                      {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
                          <div className="text-sm text-gray-600">
                            Showing {Math.min((currentPage - 1) * 10 + 1, total)} to {Math.min(currentPage * 10, total)} of {total} results
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                              disabled={currentPage === 1}
                              className="disabled:opacity-50"
                            >
                              Previous
                            </Button>
                            
                            <div className="flex space-x-1">
                              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const page = i + 1
                                return (
                                  <Button
                                    key={page}
                                    variant={page === currentPage ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setCurrentPage(page)}
                                    className={page === currentPage ? "bg-orange-600 text-white" : ""}
                                  >
                                    {page}
                                  </Button>
                                )
                              })}
                            </div>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                              disabled={currentPage === totalPages}
                              className="disabled:opacity-50"
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="mt-0">
              <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader className="pb-4 space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <CardTitle className="flex items-center text-xl">
                      <Tag className="w-5 h-5 mr-2 text-orange-600" />
                      Asset Categories 
                      <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">
                        {total}
                      </Badge>
                    </CardTitle>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                          setCurrentPage(1)
                        }}
                        className="pl-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                      />
                    </div>
                    
                    <Button variant="outline" className="border-gray-200 hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      Export Categories
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4">
                      <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                      <p className="text-gray-500">Loading categories...</p>
                    </div>
                  ) : items.length === 0 ? (
                    <div className="text-center py-16 px-6">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Tag className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
                      <p className="text-gray-500 mb-8 max-w-md mx-auto">Create categories to organize your assets efficiently</p>
                      <Button onClick={() => setIsAddModalOpen(true)} className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800">
                        <Plus className="w-4 h-4 mr-2" />
                        Create First Category
                      </Button>
                    </div>
                  ) : (
                    <div className="p-6">
                      {/* Desktop Grid View for Categories */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map((item) => {
                          const IconComponent = getCategoryIcon(item.icon)
                          return (
                            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                                      <IconComponent className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                        {item.name}
                                      </h3>
                                      <Badge className={`${getStatusBadge(item.status, 'category')} mt-1`} variant="secondary">
                                        {item.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Category
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Category
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Assets Count</span>
                                    <div className="flex items-center space-x-1">
                                      <Package className="w-4 h-4 text-gray-400" />
                                      <span className="font-semibold text-gray-900">{item.assetsCount}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Created</span>
                                    <span className="text-sm text-gray-700">{new Date(item.createdAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>

                      {/* Pagination for Categories */}
                      {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
                          <div className="text-sm text-gray-600">
                            Showing {Math.min((currentPage - 1) * 10 + 1, total)} to {Math.min(currentPage * 10, total)} of {total} categories
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </Button>
                            
                            <div className="flex space-x-1">
                              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const page = i + 1
                                return (
                                  <Button
                                    key={page}
                                    variant={page === currentPage ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setCurrentPage(page)}
                                    className={page === currentPage ? "bg-orange-600 text-white" : ""}
                                  >
                                    {page}
                                  </Button>
                                )
                              })}
                            </div>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                              disabled={currentPage === totalPages}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Enhanced Add Modal */}
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-2xl font-bold">
                  {activeTab === 'categories' ? 'Create New Category' : 'Add New Asset'}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  {activeTab === 'categories' 
                    ? 'Create a new category to organize your assets' 
                    : 'Add a new asset to your inventory with detailed information'
                  }
                </DialogDescription>
              </DialogHeader>

              {activeTab === 'categories' ? (
                <Form {...categoryForm}>
                  <form onSubmit={categoryForm.handleSubmit(handleCreateItem)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={categoryForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">Category Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Laptops, Office Furniture" 
                                {...field} 
                                className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={categoryForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">Status</FormLabel>
                            <FormControl>
                              <select 
                                {...field} 
                                className="flex h-11 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                              >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <DialogFooter className="gap-3">
                      <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                      >
                        Create Category
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              ) : (
                <Form {...assetForm}>
                  <form onSubmit={assetForm.handleSubmit(handleCreateItem)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={assetForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-sm font-semibold">Asset Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Dell Latitude 7420, iPhone 14 Pro" 
                                {...field} 
                                className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={assetForm.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">Category</FormLabel>
                            <FormControl>
                              <select 
                                {...field} 
                                className="flex h-11 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                                required
                              >
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={assetForm.control}
                        name="serialNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">Serial Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., DLT7420-001" 
                                {...field} 
                                className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={assetForm.control}
                        name="purchasePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">Purchase Price</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="$0.00" 
                                {...field} 
                                className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={assetForm.control}
                        name="purchaseDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">Purchase Date</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                {...field} 
                                className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={assetForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">Status</FormLabel>
                            <FormControl>
                              <select 
                                {...field} 
                                className="flex h-11 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                              >
                                <option value="Available">Available</option>
                                <option value="In Use">In Use</option>
                                <option value="In Maintenance">In Maintenance</option>
                                <option value="Retired">Retired</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={assetForm.control}
                        name="assignedTo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">Assigned To</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Employee name (optional)" 
                                {...field} 
                                className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <DialogFooter className="gap-3">
                      <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                      >
                        Add Asset
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}

export default AssetManagement