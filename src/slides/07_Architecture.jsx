import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const layers = [
  { n: 5, name: 'Application', desc: 'React · Flutter', color: '#8B5CF6', icon: '📱' },
  { n: 4, name: 'Intelligence', desc: 'FastAPI · RF · XGBoost', color: '#FF7A1A', icon: '🧠' },
  { n: 3, name: 'Backend', desc: 'Node.js · MongoDB', color: '#4ADE80', icon: '⚙' },
  { n: 2, name: 'Edge', desc: 'Raspberry Pi 4', color: '#F87171', icon: '🖥' },
  { n: 1, name: 'Perception', desc: '5 capteurs IoT', color: '#4ECDC4', icon: '📡' },
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
        style={{ marginBottom: 32 }}
      >
        Du capteur physique au telephone du technicien.
      </motion.p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 900, margin: '0 auto', width: '100%' }}>
        {layers.map((L, i) => (
          <motion.div
            key={L.n}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: 20,
              alignItems: 'center',
              padding: '18px 22px',
              background: `linear-gradient(90deg, ${L.color}22, transparent 70%)`,
              border: `1px solid ${L.color}55`,
              borderRadius: 14,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 52, height: 52, borderRadius: 12,
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

            {i < layers.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.55 + i * 0.15 }}
                style={{
                  position: 'absolute',
                  left: 46,
                  bottom: -10,
                  width: 2,
                  height: 10,
                  background: 'linear-gradient(180deg, var(--orange-400), transparent)',
                  transformOrigin: 'top',
                  zIndex: 3,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'var(--grey-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
      >
        MODÈLE DE RÉFÉRENCE ITU-T Y.2060 · SÉPARATION DES RESPONSABILITÉS
      </motion.div>
    </Slide>
  );
}
