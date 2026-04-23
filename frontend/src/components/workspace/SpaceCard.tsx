import { NavLink } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Globe, Lock, FileText } from "lucide-react";
import type { Space } from "../../lib/mock-data";
//import { MemberStack } from "./MemberStack";

export function SpaceCard({ space }: { space: Space }) {
  return (
    <NavLink to={`/app/spaces/${space.id}`} className="group block">
      <Card className="h-full rounded-2xl border-border/70 p-3 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-soft text-2xl">
            {space.emoji}
          </div>
          <Badge
            variant="secondary"
            className="gap-1 rounded-full border-0 bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
          >
            {space.visibility === "public" ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
            {space.visibility}
          </Badge>
        </div>
        <h3 className="mt-4 font-display text-base font-semibold tracking-tight group-hover:text-primary">
          {space.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{space.description}</p>
        <div className="mt-5 flex items-center justify-between">
         
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            {space.pageCount} pages
          </div>
        </div>
      </Card>
    </NavLink>
  );
}
