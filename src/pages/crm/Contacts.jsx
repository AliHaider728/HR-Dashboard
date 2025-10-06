import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
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
} from "lucide-react";
import { Textarea } from "../../components/ui/textarea";

// Randomly generated contacts data with avatars
const contactsData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1-555-0101",
    location: "New York, NY",
    position: "Marketing Manager",
    rating: 4.5,
    status: "Active",
    source: "LinkedIn",
    notes: "Interested in new campaign strategies.",
    dealValue: "$12,000",
    tags: ["Marketing", "Lead"],
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    lastContact: "2025-09-15",
  },
  {
    id: 2,
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1-555-0102",
    location: "San Francisco, CA",
    position: "Sales Director",
    rating: 3.8,
    status: "Prospect",
    source: "Referral",
    notes: "Referred by current client.",
    dealValue: "$8,500",
    tags: ["Sales", "High Priority"],
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    lastContact: "2025-09-20",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1-555-0103",
    location: "Chicago, IL",
    position: "CEO",
    rating: 5.0,
    status: "Active",
    source: "Trade Show",
    notes: "Met at annual trade show.",
    dealValue: "$20,000",
    tags: ["Executive", "VIP"],
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    lastContact: "2025-09-25",
  },
  {
    id: 4,
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    phone: "+1-555-0104",
    location: "Boston, MA",
    position: "HR Manager",
    rating: 3.2,
    status: "Inactive",
    source: "Website",
    notes: "Signed up via website form.",
    dealValue: "$5,000",
    tags: ["HR"],
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    lastContact: "2025-08-10",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1-555-0105",
    location: "Austin, TX",
    position: "Product Manager",
    rating: 4.0,
    status: "Prospect",
    source: "Cold Call",
    notes: "Reached out via cold call campaign.",
    dealValue: "$7,500",
    tags: ["Product", "Lead"],
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    lastContact: "2025-09-30",
  },
  {
    id: 6,
    name: "Laura Martinez",
    email: "laura.martinez@example.com",
    phone: "+1-555-0106",
    location: "Seattle, WA",
    position: "CTO",
    rating: 4.7,
    status: "Active",
    source: "Email Campaign",
    notes: "Responded to recent email campaign.",
    dealValue: "$15,000",
    tags: ["Tech", "Executive"],
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    lastContact: "2025-09-28",
  },
  {
    id: 7,
    name: "James Taylor",
    email: "james.taylor@example.com",
    phone: "+1-555-0107",
    location: "Miami, FL",
    position: "Sales Rep",
    rating: 3.5,
    status: "Prospect",
    source: "LinkedIn",
    notes: "Connected via LinkedIn outreach.",
    dealValue: "$6,000",
    tags: ["Sales"],
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    lastContact: "2025-09-18",
  },
  {
    id: 8,
    name: "Emily Anderson",
    email: "emily.anderson@example.com",
    phone: "+1-555-0108",
    location: "Denver, CO",
    position: "Operations Manager",
    rating: 4.2,
    status: "Active",
    source: "Referral",
    notes: "Referred by industry partner.",
    dealValue: "$10,000",
    tags: ["Operations", "Lead"],
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    lastContact: "2025-09-22",
  },
  {
    id: 9,
    name: "Robert Thomas",
    email: "robert.thomas@example.com",
    phone: "+1-555-0109",
    location: "Houston, TX",
    position: "Finance Director",
    rating: 4.8,
    status: "Active",
    source: "Trade Show",
    notes: "Met at finance expo.",
    dealValue: "$18,000",
    tags: ["Finance", "VIP"],
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    lastContact: "2025-09-27",
  },
  {
    id: 10,
    name: "Sophia Lee",
    email: "sophia.lee@example.com",
    phone: "+1-555-0110",
    location: "Los Angeles, CA",
    position: "Marketing Coordinator",
    rating: 3.9,
    status: "Prospect",
    source: "Website",
    notes: "Signed up via landing page.",
    dealValue: "$4,500",
    tags: ["Marketing"],
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    lastContact: "2025-09-19",
  },
  {
    id: 11,
    name: "William Clark",
    email: "william.clark@example.com",
    phone: "+1-555-0111",
    location: "Phoenix, AZ",
    position: "Project Manager",
    rating: 4.1,
    status: "Active",
    source: "Cold Call",
    notes: "Interested in project collaboration.",
    dealValue: "$9,000",
    tags: ["Project", "Lead"],
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    lastContact: "2025-09-29",
  },
  {
    id: 12,
    name: "Olivia Walker",
    email: "olivia.walker@example.com",
    phone: "+1-555-0112",
    location: "Atlanta, GA",
    position: "HR Director",
    rating: 4.3,
    status: "Active",
    source: "Referral",
    notes: "Referred by current client.",
    dealValue: "$11,000",
    tags: ["HR", "VIP"],
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    lastContact: "2025-09-21",
  },
  {
    id: 13,
    name: "Daniel Lewis",
    email: "daniel.lewis@example.com",
    phone: "+1-555-0113",
    location: "Dallas, TX",
    position: "Sales Manager",
    rating: 3.7,
    status: "Prospect",
    source: "LinkedIn",
    notes: "Engaged via LinkedIn campaign.",
    dealValue: "$7,000",
    tags: ["Sales"],
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    lastContact: "2025-09-23",
  },
  {
    id: 14,
    name: "Ava Young",
    email: "ava.young@example.com",
    phone: "+1-555-0114",
    location: "Portland, OR",
    position: "Product Designer",
    rating: 4.4,
    status: "Active",
    source: "Email Campaign",
    notes: "Responded to product launch email.",
    dealValue: "$13,000",
    tags: ["Design", "Lead"],
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    lastContact: "2025-09-26",
  },
  {
    id: 15,
    name: "Henry Harris",
    email: "henry.harris@example.com",
    phone: "+1-555-0115",
    location: "Philadelphia, PA",
    position: "Operations Director",
    rating: 4.6,
    status: "Active",
    source: "Trade Show",
    notes: "Met at operations conference.",
    dealValue: "$16,000",
    tags: ["Operations", "VIP"],
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    lastContact: "2025-09-24",
  },
  {
    id: 16,
    name: "Mia King",
    email: "mia.king@example.com",
    phone: "+1-555-0116",
    location: "San Diego, CA",
    position: "Marketing Director",
    rating: 3.6,
    status: "Prospect",
    source: "Website",
    notes: "Signed up via website form.",
    dealValue: "$6,500",
    tags: ["Marketing"],
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    lastContact: "2025-09-17",
  },
  {
    id: 17,
    name: "Charles Wright",
    email: "charles.wright@example.com",
    phone: "+1-555-0117",
    location: "Minneapolis, MN",
    position: "Finance Manager",
    rating: 4.0,
    status: "Active",
    source: "Referral",
    notes: "Referred by partner company.",
    dealValue: "$10,500",
    tags: ["Finance", "Lead"],
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    lastContact: "2025-09-16",
  },
  {
    id: 18,
    name: "Isabella Scott",
    email: "isabella.scott@example.com",
    phone: "+1-555-0118",
    location: "Raleigh, NC",
    position: "Sales Coordinator",
    rating: 3.9,
    status: "Prospect",
    source: "Cold Call",
    notes: "Contacted via cold call.",
    dealValue: "$8,000",
    tags: ["Sales"],
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    lastContact: "2025-09-14",
  },
  {
    id: 19,
    name: "Thomas Green",
    email: "thomas.green@example.com",
    phone: "+1-555-0119",
    location: "Orlando, FL",
    position: "Product Manager",
    rating: 4.2,
    status: "Active",
    source: "LinkedIn",
    notes: "Connected via LinkedIn.",
    dealValue: "$12,500",
    tags: ["Product", "Lead"],
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    lastContact: "2025-09-13",
  },
  {
    id: 20,
    name: "Charlotte Adams",
    email: "charlotte.adams@example.com",
    phone: "+1-555-0120",
    location: "Charlotte, NC",
    position: "HR Coordinator",
    rating: 4.1,
    status: "Active",
    source: "Referral",
    notes: "Referred by existing client.",
    dealValue: "$9,500",
    tags: ["HR", "Lead"],
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    lastContact: "2025-09-12",
  },
];

