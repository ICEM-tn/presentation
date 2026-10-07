import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';

export default function ICEM() {
  return (
    <Slide sectionLabel="01 · Contexte">
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="slide-title"
            style={{ marginBottom: 20 }}
          >
            ICEM Nabeul.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: '1.2rem', color: 'var(--navy-100)', opacity: 0.9, lineHeight: 1.5, marginBottom: 32 }}
          >
            Sous-traitant faisceaux électriques.
            <br />
            Automobile · électroménager · médical.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <StatCard delay={0.5} value={40} suffix=" ans" label="d'expérience" />
            <StatCard delay={0.65} value={1600} suffix="+" label="salariés" />
            <StatCard delay={0.8} value={3} label="secteurs" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            alignItems: 'center',
            padding: 32,
            background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.35), rgba(10, 18, 48, 0.35))',
            border: '1px solid rgba(104, 121, 201, 0.2)',
            borderRadius: 20,
          }}
        >
          <img src="img/entreprise/icem.png" alt="ICEM" style={{ height: 90, objectFit: 'contain' }} />
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, width: '100%',
          }}>
            {['produit1', 'produit2', 'produit3'].map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.12 }}
                style={{
                  aspectRatio: '1',
                  borderRadius: 10,
                  overflow: 'hidden',
                  background: '#fff',
                }}
              >
                <img src={`img/entreprise/${p}.png`} alt={p} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}

function StatCard({ delay, value, suffix = '', label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      style={{
        padding: '16px 12px',
        background: 'rgba(255, 122, 26, 0.06)',
        border: '1px solid rgba(255, 122, 26, 0.25)',
        borderRadius: 12,
      }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2rem',
        fontWeight: 800,
        color: 'var(--orange-400)',
        lineHeight: 1,
      }}>
        <AnimatedCounter to={value} suffix={suffix} delay={delay + 0.15} />
      </div>
      <div style={{ fontSize: 12, color: 'var(--navy-100)', opacity: 0.75, marginTop: 6 }}>
        {label}
      </div>
    </motion.div>
  );
}
