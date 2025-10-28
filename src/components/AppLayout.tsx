import React, { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopNavbar } from "./ui/top-navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <AppSidebar 
        isCollapsed={isSidebarCollapsed}
      />
      <TopNavbar 
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />
      <main 
        className="transition-all duration-300 pt-16"
        style={{ marginLeft: isSidebarCollapsed ? '64px' : '256px' }}
      >
        <div className="container mx-auto p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
