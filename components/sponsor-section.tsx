"use client";

import { useId, useState } from "react";
import { formatINR, rupeesToPaise } from "@/lib/format";
import type { Paise, SponsorTier } from "@/lib/types";
import { BowlIcon, EggIcon, MedicalIcon } from "./icons";
import { SponsorPreviewModal } from "./sponsor-preview-modal";

const MIN_RUPEES = 50;
const MAX_RUPEES = 1_00_000;

const tierIcons: Record<SponsorTier["icon"], typeof EggIcon> = {
  egg: EggIcon,
  bowl: BowlIcon,
  medical: MedicalIcon,
};

type Selection = { kind: "tier"; tierId: string } | { kind: "custom" };

type SponsorSectionProps = {
  tiers: readonly SponsorTier[];
};

export function SponsorSection({ tiers }: SponsorSectionProps) {
  const inputId = useId();
  const errorId = useId();
  const [selection, setSelection] = useState<Selection>({
    kind: "tier",
    tierId: tiers[1]?.id ?? tiers[0]?.id ?? "",
  });
  const [customRupees, setCustomRupees] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const selectedTier =
    selection.kind === "tier" ? tiers.find((t) => t.id === selection.tierId) : undefined;

  const parsedCustom = Number(customRupees);
  const customError =
    selection.kind !== "custom" || customRupees === ""
      ? null
      : !Number.isInteger(parsedCustom)
        ? "Please enter a whole rupee amount."
        : parsedCustom < MIN_RUPEES
          ? `Minimum sponsorship is ${formatINR(rupeesToPaise(MIN_RUPEES))}.`
          : parsedCustom > MAX_RUPEES
            ? `For amounts above ${formatINR(rupeesToPaise(MAX_RUPEES))}, please contact us.`
            : null;

  const amount: Paise | null =
    selection.kind === "tier"
      ? (selectedTier?.amount ?? null)
      : customRupees !== "" && customError === null
        ? rupeesToPaise(parsedCustom)
        : null;

  const purpose =
    selection.kind === "tier" && selectedTier
      ? selectedTier.title
      : "General food & medical fund";

  return (
    <section
      id="sponsor"
      aria-labelledby="sponsor-heading"
      className="scroll-mt-16 border-y border-stone-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <SectionIntro />

        <fieldset className="mt-8">
          <legend className="sr-only">Choose a sponsorship amount</legend>
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            {tiers.map((tier) => {
              const Icon = tierIcons[tier.icon];
              const checked = selection.kind === "tier" && selection.tierId === tier.id;
              return (
                <label
                  key={tier.id}
                  className={`group relative flex cursor-pointer flex-col rounded-2xl border-2 p-5 transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-amber-300 ${
                    checked
                      ? "border-amber-500 bg-amber-50 shadow-md shadow-amber-100"
                      : "border-stone-200 bg-stone-50 hover:border-amber-300 hover:bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="sponsor-tier"
                    value={tier.id}
                    checked={checked}
                    onChange={() => setSelection({ kind: "tier", tierId: tier.id })}
                    className="sr-only"
                  />
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`grid size-11 place-items-center rounded-xl transition-colors ${
                        checked ? "bg-amber-500 text-white" : "bg-white text-amber-600 ring-1 ring-stone-200"
                      }`}
                    >
                      <Icon className="size-6" />
                    </span>
                    <span
                      aria-hidden
                      className={`grid size-5 place-items-center rounded-full border-2 ${
                        checked ? "border-amber-500 bg-amber-500" : "border-stone-300 bg-white"
                      }`}
                    >
                      {checked && <span className="size-2 rounded-full bg-white" />}
                    </span>
                  </div>
                  <span className="mt-4 text-2xl font-bold text-stone-900 tabular-nums">
                    {formatINR(tier.amount)}
                  </span>
                  <span className="mt-1 font-semibold text-stone-800">{tier.title}</span>
                  <span className="mt-1 text-sm text-stone-600">{tier.description}</span>
                </label>
              );
            })}
          </div>

          <div
            className={`mt-3 rounded-2xl border-2 p-4 transition-colors sm:p-5 md:mt-4 ${
              selection.kind === "custom" ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-stone-50"
            }`}
          >
            <label htmlFor={inputId} className="text-sm font-semibold text-stone-800">
              Or enter a custom amount
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-lg font-semibold text-stone-500">
                  ₹
                </span>
                <input
                  id={inputId}
                  type="number"
                  inputMode="numeric"
                  min={MIN_RUPEES}
                  max={MAX_RUPEES}
                  step={1}
                  placeholder="e.g. 750"
                  value={customRupees}
                  onFocus={() => setSelection({ kind: "custom" })}
                  onChange={(e) => {
                    setSelection({ kind: "custom" });
                    setCustomRupees(e.target.value);
                  }}
                  aria-invalid={customError !== null}
                  aria-describedby={customError ? errorId : undefined}
                  className="h-12 w-full rounded-xl border border-stone-300 bg-white pr-4 pl-9 text-lg font-semibold text-stone-900 tabular-nums placeholder:font-normal placeholder:text-stone-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-200 focus:outline-none aria-[invalid=true]:border-rose-400"
                />
              </div>
              <button
                type="button"
                disabled={amount === null}
                onClick={() => setModalOpen(true)}
                className="h-12 rounded-xl bg-amber-500 px-6 font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 focus-visible:ring-4 focus-visible:ring-amber-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-stone-300 sm:min-w-52"
              >
                {amount !== null ? `Sponsor Now · ${formatINR(amount)}` : "Sponsor Now"}
              </button>
            </div>
            {customError ? (
              <p id={errorId} className="mt-2 text-sm text-rose-600" role="alert">
                {customError}
              </p>
            ) : (
              <p className="mt-2 text-xs text-stone-500">
                Minimum {formatINR(rupeesToPaise(MIN_RUPEES))}. Your donation appears in the ledger
                below with its UPI reference once verified.
              </p>
            )}
          </div>
        </fieldset>
      </div>

      {amount !== null && (
        <SponsorPreviewModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          amount={amount}
          purpose={purpose}
        />
      )}
    </section>
  );
}

function SectionIntro() {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold tracking-wide text-amber-600 uppercase">Sponsor a meal</p>
      <h2
        id="sponsor-heading"
        className="mt-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl"
      >
        Pick what your money buys
      </h2>
      <p className="mt-2 text-stone-600">
        Each tier maps to a real shopping list. You&apos;ll see the receipt and photos from the
        feeding round your money paid for.
      </p>
    </div>
  );
}
