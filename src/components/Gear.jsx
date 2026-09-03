import { motion } from 'framer-motion';

/**
 * Engrenage SVG en rotation continue. Utilisé comme accent décoratif "robotique".
 */
export default function Gear({
  size = 60,
  teeth = 10,
  color = 'var(--orange-400)',
  reverse = false,
  duration = 14,
  opacity = 0.65,
  style = {},
}) {
  const outerR = 50;
  const innerR = 40;
  const holeR = 12;
  const path = generateGearPath(teeth, outerR, innerR);

  return (
    <motion.svg
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      viewBox="-60 -60 120 120"
      width={size}
      height={size}
      style={{ opacity, ...style }}
    >
      <path d={path} fill={color} />
      <circle cx="0" cy="0" r={holeR} fill="var(--navy-950)" />
      <circle cx="0" cy="0" r={holeR - 3} fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
    </motion.svg>
  );
}

function generateGearPath(teeth, outerR, innerR) {
  const step = (2 * Math.PI) / (teeth * 2);
  const pts = [];
  for (let i = 0; i < teeth * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  pts.push('Z');
  return pts.join(' ');
}
