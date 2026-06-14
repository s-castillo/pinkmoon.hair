import { readContentFile } from "@/lib/content";

type SalonInfo = {
  name: string;
};

export async function Footer() {
  const info = await readContentFile<SalonInfo>("salon-info.json");

  return (
    <footer className="border-t border-white/[0.06] px-6 py-5 text-center text-[11px] text-white/25">
      <p>© {new Date().getFullYear()} {info.name} · San Antonio, TX · Licensed &amp; Insured</p>
      <p className="mt-1">Designed with love by 314 Marshall Designs</p>
    </footer>
  );
}
