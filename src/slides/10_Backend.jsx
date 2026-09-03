import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const endpoints = [
  { method: 'POST', path: '/api/capteurs/ingest', role: 'Ingestion IoT' },
  { method: 'GET', path: '/api/machines', role: 'Liste machines' },
  { method: 'POST', path: '/api/interventions', role: 'Créer intervention' },
  { method: 'GET', path: '/api/alertes', role: 'Alertes actives' },
  { method: 'POST', path: '/api/auth/login', role: 'Auth JWT' },
];

const methodColors = {
  GET: '#4ADE80',
  POST: '#FF7A1A',
  PUT: '#FACC15',
  DELETE: '#F87171',
};

export default function Backend() {
  return (
    <Slide sectionLabel="Couche 3 · Backend">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Node.js + MongoDB.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 32 }}
      >
        API REST · 8 collections · trois rôles.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div>
          <div style={{ marginBottom: 16, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--grey-500)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Points d'entrée principaux
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {endpoints.map((e, i) => (
              <motion.div
                key={e.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.4 + i * 0.09 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px 1fr',
                  gap: 12,
                  alignItems: 'center',
                  padding: '10px 14px',
                  background: 'rgba(24, 37, 98, 0.4)',
                  border: '1px solid rgba(104, 121, 201, 0.2)',
                  borderRadius: 8,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: methodColors[e.method],
                  textAlign: 'center',
                  padding: '2px 8px',
                  borderRadius: 4,
                  background: `${methodColors[e.method]}18`,
                  letterSpacing: '0.05em',
                }}>{e.method}</span>
                <div>
                  <div style={{ fontSize: 13, color: 'var(--white)' }}>{e.path}</div>
                  <div style={{ fontSize: 10, color: 'var(--grey-500)', marginTop: 2 }}>{e.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            padding: 24,
            background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.4), rgba(10, 18, 48, 0.4))',
            border: '1px solid rgba(104, 121, 201, 0.25)',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <img src="img/stack/logo_nodejs.png" alt="Node.js" style={{ height: 48, background: '#fff', padding: 6, borderRadius: 8 }} />
            <img src="img/stack/logo_expressejs.png" alt="Express" style={{ height: 48, background: '#fff', padding: 6, borderRadius: 8 }} />
            <img src="img/stack/logo_mongodb.png" alt="MongoDB" style={{ height: 48, background: '#fff', padding: 6, borderRadius: 8 }} />
          </div>

          <div style={{ borderTop: '1px solid rgba(104, 121, 201, 0.2)', paddingTop: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--grey-500)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              8 collections MongoDB
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {['User', 'Machine', 'Capteur', 'Intervention', 'Alerte', 'Maintenance', 'AnalyseTCO', 'PreventiveChecklist'].map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
                  style={{
                    padding: '6px 10px',
                    background: 'rgba(78, 205, 196, 0.08)',
                    border: '1px solid rgba(78, 205, 196, 0.2)',
                    borderRadius: 6,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--cyan-400)',
                  }}
                >
                  {c}
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: 8,
            marginTop: 4,
          }}>
            {['3 rôles', 'JWT', 'x-api-key IoT'].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.08 }}
                style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  background: 'rgba(255, 122, 26, 0.1)',
                  border: '1px solid rgba(255, 122, 26, 0.3)',
                  fontSize: 11,
                  color: 'var(--orange-400)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
