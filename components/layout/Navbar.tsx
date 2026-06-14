"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PinkMoonLogo } from "@/components/ui/PinkMoonLogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
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
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-[18px]">
        <Link href="/" onClick={() => setOpen(false)}>
          <PinkMoonLogo variant="nav" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.18em] text-white/40 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-brand">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            className="flex flex-col justify-center gap-[5px] p-1 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block h-px w-6 bg-white/80 transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-white/80 transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-white/80 transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-brand/[0.18] bg-[#1a1822]/97 px-6 pb-10 pt-3 backdrop-blur-[20px] md:hidden">
          <ul className="flex flex-col gap-7 text-[13px] uppercase tracking-[0.18em] text-white/40">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-1 transition-colors hover:text-brand"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
