import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/practice", label: "Practice" },
  { to: "/challenges", label: "Challenges" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground" aria-hidden>🎙</span>
      Speech Practice
    </Link>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2">Skip to content</a>
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" aria-label="Main">
          <Logo />
          <ul className="hidden gap-1 md:flex">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} activeOptions={{ exact: l.to === "/" }}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "bg-secondary text-primary" }}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <button className="rounded-lg p-2 md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className="text-2xl" aria-hidden>{open ? "✕" : "☰"}</span>
          </button>
        </nav>
        {open && (
          <ul className="border-t px-4 pb-4 md:hidden">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} activeOptions={{ exact: l.to === "/" }}
                  className="block rounded-lg px-3 py-3 font-medium" activeProps={{ className: "bg-secondary text-primary" }}>{l.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </header>
      <main id="main" className="flex-1">{children}</main>
      <footer className="mt-20 border-t bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">Improve your English speaking skills, one sentence at a time. Free and private — your progress stays in your browser.</p>
          </div>
          <div>
            <h2 className="font-semibold">Quick Links</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {links.map((l) => <li key={l.to}><Link to={l.to} className="hover:text-primary">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">Information</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <p className="border-t py-5 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Speech Practice. All rights reserved.</p>
      </footer>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-gradient-soft">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 text-center fade-up">
        <h1 className="text-4xl font-bold md:text-5xl"><span className="text-gradient">{title}</span></h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>
      </div>
    </section>
  );
}
