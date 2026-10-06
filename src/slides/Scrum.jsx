import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const phases = [
  { n: 'S1', title: 'Authentification & comptes', hint: 'Inscription · connexion JWT · rôles' },
  { n: 'S2', title: 'Machines & parc', hint: 'Liste · détails · historique pannes' },
  { n: 'S3', title: 'Maintenance & interventions', hint: 'Préventif · signalement · photos' },
  { n: 'S4', title: 'Surveillance IoT', hint: 'Capteurs · suivi journalier' },
  { n: 'S5', title: 'IA & alertes', hint: 'Classification · probabilité · push' },
  { n: 'S6', title: 'Fiabilité & recommandation', hint: 'MTBF · MTTR · rapport PDF' },
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
        Six sprints découpés par cas d’utilisation — mars à août 2026.
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
              x="200" y="185"
              textAnchor="middle"
              fill="var(--cyan-400)"
              fontFamily="var(--font-mono)"
              fontSize="14"
              letterSpacing="0.15em"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              SCRUM
            </motion.text>
            <motion.text
              x="200" y="215"
              textAnchor="middle"
              fill="var(--orange-400)"
              fontFamily="var(--font-display)"
              fontSize="28"
              fontWeight="800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.7 }}
            >
              6 sprints
            </motion.text>
            <motion.text
              x="200" y="238"
              textAnchor="middle"
              fill="var(--grey-500)"
              fontFamily="var(--font-mono)"
              fontSize="11"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.9 }}
            >
              mars → août 2026
            </motion.text>
          </svg>
        </div>

        {/* Sprint list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {phases.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                padding: '9px 14px',
                background: 'linear-gradient(90deg, rgba(255, 122, 26, 0.08), transparent)',
                borderLeft: '3px solid var(--orange-400)',
                borderRadius: '0 10px 10px 0',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 17,
                fontWeight: 700,
                color: 'var(--orange-400)',
                minWidth: 32,
              }}>
                {p.n}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 11, color: 'var(--grey-500)', marginTop: 2 }}>
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
