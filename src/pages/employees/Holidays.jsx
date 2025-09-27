import { useState } from "react"
import { Calendar, Plus, Edit, Trash2, Search } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

const holidaysData = [
  {
    id: 1,
    title: "New Year's Day",
    date: "2024-01-01",
    type: "Public Holiday",
    description: "New Year celebration",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Independence Day",
    date: "2024-08-15",
    type: "National Holiday",
    description: "Independence Day celebration",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Christmas Day",
    date: "2024-12-25",
    type: "Public Holiday",
    description: "Christmas celebration",
    status: "Upcoming",
  },
  {
    id: 4,
    title: "Diwali",
    date: "2024-11-12",
    type: "Festival",
    description: "Festival of lights",
    status: "Upcoming",
  },
]

export default function Holidays() {
  const [holidays, setHolidays] = useState(holidaysData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredHolidays = holidays.filter((holiday) => {
    const matchesSearch = holiday.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || holiday.type === filterType
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800"
      case "Ongoing":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-ful mt-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Holidays</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage company holidays and events</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Holiday
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Holiday</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Holiday Title</Label>
                <Input id="title" placeholder="Enter holiday title" />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Public Holiday">Public Holiday</SelectItem>
                    <SelectItem value="National Holiday">National Holiday</SelectItem>
                    <SelectItem value="Festival">Festival</SelectItem>
                    <SelectItem value="Company Holiday">Company Holiday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter description" />
              </div>
              <Button className="w-full">Add Holiday</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Holidays</p>
                <p className="text-2xl font-bold">{holidays.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold">{holidays.filter((h) => h.status === "Upcoming").length}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Public Holidays</p>
                <p className="text-2xl font-bold">{holidays.filter((h) => h.type === "Public Holiday").length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Festivals</p>
                <p className="text-2xl font-bold">{holidays.filter((h) => h.type === "Festival").length}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Holiday List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search holidays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Public Holiday">Public Holiday</SelectItem>
                <SelectItem value="National Holiday">National Holiday</SelectItem>
                <SelectItem value="Festival">Festival</SelectItem>
                <SelectItem value="Company Holiday">Company Holiday</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Holiday</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHolidays.map((holiday) => (
                <TableRow key={holiday.id}>
                  <TableCell className="font-medium">{holiday.title}</TableCell>
                  <TableCell>{new Date(holiday.date).toLocaleDateString()}</TableCell>
                  <TableCell>{holiday.type}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(holiday.status)}>{holiday.status}</Badge>
                  </TableCell>
                  <TableCell>{holiday.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
