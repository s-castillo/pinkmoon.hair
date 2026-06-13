import Image from "next/image";
import { TeamGrid } from "@/components/about/TeamGrid";
import { ValuesSection } from "@/components/about/ValuesSection";
import { ProcessTimeline } from "@/components/about/ProcessTimeline";
import { readContentFile } from "@/lib/content";

type AboutContent = {
  pageHeader: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  salonStory: {
    title: string;
    paragraphs: string[];
  };
  team: Array<{
    name: string;
    specialty: string;
    bio: string;
    image: string;
  }>;
  values: Array<{
    title: string;
    description: string;
  }>;
};

export default async function AboutPage() {
  const content = await readContentFile<AboutContent>("about/about.json");

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[55svh] items-end overflow-hidden pb-16 pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/previous_clients/look-5.jpg.jpeg"
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
        <div className="relative z-10 mx-auto w-full max-w-[820px] px-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-brand before:mr-1.5 before:opacity-50 before:content-['—']">
            {content.pageHeader.eyebrow}
          </p>
          <h1
            className="mt-4 font-display font-light leading-[1.08] text-white"
            style={{ fontSize: "clamp(36px, 8vw, 64px)" }}
          >
            {content.pageHeader.title}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-white/55">
            {content.pageHeader.intro}
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto w-full max-w-[820px] px-6 pb-20">
        {/* Salon story */}
        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
          <h2
            className="font-display font-light leading-[1.1] text-white"
            style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
          >
            {content.salonStory.title}
          </h2>
          <div className="mt-5 space-y-4">
            {content.salonStory.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-[1.8] text-white/55">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <TeamGrid members={content.team} />
        <ProcessTimeline />
        <ValuesSection values={content.values} />
      </div>
    </>
  );
}
