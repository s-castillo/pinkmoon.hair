"use client";

import Link from "next/link";

type SocialLinksProps = {
  instagram?: string;
  instagramHandle?: string;
  facebook?: string;
  facebookHandle?: string;
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const dimBorder  = "1px solid rgba(255,112,219,0.22)";
const fullBorder = "1px solid rgba(255,112,219,1)";

export function SocialLinks({ instagram, instagramHandle, facebook, facebookHandle }: SocialLinksProps) {
  return (
    <div className="flex flex-col gap-2">
      {instagram && (
        <Link
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[14px] transition-colors duration-200 hover:bg-[#ff70db08]"
          style={{ border: dimBorder, color: "#ff70db" }}
          onMouseEnter={(e) => (e.currentTarget.style.border = fullBorder)}
          onMouseLeave={(e) => (e.currentTarget.style.border = dimBorder)}
        >
          <InstagramIcon />
          <span>{instagramHandle ?? "Instagram"}</span>
        </Link>
      )}
      {facebook && (
        <Link
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[14px] transition-colors duration-200 hover:bg-[#ff70db08]"
          style={{ border: dimBorder, color: "#ff70db" }}
          onMouseEnter={(e) => (e.currentTarget.style.border = fullBorder)}
          onMouseLeave={(e) => (e.currentTarget.style.border = dimBorder)}
        >
          <FacebookIcon />
          <span>{facebookHandle ?? "Facebook"}</span>
        </Link>
      )}
    </div>
  );
}
