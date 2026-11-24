"use client";

import { useId, useState } from "react";
import { formatDate, formatINR } from "@/lib/format";
import type { Expense, ExpenseCategory } from "@/lib/types";
import { FeedingPhotoPlaceholder } from "./feeding-photo-placeholder";
import { CalendarIcon, MapPinIcon } from "./icons";
import { ReceiptPreview } from "./receipt-preview";

type ExpenseFeedListProps = {
  expenses: readonly Expense[];
};

type CategoryFilter = "all" | ExpenseCategory;

const categoryMeta: Record<ExpenseCategory, { label: string; badgeClassName: string }> = {
  "dry-food": { label: "Dry Food", badgeClassName: "bg-amber-100 text-amber-800" },
  "fresh-meals": { label: "Fresh Meals", badgeClassName: "bg-orange-100 text-orange-800" },
  medical: { label: "Medical & Vaccines", badgeClassName: "bg-sky-100 text-sky-800" },
};

const filters: readonly { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "dry-food", label: categoryMeta["dry-food"].label },
  { value: "fresh-meals", label: categoryMeta["fresh-meals"].label },
  { value: "medical", label: categoryMeta.medical.label },
];

export function ExpenseFeedList({ expenses }: ExpenseFeedListProps) {
  const statusId = useId();
  const [active, setActive] = useState<CategoryFilter>("all");

  const visible = active === "all" ? expenses : expenses.filter((e) => e.category === active);
  const countFor = (value: CategoryFilter) =>
    value === "all" ? expenses.length : expenses.filter((e) => e.category === value).length;

  return (
    <>
      <div
        role="group"
        aria-label="Filter expenses by category"
        aria-describedby={statusId}
        className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filters.map((f) => {
          const isActive = f.value === active;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(f.value)}
              className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:ring-4 focus-visible:ring-amber-300 focus-visible:outline-none ${
                isActive
                  ? "border-amber-500 bg-amber-500 text-white shadow-sm"
                  : "border-stone-300 bg-white text-stone-700 hover:border-amber-400 hover:text-amber-700"
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 text-xs tabular-nums ${
                  isActive ? "bg-white/25 text-white" : "bg-stone-100 text-stone-500"
                }`}
              >
                {countFor(f.value)}
              </span>
            </button>
          );
        })}
      </div>

      <p id={statusId} role="status" aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? "expense" : "expenses"}
        {active === "all" ? "" : ` in ${categoryMeta[active].label}`}.
      </p>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-5 py-10 text-center text-stone-600 motion-safe:animate-fade-in">
          No expenses in this category yet.
        </p>
      ) : (
        // Keyed by filter so the grid re-mounts and fades in on every change.
        <ul key={active} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((expense) => {
            const meta = categoryMeta[expense.category];
            return (
              <li
                key={expense.id}
                className="flex flex-col rounded-2xl border border-stone-200 bg-stone-50 p-3 shadow-sm motion-safe:animate-fade-in"
              >
                <FeedingPhotoPlaceholder
                  category={expense.category}
                  area={expense.area}
                  dogsFed={expense.dogsFed}
                />
                <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.badgeClassName}`}>
                      {meta.label}
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
      )}
    </>
  );
}