const statuses = ["All", "Active", "Prospect", "Inactive"];
const sources = ["All", "Website", "Referral", "LinkedIn", "Cold Call", "Trade Show", "Email Campaign"];
const ratings = ["All", "5", "4", "3", "2", "1"];

export default function Contacts() {
  const [contacts, setContacts] = useState(contactsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedSource, setSelectedSource] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
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
    avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
  });
  const [editingContact, setEditingContact] = useState(null);
  const [viewingContact, setViewingContact] = useState(null);

  // Filter contacts
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || contact.status === selectedStatus;
    const matchesSource = selectedSource === "All" || contact.source === selectedSource;
    const matchesRating = selectedRating === "All" || Math.floor(contact.rating).toString() === selectedRating;

    return matchesSearch && matchesStatus && matchesSource && matchesRating;
  });

  // Calculate stats
  const totalContacts = contacts.length;
  const activeContacts = contacts.filter(c => c.status === "Active").length;
  const totalDealValue = contacts.reduce((sum, contact) => {
    const value = parseFloat(contact.dealValue.replace(/[$,]/g, ''));
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const handleAddContact = () => {
    const contact = {
      id: contacts.length + 1,
      ...newContact,
      lastContact: new Date().toISOString().split("T")[0],
    };
    setContacts([...contacts, contact]);
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
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditContact = () => {
    if (editingContact) {
      setContacts(contacts.map((c) => (c.id === editingContact.id ? { ...editingContact } : c)));
      setEditingContact(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleViewContact = (contact) => {
    setViewingContact(contact);
    setIsViewDialogOpen(true);
  };

  const handleEditContactOpen = (contact) => {
    setEditingContact({ ...contact });
    setIsEditDialogOpen(true);
  };

  const handleSendEmail = (email) => {
    window.open(`mailto:${email}`);
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone.replace(/\D/g, '')}`);
  };

  const getStatusBadge = (status) => {
    const variants = {
      Active: "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm",
      Prospect: "bg-orange-50 text-orange-700 border-orange-200 shadow-sm",
      Inactive: "bg-red-50 text-red-700 border-red-200 shadow-sm",
    };
    return <Badge className={`${variants[status] || "bg-gray-50 text-gray-700 border-gray-200"} font-medium px-3 py-1`}>{status}</Badge>;
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 sm:h-5 sm:w-5 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-orange-50 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl shadow-lg">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Contact Management
              </h1>
              <p className="text-gray-600 text-sm sm:text-lg">Build stronger relationships with your customers</p>
            </div>
          </div>
        </div>
         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2 sm:px-6 sm:py-3 rounded-lg mt-4 sm:mt-0">
          <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Add New Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[900px] max-h-[85vh] rounded-xl border-0 shadow-xl overflow-auto p-4 sm:p-6">
        <DialogHeader className="space-y-2 pb-4 border-b border-gray-100">
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900">Add New Contact</DialogTitle>
          <DialogDescription className="text-gray-600 text-sm sm:text-base">
            Create a new contact entry for your CRM system
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:gap-5 py-4 sm:py-5">
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 sm:gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
              <Label htmlFor="name" className="text-left sm:text-right font-medium text-gray-700">Name</Label>
              <Input
                id="name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
              <Label htmlFor="email" className="text-left sm:text-right font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 sm:gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
              <Label htmlFor="phone" className="text-left sm:text-right font-medium text-gray-700">Phone</Label>
              <Input
                id="phone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
              <Label htmlFor="location" className="text-left sm:text-right font-medium text-gray-700">Location</Label>
              <Input
                id="location"
                value={newContact.location}
                onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
                className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 sm:gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
              <Label htmlFor="position" className="text-left sm:text-right font-medium text-gray-700">Position</Label>
              <Input
                id="position"
                value={newContact.position}
                onChange={(e) => setNewContact({ ...newContact, position: e.target.value })}
                className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
              <Label htmlFor="source" className="text-left sm:text-right font-medium text-gray-700">Source</Label>
              <Select onValueChange={(value) => setNewContact({ ...newContact, source: value })} className="col-span-2">
                <SelectTrigger className="rounded-lg border-gray-200">
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
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 sm:gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
              <Label htmlFor="status" className="text-left sm:text-right font-medium text-gray-700">Status</Label>
              <Select onValueChange={(value) => setNewContact({ ...newContact, status: value })} className="col-span-2">
                <SelectTrigger className="rounded-lg border-gray-200">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
              <Label htmlFor="rating" className="text-left sm:text-right font-medium text-gray-700">Rating</Label>
              <Select
                onValueChange={(value) => setNewContact({ ...newContact, rating: parseFloat(value) })}
                className="col-span-2"
              >
                <SelectTrigger className="rounded-lg border-gray-200">
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
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 sm:gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
              <Label htmlFor="dealValue" className="text-left sm:text-right font-medium text-gray-700">Deal Value</Label>
              <Input
                id="dealValue"
                value={newContact.dealValue}
                onChange={(e) => setNewContact({ ...newContact, dealValue: e.target.value })}
                className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-3 sm:gap-4 col-span-1 sm:col-span-3">
              <Label htmlFor="notes" className="text-left sm:text-right font-medium text-gray-700 pt-2">Notes</Label>
              <Textarea
                id="notes"
                value={newContact.notes}
                onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Add notes..."
                rows={4}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsAddDialogOpen(false)}
            className="rounded-lg border-gray-300 w-full sm:w-auto px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleAddContact}
            className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-500 text-white rounded-lg w-full sm:w-auto px-4 py-2"
          >
            Add Contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="border-0 hover:-translate-y-2 bg-gradient-to-br from-orange-50 to-orange-50 hover:shadow-xl transittion-all ease-in-out duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-xs sm:text-sm font-medium uppercase tracking-wider">Total Contacts</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalContacts}</p>
              </div>
              <div className="p-2 sm:p-3 bg-orange-100 rounded-full">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-xl transittion-all ease-in-out duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-xs sm:text-sm font-medium uppercase tracking-wider">Active Contacts</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{activeContacts}</p>
              </div>
              <div className="p-2 sm:p-3 bg-emerald-100 rounded-full">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 hover:-translate-y-2 bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transittion-all ease-in-out duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-xs sm:text-sm font-medium uppercase tracking-wider">Total Deal Value</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">${totalDealValue.toLocaleString()}</p>
              </div>
              <div className="p-2 sm:p-3 bg-amber-100 rounded-full">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6 sm:mb-8 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 flex-wrap">
            <div className="relative w-full sm:flex-1 sm:min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 sm:h-12 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 bg-white/80 w-full"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-32 h-10 sm:h-12 rounded-xl border-gray-200 bg-white/80">
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
                <SelectTrigger className="w-full sm:w-40 h-10 sm:h-12 rounded-xl border-gray-200 bg-white/80">
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
                <SelectTrigger className="w-full sm:w-32 h-10 sm:h-12 rounded-xl border-gray-200 bg-white/80">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredContacts.map((contact) => (
          <Card
            key={contact.id}
            className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-[1.02] overflow-hidden"
          >
            <CardContent className="p-0">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-3 sm:p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white/20 shadow-lg">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback className="bg-white/20 text-white font-semibold text-sm sm:text-base">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white text-base sm:text-lg">{contact.name}</h3>
                      <div className="flex items-center gap-1 text-white/80">
                        <Building2 className="h-3 w-3 sm:h-3 sm:w-3" />
                        <span className="text-xs sm:text-sm">{contact.position}</span>
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
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span className="text-xs sm:text-sm font-medium">{contact.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4 text-green-500" />
                    <span className="text-xs sm:text-sm truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4 text-purple-500" />
                    <span className="text-xs sm:text-sm font-mono">{contact.phone}</span>
                  </div>
                </div>

                {/* Rating and Status */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    {getRatingStars(contact.rating)}
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">({contact.rating})</span>
                  </div>
                  {getStatusBadge(contact.status)}
                </div>

                {/* Deal Value */}
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">Deal Value</span>
                  <span className="text-base sm:text-lg font-bold text-green-600">{contact.dealValue}</span>
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
        <div className="text-center py-12 sm:py-16">
          <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No contacts found</h3>
          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Try adjusting your search or filter criteria</p>
          <Button 
            onClick={() => {
              setSearchTerm("");
              setSelectedStatus("All");
              setSelectedSource("All");
              setSelectedRating("All");
            }}
            variant="outline"
            className="rounded-xl px-4 py-2 sm:px-6 sm:py-3"
          >
            Clear filters
          </Button>
        </div>
      )}

       {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-[900px] max-h-[85vh] rounded-xl border-0 shadow-xl overflow-auto p-4 sm:p-6">
          <DialogHeader className="space-y-2 pb-4 border-b border-gray-100">
            <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900">Edit Contact</DialogTitle>
            <DialogDescription className="text-gray-600 text-sm sm:text-base">
              Update the contact information
            </DialogDescription>
          </DialogHeader>
          {editingContact && (
            <div className="grid gap-4 sm:gap-5 py-4 sm:py-5">
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 sm:gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
                  <Label htmlFor="edit-name" className="text-left sm:text-right font-medium text-gray-700">Name</Label>
                  <Input
                    id="edit-name"
                    value={editingContact.name}
                    onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
                    className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
                  <Label htmlFor="edit-email" className="text-left sm:text-right font-medium text-gray-700">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingContact.email}
                    onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                    className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 sm:gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
                  <Label htmlFor="edit-phone" className="text-left sm:text-right font-medium text-gray-700">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={editingContact.phone}
                    onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                    className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
                  <Label htmlFor="edit-location" className="text-left sm:text-right font-medium text-gray-700">Location</Label>
                  <Input
                    id="edit-location"
                    value={editingContact.location}
                    onChange={(e) => setEditingContact({ ...editingContact, location: e.target.value })}
                    className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 sm:gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
                  <Label htmlFor="edit-position" className="text-left sm:text-right font-medium text-gray-700">Position</Label>
                  <Input
                    id="edit-position"
                    value={editingContact.position}
                    onChange={(e) => setEditingContact({ ...editingContact, position: e.target.value })}
                    className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
                  <Label htmlFor="edit-source" className="text-left sm:text-right font-medium text-gray-700">Source</Label>
                  <Select
                    value={editingContact.source}
                    onValueChange={(value) => setEditingContact({ ...editingContact, source: value })}
                    className="col-span-2"
                  >
                    <SelectTrigger className="rounded-lg border-gray-200">
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
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 sm:gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
                  <Label htmlFor="edit-status" className="text-left sm:text-right font-medium text-gray-700">Status</Label>
                  <Select
                    value={editingContact.status}
                    onValueChange={(value) => setEditingContact({ ...editingContact, status: value })}
                    className="col-span-2"
                  >
                    <SelectTrigger className="rounded-lg border-gray-200">
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
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
                  <Label htmlFor="edit-rating" className="text-left sm:text-right font-medium text-gray-700">Rating</Label>
                  <Select
                    value={editingContact.rating.toString()}
                    onValueChange={(value) => setEditingContact({ ...editingContact, rating: parseFloat(value) })}
                    className="col-span-2"
                  >
                    <SelectTrigger className="rounded-lg border-gray-200">
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
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 sm:gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 sm:gap-4 col-span-1 sm:col-span-3">
                  <Label htmlFor="edit-dealValue" className="text-left sm:text-right font-medium text-gray-700">Deal Value</Label>
                  <Input
                    id="edit-dealValue"
                    value={editingContact.dealValue}
                    onChange={(e) => setEditingContact({ ...editingContact, dealValue: e.target.value })}
                    className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-3 sm:gap-4 col-span-1 sm:col-span-3">
                  <Label htmlFor="edit-notes" className="text-left sm:text-right font-medium text-gray-700 pt-2">Notes</Label>
                  <Textarea
                    id="edit-notes"
                    value={editingContact.notes}
                    onChange={(e) => setEditingContact({ ...editingContact, notes: e.target.value })}
                    className="col-span-2 rounded-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Add notes..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="rounded-lg border-gray-300 w-full sm:w-auto px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleEditContact}
              className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-500 text-white rounded-lg w-full sm:w-auto px-4 py-2"
            >
              Update Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-[600px] max-h-[85vh] rounded-xl border-0 shadow-xl overflow-auto p-4 sm:p-6">
          <DialogHeader className="space-y-2 pb-4 border-b border-gray-100">
            <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900">Contact Details</DialogTitle>
            <DialogDescription className="text-gray-600 text-sm sm:text-base">
              Complete information for {viewingContact?.name}
            </DialogDescription>
          </DialogHeader>
          {viewingContact && (
            <div className="space-y-4 py-4 sm:py-5">
              {/* Avatar and Basic Info */}
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-white shadow-md">
                  <AvatarImage src={viewingContact.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold text-base">
                    {viewingContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{viewingContact.name}</h3>
                  <p className="text-gray-600 text-sm">{viewingContact.position}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-600">{viewingContact.location}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700 text-sm">Email</Label>
                  <div className="col-span-2 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-green-500" />
                    <span className="text-gray-900 text-sm truncate">{viewingContact.email}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700 text-sm">Phone</Label>
                  <div className="col-span-2 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-900 font-mono text-sm">{viewingContact.phone}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700 text-sm">Source</Label>
                  <div className="col-span-2">
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-sm">{viewingContact.source}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700 text-sm">Status</Label>
                  <div className="col-span-2">{getStatusBadge(viewingContact.status)}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700 text-sm">Rating</Label>
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="flex items-center gap-1">{getRatingStars(viewingContact.rating)}</div>
                    <span className="text-gray-600 text-sm">({viewingContact.rating}/5)</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700 text-sm">Deal Value</Label>
                  <div className="col-span-2">
                    <span className="text-lg font-bold text-green-600">{viewingContact.dealValue}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Label className="font-medium text-gray-700 text-sm">Last Contact</Label>
                  <div className="col-span-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900 text-sm">{new Date(viewingContact.lastContact).toLocaleDateString()}</span>
                  </div>
                </div>
                {viewingContact.notes && (
                  <div className="p-3 rounded-lg bg-gray-50">
                    <Label className="font-medium text-gray-700 block mb-2 text-sm">Notes</Label>
                    <p className="text-gray-900 text-sm">{viewingContact.notes}</p>
                  </div>
                )}
                {viewingContact.tags && viewingContact.tags.length > 0 && (
                  <div className="p-3 rounded-lg bg-gray-50">
                    <Label className="font-medium text-gray-700 block mb-2 text-sm">Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {viewingContact.tags.map((tag, index) => (
                        <Badge key={index} className="bg-orange-100 text-orange-700 border-orange-200 px-2 py-1 text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
              className="rounded-lg border-gray-300 w-full sm:w-auto px-4 py-2"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsViewDialogOpen(false);
                handleEditContactOpen(viewingContact);
              }}
              className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-500 text-white rounded-lg w-full sm:w-auto px-4 py-2"
            >
              Edit Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 