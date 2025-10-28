"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopNavbarProps {
  isCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export function TopNavbar({ isCollapsed = false, onToggleSidebar }: TopNavbarProps) {
  const handleLogout = () => {
    // Implementasi logout
    console.log("Logout clicked");
  };

  return (
    <nav 
      className="fixed top-0 right-0 z-30 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300" 
      style={{ left: isCollapsed ? '64px' : '256px' }}
    >
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Left Side - Hamburger Menu */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Right Side - User Avatar & Logout */}
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 cursor-pointer border-2 border-slate-200 dark:border-slate-700">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-sm">
              RI
            </AvatarFallback>
          </Avatar>
          
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm px-3"
          >
            LOGOUT
          </Button>
        </div>
      </div>
    </nav>
  );
}

