import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, MessageSquare, Share2, Reply, Plus, User, Search, Menu, Verified } from "lucide-react"

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
    image: "https://picsum.photos/400/200", // Valid placeholder image
    timestamp: "2025-09-16T12:30:00",
    likes: 15,
    liked: true,
    comments: [
      {
        id: 1,
        user: { name: "Frank Hoffman", avatar: true },
        content: "Congratulations on the launch! I've been eagerly waiting for this product, and the special discount makes it even more exciting.",
        timestamp: "2025-09-16T12:45:00",
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
        replies: [],
      },
    ],
  },
]

const trendingTopics = [
  { hashtag: "#MotivationMonday", posts: "12.4K" },
  { hashtag: "#Innovation", posts: "8.7K" },
  { hashtag: "#Tech", posts: "5.3K" },
]

const whoToFollow = [
  { id: 1, name: "Emma Wilson", handle: "@emma_wilson", avatar: null, followed: false },
  { id: 2, name: "James Brown", handle: "@james_brown", avatar: null, followed: false },
]

export default function SocialFeed() {
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState({ content: "" })
  const [newComment, setNewComment] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddPostOpen, setIsAddPostOpen] = useState(false)
  const [error, setError] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [followState, setFollowState] = useState(whoToFollow)

  const validatePost = (post) => {
    if (!post.content) return "Content is required."
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
      comments: [],
    }
    setPosts([post, ...posts])
    setNewPost({ content: "" })
    setError("")
    setIsAddPostOpen(false)
  }

  const handleLikePost = (postId) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
      }
      return post
    }))
  }

  const handleAddComment = (postId) => {
    const commentContent = newComment[postId]?.content || ""
    if (!commentContent) return

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
    if (!replyContent) return

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
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-smarthr-background font-sans">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="sm:hidden text-smarthr-gray"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold text-smarthr-gray">Social Media</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-smarthr-lightGray" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:ring-smarthr-blue text-sm"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={null} />
                    <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-smarthr-gray">Current User</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-smarthr-gray">Profile</DropdownMenuItem>
                <DropdownMenuItem className="text-smarthr-gray">Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-smarthr-red">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-6 flex flex-col sm:flex-row gap-6">
        {/* Left Sidebar */}
        <div className={`w-full sm:w-64 ${isMenuOpen ? 'block' : 'hidden sm:block'}`}>
          <Card className="shadow-sm border-gray-200 mb-6">
            <CardContent className="p-4 text-center">
              <Avatar className="h-20 w-20 mx-auto mb-2">
                <AvatarImage src={null} />
                <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
              </Avatar>
              <h3 className="text-base font-medium text-smarthr-gray">Current User</h3>
              <p className="text-sm text-smarthr-lightGray">@current_user</p>
              <div className="flex justify-center gap-4 mt-2 text-sm text-smarthr-gray">
                <div>
                  <p className="font-medium">{posts.length}</p>
                  <p>Posts</p>
                </div>
                <div>
                  <p className="font-medium">1.2K</p>
                  <p>Followers</p>
                </div>
                <div>
                  <p className="font-medium">300</p>
                  <p>Following</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {["Home", "Profile", "Messages", "Photos", "Settings"].map((item) => (
                  <Button key={item} variant="ghost" className="w-full justify-start text-smarthr-gray hover:text-smarthr-blue">
                    {item}
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-2xl">
          <Card className="mb-6 shadow-sm border-gray-200">
            <CardContent className="p-4">
              <Textarea
                placeholder="What's on your mind?"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="border-gray-300 focus:ring-smarthr-blue text-sm"
                rows={3}
              />
              {error && <p className="text-smarthr-red text-sm mt-2">{error}</p>}
              <Button
                onClick={handleAddPost}
                className="mt-2 bg-smarthr-blue hover:bg-smarthr-blueHover text-white text-sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Post
              </Button>
            </CardContent>
          </Card>

          {filteredPosts.map((post) => (
            <Card key={post.id} className="mb-4 shadow-sm hover:shadow-md transition-shadow border-gray-200">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base font-medium text-smarthr-gray flex items-center gap-1">
                    {post.user.name}
                    {post.user.verified && <Verified className="h-4 w-4 text-smarthr-blue" />}
                  </CardTitle>
                  <p className="text-sm text-smarthr-lightGray">{post.user.handle} • {post.user.location}</p>
                  <p className="text-xs text-smarthr-lightGray">
                    {new Date(post.timestamp).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-smarthr-gray">{post.content}</p>
                {post.image && (
                  <img src={post.image} alt="Post" className="mt-2 rounded-lg w-full h-auto" style={{ maxHeight: "200px" }} />
                )}
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-1 text-sm ${post.liked ? "text-smarthr-red" : "text-smarthr-lightGray"} hover:text-smarthr-red`}
                    onClick={() => handleLikePost(post.id)}
                  >
                    <Heart className={`h-4 w-4 ${post.liked ? "fill-smarthr-red" : ""}`} />
                    {post.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-sm text-smarthr-lightGray hover:text-smarthr-blue"
                  >
                    <MessageSquare className="h-4 w-4" />
                    {post.comments.length}
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-sm text-smarthr-lightGray hover:text-smarthr-blue"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
                {post.comments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="border-l-2 border-gray-200 pl-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.user.avatar} />
                            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-smarthr-gray">{comment.user.name}</p>
                            <p className="text-xs text-smarthr-lightGray">
                              {new Date(comment.timestamp).toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-smarthr-gray mt-1">{comment.content}</p>
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="ml-6 mt-2 border-l-2 border-gray-200 pl-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={reply.user.avatar} />
                                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-smarthr-gray">{reply.user.name}</p>
                                <p className="text-xs text-smarthr-lightGray">
                                  {new Date(reply.timestamp).toLocaleString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  })}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-smarthr-gray mt-1">{reply.content}</p>
                          </div>
                        ))}
                        <div className="flex items-center gap-2 mt-2">
                          <Input
                            placeholder="Add a reply..."
                            value={newComment[`${post.id}-${comment.id}`]?.content || ""}
                            onChange={(e) =>
                              setNewComment({
                                ...newComment,
                                [`${post.id}-${comment.id}`]: { content: e.target.value },
                              })
                            }
                            className="text-sm border-gray-300 focus:ring-smarthr-blue"
                          />
                          <Button
                            variant="ghost"
                            className="text-smarthr-blue hover:text-smarthr-blueHover"
                            onClick={() =>
                              handleAddReply(post.id, comment.id, newComment[`${post.id}-${comment.id}`]?.content)
                            }
                          >
                            <Reply className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2 mt-4">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment[post.id]?.content || ""}
                    onChange={(e) => setNewComment({ ...newComment, [post.id]: { content: e.target.value } })}
                    className="text-sm border-gray-300 focus:ring-smarthr-blue"
                  />
                  <Button
                    variant="ghost"
                    className="text-smarthr-blue hover:text-smarthr-blueHover"
                    onClick={() => handleAddComment(post.id)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="w-full sm:w-80 hidden sm:block">
          <Card className="mb-6 shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-base font-medium text-smarthr-gray">Trending</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {trendingTopics.map((topic) => (
                <div key={topic.hashtag} className="flex justify-between text-sm text-smarthr-gray">
                  <span className="text-smarthr-blue">{topic.hashtag}</span>
                  <span>{topic.posts} Posts</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-base font-medium text-smarthr-gray">Who to Follow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {followState.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-smarthr-gray">{user.name}</p>
                      <p className="text-xs text-smarthr-lightGray">{user.handle}</p>
                    </div>
                  </div>
                  <Button
                    variant={user.followed ? "outline" : "default"}
                    className={`text-sm ${user.followed ? "border-smarthr-blue text-smarthr-blue" : "bg-smarthr-blue text-white hover:bg-smarthr-blueHover"}`}
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
