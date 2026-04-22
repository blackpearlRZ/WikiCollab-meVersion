import { Card } from "../../components/ui/card";
import { activity, currentUser, pages, spaces, users } from "../../lib/mock-data";
import { FileText, FolderKanban, Users, ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const stats = [
  { label: "Spaces", value: spaces.length, icon: FolderKanban, hint: "+2 this month" },
  { label: "Pages", value: pages.length + 97, icon: FileText, hint: "12 edited today" },
  { label: "Collaborators", value: users.length + 8, icon: Users, hint: "5 online now" },
];

export default function Dashboard() {
  const recent = pages.slice(0, 6);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-6 md:p-10">
      <div>
        <p className="text-sm text-muted-foreground">{greeting},</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {currentUser.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Here's what's happening across your workspace today.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="rounded-2xl border-border/70 p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="mt-2 font-display text-3xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-soft text-primary">
                <s.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent pages */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recently opened</h2>
            <NavLink to="/app/spaces" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </NavLink>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {recent.map((p) => (
              <NavLink
                key={p.id}
                to={`/app/spaces/${p.spaceId}/pages/${p.id}`}
                className="group rounded-2xl border bg-surface p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{p.emoji}</span>
                  <div className="min-w-0">
                    <p className="truncate font-medium group-hover:text-primary">{p.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {spaces.find((s) => s.id === p.spaceId)?.name} · {p.updatedAt}
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Activity */}
        <Card className="rounded-2xl border-border/70 p-2 shadow-soft">
          <div className="flex items-center justify-between p-3 pb-1">
            <h2 className="font-display text-base font-semibold">Recent activity</h2>
          </div>
        </Card>
      </div>
    </div>
  );
}
