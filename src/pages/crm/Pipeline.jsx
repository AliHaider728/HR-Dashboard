import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Pencil, Trash2, Search, Plus, TrendingUp, DollarSign, Target, Calendar, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

// Initial pipeline data
const initialPipelineData = [
  { id: 1, name: 'Sales', totalDealValue: '$4,50,000', noOfDeals: 315, stages: 'Won', createdDate: '14 Jan 2024', status: 'Active', person: 'John Doe' },
  { id: 2, name: 'Marketing', totalDealValue: '$3,15,000', noOfDeals: 447, stages: 'In Pipeline', createdDate: '21 Jan 2024', status: 'Active', person: 'Jane Smith' },
  { id: 3, name: 'Calls', totalDealValue: '$8,40,000', noOfDeals: 654, stages: 'Won', createdDate: '20 Feb 2024', status: 'Active', person: 'Alice Johnson' },
  { id: 4, name: 'Email', totalDealValue: '$6,10,000', noOfDeals: 545, stages: 'Conversation', createdDate: '15 Mar 2024', status: 'Active', person: 'Bob Wilson' },
  { id: 5, name: 'Chats', totalDealValue: '$4,70,000', noOfDeals: 787, stages: 'Won', createdDate: '12 Apr 2024', status: 'Active', person: 'Emma Brown' },
  { id: 6, name: 'Operational', totalDealValue: '$5,50,000', noOfDeals: 787, stages: 'Follow Up', createdDate: '20 Apr 2024', status: 'Active', person: 'Michael Lee' },
  { id: 7, name: 'Collabrative', totalDealValue: '$5,00,000', noOfDeals: 315, stages: 'Won', createdDate: '06 Jul 2024', status: 'Inactive', person: 'Sarah Davis' },
  { id: 8, name: 'Differentiate', totalDealValue: '$4,50,000', noOfDeals: 478, stages: 'Schedule Service', createdDate: '02 Sep 2024', status: 'Active', person: 'David Clark' },
  { id: 9, name: 'Interact', totalDealValue: '$6,20,000', noOfDeals: 664, stages: 'Won', createdDate: '15 Nov 2024', status: 'Active', person: 'Laura Martinez' },
];

