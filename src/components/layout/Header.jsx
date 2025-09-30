import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { useTheme } from "../layout/theme-provider";
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  Monitor,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ onMenuClick, sidebarCollapsed, onToggleSidebar, setIsAuthenticated }) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      console.log("Logging out..."); // Debug
      localStorage.removeItem("authToken");
      console.log("authToken removed:", localStorage.getItem("authToken")); // Debug
      setIsAuthenticated(false);
      console.log("isAuthenticated set to false"); // Debug
      navigate("/login", { replace: true });
      console.log("Navigated to /login"); // Debug
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>

      {/* Desktop sidebar toggle */}
      <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={onToggleSidebar}>
        {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </Button>

     <div className="  flex md:justify-between md:w-full w-auto"> {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search employees, projects, tasks..." className="pl-10" />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Messages */}
        <NavLink
          to="/chat"
          className="relative inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <MessageSquare className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"><span className="ml-1">3</span></Badge>
        </NavLink>

        {/* Email */}
        <NavLink
          to="/email"
          className="relative inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Mail className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"><span className="ml-1" >7</span></Badge>
        </NavLink>

        {/* Notifications */}
        <NavLink
          to="/calls/call-history"
          className="relative inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"><span className="ml-0.7 " >13</span></Badge>
        </NavLink>

        {/* Theme toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor className="mr-2 h-4 w-4" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/professional-headshot.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">john.doe@company.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings/website/appearance">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div></div>
    </header>
  );
}