 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Progress } from "../../components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Users, TrendingUp, TrendingDown, Target, Calendar, Plus, Bell } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"

export default function LeadsDashboard() {
  const leadsStats = [
    {
      title: "Total No of Leads",
      value: "6,000",
      change: "-4.01%",
      trend: "down",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "No of New Leads",
      value: "120",
      change: "+20.01%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "No of Lost Leads",
      value: "30",
      change: "+55%",
      trend: "up",
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "No of Total Customers",
      value: "9,895",
      change: "+55%",
      trend: "up",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]

  const pipelineStats = [
    { stage: "Contacted", count: 50000, color: "#FF6B35" },
    { stage: "Opportunity", count: 25985, color: "#4ECDC4" },
    { stage: "Not Contacted", count: 12566, color: "#45B7D1" },
    { stage: "Closed", count: 8965, color: "#96CEB4" },
    { stage: "Lost", count: 2452, color: "#FFEAA7" },
  ]

  const leadsBySource = [
    { source: "Google", percentage: 40, color: "#FF6B35" },
    { source: "Paid", percentage: 35, color: "#4ECDC4" },
    { source: "Campaigns", percentage: 15, color: "#45B7D1" },
    { source: "Referrals", percentage: 10, color: "#96CEB4" },
  ]

  const recentFollowUp = [
    { name: "Alexander Jermai", role: "UI/UX Designer" },
    { name: "Doglas Martini", role: "Product Designer" },
    { name: "Daniel Esbella", role: "Project Manager" },
    { name: "Daniel Esbella", role: "Team Lead" },
    { name: "Doglas Martini", role: "Team Lead" },
  ]

  const notifications = [
    { message: "Lex Murphy requested access to UNIX", time: "Today at 9:42 AM" },
    { message: "Lex Murphy requested access to UNIX", time: "Today at 10:00 AM" },
    { message: "Lex Murphy requested access to UNIX", time: "Today at 10:50 AM" },
    { message: "Lex Murphy requested access to UNIX", time: "Today at 05:00 PM" },
  ]

  const topCountries = [
    { country: "Singapore", leads: 236, flag: "🇸🇬" },
    { country: "France", leads: 589, flag: "🇫🇷" },
    { country: "Norway", leads: 221, flag: "🇳🇴" },
    { country: "USA", leads: 350, flag: "🇺🇸" },
    { country: "UAE", leads: 221, flag: "🇦🇪" },
  ]

  const recentLeads = [
    { name: "Collins", company: "", stage: "Contacted", date: "14 Jan 2024", owner: "Hendry" },
    { name: "Konopelski", company: "", stage: "Closed", date: "21 Jan 2024", owner: "Guilory" },
    { name: "Adams", company: "", stage: "Lost", date: "20 Feb 2024", owner: "Jami" },
    { name: "Schumm", company: "", stage: "Not Contacted", date: "15 Mar 2024", owner: "Theresa" },
  ]

  const opportunities = [
    { name: "Pitch", value: "$45,985", status: "Not Contacted" },
    { name: "Initech", value: "$21,145", status: "Closed" },
    { name: "Umbrella Corp", value: "$15,685", status: "Contacted" },
    { name: "Capital Partners", value: "$12,105", status: "Contacted" },
    { name: "Massive Dynamic", value: "$2,546", status: "Lost" },
  ]

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Leads Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Manage and track your lead generation</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {leadsStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`rounded-full p-2 ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span className="ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Pipeline Stages and Opportunities */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Stages</CardTitle>
            <CardDescription>Lead distribution across pipeline stages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelineStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#FF6B35" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Opportunities</CardTitle>
            <CardDescription>Current opportunities by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunities.map((opp, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{opp.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{opp.name}</p>
                      <p className="text-xs text-muted-foreground">{opp.value}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      opp.status === "Contacted" ? "default" :
                      opp.status === "Closed" ? "success" :
                      opp.status === "Lost" ? "destructive" : "secondary"
                    }
                    className="text-xs"
                  >
                    {opp.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leads by Source and Top Countries */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
            <CardDescription>Lead generation sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadsBySource.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: source.color }} />
                      <span className="text-sm font-medium">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">{source.percentage}%</div>
                    </div>
                  </div>
                  <Progress value={source.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Leads by country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCountries.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="text-sm font-medium">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{country.leads}</div>
                    <div className="text-xs text-muted-foreground">leads</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Recent system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Follow Up and Recent Leads */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Follow Up</CardTitle>
            <CardDescription>Latest follow-up activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFollowUp.map((followUp, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/professional-male-avatar.png" />
                    <AvatarFallback>
                      {followUp.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{followUp.name}</p>
                    <p className="text-xs text-muted-foreground">{followUp.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest lead activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead Name</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Lead Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLeads.map((lead, index) => (
                  <TableRow key={index}>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          lead.stage === "Contacted" ? "default" :
                          lead.stage === "Closed" ? "success" :
                          lead.stage === "Lost" ? "destructive" : "secondary"
                        }
                        className="text-xs"
                      >
                        {lead.stage}
                      </Badge>
                    </TableCell>
                    <TableCell>{lead.date}</TableCell>
                    <TableCell>{lead.owner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}