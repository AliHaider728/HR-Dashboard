
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Building,
  Users,
  DollarSign,
  TrendingUp,
  Globe,
  MapPin,
} from "lucide-react"

// Sample companies data
const companiesData = [
  {
    id: 1,
    name: "TechCorp Solutions",
    industry: "Technology",
    size: "Enterprise",
    revenue: "$50M",
    employees: 500,
    location: "New York, NY",
    website: "www.techcorp.com",
    status: "Active",
    type: "Customer",
    contacts: 8,
    deals: 3,
    totalValue: "$150,000",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Leading technology solutions provider",
    founded: "2010",
    lastActivity: "2023-12-01",
  },
  {
    id: 2,
    name: "Innovate Inc",
    industry: "Software",
    size: "Mid-Market",
    revenue: "$25M",
    employees: 250,
    location: "San Francisco, CA",
    website: "www.innovate.com",
    status: "Active",
    type: "Prospect",
    contacts: 5,
    deals: 2,
    totalValue: "$75,000",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Innovative software development company",
    founded: "2015",
    lastActivity: "2023-11-28",
  },
  {
    id: 3,
    name: "Startup.io",
    industry: "SaaS",
    size: "Small",
    revenue: "$5M",
    employees: 50,
    location: "Austin, TX",
    website: "www.startup.io",
    status: "Prospect",
    type: "Lead",
    contacts: 2,
    deals: 1,
    totalValue: "$25,000",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Fast-growing SaaS startup",
    founded: "2020",
    lastActivity: "2023-11-25",
  },
  {
    id: 4,
    name: "Enterprise Corp",
    industry: "Manufacturing",
    size: "Enterprise",
    revenue: "$100M",
    employees: 1000,
    location: "Chicago, IL",
    website: "www.enterprise.com",
    status: "Active",
    type: "Customer",
    contacts: 12,
    deals: 5,
    totalValue: "$300,000",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Global manufacturing corporation",
    founded: "1995",
    lastActivity: "2023-12-02",
  },
  {
    id: 5,
    name: "Growth Solutions",
    industry: "Consulting",
    size: "Mid-Market",
    revenue: "$15M",
    employees: 150,
    location: "Seattle, WA",
    website: "www.growth.com",
    status: "Inactive",
    type: "Former Customer",
    contacts: 3,
    deals: 0,
    totalValue: "$0",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Business growth consulting firm",
    founded: "2012",
    lastActivity: "2023-10-15",
  },
]

const industries = ["All", "Technology", "Software", "SaaS", "Manufacturing", "Consulting", "Healthcare", "Finance"]
const sizes = ["All", "Small", "Mid-Market", "Enterprise"]
const statuses = ["All", "Active", "Prospect", "Inactive"]
const types = ["All", "Customer", "Prospect", "Lead", "Former Customer"]

export default function Companies() {
  const [companies, setCompanies] = useState(companiesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedSize, setSelectedSize] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCompany, setNewCompany] = useState({
    name: "",
    industry: "",
    size: "",
    revenue: "",
    employees: "",
    location: "",
    website: "",
    description: "",
    founded: "",
  })

  // Filter companies
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = selectedIndustry === "All" || company.industry === selectedIndustry
    const matchesSize = selectedSize === "All" || company.size === selectedSize
    const matchesStatus = selectedStatus === "All" || company.status === selectedStatus
    const matchesType = selectedType === "All" || company.type === selectedType

    return matchesSearch && matchesIndustry && matchesSize && matchesStatus && matchesType
  })

  const handleAddCompany = () => {
    const company = {
      id: companies.length + 1,
      ...newCompany,
      employees: Number.parseInt(newCompany.employees) || 0,
      status: "Prospect",
      type: "Lead",
      contacts: 0,
      deals: 0,
      totalValue: "$0",
      logo: "/placeholder.svg?height=40&width=40",
      lastActivity: new Date().toISOString().split("T")[0],
    }
    setCompanies([...companies, company])
    setNewCompany({
      name: "",
      industry: "",
      size: "",
      revenue: "",
      employees: "",
      location: "",
      website: "",
      description: "",
      founded: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteCompany = (id) => {
    setCompanies(companies.filter((company) => company.id !== id))
  }

  const getStatusBadge = (status) => {
    const variants = {
      Active: "default",
      Prospect: "secondary",
      Inactive: "destructive",
    }
    return <Badge variant={variants[status] || "default"}>{status}</Badge>
  }

  const getTypeBadge = (type) => {
    const variants = {
      Customer: "default",
      Prospect: "secondary",
      Lead: "outline",
      "Former Customer": "destructive",
    }
    return <Badge variant={variants[type] || "outline"}>{type}</Badge>
  }

  const totalCompanies = companies.length
  const activeCompanies = companies.filter((c) => c.status === "Active").length
  const totalRevenue = companies.reduce((sum, c) => {
    const revenue = Number.parseInt(c.revenue.replace(/[$M]/g, "")) || 0
    return sum + revenue
  }, 0)
  const totalEmployees = companies.reduce((sum, c) => sum + c.employees, 0)

  return (
    <div className="mt-3 space-y-6 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground">Manage your business relationships and prospects</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription>Enter the company details to add them to your CRM.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="industry" className="text-right">
                  Industry
                </Label>
                <Select onValueChange={(value) => setNewCompany({ ...newCompany, industry: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries
                      .filter((i) => i !== "All")
                      .map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="size" className="text-right">
                  Size
                </Label>
                <Select onValueChange={(value) => setNewCompany({ ...newCompany, size: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes
                      .filter((s) => s !== "All")
                      .map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="revenue" className="text-right">
                  Revenue
                </Label>
                <Input
                  id="revenue"
                  value={newCompany.revenue}
                  onChange={(e) => setNewCompany({ ...newCompany, revenue: e.target.value })}
                  className="col-span-3"
                  placeholder="$50M"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="employees" className="text-right">
                  Employees
                </Label>
                <Input
                  id="employees"
                  type="number"
                  value={newCompany.employees}
                  onChange={(e) => setNewCompany({ ...newCompany, employees: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  value={newCompany.location}
                  onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="website" className="text-right">
                  Website
                </Label>
                <Input
                  id="website"
                  value={newCompany.website}
                  onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
                  className="col-span-3"
                  placeholder="www.company.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="founded" className="text-right">
                  Founded
                </Label>
                <Input
                  id="founded"
                  value={newCompany.founded}
                  onChange={(e) => setNewCompany({ ...newCompany, founded: e.target.value })}
                  className="col-span-3"
                  placeholder="2020"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newCompany.description}
                  onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddCompany}>
                Add Company
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompanies}</div>
            <p className="text-xs text-muted-foreground">In your database</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCompanies}</div>
            <p className="text-xs text-muted-foreground">Currently engaged</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}M</div>
            <p className="text-xs text-muted-foreground">Combined revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all companies</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contacts</TableHead>
                <TableHead>Deal Value</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={company.logo || "/placeholder.svg"} />
                        <AvatarFallback>
                          {company.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{company.name}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Globe className="h-3 w-3" />
                          {company.website}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {company.location}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{company.industry}</Badge>
                  </TableCell>
                  <TableCell>{company.size}</TableCell>
                  <TableCell>{getStatusBadge(company.status)}</TableCell>
                  <TableCell>{getTypeBadge(company.type)}</TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">{company.contacts}</div>
                      <div className="text-xs text-muted-foreground">contacts</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{company.totalValue}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCompany(company.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
