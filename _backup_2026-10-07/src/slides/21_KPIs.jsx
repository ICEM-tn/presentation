import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';

const kpis = [
  { label: 'F1-score', value: 0.84, decimals: 2, decimalComma: true, hint: 'XGBoost v3 · cible binaire', color: 'var(--orange-400)' },
  { label: 'Couches', value: 5, hint: 'Perception → Application', color: 'var(--cyan-400)' },
  { label: 'Modèles ML', value: 4, hint: 'RF v1 · RF v2 · XGBoost · régression', color: 'var(--green-400)' },
  { label: 'Requêtes Postman', value: 120, suffix: '+', hint: '16 dossiers · API testée', color: 'var(--yellow-400)' },
];

export default function KPIs() {
  return (
    <Slide sectionLabel="06 · Bilan chiffré">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Ce qui a été livré.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 48 }}
      >
        4 chiffres qui résument 6 mois de travail.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.85,
              delay: 0.45 + i * 0.13,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              padding: 28,
              background: `linear-gradient(180deg, ${k.color}18, ${k.color}04)`,
              border: `1px solid ${k.color}55`,
              borderRadius: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: k.color,
              opacity: 0.9,
            }}>
              {k.label}
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1,
              color: k.color,
              textShadow: `0 0 30px ${k.color}55`,
            }}>
              <AnimatedCounter to={k.value} decimals={k.decimals ?? 0} decimalComma={k.decimalComma} suffix={k.suffix ?? ''} delay={0.6 + i * 0.13} duration={1.6} />
            </div>
            <div style={{ fontSize: 12, color: 'var(--grey-300)', fontFamily: 'var(--font-mono)' }}>
              {k.hint}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        style={{
          marginTop: 40,
          padding: '20px 24px',
          background: 'linear-gradient(90deg, rgba(255, 122, 26, 0.14), rgba(255, 122, 26, 0.02))',
          border: '1px solid rgba(255, 122, 26, 0.35)',
          borderRadius: 12,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 20,
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 26 }}>✓</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>
            Chaîne complète, du capteur physique jusqu'à l'écran mobile.
          </div>
        </div>
        <div style={{
          padding: '6px 12px',
          background: 'rgba(255, 122, 26, 0.2)',
          borderRadius: 999,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--orange-400)',
          letterSpacing: '0.05em',
          fontWeight: 700,
        }}>
          PROTOTYPE OPÉRATIONNEL
        </div>
      </motion.div>
    </Slide>
  );
}
