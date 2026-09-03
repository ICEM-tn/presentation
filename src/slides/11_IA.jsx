import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import NetworkMesh from '../components/NetworkMesh.jsx';

const models = [
  { name: 'RF v1', role: 'Historique · zones', f1: 0.150, color: '#6879C9', delay: 0.4 },
  { name: 'RF v2', role: 'IoT synthétique · causes', f1: 0.448, color: '#4ECDC4', delay: 0.6 },
  { name: 'XGBoost v3', role: 'Probabilité · horizon 2 h', f1: 0.835, color: '#FF7A1A', delay: 0.8, best: true },
];

export default function IA() {
  return (
    <>
    <NetworkMesh opacity={0.25} color="var(--cyan-400)" />
    <Slide sectionLabel="Couche 4 · Intelligence">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Trois modèles ML.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 40 }}
      >
        Un microservice FastAPI · scikit-learn + XGBoost.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {models.map((m) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, rotateY: -20, y: 30 }}
            animate={{ opacity: 1, rotateY: 0, y: 0 }}
            transition={{ duration: 0.85, delay: m.delay, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: 24,
              background: m.best
                ? `linear-gradient(180deg, ${m.color}22, ${m.color}06)`
                : `linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.5))`,
              border: `1px solid ${m.best ? m.color + '80' : 'rgba(104, 121, 201, 0.25)'}`,
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: m.best ? `0 20px 60px -20px ${m.color}80` : 'none',
            }}
          >
            {m.best && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: m.delay + 0.4 }}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  padding: '3px 8px',
                  background: m.color,
                  color: 'var(--navy-950)',
                  fontSize: 10,
                  fontWeight: 700,
                  borderRadius: 4,
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                RETENU
              </motion.div>
            )}

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: m.color, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Modèle
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, lineHeight: 1 }}>
              {m.name}
            </div>
            <div style={{ fontSize: 13, color: 'var(--grey-300)' }}>
              {m.role}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(104, 121, 201, 0.2)' }}>
              <div style={{ fontSize: 11, color: 'var(--grey-500)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                F1-score (macro)
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800, color: m.color, lineHeight: 1 }}>
                <AnimatedCounter to={m.f1} decimals={3} delay={m.delay + 0.4} duration={1.4} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.6 }}
        style={{
          marginTop: 32,
          padding: '14px 20px',
          background: 'linear-gradient(90deg, rgba(255, 122, 26, 0.1), transparent)',
          border: '1px solid rgba(255, 122, 26, 0.3)',
          borderRadius: 10,
          textAlign: 'center',
          fontSize: 14,
        }}
      >
        Seuil <strong style={{ color: 'var(--orange-400)' }}>80 %</strong> ⇒ création automatique d'une maintenance prédictive.
      </motion.div>
    </Slide>
    </>
  );
}
