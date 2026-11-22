import type { Paise } from "./types";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrFormatterWithPaise = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats paise as Indian Rupees, e.g. 10000000 → "₹1,00,000". */
export function formatINR(amount: Paise, options?: { showPaise?: boolean }): string {
  const rupees = amount / 100;
  const formatter =
    options?.showPaise || !Number.isInteger(rupees) ? inrFormatterWithPaise : inrFormatter;
  return formatter.format(rupees);
}

/** Converts a rupee amount (as typed by a user) to integer paise. */
export function rupeesToPaise(rupees: number): Paise {
  return Math.round(rupees * 100);
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

/** Formats an ISO date in IST so server and client render identically. */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}