const Pipeline = () => {
  const [pipelineData, setPipelineData] = useState(initialPipelineData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPipeline, setCurrentPipeline] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Calculate stats
  const stats = useMemo(() => {
    const totalDeals = pipelineData.reduce((sum, p) => sum + p.noOfDeals, 0);
    const totalValue = pipelineData.reduce((sum, p) => {
      const value = parseInt(p.totalDealValue.replace(/[$,]/g, ''));
      return sum + value;
    }, 0);
    const activeCount = pipelineData.filter(p => p.status === 'Active').length;
    const wonDeals = pipelineData.filter(p => p.stages === 'Won').reduce((sum, p) => sum + p.noOfDeals, 0);
    return { totalDeals, totalValue, activeCount, wonDeals };
  }, [pipelineData]);

  // Stats cards data with chart data
  const ticketStats = [
    {
      icon: DollarSign,
      count: `${(stats.totalValue / 100000).toFixed(2)}M`,
      label: 'Total Deal Value',
      percentage: '+12.5%',
      color: 'orange',
      chartData: [
        { value: 30 }, { value: 40 }, { value: 35 }, { value: 50 }, 
        { value: 49 }, { value: 60 }, { value: 70 }, { value: 65 }
      ]
    },
    {
      icon: TrendingUp,
      count: stats.totalDeals.toLocaleString(),
      label: 'Total Deals',
      percentage: '+8.2%',
      color: 'purple',
      chartData: [
        { value: 45 }, { value: 52 }, { value: 48 }, { value: 60 }, 
        { value: 55 }, { value: 68 }, { value: 62 }, { value: 75 }
      ]
    },
    {
      icon: Target,
      count: stats.activeCount,
      label: 'Active Pipelines',
      percentage: '+5.7%',
      color: 'green',
      chartData: [
        { value: 20 }, { value: 35 }, { value: 30 }, { value: 45 }, 
        { value: 40 }, { value: 50 }, { value: 48 }, { value: 55 }
      ]
    },
    {
      icon: Users,
      count: stats.wonDeals,
      label: 'Won Deals',
      percentage: '+15.3%',
      color: 'orange',
      chartData: [
        { value: 35 }, { value: 38 }, { value: 45 }, { value: 42 }, 
        { value: 55 }, { value: 58 }, { value: 65 }, { value: 70 }
      ]
    }
  ];

  // Render mini chart
  const renderMiniChart = (data, color) => {
    const strokeColor = 
      color === 'orange' ? '#ea580c' :
      color === 'purple' ? '#9333ea' :
      color === 'green' ? '#16a34a' :
      '#2563eb';

    return (
      <ResponsiveContainer width="100%" height={60}>
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={strokeColor} 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  // Filter and sort pipeline data
  const filteredData = useMemo(() => {
    let result = [...pipelineData];
    if (searchTerm) {
      result = result.filter(pipeline =>
        pipeline.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [pipelineData, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle sort
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this pipeline?')) {
      setPipelineData(pipelineData.filter(pipeline => pipeline.id !== id));
    }
  };

  // Handle edit
  const handleEdit = (pipeline) => {
    setCurrentPipeline(pipeline);
    setIsEditModalOpen(true);
  };

  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedPipeline = {
      id: currentPipeline.id,
      name: e.target.name.value,
      totalDealValue: e.target.totalDealValue.value,
      noOfDeals: parseInt(e.target.noOfDeals.value),
      stages: e.target.stages.value,
      createdDate: e.target.createdDate.value,
      status: e.target.status.value,
      person: e.target.person.value,
    };
    setPipelineData(pipelineData.map(pipeline =>
      pipeline.id === updatedPipeline.id ? updatedPipeline : pipeline
    ));
    setIsEditModalOpen(false);
    setCurrentPipeline(null);
  };

  // Handle add form submission
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newPipeline = {
      id: Math.max(...pipelineData.map(p => p.id)) + 1,
      name: e.target.name.value,
      totalDealValue: e.target.totalDealValue.value || '$0',
      noOfDeals: parseInt(e.target.noOfDeals.value) || 0,
      stages: e.target.stages.value,
      createdDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Active',
      person: e.target.person.value,
    };
    setPipelineData([...pipelineData, newPipeline]);
    setIsAddModalOpen(false);
  };

  const getStageColor = (stage) => {
    const colors = {
      'Won': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'In Pipeline': 'bg-orange-100 text-orange-700 border-orange-200',
      'Follow Up': 'bg-amber-100 text-amber-700 border-amber-200',
      'Schedule Service': 'bg-purple-100 text-purple-700 border-purple-200',
      'Conversation': 'bg-cyan-100 text-cyan-700 border-cyan-200',
      'Access': 'bg-pink-100 text-pink-700 border-pink-200',
    };
    return colors[stage] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-orange-50">
      <div className="p-8 space-y-8 max-w-full mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold ">
              Pipeline Dashboard
            </h1>
 
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Pipeline
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {ticketStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      stat.color === "orange"
                        ? "bg-orange-50"
                        : stat.color === "purple"
                          ? "bg-purple-50"
                          : stat.color === "green"
                            ? "bg-green-50"
                            : "bg-orange-50"
                    }`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${
                        stat.color === "orange"
                          ? "text-orange-600"
                          : stat.color === "purple"
                            ? "text-purple-600"
                            : stat.color === "green"
                              ? "text-green-600"
                              : "text-orange-600"
                      }`}
                    />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.percentage}</span>
                </div>
                <div className="mb-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
                <div className="flex justify-center">{renderMiniChart(stat.chartData, stat.color)}</div>
              </div>
            );
          })}
        </div>

        {/* Filters Section */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">Pipeline Overview</h2>
                <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4" />
                  09/29/2025 - 10/05/2025
                </p>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Rows</span>
                  <Select value={rowsPerPage.toString()} onValueChange={(value) => {
                    setRowsPerPage(parseInt(value));
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="w-20 border-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search pipelines..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 w-64 border-slate-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                    <TableHead 
                      onClick={() => handleSort('name')} 
                      className="cursor-pointer hover:bg-slate-200 transition-colors font-semibold text-slate-700"
                    >
                      Pipeline Name {sortConfig.key === 'name' && (
                        <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </TableHead>
                    <TableHead 
                      onClick={() => handleSort('totalDealValue')} 
                      className="cursor-pointer hover:bg-slate-200 transition-colors font-semibold text-slate-700"
                    >
                      Deal Value {sortConfig.key === 'totalDealValue' && (
                        <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </TableHead>
                    <TableHead 
                      onClick={() => handleSort('noOfDeals')} 
                      className="cursor-pointer hover:bg-slate-200 transition-colors font-semibold text-slate-700"
                    >
                      Deals {sortConfig.key === 'noOfDeals' && (
                        <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </TableHead>
                    <TableHead 
                      onClick={() => handleSort('stages')} 
                      className="cursor-pointer hover:bg-slate-200 transition-colors font-semibold text-slate-700"
                    >
                      Stage {sortConfig.key === 'stages' && (
                        <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </TableHead>
                    <TableHead 
                      onClick={() => handleSort('createdDate')} 
                      className="cursor-pointer hover:bg-slate-200 transition-colors font-semibold text-slate-700"
                    >
                      Created {sortConfig.key === 'createdDate' && (
                        <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="font-semibold text-slate-700">Owner</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item, idx) => (
                    <TableRow 
                      key={item.id}
                      className="hover:bg-orange-50/50 transition-colors border-b border-slate-100"
                    >
                      <TableCell className="font-semibold text-slate-800">{item.name}</TableCell>
                      <TableCell className="text-slate-700 font-medium">{item.totalDealValue}</TableCell>
                      <TableCell className="text-slate-700">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {item.noOfDeals}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStageColor(item.stages)} border font-medium`}>
                          {item.stages}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">{item.createdDate}</TableCell>
                      <TableCell>
                        <Badge 
                          className={item.status === 'Active' 
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200' 
                            : 'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200'
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-700 text-sm">{item.person}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                            className="hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 bg-slate-50 border-t border-slate-200">
              <div className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-800">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
                <span className="font-semibold text-slate-800">{Math.min(currentPage * rowsPerPage, filteredData.length)}</span> of{' '}
                <span className="font-semibold text-slate-800">{filteredData.length}</span> entries
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="hover:bg-orange-50 hover:border-orange-300 disabled:opacity-50"
                >
                  Previous
                </Button>
                <div className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700">
                  {currentPage} / {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="hover:bg-orange-50 hover:border-orange-300 disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      {currentPipeline && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-800">Edit Pipeline</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-semibold text-slate-700">Pipeline Name</label>
                  <Input
                    id="name"
                    defaultValue={currentPipeline.name}
                    className="border-slate-300"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="totalDealValue" className="text-sm font-semibold text-slate-700">Total Deal Value</label>
                  <Input
                    id="totalDealValue"
                    defaultValue={currentPipeline.totalDealValue}
                    className="border-slate-300"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="noOfDeals" className="text-sm font-semibold text-slate-700">Number of Deals</label>
                  <Input
                    id="noOfDeals"
                    type="number"
                    defaultValue={currentPipeline.noOfDeals}
                    className="border-slate-300"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="stages" className="text-sm font-semibold text-slate-700">Stage</label>
                  <select
                    id="stages"
                    defaultValue={currentPipeline.stages}
                    className="border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="Add New">Add New</option>
                    <option value="In Pipeline">In Pipeline</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Schedule Service">Schedule Service</option>
                    <option value="Access">Access</option>
                    <option value="Won">Won</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="status" className="text-sm font-semibold text-slate-700">Status</label>
                  <select
                    id="status"
                    defaultValue={currentPipeline.status}
                    className="border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="person" className="text-sm font-semibold text-slate-700">Owner</label>
                  <select
                    id="person"
                    defaultValue={currentPipeline.person}
                    className="border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Alice Johnson">Alice Johnson</option>
                    <option value="Bob Wilson">Bob Wilson</option>
                    <option value="Emma Brown">Emma Brown</option>
                    <option value="Michael Lee">Michael Lee</option>
                    <option value="Sarah Davis">Sarah Davis</option>
                    <option value="David Clark">David Clark</option>
                    <option value="Laura Martinez">Laura Martinez</option>
                  </select>
                </div>
                <Input
                  id="createdDate"
                  type="hidden"
                  defaultValue={currentPipeline.createdDate}
                />
              </div>
              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                  className="hover:bg-slate-100 hover:text-black "
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r  from-orange-600 to-orange-600 hover:from-orange-700 hover:to-orange-700"
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800">Add New Pipeline</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit}>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700">Pipeline Name</label>
                <Input
                  id="name"
                  placeholder="Enter pipeline name"
                  className="border-slate-300"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="stages" className="text-sm font-semibold text-slate-700">Pipeline Stage</label>
                <select
                  id="stages"
                  className="border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="Add New">Add New</option>
                  <option value="In Pipeline">In Pipeline</option>
                  <option value="Follow Up">Follow Up</option>
                  <option value="Schedule Service">Schedule Service</option>
                  <option value="Access">Access</option>
                  <option value="Won">Won</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="person" className="text-sm font-semibold text-slate-700">Owner</label>
                <select
                  id="person"
                  className="border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Alice Johnson">Alice Johnson</option>
                  <option value="Bob Wilson">Bob Wilson</option>
                  <option value="Emma Brown">Emma Brown</option>
                  <option value="Michael Lee">Michael Lee</option>
                  <option value="Sarah Davis">Sarah Davis</option>
                  <option value="David Clark">David Clark</option>
                  <option value="Laura Martinez">Laura Martinez</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="totalDealValue" className="text-sm font-semibold text-slate-700">Total Deal Value</label>
                <Input
                  id="totalDealValue"
                  placeholder="e.g., $1,00,000"
                  className="border-slate-300"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="noOfDeals" className="text-sm font-semibold text-slate-700">Number of Deals</label>
                <Input
                  id="noOfDeals"
                  type="number"
                  placeholder="Enter number of deals"
                  className="border-slate-300"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                className="hover:bg-slate-100 hover:text-black"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-700 hover:to-orange-700"
              >
                Add Pipeline
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pipeline;