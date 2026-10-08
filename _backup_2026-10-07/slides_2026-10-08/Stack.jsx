import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const rows = [
  {
    label: 'Backend',
    color: 'var(--green-400)',
    items: [
      { src: 'img/stack/logo_nodejs.png',     name: 'Node.js' },
      { src: 'img/stack/logo_expressejs.png', name: 'Express' },
      { src: 'img/stack/logo_mongodb.png',    name: 'MongoDB' },
      { src: 'img/stack/logo_jwt.svg',        name: 'JWT' },
    ],
  },
  {
    label: 'Intelligence artificielle',
    color: 'var(--cyan-400)',
    items: [
      { src: 'img/stack/logo_python.png',   name: 'Python' },
      { src: 'img/stack/logo_fastapi.png',  name: 'FastAPI' },
      { src: 'img/stack/logo_sklearn.svg',  name: 'scikit-learn' },
      { src: 'img/stack/logo_xgboost.png',  name: 'XGBoost' },
    ],
  },
  {
    label: 'Frontend',
    color: 'var(--orange-400)',
    items: [
      { src: 'img/stack/logo_react.png',    name: 'React' },
      { src: 'img/stack/logo_flutter.png',  name: 'Flutter' },
      { src: 'img/stack/logo_firebase.svg', name: 'Firebase' },
    ],
  },
];

export default function Stack() {
  return (
    <Slide sectionLabel="02 · État de l'art">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 8 }}
      >
        Stack technique.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 32 }}
      >
        Trois familles technologiques mobilisées.
      </motion.p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
        {rows.map((row, ri) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 + ri * 0.15 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr',
              gap: 20,
              alignItems: 'center',
              padding: '16px 20px',
              background: 'linear-gradient(90deg, rgba(24, 37, 98, 0.35), rgba(10, 18, 48, 0.2))',
              border: '1px solid rgba(104, 121, 201, 0.2)',
              borderLeft: `4px solid ${row.color}`,
              borderRadius: 14,
            }}
          >
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: row.color,
                opacity: 0.85,
                marginBottom: 4,
              }}>
                Couche
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>
                {row.label}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
              {row.items.map((it, i) => (
                <motion.div
                  key={it.name}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + ri * 0.15 + i * 0.08 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    minWidth: 90,
                  }}
                >
                  <div style={{
                    width: 62, height: 62,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#fff',
                    borderRadius: 12,
                    padding: 8,
                  }}>
                    <img src={it.src} alt={it.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.opacity = 0.15; }} />
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--navy-100)', opacity: 0.85 }}>
                    {it.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}
