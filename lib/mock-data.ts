/**
 * Day 1 mock data. Shapes match the planned Supabase tables so these exports
 * can be swapped for server-side queries without touching components.
 * All amounts are integer paise.
 */
import type { Donation, Expense, FundSummary, SponsorTier } from "./types";

export const sponsorTiers: readonly SponsorTier[] = [
  {
    id: "eggs-kibble",
    amount: 250_00,
    title: "10 Eggs & Dry Kibble",
    description: "A protein-rich meal for a street pack on one feeding round.",
    icon: "egg",
  },
  {
    id: "rice-chicken",
    amount: 500_00,
    title: "Fresh Rice, Chicken & Broth for 12 Dogs",
    description: "A hot, home-cooked meal prepared and served the same evening.",
    icon: "bowl",
  },
  {
    id: "medical-kit",
    amount: 1_000_00,
    title: "Vaccination / Deworming & Medical Kit",
    description: "Anti-rabies shots, deworming tablets and wound care supplies.",
    icon: "medical",
  },
];

/** Most recent first. RRN format: Y + day-of-year + HH + sequence. */
export const donations: readonly Donation[] = [
  {
    id: "don_013",
    donorName: "Priya Reddy",
    amount: 1_000_00,
    date: "2026-11-21T19:42:00+05:30",
    message: "For the ECIL pack. Keep the photos coming!",
    rrn: "632519045812",
    method: "UPI",
  },
  {
    id: "don_012",
    donorName: null,
    amount: 500_00,
    date: "2026-11-21T08:15:00+05:30",
    message: "In memory of Bruno.",
    rrn: "632508117364",
    method: "UPI",
  },
  {
    id: "don_011",
    donorName: "Arjun Mehta",
    amount: 2_500_00,
    date: "2026-11-20T21:03:00+05:30",
    message: "Medical fund for the injured ones near Kapra lake.",
    rrn: "632421093341",
    method: "UPI",
  },
  {
    id: "don_010",
    donorName: "Sneha & Karthik",
    amount: 1_000_00,
    date: "2026-11-19T13:27:00+05:30",
    message: null,
    rrn: "632313260907",
    method: "UPI",
  },
  {
    id: "don_009",
    donorName: null,
    amount: 250_00,
    date: "2026-11-19T07:51:00+05:30",
    message: null,
    rrn: "632307048825",
    method: "UPI",
  },
  {
    id: "don_008",
    donorName: "Mohammed Faizan",
    amount: 5_000_00,
    date: "2026-11-17T18:10:00+05:30",
    message: "Monthly contribution from our office team at HITEC City.",
    rrn: "632118502216",
    method: "IMPS",
  },
  {
    id: "don_007",
    donorName: "Lakshmi Narayana",
    amount: 500_00,
    date: "2026-11-16T10:34:00+05:30",
    message: "Eggs for the Sainikpuri puppies.",
    rrn: "632010338479",
    method: "UPI",
  },
  {
    id: "don_006",
    donorName: null,
    amount: 2_000_00,
    date: "2026-11-14T22:48:00+05:30",
    message: "Thank you for posting receipts. This is how it should be done.",
    rrn: "631822671530",
    method: "UPI",
  },
  {
    id: "don_005",
    donorName: "Deepika Rao",
    amount: 750_00,
    date: "2026-11-12T16:05:00+05:30",
    message: null,
    rrn: "631616094187",
    method: "UPI",
  },
  {
    id: "don_004",
    donorName: "Rahul Varma",
    amount: 3_000_00,
    date: "2026-11-10T11:20:00+05:30",
    message: "Please use for vaccinations.",
    rrn: "631411725063",
    method: "NEFT",
  },
  {
    id: "don_003",
    donorName: null,
    amount: 1_000_00,
    date: "2026-11-08T20:12:00+05:30",
    message: null,
    rrn: "631220419958",
    method: "UPI",
  },
  {
    id: "don_002",
    donorName: "Ananya S.",
    amount: 1_500_00,
    date: "2026-11-05T09:40:00+05:30",
    message: "Birthday donation instead of a party!",
    rrn: "630909186642",
    method: "UPI",
  },
  {
    id: "don_001",
    donorName: "Vikram Goud",
    amount: 2_500_00,
    date: "2026-11-03T17:55:00+05:30",
    message: "Starting the fund off. Good luck, team.",
    rrn: "630717350291",
    method: "IMPS",
  },
];

