import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

// 5 causes suivies par les capteurs (rapport ch2, tab. causes suivies),
// regroupées selon le capteur qui réagit.
const families = [
  {
    key: 'vibration',
    title: 'Vibration',
    color: '#4ECDC4',
    causes: [
      { code: 'C01', label: 'Usure mécanique', sensors: 'MPU · lente, sur des jours' },
      { code: 'C02', label: 'Courroie détendue', sensors: 'MPU + AMG transmission' },
    ],
  },
  {
    key: 'moteur',
    title: 'Chaleur moteur',
    color: '#FF7A1A',
    causes: [
      { code: 'C03', label: 'Ventilation moteur encrassée', sensors: 'AMG + DHT moteur' },
      { code: 'C04', label: 'Surcharge moteur', sensors: 'SCT + AMG + DHT + MPU' },
    ],
  },
  {
    key: 'armoire',
    title: 'Chaleur armoire',
    color: '#B388FF',
    causes: [
      { code: 'C05', label: 'Surchauffe armoire', sensors: 'DHT armoire seul' },
    ],
  },
];

export default function Causes() {
  let n = 0;
  return (
    <Slide sectionLabel="04 · Taxonomie physique">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Cinq causes suivies.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 32 }}
      >
        Chaque cause fait réagir ses capteurs · et pas les autres.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        {families.map((f) => (
          <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 700,
              color: f.color,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              paddingBottom: 8,
              borderBottom: `2px solid ${f.color}66`,
            }}>
              {f.title} · {f.causes.length}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 10,
            }}>
              {f.causes.map((c) => {
                const i = n++;
                return (
                  <motion.div
                    key={c.code}
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    style={{
                      padding: '12px 14px',
                      background: `linear-gradient(180deg, ${f.color}14, rgba(10, 18, 48, 0.5))`,
                      border: `1px solid ${f.color}40`,
                      borderRadius: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      color: f.color,
                      letterSpacing: '0.08em',
                      fontWeight: 700,
                    }}>
                      {c.code}
                    </div>
                    <div style={{ fontSize: 15, lineHeight: 1.3, fontWeight: 600 }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--grey-300)', fontFamily: 'var(--font-mono)' }}>
                      {c.sensors}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        style={{
          marginTop: 28,
          textAlign: 'center',
          fontSize: 13,
          color: 'var(--grey-500)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.05em',
        }}
      >
        Non suivies (aucune signature capteur) : casse soudaine · réglage MINI · fuite d'air · consommables · câbles · logiciel → IHM Komax
      </motion.div>
    </Slide>
  );
}
