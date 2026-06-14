"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PinkMoonLogo } from "@/components/ui/PinkMoonLogo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "border-b border-brand/[0.18] bg-[#25232f]/92 backdrop-blur-[14px]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center px-6 py-[18px]">
        <Link href="/">
          <PinkMoonLogo variant="nav" />
        </Link>
      </nav>
    </header>
  );
}
