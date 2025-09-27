 
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Search,
  Plus,
  MoreHorizontal,
  Download,
  Edit,
  Trash2,
  FileText,
  BookOpen,
  HelpCircle,
  Users,
  Eye,
  Clock,
  Star,
  Filter,
  Grid3x3,
  List,
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  Share2,
  Bookmark,
  Calendar,
  User,
  ChevronRight,
  Lightbulb,
  Settings,
  Video,
  Image,
  Link,
  Tag,
  Target,
  Zap,
  Shield,
  Code,
  Database,
  Mail,
  Phone,
  Globe,
  Briefcase,
  AlertCircle,
  CheckCircle,
  XCircle,
  MinusCircle
} from "lucide-react"

// Toast Component
const Toast = ({ message, type = "success", duration = 3000 }) => {
  const [visible, setVisible] = useState(!!message)

  useEffect(() => {
    if (message) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), duration)
      return () => clearTimeout(timer)
    }
  }, [message, duration])

  if (!visible || !message) return null

  const bgColor = type === "success" ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-red-500 to-red-600"
  const IconComponent = type === "success" ? CheckCircle : AlertCircle

  return (
    <div className={`fixed top-4 right-4 z-[9999] ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-sm transform transition-all duration-500 ease-out ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <IconComponent className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}

// Form validation schema
const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  tags: z.string().optional(),
  status: z.string().min(1, "Status is required"),
})

// Mock data
const mockCategories = [
  {
    id: 1,
    name: "Getting Started",
    icon: Zap,
    description: "Basic setup and introduction guides",
    articleCount: 12,
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
    iconColor: "text-blue-600"
  },
  {
    id: 2,
    name: "Account Management",
    icon: User,
    description: "User accounts and profile settings",
    articleCount: 8,
    color: "bg-gradient-to-br from-green-50 to-green-100",
    iconColor: "text-green-600"
  },
  {
    id: 3,
    name: "Security & Privacy",
    icon: Shield,
    description: "Security features and privacy settings",
    articleCount: 15,
    color: "bg-gradient-to-br from-red-50 to-red-100",
    iconColor: "text-red-600"
  },
  {
    id: 4,
    name: "API Documentation",
    icon: Code,
    description: "Developer resources and API guides",
    articleCount: 23,
    color: "bg-gradient-to-br from-purple-50 to-purple-100",
    iconColor: "text-purple-600"
  },
  {
    id: 5,
    name: "Integrations",
    icon: Link,
    description: "Third-party integrations and connections",
    articleCount: 18,
    color: "bg-gradient-to-br from-orange-50 to-orange-100",
    iconColor: "text-orange-600"
  },
  {
    id: 6,
    name: "Troubleshooting",
    icon: Target,
    description: "Common issues and solutions",
    articleCount: 31,
    color: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    iconColor: "text-yellow-600"
  },
  {
    id: 7,
    name: "Billing & Payments",
    icon: Briefcase,
    description: "Payment methods and billing information",
    articleCount: 9,
    color: "bg-gradient-to-br from-indigo-50 to-indigo-100",
    iconColor: "text-indigo-600"
  },
  {
    id: 8,
    name: "Data Management",
    icon: Database,
    description: "Data import, export and management",
    articleCount: 14,
    color: "bg-gradient-to-br from-teal-50 to-teal-100",
    iconColor: "text-teal-600"
  }
]

const mockArticles = [
  {
    id: 1,
    title: "How to Get Started with SmartHR",
    category: "Getting Started",
    excerpt: "Learn the basics of setting up your SmartHR account and getting your team onboarded quickly.",
    content: "Complete guide to getting started...",
    author: "John Smith",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    views: 1250,
    likes: 45,
    status: "Published",
    tags: ["setup", "onboarding", "basics"],
    readTime: "5 min read",
    difficulty: "Beginner",
    type: "guide"
  },
  {
    id: 2,
    title: "Setting Up Two-Factor Authentication",
    category: "Security & Privacy",
    excerpt: "Enhance your account security by enabling two-factor authentication for all users.",
    content: "Step-by-step guide to 2FA setup...",
    author: "Sarah Johnson",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-22",
    views: 890,
    likes: 67,
    status: "Published",
    tags: ["security", "2FA", "authentication"],
    readTime: "3 min read",
    difficulty: "Intermediate",
    type: "tutorial"
  },
  {
    id: 3,
    title: "API Integration Best Practices",
    category: "API Documentation",
    excerpt: "Best practices for integrating with SmartHR APIs including authentication and rate limiting.",
    content: "Comprehensive API integration guide...",
    author: "Mike Chen",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    views: 567,
    likes: 23,
    status: "Published",
    tags: ["API", "integration", "development"],
    readTime: "8 min read",
    difficulty: "Advanced",
    type: "documentation"
  },
  {
    id: 4,
    title: "Common Login Issues and Solutions",
    category: "Troubleshooting",
    excerpt: "Resolve common login problems and learn how to help your team access their accounts.",
    content: "Troubleshooting login issues...",
    author: "Emma Wilson",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-28",
    views: 2100,
    likes: 89,
    status: "Published",
    tags: ["login", "troubleshooting", "access"],
    readTime: "4 min read",
    difficulty: "Beginner",
    type: "troubleshooting"
  }
]

const KnowledgeBase = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [articles, setArticles] = useState(mockArticles)
  const [categories] = useState(mockCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [viewMode, setViewMode] = useState('grid')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("success")
  const [loading, setLoading] = useState(false)

  const articleForm = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      tags: "",
      status: "Draft",
    },
  })

  const notify = (message, type = "success") => {
    setToastMessage(message)
    setToastType(type)
    setTimeout(() => setToastMessage(""), 3000)
  }

  const handleCreateArticle = async (data) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newArticle = {
        ...data,
        id: Date.now(),
        author: "Current User",
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        views: 0,
        likes: 0,
        readTime: "5 min read",
        difficulty: "Beginner",
        type: "guide",
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
      }
      
      setArticles(prev => [newArticle, ...prev])
      setIsAddModalOpen(false)
      articleForm.reset()
      notify("Article created successfully!")
    } catch (error) {
      notify("Failed to create article", "error")
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || article.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getStats = () => {
    const totalArticles = articles.length
    const publishedArticles = articles.filter(a => a.status === "Published").length
    const totalViews = articles.reduce((sum, a) => sum + a.views, 0)
    const totalLikes = articles.reduce((sum, a) => sum + a.likes, 0)

    return [
      {
        title: "Total Articles",
        value: totalArticles,
        change: "+12%",
        icon: FileText,
        color: "text-blue-600",
        bg: "bg-gradient-to-br from-blue-50 to-blue-100"
      },
      {
        title: "Published",
        value: publishedArticles,
        change: "+8%",
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-gradient-to-br from-green-50 to-green-100"
      },
      {
        title: "Total Views",
        value: totalViews.toLocaleString(),
        change: "+24%",
        icon: Eye,
        color: "text-purple-600",
        bg: "bg-gradient-to-br from-purple-50 to-purple-100"
      },
      {
        title: "Total Likes",
        value: totalLikes,
        change: "+15%",
        icon: ThumbsUp,
        color: "text-orange-600",
        bg: "bg-gradient-to-br from-orange-50 to-orange-100"
      }
    ]
  }

  const getTypeIcon = (type) => {
    const icons = {
      guide: BookOpen,
      tutorial: Video,
      documentation: Code,
      troubleshooting: Target,
      faq: HelpCircle
    }
    return icons[type] || FileText
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      "Beginner": "bg-green-50 text-green-700 border border-green-200",
      "Intermediate": "bg-yellow-50 text-yellow-700 border border-yellow-200",
      "Advanced": "bg-red-50 text-red-700 border border-red-200"
    }
    return colors[difficulty] || "bg-gray-50 text-gray-700 border border-gray-200"
  }

  return (
    <>
      <Toast message={toastMessage} type={toastType} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                Knowledge Base
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">Comprehensive documentation and guides for your team</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button 
                onClick={() => setIsAddModalOpen(true)} 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Article
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {getStats().map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
                  <CardContent className={`p-6 ${stat.bg} relative overflow-hidden`}>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                        <div className="flex items-center space-x-1">
                          <span className={`text-xs font-semibold ${stat.color}`}>{stat.change}</span>
                          <TrendingUp className={`w-3 h-3 ${stat.color}`} />
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <TabsList className="grid w-full sm:w-auto grid-cols-3 bg-white shadow-md border">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white"
                >
                  <Grid3x3 className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="articles"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Articles
                </TabsTrigger>
                <TabsTrigger 
                  value="categories"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  Categories
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="hidden sm:flex"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="hidden sm:flex"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-0 space-y-8">
              {/* Search Bar */}
              <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-gray-900">How can we help you?</h2>
                      <p className="text-gray-600">Search our knowledge base for answers</p>
                    </div>
                    <div className="max-w-2xl mx-auto relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Search for articles, guides, and documentation..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-4 py-4 text-lg border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Categories Grid */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Browse Categories</h2>
                  <Button variant="outline" size="sm">
                    View All Categories
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 cursor-pointer">
                        <CardContent className={`p-6 ${category.color} h-full`}>
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className={`p-3 rounded-xl ${category.iconColor.replace('text-', 'bg-').replace('-600', '-100')} group-hover:scale-110 transition-transform duration-200`}>
                                <IconComponent className={`w-6 h-6 ${category.iconColor}`} />
                              </div>
                              <Badge variant="secondary" className="bg-white/60 text-gray-700">
                                {category.articleCount} articles
                              </Badge>
                            </div>
                            
                            <div className="space-y-2">
                              <h3 className={`font-semibold text-gray-900 group-hover:${category.iconColor} transition-colors`}>
                                {category.name}
                              </h3>
                              <p className="text-sm text-gray-600">{category.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Popular Articles */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Popular Articles</h2>
                  <Button variant="outline" size="sm">
                    View All Articles
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.slice(0, 6).map((article) => {
                    const TypeIcon = getTypeIcon(article.type)
                    return (
                      <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-start justify-between">
                            <Badge className={getDifficultyColor(article.difficulty)} variant="secondary">
                              {article.difficulty}
                            </Badge>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Eye className="w-4 h-4" />
                              <span>{article.views}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <TypeIcon className="w-4 h-4 text-blue-600" />
                              <span className="text-xs font-medium text-blue-600 uppercase">{article.type}</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-3">{article.excerpt}</p>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-500">{article.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <ThumbsUp className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-500">{article.likes}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Articles Tab */}
            <TabsContent value="articles" className="mt-0">
              <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader className="pb-4 space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <CardTitle className="flex items-center text-xl">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" />
                      All Articles
                      <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                        {filteredArticles.length}
                      </Badge>
                    </CardTitle>
                  </div>

                  {/* Filters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    
                    <select 
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                    
                    <select 
                      value={selectedDifficulty} 
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    >
                      <option value="all">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    
                    <Button variant="outline" className="border-gray-200 hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {filteredArticles.length === 0 ? (
                    <div className="text-center py-16 px-6">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <FileText className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                      <p className="text-gray-500 mb-8 max-w-md mx-auto">Try adjusting your search or filters, or create a new article</p>
                      <Button onClick={() => setIsAddModalOpen(true)} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Article
                      </Button>
                    </div>
                  ) : (
                    <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                      {filteredArticles.map((article) => {
                        const TypeIcon = getTypeIcon(article.type)
                        
                        if (viewMode === 'list') {
                          return (
                            <Card key={article.id} className="hover:shadow-md transition-shadow border border-gray-200">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start space-x-4 flex-1">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                      <TypeIcon className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <Badge className={getDifficultyColor(article.difficulty)} variant="secondary">
                                          {article.difficulty}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                          {article.category}
                                        </Badge>
                                      </div>
                                      <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                                        {article.title}
                                      </h3>
                                      <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                                      <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                          <User className="w-3 h-3" />
                                          {article.author}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Calendar className="w-3 h-3" />
                                          {new Date(article.updatedAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Clock className="w-3 h-3" />
                                          {article.readTime}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end space-y-2">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                          <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Eye className="mr-2 h-4 w-4" />
                                          View Article
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit Article
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Share2 className="mr-2 h-4 w-4" />
                                          Share Article
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete Article
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                                      <span className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        {article.views}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <ThumbsUp className="w-4 h-4" />
                                        {article.likes}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        }
                        
                        return (
                          <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                            <CardContent className="p-6 space-y-4">
                              <div className="flex items-start justify-between">
                                <Badge className={getDifficultyColor(article.difficulty)} variant="secondary">
                                  {article.difficulty}
                                </Badge>
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <Eye className="w-4 h-4" />
                                  <span>{article.views}</span>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <TypeIcon className="w-4 h-4 text-blue-600" />
                                  <span className="text-xs font-medium text-blue-600 uppercase">{article.type}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {article.category}
                                  </Badge>
                                </div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                  {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-3">{article.excerpt}</p>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <div className="flex items-center space-x-2">
                                    <User className="w-3 h-3" />
                                    <span>{article.author}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="w-3 h-3" />
                                    <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs text-gray-500">{article.readTime}</span>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                                      <ThumbsUp className="w-4 h-4 text-gray-400" />
                                      <span className="text-xs text-gray-500 ml-1">{article.likes}</span>
                                    </Button>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="p-1 h-auto">
                                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Eye className="mr-2 h-4 w-4" />
                                          View Article
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit Article
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Share2 className="mr-2 h-4 w-4" />
                                          Share Article
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Bookmark className="mr-2 h-4 w-4" />
                                          Bookmark
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete Article
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="mt-0">
              <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-xl">
                    <Tag className="w-5 h-5 mr-2 text-blue-600" />
                    Categories Management
                    <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                      {categories.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((category) => {
                      const IconComponent = category.icon
                      return (
                        <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                          <CardContent className={`p-6 ${category.color} h-full`}>
                            <div className="space-y-4">
                              <div className="flex items-start justify-between">
                                <div className={`p-3 rounded-xl ${category.iconColor.replace('text-', 'bg-').replace('-600', '-100')} group-hover:scale-110 transition-transform duration-200`}>
                                  <IconComponent className={`w-6 h-6 ${category.iconColor}`} />
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit Category
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Articles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete Category
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <h3 className={`font-semibold text-gray-900 group-hover:${category.iconColor} transition-colors`}>
                                    {category.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                                </div>
                                
                                <div className="flex items-center justify-between pt-2 border-t border-white/20">
                                  <span className="text-sm text-gray-600">Articles</span>
                                  <div className="flex items-center space-x-1">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    <span className="font-semibold text-gray-900">{category.articleCount}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Add Article Modal */}
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                  <Plus className="w-6 h-6 text-blue-600" />
                  Create New Article
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Add a new article to your knowledge base to help your team and customers
                </DialogDescription>
              </DialogHeader>

              <Form {...articleForm}>
                <form onSubmit={articleForm.handleSubmit(handleCreateArticle)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={articleForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-sm font-semibold">Article Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., How to setup your account" 
                              {...field} 
                              className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={articleForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Category</FormLabel>
                          <FormControl>
                            <select 
                              {...field} 
                              className="flex h-11 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                              required
                            >
                              <option value="">Select a category</option>
                              {categories.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={articleForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Status</FormLabel>
                          <FormControl>
                            <select 
                              {...field} 
                              className="flex h-11 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                            >
                              <option value="Draft">Draft</option>
                              <option value="Published">Published</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={articleForm.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-sm font-semibold">Tags (comma separated)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., setup, tutorial, beginner" 
                              {...field} 
                              className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={articleForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-sm font-semibold">Content</FormLabel>
                          <FormControl>
                            <textarea
                              {...field}
                              rows={8}
                              placeholder="Write your article content here..."
                              className="flex w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <DialogFooter className="gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Create Article
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* Quick Help Section */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Need Help?</h3>
                  </div>
                  <p className="text-blue-100">
                    Can't find what you're looking for? Our support team is here to help you with any questions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                    <Button variant="outline" className="border-blue-200 text-white hover:bg-blue-600">
                      <Video className="w-4 h-4 mr-2" />
                      Video Tutorials
                    </Button>
                  </div>
                </div>
                <div className="hidden md:flex justify-end">
                  <div className="w-32 h-32 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-16 h-16 text-blue-200" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default KnowledgeBase