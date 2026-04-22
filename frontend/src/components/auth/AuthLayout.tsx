import {Logo} from "../brand/Logo";

export function AuthLayout({ children, eyebrow, title, subtitle }: {
  children: React.ReactNode;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* LEFT PANEL */}
      <div className="relative hidden overflow-hidden bg-gradient-primary lg:flex lg:flex-col lg:justify-between lg:p-10">

        {/* Blur effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-accent blur-3xl" />
          <div className="absolute -right-10 bottom-20 h-96 w-96 rounded-full bg-secondary blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative">
          <Logo className="text-white" />
        </div>

        {/* Content */}
        <div className="relative space-y-8 text-white">

          {/* Card */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
            <p className="text-sm font-medium opacity-90">
              📄 Q2 Product Roadmap
            </p>
            <p className="mt-2 text-xs opacity-70">
              Edited by Priya · just now
            </p>

            <div className="mt-4 flex -space-x-2">
              {["PS", "DR", "AM", "LC"].map((i, idx) => (
                <div
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 text-[10px] font-semibold"
                  style={{ zIndex: 10 - idx }}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl font-semibold leading-tight">
              The home for your team's knowledge.
            </h2>

            <p className="mt-3 max-w-md text-sm opacity-80">
              Write, plan, and collaborate in one calm, beautifully organized workspace.
            </p>
          </div>

          <p className="text-xs opacity-60">
            © {new Date().getFullYear()} WikiCollab
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col bg-surface">

        {/* Mobile logo */}
        <div className="flex items-center justify-between p-6 lg:hidden">
          <Logo />
        </div>

        {/* Form */}
        <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm">

            {eyebrow && (
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
                {eyebrow}
              </p>
            )}

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-2 text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}

            <div className="mt-8">{children}</div>

          </div>
        </div>
      </div>
    </div>
  )
}