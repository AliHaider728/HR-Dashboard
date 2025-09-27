
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
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
import { Textarea } from "../../components/ui/textarea"
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
  UserPlus,
  TrendingUp,
  Target,
  Star,
  Mail,
  Phone,
} from "lucide-react"

// Sample leads data
const leadsData = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex.thompson@newtech.com",
    phone: "+1 (555) 987-6543",
    company: "NewTech Innovations",
    position: "VP Technology",
    status: "New",
    source: "Website Form",
    score: 85,
    interest: "High",
    budget: "$100,000+",
    timeline: "Q1 2024",
    notes: "Interested in enterprise solution, has budget approved",
    createdDate: "2023-12-01",
    lastActivity: "2023-12-01",
    avatar: "/placeholder.svg?height=32&width=32",
    tags: ["Enterprise", "Hot Lead"],
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@startup.co",
    phone: "+1 (555) 876-5432",
    company: "Startup Co",
    position: "Founder",
    status: "Qualified",
    source: "LinkedIn",
    score: 70,
    interest: "Medium",
    budget: "$25,000-$50,000",
    timeline: "Q2 2024",
    notes: "Early stage startup, price sensitive but growing fast",
    createdDate: "2023-11-28",
    lastActivity: "2023-11-30",
    avatar: "/placeholder.svg?height=32&width=32",
    tags: ["Startup", "Growing"],
  },
  {
    id: 3,
    name: "Robert Chen",
    email: "robert.chen@enterprise.net",
    phone: "+1 (555) 765-4321",
    company: "Enterprise Networks",
    position: "IT Director",
    status: "Contacted",
    source: "Cold Email",
    score: 60,
    interest: "Medium",
    budget: "$50,000-$100,000",
    timeline: "Q3 2024",
    notes: "Evaluating multiple vendors, needs technical demo",
    createdDate: "2023-11-25",
    lastActivity: "2023-11-27",
    avatar: "/placeholder.svg?height=32&width=32",
    tags: ["Technical", "Comparison"],
  },
  {
    id: 4,
    name: "Jennifer Lee",
    email: "jennifer.lee@growth.biz",
    phone: "+1 (555) 654-3210",
    company: "Growth Business",
    position: "Operations Manager",
    status: "Nurturing",
    source: "Referral",
    score: 45,
    interest: "Low",
    budget: "Under $25,000",
    timeline: "Q4 2024",
    notes: "Not ready to buy yet, keep in nurture campaign",
    createdDate: "2023-11-20",
    lastActivity: "2023-11-22",
    avatar: "/placeholder.svg?height=32&width=32",
    tags: ["Nurture", "Long Term"],
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@consulting.pro",
    phone: "+1 (555) 543-2109",
    company: "Consulting Pro",
    position: "Partner",
    status: "Converted",
    source: "Trade Show",
    score: 95,
    interest: "High",
    budget: "$200,000+",
    timeline: "Closed",
    notes: "Successfully converted to customer, large deal closed",
    createdDate: "2023-10-15",
    lastActivity: "2023-11-15",
    avatar: "/placeholder.svg?height=32&width=32",
    tags: ["Converted", "Large Deal"],
  },
]

const statuses = ["All", "New", "Contacted", "Qualified", "Nurturing", "Converted", "Lost"]
const sources = ["All", "Website Form", "LinkedIn", "Cold Email", "Referral", "Trade Show", "Social Media"]
const interests = ["All", "High", "Medium", "Low"]
const budgets = ["All", "Under $25,000", "$25,000-$50,000", "$50,000-$100,000", "$100,000+", "$200,000+"]

export default function Leads() {
  const [leads, setLeads] = useState(leadsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedSource, setSelectedSource] = useState("All")
  const [selectedInterest, setSelectedInterest] = useState("All")
  const [selectedBudget, setSelectedBudget] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    source: "",
    budget: "",
    timeline: "",
    notes: "",
  })

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" || lead.status === selectedStatus
    const matchesSource = selectedSource === "All" || lead.source === selectedSource
    const matchesInterest = selectedInterest === "All" || lead.interest === selectedInterest
    const matchesBudget = selectedBudget === "All" || lead.budget === selectedBudget

    return matchesSearch && matchesStatus && matchesSource && matchesInterest && matchesBudget
  })

  const handleAddLead = () => {
    const lead = {
      id: leads.length + 1,
      ...newLead,
      status: "New",
      score: 50,
      interest: "Medium",
      createdDate: new Date().toISOString().split("T")[0],
      lastActivity: new Date().toISOString().split("T")[0],
      avatar: "/placeholder.svg?height=32&width=32",
      tags: ["New Lead"],
    }
    setLeads([...leads, lead])
    setNewLead({
      name: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      source: "",
      budget: "",
      timeline: "",
      notes: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteLead = (id) => {
    setLeads(leads.filter((lead) => lead.id !== id))
  }

  const getStatusBadge = (status) => {
    const variants = {
      New: "outline",
      Contacted: "secondary",
      Qualified: "default",
      Nurturing: "secondary",
      Converted: "default",
      Lost: "destructive",
    }
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>
  }

  const getInterestBadge = (interest) => {
    const variants = {
      High: "destructive",
      Medium: "secondary",
      Low: "outline",
    }
    return <Badge variant={variants[interest] || "outline"}>{interest}</Badge>
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const totalLeads = leads.length
  const newLeads = leads.filter((l) => l.status === "New").length
  const qualifiedLeads = leads.filter((l) => l.status === "Qualified").length
  const avgScore = Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length)

  return (
    <div className="mt-3 space-y-6 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">Manage and nurture your sales prospects</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>Enter the lead details to add them to your pipeline.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  Company
                </Label>
                <Input
                  id="company"
                  value={newLead.company}
                  onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Position
                </Label>
                <Input
                  id="position"
                  value={newLead.position}
                  onChange={(e) => setNewLead({ ...newLead, position: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="source" className="text-right">
                  Source
                </Label>
                <Select onValueChange={(value) => setNewLead({ ...newLead, source: value })}>
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
                <Label htmlFor="budget" className="text-right">
                  Budget
                </Label>
                <Select onValueChange={(value) => setNewLead({ ...newLead, budget: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgets
                      .filter((b) => b !== "All")
                      .map((budget) => (
                        <SelectItem key={budget} value={budget}>
                          {budget}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="timeline" className="text-right">
                  Timeline
                </Label>
                <Input
                  id="timeline"
                  value={newLead.timeline}
                  onChange={(e) => setNewLead({ ...newLead, timeline: e.target.value })}
                  className="col-span-3"
                  placeholder="Q1 2024"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddLead}>
                Add Lead
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">In your pipeline</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newLeads}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualifiedLeads}</div>
            <p className="text-xs text-muted-foreground">Ready for sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScore}</div>
            <p className="text-xs text-muted-foreground">Lead quality score</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-[300px]"
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
            <Select value={selectedInterest} onValueChange={setSelectedInterest}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {interests.map((interest) => (
                  <SelectItem key={interest} value={interest}>
                    {interest}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedBudget} onValueChange={setSelectedBudget}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {budgets.map((budget) => (
                  <SelectItem key={budget} value={budget}>
                    {budget}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={lead.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">{lead.position}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{lead.email}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{getStatusBadge(lead.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.source}</Badge>
                  </TableCell>
                  <TableCell>{getInterestBadge(lead.interest)}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${getScoreColor(lead.score)}`}>{lead.score}</span>
                  </TableCell>
                  <TableCell>{lead.budget}</TableCell>
                  <TableCell>{lead.timeline}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteLead(lead.id)}>
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
        </CardContent>
      </Card>
    </div>
  )
}
