import type { Donation } from "@/lib/types";
import { DonationsLedgerList } from "./donations-ledger-list";
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

        <DonationsLedgerList donations={donations} />
      </div>
    </section>
  );
}
