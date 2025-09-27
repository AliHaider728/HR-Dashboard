"use client"

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
import { Search, Plus, MoreHorizontal, Edit, Trash2, Globe, Calendar, Shield, RefreshCw } from "lucide-react"

const domainsData = [
  {
    id: 1,
    domain: "stellardynamics.com",
    company: "Stellar Dynamics",
    registrar: "GoDaddy",
    registeredDate: "Jan 15, 2024",
    expiryDate: "Jan 15, 2025",
    status: "active",
    autoRenew: true,
    ssl: true,
    price: "$12.99/year",
  },
  {
    id: 2,
    domain: "quantumnexus.io",
    company: "Quantum Nexus",
    registrar: "Namecheap",
    registeredDate: "Feb 20, 2024",
    expiryDate: "Feb 20, 2025",
    status: "active",
    autoRenew: true,
    ssl: true,
    price: "$15.99/year",
  },
  {
    id: 3,
    domain: "acmetech.net",
    company: "Acme Technologies",
    registrar: "Google Domains",
    registeredDate: "Mar 10, 2024",
    expiryDate: "Mar 10, 2025",
    status: "active",
    autoRenew: false,
    ssl: false,
    price: "$10.99/year",
  },
  {
    id: 4,
    domain: "digitalinnovations.org",
    company: "Digital Innovations",
    registrar: "Cloudflare",
    registeredDate: "Apr 5, 2024",
    expiryDate: "Apr 5, 2025",
    status: "expired",
    autoRenew: false,
    ssl: true,
    price: "$8.99/year",
  },
  {
    id: 5,
    domain: "techsolutions.co",
    company: "Tech Solutions Inc",
    registrar: "GoDaddy",
    registeredDate: "May 12, 2024",
    expiryDate: "May 12, 2025",
    status: "pending",
    autoRenew: true,
    ssl: false,
    price: "$25.99/year",
  },
]

const domainStats = [
  { title: "Total Domains", value: "89", change: "+5.2%", icon: Globe, color: "text-blue-600" },
  { title: "Active Domains", value: "76", change: "+8.1%", icon: Globe, color: "text-green-600" },
  { title: "Expiring Soon", value: "8", change: "+12.5%", icon: Calendar, color: "text-orange-600" },
  { title: "SSL Enabled", value: "65", change: "+15.3%", icon: Shield, color: "text-purple-600" },
]

export default function Domain() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedRegistrar, setSelectedRegistrar] = useState("all")

  const filteredDomains = domainsData.filter((domain) => {
    const matchesSearch =
      domain.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      domain.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || domain.status === selectedStatus
    const matchesRegistrar = selectedRegistrar === "all" || domain.registrar === selectedRegistrar

    return matchesSearch && matchesStatus && matchesRegistrar
  })

  const registrars = [...new Set(domainsData.map((d) => d.registrar))]

  return (
    <div className="mt-3 space-y-6 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Domain Management</h1>
          <p className="text-gray-600">Super Admin / Domain</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Register Domain
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Domain</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Domain Name</label>
                <Input placeholder="Enter domain name (e.g., example.com)" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input placeholder="Select company" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Registrar</label>
                <Input placeholder="Select registrar" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Registration Period</label>
                <Input placeholder="1 year, 2 years, etc." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Register Domain</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {domainStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Globe className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="font-medium">Bulk Domain Check</p>
            <p className="text-sm text-gray-600">Check multiple domains</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <RefreshCw className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="font-medium">Auto Renewal</p>
            <p className="text-sm text-gray-600">Manage auto renewals</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="font-medium">SSL Certificates</p>
            <p className="text-sm text-gray-600">Manage SSL certificates</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="font-medium">Expiry Alerts</p>
            <p className="text-sm text-gray-600">Set expiry notifications</p>
          </CardContent>
        </Card>
      </div>

      {/* Domains Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Domains</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search domains..."
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Status: {selectedStatus === "all" ? "All" : selectedStatus}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedStatus("all")}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("expired")}>Expired</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("pending")}>Pending</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Registrar: {selectedRegistrar === "all" ? "All" : selectedRegistrar}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedRegistrar("all")}>All Registrars</DropdownMenuItem>
                  {registrars.map((registrar) => (
                    <DropdownMenuItem key={registrar} onClick={() => setSelectedRegistrar(registrar)}>
                      {registrar}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Registrar</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDomains.map((domain) => (
                <TableRow key={domain.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{domain.domain}</span>
                    </div>
                  </TableCell>
                  <TableCell>{domain.company}</TableCell>
                  <TableCell>{domain.registrar}</TableCell>
                  <TableCell>{domain.registeredDate}</TableCell>
                  <TableCell>
                    <div>
                      <p>{domain.expiryDate}</p>
                      {domain.status === "active" && (
                        <p className="text-xs text-gray-600">
                          {Math.ceil((new Date(domain.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} days left
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={domain.status === "active" ? "default" : "secondary"}
                      className={
                        domain.status === "active"
                          ? "bg-green-500"
                          : domain.status === "expired"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }
                    >
                      {domain.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {domain.autoRenew && (
                        <Badge variant="outline" className="text-xs">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Auto
                        </Badge>
                      )}
                      {domain.ssl && (
                        <Badge variant="outline" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          SSL
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{domain.price}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Renew Domain
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="h-4 w-4 mr-2" />
                          Manage SSL
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
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
        </CardContent>
      </Card>
    </div>
  )
}
