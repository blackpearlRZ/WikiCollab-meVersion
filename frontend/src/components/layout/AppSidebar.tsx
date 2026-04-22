import { LayoutDashboard, FolderKanban, Bell, Settings, User, Plus } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "../ui/sidebar";
import { Logo } from "../brand/Logo";
import { spaces} from "../../lib/mock-data";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "../../lib/utils";
import { useAuth } from "../auth/AuthContext";

const items = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Spaces", url: "/app/spaces", icon: FolderKanban },
  { title: "Notifications", url: "/app/notifications", icon: Bell },
  { title: "Settings", url: "/app/settings", icon: Settings },
  { title: "Profile", url: "/app/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const  { user } = useAuth();
  console.log(localStorage.getItem("token"));
  console.log("Current user in sidebar:", user);


  const linkCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
      isActive
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
        : "text-sidebar-foreground hover:bg-sidebar-accent/60",
    );

  return (
    <Sidebar  collapsible="icon" className="border-rw-30 border-b border-stone-200 bg-stone-50/80  backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:w-75 lg:border-b-0 lg:border-r ">
      <SidebarHeader className="px-3 py-4">
        <Logo showWordmark={!collapsed} />
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className={cn(collapsed && "sr-only")}>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                 <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    end={item.url === "/app"}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                      )
                    }
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between pr-1">
              <span>Spaces</span>
              <button
                aria-label="Create space"
                className="rounded-md p-1 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {spaces.slice(0, 5).map((s) => (
                  <SidebarMenuItem key={s.id}>
                    <SidebarMenuButton asChild>
                      <NavLink to={`/app/spaces/${s.id}`} className={linkCls}>
                        <span className="text-base leading-none">{s.emoji}</span>
                        <span className="truncate">{s.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="truncate text-sm font-medium">
              {user?.name || "Loading..."}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {user?.email || ""}
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
