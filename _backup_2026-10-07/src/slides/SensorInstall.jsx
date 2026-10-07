import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

export default function SensorInstall({
  sectionLabel,
  name,
  image,
  where,
  whyHere,
  accent = 'var(--orange-400)',
  imageMaxHeight = 560,
  note,
}) {
  return (
    <Slide sectionLabel={sectionLabel}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 44, alignItems: 'center', height: '100%' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            padding: 12,
            background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.4), rgba(10, 18, 48, 0.3))',
            border: '1px solid rgba(104, 121, 201, 0.25)',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={image}
            alt={`${name} — installation`}
            style={{
              maxWidth: '100%',
              maxHeight: imageMaxHeight,
              objectFit: 'contain',
              borderRadius: 10,
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
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
            Emplacement · Komax K1
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
              marginBottom: 8,
            }}>
              Où sur la machine
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.55 }}>{where}</div>
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
              Pourquoi à cet endroit
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.55 }}>{whyHere}</div>
          </motion.div>

          {note && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              style={{
                marginTop: 14,
                padding: '8px 14px',
                display: 'inline-block',
                background: 'rgba(250, 204, 21, 0.12)',
                border: '1px solid rgba(250, 204, 21, 0.4)',
                borderRadius: 999,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--yellow-400)',
                letterSpacing: '0.05em',
              }}
            >
              ⚠ {note}
            </motion.div>
          )}
        </div>
      </div>
    </Slide>
  );
}
