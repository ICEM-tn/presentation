import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

// 13 causes C01–C13 (rapport ch3, tableau F1 par cause), regroupées en
// 3 familles selon la signature capteur (rapport ch3, « trois régimes »).
const families = [
  {
    key: 'forte',
    title: 'Signature forte',
    color: '#4ADE80',
    causes: [
      { code: 'C11', label: 'Moteur ou servo en panne' },
      { code: 'C06', label: 'Courroie détendue / patinage' },
      { code: 'C02', label: 'Casse / rupture pièce' },
    ],
  },
  {
    key: 'partielle',
    title: 'Signature partielle',
    color: '#FF7A1A',
    causes: [
      { code: 'C07', label: 'Encrassement' },
      { code: 'C03', label: 'MINI / Terminale mal ajustée' },
      { code: 'C12', label: 'Carte / électronique en panne' },
      { code: 'C04', label: "Fuite d'air" },
      { code: 'C05', label: 'Pression hors plage' },
      { code: 'C01', label: 'Usure pièce mécanique' },
      { code: 'C10', label: 'Câble ou connectique en défaut' },
    ],
  },
  {
    key: 'nulle',
    title: 'Aucune signature',
    color: '#8B93B8',
    causes: [
      { code: 'C08', label: 'Consommable à remplacer' },
      { code: 'C09', label: 'Capteur en défaut' },
      { code: 'C13', label: 'Paramètre logiciel à ajuster' },
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
        Treize causes.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 32 }}
      >
        Grille de type FMEA (AFNOR X60-510) · 3 familles selon la signature capteur.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 7fr 3fr', gap: 20 }}>
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
              gridTemplateColumns: f.causes.length > 3 ? 'repeat(2, 1fr)' : '1fr',
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
                    <div style={{ fontSize: 13, lineHeight: 1.3 }}>
                      {c.label}
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
        L'IA complète le diagnostic humain · elle ne le remplace pas
      </motion.div>
    </Slide>
  );
}
