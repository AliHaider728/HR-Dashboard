 
import React, { useState } from "react"
import {
  Search,
  Upload,
  FolderPlus,
  Grid,
  List,
  Download,
  Share,
  Trash2,
  File,
  Folder,
  ImageIcon,
  FileText,
} from "lucide-react"

const FileManager = () => {
  const [viewMode, setViewMode] = useState("grid")
  const [currentPath, setCurrentPath] = useState(["Documents"])

  const files = [
    {
      id: 1,
      name: "Project Proposals",
      type: "folder",
      size: null,
      modified: "2024-01-15",
      items: 12,
    },
    {
      id: 2,
      name: "Financial Reports",
      type: "folder",
      size: null,
      modified: "2024-01-14",
      items: 8,
    },
    {
      id: 3,
      name: "Team Photos",
      type: "folder",
      size: null,
      modified: "2024-01-13",
      items: 24,
    },
    {
      id: 4,
      name: "Q1_Budget_2024.xlsx",
      type: "excel",
      size: "2.4 MB",
      modified: "2024-01-12",
    },
    {
      id: 5,
      name: "Company_Presentation.pptx",
      type: "powerpoint",
      size: "15.7 MB",
      modified: "2024-01-11",
    },
    {
      id: 6,
      name: "Employee_Handbook.pdf",
      type: "pdf",
      size: "3.2 MB",
      modified: "2024-01-10",
    },
    {
      id: 7,
      name: "Logo_Design.png",
      type: "image",
      size: "1.8 MB",
      modified: "2024-01-09",
    },
    {
      id: 8,
      name: "Meeting_Notes.docx",
      type: "word",
      size: "456 KB",
      modified: "2024-01-08",
    },
  ]

  const getFileIcon = (type) => {
    switch (type) {
      case "folder":
        return <Folder className="w-8 h-8 text-blue-500" />
      case "image":
        return <ImageIcon className="w-8 h-8 text-green-500" />
      case "pdf":
        return <FileText className="w-8 h-8 text-red-500" />
      case "excel":
        return <FileText className="w-8 h-8 text-green-600" />
      case "word":
        return <FileText className="w-8 h-8 text-blue-600" />
      case "powerpoint":
        return <FileText className="w-8 h-8 text-orange-500" />
      default:
        return <File className="w-8 h-8 text-gray-500" />
    }
  }

  const formatFileSize = (size) => {
    if (!size) return ""
    return size
  }

  const breadcrumbs = currentPath.map((path, index) => ({
    name: path,
    path: currentPath.slice(0, index + 1),
  }))

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">File Manager</h1>
          <p className="text-gray-600">Organize and manage your files</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <FolderPlus className="w-4 h-4" />
            New Folder
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Upload className="w-4 h-4" />
            Upload Files
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm">
            <button className="text-blue-600 hover:text-blue-800">Home</button>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <span className="text-gray-400">/</span>
                <button onClick={() => setCurrentPath(crumb.path)} className="text-blue-600 hover:text-blue-800">
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search files..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"
                } rounded-l-lg`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"
                } rounded-r-lg`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* File Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3">{getFileIcon(file.type)}</div>
                <h3 className="text-sm font-medium text-gray-900 truncate w-full mb-1">{file.name}</h3>
                <p className="text-xs text-gray-500">
                  {file.type === "folder" ? `${file.items} items` : formatFileSize(file.size)}
                </p>
                <p className="text-xs text-gray-400 mt-1">{file.modified}</p>

                {/* Actions (shown on hover) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2 flex space-x-1">
                  <button className="p-1 text-gray-400 hover:text-blue-600">
                    <Download className="w-3 h-3" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-600">
                    <Share className="w-3 h-3" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-3">{getFileIcon(file.type)}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{file.name}</div>
                        {file.type === "folder" && <div className="text-sm text-gray-500">{file.items} items</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatFileSize(file.size) || "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.modified}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Share className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Storage Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Usage</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Used Storage</span>
              <span>45.2 GB of 100 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span>Documents: 15.2 GB</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span>Images: 12.8 GB</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
              <span>Videos: 10.5 GB</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-500 rounded mr-2"></div>
              <span>Others: 6.7 GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileManager
