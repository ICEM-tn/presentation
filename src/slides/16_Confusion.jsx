import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

export default function Confusion() {
  return (
    <Slide sectionLabel="04 · Validation">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Confusion & courbe ROC.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 32 }}
      >
        Un modèle qui separe bien les classes majoritaires.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <ImagePanel
          delay={0.4}
          from={-30}
          label="Matrice de confusion — RF v2"
          hint="Diagonale = prédictions correctes"
          src="img/ml/confusion_rf.png"
        />
        <ImagePanel
          delay={0.55}
          from={30}
          label="Courbe ROC — XGBoost v3"
          hint="AUC élevé · seuil 0.80"
          src="img/ml/roc_xgb.png"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        style={{
          marginTop: 24,
          padding: '16px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          background: 'linear-gradient(90deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.3))',
          border: '1px solid rgba(104, 121, 201, 0.2)',
          borderRadius: 10,
        }}
      >
        <MiniStat label="Précision" value="0.86" color="var(--cyan-400)" />
        <MiniStat label="Rappel" value="0.81" color="var(--orange-400)" />
        <MiniStat label="AUC (moyen)" value="0.91" color="var(--green-400)" />
      </motion.div>
    </Slide>
  );
}

function ImagePanel({ delay, from, label, hint, src }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: 16,
        background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.5))',
        border: '1px solid rgba(104, 121, 201, 0.25)',
        borderRadius: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>
          {label}
        </div>
        <div style={{ fontSize: 12, color: 'var(--grey-500)', marginTop: 2 }}>{hint}</div>
      </div>
      <div style={{
        aspectRatio: '4/3',
        borderRadius: 10,
        overflow: 'hidden',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img src={src} alt={label} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
    </motion.div>
  );
}

function MiniStat({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 11, color: 'var(--grey-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
    </div>
  );
}
