
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Progress } from "../../components/ui/progress"
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
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, DollarSign, TrendingUp, Target, Calendar } from "lucide-react"

// Sample deals data
const dealsData = [
  {
    id: 1,
    name: "Enterprise Software License",
    company: "TechCorp Solutions",
    contact: "John Anderson",
    value: 150000,
    stage: "Negotiation",
    probability: 75,
    expectedClose: "2024-01-15",
    owner: "Sarah Johnson",
    source: "Website",
    type: "New Business",
    priority: "High",
    description: "Annual enterprise software license renewal",
    createdDate: "2023-10-15",
    lastActivity: "2023-12-01",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Cloud Migration Project",
    company: "Innovate Inc",
    contact: "Sarah Mitchell",
    value: 75000,
    stage: "Proposal",
    probability: 60,
    expectedClose: "2024-02-28",
    owner: "Mike Davis",
    source: "Referral",
    type: "Upsell",
    priority: "Medium",
    description: "Complete cloud infrastructure migration",
    createdDate: "2023-11-01",
    lastActivity: "2023-11-28",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Startup Package",
    company: "Startup.io",
    contact: "Michael Chen",
    value: 25000,
    stage: "Qualification",
    probability: 40,
    expectedClose: "2024-03-30",
    owner: "Emily Brown",
    source: "LinkedIn",
    type: "New Business",
    priority: "Low",
    description: "Startup-friendly software package",
    createdDate: "2023-11-15",
    lastActivity: "2023-11-25",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Enterprise Expansion",
    company: "Enterprise Corp",
    contact: "Emily Rodriguez",
    value: 300000,
    stage: "Closed Won",
    probability: 100,
    expectedClose: "2023-12-15",
    owner: "David Wilson",
    source: "Cold Call",
    type: "Expansion",
    priority: "High",
    description: "Multi-year enterprise expansion deal",
    createdDate: "2023-09-01",
    lastActivity: "2023-12-02",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "Consulting Services",
    company: "Growth Solutions",
    contact: "David Kim",
    value: 50000,
    stage: "Closed Lost",
    probability: 0,
    expectedClose: "2023-11-30",
    owner: "Lisa Anderson",
    source: "Trade Show",
    type: "New Business",
    priority: "Medium",
    description: "Business consulting and optimization",
    createdDate: "2023-08-15",
    lastActivity: "2023-10-15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const stages = ["All", "Qualification", "Proposal", "Negotiation", "Closed Won", "Closed Lost"]
const priorities = ["All", "High", "Medium", "Low"]
const types = ["All", "New Business", "Upsell", "Expansion", "Renewal"]
const owners = ["All", "Sarah Johnson", "Mike Davis", "Emily Brown", "David Wilson", "Lisa Anderson"]

export default function Deals() {
  const [deals, setDeals] = useState(dealsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStage, setSelectedStage] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedOwner, setSelectedOwner] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newDeal, setNewDeal] = useState({
    name: "",
    company: "",
    contact: "",
    value: "",
    stage: "",
    probability: "",
    expectedClose: "",
    owner: "",
    type: "",
    priority: "",
    description: "",
  })

  // Filter deals
  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.contact.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = selectedStage === "All" || deal.stage === selectedStage
    const matchesPriority = selectedPriority === "All" || deal.priority === selectedPriority
    const matchesType = selectedType === "All" || deal.type === selectedType
    const matchesOwner = selectedOwner === "All" || deal.owner === selectedOwner

    return matchesSearch && matchesStage && matchesPriority && matchesType && matchesOwner
  })

  const handleAddDeal = () => {
    const deal = {
      id: deals.length + 1,
      ...newDeal,
      value: Number.parseInt(newDeal.value) || 0,
      probability: Number.parseInt(newDeal.probability) || 0,
      createdDate: new Date().toISOString().split("T")[0],
      lastActivity: new Date().toISOString().split("T")[0],
      avatar: "/placeholder.svg?height=32&width=32",
      source: "Manual",
    }
    setDeals([...deals, deal])
    setNewDeal({
      name: "",
      company: "",
      contact: "",
      value: "",
      stage: "",
      probability: "",
      expectedClose: "",
      owner: "",
      type: "",
      priority: "",
      description: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteDeal = (id) => {
    setDeals(deals.filter((deal) => deal.id !== id))
  }

  const getStageBadge = (stage) => {
    const variants = {
      Qualification: "outline",
      Proposal: "secondary",
      Negotiation: "default",
      "Closed Won": "default",
      "Closed Lost": "destructive",
    }
    return <Badge variant={variants[stage] || "outline"}>{stage}</Badge>
  }

  const getPriorityBadge = (priority) => {
    const variants = {
      High: "destructive",
      Medium: "secondary",
      Low: "outline",
    }
    return <Badge variant={variants[priority] || "outline"}>{priority}</Badge>
  }

  const totalDeals = deals.length
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const wonDeals = deals.filter((d) => d.stage === "Closed Won").length
  const avgDealSize = totalValue / totalDeals

  return (
    <div className="mt-3 space-y-6 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deals</h1>
          <p className="text-muted-foreground">Track and manage your sales opportunities</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Deal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Deal</DialogTitle>
              <DialogDescription>Create a new sales opportunity in your pipeline.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Deal Name
                </Label>
                <Input
                  id="name"
                  value={newDeal.name}
                  onChange={(e) => setNewDeal({ ...newDeal, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  Company
                </Label>
                <Input
                  id="company"
                  value={newDeal.company}
                  onChange={(e) => setNewDeal({ ...newDeal, company: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Contact
                </Label>
                <Input
                  id="contact"
                  value={newDeal.contact}
                  onChange={(e) => setNewDeal({ ...newDeal, contact: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="value" className="text-right">
                  Value ($)
                </Label>
                <Input
                  id="value"
                  type="number"
                  value={newDeal.value}
                  onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stage" className="text-right">
                  Stage
                </Label>
                <Select onValueChange={(value) => setNewDeal({ ...newDeal, stage: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages
                      .filter((s) => s !== "All")
                      .map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="probability" className="text-right">
                  Probability (%)
                </Label>
                <Input
                  id="probability"
                  type="number"
                  min="0"
                  max="100"
                  value={newDeal.probability}
                  onChange={(e) => setNewDeal({ ...newDeal, probability: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expectedClose" className="text-right">
                  Expected Close
                </Label>
                <Input
                  id="expectedClose"
                  type="date"
                  value={newDeal.expectedClose}
                  onChange={(e) => setNewDeal({ ...newDeal, expectedClose: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="owner" className="text-right">
                  Owner
                </Label>
                <Select onValueChange={(value) => setNewDeal({ ...newDeal, owner: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {owners
                      .filter((o) => o !== "All")
                      .map((owner) => (
                        <SelectItem key={owner} value={owner}>
                          {owner}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select onValueChange={(value) => setNewDeal({ ...newDeal, type: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types
                      .filter((t) => t !== "All")
                      .map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select onValueChange={(value) => setNewDeal({ ...newDeal, priority: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities
                      .filter((p) => p !== "All")
                      .map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newDeal.description}
                  onChange={(e) => setNewDeal({ ...newDeal, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddDeal}>
                Add Deal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeals}</div>
            <p className="text-xs text-muted-foreground">In your pipeline</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalValue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Pipeline value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Won Deals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wonDeals}</div>
            <p className="text-xs text-muted-foreground">Successfully closed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(avgDealSize / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Average value</p>
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
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedOwner} onValueChange={setSelectedOwner}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {owners.map((owner) => (
                  <SelectItem key={owner} value={owner}>
                    {owner}
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
                <TableHead>Deal</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Close Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{deal.name}</div>
                      <div className="text-sm text-muted-foreground">{deal.contact}</div>
                    </div>
                  </TableCell>
                  <TableCell>{deal.company}</TableCell>
                  <TableCell className="font-medium">${deal.value.toLocaleString()}</TableCell>
                  <TableCell>{getStageBadge(deal.stage)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={deal.probability} className="w-16" />
                      <span className="text-sm">{deal.probability}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(deal.priority)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={deal.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {deal.owner
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{deal.owner}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(deal.expectedClose).toLocaleDateString()}</TableCell>
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteDeal(deal.id)}>
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
