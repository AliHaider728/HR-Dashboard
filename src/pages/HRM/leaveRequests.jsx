import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Calendar, User, CheckCircle, XCircle, AlertCircle, Edit, Trash2, Plus, Filter, Search, MoreVertical, FileText, Award, Download, Eye, Phone, MessageSquare, CreditCard, FileCheck, Clock, Star, MapPin } from "lucide-react";

const leaveSummary = [
  {
    type: "Annual Leaves",
    total: 5,
    remaining: 7,
    icon: Calendar,
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    type: "Medical Leaves",
    total: 11,
    remaining: 1,
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-gradient-to-br from-red-50 to-red-100",
  },
  {
    type: "Casual Leaves",
    total: 2,
    remaining: 10,
    icon: Star,
    color: "text-emerald-600",
    bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
  },
  {
    type: "Other Leaves",
    total: 7,
    remaining: 5,
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
  },
];

const leaveRequests = [
  {
    type: "Medical Leave",
    from: "14 Jan 2024",
    approvedBy: "",
    to: "15 Jan 2024",
    days: "2 Days",
    status: "",
  },
  {
    type: "Annual Leave",
    from: "21 Jan 2024",
    approvedBy: "",
    to: "25 Jan 2024",
    days: "5 Days",
    status: "",
  },
  {
    type: "Medical Leave",
    from: "20 Jan 2024",
    approvedBy: "",
    to: "22 Feb 2024",
    days: "3 Days",
    status: "",
  },
  {
    type: "Annual Leave",
    from: "15 Mar 2024",
    approvedBy: "",
    to: "17 Mar 2024",
    days: "3 Days",
    status: "",
  },
  {
    type: "Casual Leave",
    from: "12 Apr 2024",
    approvedBy: "",
    to: "16 Apr 2024",
    days: "5 Days",
    status: "",
  },
  {
    type: "Medical Leave",
    from: "20 May 2024",
    approvedBy: "",
    to: "21 Mar 2024",
    days: "2 Days",
    status: "",
  },
  {
    type: "Casual Leave",
    from: "06 Jul 2024",
    approvedBy: "",
    to: "06 Jul 2024",
    days: "1 Days",
    status: "",
  },
  {
    type: "Medical Leave",
    from: "02 Sep 2024",
    approvedBy: "",
    to: "04 Sep 2024",
    days: "3 Days",
    status: "",
  },
  {
    type: "Annual Leave",
    from: "15 Nov 2024",
    approvedBy: "",
    to: "15 Nov 2024",
    days: "1 Days",
    status: "",
  },
  {
    type: "Casual Leave",
    from: "10 Dec 2024",
    approvedBy: "",
    to: "11 Dec 2024",
    days: "2 Days",
    status: "",
  },
];

export default function LeavesEmployee() {
  const [showAddLeave, setShowAddLeave] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    console.log("Leave request submitted:", leaveForm);
    setShowAddLeave(false);
    setLeaveForm({
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 sm:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 shadow-lg ring-4 ring-blue-100">
              <AvatarImage src="https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-31.jpg" />
              <AvatarFallback className="text-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">AD</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Leaves Overview
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              Manage your leave requests and track entitlements
            </p>
          </div>
        </div>
        <Button
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 flex items-center justify-center gap-2 h-12 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => setShowAddLeave(true)}
        >
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Add Leave Request</span>
          <span className="sm:hidden">Request</span>
        </Button>
      </div>

      {/* Leave Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {leaveSummary.map((leave, index) => {
          const Icon = leave.icon;
          return (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ease-out border-0 shadow-lg overflow-hidden relative h-[140px]"
            >
              <div className={`absolute inset-0 ${leave.bgColor} opacity-50`}></div>
              <CardHeader className="relative flex flex-col items-center justify-center space-y-2 pb-0 h-full">
                <div className={`rounded-xl p-3 ${leave.bgColor} ring-1 ring-white/20 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-6 w-6 ${leave.color}`} />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-gray-900 transition-colors text-center">
                  {leave.type}
                </CardTitle>
                <div className="text-3xl font-bold text-gray-900 mb-1">#### {leave.total}</div>
                <p className="text-sm text-gray-600">Remaining Leaves : {leave.remaining}</p>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Leave Requests Table */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm mb-6 sm:mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Leave Requests</CardTitle>
            <CardDescription className="text-gray-600 mt-1">Recent leave history</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl">
              <Search className="h-4 w-4 mr-1" />
              Search
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="text-left p-4 font-semibold text-gray-900">Leave Type</TableHead>
                  <TableHead className="text-left p-4 font-semibold text-gray-900">From</TableHead>
                  <TableHead className="text-left p-4 font-semibold text-gray-900">Approved By</TableHead>
                  <TableHead className="text-left p-4 font-semibold text-gray-900">To</TableHead>
                  <TableHead className="text-left p-4 font-semibold text-gray-900">No of Days</TableHead>
                  <TableHead className="text-left p-4 font-semibold text-gray-900">Status</TableHead>
                  <TableHead className="text-left p-4 font-semibold text-gray-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((request, index) => (
                  <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <TableCell className="p-4 font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {request.type}
                      </div>
                    </TableCell>
                    <TableCell className="p-4 text-gray-700">{request.from}</TableCell>
                    <TableCell className="p-4 text-gray-700">{request.approvedBy || <span className="text-gray-400 italic">Pending</span>}</TableCell>
                    <TableCell className="p-4 text-gray-700">{request.to}</TableCell>
                    <TableCell className="p-4 font-medium text-gray-900">{request.days}</TableCell>
                    <TableCell className="p-4">
                      {request.status ? (
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Approved</Badge>
                      ) : (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-50">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-orange-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">Showing 1 to 10 of 10 entries</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-xl">Previous</Button>
              <Button variant="outline" size="sm" className="rounded-xl">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Leave Request Modal */}
      {showAddLeave && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold text-gray-900">Add Leave Request</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Submit a new leave request</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleLeaveSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Leave Type</Label>
                  <Select
                    value={leaveForm.leaveType}
                    onValueChange={(value) =>
                      setLeaveForm((prev) => ({ ...prev, leaveType: value }))
                    }
                  >
                    <SelectTrigger className="border-gray-200 rounded-lg">
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                      <SelectItem value="Medical Leave">Medical Leave</SelectItem>
                      <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                      <SelectItem value="Other Leave">Other Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">From Date</Label>
                    <Input
                      type="date"
                      value={leaveForm.fromDate}
                      onChange={(e) =>
                        setLeaveForm((prev) => ({
                          ...prev,
                          fromDate: e.target.value,
                        }))
                      }
                      className="border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">To Date</Label>
                    <Input
                      type="date"
                      value={leaveForm.toDate}
                      onChange={(e) =>
                        setLeaveForm((prev) => ({
                          ...prev,
                          toDate: e.target.value,
                        }))
                      }
                      className="border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Reason</Label>
                  <Textarea
                    placeholder="Enter reason for leave"
                    value={leaveForm.reason}
                    onChange={(e) =>
                      setLeaveForm((prev) => ({
                        ...prev,
                        reason: e.target.value,
                      }))
                    }
                    className="border-gray-200 rounded-lg min-h-[100px]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg border-gray-200 hover:bg-gray-50"
                    onClick={() => setShowAddLeave(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}