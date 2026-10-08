import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';

export default function Probleme() {
  return (
    <Slide sectionLabel="01 · Le problème">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Une panne coûte cher.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
      >
        Maintenance corrective : trop tard, trop long, trop cher.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 20 }}>
        <PainCard
          delay={0.45}
          value={1467}
          label="Pannes documentées"
          hint="Historique ICEM · surtout 2022"
          icon="⚠"
        />
        <PainCard
          delay={0.6}
          value={12}
          suffix=" zones"
          label="Sous-ensembles touchés"
          hint="Alpha · Gamma"
          icon="⚙"
        />
        <PainCard
          delay={0.75}
          value={40}
          suffix=" %"
          label="Pannes évitables"
          hint="Avec detection préalable"
          icon="⏱"
          highlight
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        style={{
          marginTop: 40,
          padding: '18px 24px',
          background: 'linear-gradient(90deg, rgba(255, 122, 26, 0.12), rgba(255, 122, 26, 0.03))',
          border: '1px solid rgba(255, 122, 26, 0.35)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div style={{ fontSize: 24 }}>💡</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>
          Notre solution : <span style={{ color: 'var(--orange-400)' }}>prédire avant la panne</span>.
        </div>
      </motion.div>
    </Slide>
  );
}

function PainCard({ delay, value, suffix, label, hint, icon, highlight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: 28,
        background: highlight
          ? 'linear-gradient(180deg, rgba(255, 122, 26, 0.14), rgba(255, 122, 26, 0.04))'
          : 'linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.5))',
        border: `1px solid ${highlight ? 'rgba(255, 122, 26, 0.4)' : 'rgba(104, 121, 201, 0.2)'}`,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{
        fontSize: 28,
        opacity: 0.75,
        color: highlight ? 'var(--orange-400)' : 'var(--navy-300)',
      }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
        fontWeight: 800,
        lineHeight: 1,
        color: highlight ? 'var(--orange-400)' : 'var(--white)',
      }}>
        <AnimatedCounter to={value} suffix={suffix} delay={delay + 0.15} />
      </div>
      <div style={{ fontSize: '1rem', fontWeight: 600, marginTop: 4 }}>{label}</div>
      <div style={{ fontSize: 12, color: 'var(--grey-500)', fontFamily: 'var(--font-mono)' }}>{hint}</div>
    </motion.div>
  );
}
