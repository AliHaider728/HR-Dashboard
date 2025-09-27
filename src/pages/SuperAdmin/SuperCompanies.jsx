import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./../../components/ui/card"
import { Badge } from "./../../components/ui/badge"
import { Button } from "./../../components/ui/button"
import { Input } from "./../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./../../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./../../components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./../../components/ui/avatar"
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Building2, Upload, MapPin, X } from "lucide-react"

const companiesData = [
  {
    id: 1,
    name: "BrightWave Innovations",
    email: "michael@brightwave.com",
    accountUrl: "bwi.example.com",
    plan: "Advanced",
    planType: "Monthly",
    createdDate: "12 Sep 2024",
    status: "Active",
    phone: "(163) 2459 315",
    website: "www.brightwave.com",
    currency: "United States Dollar (USD)",
    language: "English",
    address: "3705 Lynn Avenue, Phelps, WI 54554",
    price: "$200",
    expiryDate: "11 Oct 2024",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-01.svg",
  },
  {
    id: 2,
    name: "Stellar Dynamics",
    email: "sophie@stellardynamics.com",
    accountUrl: "sd.example.com",
    plan: "Basic",
    planType: "Yearly",
    createdDate: "24 Oct 2024",
    status: "Active",
    phone: "+1 895455450",
    website: "www.stellardynamics.com",
    currency: "United States Dollar (USD)",
    language: "English",
    address: "1234 Star Lane, New York, NY 10001",
    price: "$100",
    expiryDate: "23 Oct 2025",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-02.svg",
  },
  {
    id: 3,
    name: "Quantum Nexus",
    email: "contact@quantumnexus.com",
    accountUrl: "qn.example.com",
    plan: "Advanced",
    planType: "Monthly",
    createdDate: "18 Feb 2024",
    status: "Active",
    phone: "+1 234567890",
    website: "www.quantumnexus.com",
    currency: "United States Dollar (USD)",
    language: "English",
    address: "5678 Quantum Rd, San Francisco, CA 94105",
    price: "$200",
    expiryDate: "17 Mar 2024",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-03.svg",
  },
  {
    id: 4,
    name: "Everest Enterprises",
    email: "info@everest.com",
    accountUrl: "eve.example.com",
    plan: "Advanced",
    planType: "Monthly",
    createdDate: "17 Oct 2024",
    status: "Active",
    phone: "+1 345678901",
    website: "www.everest.com",
    currency: "United States Dollar (USD)",
    language: "English",
    address: "7890 Peak St, Denver, CO 80202",
    price: "$200",
    expiryDate: "16 Nov 2024",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-04.svg",
  },
  {
    id: 5,
    name: "Acme Technologies",
    email: "support@acmetech.com",
    accountUrl: "at.example.com",
    plan: "Enterprise",
    planType: "Monthly",
    createdDate: "20 Jul 2024",
    status: "Active",
    phone: "+1 456789012",
    website: "www.acmetech.com",
    currency: "United States Dollar (USD)",
    language: "English",
    address: "1011 Tech Park, Austin, TX 78701",
    price: "$500",
    expiryDate: "19 Aug 2024",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-05.svg",
  },
  {
    id: 6,
    name: "Blue Sky Ventures",
    email: "admin@bluesky.com",
    accountUrl: "bsv.example.com",
    plan: "Advanced",
    planType: "Monthly",
    createdDate: "10 Apr 2024",
    status: "Active",
    phone: "+1 567890123",
    website: "www.bluesky.com",
    currency: "United States Dollar (USD)",
    language: "English",
    address: "1213 Skyway Dr, Seattle, WA 98101",
    price: "$200",
    expiryDate: "09 May 2024",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-06.svg",
  },
  {
    id: 7,
    name: "TechFlow Enterprises",
    email: "support@techflow.com",
    accountUrl: "tfe.example.com",
    plan: "Enterprise",
    planType: "Yearly",
    createdDate: "29 Aug 2024",
    status: "Active",
    phone: "+1 678901234",
    website: "www.techflow.com",
    currency: "United States Dollar (USD)",
    language: "English",
    address: "1415 Flow St, Chicago, IL 60601",
    price: "$1200",
    expiryDate: "28 Aug 2025",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-07.svg",
  },
  {
    id: 8,
    name: "Upward Dynamics",
    email: "info@upward.com",
    accountUrl: "upd.example.com",
    plan: "Basic",
    planType: "Monthly",
    createdDate: "22 Feb 2024",
    status: "Inactive",
    phone: "+1 789012345",
    website: "www.upward.com",
    currency: "United States Dollar (USD)",
    language: "English",
    address: "1617 Rise Rd, Boston, MA 02108",
    price: "$100",
    expiryDate: "21 Mar 2024",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-08.svg",
  },
  {
    id: 9,
    name: "Nexlify Networks",
    email: "contact@nexlify.com",
    accountUrl: "nn.example.com",
    plan: "Basic",
    planType: "Yearly",
    createdDate: "03 Nov 2024",
    status: "Active",
    phone: "+1 890123456",
    website: "www.nexlify.com",
    currency: "United States Dollar (USD)",
    language: "English",
    address: "1819 Network Dr, Miami, FL 33131",
    price: "$100",
    expiryDate: "02 Nov 2025",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-09.svg",
  },
  {
    id: 10,
    name: "Edge Dynamics",
    email: "admin@edgedynamics.com",
    accountUrl: "ed.example.com",
    plan: "Advanced",
    planType: "Monthly",
    createdDate: "17 Dec 2024",
    status: "Active",
    phone: "+1 901234567",
    website: "www.edgedynamics.com",
    currency: "United States Dollar (USD)",
    language: "English",
    address: "2021 Edge St, Los Angeles, CA 90001",
    price: "$200",
    expiryDate: "16 Jan 2025",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-10.svg",
  },
]

