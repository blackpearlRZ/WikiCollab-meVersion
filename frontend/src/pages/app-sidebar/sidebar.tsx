import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import {
  Bell,
  FolderOpen,
  LayoutDashboard,
  Search,
  Settings2,
  Trash2,
  UserCircle2,
} from "lucide-react";
type NavItemProps = {
  to: string;
  icon: ReactNode;
  label: string;
  end?: boolean;
};

function NavItem({ to, icon, label, end }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition duration-200",
          isActive
            ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
            : "text-slate-600 hover:bg-stone-100 hover:text-slate-900",
        ].join(" ")
      }
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 transition duration-200 group-hover:scale-105">
        {icon}
      </span>
      <span>{label}</span>
    </NavLink>
  );
}


export function AppSidebar() {
  const [user, setUser] = useState<any>(null)

useEffect(() => {
  const token = localStorage.getItem("token")

  if (token) {
    try {
      const decoded: any = jwtDecode(token)

      setUser({
        name: decoded.name,
        email: decoded.email,
      })
    } catch (err) {
      console.log("Invalid token")
    }
  }
}, [])

  return (
    <aside className="w-30 border-b border-stone-200 bg-stone-50/80 px-3.5 py-3.5 backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:w-75 lg:border-b-0 lg:border-r lg:px-4 lg:py-5">
      <div className="flex h-full w-30 flex-col gap-4">
        <div className="rounded-3xl border border-stone-200 bg-white px-4 py-4.5 shadow-sm">
          <div className="flex items-center gap-3 m-1.5  ">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-sm font-semibold text-white">
              W
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight text-slate-900">WikiCollab</p>
              <p className="text-xs text-slate-500">Collaborative workspace</p>
            </div>
          </div>
        </div>

        <nav className="grid gap-1.5">
          <NavItem to="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" end />
          <NavItem to="/spaces" icon={<FolderOpen className="h-4 w-4" />} label="Spaces" end />
          <NavItem to="/search" icon={<Search className="h-4 w-4" />} label="Search" />
          <NavItem to="/notifications" icon={<Bell className="h-4 w-4" />} label="Notifications" />
          <NavItem to="/trash" icon={<Trash2 className="h-4 w-4" />} label="Trash" />
        </nav>
     <div className="mt-auto space-y-1 border-t border-stone-200 pt-3">
          <NavItem to="/profile" icon={<UserCircle2 className="h-4 w-4" />} label="Profile" />
          <NavItem to="/settings" icon={<Settings2 className="h-4 w-4" />} label="Settings" />

         <div className="rounded-2xl border border-stone-200 bg-white px-3 py-3 text-xs text-slate-500 shadow-sm">
          <p className="font-medium text-slate-700">
            {user?.name || "Username"}
          </p>
          <p className="mt-1 truncate">
            {user?.email || "User Mail"}
          </p>
        </div>
        </div>
      </div>
    </aside>
  );
}

export default AppSidebar;
