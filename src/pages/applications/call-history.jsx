import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Eye, 
  Trash2, 
  Phone, 
  PhoneCall, 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneMissed,
  Clock,
  Calendar,
  User,
  Mail,
  Filter,
  Search,
  Download,
  MoreVertical
} from 'lucide-react';

// Enhanced data matching SmartHR template
const callData = [
  {
    id: 1,
    name: 'Anthony Lewis',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    phone: '(123) 4567 890',
    type: 'Incoming',
    duration: '00:25',
    date: '14 Jan 2024, 04:27 AM',
    email: 'anthony.lewis@example.com',
    totalCalls: 20,
    avgCallTiming: '00:30',
    avgWaitingTime: '00:05',
    status: 'Answered'
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    phone: '(179) 7382 829',
    type: 'Outgoing',
    duration: '00:10',
    date: '21 Jan 2024, 03:19 AM',
    email: 'jane.smith@example.com',
    totalCalls: 15,
    avgCallTiming: '00:20',
    avgWaitingTime: '00:03',
    status: 'Answered'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phone: '(184) 2719 738',
    type: 'Incoming',
    duration: '00:40',
    date: '20 Feb 2024, 12:15 PM',
    email: 'mike.johnson@example.com',
    totalCalls: 25,
    avgCallTiming: '00:35',
    avgWaitingTime: '00:04',
    status: 'Answered'
  },
  {
    id: 4,
    name: 'Emily Davis',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    phone: '(193) 7839 748',
    type: 'Missed Call',
    duration: '00:00',
    date: '15 Mar 2024, 12:11 AM',
    email: 'emily.davis@example.com',
    totalCalls: 10,
    avgCallTiming: '00:00',
    avgWaitingTime: '00:00',
    status: 'Missed'
  },
  {
    id: 5,
    name: 'Chris Wilson',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    phone: '(183) 9302 890',
    type: 'Outgoing',
    duration: '00:35',
    date: '12 Apr 2024, 05:48 PM',
    email: 'chris.wilson@example.com',
    totalCalls: 18,
    avgCallTiming: '00:25',
    avgWaitingTime: '00:06',
    status: 'Answered'
  },
  {
    id: 6,
    name: 'Sarah Brown',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=150&h=150&fit=crop&crop=face',
    phone: '(120) 3728 039',
    type: 'Incoming',
    duration: '01:40',
    date: '20 Apr 2024, 06:11 PM',
    email: 'sarah.brown@example.com',
    totalCalls: 22,
    avgCallTiming: '00:45',
    avgWaitingTime: '00:07',
    status: 'Answered'
  },
  {
    id: 7,
    name: 'David Lee',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    phone: '(102) 8480 832',
    type: 'Missed Call',
    duration: '00:00',
    date: '06 Jul 2024, 07:15 PM',
    email: 'david.lee@example.com',
    totalCalls: 12,
    avgCallTiming: '00:00',
    avgWaitingTime: '00:00',
    status: 'Missed'
  },
  {
    id: 8,
    name: 'Lisa Garcia',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    phone: '(162) 8920 713',
    type: 'Outgoing',
    duration: '00:45',
    date: '02 Sep 2024, 09:21 PM',
    email: 'lisa.garcia@example.com',
    totalCalls: 17,
    avgCallTiming: '00:30',
    avgWaitingTime: '00:05',
    status: 'Answered'
  },
  {
    id: 9,
    name: 'Robert Taylor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phone: '(189) 0920 723',
    type: 'Incoming',
    duration: '00:50',
    date: '15 Nov 2024, 12:44 PM',
    email: 'robert.taylor@example.com',
    totalCalls: 19,
    avgCallTiming: '00:40',
    avgWaitingTime: '00:06',
    status: 'Answered'
  },
  {
    id: 10,
    name: 'Anna Martinez',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    phone: '(168) 8392 823',
    type: 'Missed Call',
    duration: '00:00',
    date: '10 Dec 2024, 11:23 PM',
    email: 'anna.martinez@example.com',
    totalCalls: 14,
    avgCallTiming: '00:00',
    avgWaitingTime: '00:00',
    status: 'Missed'
  },
];