const companyStats = [
  { title: "Total Companies", value: "950", change: "+12.5%", icon: Building2, color: "text-blue-600", bgColor: "bg-blue-50" },
  { title: "Active Companies", value: "920", change: "+8.2%", icon: Building2, color: "text-green-600", bgColor: "bg-green-50" },
  { title: "Inactive Companies", value: "30", change: "+15.3%", icon: Building2, color: "text-red-600", bgColor: "bg-red-50" },
  { title: "Company Locations", value: "180", change: "+23.1%", icon: MapPin, color: "text-orange-600", bgColor: "bg-orange-50" },
]

export default function SupersCompanies() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [companies, setCompanies] = useState(companiesData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [newCompany, setNewCompany] = useState({
    name: "", email: "", accountUrl: "", phone: "", website: "", password: "", confirmPassword: "",
    address: "", plan: "", planType: "", currency: "", language: "", status: "Active", logo: "",
  })

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.accountUrl.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlan = selectedPlan === "all" || company.plan === selectedPlan
    const matchesStatus = selectedStatus === "all" || company.status.toLowerCase() === selectedStatus.toLowerCase()

    return matchesSearch && matchesPlan && matchesStatus
  })

  const handleDelete = (id) => {
    setCompanies(companies.filter((company) => company.id !== id))
    setIsDeleteDialogOpen(false)
  }

  const handleAddCompany = () => {
    if (newCompany.password !== newCompany.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    const newId = Math.max(...companies.map(c => c.id)) + 1
    setCompanies([...companies, { ...newCompany, id: newId, createdDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) }])
    setIsAddDialogOpen(false)
    setNewCompany({
      name: "", email: "", accountUrl: "", phone: "", website: "", password: "", confirmPassword: "",
      address: "", plan: "", planType: "", currency: "", language: "", status: "Active", logo: "",
    })
  }

  const handleEditCompany = () => {
    setCompanies(companies.map(c => c.id === selectedCompany.id ? { ...selectedCompany } : c))
    setIsEditDialogOpen(false)
  }

  const openViewDialog = (company) => {
    setSelectedCompany(company)
    setIsViewDialogOpen(true)
  }

  const openEditDialog = (company) => {
    setSelectedCompany(company)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (company) => {
    setSelectedCompany(company)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-ful   bg-gray-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
              <p className="mt-1 text-sm text-gray-500">Super Admin / Companies</p>
            </div>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 hover:border-none text-white px-6 py-2 rounded-lg shadow-sm transform hover:scale-105 transition-all duration-200"
              aria-label="Add new company"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {companyStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-0 shadow-sm hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                      <div className="flex items-center">
                        <span className={`text-sm font-semibold ${stat.color}`}>{stat.change}</span>
                        <span className="text-xs text-gray-500 ml-1">from last month</span>
                      </div>
                    </div>
                    <div className={`${stat.bgColor} ${stat.color} p-3 rounded-full`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Companies Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl font-semibold text-gray-900">All Companies</CardTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search companies..."
                    className="pl-10 w-full sm:w-64 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search companies"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-orange-500  hover:text-white hover:border-transparent rounded-lg transition-all duration-200">
                      Plan: {selectedPlan === "all" ? "All" : selectedPlan}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border-gray-200 shadow-lg rounded-lg">
                    <DropdownMenuItem onClick={() => setSelectedPlan("all")} className="hover:bg-gray-100 transition-colors duration-150">All Plans</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedPlan("Basic")} className="hover:bg-gray-100 transition-colors duration-150">Basic</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedPlan("Advanced")} className="hover:bg-gray-100 transition-colors duration-150">Advanced</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedPlan("Enterprise")} className="hover:bg-gray-100 transition-colors duration-150">Enterprise</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-orange-500  hover:text-white hover:border-transparent rounded-lg transition-all duration-200">
                      Status: {selectedStatus === "all" ? "All" : selectedStatus}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border-gray-200 shadow-lg rounded-lg ">
                    <DropdownMenuItem onClick={() => setSelectedStatus("all")} className="hover:bg-gray-100 transition-colors duration-150">All Status</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedStatus("active")} className="hover:bg-gray-100 transition-colors duration-150">Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedStatus("inactive")} className="hover:bg-gray-100 transition-colors duration-150">Inactive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 hover:bg-gray-50">
                    <TableHead className="w-[280px] text-gray-700 font-semibold py-4 px-6">Company Name</TableHead>
                    <TableHead className="w-[200px] text-gray-700 font-semibold">Email</TableHead>
                    <TableHead className="w-[180px] text-gray-700 font-semibold">Account URL</TableHead>
                    <TableHead className="w-[160px] text-gray-700 font-semibold">Plan</TableHead>
                    <TableHead className="w-[140px] text-gray-700 font-semibold">Created Date</TableHead>
                    <TableHead className="w-[100px] text-gray-700 font-semibold">Status</TableHead>
                    <TableHead className="w-[80px] text-gray-700 font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id} className="border-gray-200 hover:bg-gray-100 transition-colors duration-150">
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-gray-100">
                            <AvatarImage src={company.logo} alt={company.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                              {company.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900">{company.name}</p>
                            <p className="text-sm text-gray-500">{company.phone}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600">{company.email}</p>
                      </TableCell>
                      <TableCell>
                        <a href={`https://${company.accountUrl}`} className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-150">{company.accountUrl}</a>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge
                            variant="outline"
                            className={
                              company.plan === "Enterprise"
                                ? "border-purple-300 text-purple-800 bg-purple-50"
                                : company.plan === "Advanced"
                                ? "border-blue-300 text-blue-800 bg-blue-50"
                                : "border-green-300 text-green-800 bg-green-50"
                            }
                          >
                            {company.plan} ({company.planType})
                          </Badge>
                          <Button variant="link" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs transition-colors duration-150">
                            Upgrade Plan
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">{company.createdDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            company.status === "Active" 
                              ? "bg-green-100 text-green-800 border-green-300" 
                              : "bg-red-100 text-red-800 border-red-300"
                          }
                        >
                          {company.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0  transition-colors duration-150" aria-label="More actions">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white border-gray-200 shadow-lg rounded-lg">
                            <DropdownMenuItem 
                              onClick={() => openViewDialog(company)}
                              className="text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => openEditDialog(company)}
                              className="text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => openDeleteDialog(company)}
                              className="text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-150"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add Company Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-3xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-semibold text-gray-900">Add New Company</DialogTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full transition-colors duration-200"
                  aria-label="Close dialog"
                >
                </Button>
              </div>
            </DialogHeader>
            <div className="space-y-6 py-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Company Logo</h3>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-gray-200">
                    <AvatarImage src={newCompany.logo || "https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-30.jpg"} alt="Company logo" />
                    <AvatarFallback className="bg-gray-100 text-gray-400">
                      <Upload className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant="outline" 
                      className="border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
                      onClick={() => setNewCompany({ ...newCompany, logo: prompt("Enter logo URL") || newCompany.logo })}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                    <p className="text-xs text-gray-500">PNG, JPG up to 4MB</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Company Name *</label>
                  <Input 
                    className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter company name" 
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                  <Input 
                    className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    type="email" 
                    placeholder="Enter email address" 
                    value={newCompany.email}
                    onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Account URL</label>
                  <Input 
                    className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter account URL" 
                    value={newCompany.accountUrl}
                    onChange={(e) => setNewCompany({ ...newCompany, accountUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone Number *</label>
                  <Input 
                    className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter phone number" 
                    value={newCompany.phone}
                    onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Website</label>
                  <Input 
                    className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter website URL" 
                    value={newCompany.website}
                    onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Password *</label>
                  <Input 
                    className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    type="password" 
                    placeholder="Enter password" 
                    value={newCompany.password}
                    onChange={(e) => setNewCompany({ ...newCompany, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Confirm Password *</label>
                  <Input 
                    className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    type="password" 
                    placeholder="Confirm password" 
                    value={newCompany.confirmPassword}
                    onChange={(e) => setNewCompany({ ...newCompany, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Address</label>
                  <Input 
                    className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter full address" 
                    value={newCompany.address}
                    onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Plan Name *</label>
                  <Input 
                    className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="Select plan" 
                    value={newCompany.plan}
                    onChange={(e) => setNewCompany({ ...newCompany, plan: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Plan Type *</label>
                  <Input 
                    className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="Select plan type" 
                    value={newCompany.planType}
                    onChange={(e) => setNewCompany({ ...newCompany, planType: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Currency *</label>
                  <Input 
                    className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="Select currency" 
                    value={newCompany.currency}
                    onChange={(e) => setNewCompany({ ...newCompany, currency: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Language *</label>
                  <Input  
                    className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="Select language" 
                    value={newCompany.language}
                    onChange={(e) => setNewCompany({ ...newCompany, language: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="border-gray-300 text-gray-700 hover:bg-red-600 hover:text-white hover:border-none px-6 transform hover:scale-105 transition-all duration-200"
                  aria-label="Cancel adding company"
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-orange-600 hover:bg-orange-700 hover:border-none text-white px-6 transform hover:scale-105 transition-all duration-200"
                  onClick={handleAddCompany}
                  aria-label="Add company"
                >
                  Add Company
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Company Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-semibold text-gray-900">Company Details</DialogTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsViewDialogOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full transition-colors duration-150"
                  aria-label="Close dialog"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            {selectedCompany && (
              <div className="space-y-6 py-6">
                <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-lg">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarImage src={selectedCompany.logo} alt={selectedCompany.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-bold">
                      {selectedCompany.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedCompany.name}</h2>
                    <p className="text-lg text-gray-600 mb-2">{selectedCompany.email}</p>
                    <Badge
                      className={
                        selectedCompany.status === "Active" 
                          ? "bg-green-100 text-green-800 border-green-300" 
                          : "bg-red-100 text-red-800 border-red-300"
                      }
                    >
                      {selectedCompany.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Basic Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Account URL</label>
                          <p className="text-sm text-blue-600 font-medium">{selectedCompany.accountUrl}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Phone Number</label>
                          <p className="text-sm text-gray-900 font-medium">{selectedCompany.phone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Website</label>
                          <p className="text-sm text-blue-600 font-medium">{selectedCompany.website}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Currency</label>
                          <p className="text-sm text-gray-900">{selectedCompany.currency}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Language</label>
                          <p className="text-sm text-gray-900">{selectedCompany.language}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Address</label>
                          <p className="text-sm text-gray-900">{selectedCompany.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Plan Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Plan Name</label>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                selectedCompany.plan === "Enterprise"
                                  ? "bg-purple-100 text-purple-800 border-purple-300"
                                  : selectedCompany.plan === "Advanced"
                                  ? "bg-blue-100 text-blue-800 border-blue-300"
                                  : "bg-green-100 text-green-800 border-green-300"
                              }
                            >
                              {selectedCompany.plan}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Plan Type</label>
                          <p className="text-sm text-gray-900 font-medium">{selectedCompany.planType}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Price</label>
                          <p className="text-lg text-gray-900 font-bold">{selectedCompany.price}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Register Date</label>
                          <p className="text-sm text-gray-900">{selectedCompany.createdDate}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Expiring On</label>
                          <p className="text-sm text-gray-900 font-medium">{selectedCompany.expiryDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Company Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-semibold text-gray-900">Edit Company</DialogTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsEditDialogOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full transition-colors duration-150"
                  aria-label="Close dialog"
                >
                </Button>
              </div>
            </DialogHeader>
            {selectedCompany && (
              <div className="space-y-6 py-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Company Logo</h3>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-2 border-gray-200">
                      <AvatarImage src={selectedCompany.logo} alt={selectedCompany.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                        {selectedCompany.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
                        onClick={() => setSelectedCompany({ ...selectedCompany, logo: prompt("Enter new logo URL") || selectedCompany.logo })}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Change Logo
                      </Button>
                      <p className="text-xs text-gray-500">PNG, JPG up to 4MB</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Company Name *</label>
                    <Input  
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      value={selectedCompany.name} 
                      onChange={(e) => setSelectedCompany({ ...selectedCompany, name: e.target.value })}
                      placeholder="Enter company name" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                    <Input  
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      value={selectedCompany.email} 
                      onChange={(e) => setSelectedCompany({ ...selectedCompany, email: e.target.value })}
                      type="email" 
                      placeholder="Enter email address" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Account URL</label>
                    <Input  
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      value={selectedCompany.accountUrl} 
                      onChange={(e) => setSelectedCompany({ ...selectedCompany, accountUrl: e.target.value })}
                      placeholder="Enter account URL" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Phone Number *</label>
                    <Input  
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      value={selectedCompany.phone} 
                      onChange={(e) => setSelectedCompany({ ...selectedCompany, phone: e.target.value })}
                      placeholder="Enter phone number" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Website</label>
                    <Input  
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      value={selectedCompany.website} 
                      onChange={(e) => setSelectedCompany({ ...selectedCompany, website: e.target.value })}
                      placeholder="Enter website URL" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Password *</label>
                    <Input  
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      type="password" 
                      placeholder="Enter new password" 
                      onChange={(e) => setSelectedCompany({ ...selectedCompany, password: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Confirm Password *</label>
                    <Input  
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      type="password" 
                      placeholder="Confirm new password" 
                      onChange={(e) => setSelectedCompany({ ...selectedCompany, confirmPassword: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Address</label>
                    <Input  
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      value={selectedCompany.address} 
                      onChange={(e) => setSelectedCompany({ ...selectedCompany, address: e.target.value })}
                      placeholder="Enter full address" 
                      
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Plan Name *</label>
                    <Input  
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      value={selectedCompany.plan} 
                      onChange={(e) => setSelectedCompany({ ...selectedCompany, plan: e.target.value })}
                      placeholder="Select plan" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Plan Type *</label>
                    <Input 
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      value={selectedCompany.planType} 
                      onChange={(e) => setSelectedCompany({ ...selectedCompany, planType: e.target.value })}
                      placeholder="Select plan type" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Currency *</label>
                    <Input 
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      value={selectedCompany.currency} 
                      onChange={(e) => setSelectedCompany({ ...selectedCompany, currency: e.target.value })}
                      placeholder="Select currency" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Language *</label>
                    <Input 
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      value={selectedCompany.language} 
                      onChange={(e) => setSelectedCompany({ ...selectedCompany, language: e.target.value })}
                      placeholder="Select language" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Status</label>
                    <Input 
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      value={selectedCompany.status} 
                      onChange={(e) => setSelectedCompany({ ...selectedCompany, status: e.target.value })}
                      placeholder="Select status" 
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditDialogOpen(false)}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 px-6 transform hover:scale-105 transition-all duration-200"
                    aria-label="Cancel editing company"
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 transform hover:scale-105 transition-all duration-200"
                    onClick={handleEditCompany}
                    aria-label="Save company changes"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md bg-white rounded-xl shadow-xl">
            <DialogHeader className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <DialogTitle className="text-xl font-semibold text-gray-900">Delete Company</DialogTitle>
            </DialogHeader>
            {selectedCompany && (
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Are you sure you want to delete <span className="font-semibold">{selectedCompany.name}</span>? 
                  This action cannot be undone and will permanently remove all company data.
                </p>
                <div className="flex justify-center gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDeleteDialogOpen(false)}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 px-6 transform hover:scale-105 transition-all duration-200"
                    aria-label="Cancel deleting company"
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white px-6 transform hover:scale-105 transition-all duration-200"
                    onClick={() => handleDelete(selectedCompany.id)}
                    aria-label="Delete company"
                  >
                    Delete Company
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}