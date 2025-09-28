import { useState } from "react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
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
  Mail,
  Phone,
  MapPin,
  Star,
  Users,
  TrendingUp,
  Filter,
  Building2,
  Calendar,
  DollarSign,
} from "lucide-react"
import { Textarea } from "../../components/ui/textarea"

// New contacts data from the provided document
const contactsData = [
  {
    id: 1,
    name: "Darlee Robertson",
    email: "darlee@example.com",
    phone: "(163) 2459 315",
    location: "Germany",
    position: "Facility Manager",
    rating: 4.2,
    avatar: "/placeholder.svg?height=80&width=80",
    status: "Active",
    source: "Website",
    lastContact: "2023-12-01",
    tags: ["Manager", "Facility"],
    dealValue: "$40,000",
    notes: "Manages facility operations",
  },
  {
    id: 2,
    name: "Sharon Roy",
    email: "sharon@example.com",
    phone: "(146) 1249 296",
    location: "USA",
    position: "Installer",
    rating: 5.0,
    avatar: "/placeholder.svg?height=80&width=80",
    status: "Active",
    source: "Referral",
    lastContact: "2023-11-28",
    tags: ["Technical"],
    dealValue: "$30,000",
    notes: "Expert in installations",
  },
  {
    id: 3,
    name: "Vaughan Lewis",
    email: "vaughan@example.com",
    phone: "(135) 3489 516",
    location: "Canada",
    position: "Senior Manager",
    rating: 3.5,
    avatar: "/placeholder.svg?height=80&width=80",
    status: "Prospect",
    source: "LinkedIn",
    lastContact: "2023-11-25",
    tags: ["Leadership"],
    dealValue: "$60,000",
    notes: "Looking for strategic partnerships",
  },
  {
    id: 4,
    name: "Jessica Louise",
    email: "jessica@example.com",
    phone: "(158) 3459 596",
    location: "India",
    position: "Test Engineer",
    rating: 4.5,
    avatar: "/placeholder.svg?height=80&width=80",
    status: "Active",
    source: "Cold Call",
    lastContact: "2023-12-02",
    tags: ["Engineering"],
    dealValue: "$45,000",
    notes: "Focused on quality assurance",
  },
  {
    id: 5,
    name: "Carol Thomas",
    email: "carol@example.com",
    phone: "(196) 4862 196",
    location: "China",
    position: "UI/UX Designer",
    rating: 3.5,
    avatar: "/placeholder.svg?height=80&width=80",
    status: "Prospect",
    source: "Trade Show",
    lastContact: "2023-11-20",
    tags: ["Design"],
    dealValue: "$35,000",
    notes: "Interested in design collaboration",
  },
  {
    id: 6,
    name: "Dawn Mercha",
    email: "dawn@example.com",
    phone: "(163) 6498 256",
    location: "Japan",
    position: "UI/UX Designer",
    rating: 3.5,
    avatar: "/placeholder.svg?height=80&width=80",
    status: "Inactive",
    source: "Email Campaign",
    lastContact: "2023-10-10",
    tags: ["Design"],
    dealValue: "$20,000",
    notes: "Not recently active",
  },
  {
    id: 7,
    name: "Rachel Hampton",
    email: "rachel@example.com",
    phone: "(154) 6481 075",
    location: "Indonesia",
    position: "Software Developer",
    rating: 3.1,
    avatar: "/placeholder.svg?height=80&width=80",
    status: "Prospect",
    source: "Referral",
    lastContact: "2023-11-15",
    tags: ["Developer"],
    dealValue: "$50,000",
    notes: "Working on new project",
  },
  {
    id: 8,
    name: "Jonelle Curtiss",
    email: "jonelle@example.com",
    phone: "(184) 6348 195",
    location: "Cuba",
    position: "Supervisor",
    rating: 5.0,
    avatar: "/placeholder.svg?height=80&width=80",
    status: "Active",
    source: "Website",
    lastContact: "2023-12-05",
    tags: ["Leadership"],
    dealValue: "$55,000",
    notes: "Oversees team operations",
  },
  {
    id: 9,
    name: "Jonathan Smith",
    email: "jonathan@example.com",
    phone: "(175) 2496 125",
    location: "Israel",
    position: "Team Lead Dev",
    rating: 2.7,
    avatar: "/placeholder.svg?height=80&width=80",
    status: "Inactive",
    source: "LinkedIn",
    lastContact: "2023-10-05",
    tags: ["Developer", "Leadership"],
    dealValue: "$25,000",
    notes: "Limited engagement recently",
  },
  {
    id: 10,
    name: "Patricia Carter",
    email: "patricia@example.com",
    phone: "(132) 3145 977",
    location: "Colombia",
    position: "Team Lead Dev",
    rating: 3.0,
    avatar: "/placeholder.svg?height=80&width=80",
    status: "Prospect",
    source: "Cold Call",
    lastContact: "2023-11-10",
    tags: ["Developer", "Leadership"],
    dealValue: "$40,000",
    notes: "Exploring new solutions",
  },
  {
    id: 11,
    name: "Jeffrey Jarrett",
    email: "jeffrey@example.com",
    phone: "(167) 4526 5496",
    location: "Iran",
    position: "Team Lead Dev",
    rating: 4.6,
    avatar: "/placeholder.svg?height=80&width=80",
    status: "Active",
    source: "Trade Show",
    lastContact: "2023-12-01",
    tags: ["Developer", "Leadership"],
    dealValue: "$70,000",
    notes: "Strong technical lead",
  },
  {
    id: 12,
    name: "Gloria Rubio",
    email: "gloria@example.com",
    phone: "(134) 7589 6348",
    location: "Brazil",
    position: "Team Lead Dev",
    rating: 4.1,
    avatar: "/placeholder.svg?height=80&width=80",
    status: "Active",
    source: "Website",
    lastContact: "2023-12-03",
    tags: ["Developer", "Leadership"],
    dealValue: "$65,000",
    notes: "Interested in long-term partnership",
  },
]

