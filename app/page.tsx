import { BalanceBanner } from "@/components/balance-banner";
import { DonationsLedger } from "@/components/donations-ledger";
import { ExpenseFeed } from "@/components/expense-feed";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SponsorSection } from "@/components/sponsor-section";
import { donations, expenses, getFundSummary, sponsorTiers } from "@/lib/mock-data";

export default function Home() {
  // Day 1: mock data. Later: server-side Supabase queries.
  const summary = getFundSummary(donations, expenses);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <BalanceBanner summary={summary} />
        <SponsorSection tiers={sponsorTiers} />
        <DonationsLedger donations={donations} />
        <ExpenseFeed expenses={expenses} />
      </main>
      <SiteFooter />
    </>
  );
}
