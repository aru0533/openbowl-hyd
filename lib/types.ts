/** Integer amount in paise (₹1 = 100 paise). Matches Razorpay's API. */
export type Paise = number;

export type Donation = {
  id: string;
  /** `null` renders as "Anonymous". */
  donorName: string | null;
  amount: Paise;
  /** ISO 8601 timestamp. */
  date: string;
  message: string | null;
  /** 12-digit UPI / bank Retrieval Reference Number. */
  rrn: string;
  method: "UPI" | "IMPS" | "NEFT";
};

export type ReceiptLineItem = {
  label: string;
  quantity: string;
  amount: Paise;
};

export type ExpenseCategory = "food" | "medical";

export type Expense = {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: Paise;
  /** ISO 8601 date. */
  date: string;
  area: string;
  dogsFed: number;
  shopName: string;
  receiptNumber: string;
  lineItems: readonly ReceiptLineItem[];
};

export type SponsorTier = {
  id: string;
  amount: Paise;
  title: string;
  description: string;
  icon: "egg" | "bowl" | "medical";
};

export type FundSummary = {
  totalCollected: Paise;
  totalSpent: Paise;
  availableBalance: Paise;
  donationCount: number;
  expenseCount: number;
  dogsFed: number;
};
