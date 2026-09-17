import Image from "next/image";
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

const DAY_ORDER = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

export default async function ContactPage() {
  const content = await readContentFile<ContactContent>("contact/contact.json");
  const salonInfo = await readContentFile<SalonInfo>("salon-info.json");

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[55svh] items-end overflow-hidden pb-16 pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/previous_clients/look-2.jpg.jpeg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(37,35,47,0.30) 0%, rgba(37,35,47,0.65) 60%, rgba(37,35,47,1.00) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[820px] px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-brand before:mr-1.5 before:opacity-50 before:content-['—']">
            {content.pageHeader.eyebrow}
          </p>
          <h1
            className="mt-4 font-display font-light leading-[1.08] text-white"
            style={{ fontSize: "clamp(36px, 8vw, 64px)" }}
          >
            {content.pageHeader.title}
          </h1>
          <p className="mt-4 w-full text-[15px] leading-[1.8] text-white/55">
            {content.pageHeader.intro}
          </p>
        </div>
      </section>

      {/* Form + Details */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-12">
        <div className="grid items-start gap-6 md:grid-cols-[1fr_280px]">
          <ConsultationForm
            serviceInterestOptions={content.form.serviceInterestOptions}
            referralOptions={content.form.referralOptions}
          />

          <aside className="h-fit rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-display text-3xl text-white">Contact Details</h2>
            <div className="mt-4 space-y-3 text-sm text-muted">
              {salonInfo.phone && (
                <p>
                  <span className="text-accent">Phone: </span>
                  <a href={`tel:${salonInfo.phone}`} className="transition-colors hover:text-white">
                    {salonInfo.phone}
                  </a>
                </p>
              )}
              {salonInfo.email && (
                <p>
                  <span className="text-accent">Email: </span>
                  <a href={`mailto:${salonInfo.email}`} className="transition-colors hover:text-white">
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
                  <Link href={salonInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-white">
                    Instagram ↗
                  </Link>
                </p>
              )}
              {salonInfo.social.facebook && (
                <p>
                  <Link href={salonInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-white">
                    Facebook ↗
                  </Link>
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
