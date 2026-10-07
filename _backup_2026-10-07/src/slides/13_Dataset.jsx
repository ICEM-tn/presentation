import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';

export default function Dataset() {
  return (
    <Slide sectionLabel="04 · Intelligence · Dataset">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Deux sources de données.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 40 }}
      >
        Historique réel · signaux synthétiques ancrés physiquement.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 32, alignItems: 'center' }}>
        <DataCard
          delay={0.4}
          label="Historique"
          value={1467}
          unit="événements"
          hint="ICEM · 2019 – 2024"
          badges={['5 ans', 'Zones', 'MTBF']}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{
            fontSize: 48,
            color: 'var(--orange-400)',
            fontWeight: 300,
          }}
        >
          +
        </motion.div>

        <DataCard
          delay={0.6}
          label="Synthétique IoT"
          value={64800}
          unit="lignes · 1 toutes les 5 min"
          hint="Signature physique par cause"
          badges={['DHT · MPU · AMG · SCT', '13 causes']}
          highlight
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        style={{
          marginTop: 40,
          padding: '20px 24px',
          background: 'linear-gradient(90deg, rgba(78, 205, 196, 0.06), transparent)',
          border: '1px solid rgba(78, 205, 196, 0.25)',
          borderRadius: 12,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 20,
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 24, color: 'var(--cyan-400)' }}>◈</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Découpage stratifié</div>
          <div style={{ fontSize: 13, color: 'var(--grey-300)' }}>80 % entraînement · 20 % test · SMOTE sur l'entraînement seulement</div>
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 32,
          fontWeight: 800,
          color: 'var(--cyan-400)',
        }}>
          <AnimatedCounter to={12960} delay={1.2} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 400, color: 'var(--grey-500)', textAlign: 'right' }}>lignes de test</div>
        </div>
      </motion.div>
    </Slide>
  );
}

function DataCard({ delay, label, value, unit, hint, badges, highlight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: 28,
        background: highlight
          ? 'linear-gradient(180deg, rgba(255, 122, 26, 0.14), rgba(255, 122, 26, 0.04))'
          : 'linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.5))',
        border: `1px solid ${highlight ? 'rgba(255, 122, 26, 0.4)' : 'rgba(104, 121, 201, 0.25)'}`,
        borderRadius: 16,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: highlight ? 'var(--orange-400)' : 'var(--grey-500)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
      <div className="big-num" style={{
        background: highlight
          ? 'linear-gradient(180deg, var(--white) 0%, var(--orange-300) 100%)'
          : 'linear-gradient(180deg, var(--white) 0%, var(--navy-300) 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        <AnimatedCounter to={value} delay={delay + 0.2} duration={1.8} />
      </div>
      <div style={{ fontSize: 13, color: 'var(--grey-300)' }}>
        {unit}
      </div>
      <div style={{ fontSize: 12, color: 'var(--grey-500)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
        {hint}
      </div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
        {badges.map(b => (
          <span key={b} className="pill" style={{
            background: highlight ? 'rgba(255, 122, 26, 0.1)' : 'rgba(78, 205, 196, 0.1)',
            color: highlight ? 'var(--orange-400)' : 'var(--cyan-400)',
            borderColor: highlight ? 'rgba(255, 122, 26, 0.3)' : 'rgba(78, 205, 196, 0.3)',
          }}>{b}</span>
        ))}
      </div>
    </motion.div>
  );
}
