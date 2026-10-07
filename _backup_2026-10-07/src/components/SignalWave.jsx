import { motion } from 'framer-motion';

/**
 * Onde de type oscilloscope : trace continue avec animation "défilement".
 * Types : `sine` (sinusoïde), `vibration` (bruit), `thermal` (créneaux doux),
 *         `current` (impulsions brèves).
 */
export default function SignalWave({
  type = 'sine',
  color = 'var(--cyan-400)',
  height = 46,
  width = '100%',
  strokeWidth = 1.4,
  delay = 0,
}) {
  const path = PATHS[type] || PATHS.sine;

  return (
    <div style={{ position: 'relative', width, height, overflow: 'hidden' }}>
      <svg
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="15%" stopColor={color} stopOpacity="0.7" />
            <stop offset="85%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Ligne de base */}
        <line x1="0" y1="30" x2="400" y2="30" stroke={color} strokeWidth="0.4" strokeDasharray="2 4" opacity="0.3" />

        {/* Onde avec défilement continu */}
        <motion.g
          initial={{ x: 0 }}
          animate={{ x: [-400, 0] }}
          transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <path d={path} stroke={`url(#gradient-${type})`} strokeWidth={strokeWidth} fill="none" />
          <path d={path} stroke={`url(#gradient-${type})`} strokeWidth={strokeWidth} fill="none" transform="translate(400,0)" />
        </motion.g>

        {/* Curseur clignotant */}
        <motion.line
          x1="395" y1="8" x2="395" y2="52"
          stroke={color}
          strokeWidth="1"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

const PATHS = {
  // Sinusoïde régulière (température ambiante)
  sine: 'M 0 30 Q 25 10, 50 30 T 100 30 T 150 30 T 200 30 T 250 30 T 300 30 T 350 30 T 400 30',

  // Vibration bruitée (MPU-6050)
  vibration:
    'M 0 30 L 10 18 L 18 42 L 28 22 L 38 38 L 48 15 L 58 45 L 68 20 L 78 40 L 88 25 L 98 35 L 108 12 L 118 44 L 128 28 L 138 32 L 148 18 L 158 42 L 168 22 L 178 38 L 188 15 L 198 45 L 208 25 L 218 35 L 228 12 L 238 44 L 248 28 L 258 32 L 268 18 L 278 42 L 288 20 L 298 40 L 308 15 L 318 45 L 328 25 L 338 35 L 348 20 L 358 40 L 368 22 L 378 38 L 388 28 L 400 30',

  // Créneaux doux (chauffe thermique)
  thermal:
    'M 0 45 L 40 45 C 50 45, 55 20, 70 20 L 130 20 C 145 20, 150 45, 160 45 L 220 45 C 235 45, 240 15, 255 15 L 320 15 C 335 15, 340 40, 355 40 L 400 40',

  // Impulsions courtes (courant électrique appel puis stabilisation)
  current:
    'M 0 42 L 60 42 L 65 10 L 70 42 L 130 42 L 135 8 L 140 42 L 200 42 L 205 12 L 210 42 L 270 42 L 275 15 L 280 42 L 340 42 L 345 10 L 350 42 L 400 42',
};
