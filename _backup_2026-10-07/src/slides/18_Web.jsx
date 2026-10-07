import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const shots = [
  { src: 'img/web/dashboard_web.png', name: 'Tableau de bord', path: '/', desc: 'Équipements · interventions · disponibilité' },
  { src: 'img/web/equipements_web.png', name: 'Équipements', path: '/equipements', desc: '13 machines · état · projet' },
  { src: 'img/web/capteurs_live_web.png', name: 'Capteurs en direct', path: '/equipements', desc: '4 capteurs · rafraîchi toutes les 30 s' },
  { src: 'img/web/interventions_web.png', name: 'Interventions', path: '/interventions', desc: 'Préventive · corrective · prédictive' },
  { src: 'img/web/alertes_web.png', name: 'Alertes & IA', path: '/alertes', desc: 'Probabilité de panne · cause suggérée' },
  { src: 'img/web/tco_web.png', name: 'Analyses', path: '/analyses', desc: 'MTBF · MTTR · disponibilité' },
];

export default function Web() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % shots.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <Slide sectionLabel="04 · Développement — Application web">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Écrans web.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 24 }}
      >
        Captures réelles · compte responsable maintenance.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 24, alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.4 }}
          style={{
            position: 'relative',
            padding: 12,
            background: '#0e1734',
            border: '1px solid rgba(104, 121, 201, 0.4)',
            borderRadius: 14,
            aspectRatio: '1875 / 958',
            overflow: 'hidden',
          }}
        >
          {/* Fake browser chrome */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 28,
            background: '#0a1230',
            display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6,
            borderBottom: '1px solid rgba(104, 121, 201, 0.25)',
          }}>
            {['#ff6b6b', '#facc15', '#4ade80'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: 999, background: c, opacity: 0.7 }} />
            ))}
            <div style={{ marginLeft: 12, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--grey-500)' }}>
              192.168.10.20/komax{shots[i].path}
            </div>
          </div>
          <div style={{ marginTop: 28, height: 'calc(100% - 28px)', overflow: 'hidden', borderRadius: 6 }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={i}
                src={shots[i].src}
                alt={shots[i].name}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top' }}
              />
            </AnimatePresence>
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {shots.map((s, idx) => (
            <motion.button
              key={s.name}
              onClick={() => setI(idx)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + idx * 0.06 }}
              style={{
                padding: '8px 12px',
                background: idx === i ? 'rgba(255, 122, 26, 0.15)' : 'transparent',
                border: `1px solid ${idx === i ? 'rgba(255, 122, 26, 0.5)' : 'rgba(104, 121, 201, 0.2)'}`,
                borderRadius: 8,
                textAlign: 'left',
                color: idx === i ? 'var(--orange-400)' : 'var(--navy-100)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13 }}>{s.name}</div>
              <div style={{ fontSize: 10, opacity: 0.7, fontFamily: 'var(--font-mono)' }}>{s.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </Slide>
  );
}
