import { SidebarTrigger } from "../../components/ui/sidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { currentUser } from "../../lib/mock-data";
import { useAuth } from "../auth/AuthContext";

export function AppHeader({ title }: { title?: string }) {
  const { logout } = useAuth();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-[#BDE8F5] bg-white/80 p-3 backdrop-blur md:px-6">
      
      <SidebarTrigger className="text-[#1C4D8D]" />

      {title && (
        <h1 className="hidden font-display text-sm font-semibold text-[#0F2854] md:block">
          {title}
        </h1>
      )}

      <div className="ml-auto flex items-center gap-2">
        
        {/* SEARCH */}
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4988C4]" />
          <Input
            placeholder="Search pages, spaces, people…"
            className="h-9 w-64 rounded-full border-[#BDE8F5] bg-[#BDE8F5]/40 pl-9 focus-visible:bg-white focus-visible:ring-[#4988C4]"
          />
        </div>

        {/* NOTIFICATIONS */}
        <Button variant="ghost" size="icon" asChild className="text-[#1C4D8D] hover:bg-[#BDE8F5]">
          <NavLink to="/app/notifications" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </NavLink>
        </Button>

        <button  type="submit" onClick={logout} >
          Logout
        </button>
        {/* PROFILE */}
        <NavLink to="/app/profile" aria-label="Profile">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-[#1C4D8D] text-white text-xs font-semibold">
              {currentUser.initials}
            </AvatarFallback>
          </Avatar>
        </NavLink>
      </div>
    </header>
  );
}