"use client";

import { FormEvent, useState } from "react";

type ConsultationFormProps = {
  serviceInterestOptions: string[];
  referralOptions: string[];
};

const inputClass =
  "w-full border-b border-brand/25 bg-transparent pb-2.5 pt-2.5 text-[15px] font-light text-white outline-none placeholder:text-white/18 transition-colors focus:border-brand";

const labelClass = "block text-[10px] uppercase tracking-[0.2em] text-white/35";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    setStatusType(null);

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
      referralFriendName: friendName || undefined,
    };

    const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatusType("error");
        setStatusMessage("Unable to send inquiry right now. Please try again.");
        return;
      }

      event.currentTarget.reset();
      setSelectedServices(new Set());
      setReferralSource("");
      setFriendName("");
      setOtherReferral("");
      setStatusType("success");
      setStatusMessage("Thanks! Your inquiry has been sent. We'll follow up soon.");
    } catch {
      setStatusType("error");
      setStatusMessage("Network issue while sending inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" className={inputClass} placeholder="Jane" required />
        </div>
        <div>
          <label className={labelClass} htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" className={inputClass} placeholder="Doe" required />
        </div>
      </div>

      {/* Contact */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={inputClass} placeholder="jane@example.com" required />
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

      {/* Hair description — full border */}
      <div>
        <label className={labelClass} htmlFor="hairDescription">About Your Hair</label>
        <textarea
          id="hairDescription"
          name="hairDescription"
          className="mt-2 min-h-28 w-full resize-y rounded-xl border border-brand/25 bg-transparent px-4 py-3 text-[15px] font-light text-white outline-none placeholder:text-white/18 transition-colors focus:border-brand"
          placeholder="Tell us a little about your hair and what you're looking for."
          required
        />
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

        {/* Friend name */}
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

        {/* Other — custom text */}
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

      {statusMessage ? (
        <p className={`text-sm ${statusType === "success" ? "text-green-300" : "text-red-300"}`}>
          {statusMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-block rounded-full bg-brand px-9 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#25232f] transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send My Inquiry"}
      </button>
    </form>
  );
}
