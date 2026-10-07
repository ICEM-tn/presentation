import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const words = [
  { fr: 'Instrumenter', desc: '2 machines · 4 familles de capteurs : température, vibration, thermique, courant', icon: '◆' },
  { fr: 'Relier', desc: 'Chaîne complète : capteur → backend → IA → notification', icon: '◇' },
  { fr: 'Livrer', desc: 'Web pour le responsable · mobile pour le technicien', icon: '★' },
];

export default function Objectif() {
  return (
    <Slide sectionLabel="02 · Objectif">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Trois objectifs.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 60 }}
      >
        Une chaîne simple, de la mesure à la décision.
      </motion.p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        marginTop: 20,
      }}>
        {words.map((w, i) => (
          <div key={w.fr} style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 20 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.5 + i * 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                flex: 1,
                padding: '36px 24px',
                background: i === 2
                  ? 'linear-gradient(180deg, rgba(255, 122, 26, 0.18), rgba(255, 122, 26, 0.04))'
                  : 'linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.5))',
                border: i === 2 ? '1px solid rgba(255, 122, 26, 0.45)' : '1px solid rgba(104, 121, 201, 0.25)',
                borderRadius: 18,
                textAlign: 'center',
                boxShadow: i === 2 ? '0 12px 40px -12px rgba(255, 122, 26, 0.5)' : 'none',
              }}
            >
              <div style={{
                fontSize: 36,
                color: i === 2 ? 'var(--orange-400)' : 'var(--navy-300)',
                marginBottom: 12,
              }}>{w.icon}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                fontWeight: 800,
                lineHeight: 1,
                marginBottom: 12,
                color: i === 2 ? 'var(--orange-400)' : 'var(--white)',
              }}>
                {w.fr}.
              </div>
              <div style={{ fontSize: 14, color: 'var(--grey-300)', opacity: 0.85 }}>
                {w.desc}
              </div>
            </motion.div>

            {i < words.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.35 }}
                style={{ color: 'var(--orange-400)', fontSize: 32, fontWeight: 300 }}
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </Slide>
  );
}
