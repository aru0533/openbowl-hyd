import { PawIcon } from "./icons";

const navLinks = [
  { href: "#sponsor", label: "Sponsor" },
  { href: "#ledger", label: "Donations" },
  { href: "#expenses", label: "Spends" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-stone-50/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-semibold text-stone-900">
          <span className="grid size-8 place-items-center rounded-xl bg-amber-500 text-white">
            <PawIcon className="size-5" />
          </span>
          <span className="leading-tight">
            OpenBowl <span className="text-amber-600">Hyderabad</span>
          </span>
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200/60 hover:text-stone-900"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#sponsor"
          className="rounded-xl bg-stone-900 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-stone-700 sm:hidden"
        >
          Sponsor
        </a>
      </div>
    </header>
  );
}
