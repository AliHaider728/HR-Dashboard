import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, MessageSquare, Share2, Reply, Plus, User, Search, Menu, Verified, TrendingUp, Bookmark, MoreHorizontal, Image as ImageIcon, Send } from "lucide-react"

const initialPosts = [
  {
    id: 1,
    user: {
      name: "Richard Smith",
      handle: "@richard442",
      location: "United Kingdom",
      avatar: null,
      verified: true,
    },
    content: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. #MotivationMonday #Inspiration 🌟",
    image: null, 
    timestamp: "2025-09-16T10:00:00",
    likes: 10,
    liked: false,
    bookmarked: false,
    comments: [],
  },
  {
    id: 2,
    user: {
      name: "Jason Heier",
      handle: "@jason118",
      location: "United Kingdom",
      avatar: true,
      verified: true,
    },
    content: "Sharing some updates! #Tech",
    image: "https://picsum.photos/400/200", 
    timestamp: "2025-09-16T11:00:00",
    likes: 5,
    liked: false,
    bookmarked: false,
    comments: [],
  },
  {
    id: 3,
    user: {
      name: "Sophie Headrick",
      handle: "@sophie241",
      location: "United Kingdom",
      avatar: null,
      verified: true,
    },
    content: "Excited to announce the launch of our new product! Get yours now and enjoy a special discount. #NewRelease #Innovation 🎉",
    image: "https://picsum.photos/400/200",
    timestamp: "2025-09-16T12:30:00",
    likes: 15,
    liked: true,
    bookmarked: false,
    comments: [
      {
        id: 1,
        user: { name: "Frank Hoffman", avatar: true },
        content: "Congratulations on the launch! I've been eagerly waiting for this product, and the special discount makes it even more exciting.",
        timestamp: "2025-09-16T12:45:00",
        likes: 3,
        liked: false,
        replies: [
          {
            id: 1,
            user: { name: "Sophie Headrick", avatar: true },
            content: "Thank you so much for your enthusiasm and support!",
            timestamp: "2025-09-16T12:50:00",
          },
        ],
      },
      {
        id: 2,
        user: { name: "Samuel Butler", avatar: true },
        content: "So thrilled to see this product finally launched! I've heard amazing things about it and am excited to see how it lives up to the hype.",
        timestamp: "2025-09-16T12:40:00",
        likes: 5,
        liked: false,
        replies: [],
      },
    ],
  },
]

const trendingTopics = [
  { hashtag: "#MotivationMonday", posts: "12.4K", trend: "+12%" },
  { hashtag: "#Innovation", posts: "8.7K", trend: "+8%" },
  { hashtag: "#Tech", posts: "5.3K", trend: "+5%" },
  { hashtag: "#NewRelease", posts: "3.2K", trend: "+15%" },
]

const whoToFollow = [
  { id: 1, name: "Emma Wilson", handle: "@emma_wilson", avatar: null, bio: "Digital Marketing Expert", followed: false },
  { id: 2, name: "James Brown", handle: "@james_brown", avatar: null, bio: "Tech Enthusiast", followed: false },
  { id: 3, name: "Sarah Johnson", handle: "@sarah_j", avatar: null, bio: "UX Designer", followed: false },
]

