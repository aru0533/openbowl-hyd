import { PawIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 font-semibold text-stone-200">
          <PawIcon className="size-5 text-amber-400" />
          OpenBowl Hyderabad
        </p>
        <p>A volunteer-run, fully transparent street dog feeding &amp; care fund.</p>
      </div>
    </footer>
  );
}
