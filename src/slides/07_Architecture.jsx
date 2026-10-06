import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const layers = [
  { n: 1, name: 'Perception', desc: '5 capteurs IoT', color: '#4ECDC4', icon: '📡' },
  { n: 2, name: 'Edge', desc: 'Raspberry Pi 4', color: '#F87171', icon: '🖥' },
  { n: 3, name: 'Backend', desc: 'Node.js · MongoDB', color: '#4ADE80', icon: '⚙' },
  { n: 4, name: 'Intelligence', desc: 'FastAPI · RF · XGBoost', color: '#FF7A1A', icon: '🧠' },
  { n: 5, name: 'Application', desc: 'React · Flutter', color: '#8B5CF6', icon: '📱' },
];

// Flux entre la couche i et la couche i+1 (fig. synoptique de l'écosystème, ch. 2)
const flows = [
  'signaux capteurs · I²C · GPIO',
  'HTTP POST JSON · toutes les 60 s',
  'REST · prédictions + probabilités',
  'REST + notifications push',
];

export default function Architecture() {
  return (
    <Slide sectionLabel="03 · Architecture">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Cinq couches.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 20 }}
      >
        Du capteur physique au téléphone du technicien.
      </motion.p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 900, margin: '0 auto', width: '100%' }}>
        {layers.map((L, i) => (
          <div key={L.n}>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: 20,
              alignItems: 'center',
              padding: '12px 22px',
              background: `linear-gradient(90deg, ${L.color}22, transparent 70%)`,
              border: `1px solid ${L.color}55`,
              borderRadius: 14,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 46, height: 46, borderRadius: 12,
              background: `${L.color}20`,
              border: `1px solid ${L.color}55`,
              fontSize: 24,
            }}>
              {L.icon}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>
                Couche {L.n} — {L.name}
              </div>
              <div style={{ fontSize: 13, color: 'var(--grey-300)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                {L.desc}
              </div>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 42, fontWeight: 300,
              color: L.color, opacity: 0.55, lineHeight: 1,
            }}>
              0{L.n}
            </div>

          </motion.div>
          {i < layers.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.15 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                height: 26, paddingLeft: 38,
                fontFamily: 'var(--font-mono)', fontSize: 12,
                color: 'var(--grey-300)', letterSpacing: '0.04em',
              }}
            >
              <span style={{ color: 'var(--orange-400)', fontSize: 16 }}>↓</span>
              {flows[i]}
            </motion.div>
          )}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--grey-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
      >
        MODÈLE DE RÉFÉRENCE ITU-T Y.2060 · SÉPARATION DES RESPONSABILITÉS
      </motion.div>
    </Slide>
  );
}
