import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Users, CheckCircle, Clock, AlertTriangle, FileText } from 'lucide-react' // Assuming shadcn icons or lucide-react installed

const stats = [
  { title: 'Total Projects', value: 300, change: '+10.54%', icon: Users, color: 'bg-blue-500' },
  { title: 'Completed Projects', value: 250, change: '+12.84%', icon: CheckCircle, color: 'bg-green-500' },
  { title: 'Pending Projects', value: 50, change: '-10.75%', icon: Clock, color: 'bg-yellow-500' },
  { title: 'New Projects', value: 30, change: '+15.74%', icon: FileText, color: 'bg-purple-500' },
]

const statusData = [
  { name: 'Completed', value: 40, color: '#10B981' },
  { name: 'In Progress', value: 20, color: '#3B82F6' },
  { name: 'Pending', value: 30, color: '#F59E0B' },
  { name: 'On Hold', value: 10, color: '#EF4444' },
]

const projects = [
  { id: 'PRO-001', name: 'Website Redesign', leader: 'Anthony Lewis', team: ['img1.jpg', 'img2.jpg'], deadline: '12 Sep 2024', priority: 'Low', status: 'Active' },
  { id: 'PRO-002', name: 'Mobile App Update', leader: 'Brian Villalobos', team: ['img3.jpg'], deadline: '20 Sep 2024', priority: 'High', status: 'Pending' },
  { id: 'PRO-003', name: 'Database Migration', leader: 'Carolyn Small', team: ['img4.jpg', 'img5.jpg', 'img6.jpg'], deadline: '05 Oct 2024', priority: 'Medium', status: 'In Progress' },
  { id: 'PRO-004', name: 'Security Audit', leader: 'Diana Poulson', team: ['img7.jpg'], deadline: '15 Oct 2024', priority: 'High', status: 'On Hold' },
  { id: 'PRO-005', name: 'UI/UX Improvements', leader: 'Erika Olsen', team: ['img8.jpg', 'img9.jpg'], deadline: '25 Oct 2024', priority: 'Low', status: 'Active' },
  { id: 'PRO-006', name: 'API Integration', leader: 'Frank Riley', team: ['img10.jpg'], deadline: '10 Nov 2024', priority: 'Medium', status: 'Completed' },
  { id: 'PRO-007', name: 'Performance Optimization', leader: 'Grace Cole', team: ['img11.jpg', 'img12.jpg'], deadline: '18 Nov 2024', priority: 'High', status: 'Pending' },
  { id: 'PRO-008', name: 'Content Management System', leader: 'Henry Barnes', team: ['img13.jpg'], deadline: '30 Nov 2024', priority: 'Low', status: 'In Progress' },
  { id: 'PRO-009', name: 'Cloud Migration', leader: 'Ivy Porter', team: ['img14.jpg', 'img15.jpg'], deadline: '08 Dec 2024', priority: 'Medium', status: 'Active' },
  { id: 'PRO-010', name: 'Testing Framework', leader: 'Jack Donovan', team: ['img16.jpg'], deadline: '20 Dec 2024', priority: 'High', status: 'On Hold' },
]

const statusColors = {
  Active: 'bg-green-500',
  Pending: 'bg-yellow-500',
  'In Progress': 'bg-blue-500',
  'On Hold': 'bg-red-500',
  Completed: 'bg-emerald-500',
}

const priorityColors = {
  Low: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  High: 'bg-red-100 text-red-800',
}

function  ProjectReport() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Smarthr Project Report Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of active projects and key metrics.</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Status Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Breakdown of projects by current status.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Latest updates on ongoing projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Leader</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.id}</TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.leader}</TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((img, idx) => (
                          <Avatar key={idx} className="border-2 border-white h-6 w-6">
                            <AvatarImage src={img} alt="Team member" />
                            <AvatarFallback>TM</AvatarFallback>
                          </Avatar>
                        ))}
                        {project.team.length > 3 && (
                          <Avatar className="border-2 border-white h-6 w-6 bg-gray-200">
                            <AvatarFallback>+{project.team.length - 3}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{project.deadline}</TableCell>
                    <TableCell>
                      <Badge className={priorityColors[project.priority]} variant="secondary">
                        {project.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[project.status]} variant="default">
                        {project.status}
                      </Badge>
                    </TableCell>
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

export default ProjectReport