/** Most recent first. Each expense's line items sum to its amount. */
export const expenses: readonly Expense[] = [
  {
    id: "exp_006",
    description: "20kg Drools Adult Dry Food + 2 Trays Eggs",
    category: "food",
    amount: 4_620_00,
    date: "2026-11-20",
    area: "ECIL / Kapra Zone",
    dogsFed: 45,
    shopName: "Sri Sai Pet Store, ECIL X Roads",
    receiptNumber: "SSP-2026-1184",
    lineItems: [
      { label: "Drools Adult Dry Dog Food", quantity: "20 kg", amount: 4_200_00 },
      { label: "Eggs (30 per tray)", quantity: "2 trays", amount: 420_00 },
    ],
  },
  {
    id: "exp_005",
    description: "15kg Rice + 8kg Chicken + Broth Ingredients",
    category: "food",
    amount: 2_900_00,
    date: "2026-11-18",
    area: "Tarnaka / Habsiguda",
    dogsFed: 38,
    shopName: "Balaji Rice Traders & Fresh Chicken Centre",
    receiptNumber: "BRT-88412",
    lineItems: [
      { label: "Sona Masoori Rice (broken)", quantity: "15 kg", amount: 900_00 },
      { label: "Chicken (skinless, bone-in)", quantity: "8 kg", amount: 1_760_00 },
      { label: "Carrots, pumpkin & turmeric", quantity: "1 lot", amount: 240_00 },
    ],
  },
  {
    id: "exp_004",
    description: "Anti-Rabies Vaccination for 6 Dogs + Vet Visit",
    category: "medical",
    amount: 2_700_00,
    date: "2026-11-15",
    area: "Sainikpuri / AS Rao Nagar",
    dogsFed: 6,
    shopName: "Paws & Care Veterinary Clinic",
    receiptNumber: "PCV/11/0391",
    lineItems: [
      { label: "Anti-rabies vaccine (Raksharab)", quantity: "6 doses", amount: 2_100_00 },
      { label: "Field visit & administration", quantity: "1", amount: 600_00 },
    ],
  },
  {
    id: "exp_003",
    description: "Deworming Tablets + Tick Shampoo + Wound Spray",
    category: "medical",
    amount: 2_980_00,
    date: "2026-11-12",
    area: "Malkajgiri",
    dogsFed: 30,
    shopName: "MedVet Pharmacy, Malkajgiri",
    receiptNumber: "MVP-55720",
    lineItems: [
      { label: "Deworming tablets", quantity: "30 tabs", amount: 1_350_00 },
      { label: "Anti-tick shampoo", quantity: "2 bottles", amount: 760_00 },
      { label: "Wound spray (Lorexane)", quantity: "3 cans", amount: 870_00 },
    ],
  },
  {
    id: "exp_002",
    description: "10kg Puppy Starter + 20L Milk for 9 Puppies",
    category: "food",
    amount: 3_950_00,
    date: "2026-11-09",
    area: "Uppal / Nacharam",
    dogsFed: 9,
    shopName: "Happy Tails Pet Supplies, Uppal",
    receiptNumber: "HT-20261109-07",
    lineItems: [
      { label: "Puppy starter dry food", quantity: "10 kg", amount: 2_850_00 },
      { label: "Toned milk", quantity: "20 L", amount: 1_100_00 },
    ],
  },
  {
    id: "exp_001",
    description: "2 Trays Eggs + 10kg Rice + 5kg Curd",
    category: "food",
    amount: 1_370_00,
    date: "2026-11-06",
    area: "Kukatpally / KPHB",
    dogsFed: 28,
    shopName: "Vijaya Kirana & General Stores",
    receiptNumber: "VK-3317",
    lineItems: [
      { label: "Eggs (30 per tray)", quantity: "2 trays", amount: 420_00 },
      { label: "Rice", quantity: "10 kg", amount: 600_00 },
      { label: "Curd", quantity: "5 kg", amount: 350_00 },
    ],
  },
];

export function getFundSummary(
  donationList: readonly Donation[],
  expenseList: readonly Expense[],
): FundSummary {
  const totalCollected = donationList.reduce((sum, d) => sum + d.amount, 0);
  const totalSpent = expenseList.reduce((sum, e) => sum + e.amount, 0);
  return {
    totalCollected,
    totalSpent,
    availableBalance: totalCollected - totalSpent,
    donationCount: donationList.length,
    expenseCount: expenseList.length,
    dogsFed: expenseList.reduce((sum, e) => sum + e.dogsFed, 0),
  };
}
