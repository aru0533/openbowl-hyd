"use client";

import { useEffect, useRef } from "react";
import { formatINR } from "@/lib/format";
import type { Paise } from "@/lib/types";
import { CloseIcon, LockIcon, ShieldCheckIcon } from "./icons";

type SponsorPreviewModalProps = {
  open: boolean;
  onClose: () => void;
  amount: Paise;
  purpose: string;
};

const nextSteps = [
  "Pay instantly with any UPI app (GPay, PhonePe, Paytm, BHIM) via Razorpay.",
  "Razorpay confirms the payment to our server. We never trust the browser alone.",
  "Your donation appears in the public ledger with its UPI reference (RRN).",
] as const;

export function SponsorPreviewModal({ open, onClose, amount, purpose }: SponsorPreviewModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        // Close when the backdrop (the dialog element itself) is clicked.
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="sponsor-modal-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl bg-white p-0 text-stone-900 shadow-2xl backdrop:bg-stone-950/50 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            <LockIcon className="size-3.5" />
            Live checkout coming next
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-2 grid size-10 place-items-center rounded-full text-stone-500 hover:bg-stone-100 hover:text-stone-900 focus-visible:ring-4 focus-visible:ring-amber-300 focus-visible:outline-none"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <h2 id="sponsor-modal-title" className="mt-4 text-xl font-bold">
          Thank you for sponsoring!
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Secure Razorpay UPI checkout launches in the next update. Here&apos;s what your
          sponsorship will look like.
        </p>

        <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-medium text-stone-500 uppercase">You&apos;re sponsoring</p>
          <p className="mt-1 text-3xl font-bold tabular-nums">{formatINR(amount)}</p>
          <p className="mt-1 text-sm font-medium text-stone-700">{purpose}</p>
        </div>

        <ol className="mt-5 space-y-3">
          {nextSteps.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-stone-700">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-stone-900 text-xs font-semibold text-white">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <p className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
          <ShieldCheckIcon className="size-4 shrink-0" />
          100% goes to dog food &amp; medical care. No platform cut.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 h-12 w-full rounded-xl bg-stone-900 font-semibold text-white transition-colors hover:bg-stone-700 focus-visible:ring-4 focus-visible:ring-amber-300 focus-visible:outline-none"
        >
          Got it
        </button>
      </div>
    </dialog>
  );
}
