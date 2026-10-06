import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

export default function UMLClasses() {
  return (
    <Slide sectionLabel="03 · Conception">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 8 }}
      >
        Diagramme de classes.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 20 }}
      >
        Neuf classes métier · un type énuméré pour la maintenance.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          flex: 1,
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
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>
            Diagramme de classes
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cyan-400)', letterSpacing: '0.1em' }}>
            Machine · Utilisateur · Intervention · Alerte · Capteur
          </div>
        </div>
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          minHeight: 340,
        }}>
          <img
            src="img/uml/diagramm_de_class_global.png"
            alt="Diagramme de classes"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </div>
      </motion.div>
    </Slide>
  );
}
