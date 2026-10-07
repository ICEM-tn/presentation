import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

export default function UML() {
  return (
    <Slide sectionLabel="03 · Conception">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 8 }}
      >
        Modélisation UML.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 24 }}
      >
        Cas d'utilisation et diagramme de classes.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, flex: 1 }}>
        <UMLCard delay={0.4} title="Cas d'utilisation" hint="4 acteurs · 12 use cases" src="img/uml/use_case_global.png" />
        <UMLCard delay={0.55} title="Diagramme de classes" hint="9 classes métier" src="img/uml/diagramm_de_class_global.png" />
      </div>
    </Slide>
  );
}

function UMLCard({ delay, title, hint, src }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 20,
        background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.35), rgba(10, 18, 48, 0.35))',
        border: '1px solid rgba(104, 121, 201, 0.25)',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>{title}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan-400)', letterSpacing: '0.1em' }}>{hint}</div>
      </div>
      <div style={{
        flex: 1,
        background: '#fff',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minHeight: 260,
      }}>
        <img src={src} alt={title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
    </motion.div>
  );
}
