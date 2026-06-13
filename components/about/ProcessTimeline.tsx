const steps = [
  {
    number: "01",
    label: "Consultation Form",
    title: "Start with your story",
    description:
      "Fill out our consultation form to share your hair history, goals, and what brought you to Pink Moon. This helps us arrive at your appointment prepared.",
  },
  {
    number: "02",
    label: "A Conversation",
    title: "We connect",
    description:
      "Before anything else, we talk. We'll follow up to discuss your goals, answer questions, and make sure the timing and service are a great fit.",
  },
  {
    number: "03",
    label: "Reservation",
    title: "Lock in your appointment",
    description:
      "Once we're aligned, we reserve your spot. Because we work by appointment only, your time is protected and fully dedicated to you.",
  },
  {
    number: "04",
    label: "Hair Evaluation",
    title: "Assess and align",
    description:
      "At the start of your visit we do a hands-on evaluation — texture, condition, history, and current state — to confirm the plan and set expectations.",
  },
  {
    number: "05",
    label: "Your Service",
    title: "The transformation",
    description:
      "This is where the work happens. Whether it's color, a cut, a spiritual service, or all of the above — you're in the chair with our full attention.",
  },
  {
    number: "06",
    label: "Follow-up Reservation",
    title: "Book before you leave",
    description:
      "We close every appointment by scheduling your next one. Staying on a consistent cadence keeps your hair (and your energy) at its best.",
  },
];

export function ProcessTimeline() {
  return (
    <section className="mt-16">
      <p className="text-[10px] uppercase tracking-[0.28em] text-brand before:mr-1.5 before:opacity-50 before:content-['—']">
        How It Works
      </p>
      <h2
        className="mt-4 font-display font-light leading-[1.1] text-white"
        style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
      >
        The Pink Moon <em className="italic text-brand">Experience</em>
      </h2>

      <div className="mt-10 relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-brand/40 via-brand/20 to-transparent md:left-[27px]" />

        <ol className="space-y-0">
          {steps.map((step, i) => (
            <li key={step.number} className="relative flex gap-6 pb-10 last:pb-0 md:gap-8">
              {/* Node */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-[#25232f] md:h-14 md:w-14">
                <span className="font-display text-[13px] font-light text-brand md:text-[15px]">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="pt-1.5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-brand/60">{step.label}</p>
                <h3 className="mt-1 font-display text-xl font-light text-white md:text-2xl">{step.title}</h3>
                <p className="mt-2 max-w-md text-[14px] leading-[1.8] text-white/45">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
