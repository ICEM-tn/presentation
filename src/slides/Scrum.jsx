import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const phases = [
  { n: '01', title: 'Backlog produit', hint: 'Besoins ICEM · exigences fonctionnelles' },
  { n: '02', title: 'Sprints', hint: '2 à 4 semaines · itératif' },
  { n: '03', title: 'Daily stand-up', hint: '10 min · état d’avancement' },
  { n: '04', title: 'Revue de sprint', hint: 'Livrable présenté à l’encadreur' },
  { n: '05', title: 'Rétrospective', hint: 'Améliorer le cycle suivant' },
];

export default function Scrum() {
  return (
    <Slide sectionLabel="02 · État de l'art">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 8 }}
      >
        Méthodologie Scrum.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 40 }}
      >
        Cycle itératif adopté pendant les 6 mois du stage.
      </motion.p>

      {/* Circular loop diagram */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 40, alignItems: 'center', flex: 1 }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1', maxWidth: 380, margin: '0 auto' }}>
          <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }}>
            {/* Outer ring */}
            <motion.circle
              cx="200" cy="200" r="150"
              stroke="var(--orange-400)" strokeWidth="2"
              fill="none" strokeDasharray="8 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            {/* Arrow tips at 5 positions */}
            {phases.map((_, i) => {
              const angle = (i / phases.length) * Math.PI * 2 - Math.PI / 2;
              const x = 200 + Math.cos(angle) * 150;
              const y = 200 + Math.sin(angle) * 150;
              return (
                <motion.circle
                  key={i}
                  cx={x} cy={y} r="8"
                  fill="var(--orange-500)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
                />
              );
            })}
            {/* Center label */}
            <motion.text
              x="200" y="195"
              textAnchor="middle"
              fill="var(--cyan-400)"
              fontFamily="var(--font-mono)"
              fontSize="14"
              letterSpacing="0.15em"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              SPRINT
            </motion.text>
            <motion.text
              x="200" y="220"
              textAnchor="middle"
              fill="var(--orange-400)"
              fontFamily="var(--font-display)"
              fontSize="24"
              fontWeight="700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.7 }}
            >
              2 à 4 sem.
            </motion.text>
          </svg>
        </div>

        {/* Phase list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {phases.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                padding: '12px 16px',
                background: 'linear-gradient(90deg, rgba(255, 122, 26, 0.08), transparent)',
                borderLeft: '3px solid var(--orange-400)',
                borderRadius: '0 10px 10px 0',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--orange-400)',
                minWidth: 32,
              }}>
                {p.n}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--grey-500)', marginTop: 2 }}>
                  {p.hint}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
