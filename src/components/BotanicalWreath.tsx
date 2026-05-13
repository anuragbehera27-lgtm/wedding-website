"use client";

// Leaf path: tip at (0, -h), base at (0, h) — long axis along Y.
// Rotate into position after placement.
function lp(w: number, h: number) {
  return (
    `M 0 ${-h} ` +
    `C ${w} ${-h * 0.6} ${w} ${h * 0.6} 0 ${h} ` +
    `C ${-w} ${h * 0.6} ${-w} ${-h * 0.6} 0 ${-h} Z`
  );
}

// Left branch: M 300 520 C 70 510 40 220 300 100
// Positions pre-computed at t = 0.05, 0.15 … 0.95 along the cubic bezier.
// r = outward-from-centre angle + 90, so leaves point away from wreath centre.
const LEFT: { x: number; y: number; r: number; s: number }[] = [
  { x: 267, y: 516, r: 189, s: 0.80 },
  { x: 210, y: 498, r: 205, s: 1.00 },
  { x: 167, y: 467, r: 219, s: 0.85 },
  { x: 136, y: 425, r: 234, s: 1.00 },
  { x: 119, y: 377, r: 248, s: 0.90 },
  { x: 117, y: 324, r: 264, s: 1.00 },
  { x: 130, y: 269, r: 282, s: 0.85 },
  { x: 158, y: 215, r: 303, s: 1.00 },
  { x: 202, y: 164, r: 325, s: 0.90 },
  { x: 263, y: 119, r: 349, s: 0.80 },
];

// Right branch: mirror each x through 300, rotation = (360 - r) % 360
const RIGHT = LEFT.map(({ x, y, r, s }) => ({
  x: 600 - x,
  y,
  r: (360 - r) % 360,
  s,
}));

const ALL = [...LEFT, ...RIGHT];

export function BotanicalWreath({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* ── Left branch stem ──────────────────────────────────────── */}
      <path
        d="M 300 520 C 70 510 40 220 300 100"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* ── Right branch stem (mirror) ─────────────────────────────── */}
      <path
        d="M 300 520 C 530 510 560 220 300 100"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* ── Top berry cluster ─────────────────────────────────────── */}
      <circle cx={300} cy={100} r={4.5} fill="currentColor" opacity="0.9" />
      <circle cx={291} cy={ 91} r={3.0} fill="currentColor" opacity="0.70" />
      <circle cx={309} cy={ 91} r={3.0} fill="currentColor" opacity="0.70" />
      <circle cx={300} cy={ 83} r={2.5} fill="currentColor" opacity="0.55" />

      {/* ── Bottom closing dot ────────────────────────────────────── */}
      <circle cx={300} cy={522} r={2.5} fill="currentColor" opacity="0.40" />

      {/* ── Leaves ────────────────────────────────────────────────── */}
      {ALL.map(({ x, y, r, s }, i) => {
        const w = 4.5 * s;
        const h = 13.5 * s;
        return (
          <g key={i} transform={`translate(${x}, ${y}) rotate(${r})`}>
            <path
              d={lp(w, h)}
              fill="currentColor"
              opacity={0.62 + (i % 4) * 0.08}
            />
            {/* Centre vein */}
            <line
              x1={0} y1={-h * 0.70}
              x2={0} y2={ h * 0.65}
              stroke="currentColor"
              strokeWidth="0.35"
              opacity="0.30"
            />
          </g>
        );
      })}
    </svg>
  );
}
