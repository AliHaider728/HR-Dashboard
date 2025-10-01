import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  DollarSign,
  MessageSquare,
  Settings,
  X,
  ChevronDown,
  Target,
  TrendingUp,
  BarChart3,
  Building2,
  CreditCard,
  Package,
  Globe,
  ShoppingCart,
  TimerResetIcon,
  Calendar,
  Mail,
  FileText,
  List,
  File,
  Kanban,
  FileSpreadsheet,
  Clock,
  Award,
  Shield,
  Lock,
  Bell,
  Palette,
  Code,
  Map,
  HelpCircle,
  UserCheck,
  BookOpen,
  Tags,
  MessageCircle,
  Activity,
  Share2,
  FileBarChart,
} from "lucide-react";

const menuSections = [
  {
    sectionTitle: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        items: [
          { title: "Admin Dashboard", href: "/" },
          { title: "Employee Dashboard", href: "/EmployeeDashboard" },
          { title: "Deals Dashboard", href: "/DealsDasboard" },
          { title: "Leads Dashboard", href: "/LeadsDashboard" },
        ],
      },
      {
        title: "Super Admin",
        icon: Settings,
        items: [
          { title: "Dashboard", href: "/super-admin/dashboard" },
          { title: "Companies", href: "/super-admin/companies" },
          { title: "Subscriptions", href: "/super-admin/subscription" },
          { title: "Packages", href: "/super-admin/packages" },
          { title: "Domain", href: "/super-admin/domain" },
          {
            title: "Purchase Transaction",
            href: "/super-admin/purchase-transaction",
          },
        ],
      },
      {
        title: "Applications",
        icon: MessageSquare,
        items: [
          { title: "Chat", href: "/chat", badge: "5" },
          {
            title: "Calls",
            items: [
              { title: "Voice Call", href: "/calls/voice-call" },
              { title: "Video Call", href: "/calls/video-call" },
              { title: "Outgoing Call", href: "/calls/outgoing-call" },
              { title: "Incoming Call", href: "/calls/incoming-call" },
              { title: "Call History", href: "/calls/call-history" },
            ],
          },
          { title: "Calendar", href: "/calendar" },
          { title: "Email", href: "/email", badge: "12" },
          { title: "To Do", href: "/todo" },
          { title: "Notes", href: "/notes" },
          { title: "Social Feed", href: "/SocialFeed" },
          { title: "File Manager", href: "/file-manager" },
          { title: "Kanban", href: "/kanban" },
          { title: "Invoices", href: "/invoices" },
        ],
      },
      { title: "Clients", href: "/clients", icon: Users },
      {
        title: "Projects",
        icon: Briefcase,
        items: [
          { title: "Projects", href: "/projects" },
          { title: "Tasks", href: "/tasks" },
          { title: "Task Board", href: "/task-board" },
        ],
      },
    ],
  },
  {
    sectionTitle: "CRM",
    items: [
      { title: "Contacts", href: "/contacts", icon: Users },
      { title: "Companies", href: "/companies", icon: Building2 },
      { title: "Deals", href: "/deals", icon: FileText },
      { title: "Leads", href: "/leads", icon: TrendingUp },
      { title: "Pipeline", href: "/pipeline", icon: List },
      { title: "Analytics", href: "/analytics", icon: BarChart3 },
      { title: "Activities", href: "/help/activities", icon: Activity },
    ],
  },
  {
    sectionTitle: "HRM",
    items: [
      {
        title: "Employees",
        icon: Users,
        items: [
          { title: "Employee Lists", href: "/Employees" },
          { title: "Employee Grid", href: "/EmployeesGrid" },
          { title: "Employee Details", href: "/employeesDetails" },
        ],
      },
      { title: "Departments", href: "/departments", icon: Building2 },
      { title: "Designations", href: "/designations", icon: Award },
      {
        title: "Tickets",
        icon: FileText,
        items: [
          { title: "Tickets", href: "/tickets" },
          { title: "Ticket Details", href: "/tickets/details" },
        ],
      },
      { title: "Holidays", href: "/holidays", icon: Calendar },
      {
        title: "Attendance",
        icon: Clock,
        items: [
          {
            title: "Leaves",
            items: [
              { title: "Leaves (Admin)", href: "/leaves" },
              {
                title: "Leave (Employee)",
                href: "/attendance/leaves/employee",
              },
              
            ],
          },
          { title: "Attendance (Admin)", href: "/attendance/admin" },
          { title: "Attendance (Employee)", href: "/attendance/employee" },
          { title: "Timesheets", href: "/timesheets" },
          { title: "Shift & Schedule", href: "/shift-schedule" },
          { title: "Overtime", href: "/overtime" },
        ],
      },
      {
        title: "Performance",
        icon: TrendingUp,
        items: [
          { title: "Performance Indicator", href: "/performance/indicator" },
          { title: "Performance Review", href: "/performance/review" },
          { title: "Performance Appraisal", href: "/performance/appraisal" },
          { title: "Goal List", href: "/performance/goals" },
          { title: "Goal Type", href: "/performance/goal-types" },
        ],
      },
      {
        title: "Training",
        icon: Award,
        items: [
          { title: "Training List", href: "/training" },
          { title: "Trainers", href: "/training/trainers" },
          { title: "Training Type", href: "/training/types" },
        ],
      },
      { title: "Promotion", href: "/promotion", icon: Award },
      { title: "Resignation", href: "/resignation", icon: FileText },
      { title: "Termination", href: "/termination", icon: FileText },
    ],
  },
  {
    sectionTitle: "RECRUITMENT",
    items: [
      { title: "Jobs", href: "/Jobs", icon: Briefcase },
      { title: "Candidates", href: "/Candidates", icon: Users },
      { title: "Referrals", href: "/Referrals", icon: Share2 },
    ],
  },
  {
    sectionTitle: "FINANCE & ACCOUNTS",
    items: [
      {
        title: "Sales",
        icon: DollarSign,
        items: [
          { title: "Estimates", href: "/estimates" },
          { title: "Invoices", href: "/invoices" },
          { title: "Payments", href: "/payments" },
          { title: "Expenses", href: "/expenses" },
          { title: "Provident Fund", href: "/ProvidentFund" },
          { title: "Taxes", href: "/taxes" },
        ],
      },
      {
        title: "Accounting",
        icon: BarChart3,
        items: [
          { title: "Categories", href: "/accounting/categories" },
          { title: "Budgets", href: "/accounting/budgets" },
          { title: "Budget Expenses", href: "/accounting/budget-expenses" },
          { title: "Budget Revenues", href: "/budget-revenues" },
        ],
      },
      {
        title: "Payroll",
        icon: CreditCard,
        items: [
          { title: "Employee Salary", href: "/employee-salary" },
          { title: "Payslip", href: "/payslip" },
          { title: "Payroll Items", href: "/payroll/items" },
        ],
      },
    ],
  },
  {
    sectionTitle: "ADMINISTRATION",
    items: [
      {
        title: "Assets",
        icon: Package,
        items: [
          { title: "Assets", href: "/Assets" },
          { title: "Asset Categories", href: "/assets/categories" },
        ],
      },
      {
        title: "Help & Supports",
        icon: MessageSquare,
        items: [
          { title: "Knowledge Base", href: "/help/knowledge-base" },
          { title: "Activities", href: "/help/activities" },
        ],
      },
      {
        title: "User Management",
        icon: Users,
        items: [
          { title: "Users", href: "/users" },
          { title: "Roles & Permissions", href: "/roles-permissions" },
        ],
      },
    ],
  },
  {
    sectionTitle: "REPORTS",
    items: [
      { title: "Expense Report", href: "/reports/expense", icon: DollarSign },
      { title: "Invoice Report", href: "/reports/invoice", icon: FileText },
      { title: "Payment Report", href: "/reports/payment", icon: CreditCard },
      { title: "Project Report", href: "/reports/project", icon: Briefcase },
      { title: "Task Report", href: "/reports/task", icon: List },
      { title: "User Report", href: "/reports/user", icon: Users },
      { title: "Employee Report", href: "/reports/employee", icon: UserCheck },
      { title: "Payslip Report", href: "/reports/payslip", icon: FileText },
      { title: "Attendance Report", href: "/reports/attendance", icon: Clock },
      { title: "Leave Report", href: "/reports/leave", icon: FileText },
      {
        title: "Daily Report",
        href: "/reports/DailyReport",
        icon: FileBarChart,
      },
    ],
  },
  {
    sectionTitle: "SETTINGS",
    items: [
      {
        title: "General Settings",
        icon: Settings,
        items: [
          { title: "Profile", href: "/profile" },
          { title: "Security", href: "/security" },
          { title: "Notifications", href: "/notifications" },
          { title: "connected-apps", href: "/connected-apps" },
        ],
      },
      {
        title: "Website Settings",
        icon: Globe,
        items: [
          { title: "Business Settings", href: "/settings/website/business" },
          { title: "SEO Settings", href: "/settings/website/seo" },
          { title: "Appearance", href: "/settings/website/appearance" },
          { title: "Language", href: "/settings/website/language" },
        ],
      },
      {
        title: "App Settings",
        icon: Settings,
        items: [
          { title: "Salary Settings", href: "/settings/app/salary" },
          { title: "Approval Settings", href: "/settings/app/approval" },
        ],
      },
      {
        title: "System Settings",
        icon: Settings,
        items: [
          { title: "Email Settings", href: "/settings/system/email" },
          { title: "SMS Settings", href: "/settings/system/sms" },
          { title: "OTP", href: "/settings/system/otp" },
        ],
      },
      {
        title: "Financial Settings",
        icon: DollarSign,
        items: [
          {
            title: "Payment Gateways",
            href: "/settings/financial/payment-gateways",
          },
          { title: "Tax Rate", href: "/settings/financial/tax-rate" },
          { title: "Currencies", href: "/settings/financial/currencies" },
        ],
      },
    ],
  },
  {
    sectionTitle: "CONTENT",
    items: [
      { title: "Pages", href: "/content/pages", icon: File },
      {
        title: "Blogs",
        icon: BookOpen,
        items: [
          { title: "All Blogs", href: "/content/blogs/all" },
          { title: "Categories", href: "/content/blogs/categories" },
          { title: "Comments", href: "/content/blogs/comments" },
          { title: "Tags", href: "/content/blogs/tags" },
        ],
      },
      {
        title: "Locations",
        icon: Map,
        items: [
          { title: "Countries", href: "/content/locations/countries" },
          { title: "States", href: "/content/locations/states" },
          { title: "Cities", href: "/content/locations/cities" },
        ],
      },
      {
        title: "Testimonials",
        href: "/content/testimonials",
        icon: MessageSquare,
      },
      { title: "FAQ's", href: "/content/faqs", icon: HelpCircle },
    ],
  },
];

