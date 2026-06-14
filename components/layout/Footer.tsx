import { readContentFile } from "@/lib/content";
import Link from "next/link";
import { SocialLinks } from "@/components/layout/SocialLinks";

type SalonInfo = {
  name: string;
  address: string;
  hours: Record<string, string>;
  social: {
    instagram?: string;
    instagramHandle?: string;
    facebook?: string;
    facebookHandle?: string;
  };
};

const DAY_ORDER = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

export async function Footer() {
  const info = await readContentFile<SalonInfo>("salon-info.json");

  return (
    <footer className="border-t border-white/10 bg-[#1a1822]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">

        {/* Brand */}
        <div className="flex flex-col items-center gap-5 md:items-start">
          <div className="w-full">
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/30">Find Me on Social</p>
            <SocialLinks
              instagram={info.social.instagram}
              instagramHandle={info.social.instagramHandle}
              facebook={info.social.facebook}
              facebookHandle={info.social.facebookHandle}
            />
          </div>
        </div>

        {/* Hours */}
        <div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-brand">Hours — By Appointment Only</p>
          <ul className="flex flex-col gap-1.5 text-[13px] text-white/40">
            {DAY_ORDER.map((day) => {
              const hours = info.hours[day];
              if (!hours) return null;
              return (
                <li key={day} className="flex justify-between gap-4">
                  <span className="capitalize">{day}</span>
                  <span>{hours}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Location */}
        <div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-brand">Location</p>
          <p className="text-[13px] leading-relaxed text-white/40">{info.address}</p>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-white/[0.06] px-6 py-5 text-center text-[11px] text-white/25">
        <p>© {new Date().getFullYear()} {info.name} · San Antonio, TX · Licensed &amp; Insured</p>
        <p className="mt-1">Designed with love by 314 Marshall Designs</p>
      </div>
    </footer>
  );
}
