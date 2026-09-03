import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const causes = [
  { code: 'C01', label: 'Cellule K obstruée' },
  { code: 'C02', label: 'Lame émoussée' },
  { code: 'C03', label: 'MINI / Terminale mal ajustée' },
  { code: 'C04', label: 'Vérin pneumatique HS' },
  { code: 'C05', label: 'Fuite pneumatique' },
  { code: 'C06', label: 'Frein bobine deregler' },
  { code: 'C07', label: 'Détecteur fil HS' },
  { code: 'C08', label: 'Encodeur dérive' },
  { code: 'C09', label: 'Guide-fil usé' },
  { code: 'C10', label: 'Câble / phase HS' },
  { code: 'C11', label: 'Servomoteur surcharge' },
  { code: 'C12', label: 'Roue Gommino usée' },
  { code: 'C13', label: 'Autre' },
];

export default function Causes() {
  return (
    <Slide sectionLabel="04 · Taxonomie physique">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Treize causes.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 40 }}
      >
        Grille FMEA validée par le technicien d'atelier.
      </motion.p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
      }}>
        {causes.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.35 + i * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            style={{
              padding: '14px 16px',
              background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.5))',
              border: '1px solid rgba(104, 121, 201, 0.25)',
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--orange-400)',
              letterSpacing: '0.08em',
              fontWeight: 700,
            }}>
              {c.code}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.3 }}>
              {c.label}
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.045 }}
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: 2,
                background: 'linear-gradient(90deg, var(--orange-400), transparent)',
                transformOrigin: 'left',
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        style={{
          marginTop: 32,
          display: 'flex',
          gap: 24,
          justifyContent: 'center',
          fontSize: 13,
          color: 'var(--grey-500)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.05em',
        }}
      >
        <div>10 causes ⇒ signature capteur claire</div>
        <div style={{ opacity: 0.4 }}>·</div>
        <div>3 causes ⇒ signal manuel uniquement</div>
      </motion.div>
    </Slide>
  );
}
