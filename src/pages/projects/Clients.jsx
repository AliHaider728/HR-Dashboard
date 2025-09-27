 
import { useState } from "react"
import { Search, Plus, Filter, Download, Building, Phone, Mail, MapPin, Star } from "lucide-react"

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const clients = [
    {
      id: "CLI-001",
      name: "Acme Corporation",
      contact: "John Doe",
      email: "john.doe@acme.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business St, New York, NY 10001",
      status: "active",
      projects: 5,
      revenue: 125000,
      rating: 5,
      lastContact: "2024-01-15",
    },
    {
      id: "CLI-002",
      name: "Tech Solutions Ltd",
      contact: "Jane Smith",
      email: "jane.smith@techsolutions.com",
      phone: "+1 (555) 987-6543",
      address: "456 Innovation Ave, San Francisco, CA 94105",
      status: "active",
      projects: 3,
      revenue: 85000,
      rating: 4,
      lastContact: "2024-01-12",
    },
    {
      id: "CLI-003",
      name: "Global Industries",
      contact: "Mike Johnson",
      email: "mike.johnson@global.com",
      phone: "+1 (555) 456-7890",
      address: "789 Corporate Blvd, Chicago, IL 60601",
      status: "inactive",
      projects: 8,
      revenue: 220000,
      rating: 3,
      lastContact: "2023-12-20",
    },
    {
      id: "CLI-004",
      name: "StartUp Inc",
      contact: "Sarah Wilson",
      email: "sarah.wilson@startup.com",
      phone: "+1 (555) 321-0987",
      address: "321 Venture Way, Austin, TX 73301",
      status: "prospect",
      projects: 0,
      revenue: 0,
      rating: 0,
      lastContact: "2024-01-10",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "prospect":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = filteredClients.reduce((sum, client) => sum + client.revenue, 0)
  const activeClients = filteredClients.filter((client) => client.status === "active").length
  const totalProjects = filteredClients.reduce((sum, client) => sum + client.projects, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">Manage your client relationships</p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700">
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{filteredClients.length}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Building className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Clients</p>
              <p className="text-2xl font-bold text-green-600">{activeClients}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Building className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{totalProjects}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Building className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search clients..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="prospect">Prospect</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-lg mr-3">
                    <Building className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.id}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}
                >
                  {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  {client.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  {client.email}
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                  <span className="line-clamp-2">{client.address}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Projects</p>
                    <p className="font-semibold text-gray-900">{client.projects}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Revenue</p>
                    <p className="font-semibold text-gray-900">${client.revenue.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Rating:</span>
                    <div className="flex">{renderStars(client.rating)}</div>
                  </div>
                  <p className="text-xs text-gray-500">Last contact: {client.lastContact}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button className="flex-1 bg-orange-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-orange-700">
                    View Details
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Clients
