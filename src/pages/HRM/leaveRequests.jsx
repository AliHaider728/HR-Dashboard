import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const leaveData = [
  { 
    id: 1, 
    type: 'Medical Leave', 
    from: '2024-01-14', 
    to: '2024-01-15', 
    approvedBy: 'Doglas Martini', 
    role: 'Manager', 
    avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-34.jpg',
    days: 2, 
    status: 'Approved',
    reason: 'Going to Hospital'
  },
  { 
    id: 2, 
    type: 'Annual Leave', 
    from: '2024-01-21', 
    to: '2024-01-25', 
    approvedBy: 'Doglas Martini', 
    role: 'Manager', 
    avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-38.jpg',
    days: 5, 
    status: 'Approved',
    reason: ''
  },
  { 
    id: 3, 
    type: 'Medical Leave', 
    from: '2024-01-20', 
    to: '2024-02-22', 
    approvedBy: 'Warren Morales', 
    role: 'Admin', 
    avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg',
    days: 3, 
    status: 'New',
    reason: ''
  },
  { 
    id: 4, 
    type: 'Annual Leave', 
    from: '2024-03-15', 
    to: '2024-03-17', 
    approvedBy: 'Doglas Martini', 
    role: 'Manager', 
    avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-19.jpg',
    days: 3, 
    status: 'Approved',
    reason: ''
  },
  { 
    id: 5, 
    type: 'Casual Leave', 
    from: '2024-04-12', 
    to: '2024-04-16', 
    approvedBy: 'Doglas Martini', 
    role: 'Manager', 
    avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-11.jpg',
    days: 5, 
    status: 'Rejected',
    reason: ''
  },
  { 
    id: 6, 
    type: 'Medical Leave', 
    from: '2024-05-20', 
    to: '2024-03-21', 
    approvedBy: 'Warren Morales', 
    role: 'Admin', 
    avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-20.jpg',
    days: 2, 
    status: 'New',
    reason: ''
  },
  { 
    id: 7, 
    type: 'Casual Leave', 
    from: '2024-07-06', 
    to: '2024-07-06', 
    approvedBy: 'Doglas Martini', 
    role: 'Manager', 
    avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-08.jpg',
    days: 1, 
    status: 'Approved',
    reason: ''
  },
  { 
    id: 8, 
    type: 'Medical Leave', 
    from: '2024-09-02', 
    to: '2024-09-04', 
    approvedBy: 'Doglas Martini', 
    role: 'Manager', 
    avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-34.jpg',
    days: 3, 
    status: 'Approved',
    reason: ''
  },
  { 
    id: 9, 
    type: 'Annual Leave', 
    from: '2024-11-15', 
    to: '2024-11-15', 
    approvedBy: 'Warren Morales', 
    role: 'Admin', 
    avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-38.jpg',
    days: 1, 
    status: 'New',
    reason: ''
  },
  { 
    id: 10, 
    type: 'Casual Leave', 
    from: '2024-12-10', 
    to: '2024-12-11', 
    approvedBy: 'Doglas Martini', 
    role: 'Manager', 
    avatar: 'https://smarthr.co.in/demo/html/template/assets/img/users/user-01.jpg',
    days: 2, 
    status: 'Rejected',
    reason: ''
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const EmployeeLeaves = () => {
  const [leaves, setLeaves] = useState(leaveData);
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editLeave, setEditLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const leaveSummary = {
    annual: { used: 5, remaining: 7 },
    medical: { used: 11, remaining: 1 },
    casual: { used: 2, remaining: 10 },
    other: { used: 7, remaining: 5 },
  };

  const totalLeaves = leaves.reduce((sum, leave) => sum + leave.days, 0);
  const totalRemaining = Object.values(leaveSummary).reduce((sum, type) => sum + type.remaining, 0);

  const handleStatusChange = (id, status) => {
    setLeaves(leaves.map(leave => leave.id === id ? { ...leave, status } : leave));
  };

  const handleDelete = (id) => {
    setLeaves(leaves.filter(leave => leave.id !== id));
  };

  const handleEdit = (leave) => {
    setEditLeave({ ...leave });
    setIsModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setLeaves(leaves.map(leave => leave.id === editLeave.id ? editLeave : leave));
    setIsModalOpen(false);
    setEditLeave(null);
  };

  const filteredLeaves = leaves.filter(leave =>
    leave.type.toLowerCase().includes(search.toLowerCase()) ||
    leave.approvedBy.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'New':
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header with Custom Breadcrumbs */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Leaves</h1>
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
            <a href="/dashboard" className="hover:text-gray-700">Dashboard</a>
            <span>›</span>
            <a href="/leaves" className="hover:text-gray-700">Leaves</a>
            <span>›</span>
            <span className="text-gray-900">Employee Leaves</span>
          </nav>
        </div>
        <Button className="rounded-lg bg-blue-600 hover:bg-blue-700">Add New Leave</Button>
      </div>

      {/* Leave Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Annual Leaves', used: leaveSummary.annual.used, remaining: leaveSummary.annual.remaining, color: 'from-blue-500 to-blue-600' },
          { title: 'Medical Leaves', used: leaveSummary.medical.used, remaining: leaveSummary.medical.remaining, color: 'from-red-500 to-red-600' },
          { title: 'Casual Leaves', used: leaveSummary.casual.used, remaining: leaveSummary.casual.remaining, color: 'from-green-500 to-green-600' },
          { title: 'Other Leaves', used: leaveSummary.other.used, remaining: leaveSummary.other.remaining, color: 'from-yellow-500 to-yellow-600' },
        ].map((summary, index) => (
          <Card key={index} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden min-h-[120px]">
            <CardHeader className={`pb-2 bg-gradient-to-r ${summary.color} rounded-t-lg`}>
              <CardTitle className="text-sm font-semibold text-white">{summary.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-center">
              <div className={`text-4xl font-bold ${summary.color.includes('blue') ? 'text-blue-600' : summary.color.includes('red') ? 'text-red-600' : summary.color.includes('green') ? 'text-green-600' : 'text-yellow-600'}`}>
                {summary.used.toString().padStart(2, '0')}
              </div>
              <p className="text-sm text-gray-600 mt-1">Remaining Leaves: {summary.remaining.toString().padStart(2, '0')}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leave List Table */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Leave Requests</CardTitle>
              <CardDescription className="text-gray-500">
                Total Leaves: {totalLeaves} | Total Remaining: {totalRemaining}
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search leaves..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-xs rounded-lg"
              />
              <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
                <SelectTrigger className="w-24 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Leave Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>To</TableHead>
                <TableHead>No of Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeaves.slice(0, rowsPerPage).map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell className="font-medium">{leave.type}</TableCell>
                  <TableCell>{formatDate(leave.from)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={leave.avatar} 
                        alt={leave.approvedBy} 
                        className="w-8 h-8 rounded-full object-cover" 
                        onError={(e) => { e.target.src = '/default-avatar.png'; }} // Fallback for broken images
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{leave.approvedBy}</p>
                        <p className="text-xs text-gray-500">{leave.role}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(leave.to)}</TableCell>
                  <TableCell>{leave.days} Days</TableCell>
                  <TableCell>
                    <Select
                      value={leave.status}
                      onValueChange={(value) => handleStatusChange(leave.id, value)}
                    >
                      <SelectTrigger className="w-32 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                        <SelectItem value="New">New</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg h-8"
                        onClick={() => handleEdit(leave)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg h-8 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDelete(leave.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredLeaves.length === 0 && (
            <div className="text-center py-8 text-gray-500">No leaves found.</div>
          )}
          {filteredLeaves.length > rowsPerPage && (
            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
              <span>Showing {Math.min(rowsPerPage, filteredLeaves.length)} of {filteredLeaves.length} entries</span>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" className="rounded-lg h-8">Previous</Button>
                <Button variant="outline" size="sm" className="rounded-lg h-8">Next</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Leave Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Leave Request</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Leave Type</label>
              <Select
                value={editLeave?.type || ''}
                onValueChange={(value) => setEditLeave({ ...editLeave, type: value })}
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                  <SelectItem value="Medical Leave">Medical Leave</SelectItem>
                  <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                  <SelectItem value="Other Leave">Other Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">From Date</label>
              <Input
                type="date"
                value={editLeave?.from || ''}
                onChange={(e) => setEditLeave({ ...editLeave, from: e.target.value })}
                className="rounded-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">To Date</label>
              <Input
                type="date"
                value={editLeave?.to || ''}
                onChange={(e) => setEditLeave({ ...editLeave, to: e.target.value })}
                className="rounded-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">No of Days</label>
              <Input
                type="number"
                value={editLeave?.days || 0}
                onChange={(e) => setEditLeave({ ...editLeave, days: Number(e.target.value) })}
                className="rounded-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Remaining Days</label>
              <Input
                type="number"
                value={leaveSummary[editLeave?.type?.toLowerCase().split(' ')[0]]?.remaining || 0}
                disabled
                className="rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Day Type</label>
              <Select
                value={editLeave?.dayType || 'Full Day'}
                onValueChange={(value) => setEditLeave({ ...editLeave, dayType: value })}
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Day">Full Day</SelectItem>
                  <SelectItem value="First Half">First Half</SelectItem>
                  <SelectItem value="Second Half">Second Half</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Reason</label>
              <Input
                value={editLeave?.reason || ''}
                onChange={(e) => setEditLeave({ ...editLeave, reason: e.target.value })}
                placeholder="e.g., Going to Hospital"
                className="rounded-lg"
              />
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-lg">
                Cancel
              </Button>
              <Button type="submit" className="rounded-lg bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeLeaves;
