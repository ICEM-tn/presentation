import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

export default function ConfusionRF() {
  return (
    <Slide sectionLabel="04 · Validation">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Matrice de confusion.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 24 }}
      >
        Peu de confusions entre causes · l'erreur principale = panne lue comme « Normal ».
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 36, alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: 8,
            background: '#fff',
            borderRadius: 12,
            border: '1px solid rgba(104, 121, 201, 0.25)',
          }}
        >
          <img
            src="img/ml/confusion_rf_v2.png"
            alt="Matrice de confusion Random Forest"
            style={{ display: 'block', height: '62vh', width: 'auto' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          style={{
            padding: '26px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 26,
            background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.3))',
            border: '1px solid rgba(104, 121, 201, 0.2)',
            borderRadius: 14,
          }}
        >
          <div style={{ fontSize: 13, color: 'var(--grey-300)', lineHeight: 1.5 }}>
            Ligne = % des cas réels d'une cause · diagonale = bien classés
          </div>
          <MiniStat label="Accuracy" value="0,96" color="var(--cyan-400)" />
          <MiniStat label="F1 macro" value="0,85" color="var(--orange-400)" />
          <MiniStat label="Courroie lue « usure » (vibration)" value="16 %" color="var(--grey-300)" />
        </motion.div>
      </div>
    </Slide>
  );
}

function MiniStat({ label, value, color }) {
  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ fontSize: 11, color: 'var(--grey-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
    </div>
  );
}
