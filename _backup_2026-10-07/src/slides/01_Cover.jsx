import { motion } from 'framer-motion';
import CircuitBackdrop from '../components/CircuitBackdrop.jsx';
import Gear from '../components/Gear.jsx';

export default function Cover() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 48,
      alignItems: 'center',
      position: 'relative',
    }}>
      <CircuitBackdrop opacity={0.4} density="high" />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            letterSpacing: '0.2em',
            color: 'var(--orange-400)',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Projet de fin d'études — Mastère 2
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          Maintenance
          <br />
          <span style={{
            background: 'linear-gradient(180deg, var(--orange-400), var(--orange-500))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>prédictive</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontSize: '1.35rem',
            color: 'var(--navy-100)',
            opacity: 0.9,
            maxWidth: 640,
            marginBottom: 48,
          }}
        >
          Machines Komax <strong>Alpha&nbsp;433&nbsp;H</strong> & <strong>Gamma&nbsp;333&nbsp;PC</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '1rem' }}
        >
          <div style={{ color: 'var(--grey-500)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>
            Préparé par
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 600 }}>
            Moutia Bensaad
          </div>
          <div style={{ color: 'var(--navy-100)', opacity: 0.8, fontSize: '0.95rem', marginTop: 10 }}>
            Encadreur académique : <strong>Imed Hidri</strong>
          </div>
          <div style={{ color: 'var(--navy-100)', opacity: 0.8, fontSize: '0.95rem' }}>
            Encadreur société : <strong>Yassine Hammami</strong>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          padding: 32,
          background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.6), rgba(10, 18, 48, 0.5))',
          border: '1px solid rgba(104, 121, 201, 0.25)',
          borderRadius: 24,
          position: 'relative',
          zIndex: 2,
          backdropFilter: 'blur(4px)',
        }}
      >
        <img src="img/institution/iset_nabeul_logo.png" alt="ISET Nabeul" style={{ height: 120, objectFit: 'contain' }} />
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--grey-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          ISET NABEUL · 2026
        </div>
      </motion.div>

      {/* Engrenages décoratifs — thème robotique */}
      <div style={{ position: 'absolute', bottom: 40, left: 60, opacity: 0.35, zIndex: 1 }}>
        <Gear size={110} teeth={12} color="var(--orange-400)" duration={22} />
      </div>
      <div style={{ position: 'absolute', bottom: 130, left: 155, opacity: 0.28, zIndex: 1 }}>
        <Gear size={70} teeth={10} color="var(--cyan-400)" reverse duration={16} />
      </div>

      <SensorPulse />
    </div>
  );
}

function SensorPulse() {
  return (
    <svg
      style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.28, pointerEvents: 'none' }}
      width="420" height="420" viewBox="0 0 420 420" fill="none"
    >
      {[0, 1, 2, 3].map(i => (
        <motion.circle
          key={i}
          cx="210" cy="210"
          initial={{ r: 20, opacity: 0.6 }}
          animate={{ r: 180, opacity: 0 }}
          transition={{
            duration: 3.2,
            delay: i * 0.8,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          stroke="var(--orange-400)"
          strokeWidth="1"
          fill="none"
        />
      ))}
      <circle cx="210" cy="210" r="10" fill="var(--orange-500)" />
    </svg>
  );
}
