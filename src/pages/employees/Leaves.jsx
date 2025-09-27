
import { useState } from "react"
import { Calendar, Plus, Edit, Search, Clock, CheckCircle, XCircle } from "lucide-react"
import { Button } from  "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"

const leavesData = [
  {
    id: 1,
    employee: "John Doe",
    avatar: "/user-avatar.jpg",
    leaveType: "Annual Leave",
    startDate: "2024-02-15",
    endDate: "2024-02-20",
    days: 5,
    status: "Approved",
    reason: "Family vacation",
    appliedDate: "2024-02-01",
  },
  {
    id: 2,
    employee: "Jane Smith",
    avatar: "/user-avatar.jpg",
    leaveType: "Sick Leave",
    startDate: "2024-02-10",
    endDate: "2024-02-12",
    days: 2,
    status: "Pending",
    reason: "Medical appointment",
    appliedDate: "2024-02-08",
  },
  {
    id: 3,
    employee: "Mike Johnson",
    avatar: "/user-avatar.jpg",
    leaveType: "Personal Leave",
    startDate: "2024-02-25",
    endDate: "2024-02-25",
    days: 1,
    status: "Rejected",
    reason: "Personal work",
    appliedDate: "2024-02-20",
  },
]

export default function Leaves() {
  const [leaves, setLeaves] = useState(leavesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch = leave.employee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || leave.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4" />
      case "Pending":
        return <Clock className="h-4 w-4" />
      case "Rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-ful mt-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leave Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage employee leave requests</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Apply Leave
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for Leave</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="leaveType">Leave Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                    <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                    <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                    <SelectItem value="Maternity Leave">Maternity Leave</SelectItem>
                    <SelectItem value="Emergency Leave">Emergency Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="reason">Reason</Label>
                <Textarea id="reason" placeholder="Enter reason for leave" />
              </div>
              <Button className="w-full">Submit Application</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">{leaves.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {leaves.filter((l) => l.status === "Approved").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {leaves.filter((l) => l.status === "Pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {leaves.filter((l) => l.status === "Rejected").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={leave.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {leave.employee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{leave.employee}</span>
                    </div>
                  </TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
                  <TableCell>
                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{leave.days} days</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(leave.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(leave.status)}
                        {leave.status}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(leave.appliedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {leave.status === "Pending" && (
                        <>
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
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
