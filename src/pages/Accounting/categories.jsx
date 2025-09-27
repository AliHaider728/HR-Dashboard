import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter, 
} from "../../components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { Checkbox } from "../../components/ui/Checkbox";
import {
  Search,
  Plus,
  MoreHorizontal,
  Download,
  Edit,
  Trash2,
} from "lucide-react";

// Form validation schema
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  type: z.enum(["expense", "revenue"], {
    errorMap: () => ({ message: "Category type is required" }),
  }),
  parentId: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

// Mock API functions
const mockAPI = {
  getCategories: async (page = 1, limit = 10, filters = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const allCategories = [
      // ... (your existing categories array remains unchanged)
    ];
    let data = [...allCategories];
    const flattened = [];
    data.forEach((category) => {
      flattened.push({
        ...category,
        level: 0,
        isParent: true,
        subcategoriesCount: category.subcategories.length,
      });
      category.subcategories.forEach((sub) => {
        flattened.push({
          ...sub,
          level: 1,
          isParent: false,
          parentName: category.name,
        });
      });
    });
    let filteredData = [...flattened];
    if (filters.status && filters.status !== "all") {
      filteredData = filteredData.filter((cat) => cat.status === filters.status);
    }
    if (filters.type && filters.type !== "all") {
      filteredData = filteredData.filter((cat) => cat.type === filters.type);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchLower) ||
          (cat.parentName && cat.parentName.toLowerCase().includes(searchLower))
      );
    }
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = filteredData.slice(startIndex, endIndex);
    return {
      data: paginated,
      total: filteredData.length,
      page,
      limit,
      totalPages: Math.ceil(filteredData.length / limit),
    };
  },
  createCategory: async (category) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { ...category, id: Date.now(), createdAt: new Date().toISOString().split("T")[0] };
  },
  updateCategory: async (id, category) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { id, ...category };
  },
  deleteCategory: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return id;
  },
  bulkDelete: async (ids) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ids;
  },
};

