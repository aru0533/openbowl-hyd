import { formatDate, formatINR } from "@/lib/format";
import type { Expense } from "@/lib/types";
import { FeedingPhotoPlaceholder } from "./feeding-photo-placeholder";
import { CalendarIcon, MapPinIcon } from "./icons";
import { ReceiptPreview } from "./receipt-preview";

type ExpenseFeedProps = {
  expenses: readonly Expense[];
};

const categoryBadge = {
  food: { label: "Dog Food", className: "bg-amber-100 text-amber-800" },
  medical: { label: "Medical Care", className: "bg-sky-100 text-sky-800" },
} as const;

export function ExpenseFeed({ expenses }: ExpenseFeedProps) {
  return (
    <section
      id="expenses"
      aria-labelledby="expenses-heading"
      className="scroll-mt-16 border-t border-stone-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-rose-600 uppercase">Money out</p>
          <h2
            id="expenses-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl"
          >
            Expense &amp; feeding proof feed
          </h2>
          <p className="mt-2 text-stone-600">
            Every spend is itemised with the shop receipt and a photo from the feeding round.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expenses.map((expense) => {
            const badge = categoryBadge[expense.category];
            return (
              <li
                key={expense.id}
                className="flex flex-col rounded-2xl border border-stone-200 bg-stone-50 p-3 shadow-sm"
              >
                <FeedingPhotoPlaceholder
                  category={expense.category}
                  area={expense.area}
                  dogsFed={expense.dogsFed}
                />
                <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}>
                      {badge.label}
                    </span>
                    <span className="text-lg font-bold text-rose-600 tabular-nums">
                      −{formatINR(expense.amount)}
                    </span>
                  </div>
                  <h3 className="mt-2 font-semibold text-pretty text-stone-900">
                    {expense.description}
                  </h3>
                  <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Date</dt>
                      <CalendarIcon className="size-4 text-stone-400" />
                      <dd>{formatDate(expense.date)}</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Area</dt>
                      <MapPinIcon className="size-4 text-stone-400" />
                      <dd>{expense.area}</dd>
                    </div>
                  </dl>
                  <div className="mt-auto pt-4">
                    <ReceiptPreview expense={expense} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