export default function SocialFeed() {
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState({ content: "" })
  const [newComment, setNewComment] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [followState, setFollowState] = useState(whoToFollow)
  const [activeTab, setActiveTab] = useState("feed")

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)
    
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  const validatePost = (post) => {
    if (!post.content?.trim()) return "Content is required."
    if (post.content.length > 280) return "Post must be 280 characters or less."
    return ""
  }

  const handleAddPost = () => {
    const validationError = validatePost(newPost)
    if (validationError) {
      setError(validationError)
      return
    }

    const post = {
      id: Date.now(),
      user: { name: "Current User", handle: "@current_user", location: "United Kingdom", avatar: null, verified: false },
      content: newPost.content,
      image: null,
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false,
      bookmarked: false,
      comments: [],
    }
    setPosts([post, ...posts])
    setNewPost({ content: "" })
    setError("")
  }

  const handleLikePost = (postId) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
      }
      return post
    }))
  }

  const handleBookmark = (postId) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return { ...post, bookmarked: !post.bookmarked }
      }
      return post
    }))
  }

  const handleLikeComment = (postId, commentId) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id === commentId) {
              return { 
                ...comment, 
                liked: !comment.liked, 
                likes: comment.liked ? comment.likes - 1 : comment.likes + 1 
              }
            }
            return comment
          }),
        }
      }
      return post
    }))
  }

  const handleAddComment = (postId) => {
    const commentContent = newComment[postId]?.content || ""
    if (!commentContent.trim()) return

    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              user: { name: "Current User", avatar: null },
              content: commentContent,
              timestamp: new Date().toISOString(),
              likes: 0,
              liked: false,
              replies: [],
            },
          ],
        }
      }
      return post
    }))
    setNewComment({ ...newComment, [postId]: { content: "" } })
  }

  const handleAddReply = (postId, commentId, replyContent) => {
    if (!replyContent?.trim()) return

    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: Date.now(),
                    user: { name: "Current User", avatar: null },
                    content: replyContent,
                    timestamp: new Date().toISOString(),
                  },
                ],
              }
            }
            return comment
          }),
        }
      }
      return post
    }))
    setNewComment({ ...newComment, [`${postId}-${commentId}`]: { content: "" } })
  }

  const handleFollow = (id) => {
    setFollowState(followState.map((user) => {
      if (user.id === id) {
        return { ...user, followed: !user.followed }
      }
      return user
    }))
  }

  const filteredPosts = posts.filter((post) =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-orange-50">
      {/* Top Navigation */}
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-6 flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar */}
        <div className={`w-full lg:w-72 ${isMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur mb-4 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-orange-500 to-orange-600"></div>
            <CardContent className="pt-0 pb-6 text-center -mt-12">
              <Avatar className="h-24 w-24 mx-auto mb-3 ring-4 ring-white">
                <AvatarImage src={null} />
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-500 text-white text-2xl">CU</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold text-gray-800">Current User</h3>
              <p className="text-sm text-gray-500">@current_user</p>
              <p className="text-xs text-gray-400 mt-1">Digital Creator & Influencer</p>
              <div className="flex justify-center gap-6 mt-4">
                <div>
                  <p className="text-xl font-bold text-gray-800">{posts.length}</p>
                  <p className="text-xs text-gray-500">Posts</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">1.2K</p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">300</p>
                  <p className="text-xs text-gray-500">Following</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-3">
              <nav className="space-y-1">
                {[
                  { name: "Feed", icon: MessageSquare },
                  { name: "Trending", icon: TrendingUp },
                  { name: "Bookmarks", icon: Bookmark },
                  { name: "Profile", icon: User },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <Button 
                      key={item.name} 
                      variant="ghost" 
                      className="w-full justify-start hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {item.name}
                    </Button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-2xl">
          {/* Create Post Card */}
          <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-orange-500/20">
                  <AvatarImage src={null} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-500 text-white text-sm">CU</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="What's happening?"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="border-gray-200 focus:ring-2 focus:ring-orange-500 resize-none"
                    rows={3}
                  />
                  {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-orange-600 hover:bg-orange-50">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{newPost.content.length}/280</span>
                      <Button
                        onClick={handleAddPost}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full px-6"
                        size="sm"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          {filteredPosts.map((post) => (
            <Card key={post.id} className="mb-4 shadow-lg hover:shadow-xl transition-all border-0 bg-white/80 backdrop-blur">
              <CardHeader className="flex flex-row items-start gap-3 pb-3">
                <Avatar className="h-12 w-12 ring-2 ring-orange-500/20">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                    {post.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1">
                        <CardTitle className="text-sm font-bold text-gray-800">{post.user.name}</CardTitle>
                        {post.user.verified && <Verified className="h-4 w-4 text-orange-500 fill-orange-500" />}
                      </div>
                      <p className="text-xs text-gray-500">{post.user.handle} · {formatTimestamp(post.timestamp)}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Report Post</DropdownMenuItem>
                        <DropdownMenuItem>Hide Post</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{post.content}</p>
                {post.image && (
                  <img 
                    src={post.image} 
                    alt="Post" 
                    className="rounded-xl w-full h-auto border border-gray-200" 
                    style={{ maxHeight: "400px", objectFit: "cover" }} 
                  />
                )}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-2 ${post.liked ? "text-red-500" : "text-gray-500"} hover:text-red-500 hover:bg-red-50`}
                    onClick={() => handleLikePost(post.id)}
                  >
                    <Heart className={`h-4 w-4 ${post.liked ? "fill-red-500" : ""}`} />
                    <span className="text-xs font-medium">{post.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs font-medium">{post.comments.length}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-500 hover:text-green-500 hover:bg-green-50"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-2 ${post.bookmarked ? "text-orange-500" : "text-gray-500"} hover:text-orange-500 hover:bg-orange-50`}
                    onClick={() => handleBookmark(post.id)}
                  >
                    <Bookmark className={`h-4 w-4 ${post.bookmarked ? "fill-orange-500" : ""}`} />
                  </Button>
                </div>

                {/* Comments Section */}
                {post.comments.length > 0 && (
                  <div className="mt-4 space-y-3 pl-2 border-l-2 border-gray-100">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="space-y-2">
                        <div className="flex gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.user.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-green-400 to-teal-500 text-white text-xs">
                              {comment.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs font-semibold text-gray-800">{comment.user.name}</p>
                              <span className="text-xs text-gray-400">{formatTimestamp(comment.timestamp)}</span>
                            </div>
                            <p className="text-xs text-gray-700">{comment.content}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-6 px-2 ${comment.liked ? "text-red-500" : "text-gray-500"} hover:text-red-500`}
                                onClick={() => handleLikeComment(post.id, comment.id)}
                              >
                                <Heart className={`h-3 w-3 mr-1 ${comment.liked ? "fill-red-500" : ""}`} />
                                <span className="text-xs">{comment.likes}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-gray-500 hover:text-orange-500"
                              >
                                <Reply className="h-3 w-3 mr-1" />
                                <span className="text-xs">Reply</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-2 ml-8">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={reply.user.avatar} />
                              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-500 text-white text-xs">
                                {reply.user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 bg-gray-50 rounded-lg p-2">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-xs font-semibold text-gray-800">{reply.user.name}</p>
                                <span className="text-xs text-gray-400">{formatTimestamp(reply.timestamp)}</span>
                              </div>
                              <p className="text-xs text-gray-700">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                        <div className="flex items-center gap-2 ml-10">
                          <Input
                            placeholder="Write a reply..."
                            value={newComment[`${post.id}-${comment.id}`]?.content || ""}
                            onChange={(e) =>
                              setNewComment({
                                ...newComment,
                                [`${post.id}-${comment.id}`]: { content: e.target.value },
                              })
                            }
                            className="text-xs h-8 bg-white border-gray-200"
                          />
                          <Button
                            size="sm"
                            className="h-8 bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={() =>
                              handleAddReply(post.id, comment.id, newComment[`${post.id}-${comment.id}`]?.content)
                            }
                          >
                            <Send className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment */}
                <div className="flex items-center gap-2 mt-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={null} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-500 text-white text-xs">CU</AvatarFallback>
                  </Avatar>
                  <Input
                    placeholder="Write a comment..."
                    value={newComment[post.id]?.content || ""}
                    onChange={(e) => setNewComment({ ...newComment, [post.id]: { content: e.target.value } })}
                    className="text-sm bg-gray-50 border-gray-200 focus:bg-white"
                  />
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => handleAddComment(post.id)}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 hidden lg:block space-y-4">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Now
              </CardTitle>
            </div>
            <CardContent className="p-4 space-y-3">
              {trendingTopics.map((topic, idx) => (
                <div key={topic.hashtag} className="hover:bg-gray-50 p-3 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-orange-600">{topic.hashtag}</span>
                    <span className="text-xs text-green-600 font-medium">{topic.trend}</span>
                  </div>
                  <p className="text-xs text-gray-500">{topic.posts} posts</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-gray-800">Who to Follow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {followState.map((user) => (
                <div key={user.id} className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-violet-400 to-purple-500 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.handle}</p>
                    <p className="text-xs text-gray-400 mt-1">{user.bio}</p>
                  </div>
                  <Button
                    size="sm"
                    variant={user.followed ? "outline" : "default"}
                    className={`${user.followed 
                      ? "border-orange-500 text-orange-600 hover:bg-orange-50" 
                      : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"} rounded-full px-4`}
                    onClick={() => handleFollow(user.id)}
                  >
                    {user.followed ? "Following" : "Follow"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}