// Toast Component
const Toast = ({ message, type = "success", duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(!!message);
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);
  if (!isVisible) return null;
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  return (
    <div
      className={`fixed top-4 right-4 z-[9999] ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm animate-in slide-in-from-right duration-300`}
    >
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: "expense",
      parentId: "",
      description: "",
      status: "active",
    },
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const filters = {
        search: searchTerm || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        type: typeFilter !== "all" ? typeFilter : undefined,
      };
      const response = await mockAPI.getCategories(currentPage, 10, filters);
      setCategories(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (error) {
      setToast({ message: "Failed to fetch categories", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage, searchTerm, statusFilter, typeFilter]);

  const handleCreateCategory = async (data) => {
    try {
      await mockAPI.createCategory(data);
      reset();
      setIsAddModalOpen(false);
      setToast({ message: "Category created successfully!", type: "success" });
      fetchCategories();
    } catch (error) {
      setToast({ message: "Failed to create category", type: "error" });
    }
  };

  const handleUpdateCategory = async (data) => {
    if (!editingCategory) return;
    try {
      await mockAPI.updateCategory(editingCategory.id, data);
      setIsEditModalOpen(false);
      setEditingCategory(null);
      setToast({ message: "Category updated successfully!", type: "success" });
      fetchCategories();
    } catch (error) {
      setToast({ message: "Failed to update category", type: "error" });
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category? This will also delete all subcategories.")) return;
    try {
      await mockAPI.deleteCategory(id);
      setToast({ message: "Category deleted successfully!", type: "success" });
      fetchCategories();
    } catch (error) {
      setToast({ message: "Failed to delete category", type: "error" });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedCategories.size === 0) return;
    if (!window.confirm(`Delete ${selectedCategories.size} selected categories?`)) return;
    try {
      const ids = Array.from(selectedCategories);
      await mockAPI.bulkDelete(ids);
      setSelectedCategories(new Set());
      setToast({ message: `Deleted ${ids.length} categories`, type: "success" });
      fetchCategories();
    } catch (error) {
      setToast({ message: "Failed to delete selected categories", type: "error" });
    }
  };

  const handleExport = () => {
    try {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "ID,Name,Type,Parent Category,Description,Status,Created At\n" +
        categories
          .map((cat) =>
            `"${cat.id}","${cat.name}","${cat.type}","${cat.parentName || ''}","${cat.description || ''}","${cat.status}","${cat.createdAt || ''}"`
          )
          .join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `categories_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setToast({ message: "Categories exported successfully!", type: "success" });
    } catch (error) {
      setToast({ message: "Failed to export categories", type: "error" });
    }
  };

  const getTypeBadge = (type) => {
    const variants = {
      expense: "bg-red-100 text-red-800 border border-red-200",
      revenue: "bg-green-100 text-green-800 border border-green-200",
    };
    return variants[type] || "bg-gray-100 text-gray-800 border border-gray-200";
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: "bg-green-100 text-green-800 border border-green-200",
      inactive: "bg-gray-100 text-gray-800 border border-gray-200",
    };
    return variants[status] || "bg-gray-100 text-gray-800 border border-gray-200";
  };

  const stats = [
    {
      title: "Total Categories",
      value: total.toString(),
      change: "+3%",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Main Categories",
      value: categories.filter((c) => c.isParent).length.toString(),
      change: "+1%",
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      title: "Subcategories",
      value: categories.filter((c) => !c.isParent).length.toString(),
      change: "+2%",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Active",
      value: categories.filter((c) => c.status === "active").length.toString(),
      change: "+5%",
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  useEffect(() => {
    if (editingCategory) {
      reset({
        name: editingCategory.name,
        type: editingCategory.type,
        parentId: editingCategory.parentId || "",
        description: editingCategory.description || "",
        status: editingCategory.status,
      });
    }
  }, [editingCategory, reset]);

  const CustomFormField = ({ control, name, label, placeholder, type = "text", options }) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-1">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label}
            </label>
            {type === "select" ? (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options &&
                    options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            ) : (
              <Input id={name} placeholder={placeholder} type={type} {...field} className="w-full" />
            )}
            {error && <span className="text-sm text-red-600">{error.message}</span>}
          </div>
        )}
      />
    );
  };

  return (
    <>
      <Toast message={toast.message} type={toast.type} duration={3000} />

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600">Manage expense and revenue categories</p>
          </div>
          <div className="flex gap-2">
            {selectedCategories.size > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkDelete}
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedCategories.size})
              </Button>
            )}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-400 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>Create a new expense or revenue category</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleCreateCategory)} className="space-y-4">
                  <CustomFormField
                    control={control}
                    name="name"
                    label="Category Name"
                    placeholder="e.g., Technology"
                  />
                  <CustomFormField
                    control={control}
                    name="type"
                    label="Category Type"
                    type="select"
                    placeholder="Select type"
                    options={[
                      { value: "expense", label: "Expense" },
                      { value: "revenue", label: "Revenue" },
                    ]}
                  />
                  <CustomFormField
                    control={control}
                    name="parentId"
                    label="Parent Category (Optional)"
                    placeholder="Leave empty for main category"
                  />
                  <CustomFormField
                    control={control}
                    name="description"
                    label="Description (Optional)"
                    placeholder="Brief description..."
                  />
                  <CustomFormField
                    control={control}
                    name="status"
                    label="Status"
                    type="select"
                    placeholder="Select status"
                    options={[
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                    ]}
                  />
                  <DialogFooter>
                    <Button type="submit" className="w-full">
                      Create Category
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`text-sm font-medium ${stat.color} flex items-center gap-1`}>
                    <span>{stat.change}</span>
                    <span className={`w-2 h-2 rounded-full ${stat.bg}`}></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedCategories.size === categories.length && categories.length > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories(new Set(categories.map((c) => c.id)));
                    } else {
                      setSelectedCategories(new Set());
                    }
                  }}
                />
                <CardTitle className="flex items-center">
                  Category Records ({total})
                </CardTitle>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={typeFilter}
                  onValueChange={(value) => {
                    setTypeFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-500 mb-6">Get started by creating your first category</p>
                <Button onClick={() => setIsAddModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Category
                </Button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedCategories.size === categories.length && categories.length > 0}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories(new Set(categories.map((c) => c.id)));
                              } else {
                                setSelectedCategories(new Set());
                              }
                            }}
                          />
                        </TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Parent</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id} className="hover:bg-gray-50">
                          <TableCell>
                            <Checkbox
                              checked={selectedCategories.has(category.id)}
                              onCheckedChange={(checked) => {
                                const newSelected = new Set(selectedCategories);
                                if (checked) {
                                  newSelected.add(category.id);
                                } else {
                                  newSelected.delete(category.id);
                                }
                                setSelectedCategories(newSelected);
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className={`flex items-center ${category.level === 1 ? "ml-6" : ""}`}>
                              {category.isParent && <span className="mr-2"></span>}
                              {category.level === 1 && <span className="mr-2"></span>}
                              <span>{category.name}</span>
                              {category.isParent && category.subcategoriesCount > 0 && (
                                <Badge variant="secondary" className="ml-2">
                                  {category.subcategoriesCount}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getTypeBadge(category.type)}>
                              {category.type.charAt(0).toUpperCase() + category.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {category.parentName ? (
                              <span className="text-sm text-gray-600">{category.parentName}</span>
                            ) : (
                              <span className="text-sm text-gray-400">Main Category</span>
                            )}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            <span className="text-sm text-gray-600">{category.description || "—"}</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(category.status)}>
                              {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-sm text-gray-500">
                            {category.createdAt}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <Dialog
                                  open={isEditModalOpen && editingCategory?.id === category.id}
                                  onOpenChange={() => {
                                    if (editingCategory?.id === category.id) {
                                      setIsEditModalOpen(false);
                                      setEditingCategory(null);
                                    }
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => {
                                        e.preventDefault();
                                        setEditingCategory(category);
                                        setIsEditModalOpen(true);
                                      }}
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md">
                                    <DialogHeader>
                                      <DialogTitle>Edit Category</DialogTitle>
                                      <DialogDescription>Update category details</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit(handleUpdateCategory)} className="space-y-4">
                                      <CustomFormField
                                        control={control}
                                        name="name"
                                        label="Category Name"
                                        placeholder="e.g., Technology"
                                      />
                                      <CustomFormField
                                        control={control}
                                        name="type"
                                        label="Category Type"
                                        type="select"
                                        placeholder="Select type"
                                        options={[
                                          { value: "expense", label: "Expense" },
                                          { value: "revenue", label: "Revenue" },
                                        ]}
                                      />
                                      <CustomFormField
                                        control={control}
                                        name="parentId"
                                        label="Parent Category"
                                        placeholder="Leave empty for main category"
                                      />
                                      <CustomFormField
                                        control={control}
                                        name="description"
                                        label="Description"
                                        placeholder="Brief description..."
                                      />
                                      <CustomFormField
                                        control={control}
                                        name="status"
                                        label="Status"
                                        type="select"
                                        placeholder="Select status"
                                        options={[
                                          { value: "active", label: "Active" },
                                          { value: "inactive", label: "Inactive" },
                                        ]}
                                      />
                                      <DialogFooter>
                                        <Button type="submit" className="w-full">
                                          Update Category
                                        </Button>
                                      </DialogFooter>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault();
                                    handleDeleteCategory(category.id);
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-2 py-4">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                    <div className="hidden sm:flex flex-1 justify-between items-center">
                      <div className="text-sm text-gray-700">Page {currentPage} of {totalPages}</div>
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const page = i + 1;
                            const isActive = page === currentPage;
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  isActive={isActive}
                                  onClick={() => setCurrentPage(page)}
                                  className={isActive ? "bg-blue-600 text-white" : ""}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Categories;