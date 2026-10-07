import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const phones = [
  { src: 'img/flutter/dashboard_flutter.png', label: 'Tableau de bord' },
  { src: 'img/flutter/interventions_flutter.png', label: 'Interventions' },
  { src: 'img/flutter/diagnostic_ia_flutter.png', label: 'Diagnostic IA' },
  { src: 'img/flutter/notifications_flutter.png', label: 'Alertes' },
];

export default function Mobile() {
  return (
    <Slide sectionLabel="04 · Développement — Application mobile">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Terrain, dans la poche.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 40 }}
      >
        Captures réelles · Flutter sur Android.
      </motion.p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 20,
        alignItems: 'center',
      }}>
        {phones.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 40, rotate: (i - 1.5) * 4 }}
            animate={{ opacity: 1, y: 0, rotate: (i - 1.5) * 2 }}
            transition={{
              duration: 0.8,
              delay: 0.4 + i * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -8, rotate: 0, scale: 1.03 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{
              position: 'relative',
              aspectRatio: '9/19',
              width: '100%',
              maxWidth: 200,
              borderRadius: 24,
              overflow: 'hidden',
              border: '3px solid #1a2450',
              background: '#000',
              boxShadow: '0 20px 60px -20px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(104, 121, 201, 0.2)',
            }}>
              <div style={{
                position: 'absolute',
                top: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 6,
                borderRadius: 999,
                background: '#000',
                zIndex: 2,
              }} />
              <img src={p.src} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--navy-100)',
            }}>
              {p.label}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.4 }}
        style={{
          marginTop: 32,
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
        }}
      >
        {['Flutter · Android', 'Firebase (notifications push)', 'Preuve photo OK/NOK', 'Diagnostic IA sur le terrain'].map((t) => (
          <span key={t} className="pill">{t}</span>
        ))}
      </motion.div>
    </Slide>
  );
}