export default function Sidebar({
  open,
  collapsed,
  onClose,
  onToggleCollapse,
}) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState(new Set());

  const toggleExpanded = (title) => {
    setExpandedItems((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(title)) {
        newExpanded.delete(title);
      } else {
        newExpanded.add(title);
      }
      return newExpanded;
    });
  };

  const isActive = (href) => {
    return (
      location.pathname === href || location.pathname.startsWith(href + "/")
    );
  };

  const hasActiveChild = (items) => {
    return items?.some((item) => {
      if (item.href) {
        return isActive(item.href);
      }
      if (item.items) {
        return hasActiveChild(item.items);
      }
      return false;
    });
  };

  const renderSubItems = (items, level = 0, isMobile = false) => {
    return items.map((subItem) => {
      if (!subItem.items || subItem.items.length === 0) {
        return (
          <Button
            key={subItem.href}
            variant={isActive(subItem.href) ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "w-full justify-start gap-2 h-9 font-normal text-sm rounded-md",
              level > 0 && "ml-4",
              isActive(subItem.href) && "bg-primary/10 text-primary font-medium"
            )}
            asChild
            onClick={isMobile ? onClose : undefined}
          >
            <Link to={subItem.href} className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/40 shrink-0" />
              <span className="truncate">{subItem.title}</span>
              {subItem.badge && (
                <Badge
                  variant="secondary"
                  className="ml-auto h-5 px-1.5 text-xs bg-primary text-primary-foreground"
                >
                  {subItem.badge}
                </Badge>
              )}
            </Link>
          </Button>
        );
      }

      const isSubExpanded = expandedItems.has(subItem.title);
      const hasActiveNestedChild = hasActiveChild(subItem.items);

      return (
        <div key={subItem.title} className="space-y-1">
          <Button
            variant={hasActiveNestedChild ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "w-full justify-start gap-2 h-9 font-normal text-sm rounded-md",
              level > 0 && "ml-4",
              hasActiveNestedChild && "bg-primary/10 text-primary"
            )}
            onClick={() => toggleExpanded(subItem.title)}
          >
            <div className="w-2 h-2 rounded-full bg-muted-foreground/40 shrink-0" />
            <span className="flex-1 text-left truncate">{subItem.title}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isSubExpanded && "rotate-180"
              )}
            />
          </Button>

          {isSubExpanded && (
            <div className="ml-3 border-l border-border pl-3 space-y-1">
              {renderSubItems(subItem.items, level + 1, isMobile)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-16" : "w-[270px]",
          "hidden lg:block"
        )}
      >
        <div className="flex h-16 items-center border-b border-sidebar-border px-4">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://smarthr.co.in/demo/html/template/assets/img/logo.svg"
                alt="SmartHR"
                className="h-8 w-auto"
              />
            </Link>
          )}
          {collapsed && (
            <img
              src="https://smarthr.co.in/demo/html/template/assets/img/logo.svg"
              alt="SmartHR"
              className="h-8 w-8 mx-auto"
            />
          )}
        </div>

        <ScrollArea className="flex-1 px-4 py-4 h-[calc(100vh-4rem)]">
          <nav className="space-y-6">
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-3">
                {!collapsed && (
                  <div className="px-2">
                    <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                      {section.sectionTitle}
                    </h3>
                  </div>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isExpanded = expandedItems.has(item.title);
                    const hasChildren = item.items && item.items.length > 0;
                    const isItemActive = hasChildren
                      ? hasActiveChild(item.items)
                      : isActive(item.href);

                    if (!hasChildren) {
                      return (
                        <Button
                          key={item.title}
                          variant={isItemActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3 h-10 font-medium text-sm rounded-lg",
                            collapsed && "px-2 justify-center",
                            isItemActive &&
                              "bg-primary/10 text-primary border-r-2 border-primary"
                          )}
                          asChild
                        >
                          <Link to={item.href}>
                            <Icon className="h-5 w-5 shrink-0" />
                            {!collapsed && (
                              <span className="truncate">{item.title}</span>
                            )}
                          </Link>
                        </Button>
                      );
                    }

                    return (
                      <div key={item.title} className="space-y-1">
                        <Button
                          variant={isItemActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3 h-10 font-medium text-sm rounded-lg",
                            collapsed && "px-2 justify-center",
                            isItemActive && "bg-primary/10 text-primary"
                          )}
                          onClick={() =>
                            !collapsed && toggleExpanded(item.title)
                          }
                        >
                          <Icon className="h-5 w-5 shrink-0" />
                          {!collapsed && (
                            <>
                              <span className="flex-1 text-left truncate">
                                {item.title}
                              </span>
                              {hasChildren && (
                                <ChevronDown
                                  className={cn(
                                    "h-4 w-4 transition-transform duration-200",
                                    isExpanded && "rotate-180"
                                  )}
                                />
                              )}
                            </>
                          )}
                        </Button>

                        {!collapsed && hasChildren && isExpanded && (
                          <div className="ml-3 border-l border-border pl-3 space-y-1">
                            {renderSubItems(item.items)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {!collapsed && sectionIndex < menuSections.length - 1 && (
                  <div className="border-t border-border/50 pt-1" />
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://smarthr.co.in/demo/html/template/assets/img/logo.svg"
              alt="SmartHR"
              className="h-8 w-auto"
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-9 w-9"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-4 py-4 h-[calc(100vh-4rem)]">
          <nav className="space-y-6">
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-3">
                <div className="px-2">
                  <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                    {section.sectionTitle}
                  </h3>
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isExpanded = expandedItems.has(item.title);
                    const hasChildren = item.items && item.items.length > 0;
                    const isItemActive = hasChildren
                      ? hasActiveChild(item.items)
                      : isActive(item.href);

                    if (!hasChildren) {
                      return (
                        <Button
                          key={item.title}
                          variant={isItemActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3 h-10 font-medium text-sm rounded-lg",
                            isItemActive &&
                              "bg-primary/10 text-primary border-r-2 border-primary"
                          )}
                          asChild
                          onClick={onClose}
                        >
                          <Link to={item.href}>
                            <Icon className="h-5 w-5 shrink-0" />
                            <span className="truncate">{item.title}</span>
                          </Link>
                        </Button>
                      );
                    }

                    return (
                      <div key={item.title} className="space-y-1">
                        <Button
                          variant={isItemActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3 h-10 font-medium text-sm rounded-lg",
                            isItemActive && "bg-primary/10 text-primary"
                          )}
                          onClick={() => toggleExpanded(item.title)}
                        >
                          <Icon className="h-5 w-5 shrink-0" />
                          <span className="flex-1 text-left truncate">
                            {item.title}
                          </span>
                          {hasChildren && (
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform duration-200",
                                isExpanded && "rotate-180"
                              )}
                            />
                          )}
                        </Button>

                        {hasChildren && isExpanded && (
                          <div className="ml-3 border-l border-border pl-3 space-y-1">
                            {renderSubItems(item.items, 0, true)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {sectionIndex < menuSections.length - 1 && (
                  <div className="border-t border-border/50 pt-1" />
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </>
  );
}
