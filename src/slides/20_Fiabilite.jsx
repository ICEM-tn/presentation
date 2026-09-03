import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

export default function Fiabilité() {
  return (
    <Slide sectionLabel="06 · Fiabilité">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Analyse de fiabilité.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 32 }}
      >
        Régression linéaire · rapport PDF généré automatiquement.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 40, alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -2 }}
          animate={{ opacity: 1, x: 0, rotate: -1.5 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          style={{
            padding: 16,
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(104, 121, 201, 0.2)',
            aspectRatio: '3/4',
            overflow: 'hidden',
            maxWidth: 380,
            margin: '0 auto',
          }}
        >
          <img src="img/ml/tco_pdf.png" alt="Rapport PDF" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { icon: '📈', title: 'Disponibilité', desc: 'projetée sur 24 mois', delay: 0.55 },
            { icon: '⚠', title: 'Nombre de pannes', desc: 'tendance et courbe', delay: 0.7 },
            { icon: '📄', title: 'Export PDF', desc: 'signé · daté · logo ICEM', delay: 0.85 },
            { icon: '🔮', title: 'Comparaison', desc: 'Alpha vs Gamma', delay: 1.0 },
          ].map((it) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: it.delay }}
              style={{
                display: 'flex',
                gap: 14,
                padding: '14px 16px',
                background: 'linear-gradient(90deg, rgba(24, 37, 98, 0.5), transparent)',
                borderLeft: '2px solid var(--orange-400)',
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: 26, opacity: 0.9 }}>{it.icon}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 }}>{it.title}</div>
                <div style={{ fontSize: 13, color: 'var(--grey-300)', marginTop: 2 }}>{it.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
