import { formatDate, formatINR } from "@/lib/format";
import type { Expense } from "@/lib/types";
import { ReceiptIcon } from "./icons";

type ReceiptPreviewProps = {
  expense: Expense;
};

/** Expandable itemised receipt. Uses native <details>, so no client JS. */
export function ReceiptPreview({ expense }: ReceiptPreviewProps) {
  return (
    <details className="group">
      <summary className="inline-flex min-h-9 cursor-pointer list-none items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-stone-700 transition-colors select-none hover:border-amber-400 hover:text-amber-700 focus-visible:ring-4 focus-visible:ring-amber-300 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
        <ReceiptIcon className="size-4" />
        <span className="group-open:hidden">View Shop Receipt</span>
        <span className="hidden group-open:inline">Hide Receipt</span>
      </summary>

      <div className="mt-3 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-4 font-mono text-xs text-stone-700">
        <p className="text-center text-[13px] font-bold text-stone-900">{expense.shopName}</p>
        <div className="mt-1 flex justify-between text-stone-500">
          <span>No. {expense.receiptNumber}</span>
          <span>{formatDate(expense.date)}</span>
        </div>
        <hr className="my-2 border-dashed border-stone-300" />
        <ul className="space-y-1">
          {expense.lineItems.map((item) => (
            <li key={item.label} className="flex justify-between gap-3">
              <span className="min-w-0">
                {item.label} <span className="text-stone-500">× {item.quantity}</span>
              </span>
              <span className="shrink-0 tabular-nums">{formatINR(item.amount, { showPaise: true })}</span>
            </li>
          ))}
        </ul>
        <hr className="my-2 border-dashed border-stone-300" />
        <div className="flex justify-between font-bold text-stone-900">
          <span>TOTAL PAID</span>
          <span className="tabular-nums">{formatINR(expense.amount, { showPaise: true })}</span>
        </div>
        <p className="mt-2 text-center text-[10px] text-stone-400">
          Scanned original upload coming with Supabase Storage
        </p>
      </div>
    </details>
  );
}
