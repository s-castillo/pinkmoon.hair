// PNG intrinsic size: 398 × 140 px  (aspect ratio ≈ 2.843)
const RATIO = 398 / 140;

type PinkMoonLogoProps = {
  variant?: "nav" | "hero" | "footer";
  className?: string;
};

// Nav + footer are height-based; hero is width-based at 400px
const HEIGHTS: Record<"nav" | "footer", number> = { nav: 36, footer: 40 };

export function PinkMoonLogo({ variant = "nav", className = "" }: PinkMoonLogoProps) {
  if (variant === "hero") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/logo-white.png"
        alt="Pink Moon — Colors. Cuts. Trims."
        style={{ display: "block", width: "400px", height: "auto", maxWidth: "none", flexShrink: 0 }}
        className={className}
      />
    );
  }

  const h = HEIGHTS[variant];
  const w = Math.round(h * RATIO);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-white.png"
      alt="Pink Moon — Colors. Cuts. Trims."
      style={{ display: "block", height: `${h}px`, width: `${w}px`, maxWidth: "none", flexShrink: 0 }}
      className={className}
    />
  );
}
