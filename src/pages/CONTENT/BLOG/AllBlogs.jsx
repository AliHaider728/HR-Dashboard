import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Heart, MessageCircle, Share2, Star, Edit, Trash2, Plus } from "lucide-react";

const Blogs = () => {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [newForm, setNewForm] = useState({
    title: "",
    category: "",
    tags: [],
    description: "",
    status: "Active",
    image: "",
  });

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Evolution Active: The Future of HR Management",
      date: "05 Oct 2024",
      author: "Gertrude Bowie",
      authorImage: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=126&h=126&dpr=1&fit=crop",
      likes: 3000,
      comments: 454,
      shares: 102,
      reviews: 350,
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "HR Evolution",
      excerpt: "Discover how active evolution in HR practices is shaping the future of workplace management and employee engagement.",
      status: "Active",
      tags: ["HRMS", "Management"],
      description: "Full blog content here...",
    },
    {
      id: 2,
      title: "Ultimate Guide to Employee Onboarding",
      date: "05 Oct 2024",
      author: "Edward Marcus",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=126&h=126&dpr=1&fit=crop",
      likes: 2458,
      comments: 524,
      shares: 248,
      reviews: 450,
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "Onboarding Guide",
      excerpt: "A comprehensive guide to creating seamless onboarding experiences that boost retention and productivity from day one.",
      status: "Active",
      tags: ["Recruitment", "Onboarding"],
      description: "Full blog content here...",
    },
    {
      id: 3,
      title: "Security in HR Systems",
      date: "05 Oct 2024",
      author: "Mark Phillips",
      authorImage: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=126&h=126&dpr=1&fit=crop",
      likes: 3000,
      comments: 454,
      shares: 102,
      reviews: 350,
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "Security",
      excerpt: "Explore best practices for securing HR systems and protecting sensitive employee data.",
      status: "Active",
      tags: ["Security", "HRMS"],
      description: "Full blog content here...",
    },
    {
      id: 4,
      title: "Optimizing HR Workflows",
      date: "05 Oct 2024",
      author: "Nidia Hale",
      authorImage: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=126&h=126&dpr=1&fit=crop",
      likes: 3200,
      comments: 424,
      shares: 402,
      reviews: 250,
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "HR Optimization",
      excerpt: "Learn how to streamline HR workflows for maximum efficiency and employee satisfaction.",
      status: "Active",
      tags: ["Workflow", "HRMS"],
      description: "Full blog content here...",
    },
    {
      id: 5,
      title: "Employee Engagement Strategies",
      date: "05 Oct 2024",
      author: "Rebecca Dale",
      authorImage: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=126&h=126&dpr=1&fit=crop",
      likes: 2200,
      comments: 224,
      shares: 122,
      reviews: 450,
      image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "Engagement",
      excerpt: "Discover innovative strategies to boost employee engagement and workplace morale.",
      status: "Active",
      tags: ["Engagement", "HR"],
      description: "Full blog content here...",
    },
    {
      id: 6,
      title: "Employee Benefits and Retention",
      date: "05 Oct 2024",
      author: "Jimmy Johnson",
      authorImage: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=126&h=126&dpr=1&fit=crop",
      likes: 2800,
      comments: 284,
      shares: 182,
      reviews: 680,
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "Benefits",
      excerpt: "Understand the role of employee benefits in driving retention and satisfaction.",
      status: "Active",
      tags: ["Benefits", "Retention"],
      description: "Full blog content here...",
    },
    {
      id: 7,
      title: "Effective HR Management Practices",
      date: "05 Oct 2024",
      author: "Stanley Pierre",
      authorImage: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=126&h=126&dpr=1&fit=crop",
      likes: 4800,
      comments: 484,
      shares: 490,
      reviews: 850,
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "Management",
      excerpt: "Explore advanced HR management practices to optimize organizational performance.",
      status: "Active",
      tags: ["Management", "HRMS"],
      description: "Full blog content here...",
    },
    {
      id: 8,
      title: "HR Management Essentials",
      date: "05 Oct 2024",
      author: "Alice Garcia",
      authorImage: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=126&h=126&dpr=1&fit=crop",
      likes: 3000,
      comments: 454,
      shares: 102,
      reviews: 350,
      image: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "Management",
      excerpt: "Learn the essential components of effective HR management for modern workplaces.",
      status: "Active",
      tags: ["Management", "HR"],
      description: "Full blog content here...",
    },
    {
      id: 9,
      title: "Modern HR Management Techniques",
      date: "05 Oct 2024",
      author: "James Currier",
      authorImage: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=126&h=126&dpr=1&fit=crop",
      likes: 4000,
      comments: 554,
      shares: 202,
      reviews: 450,
      image: "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "Management",
      excerpt: "Discover modern techniques to enhance HR management and employee productivity.",
      status: "Active",
      tags: ["Management", "Innovation"],
      description: "Full blog content here...",
    },
  ]);

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setEditForm({ ...blog });
  };

  const handleSaveEdit = (id) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id ? { ...editForm, date: new Date().toLocaleDateString("en-GB") } : blog
      )
    );
    setEditingId(null);
    setEditForm({});
    alert("Blog updated successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      alert("Blog deleted successfully!");
    }
  };

  const handleInputChange = (field, value, isNew = false) => {
    if (isNew) {
      setNewForm((prev) => ({ ...prev, [field]: value }));
    } else {
      setEditForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddNewBlog = () => {
    if (!newForm.title || !newForm.category) {
      alert("Please fill in all required fields (Title and Category).");
      return;
    }
    const newBlog = {
      id: blogs.length + 1,
      title: newForm.title,
      date: new Date().toLocaleDateString("en-GB"),
      author: "Current User", // Placeholder; replace with actual user data if available
      authorImage: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=126&h=126&dpr=1&fit=crop",
      likes: 0,
      comments: 0,
      shares: 0,
      reviews: 0,
      image: newForm.image || "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: newForm.category,
      excerpt: newForm.description.slice(0, 100) + (newForm.description.length > 100 ? "..." : ""),
      status: newForm.status,
      tags: newForm.tags,
      description: newForm.description,
    };
    setBlogs((prev) => [...prev, newBlog]);
    setNewForm({
      title: "",
      category: "",
      tags: [],
      description: "",
      status: "Active",
      image: "",
    });
    setAddingNew(false);
    alert("Blog added successfully!");
  };

  if (editingId) {
    const blog = blogs.find((b) => b.id === editingId);
    return (
      <>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <div className="min-h-screen bg-gray-50 py-8 font-[Inter]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Button variant="ghost" onClick={() => setEditingId(null)} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
              <h1 className="text-3xl font-bold text-gray-900 font-[Poppins]">
                Edit Blog: {blog.title}
              </h1>
            </div>

            <Card className="bg-white">
              <CardContent className="p-6 space-y-6">
                {/* Featured Image */}
                <div className="space-y-2">
                  <Label htmlFor="featured-image">Featured Image</Label>
                  <p className="text-sm text-gray-500">Image should be below 4 MB</p>
                  <div className="flex items-center space-x-4">
                    {editForm.image && (
                      <img
                        src={editForm.image}
                        alt="Featured"
                        className="w-24 h-24 object-cover rounded"
                      />
                    )}
                    <Input
                      id="featured-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.size < 4 * 1024 * 1024) {
                          const reader = new FileReader();
                          reader.onload = (e) => handleInputChange("image", e.target.result);
                          reader.readAsDataURL(file);
                        } else {
                          alert("Image must be below 4MB");
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Blog Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Blog Title *</Label>
                  <Input
                    id="title"
                    value={editForm.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter blog title"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={editForm.category || ""}
                    onValueChange={(value) => handleInputChange("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HR Evolution">HR Evolution</SelectItem>
                      <SelectItem value="Onboarding Guide">Onboarding Guide</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="HR Optimization">HR Optimization</SelectItem>
                      <SelectItem value="Engagement">Engagement</SelectItem>
                      <SelectItem value="Benefits">Benefits</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags *</Label>
                  <div className="flex flex-wrap gap-2">
                    {editForm.tags?.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-200">
                        {tag}
                      </Badge>
                    ))}
                    <Input
                      placeholder="Add new tag"
                      className="flex-1 min-w-[120px]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const newTags = [...(editForm.tags || []), e.target.value];
                          handleInputChange("tags", newTags);
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editForm.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Write a new comment, send your team notification by typing @ followed by their name"
                    rows={10}
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editForm.status || "Active"}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleSaveEdit(editingId)}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  if (addingNew) {
    return (
      <>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <div className="min-h-screen bg-gray-50 py-8 font-[Inter]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Button variant="ghost" onClick={() => setAddingNew(false)} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
              <h1 className="text-3xl font-bold text-gray-900 font-[Poppins]">
                Add New Blog
              </h1>
            </div>

            <Card className="bg-white">
              <CardContent className="p-6 space-y-6">
                {/* Featured Image */}
                <div className="space-y-2">
                  <Label htmlFor="featured-image">Featured Image</Label>
                  <p className="text-sm text-gray-500">Image should be below 4 MB</p>
                  <div className="flex items-center space-x-4">
                    {newForm.image && (
                      <img
                        src={newForm.image}
                        alt="Featured"
                        className="w-24 h-24 object-cover rounded"
                      />
                    )}
                    <Input
                      id="featured-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.size < 4 * 1024 * 1024) {
                          const reader = new FileReader();
                          reader.onload = (e) => handleInputChange("image", e.target.result, true);
                          reader.readAsDataURL(file);
                        } else {
                          alert("Image must be below 4MB");
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Blog Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Blog Title *</Label>
                  <Input
                    id="title"
                    value={newForm.title}
                    onChange={(e) => handleInputChange("title", e.target.value, true)}
                    placeholder="Enter blog title"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={newForm.category}
                    onValueChange={(value) => handleInputChange("category", value, true)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HR Evolution">HR Evolution</SelectItem>
                      <SelectItem value="Onboarding Guide">Onboarding Guide</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="HR Optimization">HR Optimization</SelectItem>
                      <SelectItem value="Engagement">Engagement</SelectItem>
                      <SelectItem value="Benefits">Benefits</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags *</Label>
                  <div className="flex flex-wrap gap-2">
                    {newForm.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-200">
                        {tag}
                      </Badge>
                    ))}
                    <Input
                      placeholder="Add new tag"
                      className="flex-1 min-w-[120px]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const newTags = [...newForm.tags, e.target.value];
                          handleInputChange("tags", newTags, true);
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newForm.description}
                    onChange={(e) => handleInputChange("description", e.target.value, true)}
                    placeholder="Write a new comment, send your team notification by typing @ followed by their name"
                    rows={10}
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newForm.status}
                    onValueChange={(value) => handleInputChange("status", value, true)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setAddingNew(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddNewBlog}>Add Blog</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-gray-50 py-8 font-[Inter]">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/dashboard")}
                  aria-label="Go back to dashboard"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-500" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 font-[Poppins]">
                    Blog Posts
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Latest insights and articles on HR management and workplace trends
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="flex items-center space-x-2"
                onClick={() => setAddingNew(true)}
              >
                <Plus className="w-4 h-4" />
                <span>Add New Blog</span>
              </Button>
            </div>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {blogs.map((blog) => (
              <Card
                key={blog.id}
                className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 min-h-fit"
              >
                <div className="relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-orange-600 hover:bg-orange-700">
                    {blog.status}
                  </Badge>
                  <div className="absolute bottom-2 left-2 right-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      {blog.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <img
                      src={blog.authorImage}
                      alt={blog.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-sm font-medium text-gray-900">
                        {blog.author}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {blog.date}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{blog.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{blog.comments.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share2 className="w-4 h-4" />
                        <span>{blog.shares.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{blog.reviews.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mb-4">
                    {blog.tags?.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(blog)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;