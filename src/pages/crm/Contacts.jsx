
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
      Active: "bg-green-100 text-green-800",
      Prospect: "bg-blue-100 text-blue-800",
      Inactive: "bg-red-100 text-red-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
          <p className="text-gray-600">Manage your customer relationships and prospects</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogDescription>Enter the contact details to add them to your CRM.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">Location</Label>
                <Input
                  id="location"
                  value={newContact.location}
                  onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">Position</Label>
                <Input
                  id="position"
                  value={newContact.position}
                  onChange={(e) => setNewContact({ ...newContact, position: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="source" className="text-right">Source</Label>
                <Select onValueChange={(value) => setNewContact({ ...newContact, source: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {sources
                      .filter((s) => s !== "All")
                      .map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select onValueChange={(value) => setNewContact({ ...newContact, status: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses
                      .filter((s) => s !== "All")
                      .map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rating" className="text-right">Rating</Label>
                <Select onValueChange={(value) => setNewContact({ ...newContact, rating: parseFloat(value) })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {ratings
                      .filter((r) => r !== "All")
                      .map((rating) => (
                        <SelectItem key={rating} value={rating}>
                          {rating} Stars
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dealValue" className="text-right">Deal Value</Label>
                <Input
                  id="dealValue"
                  value={newContact.dealValue}
                  onChange={(e) => setNewContact({ ...newContact, dealValue: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="notes" className="text-right pt-2">Notes</Label>
                <Textarea
                  id="notes"
                  value={newContact.notes}
                  onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                  className="col-span-3"
                  placeholder="Add notes..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddContact} className="bg-blue-600 hover:bg-blue-700">
                Add Contact
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                {ratings.map((rating) => (
                  <SelectItem key={rating} value={rating}>
                    {rating === "All" ? "All Ratings" : `${rating} Stars`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContacts.map((contact) => (
          <Card
            key={contact.id}
            className="relative group hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{contact.position}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{contact.location}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{contact.rating} / 5</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(contact.status)}
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleViewContact(contact)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditContactOpen(contact)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSendEmail(contact.email)}>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCall(contact.phone)}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[725px] ">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription>Update the contact details.</DialogDescription>
          </DialogHeader>
          {editingContact && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  value={editingContact.name}
                  onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingContact.email}
                  onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editingContact.phone}
                  onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">Location</Label>
                <Input
                  id="edit-location"
                  value={editingContact.location}
                  onChange={(e) => setEditingContact({ ...editingContact, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-position" className="text-right">Position</Label>
                <Input
                  id="edit-position"
                  value={editingContact.position}
                  onChange={(e) => setEditingContact({ ...editingContact, position: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-source" className="text-right">Source</Label>
                <Select
                  value={editingContact.source}
                  onValueChange={(value) => setEditingContact({ ...editingContact, source: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {sources
                      .filter((s) => s !== "All")
                      .map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">Status</Label>
                <Select
                  value={editingContact.status}
                  onValueChange={(value) => setEditingContact({ ...editingContact, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses
                      .filter((s) => s !== "All")
                      .map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-rating" className="text-right">Rating</Label>
                <Select
                  value={editingContact.rating.toString()}
                  onValueChange={(value) => setEditingContact({ ...editingContact, rating: parseFloat(value) })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {ratings
                      .filter((r) => r !== "All")
                      .map((rating) => (
                        <SelectItem key={rating} value={rating}>
                          {rating} Stars
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-dealValue" className="text-right">Deal Value</Label>
                <Input
                  id="edit-dealValue"
                  value={editingContact.dealValue}
                  onChange={(e) => setEditingContact({ ...editingContact, dealValue: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-notes" className="text-right pt-2">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={editingContact.notes}
                  onChange={(e) => setEditingContact({ ...editingContact, notes: e.target.value })}
                  className="col-span-3"
                  placeholder="Add notes..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleEditContact} className="bg-blue-600 hover:bg-blue-700">
              Update Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>View Contact Details</DialogTitle>
            <DialogDescription>Details for {viewingContact?.name}.</DialogDescription>
          </DialogHeader>
          {viewingContact && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Name</Label>
                <div className="col-span-3">{viewingContact.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Email</Label>
                <div className="col-span-3">{viewingContact.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Phone</Label>
                <div className="col-span-3">{viewingContact.phone}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Location</Label>
                <div className="col-span-3">{viewingContact.location}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Position</Label>
                <div className="col-span-3">{viewingContact.position}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Source</Label>
                <div className="col-span-3">{viewingContact.source}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Status</Label>
                <div className="col-span-3">{getStatusBadge(viewingContact.status)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Rating</Label>
                <div className="col-span-3 flex items-center gap-1">{getRatingStars(viewingContact.rating)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Deal Value</Label>
                <div className="col-span-3">{viewingContact.dealValue}</div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-medium pt-2">Notes</Label>
                <div className="col-span-3">{viewingContact.notes}</div>
              </div>
              {viewingContact.tags && viewingContact.tags.length > 0 && (
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right font-medium pt-2">Tags</Label>
                  <div className="col-span-3 flex flex-wrap gap-2">
                    {viewingContact.tags.map((tag, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
              className="border-gray-300"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}