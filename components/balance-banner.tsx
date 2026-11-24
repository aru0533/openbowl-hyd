import type { ReactNode } from "react";
import { formatINR } from "@/lib/format";
import type { FundSummary, Paise } from "@/lib/types";
import { ArrowDownIcon, ArrowUpIcon, ShieldCheckIcon, WalletIcon } from "./icons";

type BalanceBannerProps = {
  summary: FundSummary;
};

export function BalanceBanner({ summary }: BalanceBannerProps) {
  const spentPercent =
    summary.totalCollected > 0
      ? Math.round((summary.totalSpent / summary.totalCollected) * 100)
      : 0;

  return (
    <section aria-labelledby="transparency-heading" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6 sm:pt-16">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 sm:text-sm">
            <ShieldCheckIcon className="size-4 shrink-0" />
            100% of funds go strictly to dog food &amp; medical care
          </p>
          <h2
            id="transparency-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-balance text-stone-900 sm:text-4xl"
          >
            Every rupee in. Every rupee out. In public.
          </h2>
          <p className="mt-3 text-base text-pretty text-stone-600 sm:text-lg">
            OpenBowl feeds and treats Hyderabad&apos;s street dogs. Each donation is listed
            with its UPI reference, and each spend with a shop receipt and feeding photo.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
          <StatCard
            label="Total Collected"
            amount={summary.totalCollected}
            footnote={`${summary.donationCount} verified donations`}
            icon={<ArrowDownIcon className="size-5" />}
            tone="emerald"
          />
          <StatCard
            label="Total Spent on Dogs"
            amount={summary.totalSpent}
            footnote={`${summary.expenseCount} receipted spends · ${summary.dogsFed} dogs helped`}
            icon={<ArrowUpIcon className="size-5" />}
            tone="rose"
          />
          <StatCard
            label="Available Balance"
            amount={summary.availableBalance}
            footnote="Ready for the next feeding round"
            icon={<WalletIcon className="size-5" />}
            tone="amber"
            highlight
          />
        </div>

        <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-stone-700">Funds deployed</span>
            <span className="font-semibold text-stone-900 tabular-nums">{spentPercent}%</span>
          </div>
          <div
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-stone-100"
            role="progressbar"
            aria-valuenow={spentPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Share of collected funds already spent on dogs"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500"
              style={{ width: `${Math.min(spentPercent, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-stone-500">
            0% admin fees · 0% salaries · volunteers cover their own fuel and time.
          </p>
        </div>
      </div>
    </section>
  );
}

type Tone = "emerald" | "rose" | "amber";

const toneStyles: Record<Tone, { icon: string; card: string }> = {
  emerald: { icon: "bg-emerald-100 text-emerald-700", card: "border-stone-200 bg-white" },
  rose: { icon: "bg-rose-100 text-rose-700", card: "border-stone-200 bg-white" },
  amber: { icon: "bg-amber-400/30 text-amber-50", card: "border-stone-900 bg-stone-900" },
};

type StatCardProps = {
  label: string;
  amount: Paise;
  footnote: string;
  icon: ReactNode;
  tone: Tone;
  highlight?: boolean;
};

function StatCard({ label, amount, footnote, icon, tone, highlight = false }: StatCardProps) {
  const styles = toneStyles[tone];
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${styles.card}`}>
      <div className="flex items-center gap-3">
        <span className={`grid size-9 place-items-center rounded-xl ${styles.icon}`}>{icon}</span>
        <p className={`text-sm font-medium ${highlight ? "text-stone-300" : "text-stone-600"}`}>
          {label} (₹)
        </p>
      </div>
      <p
        className={`mt-4 text-3xl font-bold tracking-tight tabular-nums sm:text-[2rem] ${
          highlight ? "text-white" : "text-stone-900"
        }`}
      >
        {formatINR(amount)}
      </p>
      <p className={`mt-1 text-xs ${highlight ? "text-amber-200" : "text-stone-500"}`}>
        {footnote}
      </p>
    </div>
  );
}
