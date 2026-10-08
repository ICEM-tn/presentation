import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import NetworkMesh from '../components/NetworkMesh.jsx';

const models = [
  { name: 'Random Forest', role: 'Cause de la panne · 5 causes (C01 à C05)', tag: 'Pourquoi ?', metric: 'F1 macro', value: 0.85, color: '#4ECDC4', delay: 0.4 },
  { name: 'XGBoost', role: 'Probabilité de panne dans les 24 h', tag: 'Quand ?', metric: 'AUC', value: 0.94, color: '#FF7A1A', delay: 0.55 },
  { name: 'Régression linéaire', role: 'Fiabilité · projection 3 mois', tag: 'Fiabilité', metric: 'R² test', value: 0.79, color: '#B388FF', delay: 0.7 },
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
        Un microservice FastAPI · mesures capteurs des 2 dernières heures.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {models.map((m) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, rotateY: -20, y: 30 }}
            animate={{ opacity: 1, rotateY: 0, y: 0 }}
            transition={{ duration: 0.85, delay: m.delay, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: 24,
              background: `linear-gradient(180deg, ${m.color}1A, rgba(10, 18, 48, 0.5))`,
              border: `1px solid ${m.color}55`,
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: m.delay + 0.4 }}
              style={{
                alignSelf: 'flex-start',
                padding: '3px 8px',
                background: m.color,
                color: 'var(--navy-950)',
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 4,
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
              }}
            >
              {m.tag}
            </motion.div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: m.color, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Modèle
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: m.name.length > 12 ? 24 : 30, fontWeight: 800, lineHeight: 1 }}>
              {m.name}
            </div>
            <div style={{ fontSize: 13, color: 'var(--grey-300)' }}>
              {m.role}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(104, 121, 201, 0.2)' }}>
              <div style={{ fontSize: 11, color: 'var(--grey-500)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                {m.metric}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800, color: m.color, lineHeight: 1 }}>
                <AnimatedCounter to={m.value} decimals={2} decimalComma delay={m.delay + 0.4} duration={1.4} />
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
        Seuil <strong style={{ color: 'var(--orange-400)' }}>60 %</strong> → alerte · <strong style={{ color: 'var(--orange-400)' }}>80 %</strong> → alerte critique + maintenance prédictive
      </motion.div>
    </Slide>
    </>
  );
}
