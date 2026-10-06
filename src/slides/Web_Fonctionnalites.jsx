import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const features = [
  { n: '01', title: 'Connexion et tableau de bord', hint: 'JWT · MTBF · MTTR · disponibilité · interventions du mois' },
  { n: '02', title: 'Équipements', hint: '13 machines · capteurs en direct (30 s)' },
  { n: '03', title: 'Interventions et diagnostic IA', hint: "Tableau ou calendrier · « Diagnostiquer avec l'IA »" },
  { n: '04', title: 'Maintenance préventive', hint: 'Checklists mensuelles · semestrielles · annuelles' },
  { n: '05', title: 'Suivi journalier FOR MAI 52', hint: 'Contrôles de prise de poste par ligne' },
  { n: '06', title: 'Fiabilité et alertes', hint: 'Rapport PDF · alertes triées par criticité' },
];

export default function Web_Fonctionnalites() {
  return (
    <Slide sectionLabel="04 · Développement — Application web">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 8 }}
      >
        Fonctionnalités web.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 32 }}
      >
        Application React.js · 3 profils : responsable · chef de ligne · technicien.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 40, alignItems: 'center', flex: 1 }}>
        {/* Laptop mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          style={{ position: 'relative', width: '100%', maxWidth: 420, margin: '0 auto' }}
        >
          <svg viewBox="0 0 400 280" style={{ width: '100%', height: 'auto' }}>
            {/* Screen bezel */}
            <rect x="30" y="20" width="340" height="210" rx="10" fill="#1a2456" stroke="rgba(104,121,201,0.4)" strokeWidth="2" />
            {/* Screen inner */}
            <rect x="42" y="32" width="316" height="186" rx="4" fill="#0a1230" />
            {/* Screen content — decorative UI hints */}
            <rect x="52" y="42" width="80" height="10" rx="2" fill="var(--orange-400)" opacity="0.8" />
            <rect x="52" y="60" width="140" height="6" rx="2" fill="rgba(255,255,255,0.15)" />
            <rect x="52" y="72" width="120" height="6" rx="2" fill="rgba(255,255,255,0.1)" />
            <rect x="52" y="92" width="90" height="60" rx="4" fill="rgba(255,122,26,0.15)" stroke="var(--orange-400)" strokeWidth="1" opacity="0.6" />
            <rect x="152" y="92" width="90" height="60" rx="4" fill="rgba(72,187,255,0.15)" stroke="var(--cyan-400)" strokeWidth="1" opacity="0.6" />
            <rect x="252" y="92" width="90" height="60" rx="4" fill="rgba(74,222,128,0.15)" stroke="var(--green-400)" strokeWidth="1" opacity="0.6" />
            <rect x="52" y="162" width="290" height="6" rx="2" fill="rgba(255,255,255,0.1)" />
            <rect x="52" y="176" width="240" height="6" rx="2" fill="rgba(255,255,255,0.08)" />
            {/* Base */}
            <rect x="10" y="230" width="380" height="10" rx="3" fill="#1a2456" stroke="rgba(104,121,201,0.4)" />
            <rect x="170" y="240" width="60" height="6" rx="1" fill="#0a1230" />
          </svg>
          <div style={{
            position: 'absolute',
            top: 10, right: 10,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--orange-400)',
            letterSpacing: '0.15em',
            opacity: 0.7,
          }}>
            REACT.JS
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {features.map((f, i) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.5 + i * 0.08 }}
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                padding: '10px 14px',
                background: 'linear-gradient(90deg, rgba(255, 122, 26, 0.06), transparent)',
                borderLeft: '3px solid var(--orange-400)',
                borderRadius: '0 8px 8px 0',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--orange-400)',
                minWidth: 28,
              }}>
                {f.n}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>
                  {f.title}
                </div>
                <div style={{ fontSize: 11, color: 'var(--grey-500)', marginTop: 1 }}>
                  {f.hint}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
