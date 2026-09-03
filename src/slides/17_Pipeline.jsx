import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';
import PipelineFlow from '../components/PipelineFlow.jsx';
import CircuitBackdrop from '../components/CircuitBackdrop.jsx';

export default function Pipeline() {
  return (
    <>
    <CircuitBackdrop opacity={0.28} accent="var(--cyan-400)" />
    <Slide sectionLabel="05 · Pipeline temps réel">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Du capteur à l'alerte.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 80 }}
      >
        Cinq étapes · moins d'une minute · sans intervention humaine.
      </motion.p>

      <PipelineFlow
        delayBase={0.4}
        steps={[
          { icon: '📡', label: 'Capteur', hint: '5 sensors' },
          { icon: '🖥', label: 'Raspberry', hint: 'agrégation 60s' },
          { icon: '⚙', label: 'Backend', hint: 'POST /ingest' },
          { icon: '🧠', label: 'IA', hint: 'proba > 80 %' },
          { icon: '🔔', label: 'Alerte', hint: 'push Firebase' },
        ]}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.6 }}
        style={{
          marginTop: 80,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}
      >
        {[
          ['~60 s', 'Latence bout-en-bout', 'var(--cyan-400)'],
          ['Automatique', 'Zéro action manuelle', 'var(--orange-400)'],
          ['Terrain', 'Notification mobile', 'var(--green-400)'],
        ].map(([v, k, c], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 + i * 0.1 }}
            style={{
              padding: '14px 16px',
              background: `linear-gradient(90deg, ${c}12, transparent)`,
              borderLeft: `2px solid ${c}`,
              borderRadius: 6,
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: c, lineHeight: 1 }}>
              {v}
            </div>
            <div style={{ fontSize: 12, color: 'var(--grey-300)', marginTop: 4 }}>{k}</div>
          </motion.div>
        ))}
      </motion.div>
    </Slide>
    </>
  );
}
