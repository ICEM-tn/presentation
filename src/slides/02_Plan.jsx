import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';
import CircuitBackdrop from '../components/CircuitBackdrop.jsx';
import Gear from '../components/Gear.jsx';

// index cible = position dans slides/index.js (0-based)
// Structure Aziz : 6 sections, dividers inclus.
const sections = [
  {
    n: '01', title: 'Introduction et contexte', hint: 'ICEM · machines · problématique',
    icon: '🏭', target: 2,
    range: [2, 6],
  },
  {
    n: '02', title: 'État de l\'art', hint: 'Scrum · matériels · stack',
    icon: '📚', target: 7,
    range: [7, 10],
  },
  {
    n: '03', title: 'Conception', hint: 'Architecture 5 couches · UML · Pipeline',
    icon: '⚙', target: 11,
    range: [11, 15],
  },
  {
    n: '04', title: 'Développement', hint: 'Backend · IA · web · mobile · déploiement',
    icon: '💻', target: 16,
    range: [16, 28],
  },
  {
    n: '05', title: 'Démonstration', hint: 'Passage à la démo live',
    icon: '▶', target: 29,
    range: [29, 29],
  },
  {
    n: '06', title: 'Résultats et conclusion', hint: 'KPI · perspectives · merci',
    icon: '🎓', target: 30,
    range: [30, 32],
  },
];

export default function Plan({ goTo }) {
  return (
    <>
      <CircuitBackdrop opacity={0.25} />

      {/* Engrenages décoratifs (thème robotique) */}
      <div style={{ position: 'absolute', top: 40, right: 60, opacity: 0.4, zIndex: 0 }}>
        <Gear size={90} teeth={12} color="var(--orange-400)" duration={20} />
      </div>
      <div style={{ position: 'absolute', top: 100, right: 130, opacity: 0.3, zIndex: 0 }}>
        <Gear size={60} teeth={10} color="var(--cyan-400)" reverse duration={16} />
      </div>

      <Slide sectionLabel="Plan de la présentation">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="slide-title"
          style={{ marginBottom: 8, position: 'relative', zIndex: 2 }}
        >
          Six étapes.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="slide-subtitle"
          style={{ marginBottom: 32, position: 'relative', zIndex: 2 }}
        >
          Cliquez sur une étape pour y accéder directement.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 20,
          flex: 1,
          maxHeight: 460,
          position: 'relative',
          zIndex: 2,
        }}>
          {sections.map((s, i) => (
            <motion.button
              key={s.n}
              onClick={() => goTo && goTo(s.target)}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.45 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                textAlign: 'left',
                padding: '24px 22px',
                background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.6), rgba(10, 18, 48, 0.6))',
                border: '1px solid rgba(104, 121, 201, 0.25)',
                borderRadius: 18,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                color: 'inherit',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 122, 26, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(104, 121, 201, 0.25)';
              }}
            >
              {/* Trace circuit dans le coin */}
              <svg
                style={{ position: 'absolute', top: 0, right: 0, opacity: 0.25, pointerEvents: 'none' }}
                width="100" height="70" viewBox="0 0 100 70" fill="none"
              >
                <path d="M 100 10 L 70 10 L 60 20 L 60 40 L 40 40 L 30 50 L 30 70" stroke="var(--orange-400)" strokeWidth="1" />
                <circle cx="70" cy="10" r="2.5" fill="var(--orange-400)" />
                <circle cx="60" cy="40" r="2.5" fill="var(--orange-400)" />
              </svg>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 32, opacity: 0.85 }}>{s.icon}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 36,
                  fontWeight: 300,
                  color: 'var(--orange-400)',
                  opacity: 0.55,
                  lineHeight: 1,
                }}>
                  {s.n}
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 4,
                }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--grey-500)', marginBottom: 10 }}>
                  {s.hint}
                </div>
                <div style={{
                  fontSize: 10,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--cyan-400)',
                  opacity: 0.8,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  {s.range[0] === s.range[1]
                    ? `slide ${s.range[0] + 1}`
                    : `slides ${s.range[0] + 1} → ${s.range[1] + 1}`}
                </div>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.65 + i * 0.09 }}
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: 3,
                  background: 'linear-gradient(90deg, var(--orange-500), transparent)',
                  transformOrigin: 'left',
                }}
              />
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--grey-500)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <span>← → au clavier</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>H pour revenir ici</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>F plein écran</span>
        </motion.div>
      </Slide>
    </>
  );
}
