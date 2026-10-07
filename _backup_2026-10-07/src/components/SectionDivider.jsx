import { motion } from 'framer-motion';
import CircuitBackdrop from './CircuitBackdrop.jsx';
import Gear from './Gear.jsx';

// Aziz-style full-slide section divider, IoT/robotique themed.
// Props: n ("01"), title ("Introduction et Contexte"), hint (short subtitle)
export default function SectionDivider({ n, title, hint }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <CircuitBackdrop opacity={0.28} density="high" />

      {/* Corner brackets — Aziz signature */}
      {[
        { top: 40, left: 40, rot: 0 },
        { top: 40, right: 40, rot: 90 },
        { bottom: 40, right: 40, rot: 180 },
        { bottom: 40, left: 40, rot: 270 },
      ].map((c, i) => (
        <motion.svg
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
          style={{ position: 'absolute', width: 60, height: 60, ...c, transform: `rotate(${c.rot}deg)` }}
          viewBox="0 0 60 60" fill="none"
        >
          <path d="M 2 20 L 2 2 L 20 2" stroke="var(--orange-400)" strokeWidth="2" />
        </motion.svg>
      ))}

      {/* Decorative gears */}
      <div style={{ position: 'absolute', top: 90, right: 130, opacity: 0.28, zIndex: 1 }}>
        <Gear size={90} teeth={12} color="var(--orange-400)" duration={22} />
      </div>
      <div style={{ position: 'absolute', bottom: 90, left: 130, opacity: 0.22, zIndex: 1 }}>
        <Gear size={70} teeth={10} color="var(--cyan-400)" reverse duration={18} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        maxWidth: 900,
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--cyan-400)',
            opacity: 0.85,
          }}
        >
          Partie {n}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(6rem, 12vw, 12rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            background: 'linear-gradient(180deg, var(--orange-400), var(--orange-500))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.05em',
          }}
        >
          {n}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {title}
        </motion.h1>

        {hint && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              fontSize: '1.15rem',
              color: 'var(--navy-100)',
              opacity: 0.75,
              maxWidth: 640,
              margin: 0,
            }}
          >
            {hint}
          </motion.p>
        )}

        {/* Underline sweep */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 220,
            height: 3,
            background: 'linear-gradient(90deg, transparent, var(--orange-500), transparent)',
            transformOrigin: 'left',
            marginTop: 8,
          }}
        />
      </div>
    </div>
  );
}
