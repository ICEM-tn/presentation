import { motion } from 'framer-motion';

/**
 * Fond décoratif inspiré d'un circuit imprimé (PCB) :
 * - grille orthogonale de pistes cuivrées faibles
 * - "pads" (points de soudure) répartis
 * - impulsions lumineuses qui parcourent les pistes en boucle
 * Non-interactif, subtil, à poser derrière le contenu d'un slide.
 */
export default function CircuitBackdrop({ opacity = 0.35, accent = 'var(--orange-400)', density = 'medium' }) {
  const isDense = density === 'high';
  const grid = isDense ? 80 : 120;
  const pulseCount = isDense ? 8 : 5;

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
        zIndex: 0,
      }}
      viewBox="0 0 1400 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="circuitGrid" width={grid} height={grid} patternUnits="userSpaceOnUse">
          <path d={`M ${grid} 0 L 0 0 0 ${grid}`} fill="none" stroke="rgba(104,121,201,0.14)" strokeWidth="0.6" />
        </pattern>
        <radialGradient id="fadeMask">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="mask-fade">
          <rect width="1400" height="900" fill="url(#fadeMask)" />
        </mask>
        <linearGradient id="traceGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0" />
          <stop offset="50%" stopColor={accent} stopOpacity="1" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grille de fond */}
      <rect width="1400" height="900" fill="url(#circuitGrid)" mask="url(#mask-fade)" />

      {/* Pistes cuivrées longues (traits horizontaux + verticaux avec coudes) */}
      <g stroke="rgba(104,121,201,0.35)" strokeWidth="1" fill="none">
        <path d="M 0 180 L 380 180 L 420 220 L 900 220 L 940 180 L 1400 180" />
        <path d="M 0 720 L 460 720 L 500 680 L 1400 680" />
        <path d="M 220 0 L 220 300 L 260 340 L 260 900" />
        <path d="M 1100 0 L 1100 260 L 1140 300 L 1140 900" />
        <path d="M 700 0 L 700 120 L 660 160 L 660 500 L 700 540 L 700 900" />
      </g>

      {/* Pads (points de soudure) */}
      <g fill={accent} opacity="0.5">
        {[
          [380, 180], [900, 220], [460, 720], [220, 300], [1100, 260],
          [700, 120], [660, 500], [1140, 300], [500, 680], [700, 540],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="3.5" />
            <motion.circle
              cx={cx} cy={cy}
              initial={{ r: 4, opacity: 0.6 }}
              animate={{ r: 14, opacity: 0 }}
              transition={{ duration: 2.2, delay: i * 0.35, repeat: Infinity, ease: 'easeOut' }}
              stroke={accent}
              strokeWidth="1"
              fill="none"
            />
          </g>
        ))}
      </g>

      {/* Impulsions lumineuses parcourant les pistes */}
      {Array.from({ length: pulseCount }).map((_, i) => {
        const paths = [
          'M 0 180 L 380 180 L 420 220 L 900 220 L 940 180 L 1400 180',
          'M 0 720 L 460 720 L 500 680 L 1400 680',
          'M 220 0 L 220 300 L 260 340 L 260 900',
          'M 1100 0 L 1100 260 L 1140 300 L 1140 900',
          'M 700 0 L 700 120 L 660 160 L 660 500 L 700 540 L 700 900',
        ];
        const p = paths[i % paths.length];
        return (
          <g key={i}>
            <motion.circle
              r="3.5"
              fill={accent}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 4.5,
                delay: i * 0.7,
                repeat: Infinity,
                repeatDelay: 0.5,
                times: [0, 0.05, 0.95, 1],
              }}
              style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
            >
              <animateMotion
                dur="4.5s"
                begin={`${i * 0.7}s`}
                repeatCount="indefinite"
                path={p}
              />
            </motion.circle>
          </g>
        );
      })}
    </svg>
  );
}
