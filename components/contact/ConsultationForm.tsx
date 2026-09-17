"use client";

import { FormEvent, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

type ConsultationFormProps = {
  serviceInterestOptions: string[];
  referralOptions: string[];
};

const inputClass =
  "w-full border-b border-brand/25 bg-transparent pb-2.5 pt-2.5 text-[15px] font-light text-white outline-none placeholder:text-white/18 transition-colors focus:border-brand";

const labelClass = "block text-[10px] uppercase tracking-[0.2em] text-white/65";

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mt-2">
      {children}
      <svg
        viewBox="0 0 10 6"
        fill="none"
        className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2"
        style={{ color: "rgba(255,112,219,0.5)" }}
        aria-hidden="true"
      >
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function ConsultationForm({ serviceInterestOptions, referralOptions }: ConsultationFormProps) {
  const [state, handleSubmit] = useForm("mojzrajk");
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [referralSource, setReferralSource] = useState("");
  const [friendName, setFriendName] = useState("");
  const [otherReferral, setOtherReferral] = useState("");

  function toggleService(service: string) {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(service)) next.delete(service);
      else next.add(service);
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const resolvedReferral =
      referralSource === "Other" && otherReferral.trim()
        ? `Other: ${otherReferral.trim()}`
        : referralSource;

    const payload = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      serviceInterest: Array.from(selectedServices).join(", ") || "Not specified",
      hairDescription: String(formData.get("hairDescription") || ""),
      referralSource: resolvedReferral,
      ...(friendName ? { referralFriendName: friendName } : {}),
    };

    await handleSubmit(payload);

    if (state.succeeded) {
      setSelectedServices(new Set());
      setReferralSource("");
      setFriendName("");
      setOtherReferral("");
    }
  }

  if (state.succeeded) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-brand/30 bg-brand/5 p-10 text-center">
        <div>
          <p className="font-display text-2xl text-white">Thank you!</p>
          <p className="mt-2 text-[15px] text-white/55">Your inquiry has been sent. We&apos;ll follow up soon.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Name */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" className={inputClass} placeholder="Jane" required />
          <ValidationError field="firstName" errors={state.errors} className="mt-1 text-xs text-red-300" />
        </div>
        <div>
          <label className={labelClass} htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" className={inputClass} placeholder="Doe" required />
          <ValidationError field="lastName" errors={state.errors} className="mt-1 text-xs text-red-300" />
        </div>
      </div>

      {/* Contact */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={inputClass} placeholder="jane@example.com" required />
          <ValidationError field="email" errors={state.errors} className="mt-1 text-xs text-red-300" />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone <span className="normal-case opacity-50">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} placeholder="(555) 000-0000" />
        </div>
      </div>

      {/* Service interest toggles */}
      <div>
        <p className={labelClass + " mb-3"}>
          Services Interested In <span className="normal-case opacity-50">(select all that apply)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {serviceInterestOptions.map((option) => {
            const active = selectedServices.has(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleService(option)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition-all ${
                  active
                    ? "border-brand bg-brand font-bold text-[#25232f]"
                    : "border-white/15 text-white/50 hover:border-brand/50 hover:text-white/80"
                }`}
              >
                {active && (
                  <svg viewBox="0 0 12 10" fill="none" className="h-2.5 w-2.5 shrink-0" aria-hidden="true">
                    <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hair description */}
      <div>
        <label className={labelClass} htmlFor="hairDescription">About Your Hair</label>
        <textarea
          id="hairDescription"
          name="hairDescription"
          className="mt-2 min-h-28 w-full resize-y rounded-xl border border-brand/25 bg-transparent px-4 py-3 text-[15px] font-light text-white outline-none placeholder:text-white/18 transition-colors focus:border-brand"
          placeholder="Tell us a little about your hair and what you're looking for."
          required
        />
        <ValidationError field="hairDescription" errors={state.errors} className="mt-1 text-xs text-red-300" />
      </div>

      {/* Referral source */}
      <div>
        <label className={labelClass} htmlFor="referralSource">How did you hear about us?</label>
        <SelectWrapper>
          <select
            id="referralSource"
            value={referralSource}
            onChange={(e) => {
              setReferralSource(e.target.value);
              if (e.target.value !== "Friend / Referral") setFriendName("");
              if (e.target.value !== "Other") setOtherReferral("");
            }}
            className="w-full cursor-pointer appearance-none rounded-xl border border-brand/25 bg-[#25232f] py-3 pl-4 pr-10 text-[15px] font-light text-white outline-none transition-colors focus:border-brand"
            required
          >
            <option value="" disabled>Select one</option>
            {referralOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </SelectWrapper>

        {referralSource === "Friend / Referral" && (
          <div className="mt-5">
            <label className={labelClass} htmlFor="friendName">
              Friend&rsquo;s Name <span className="normal-case opacity-50">(optional — helps us say thanks!)</span>
            </label>
            <input
              id="friendName"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              className={inputClass}
              placeholder="Friend's name"
            />
          </div>
        )}

        {referralSource === "Other" && (
          <div className="mt-5">
            <label className={labelClass} htmlFor="otherReferral">How did you find us?</label>
            <input
              id="otherReferral"
              value={otherReferral}
              onChange={(e) => setOtherReferral(e.target.value)}
              className={inputClass}
              placeholder="Tell us how you heard about Pink Moon"
            />
          </div>
        )}
      </div>

      <ValidationError errors={state.errors} className="text-sm text-red-300" />

      <button
        type="submit"
        disabled={state.submitting}
        className="inline-block rounded-full bg-brand px-9 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#25232f] transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
      >
        {state.submitting ? "Sending..." : "Send My Inquiry"}
      </button>
    </form>
  );
}
