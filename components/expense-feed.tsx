import type { Expense } from "@/lib/types";
import { ExpenseFeedList } from "./expense-feed-list";

type ExpenseFeedProps = {
  expenses: readonly Expense[];
};

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

        <ExpenseFeedList expenses={expenses} />
      </div>
    </section>
  );
}
