import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const pillars = [
  {
    n: '01',
    title: 'Instrumenter',
    desc: '5 capteurs par machine, Raspberry Pi vers le backend en JSON, moins d’1 seconde de la mesure à l’alerte.',
  },
  {
    n: '02',
    title: 'Prédire',
    desc: 'Random Forest sur 13 causes (F1 pondéré 0,81), XGBoost à 0,84 de F1 ; au-delà de 80 %, maintenance prédictive créée automatiquement.',
  },
  {
    n: '03',
    title: 'Restituer',
    desc: 'Web React et mobile Flutter sur la même API, notifications push, rapport PDF de fiabilité, déploiement local ICEM.',
  },
];

export default function Conclusion() {
  return (
    <Slide sectionLabel="06 · Conclusion">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Conclusion.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 36 }}
      >
        Un prototype opérationnel qui couvre les 3 axes du cahier des charges.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {pillars.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: 24,
              background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.5))',
              border: '1px solid rgba(104, 121, 201, 0.25)',
              borderRadius: 14,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 46,
              fontWeight: 800,
              color: 'var(--orange-400)',
              opacity: 0.45,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              {p.n}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>
              {p.title}
            </div>
            <div style={{ fontSize: 14, color: 'var(--grey-300)', lineHeight: 1.5 }}>
              {p.desc}
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.13 }}
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: 2,
                background: 'linear-gradient(90deg, var(--orange-500), transparent)',
                transformOrigin: 'left',
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.95 }}
        style={{
          marginTop: 32,
          padding: '18px 24px',
          background: 'linear-gradient(90deg, rgba(255, 122, 26, 0.14), rgba(255, 122, 26, 0.02))',
          border: '1px solid rgba(255, 122, 26, 0.35)',
          borderRadius: 12,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 18,
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 24 }}>✓</div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>
          Chaîne complète, du capteur physique jusqu'à l'écran mobile — prête pour le passage au terrain.
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
          OBJECTIFS ATTEINTS
        </div>
      </motion.div>
    </Slide>
  );
}
