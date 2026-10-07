import { motion } from 'framer-motion';

/**
 * Petits paquets (carrés arrondis) qui traversent une piste horizontale.
 * Représente le trafic IoT vers le backend.
 */
export default function DataPackets({
  count = 4,
  color = 'var(--cyan-400)',
  width = '100%',
  height = 8,
  speed = 2.4,
  delayStart = 0,
}) {
  return (
    <div style={{ position: 'relative', width, height, overflow: 'hidden' }}>
      {/* Piste */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${color}44, transparent)`,
        transform: 'translateY(-50%)',
      }} />

      {/* Paquets */}
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: '-10%', opacity: 0 }}
          animate={{ x: '110%', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: speed,
            delay: delayStart + i * (speed / count),
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.1, 0.9, 1],
          }}
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 12,
            height: 6,
            background: color,
            borderRadius: 2,
            boxShadow: `0 0 8px ${color}, 0 0 4px ${color}`,
          }}
        />
      ))}
    </div>
  );
}
