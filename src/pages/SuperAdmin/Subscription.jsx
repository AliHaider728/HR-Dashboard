"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from  "../../components/ui/AlertDialog"
import { 
  Search, 
  Filter, 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  Users, 
  Eye, 
  Download, 
  Trash2, 
  X, 
  Menu, 
  MoreVertical, 
  ChevronDown, 
  Plus,
  Edit,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpDown
} from "lucide-react"

// Enhanced subscription data with more realistic information
const initialSubscriptionData = [
  {
    id: 1,
    company: "Aurora Technologies",
    plan: "Enterprise (Monthly)",
    planType: "Enterprise",
    billingType: "Monthly",
    billingCycle: "30 Days",
    paymentMethod: "Credit Card",
    amount: 400,
    currency: "USD",
    createdDate: "2024-07-20",
    expiringOn: "2024-08-19",
    status: "Paid",
    nextBilling: "2024-08-19",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-05.svg",
    email: "billing@aurora-tech.com",
    phone: "+1 (555) 123-4567"
  },
  {
    id: 2,
    company: "BlueSky Ventures",
    plan: "Advanced (Monthly)",
    planType: "Advanced",
    billingType: "Monthly", 
    billingCycle: "30 Days",
    paymentMethod: "Paypal",
    amount: 200,
    currency: "USD",
    createdDate: "2024-04-10",
    expiringOn: "2024-08-19",
    status: "Paid",
    nextBilling: "2024-08-19",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-06.svg",
    email: "finance@bluesky.com",
    phone: "+1 (555) 987-6543"
  },
  {
    id: 3,
    company: "BrightWave Innovations",
    plan: "Advanced (Monthly)",
    planType: "Advanced",
    billingType: "Monthly",
    billingCycle: "30 Days", 
    paymentMethod: "Credit Card",
    amount: 200,
    currency: "USD",
    createdDate: "2024-09-12",
    expiringOn: "2024-10-11",
    status: "Paid",
    nextBilling: "2024-10-11",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-01.svg",
    email: "accounts@brightwave.com",
    phone: "+1 (555) 456-7890"
  },
  {
    id: 4,
    company: "EcoVision Enterprises",
    plan: "Advanced (Monthly)",
    planType: "Advanced",
    billingType: "Monthly",
    billingCycle: "30 Days",
    paymentMethod: "Paypal",
    amount: 200,
    currency: "USD",
    createdDate: "2024-10-17",
    expiringOn: "2024-11-16",
    status: "Paid",
    nextBilling: "2024-11-16",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-04.svg",
    email: "billing@ecovision.com",
    phone: "+1 (555) 234-5678"
  },
  {
    id: 5,
    company: "Epicurean Delights",
    plan: "Advanced (Monthly)",
    planType: "Advanced",
    billingType: "Monthly",
    billingCycle: "30 Days",
    paymentMethod: "Credit Card",
    amount: 200,
    currency: "USD",
    createdDate: "2024-12-17",
    expiringOn: "2025-01-16",
    status: "Paid",
    nextBilling: "2025-01-16",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-10.svg",
    email: "finance@epicurean.com",
    phone: "+1 (555) 345-6789"
  },
  {
    id: 6,
    company: "Nimbus Networks",
    plan: "Basic (Yearly)",
    planType: "Basic",
    billingType: "Yearly",
    billingCycle: "365 Days",
    paymentMethod: "Paypal",
    amount: 600,
    currency: "USD",
    createdDate: "2024-11-03",
    expiringOn: "2025-11-02",
    status: "Paid",
    nextBilling: "2025-11-02",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-09.svg",
    email: "accounts@nimbus.net",
    phone: "+1 (555) 567-8901"
  },
  {
    id: 7,
    company: "Quantum Nexus",
    plan: "Advanced (Monthly)",
    planType: "Advanced",
    billingType: "Monthly",
    billingCycle: "30 Days",
    paymentMethod: "Debit Card",
    amount: 200,
    currency: "USD",
    createdDate: "2024-02-18",
    expiringOn: "2024-03-17",
    status: "Expired",
    nextBilling: "2024-03-17",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-03.svg",
    email: "billing@quantum-nexus.com",
    phone: "+1 (555) 678-9012"
  },
  {
    id: 8,
    company: "Stellar Dynamics",
    plan: "Basic (Yearly)",
    planType: "Basic",
    billingType: "Yearly",
    billingCycle: "365 Days",
    paymentMethod: "Paypal",
    amount: 600,
    currency: "USD",
    createdDate: "2024-10-24",
    expiringOn: "2025-10-23",
    status: "Paid",
    nextBilling: "2025-10-23",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-02.svg",
    email: "finance@stellar-dynamics.com",
    phone: "+1 (555) 789-0123"
  },
  {
    id: 9,
    company: "TerraFusion Energy",
    plan: "Enterprise (Yearly)",
    planType: "Enterprise",
    billingType: "Yearly",
    billingCycle: "365 Days",
    paymentMethod: "Credit Card",
    amount: 4800,
    currency: "USD",
    createdDate: "2024-08-29",
    expiringOn: "2025-08-28",
    status: "Paid",
    nextBilling: "2025-08-28",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-07.svg",
    email: "accounts@terrafusion.com",
    phone: "+1 (555) 890-1234"
  },
  {
    id: 10,
    company: "UrbanPulse Design",
    plan: "Basic (Monthly)",
    planType: "Basic",
    billingType: "Monthly",
    billingCycle: "30 Days",
    paymentMethod: "Credit Card",
    amount: 50,
    currency: "USD",
    createdDate: "2024-02-22",
    expiringOn: "2024-03-21",
    status: "Unpaid",
    nextBilling: "2024-03-21",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-08.svg",
    email: "billing@urbanpulse.com",
    phone: "+1 (555) 901-2345"
  }
]

