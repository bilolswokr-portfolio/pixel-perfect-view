import { useId } from "react";

/** The Intelligent Orbit: a sculpted B whose bowls are traced by an orbital path around a luminous core. */
export function LogoMark({ size = 32, animated = false }: { size?: number; animated?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`body-${id}`} x1="10" y1="6" x2="54" y2="58">
          <stop offset="0" stopColor="oklch(0.36 0.08 262)" />
          <stop offset="1" stopColor="oklch(0.16 0.04 262)" />
        </linearGradient>
        <linearGradient id={`edge-${id}`} x1="0" y1="0" x2="64" y2="64">
          <stop offset="0" stopColor="oklch(0.9 0.06 255)" />
          <stop offset=".5" stopColor="oklch(0.6 0.2 262)" />
          <stop offset="1" stopColor="oklch(0.78 0.11 260)" />
        </linearGradient>
        <radialGradient id={`core-${id}`}>
          <stop offset="0" stopColor="oklch(0.98 0.02 250)" />
          <stop offset=".45" stopColor="oklch(0.78 0.11 260)" />
          <stop offset="1" stopColor="oklch(0.6 0.2 262)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* B silhouette: stem + two bowls */}
      <path
        d="M16 8h17c8 0 13 4.5 13 11 0 4-2 7-5.5 8.6C46 29.2 49 33 49 38.5 49 46 43 51 34 51H16V8Z"
        fill={`url(#body-${id})`}
        stroke="oklch(0.37 0.045 260)"
        strokeWidth="1"
      />
      <path d="M23 15v29" stroke="oklch(0.78 0.11 260 / .35)" strokeWidth="1.2" strokeLinecap="round" />
      {/* orbital trajectory sweeping through the bowls */}
      <path
        className={animated ? "logo-trace" : undefined}
        d="M6 46C14 58 40 60 54 44 62 34 56 20 42 22 30 24 26 36 34 40"
        stroke={`url(#edge-${id})`}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle className={animated ? "logo-core" : undefined} cx="34" cy="31" r="9" fill={`url(#core-${id})`} />
      <circle className={animated ? "logo-core" : undefined} cx="34" cy="31" r="3" fill="oklch(0.98 0.02 250)" />
    </svg>
  );
}

export function Logo({ animated = false, size = 30 }: { animated?: boolean; size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} animated={animated} />
      <span className={`font-semibold tracking-[0.08em] text-[0.95rem] ${animated ? "logo-word" : ""}`}>
        BIZPILOT <span className="text-glow">AI</span>
      </span>
    </span>
  );
}
