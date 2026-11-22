import { formatDate, formatINR } from "@/lib/format";
import type { Donation } from "@/lib/types";
import { ShieldCheckIcon } from "./icons";

type DonationsLedgerProps = {
  donations: readonly Donation[];
};

export function DonationsLedger({ donations }: DonationsLedgerProps) {
  return (
    <section id="ledger" aria-labelledby="ledger-heading" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-emerald-700 uppercase">Money in</p>
            <h2
              id="ledger-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl"
            >
              Verified donations ledger
            </h2>
            <p className="mt-2 text-stone-600">
              Every donation with its UPI / bank transaction ID (RRN). Find yours and match it
              with your bank statement.
            </p>
          </div>
          <p className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-emerald-700 sm:self-auto">
            <ShieldCheckIcon className="size-4" />
            {donations.length} entries verified
          </p>
        </div>

        {/* Mobile: stacked cards */}
        <ul className="mt-6 space-y-3 md:hidden">
          {donations.map((d) => (
            <li key={d.id} className="rounded-2xl border border-stone-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <DonorName name={d.donorName} />
                  <p className="mt-0.5 text-xs text-stone-500">
                    {formatDate(d.date)} · {d.method}
                  </p>
                </div>
                <p className="shrink-0 text-lg font-bold text-emerald-700 tabular-nums">
                  +{formatINR(d.amount)}
                </p>
              </div>
              {d.message && (
                <p className="mt-2 text-sm text-stone-600 italic">&ldquo;{d.message}&rdquo;</p>
              )}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-stone-500">RRN</span>
                <RrnBadge rrn={d.rrn} />
              </div>
            </li>
          ))}
        </ul>

        {/* md+: table */}
        <div className="mt-6 hidden overflow-hidden rounded-2xl border border-stone-200 bg-white md:block">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Verified donations with transaction references</caption>
            <thead className="border-b border-stone-200 bg-stone-50 text-xs font-semibold tracking-wide text-stone-500 uppercase">
              <tr>
                <th scope="col" className="px-5 py-3">Donor</th>
                <th scope="col" className="px-5 py-3 text-right">Amount (₹)</th>
                <th scope="col" className="px-5 py-3">Date</th>
                <th scope="col" className="px-5 py-3">Message</th>
                <th scope="col" className="px-5 py-3">UPI / Bank Txn ID (RRN)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {donations.map((d) => (
                <tr key={d.id} className="transition-colors hover:bg-amber-50/40">
                  <td className="px-5 py-3.5">
                    <DonorName name={d.donorName} />
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold whitespace-nowrap text-emerald-700 tabular-nums">
                    {formatINR(d.amount)}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-stone-600">
                    {formatDate(d.date)}
                    <span className="ml-1.5 text-xs text-stone-400">{d.method}</span>
                  </td>
                  <td className="max-w-xs px-5 py-3.5 text-stone-600">
                    {d.message ?? <span className="text-stone-400">—</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    <RrnBadge rrn={d.rrn} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function DonorName({ name }: { name: string | null }) {
  if (name === null) {
    return (
      <span className="inline-flex items-center gap-1.5 font-medium text-stone-500">
        <span aria-hidden className="grid size-6 place-items-center rounded-full bg-stone-200 text-xs">
          ?
        </span>
        Anonymous
      </span>
    );
  }
  const initials = name
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5 font-semibold text-stone-900">
      <span
        aria-hidden
        className="grid size-6 shrink-0 place-items-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-800"
      >
        {initials}
      </span>
      <span className="truncate">{name}</span>
    </span>
  );
}

function RrnBadge({ rrn }: { rrn: string }) {
  return (
    <code className="inline-block rounded-md border border-stone-200 bg-stone-100 px-2 py-0.5 font-mono text-xs font-medium tracking-wider text-stone-700">
      {rrn}
    </code>
  );
}
