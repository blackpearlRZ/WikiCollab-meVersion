import { cn } from "../../lib/utils";

export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-[#0F2854] via-[#1C4D8D] to-[#4988C4] shadow-soft flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 5l3 14 5-10 5 10 3-14" />
        </svg>
      </div>
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-[#0F2854]">
          Wiki<span className="text-[#1C4D8D]">Collab</span>
        </span>
      )}
    </div>
  );
}