import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

export default function SensorSpec({
  sectionLabel,
  name,
  measure,
  image,
  specs = [],
  why,
  accent = 'var(--orange-400)',
  imageMaxHeight = 320,
  imageBackground = '#fff',
}) {
  return (
    <Slide sectionLabel={sectionLabel}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 48, alignItems: 'center', height: '100%' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          style={{
            padding: 22,
            background: imageBackground,
            border: `2px solid ${accent}55`,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: '1 / 1',
          }}
        >
          <img
            src={image}
            alt={name}
            style={{
              maxWidth: '100%',
              maxHeight: imageMaxHeight,
              objectFit: 'contain',
            }}
          />
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: accent,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            {measure}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="slide-title"
            style={{ marginBottom: 28 }}
          >
            {name}.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{
              padding: '16px 18px',
              borderLeft: `3px solid ${accent}`,
              background: `linear-gradient(90deg, ${accent}12, transparent)`,
              marginBottom: 18,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: accent,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}>
              Caractéristiques
            </div>
            <ul style={{
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontSize: 15,
              lineHeight: 1.5,
              listStyle: 'none',
            }}>
              {specs.map((s, i) => (
                <li key={i} style={{ position: 'relative', paddingLeft: 18 }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: 9,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: accent,
                  }} />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{
              padding: '16px 18px',
              borderLeft: `3px solid ${accent}`,
              background: `linear-gradient(90deg, ${accent}12, transparent)`,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: accent,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              Pourquoi ce choix
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.55 }}>{why}</div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
}