// Enhanced call type configuration with proper icons and colors
const getCallTypeConfig = (type) => {
  switch (type) {
    case 'Incoming':
      return { 
        variant: 'default', 
        icon: PhoneIncoming,
        color: 'text-green-600 bg-green-50 border-green-200',
        iconColor: 'text-green-600'
      };
    case 'Outgoing':
      return { 
        variant: 'secondary', 
        icon: PhoneOutgoing,
        color: 'text-blue-600 bg-blue-50 border-blue-200',
        iconColor: 'text-blue-600'
      };
    case 'Missed Call':
      return { 
        variant: 'destructive', 
        icon: PhoneMissed,
        color: 'text-red-600 bg-red-50 border-red-200',
        iconColor: 'text-red-600'
      };
    default:
      return { 
        variant: 'default', 
        icon: Phone,
        color: 'text-gray-600 bg-gray-50 border-gray-200',
        iconColor: 'text-gray-600'
      };
  }
};

// Convert duration to seconds for sorting
const durationToSeconds = (duration) => {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + seconds;
};

// Parse date for sorting
const parseDate = (dateStr) => new Date(dateStr);

const CallHistory = () => {
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCalls, setSelectedCalls] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const itemsPerPage = 10;

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and search logic
  const filteredData = callData
    .filter((row) => {
      const matchesType = filterType === 'All' || row.type === filterType;
      const matchesSearch =
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.phone.includes(searchQuery) ||
        row.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      let aValue, bValue;
      
      if (sortConfig.key === 'duration') {
        aValue = durationToSeconds(a[sortConfig.key]);
        bValue = durationToSeconds(b[sortConfig.key]);
      } else if (sortConfig.key === 'date') {
        aValue = parseDate(a[sortConfig.key]);
        bValue = parseDate(b[sortConfig.key]);
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Action handlers
  const handleDelete = (id) => {
    console.log(`Deleting call record with ID: ${id}`);
    setShowDeleteConfirm(false);
    setSelectedCalls([]);
  };

  const handleBulkDelete = () => {
    console.log(`Deleting selected calls: ${selectedCalls.join(', ')}`);
    setSelectedCalls([]);
    setShowDeleteConfirm(false);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCalls(paginatedData.map(item => item.id));
    } else {
      setSelectedCalls([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedCalls([...selectedCalls, id]);
    } else {
      setSelectedCalls(selectedCalls.filter(item => item !== id));
    }
  };

  const handleExport = () => {
    console.log('Exporting call history data...');
    // Add your export logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Call History</h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage and track all your call records
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-2"
                onClick={handleExport}
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-white border-b border-gray-100 px-6 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <PhoneCall className="w-5 h-5 text-indigo-600" />
                <span>Call History List</span>
              </CardTitle>
              
              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name, phone, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Calls</SelectItem>
                    <SelectItem value="Incoming">Incoming Calls</SelectItem>
                    <SelectItem value="Outgoing">Outgoing Calls</SelectItem>
                    <SelectItem value="Missed Call">Missed Calls</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="w-12 px-6 py-4">
 
                    </TableHead>
                    <TableHead 
                      onClick={() => handleSort('name')} 
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span className="font-semibold text-gray-700">Name</span>
                        {sortConfig.key === 'name' && (
                          <span className="text-indigo-600">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span className="font-semibold text-gray-700">Phone</span>
                      </div>
                    </TableHead>
                    <TableHead 
                      onClick={() => handleSort('type')} 
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <PhoneCall className="w-4 h-4" />
                        <span className="font-semibold text-gray-700">Call Type</span>
                        {sortConfig.key === 'type' && (
                          <span className="text-indigo-600">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      onClick={() => handleSort('duration')} 
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold text-gray-700">Duration</span>
                        {sortConfig.key === 'duration' && (
                          <span className="text-indigo-600">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      onClick={() => handleSort('date')} 
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-semibold text-gray-700">Date & Time</span>
                        {sortConfig.key === 'date' && (
                          <span className="text-indigo-600">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="px-6 py-4 text-center">
                      <span className="font-semibold text-gray-700">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((row, index) => {
                    const { icon: Icon, color, iconColor } = getCallTypeConfig(row.type);
                    const isSelected = selectedCalls.includes(row.id);
                    
                    return (
                      <TableRow 
                        key={row.id} 
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          isSelected ? 'bg-indigo-50' : ''
                        }`}
                      >
                        <TableCell className="px-6 py-4">
                          {/* <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleSelectItem(row.id, e.target.checked)}
                            className="rounded border-gray-300"
                          /> */}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                src={row.image}
                                alt={row.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                              />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{row.name}</div>
                              <div className="text-sm text-gray-500 flex items-center space-x-1">
                                <Mail className="w-3 h-3" />
                                <span>{row.email}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="font-mono text-sm text-gray-700">{row.phone}</span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${color}`}>
                            <Icon className={`w-4 h-4 mr-2 ${iconColor}`} />
                            <span>{row.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="font-mono text-sm text-gray-700">
                            {row.duration === '00:00' ? '-' : row.duration}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="text-sm text-gray-600">{row.date}</span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-indigo-50 hover:text-indigo-600"
                                  aria-label={`View details for ${row.name}`}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-lg">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center space-x-2">
                                    <User className="w-5 h-5 text-indigo-600" />
                                    <span>Caller Details</span>
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div className="flex flex-col items-center space-y-4">
                                    <img
                                      src={row.image}
                                      alt={row.name}
                                      className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
                                    />
                                    <div className="text-center">
                                      <h3 className="text-xl font-semibold text-gray-900">{row.name}</h3>
                                      <p className="text-gray-600">{row.email}</p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <div className="flex items-center space-x-2 mb-2">
                                        <PhoneCall className="w-4 h-4 text-indigo-600" />
                                        <p className="text-sm font-medium text-gray-900">Total Calls</p>
                                      </div>
                                      <p className="text-lg font-semibold text-gray-700">{row.totalCalls}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <div className="flex items-center space-x-2 mb-2">
                                        <Phone className="w-4 h-4 text-indigo-600" />
                                        <p className="text-sm font-medium text-gray-900">Phone</p>
                                      </div>
                                      <p className="font-mono text-gray-700">{row.phone}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <div className="flex items-center space-x-2 mb-2">
                                        <Clock className="w-4 h-4 text-indigo-600" />
                                        <p className="text-sm font-medium text-gray-900">Avg Call Time</p>
                                      </div>
                                      <p className="font-mono text-gray-700">{row.avgCallTiming}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <div className="flex items-center space-x-2 mb-2">
                                        <Clock className="w-4 h-4 text-indigo-600" />
                                        <p className="text-sm font-medium text-gray-900">Avg Wait Time</p>
                                      </div>
                                      <p className="font-mono text-gray-700">{row.avgWaitingTime}</p>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                              aria-label={`Delete call record for ${row.name}`}
                              onClick={() => {
                                setSelectedCalls([row.id]);
                                setShowDeleteConfirm(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Empty state when no data */}
            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <PhoneCall className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No call records found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}

            {/* Pagination */}
            {filteredData.length > 0 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Showing</span>
                  <span className="font-medium text-gray-900">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>
                  <span>to</span>
                  <span className="font-medium text-gray-900">
                    {Math.min(currentPage * itemsPerPage, filteredData.length)}
                  </span>
                  <span>of</span>
                  <span className="font-medium text-gray-900">{filteredData.length}</span>
                  <span>results</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else {
                        if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-red-600">
              <Trash2 className="w-5 h-5" />
              <span>Confirm Delete</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              You want to delete {selectedCalls.length === 1 ? 'this call record' : 'all the selected items'}.
              This can't be undone once you delete.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedCalls([]);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={selectedCalls.length === 1 ? () => handleDelete(selectedCalls[0]) : handleBulkDelete}
              >
                Delete {selectedCalls.length === 1 ? 'Record' : `${selectedCalls.length} Records`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CallHistory;