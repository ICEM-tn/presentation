import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const items = [
  {
    n: '01',
    title: 'Edge AI',
    desc: 'Déployer le modèle XGBoost sur le Raspberry — décision locale sans reseau.',
    tag: 'Court terme',
  },
  {
    n: '02',
    title: 'Weibull',
    desc: 'Remplacer la regression lineaire par une loi de Weibull pour la duree de vie.',
    tag: 'Moyen terme',
  },
  {
    n: '03',
    title: 'Calibration par machine',
    desc: 'Deltas capteur spécifiques Alpha vs Gamma · F1 stratifie par modèle.',
    tag: 'Moyen terme',
  },
  {
    n: '04',
    title: 'Vision',
    desc: 'Caméra + CV pour detecter les défauts de sertissage en sortie de machine.',
    tag: 'Long terme',
  },
];

export default function Perspectives() {
  return (
    <Slide sectionLabel="06 · Perspectives">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Et après ?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 40 }}
      >
        Quatre pistes concrètes, priorisées.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {items.map((it, i) => (
          <motion.div
            key={it.n}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.4 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: 24,
              background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.5))',
              border: '1px solid rgba(104, 121, 201, 0.25)',
              borderRadius: 14,
              display: 'flex',
              gap: 20,
              alignItems: 'flex-start',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 46,
              fontWeight: 800,
              color: 'var(--orange-400)',
              opacity: 0.4,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              {it.n}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>
                  {it.title}
                </div>
                <span style={{
                  padding: '2px 8px',
                  background: 'rgba(78, 205, 196, 0.12)',
                  border: '1px solid rgba(78, 205, 196, 0.3)',
                  borderRadius: 4,
                  fontSize: 10,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--cyan-400)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  {it.tag}
                </span>
              </div>
              <div style={{ fontSize: 14, color: 'var(--grey-300)', lineHeight: 1.5 }}>
                {it.desc}
              </div>
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
    </Slide>
  );
}
