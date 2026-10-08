import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const features = [
  { n: '01', title: 'Connexion et tableau de bord', hint: 'Même charte que le web · indicateurs du parc' },
  { n: '02', title: 'Interventions terrain', hint: 'Liste · calendrier · signalement · photos avant/après' },
  { n: '03', title: 'Diagnostic IA', hint: "« Diagnostiquer avec l'IA » · carte adaptée au mobile" },
  { n: '04', title: 'Suivi journalier', hint: 'Contrôles de prise de poste · photo OK/NOK' },
  { n: '05', title: 'Checklists préventives', hint: "Saisie sur smartphone · photo d'évidence" },
  { n: '06', title: 'Notifications push', hint: 'Firebase · alerte critique · intervention assignée' },
];

export default function Mobile_Fonctionnalites() {
  return (
    <Slide sectionLabel="04 · Développement — Application mobile">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 8 }}
      >
        Fonctionnalités mobile.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 32 }}
      >
        Application Flutter · technicien et chef de ligne, au pied de la machine.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 40, alignItems: 'center', flex: 1 }}>
        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          style={{ position: 'relative', width: '100%', maxWidth: 220, margin: '0 auto' }}
        >
          <svg viewBox="0 0 220 440" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>
            {/* Phone body */}
            <rect x="10" y="10" width="200" height="420" rx="28" fill="#1a2456" stroke="rgba(104,121,201,0.4)" strokeWidth="2" />
            {/* Screen */}
            <rect x="20" y="30" width="180" height="380" rx="18" fill="#0a1230" />
            {/* Notch */}
            <rect x="85" y="30" width="50" height="14" rx="7" fill="#000" />
            {/* App content */}
            <rect x="30" y="60" width="60" height="8" rx="2" fill="var(--orange-400)" opacity="0.8" />
            <rect x="30" y="80" width="100" height="6" rx="2" fill="rgba(255,255,255,0.15)" />
            <rect x="30" y="100" width="160" height="60" rx="8" fill="rgba(255,122,26,0.15)" stroke="var(--orange-400)" strokeWidth="1" opacity="0.5" />
            <rect x="30" y="170" width="160" height="60" rx="8" fill="rgba(72,187,255,0.15)" stroke="var(--cyan-400)" strokeWidth="1" opacity="0.5" />
            <rect x="30" y="240" width="160" height="60" rx="8" fill="rgba(74,222,128,0.15)" stroke="var(--green-400)" strokeWidth="1" opacity="0.5" />
            {/* Bottom nav */}
            <rect x="20" y="380" width="180" height="30" rx="8" fill="rgba(24,37,98,0.6)" />
            <circle cx="55" cy="395" r="4" fill="var(--orange-400)" />
            <circle cx="95" cy="395" r="3" fill="rgba(255,255,255,0.4)" />
            <circle cx="135" cy="395" r="3" fill="rgba(255,255,255,0.4)" />
            <circle cx="175" cy="395" r="3" fill="rgba(255,255,255,0.4)" />
          </svg>
          <div style={{
            position: 'absolute',
            top: 0, right: -30,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--cyan-400)',
            letterSpacing: '0.15em',
            opacity: 0.7,
            transform: 'rotate(-90deg)',
            transformOrigin: 'right top',
          }}>
            FLUTTER
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {features.map((f, i) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.5 + i * 0.1 }}
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                padding: '12px 16px',
                background: 'linear-gradient(90deg, rgba(72, 187, 255, 0.06), transparent)',
                borderLeft: '3px solid var(--cyan-400)',
                borderRadius: '0 8px 8px 0',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--cyan-400)',
                minWidth: 28,
              }}>
                {f.n}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>
                  {f.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--grey-500)', marginTop: 2 }}>
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