// Plan configurations
const planConfigs = {
  Basic: {
    monthlyPrice: 50,
    yearlyPrice: 600,
    color: "green",
    features: ["Up to 50 users", "Basic Analytics", "Community Support"]
  },
  Advanced: {
    monthlyPrice: 200,
    yearlyPrice: 2000,
    color: "blue", 
    features: ["Up to 100 users", "Standard Analytics", "Email Support", "Basic Integrations"]
  },
  Enterprise: {
    monthlyPrice: 400,
    yearlyPrice: 4800,
    color: "purple",
    features: ["Unlimited users", "Advanced Analytics", "Priority Support", "Custom Integrations"]
  }
}

// Utility functions
const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const isExpiringSoon = (expiringDate) => {
  const today = new Date()
  const expiry = new Date(expiringDate)
  const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
  return daysUntilExpiry <= 30 && daysUntilExpiry >= 0
}

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'paid':
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'unpaid':
      return <AlertCircle className="h-4 w-4 text-red-600" />
    case 'expired':
      return <Clock className="h-4 w-4 text-orange-600" />
    default:
      return <Clock className="h-4 w-4 text-gray-600" />
  }
}

// Mobile Card Component for Subscriptions
const MobileSubscriptionCard = ({ subscription, onViewInvoice, onDelete, onEdit }) => {
  const isExpiring = isExpiringSoon(subscription.expiringOn)
  
  return (
    <Card className={`p-4 mb-3  shadow-sm hover:shadow-md transition-shadow ${isExpiring ? 'border-orange-200 bg-orange-50' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img 
              src={subscription.logo} 
              alt={subscription.company}
              className="w-full h-full object-contain p-1"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0Y5FEFCQSI+PC9yZWN0Pgo8cGF0aCBkPSJNMTIgMTZIMjhWMjRIMTJWMTZaIiBmaWxsPSIjNjY2NjY2Ij48L3BhdGg+CjwvcmVnPg=='
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm truncate">{subscription.company}</p>
            <Badge
              variant="outline"
              className={`text-xs ${
                planConfigs[subscription.planType].color === "purple"
                  ? "border-purple-500 text-purple-700 bg-purple-50"
                  : planConfigs[subscription.planType].color === "blue"
                    ? "border-blue-500 text-blue-700 bg-blue-50"
                    : "border-green-500 text-green-700 bg-green-50"
              }`}
            >
              {subscription.plan}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {getStatusIcon(subscription.status)}
            <Badge
              variant={subscription.status === "Paid" ? "default" : subscription.status === "Expired" ? "secondary" : "destructive"}
              className={`text-xs ${
                subscription.status === "Paid"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : subscription.status === "Expired"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              {subscription.status}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewInvoice(subscription)}>
                <Eye className="h-4 w-4 mr-2" />
                View Invoice
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(subscription)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Subscription
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(subscription)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {isExpiring && (
        <div className="mb-3 p-2 bg-orange-100 border border-orange-200 rounded text-xs text-orange-700">
          <AlertCircle className="h-3 w-3 inline mr-1" />
          Expires in {Math.ceil((new Date(subscription.expiringOn) - new Date()) / (1000 * 60 * 60 * 24))} days
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-gray-500">Amount</span>
          <p className="font-semibold text-lg">{formatCurrency(subscription.amount)}</p>
        </div>
        <div>
          <span className="text-gray-500">Payment</span>
          <p className="font-medium">{subscription.paymentMethod}</p>
        </div>
        <div>
          <span className="text-gray-500">Created</span>
          <p className="font-medium">{formatDate(subscription.createdDate)}</p>
        </div>
        <div>
          <span className="text-gray-500">Next Billing</span>
          <p className="font-medium">{formatDate(subscription.nextBilling)}</p>
        </div>
      </div>
    </Card>
  )
}

export default function Subscription() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptionData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("company")
  const [sortOrder, setSortOrder] = useState("asc")
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Memoized filtered and sorted subscriptions
  const filteredSubscriptions = useMemo(() => {
    let filtered = subscriptions.filter((subscription) => {
      const matchesSearch = subscription.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           subscription.email?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPlan = selectedPlan === "all" || subscription.planType === selectedPlan
      const matchesStatus = selectedStatus === "all" || subscription.status.toLowerCase() === selectedStatus

      return matchesSearch && matchesPlan && matchesStatus
    })

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === "amount") {
        aValue = parseFloat(aValue)
        bValue = parseFloat(bValue)
      } else if (sortBy === "createdDate" || sortBy === "expiringOn") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      } else {
        aValue = aValue?.toString().toLowerCase() || ""
        bValue = bValue?.toString().toLowerCase() || ""
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [subscriptions, searchTerm, selectedPlan, selectedStatus, sortBy, sortOrder])

  // Calculate statistics
  const stats = useMemo(() => {
    const total = subscriptions.length
    const active = subscriptions.filter(s => s.status === "Paid").length
    const expiringSoon = subscriptions.filter(s => isExpiringSoon(s.expiringOn) && s.status === "Paid").length
    const totalRevenue = subscriptions
      .filter(s => s.status === "Paid")
      .reduce((sum, s) => sum + (s.billingType === "Monthly" ? s.amount : s.amount / 12), 0)

    return {
      total,
      active,
      expiringSoon,
      monthlyRevenue: totalRevenue
    }
  }, [subscriptions])

  // Calculate plan statistics
  const planStats = useMemo(() => {
    const planData = {}
    Object.keys(planConfigs).forEach(plan => {
      const planSubs = subscriptions.filter(s => s.planType === plan && s.status === "Paid")
      planData[plan] = {
        count: planSubs.length,
        revenue: planSubs.reduce((sum, s) => sum + (s.billingType === "Monthly" ? s.amount : s.amount / 12), 0)
      }
    })
    return planData
  }, [subscriptions])

  const subscriptionStats = [
    { 
      title: "Total Subscriptions", 
      value: stats.total.toString(), 
      change: "+8.2%", 
      icon: CreditCard, 
      color: "text-blue-600", 
      bgColor: "bg-blue-50", 
      borderColor: "border-blue-200" 
    },
    { 
      title: "Active Subscriptions", 
      value: stats.active.toString(), 
      change: "+12.5%", 
      icon: TrendingUp, 
      color: "text-green-600", 
      bgColor: "bg-green-50", 
      borderColor: "border-green-200" 
    },
    { 
      title: "Monthly Revenue", 
      value: formatCurrency(stats.monthlyRevenue), 
      change: "+15.3%", 
      icon: CreditCard, 
      color: "text-purple-600", 
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200" 
    },
    { 
      title: "Expiring Soon", 
      value: stats.expiringSoon.toString(), 
      change: "-5.1%", 
      icon: Calendar, 
      color: "text-orange-600", 
      bgColor: "bg-orange-50", 
      borderColor: "border-orange-200" 
    },
  ]

  const handleViewInvoice = useCallback((subscription) => {
    setSelectedInvoice({
      ...subscription,
      invoiceNumber: `INV${(subscription.id + 286).toString().padStart(4, '0')}`,
      issueDate: subscription.createdDate,
      dueDate: subscription.expiringOn,
      cardNumber: subscription.paymentMethod === "Credit Card" ? "123***********789" : null
    })
    setInvoiceModalOpen(true)
  }, [])

  const handleDeleteSubscription = useCallback((subscription) => {
    setSubscriptionToDelete(subscription)
    setDeleteDialogOpen(true)
  }, [])

  const confirmDelete = useCallback(() => {
    if (subscriptionToDelete) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setSubscriptions(prev => prev.filter(s => s.id !== subscriptionToDelete.id))
        setDeleteDialogOpen(false)
        setSubscriptionToDelete(null)
        setIsLoading(false)
      }, 1000)
    }
  }, [subscriptionToDelete])

  const handleEditSubscription = useCallback((subscription) => {
    // This would typically open an edit modal or navigate to edit page
    console.log("Edit subscription:", subscription)
    // For demo, let's just toggle the status
    setSubscriptions(prev => prev.map(s => 
      s.id === subscription.id 
        ? { ...s, status: s.status === "Paid" ? "Unpaid" : "Paid" }
        : s
    ))
  }, [])

  const downloadInvoice = useCallback(() => {
    if (selectedInvoice) {
      // Simulate download
      setIsLoading(true)
      setTimeout(() => {
        const element = document.createElement('a')
        const file = new Blob([`Invoice ${selectedInvoice.invoiceNumber} for ${selectedInvoice.company}`], {type: 'text/plain'})
        element.href = URL.createObjectURL(file)
        element.download = `${selectedInvoice.invoiceNumber}.txt`
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
        setIsLoading(false)
      }, 1000)
    }
  }, [selectedInvoice])

  const handleSort = useCallback((field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }, [sortBy])

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 max-w-full mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-sm text-gray-600 mt-1">Super Admin / Subscriptions</p>
        </div>
         
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {subscriptionStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className={`${stat.borderColor} border-l-4 hover:shadow-md transition-shadow`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className={`text-xs sm:text-sm ${stat.color} mt-1`}>{stat.change}</p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-full ${stat.bgColor} ${stat.color} flex-shrink-0`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Plan Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Object.entries(planConfigs).map(([planName, config]) => (
          <Card key={planName} className={`hover:shadow-md transition-shadow border-l-4 border-${config.color}-500`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <div className={`w-3 h-3 bg-${config.color}-500 rounded-full`}></div>
                {planName} Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xl sm:text-2xl font-bold">{formatCurrency(config.monthlyPrice)}</p>
                <p className="text-xs sm:text-sm text-gray-600">per month</p>
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span>Active Subscriptions</span>
                  <span className="font-medium">{planStats[planName]?.count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Revenue</span>
                  <span className="font-medium">{formatCurrency(planStats[planName]?.revenue || 0)}</span>
                </div>
              </div>
              <ul className="text-xs sm:text-sm space-y-1 text-gray-600">
                {config.features.map((feature, idx) => (
                  <li key={idx}>• {feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscriptions Section */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg">
                All Subscriptions ({filteredSubscriptions.length})
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="lg:hidden"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search companies or emails..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Controls */}
            <div className={`flex flex-col sm:flex-row gap-3 ${filtersOpen ? 'block' : 'hidden lg:flex'}`}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="justify-between">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Plan: {selectedPlan === "all" ? "All" : selectedPlan}
                    </div>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => setSelectedPlan("all")}>All Plans</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedPlan("Basic")}>Basic</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedPlan("Advanced")}>Advanced</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedPlan("Enterprise")}>Enterprise</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="justify-between">
                    <div className="flex items-center">
                      Status: {selectedStatus === "all" ? "All" : selectedStatus}
                    </div>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => setSelectedStatus("all")}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("paid")}>Paid</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("unpaid")}>Unpaid</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("expired")}>Expired</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="justify-between">
                    <div className="flex items-center">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Sort: {sortBy} ({sortOrder})
                    </div>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => handleSort("company")}>Company Name</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("amount")}>Amount</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("createdDate")}>Created Date</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("expiringOn")}>Expiring Date</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("status")}>Status</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 sm:p-6">
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Mobile View */}
          <div className="block lg:hidden px-4 pb-4">
            {filteredSubscriptions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No subscriptions found</p>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              filteredSubscriptions.map((subscription) => (
                <MobileSubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  onViewInvoice={handleViewInvoice}
                  onDelete={handleDeleteSubscription}
                  onEdit={handleEditSubscription}
                />
              ))
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto relative">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort("company")}
                      className="font-semibold hover:bg-gray-50"
                    >
                      Subscriber
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Billing Cycle</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort("amount")}
                      className="font-semibold hover:bg-gray-50"
                    >
                      Amount
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort("createdDate")}
                      className="font-semibold hover:bg-gray-50"
                    >
                      Created Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort("expiringOn")}
                      className="font-semibold hover:bg-gray-50"
                    >
                      Next Billing
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort("status")}
                      className="font-semibold hover:bg-gray-50"
                    >
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">No subscriptions found</p>
                      <p>Try adjusting your search or filter criteria.</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscriptions.map((subscription) => {
                    const isExpiring = isExpiringSoon(subscription.expiringOn)
                    return (
                      <TableRow 
                        key={subscription.id} 
                        className={`hover:bg-gray-50 ${isExpiring ? 'bg-orange-50 border-l-4 border-orange-300' : ''}`}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <img 
                                src={subscription.logo} 
                                alt={subscription.company}
                                className="w-full h-full object-contain p-1"
                                onError={(e) => {
                                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0Y5FEFCQSI+PC9yZWN0Pgo8cGF0aCBkPSJNMTIgMTZIMjhWMjRIMTJWMTZaIiBmaWxsPSIjNjY2NjY2Ij48L3BhdGg+CjwvcmVnPg=='
                                }}
                              />
                            </div>
                            <div>
                              <p className="font-medium">{subscription.company}</p>
                              <p className="text-xs text-gray-500">{subscription.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              planConfigs[subscription.planType].color === "purple"
                                ? "border-purple-500 text-purple-700 bg-purple-50"
                                : planConfigs[subscription.planType].color === "blue"
                                  ? "border-blue-500 text-blue-700 bg-blue-50"
                                  : "border-green-500 text-green-700 bg-green-50"
                            }
                          >
                            {subscription.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{subscription.billingCycle}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{subscription.paymentMethod}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{formatCurrency(subscription.amount)}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{formatDate(subscription.createdDate)}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{formatDate(subscription.nextBilling)}</span>
                            {isExpiring && <AlertCircle className="h-4 w-4 text-orange-500" />}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(subscription.status)}
                            <Badge
                              variant={
                                subscription.status === "Paid" ? "default" : 
                                subscription.status === "Expired" ? "secondary" : "destructive"
                              }
                              className={
                                subscription.status === "Paid"
                                  ? "bg-green-500 hover:bg-green-600 text-white"
                                  : subscription.status === "Expired"
                                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                                    : "bg-red-500 hover:bg-red-600 text-white"
                              }
                            >
                              {subscription.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewInvoice(subscription)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditSubscription(subscription)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Subscription
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteSubscription(subscription)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Invoice Modal */}
      <Dialog open={invoiceModalOpen} onOpenChange={setInvoiceModalOpen}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <DialogTitle className="text-lg sm:text-xl">Invoice Details</DialogTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={downloadInvoice}
                  disabled={isLoading}
                >
                  <Download className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">
                    {isLoading ? "Downloading..." : "Download"}
                  </span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => selectedInvoice && handleDeleteSubscription(selectedInvoice)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          {selectedInvoice && (
            <div className="space-y-6 p-4 sm:p-6 bg-white rounded-lg">
              {/* Invoice Header */}
              <div className="text-center border-b pb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{selectedInvoice.invoiceNumber}</h2>
                <div className="mt-4 space-y-1 text-sm sm:text-base">
                  <p><strong>Issue date:</strong> {formatDate(selectedInvoice.issueDate)}</p>
                  <p><strong>Due date:</strong> {formatDate(selectedInvoice.dueDate)}</p>
                  <Badge 
                    className={`mt-2 ${
                      selectedInvoice.status === "Paid" ? "bg-green-500" : 
                      selectedInvoice.status === "Expired" ? "bg-orange-500" : "bg-red-500"
                    }`}
                  >
                    {selectedInvoice.status}
                  </Badge>
                </div>
              </div>

              {/* From/To Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-3">Invoice From:</h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold">SmartHR</p>
                    <p className="text-gray-600">367 Hillcrest Lane, Irvine, California, United States</p>
                    <p className="text-blue-600">smarthr@example.com</p>
                    <p className="text-gray-600">+1 (555) 000-0000</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-3">Invoice To:</h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold">{selectedInvoice.company}</p>
                    <p className="text-gray-600">367 Hillcrest Lane, Irvine, California, United States</p>
                    <p className="text-blue-600">{selectedInvoice.email}</p>
                    <p className="text-gray-600">{selectedInvoice.phone}</p>
                  </div>
                </div>
              </div>

              {/* Plan Details - Mobile Responsive */}
              <div className="border rounded-lg overflow-hidden">
                <div className="block sm:hidden">
                  <div className="bg-gray-50 p-4 font-semibold text-sm">Subscription Details</div>
                  <div className="p-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan:</span>
                      <span className="font-medium">{selectedInvoice.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Billing Cycle:</span>
                      <span className="font-medium">{selectedInvoice.billingCycle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created Date:</span>
                      <span className="font-medium">{formatDate(selectedInvoice.createdDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Billing:</span>
                      <span className="font-medium">{formatDate(selectedInvoice.expiringOn)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-lg">{formatCurrency(selectedInvoice.amount)}</span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-sm">Plan</th>
                        <th className="px-4 py-3 text-left font-semibold text-sm">Billing Cycle</th>
                        <th className="px-4 py-3 text-left font-semibold text-sm">Created Date</th>
                        <th className="px-4 py-3 text-left font-semibold text-sm">Next Billing</th>
                        <th className="px-4 py-3 text-right font-semibold text-sm">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-3 text-sm">{selectedInvoice.plan}</td>
                        <td className="px-4 py-3 text-sm">{selectedInvoice.billingCycle}</td>
                        <td className="px-4 py-3 text-sm">{formatDate(selectedInvoice.createdDate)}</td>
                        <td className="px-4 py-3 text-sm">{formatDate(selectedInvoice.expiringOn)}</td>
                        <td className="px-4 py-3 text-right font-medium">{formatCurrency(selectedInvoice.amount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-bold text-base mb-2 text-blue-900">Payment Information:</h3>
                <div className="text-sm text-blue-800">
                  <p><strong>Method:</strong> {selectedInvoice.paymentMethod}</p>
                  {selectedInvoice.cardNumber && (
                    <p><strong>Card Number:</strong> {selectedInvoice.cardNumber}</p>
                  )}
                  <p><strong>Currency:</strong> {selectedInvoice.currency}</p>
                  <p><strong>Transaction ID:</strong> TXN{selectedInvoice.id}_{Date.now()}</p>
                </div>
              </div>

              {/* Amount Breakdown */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border">
                <h3 className="font-bold text-base mb-4">Amount Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(selectedInvoice.amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (0%)</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="text-green-600">{formatCurrency(selectedInvoice.amount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms & Footer */}
              <div className="space-y-4">
                <div className="text-xs sm:text-sm bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold mb-2 text-yellow-900">Terms & Conditions:</h4>
                  <ul className="space-y-1 text-yellow-800">
                    <li>• Payment is due within 30 days of invoice date</li>
                    <li>• Late payments may incur additional fees of 1.5% per month</li>
                    <li>• All payments must be made in {selectedInvoice.currency}</li>
                    <li>• Refunds are subject to our refund policy</li>
                    <li>• Service may be suspended for overdue accounts</li>
                  </ul>
                </div>

                <div className="text-center text-xs text-gray-500 border-t pt-4">
                  <p>This invoice was generated electronically and is valid without signature.</p>
                  <p className="mt-1">For questions about this invoice, contact support@smarthr.com or call +1 (555) 000-0000</p>
                  <p className="mt-2 text-gray-400">Invoice generated on {new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the subscription for{' '}
              <strong>{subscriptionToDelete?.company}</strong>?{' '}
              This action cannot be undone and will remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? "Deleting..." : "Delete Subscription"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}