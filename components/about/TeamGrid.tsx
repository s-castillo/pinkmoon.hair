import Image from "next/image";
import { promises as fs } from "node:fs";
import path from "node:path";

type TeamMember = {
  name: string;
  specialty: string;
  bio: string;
  image: string;
};

type TeamGridProps = {
  members: TeamMember[];
};

async function imageExists(src: string): Promise<boolean> {
  try {
    const filePath = path.join(process.cwd(), "public", src.replace(/^\//, ""));
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function TeamGrid({ members }: TeamGridProps) {
  const availability = await Promise.all(members.map((m) => imageExists(m.image)));

  return (
    <section className="mt-10">
      <h2 className="font-display text-3xl text-white md:text-4xl">Meet the Team</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {members.map((member, i) => (
          <article key={member.name} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="relative h-64 bg-[#1a1822]">
              {availability[i] ? (
                <Image src={member.image} alt={member.name} fill className="object-cover object-center" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-5xl text-white/20">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-display text-2xl text-accent">{member.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-brand">{member.specialty}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
