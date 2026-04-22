import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

type FeaturePlaceholderPageProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  highlights?: string[];
};

export function FeaturePlaceholderPage({
  title,
  description,
  icon: Icon,
  highlights = [],
}: FeaturePlaceholderPageProps) {
  return (
    <div className="space-y-4 opacity-85">
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-slate-600">
            <Icon className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Workspace feature
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
          </div>
        </div>
      </div>

      <Card className="rounded-2xl border-stone-200 bg-white shadow-sm">
        <CardContent className="space-y-4 p-6">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 opacity-80">
            {highlights.map((highlight) => (
              <div key={highlight} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-slate-600">
                {highlight}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="shimmer-skeleton h-16 rounded-xl" />
            <div className="shimmer-skeleton h-12 rounded-xl" />
            <div className="shimmer-skeleton h-12 rounded-xl" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FeaturePlaceholderPage;