const statuses = ["All", "Active", "Prospect", "Inactive"]
const sources = ["All", "Website", "Referral", "LinkedIn", "Cold Call", "Trade Show", "Email Campaign"]
const ratings = ["All", "5", "4", "3", "2", "1"]

export default function Contacts() {
  const [contacts, setContacts] = useState(contactsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedSource, setSelectedSource] = useState("All")
  const [selectedRating, setSelectedRating] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    position: "",
    rating: 3,
    status: "Prospect",
    source: "",
    notes: "",
    dealValue: "$0",
    tags: [],
    avatar: "/placeholder.svg?height=80&width=80",
  })
  const [editingContact, setEditingContact] = useState(null)
  const [viewingContact, setViewingContact] = useState(null)

  // Filter contacts
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" || contact.status === selectedStatus
    const matchesSource = selectedSource === "All" || contact.source === selectedSource
    const matchesRating = selectedRating === "All" || Math.floor(contact.rating).toString() === selectedRating

    return matchesSearch && matchesStatus && matchesSource && matchesRating
  })

  // Calculate stats
  const totalContacts = contacts.length
  const activeContacts = contacts.filter(c => c.status === "Active").length
  const totalDealValue = contacts.reduce((sum, contact) => {
    const value = parseFloat(contact.dealValue.replace(/[$,]/g, ''))
    return sum + (isNaN(value) ? 0 : value)
  }, 0)

  const handleAddContact = () => {
    const contact = {
      id: contacts.length + 1,
      ...newContact,
      lastContact: new Date().toISOString().split("T")[0],
    }
    setContacts([...contacts, contact])
    setNewContact({
      name: "",
      email: "",
      phone: "",
      location: "",
      position: "",
      rating: 3,
      status: "Prospect",
      source: "",
      notes: "",
      dealValue: "$0",
      tags: [],
      avatar: "/placeholder.svg?height=80&width=80",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditContact = () => {
    if (editingContact) {
      setContacts(contacts.map((c) => (c.id === editingContact.id ? { ...editingContact } : c)))
      setEditingContact(null)
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  const handleViewContact = (contact) => {
    setViewingContact(contact)
    setIsViewDialogOpen(true)
  }

  const handleEditContactOpen = (contact) => {
    setEditingContact({ ...contact })
    setIsEditDialogOpen(true)
  }

  const handleSendEmail = (email) => {
    window.open(`mailto:${email}`)
  }

  const handleCall = (phone) => {
    window.open(`tel:${phone.replace(/\D/g, '')}`)
  }

  const getStatusBadge = (status) => {
    const variants = {
      Active: "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm",
      Prospect: "bg-orange-50 text-orange-700 border-orange-200 shadow-sm",
      Inactive: "bg-red-50 text-red-700 border-red-200 shadow-sm",
    }
    return <Badge className={`${variants[status] || "bg-gray-50 text-gray-700 border-gray-200"} font-medium px-3 py-1`}>{status}</Badge>
  }

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-orange-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Contact Management
              </h1>
              <p className="text-gray-600 text-lg">Build stronger relationships with your customers</p>
            </div>
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-xl">
              <Plus className="mr-2 h-5 w-5" />
              Add New Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-2xl border-0 shadow-2xl">
            <DialogHeader className="space-y-3 pb-6 border-b border-gray-100">
              <DialogTitle className="text-2xl font-semibold text-gray-900">Add New Contact</DialogTitle>
              <DialogDescription className="text-gray-600">
                Create a new contact entry for your CRM system
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right font-medium text-gray-700">Name</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right font-medium text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right font-medium text-gray-700">Phone</Label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right font-medium text-gray-700">Location</Label>
                <Input
                  id="location"
                  value={newContact.location}
                  onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right font-medium text-gray-700">Position</Label>
                <Input
                  id="position"
                  value={newContact.position}
                  onChange={(e) => setNewContact({ ...newContact, position: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="source" className="text-right font-medium text-gray-700">Source</Label>
                <Select onValueChange={(value) => setNewContact({ ...newContact, source: value })}>
                  <SelectTrigger className="col-span-3 rounded-lg border-gray-200">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {sources
                      .filter((s) => s !== "All")
                      .map((source) => (
                        <SelectItem key={source} value={source} className="rounded-md">
                          {source}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right font-medium text-gray-700">Status</Label>
                <Select onValueChange={(value) => setNewContact({ ...newContact, status: value })}>
                  <SelectTrigger className="col-span-3 rounded-lg border-gray-200">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {statuses
                      .filter((s) => s !== "All")
                      .map((status) => (
                        <SelectItem key={status} value={status} className="rounded-md">
                          {status}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rating" className="text-right font-medium text-gray-700">Rating</Label>
                <Select onValueChange={(value) => setNewContact({ ...newContact, rating: parseFloat(value) })}>
                  <SelectTrigger className="col-span-3 rounded-lg border-gray-200">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {ratings
                      .filter((r) => r !== "All")
                      .map((rating) => (
                        <SelectItem key={rating} value={rating} className="rounded-md">
                          {rating} Stars
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dealValue" className="text-right font-medium text-gray-700">Deal Value</Label>
                <Input
                  id="dealValue"
                  value={newContact.dealValue}
                  onChange={(e) => setNewContact({ ...newContact, dealValue: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="notes" className="text-right pt-2 font-medium text-gray-700">Notes</Label>
                <Textarea
                  id="notes"
                  value={newContact.notes}
                  onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Add notes..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter className="pt-6 border-t border-gray-100">
              <Button type="submit" onClick={handleAddContact} className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-500 text-white px-6 py-3 rounded-xl shadow-lg">
                Add Contact
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-50 hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium uppercase tracking-wider">Total Contacts</p>
                <p className="text-3xl font-bold text-gray-900">{totalContacts}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium uppercase tracking-wider">Active Contacts</p>
                <p className="text-3xl font-bold text-gray-900">{activeContacts}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-medium uppercase tracking-wider">Total Deal Value</p>
                <p className="text-3xl font-bold text-gray-900">${totalDealValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-80">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 bg-white/80"
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-500" />
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32 h-12 rounded-xl border-gray-200 bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status} className="rounded-lg">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger className="w-40 h-12 rounded-xl border-gray-200 bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {sources.map((source) => (
                    <SelectItem key={source} value={source} className="rounded-lg">
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="w-32 h-12 rounded-xl border-gray-200 bg-white/80">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {ratings.map((rating) => (
                    <SelectItem key={rating} value={rating} className="rounded-lg">
                      {rating === "All" ? "All Ratings" : `${rating} Stars`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContacts.map((contact) => (
          <Card
            key={contact.id}
            className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-[1.02] overflow-hidden"
          >
            <CardContent className="p-0">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-white/20 shadow-lg">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback className="bg-white/20 text-white font-semibold">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{contact.name}</h3>
                      <div className="flex items-center gap-1 text-white/80">
                        <Building2 className="h-3 w-3" />
                        <span className="text-sm">{contact.position}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl border-0 shadow-2xl">
                      <DropdownMenuLabel className="text-gray-600">Quick Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleViewContact(contact)} className="rounded-lg">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditContactOpen(contact)} className="rounded-lg">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendEmail(contact.email)} className="rounded-lg">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCall(contact.phone)} className="rounded-lg">
                        <Phone className="mr-2 h-4 w-4" />
                        Make Call
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 rounded-lg focus:text-red-600"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Contact Details */}
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">{contact.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4 text-green-500" />
                    <span className="text-sm truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-mono">{contact.phone}</span>
                  </div>
                </div>

                {/* Rating and Status */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    {getRatingStars(contact.rating)}
                    <span className="text-sm text-gray-600 ml-1">({contact.rating})</span>
                  </div>
                  {getStatusBadge(contact.status)}
                </div>

                {/* Deal Value */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Deal Value</span>
                  <span className="text-lg font-bold text-green-600">{contact.dealValue}</span>
                </div>

                {/* Tags */}
                {contact.tags && contact.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {contact.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full border-0">
                        {tag}
                      </Badge>
                    ))}
                    {contact.tags.length > 2 && (
                      <Badge className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full border-0">
                        +{contact.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Last Contact */}
                <div className="flex items-center gap-2 pt-2 text-xs text-gray-500 border-t border-gray-50">
                  <Calendar className="h-3 w-3" />
                  <span>Last contact: {new Date(contact.lastContact).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No contacts found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          <Button 
            onClick={() => {
              setSearchTerm("")
              setSelectedStatus("All")
              setSelectedSource("All")
              setSelectedRating("All")
            }}
            variant="outline"
            className="rounded-xl"
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-2xl border-0 shadow-2xl max-h-[80vh] overflow-hidden">
          <DialogHeader className="space-y-3 pb-6 border-b border-gray-100">
            <DialogTitle className="text-2xl font-semibold text-gray-900">Edit Contact</DialogTitle>
            <DialogDescription className="text-gray-600">
              Update the contact information
            </DialogDescription>
          </DialogHeader>
          {editingContact && (
            <div className="grid gap-6 py-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right font-medium text-gray-700">Name</Label>
                <Input
                  id="edit-name"
                  value={editingContact.name}
                  onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right font-medium text-gray-700">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingContact.email}
                  onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right font-medium text-gray-700">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editingContact.phone}
                  onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right font-medium text-gray-700">Location</Label>
                <Input
                  id="edit-location"
                  value={editingContact.location}
                  onChange={(e) => setEditingContact({ ...editingContact, location: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-position" className="text-right font-medium text-gray-700">Position</Label>
                <Input
                  id="edit-position"
                  value={editingContact.position}
                  onChange={(e) => setEditingContact({ ...editingContact, position: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-source" className="text-right font-medium text-gray-700">Source</Label>
                <Select
                  value={editingContact.source}
                  onValueChange={(value) => setEditingContact({ ...editingContact, source: value })}
                >
                  <SelectTrigger className="col-span-3 rounded-lg border-gray-200">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {sources
                      .filter((s) => s !== "All")
                      .map((source) => (
                        <SelectItem key={source} value={source} className="rounded-md">
                          {source}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right font-medium text-gray-700">Status</Label>
                <Select
                  value={editingContact.status}
                  onValueChange={(value) => setEditingContact({ ...editingContact, status: value })}
                >
                  <SelectTrigger className="col-span-3 rounded-lg border-gray-200">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {statuses
                      .filter((s) => s !== "All")
                      .map((status) => (
                        <SelectItem key={status} value={status} className="rounded-md">
                          {status}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-rating" className="text-right font-medium text-gray-700">Rating</Label>
                <Select
                  value={editingContact.rating.toString()}
                  onValueChange={(value) => setEditingContact({ ...editingContact, rating: parseFloat(value) })}
                >
                  <SelectTrigger className="col-span-3 rounded-lg border-gray-200">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {ratings
                      .filter((r) => r !== "All")
                      .map((rating) => (
                        <SelectItem key={rating} value={rating} className="rounded-md">
                          {rating} Stars
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-dealValue" className="text-right font-medium text-gray-700">Deal Value</Label>
                <Input
                  id="edit-dealValue"
                  value={editingContact.dealValue}
                  onChange={(e) => setEditingContact({ ...editingContact, dealValue: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-notes" className="text-right pt-2 font-medium text-gray-700">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={editingContact.notes}
                  onChange={(e) => setEditingContact({ ...editingContact, notes: e.target.value })}
                  className="col-span-3 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Add notes..."
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter className="pt-6 border-t border-gray-100">
            <Button type="submit" onClick={handleEditContact} className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-500 text-white px-6 py-3 rounded-xl shadow-lg">
              Update Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl border-0 shadow-2xl">
          <DialogHeader className="space-y-3 pb-6 border-b border-gray-100">
            <DialogTitle className="text-2xl font-semibold text-gray-900">Contact Details</DialogTitle>
            <DialogDescription className="text-gray-600">
              Complete information for {viewingContact?.name}
            </DialogDescription>
          </DialogHeader>
          {viewingContact && (
            <div className="space-y-6 py-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-orange-50 rounded-xl">
                <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
                  <AvatarImage src={viewingContact.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold text-lg">
                    {viewingContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{viewingContact.name}</h3>
                  <p className="text-gray-600 font-medium">{viewingContact.position}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{viewingContact.location}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid gap-4">
                <div className="grid grid-cols-3 items-center gap-4 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700">Email</Label>
                  <div className="col-span-2 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-green-500" />
                    <span className="text-gray-900">{viewingContact.email}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700">Phone</Label>
                  <div className="col-span-2 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-900 font-mono">{viewingContact.phone}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700">Source</Label>
                  <div className="col-span-2">
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">{viewingContact.source}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700">Status</Label>
                  <div className="col-span-2">{getStatusBadge(viewingContact.status)}</div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700">Rating</Label>
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="flex items-center gap-1">{getRatingStars(viewingContact.rating)}</div>
                    <span className="text-gray-600">({viewingContact.rating}/5)</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700">Deal Value</Label>
                  <div className="col-span-2">
                    <span className="text-xl font-bold text-green-600">{viewingContact.dealValue}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700">Last Contact</Label>
                  <div className="col-span-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">{new Date(viewingContact.lastContact).toLocaleDateString()}</span>
                  </div>
                </div>
                {viewingContact.notes && (
                  <div className="p-3 rounded-lg bg-gray-50">
                    <Label className="font-medium text-gray-700 block mb-2">Notes</Label>
                    <p className="text-gray-900">{viewingContact.notes}</p>
                  </div>
                )}
                {viewingContact.tags && viewingContact.tags.length > 0 && (
                  <div className="p-3 rounded-lg bg-gray-50">
                    <Label className="font-medium text-gray-700 block mb-3">Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {viewingContact.tags.map((tag, index) => (
                        <Badge key={index} className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="pt-6 border-t border-gray-100 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
              className="rounded-xl border-gray-300"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsViewDialogOpen(false)
                handleEditContactOpen(viewingContact)
              }}
              className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-500 text-white rounded-xl"
            >
              Edit Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}