"use client";

import { useId, useMemo, useState } from "react";
import { formatDate, formatINR } from "@/lib/format";
import type { Donation } from "@/lib/types";
import { CloseIcon, SearchIcon, ShieldCheckIcon } from "./icons";

type DonationsLedgerListProps = {
  donations: readonly Donation[];
};

/**
 * Digits-only queries (spaces ignored) match against the RRN; anything else
 * matches the donor name, with `null` names searchable as "Anonymous".
 */
function matchesQuery(donation: Donation, query: string): boolean {
  const digits = query.replace(/\s+/g, "");
  if (/^\d+$/.test(digits)) return donation.rrn.includes(digits);
  const name = donation.donorName ?? "Anonymous";
  return name.toLowerCase().includes(query.toLowerCase());
}

export function DonationsLedgerList({ donations }: DonationsLedgerListProps) {
  const inputId = useId();
  const statusId = useId();
  const [rawQuery, setRawQuery] = useState("");
  const query = rawQuery.trim();
  const isSearching = query.length > 0;

  const results = useMemo(
    () => (isSearching ? donations.filter((d) => matchesQuery(d, query)) : donations),
    [donations, query, isSearching],
  );

  return (
    <>
      <div className="mt-6">
        <label htmlFor={inputId} className="text-sm font-semibold text-stone-800">
          Find your donation
        </label>
        <div className="relative mt-1.5">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-stone-400" />
          <input
            id={inputId}
            type="search"
            value={rawQuery}
            onChange={(e) => setRawQuery(e.target.value)}
            placeholder="Paste your UPI Transaction ID (RRN) or type your name"
            autoComplete="off"
            spellCheck={false}
            aria-describedby={statusId}
            className="h-12 w-full rounded-xl border border-stone-300 bg-white pr-12 pl-11 text-base text-stone-900 shadow-sm transition-colors placeholder:text-stone-400 hover:border-stone-400 focus:border-amber-500 focus-visible:ring-4 focus-visible:ring-amber-300 focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {rawQuery.length > 0 && (
            <button
              type="button"
              onClick={() => setRawQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-0.5 grid size-11 -translate-y-1/2 place-items-center rounded-lg text-stone-500 hover:text-stone-900 focus-visible:ring-4 focus-visible:ring-amber-300 focus-visible:outline-none"
            >
              <CloseIcon className="size-5" />
            </button>
          )}
        </div>

        <div id={statusId} role="status" aria-live="polite" className="mt-3 min-h-7">
          {isSearching && results.length > 0 && (
            <p
              key="match"
              className="flex flex-wrap items-center gap-2 text-sm text-stone-600 motion-safe:animate-fade-in"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                <ShieldCheckIcon className="size-4" />
                Verified in Ledger
              </span>
              {results.length} matching {results.length === 1 ? "donation" : "donations"}
            </p>
          )}
          {!isSearching && (
            <p className="text-sm text-stone-500">
              Showing all {donations.length} verified donations.
            </p>
          )}
        </div>
      </div>

      {isSearching && results.length === 0 ? (
        <div className="mt-3 rounded-2xl border border-dashed border-stone-300 bg-white px-5 py-10 text-center motion-safe:animate-fade-in">
          <span
            aria-hidden
            className="mx-auto grid size-12 place-items-center rounded-full bg-stone-100 text-stone-400"
          >
            <SearchIcon className="size-6" />
          </span>
          <p className="mt-3 font-semibold text-stone-900">
            No donation matches &ldquo;<span className="break-all">{query}</span>&rdquo;
          </p>
          <p className="mx-auto mt-1 max-w-md text-sm text-stone-600">
            Double-check the 12-digit RRN in your UPI app&rsquo;s transaction details, or try
            the name you entered when donating. Donations appear here once the payment is
            verified.
          </p>
          <button
            type="button"
            onClick={() => setRawQuery("")}
            className="mt-4 h-11 rounded-xl border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 transition-colors hover:border-amber-400 hover:text-amber-700 focus-visible:ring-4 focus-visible:ring-amber-300 focus-visible:outline-none"
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          {/* Mobile: stacked cards */}
          <ul className="mt-3 space-y-3 md:hidden">
            {results.map((d) => (
              <li
                key={d.id}
                className="rounded-2xl border border-stone-200 bg-white p-4 motion-safe:animate-fade-in"
              >
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
          <div className="mt-3 hidden overflow-hidden rounded-2xl border border-stone-200 bg-white md:block">
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
                {results.map((d) => (
                  <tr
                    key={d.id}
                    className="transition-colors hover:bg-amber-50/40 motion-safe:animate-fade-in"
                  >
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
        </>
      )}
    </>
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
