import { useState } from 'react'
import { Card, CardContent } from  "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from '../../components/ui/badge'
import { Search, Plus, Pin, Heart, ListFilter as Filter, Hash } from 'lucide-react'

const NotesApp = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Project Meeting Notes",
      content: "Discussed the new feature requirements and timeline. Need to follow up with the design team about mockups. #work #meeting",
      category: "work",
      color: "bg-yellow-100",
      isPinned: true,
      isFavorite: false,
      createdAt: "2024-01-15",
      tags: ["work", "meeting"]
    },
    {
      id: 2,
      title: "Shopping List",
      content: "Groceries for this week: milk, bread, eggs, fruits, vegetables. Don't forget to check the pantry first. #personal #shopping",
      category: "personal",
      color: "bg-green-100",
      isPinned: false,
      isFavorite: true,
      createdAt: "2024-01-14",
      tags: ["personal", "shopping"]
    },
    {
      id: 3,
      title: "React Learning Path",
      content: "1. Learn JSX syntax 2. Understand components 3. State management 4. Hooks 5. Context API 6. Testing #learning #react",
      category: "learning",
      color: "bg-blue-100",
      isPinned: false,
      isFavorite: false,
      createdAt: "2024-01-13",
      tags: ["learning", "react"]
    },
    {
      id: 4,
      title: "Weekend Plans",
      content: "Visit the museum, have lunch at the new restaurant, movie night with friends. Check weather forecast. #personal #weekend",
      category: "personal",
      color: "bg-purple-100",
      isPinned: false,
      isFavorite: true,
      createdAt: "2024-01-12",
      tags: ["personal", "weekend"]
    },
    {
      id: 5,
      title: "Code Review Checklist",
      content: "1. Check for code quality 2. Verify tests 3. Review documentation 4. Check performance 5. Security considerations #work #development",
      category: "work",
      color: "bg-orange-100",
      isPinned: true,
      isFavorite: false,
      createdAt: "2024-01-11",
      tags: ["work", "development"]
    },
    {
      id: 6,
      title: "Book Recommendations",
      content: "Clean Code by Robert Martin, The Pragmatic Programmer, Design Patterns. Add to reading list for this quarter. #learning #books",
      category: "learning",
      color: "bg-pink-100",
      isPinned: false,
      isFavorite: false,
      createdAt: "2024-01-10",
      tags: ["learning", "books"]
    }
  ])

  const categories = [
    { id: 'all', name: 'All Notes', count: notes.length },
    { id: 'work', name: 'Work', count: notes.filter(n => n.category === 'work').length },
    { id: 'personal', name: 'Personal', count: notes.filter(n => n.category === 'personal').length },
    { id: 'learning', name: 'Learning', count: notes.filter(n => n.category === 'learning').length }
  ]

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const pinnedNotes = filteredNotes.filter(note => note.isPinned)
  const regularNotes = filteredNotes.filter(note => !note.isPinned)

  const togglePin = (noteId) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
    ))
  }

  const toggleFavorite = (noteId) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note
    ))
  }

  const NoteCard = ({ note }) => (
    <Card className={`${note.color} hover:shadow-md transition-all duration-200 cursor-pointer group`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 group-hover:text-gray-900">
            {note.title}
          </h3>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                togglePin(note.id)
              }}
            >
              <Pin className={`w-3 h-3 ${note.isPinned ? 'fill-current text-blue-600' : ''}`} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(note.id)
              }}
            >
              <Heart className={`w-3 h-3 ${note.isFavorite ? 'fill-current text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {note.content}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              <Hash className="w-2 h-2 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="capitalize">{note.category}</span>
          <span>{note.createdAt}</span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Notes</h1>
        <p className="text-gray-600">Organize your thoughts and ideas</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            <Filter className="w-3 h-3" />
            {category.name}
            <Badge variant="secondary" className="ml-1">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Pin className="w-4 h-4" />
            Pinned Notes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pinnedNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Notes */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          All Notes ({regularNotes.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {regularNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No notes found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default NotesApp