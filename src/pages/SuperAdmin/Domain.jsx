"use client"
import { useState, useMemo } from "react"
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
import { Search, Eye, Trash2, MoreHorizontal, Calendar, Filter, ChevronDown } from "lucide-react"

const domainsData = [
  {
    id: 1,
    name: "BrightWave Innovations",
    domain: "bwi.example.com",
    plan: "Advanced (Monthly)",
    createdDate: "12 Sep 2024",
    status: "Approved",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-01.svg",
  },
  {
    id: 2,
    name: "Stellar Dynamics",
    domain: "sd.example.com",
    plan: "Basic (Yearly)",
    createdDate: "24 Oct 2024",
    status: "Pending",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-02.svg",
  },
  {
    id: 3,
    name: "Quantum Nexus",
    domain: "qn.example.com",
    plan: "Advanced (Monthly)",
    createdDate: "18 Feb 2024",
    status: "Rejected",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-03.svg",
  },
  {
    id: 4,
    name: "EcoVision Enterprises",
    domain: "eve.example.com",
    plan: "Advanced (Monthly)",
    createdDate: "17 Oct 2024",
    status: "Approved",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-04.svg",
  },
  {
    id: 5,
    name: "Aurora Technologies",
    domain: "at.example.com",
    plan: "Enterprise (Monthly)",
    createdDate: "20 Jul 2024",
    status: "Approved",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-05.svg",
  },
  {
    id: 6,
    name: "BlueSky Ventures",
    domain: "bsv.example.com",
    plan: "Advanced (Monthly)",
    createdDate: "10 Apr 2024",
    status: "Pending",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-06.svg",
  },
  {
    id: 7,
    name: "TerraFusion Energy",
    domain: "tfe.example.com",
    plan: "Enterprise (Yearly)",
    createdDate: "29 Aug 2024",
    status: "Approved",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-07.svg",
  },
  {
    id: 8,
    name: "UrbanPulse Design",
    domain: "upd.example.com",
    plan: "Basic (Monthly)",
    createdDate: "22 Feb 2024",
    status: "Rejected",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-08.svg",
  },
  {
    id: 9,
    name: "Nimbus Networks",
    domain: "nn.example.com",
    plan: "Basic (Yearly)",
    createdDate: "03 Nov 2024",
    status: "Approved",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-09.svg",
  },
  {
    id: 10,
    name: "Epicurean Delights",
    domain: "ed.example.com",
    plan: "Advanced (Monthly)",
    createdDate: "17 Dec 2024",
    status: "Approved",
    logo: "https://smarthr.co.in/demo/html/template/assets/img/company/company-10.svg",
  },
]

export default function DomainList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState(null)

  const statusOptions = ["All", "Approved", "Pending", "Rejected"]

  // Filter and search functionality
  const filteredData = useMemo(() => {
    return domainsData.filter((domain) => {
      const matchesSearch = domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           domain.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           domain.plan.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === "All" || domain.status === selectedStatus
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, selectedStatus])

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredData.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredData, currentPage, rowsPerPage])

  // Handle view
  const handleView = (domain) => {
    setSelectedDomain(domain)
    setShowViewDialog(true)
  }

  // Handle delete
  const handleDelete = (domain) => {
    setSelectedDomain(domain)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    // Implement delete logic here
    console.log("Deleting domain:", selectedDomain)
    setShowDeleteDialog(false)
    setSelectedDomain(null)
  }

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value))
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Domain List</h1>
          <p className="text-sm sm:text-base text-gray-600">09/24/2025 - 09/30/2025</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            Filter by Date
          </Button>
          <select 
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm sm:text-base"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    Status: {selectedStatus}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {statusOptions.map((status) => (
                    <DropdownMenuItem key={status} onClick={() => setSelectedStatus(status)}>
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Domains Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
            <span>Domain List</span>
            <Badge variant="outline" className="text-xs sm:text-sm">
              {filteredData.length} entries
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="w-12">Companys</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Domain URL</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((domain) => (
                    <TableRow key={domain.id} className="border-b hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img 
                            src={domain.logo} 
                            alt={`${domain.name} logo`}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0Y5RkFGQSI+PC9yZWN0Pgo8L3N2Zz4K'
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {domain.name}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                          {domain.domain}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs sm:text-sm">
                          {domain.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {domain.createdDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={domain.status === "Approved" ? "default" : "secondary"}
                          className={`text-xs sm:text-sm ${
                            domain.status === "Approved" 
                              ? "bg-green-100 text-green-800 border-green-200" 
                              : domain.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : "bg-red-100 text-red-800 border-red-200"
                          }`}
                        >
                          {domain.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
                              <DialogTrigger asChild>
                                <DropdownMenuItem onClick={() => handleView(domain)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                              </DialogTrigger>
                              {selectedDomain === domain && (
                                <DialogContent className="max-w-md">
                                  <DialogHeader>
                                    <DialogTitle className="text-lg">Domain Details</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Company Name</label>
                                      <p className="text-base font-semibold">{domain.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Domain URL</label>
                                      <p className="text-base font-semibold text-blue-600 break-all">{domain.domain}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Plan</label>
                                      <p className="text-base">{domain.plan}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Created Date</label>
                                      <p className="text-base">{domain.createdDate}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Status</label>
                                      <Badge 
                                        className={`text-sm ${
                                          domain.status === "Approved" 
                                            ? "bg-green-100 text-green-800" 
                                            : domain.status === "Pending"
                                              ? "bg-yellow-100 text-yellow-800"
                                              : "bg-red-100 text-red-800"
                                        }`}
                                      >
                                        {domain.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="flex justify-end gap-2 pt-4">
                                    <Button 
                                      variant="outline" 
                                      onClick={() => setShowViewDialog(false)}
                                      size="sm"
                                    >
                                      Close
                                    </Button>
                                  </div>
                                </DialogContent>
                              )}
                            </Dialog>
                            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                              <DialogTrigger asChild>
                                <DropdownMenuItem 
                                  className="text-red-600" 
                                  onClick={() => handleDelete(domain)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DialogTrigger>
                              {selectedDomain === domain && (
                                <DialogContent className="max-w-md">
                                  <DialogHeader>
                                    <DialogTitle className="text-lg">Confirm Delete</DialogTitle>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <p className="text-sm text-gray-600">
                                      Are you sure you want to delete the domain for <strong>{domain.name}</strong>?
                                      This action cannot be undone.
                                    </p>
                                  </div>
                                  <div className="flex justify-end gap-2 pt-4">
                                    <Button 
                                      variant="outline" 
                                      onClick={() => setShowDeleteDialog(false)}
                                      size="sm"
                                    >
                                      Cancel
                                    </Button>
                                    <Button 
                                      variant="destructive" 
                                      onClick={confirmDelete}
                                      size="sm"
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete Domain
                                    </Button>
                                  </div>
                                </DialogContent>
                              )}
                            </Dialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                      No domains found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 pt-6">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} entries
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}