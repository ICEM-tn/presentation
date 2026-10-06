import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

export default function ROC() {
  return (
    <Slide sectionLabel="04 · Validation">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Courbe ROC et seuils.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 28 }}
      >
        XGBoost v3 · AUC 0,978 · 2 seuils : 60 % alerte · 80 % maintenance automatique.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 28, alignItems: 'center' }}>
        <Figure
          delay={0.4}
          title="Courbe ROC — XGBoost v3"
          src="img/ml/roc_xgb.png"
          alt="Courbe ROC XGBoost v3"
          imgStyle={{ height: '46vh', width: 'auto' }}
        />
        <Figure
          delay={0.6}
          title="Probabilités prédites · Normal vs Pré-panne"
          src="img/ml/proba_distribution_xgb.png"
          alt="Distribution des probabilités XGBoost v3 et seuils 60 % / 80 %"
          imgStyle={{ width: '100%', height: 'auto' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        style={{
          marginTop: 22,
          padding: '14px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          background: 'linear-gradient(90deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.3))',
          border: '1px solid rgba(104, 121, 201, 0.2)',
          borderRadius: 10,
        }}
      >
        <MiniStat label="AUC" value="0,978" color="var(--green-400)" />
        <MiniStat label="Seuil alerte (avertissement)" value="60 %" color="var(--yellow-400)" />
        <MiniStat label="Seuil critique + maintenance auto" value="80 %" color="var(--orange-400)" />
      </motion.div>
    </Slide>
  );
}

function Figure({ delay, title, src, alt, imgStyle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: 14,
        background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.5))',
        border: '1px solid rgba(104, 121, 201, 0.25)',
        borderRadius: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700 }}>{title}</div>
      <div style={{ borderRadius: 8, overflow: 'hidden', background: '#fff', padding: 6 }}>
        <img src={src} alt={alt} style={{ display: 'block', ...imgStyle }} />
      </div>
    </motion.div>
  );
}

function MiniStat({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 11, color: 'var(--grey-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
    </div>
  );
}
