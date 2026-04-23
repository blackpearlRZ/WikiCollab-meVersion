import { SidebarTrigger } from "../../components/ui/sidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { useAuth } from "../auth/AuthContext";

export function AppHeader({ title }: { title?: string }) {
  const {logout , user} = useAuth();
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

        <button className=""  type="submit" onClick={logout} >
        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
        fill="#1C4D8D" viewBox="0 0 24 24"  
        transform="scale(1,-1) ">
        <path d="m14.29 6.71 4.3 4.29H9v2h9.59l-4.3 4.29 1.42 1.42 6.7-6.71-6.7-6.71z"></path><path d="M11 5V3c-4.96 0-9 4.04-9 9s4.04 9 9 9v-2c-3.86 0-7-3.14-7-7s3.14-7 7-7"></path>
        </svg>
        </button>
        {/* PROFILE */}
        <NavLink to="/app/profile" aria-label="Profile">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </NavLink>
      </div>
    </header>
  );
}


