import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "../../lib/utils";

export default function Layout({ children, setIsAuthenticated }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content */}
      <div className={cn("flex flex-col transition-all duration-300", sidebarCollapsed ? "lg:ml-16" : "lg:ml-64")}>
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          setIsAuthenticated={setIsAuthenticated}
        />
        <main className="flex-1 p-0 lg:p-0">{children}</main>
      </div>
    </div>
  );
}