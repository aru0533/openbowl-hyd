import Image from "next/image";
import { PawIcon } from "./icons";

export function LeoTribute() {
  return (
    <section
      aria-labelledby="leo-heading"
      className="relative overflow-hidden border-b border-amber-100 bg-gradient-to-b from-amber-50 via-stone-50 to-stone-50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 h-96 bg-[radial-gradient(ellipse_at_top,var(--color-amber-200),transparent_70%)] opacity-50"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pt-10 pb-12 sm:px-6 sm:pt-16 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 lg:gap-16">
        <figure className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-none">
          <div className="rounded-[2rem] bg-gradient-to-br from-amber-300 via-amber-200 to-yellow-500 p-1.5 shadow-xl shadow-amber-900/15">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-amber-100">
              <Image
                src="/leo.jpg"
                alt="Leo, a golden retriever, smiling at the camera with his tongue peeking out"
                fill
                preload
                sizes="(min-width: 1152px) 420px, (min-width: 768px) 38vw, 384px"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>
          <figcaption className="mt-4 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-white px-4 py-1.5 text-sm font-semibold text-amber-900 shadow-sm">
              <PawIcon className="size-4 shrink-0 text-amber-600" />
              In Loving Memory of Leo (2022 – 2026)
            </span>
          </figcaption>
        </figure>

        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-amber-700 uppercase">
            Dedicated to our boy
          </p>
          <h1
            id="leo-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-balance text-stone-900 sm:text-5xl"
          >
            OpenBowl Hyderabad <span className="text-amber-600">— Leo&apos;s Legacy</span>
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-pretty text-stone-700 sm:text-lg">
            <p>
              Leo was our beloved boy. He was just four years old when he left us, after
              bravely battling kidney failure &mdash; only eleven days after we lost our
              grandmother.
            </p>
            <p>
              In our family&apos;s hearts, Leo stepped forward to protect us. We believe he
              gave us every new day we live today, and we carry that gift with us.
            </p>
            <p>
              Every bowl of food, every drop of clean water, and every dose of medicine we
              bring to Hyderabad&apos;s street dogs through this fully transparent fund is our
              way of honoring Leo&apos;s life, his love, and his sacrifice.
            </p>
          </div>

          <p className="mt-6 border-l-4 border-amber-400 pl-4 text-base font-medium text-stone-900 italic sm:text-lg">
            Every rupee below is a meal shared in his name.
          </p>

          <a
            href="#sponsor"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 sm:text-base"
          >
            <PawIcon className="size-5" />
            Sponsor a meal for Leo
          </a>
        </div>
      </div>
    </section>
  );
}
