 

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Search, Plus, MoreHorizontal, Filter, Download, Eye, Edit, Trash2, Users, DollarSign } from "lucide-react"

const Referrals = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const referrals = [
    {
      id: 1,
      referrer: "John Doe",
      referrerEmployee: "EMP001",
      candidate: "Alice Johnson",
      position: "Software Developer",
      department: "IT",
      referralDate: "2024-01-15",
      status: "Hired",
      bonus: "$2,000",
      bonusStatus: "Paid",
    },
    {
      id: 2,
      referrer: "Jane Smith",
      referrerEmployee: "EMP002",
      candidate: "Bob Wilson",
      position: "Marketing Manager",
      department: "Marketing",
      referralDate: "2024-01-20",
      status: "Interview",
      bonus: "$1,500",
      bonusStatus: "Pending",
    },
    {
      id: 3,
      referrer: "Robert Brown",
      referrerEmployee: "EMP003",
      candidate: "Carol Davis",
      position: "HR Specialist",
      department: "Human Resources",
      referralDate: "2024-01-10",
      status: "Rejected",
      bonus: "$1,000",
      bonusStatus: "Not Applicable",
    },
    {
      id: 4,
      referrer: "Emily Wilson",
      referrerEmployee: "EMP004",
      candidate: "David Miller",
      position: "Financial Analyst",
      department: "Finance",
      referralDate: "2024-01-25",
      status: "Under Review",
      bonus: "$1,200",
      bonusStatus: "Pending",
    },
  ]

  const stats = [
    { title: "Total Referrals", value: "156", change: "+22%", color: "text-blue-600" },
    { title: "Successful Hires", value: "45", change: "+18%", color: "text-green-600" },
    { title: "Pending Reviews", value: "23", change: "+5%", color: "text-orange-600" },
    { title: "Bonus Paid", value: "$89,500", change: "+25%", color: "text-purple-600" },
  ]

  const getStatusBadge = (status) => {
    const variants = {
      Hired: "bg-green-100 text-green-800",
      Interview: "bg-blue-100 text-blue-800",
      "Under Review": "bg-yellow-100 text-yellow-800",
      Rejected: "bg-red-100 text-red-800",
    }
    return variants[status] || "bg-gray-100 text-gray-800"
  }

  const getBonusStatusBadge = (status) => {
    const variants = {
      Paid: "bg-green-100 text-green-800",
      Pending: "bg-orange-100 text-orange-800",
      "Not Applicable": "bg-gray-100 text-gray-800",
    }
    return variants[status] || "bg-gray-100 text-gray-800"
  }

  const filteredReferrals = referrals.filter((referral) => {
    const matchesSearch =
      referral.referrer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || referral.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Referrals</h1>
          <p className="text-gray-600">Track employee referrals and manage referral bonuses</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Referral
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${stat.color}`}>{stat.change}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Referral Program Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-orange-600" />
              Referral Program
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Software Developer</span>
                <span className="font-medium">$2,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Manager Level</span>
                <span className="font-medium">$1,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Specialist Level</span>
                <span className="font-medium">$1,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Entry Level</span>
                <span className="font-medium">$1,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Top Referrers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-orange-600">JD</span>
                  </div>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-gray-500">5 referrals</div>
                  </div>
                </div>
                <span className="font-medium text-green-600">$8,500</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-orange-600">JS</span>
                  </div>
                  <div>
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-sm text-gray-500">3 referrals</div>
                  </div>
                </div>
                <span className="font-medium text-green-600">$4,500</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-orange-600">RB</span>
                  </div>
                  <div>
                    <div className="font-medium">Robert Brown</div>
                    <div className="text-sm text-gray-500">2 referrals</div>
                  </div>
                </div>
                <span className="font-medium text-green-600">$3,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referrals Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Referral Records</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search referrals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="under review">Under Review</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Referrer</TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Referral Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bonus Amount</TableHead>
                  <TableHead>Bonus Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReferrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-orange-600">
                            {referral.referrer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{referral.referrer}</div>
                          <div className="text-sm text-gray-500">{referral.referrerEmployee}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{referral.candidate}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{referral.position}</div>
                        <div className="text-sm text-gray-500">{referral.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>{referral.referralDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(referral.status)}>{referral.status}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{referral.bonus}</TableCell>
                    <TableCell>
                      <Badge className={getBonusStatusBadge(referral.bonusStatus)}>{referral.bonusStatus}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
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
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Referrals
