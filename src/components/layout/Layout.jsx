import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer"; // Import the new Footer component
import { cn } from "../../lib/utils";

export default function Layout({ children, setIsAuthenticated }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
      <div className={cn("flex flex-col flex-1 transition-all duration-300", sidebarCollapsed ? "lg:ml-16" : "lg:ml-64")}>
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          setIsAuthenticated={setIsAuthenticated}
        />
        <main className="flex-1 p-0 lg:p-0 bg-gradient-to-br from-slate-50 via-orange-50 to-pink-50 ">{children}</main>
        <Footer /> {/* Add the Footer component here */}
      </div>
    </div>
  );
}