 

import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  Building2,
  MessageSquare,
  Mail,
  FolderOpen,
  Briefcase,
  UserCheck,
  DollarSign,
  BarChart3,
  Clock,
  Target,
  Award,
  CreditCard,
} from "lucide-react"
import { cn } from "../lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu"

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Applications",
    icon: MessageSquare,
    items: [
      { title: "Chat", icon: MessageSquare, href: "/apps/chat" },
      { title: "Calendar", icon: Calendar, href: "/apps/calendar" },
      { title: "Email", icon: Mail, href: "/apps/email" },
      { title: "File Manager", icon: FolderOpen, href: "/apps/file-manager" },
    ],
  },
  {
    title: "Employees",
    icon: Users,
    items: [
      { title: "All Employees", icon: Users, href: "/employees" },
      { title: "Departments", icon: Building2, href: "/employees/departments" },
      { title: "Designations", icon: Award, href: "/employees/designations" },
      { title: "Holidays", icon: Calendar, href: "/employees/holidays" },
      { title: "Leaves", icon: Clock, href: "/employees/leaves" },
    ],
  },
  {
    title: "Projects",
    icon: Briefcase,
    items: [
      { title: "Projects", icon: Briefcase, href: "/projects" },
      { title: "Tasks", icon: FileText, href: "/projects/tasks" },
    ],
  },
  {
    title: "CRM",
    icon: UserCheck,
    items: [
      { title: "Contacts", icon: UserCheck, href: "/crm/contacts" },
      { title: "Companies", icon: Building2, href: "/crm/companies" },
      { title: "Deals", icon: Target, href: "/crm/deals" },
      { title: "Leads", icon: Users, href: "/crm/leads" },
    ],
  },
  {
    title: "Finance",
    icon: DollarSign,
    items: [
      { title: "Invoices", icon: FileText, href: "/finance/invoices" },
      { title: "Payments", icon: DollarSign, href: "/finance/payments" },
      { title: "Expenses", icon: CreditCard, href: "/finance/expenses" },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    href: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export default function HorizontalNav() {
  const location = useLocation()

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-2">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon

            if (item.items) {
              return (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-48 gap-1 p-2">
                      {item.items.map((subItem) => {
                        const SubIcon = subItem.icon
                        const isActive = location.pathname === subItem.href

                        return (
                          <NavigationMenuLink key={subItem.href} asChild>
                            <Link
                              to={subItem.href}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                                isActive && "bg-orange-50 text-orange-600 dark:bg-orange-900/20",
                              )}
                            >
                              <SubIcon className="h-4 w-4" />
                              {subItem.title}
                            </Link>
                          </NavigationMenuLink>
                        )
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            }

            const isActive = location.pathname === item.href

            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                      isActive && "bg-orange-50 text-orange-600 dark:bg-orange-900/20",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
