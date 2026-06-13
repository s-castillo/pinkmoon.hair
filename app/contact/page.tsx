import { ConsultationForm } from "@/components/contact/ConsultationForm";
import { readContentFile } from "@/lib/content";
import Link from "next/link";

type SalonInfo = {
  name: string;
  phone?: string;
  email?: string;
  address: string;
  hours: Record<string, string>;
  social: {
    instagram?: string;
    facebook?: string;
  };
};

type ContactContent = {
  pageHeader: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  form: {
    serviceInterestOptions: string[];
    referralOptions: string[];
  };
};

const DAY_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default async function ContactPage() {
  const content = await readContentFile<ContactContent>("contact/contact.json");
  const salonInfo = await readContentFile<SalonInfo>("salon-info.json");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-16 md:pb-24 md:pt-20">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">{content.pageHeader.eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl text-white md:text-6xl">{content.pageHeader.title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">{content.pageHeader.intro}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <ConsultationForm
          serviceInterestOptions={content.form.serviceInterestOptions}
          referralOptions={content.form.referralOptions}
        />

        <aside className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
          <h2 className="font-display text-3xl text-white">Contact Details</h2>
          <div className="mt-4 space-y-3 text-sm text-muted">
            {salonInfo.phone && (
              <p>
                <span className="text-accent">Phone: </span>
                <a href={`tel:${salonInfo.phone}`} className="hover:text-white transition-colors">
                  {salonInfo.phone}
                </a>
              </p>
            )}
            {salonInfo.email && (
              <p>
                <span className="text-accent">Email: </span>
                <a href={`mailto:${salonInfo.email}`} className="hover:text-white transition-colors">
                  {salonInfo.email}
                </a>
              </p>
            )}
            <p>
              <span className="text-accent">Location: </span>
              {salonInfo.address}
            </p>
          </div>

          <h3 className="mt-6 text-xs uppercase tracking-[0.14em] text-accent">Hours</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {DAY_ORDER.map((day) => {
              const hours = salonInfo.hours[day];
              if (!hours) return null;
              return (
                <li key={day} className="flex justify-between gap-4">
                  <span className="capitalize">{day}</span>
                  <span>{hours}</span>
                </li>
              );
            })}
          </ul>

          <h3 className="mt-6 text-xs uppercase tracking-[0.14em] text-accent">Social</h3>
          <div className="mt-2 space-y-1 text-sm">
            {salonInfo.social.instagram && (
              <p>
                <Link
                  href={salonInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-white transition-colors"
                >
                  Instagram ↗
                </Link>
              </p>
            )}
            {salonInfo.social.facebook && (
              <p>
                <Link
                  href={salonInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-white transition-colors"
                >
                  Facebook ↗
                </Link>
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
