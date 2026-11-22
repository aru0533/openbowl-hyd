import type { ExpenseCategory } from "@/lib/types";

type FeedingPhotoPlaceholderProps = {
  category: ExpenseCategory;
  area: string;
  dogsFed: number;
};

/**
 * Stand-in for the feeding photo until uploads move to Supabase Storage.
 * Pure inline SVG + CSS so there are no external image requests to break.
 */
export function FeedingPhotoPlaceholder({ category, area, dogsFed }: FeedingPhotoPlaceholderProps) {
  const isMedical = category === "medical";
  return (
    <figure
      className={`relative aspect-[4/3] overflow-hidden rounded-xl ${
        isMedical
          ? "bg-gradient-to-br from-sky-100 via-teal-50 to-emerald-100"
          : "bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100"
      }`}
    >
      <svg
        viewBox="0 0 320 240"
        className="absolute inset-0 size-full"
        role="img"
        aria-label={`Feeding photo proof placeholder for ${area}`}
      >
        {/* Ground */}
        <ellipse cx="160" cy="214" rx="150" ry="22" className={isMedical ? "fill-teal-200/60" : "fill-amber-200/60"} />
        {/* Sun */}
        <circle cx="262" cy="52" r="22" className={isMedical ? "fill-sky-200" : "fill-amber-200"} />
        {/* Dog: body, head, ear, tail, legs */}
        <g className={isMedical ? "fill-stone-500" : "fill-amber-700"}>
          <ellipse cx="130" cy="160" rx="52" ry="26" />
          <circle cx="82" cy="128" r="22" />
          <ellipse cx="68" cy="116" rx="8" ry="15" transform="rotate(-20 68 116)" />
          <rect x="96" y="172" width="11" height="34" rx="5" />
          <rect x="150" y="172" width="11" height="34" rx="5" />
          <path d="M180 152c18-8 26-24 24-36" strokeWidth="9" strokeLinecap="round" fill="none" className={isMedical ? "stroke-stone-500" : "stroke-amber-700"} />
        </g>
        <circle cx="76" cy="124" r="2.6" className="fill-stone-900" />
        <ellipse cx="62" cy="134" rx="4" ry="3" className="fill-stone-900" />
        {/* Bowl or medical cross */}
        {isMedical ? (
          <g>
            <rect x="214" y="150" width="58" height="50" rx="10" className="fill-white" />
            <path d="M243 160v30M228 175h30" strokeWidth="8" strokeLinecap="round" className="stroke-rose-500" />
          </g>
        ) : (
          <g>
            <path d="M206 178h76a38 22 0 0 1-76 0Z" className="fill-sky-600" />
            <ellipse cx="244" cy="178" rx="38" ry="7" className="fill-amber-300" />
            <circle cx="232" cy="175" r="4" className="fill-white" />
            <circle cx="250" cy="174" r="4" className="fill-white" />
          </g>
        )}
      </svg>
      {/* Viewfinder corners */}
      <span aria-hidden className="absolute top-3 left-3 size-5 rounded-tl-md border-t-2 border-l-2 border-stone-900/25" />
      <span aria-hidden className="absolute top-3 right-3 size-5 rounded-tr-md border-t-2 border-r-2 border-stone-900/25" />
      <span aria-hidden className="absolute bottom-3 left-3 size-5 rounded-bl-md border-b-2 border-l-2 border-stone-900/25" />
      <span aria-hidden className="absolute right-3 bottom-3 size-5 rounded-br-md border-r-2 border-b-2 border-stone-900/25" />
      <figcaption className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-stone-700 shadow-sm backdrop-blur">
        Feeding Photo Proof · {dogsFed} {dogsFed === 1 ? "dog" : "dogs"}
      </figcaption>
    </figure>
  );
}
