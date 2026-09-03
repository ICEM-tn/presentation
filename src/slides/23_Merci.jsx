import { motion } from 'framer-motion';
import CircuitBackdrop from '../components/CircuitBackdrop.jsx';
import Gear from '../components/Gear.jsx';

export default function Merci() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <CircuitBackdrop opacity={0.32} accent="var(--orange-400)" density="high" />

      {/* Gears décoratifs coins */}
      <div style={{ position: 'absolute', top: 60, left: 80, opacity: 0.32, zIndex: 1 }}>
        <Gear size={100} teeth={12} color="var(--orange-400)" duration={24} />
      </div>
      <div style={{ position: 'absolute', top: 130, left: 165, opacity: 0.24, zIndex: 1 }}>
        <Gear size={60} teeth={10} color="var(--cyan-400)" reverse duration={16} />
      </div>
      <div style={{ position: 'absolute', bottom: 100, right: 90, opacity: 0.28, zIndex: 1 }}>
        <Gear size={80} teeth={11} color="var(--orange-400)" reverse duration={20} />
      </div>
      {/* Orbiting rings */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={i}
            cx="400" cy="300"
            initial={{ r: 40, opacity: 0.7 }}
            animate={{ r: 320, opacity: 0 }}
            transition={{
              duration: 4,
              delay: i * 0.8,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            stroke="var(--orange-400)"
            strokeWidth="1"
            fill="none"
          />
        ))}
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="section-label"
      >
        Fin de la présentation
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 12vw, 10rem)',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          margin: '24px 0',
          background: 'linear-gradient(180deg, var(--white) 30%, var(--orange-400) 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 20px 80px rgba(255, 122, 26, 0.3)',
        }}
      >
        Merci.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        style={{
          fontSize: '1.4rem',
          color: 'var(--navy-100)',
          opacity: 0.9,
          maxWidth: 640,
          marginBottom: 40,
        }}
      >
        Place aux questions du jury.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        style={{
          display: 'flex',
          gap: 24,
          alignItems: 'center',
          fontSize: 13,
          color: 'var(--grey-500)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.08em',
        }}
      >
        <div>MOUTIA BENSAAD</div>
        <div style={{ opacity: 0.4 }}>·</div>
        <div>ISET NABEUL</div>
        <div style={{ opacity: 0.4 }}>·</div>
        <div>2026</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        style={{
          position: 'absolute',
          bottom: 60,
          display: 'flex',
          gap: 8,
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 1.4,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: 'var(--orange-400)',
              opacity: 0.6,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
