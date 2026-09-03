import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';
import DataPackets from '../components/DataPackets.jsx';

export default function Edge() {
  return (
    <Slide sectionLabel="Couche 2 · Edge">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', height: '100%' }}>
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="slide-title"
            style={{ marginBottom: 12 }}
          >
            Raspberry Pi.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="slide-subtitle"
            style={{ marginBottom: 32 }}
          >
            Un mini-ordinateur, cinq capteurs, une machine.
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              ['Lecture', '1-Wire · I²C · GPIO'],
              ['Agrégation', 'Fenêtres de 60s'],
              ['Envoi', 'HTTP POST /api/capteurs/ingest'],
              ['Autonomie', 'Systemd · redémarrage auto'],
            ].map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: 14,
                  alignItems: 'center',
                  padding: '10px 14px',
                  borderLeft: '2px solid var(--orange-400)',
                  background: 'linear-gradient(90deg, rgba(255, 122, 26, 0.06), transparent)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange-400)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {k}
                </div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{v}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{
            position: 'relative',
            padding: 32,
            background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.4), rgba(10, 18, 48, 0.3))',
            border: '1px solid rgba(104, 121, 201, 0.25)',
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div style={{
            width: '100%',
            height: 240,
            borderRadius: 14,
            overflow: 'hidden',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
            <img src="img/sensors/raspberry_pi_4.jpg" alt="Raspberry Pi 4" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>

          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(255, 122, 26, 0.4)',
                '0 0 30px 8px rgba(255, 122, 26, 0)',
              ],
            }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 1.2 }}
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              background: 'rgba(255, 122, 26, 0.15)',
              border: '1px solid rgba(255, 122, 26, 0.4)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--orange-400)',
              letterSpacing: '0.1em',
            }}
          >
            ● EN DIRECT · 1 min
          </motion.div>

          {/* Flux de paquets IoT vers le backend */}
          <div style={{ width: '90%', marginTop: 4 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              color: 'var(--grey-500)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}>
              <span>Pi</span>
              <span>HTTP POST · JSON</span>
              <span>API</span>
            </div>
            <DataPackets count={5} color="var(--cyan-400)" height={12} speed={2.6} delayStart={1.5} />
          </div>

          {/* Signal orbit */}
          <svg
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}
            viewBox="0 0 400 400" preserveAspectRatio="none"
          >
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx="200" cy="200"
                initial={{ r: 40, opacity: 0.6 }}
                animate={{ r: 180, opacity: 0 }}
                transition={{
                  duration: 2.4,
                  delay: 1.4 + i * 0.6,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                stroke="var(--cyan-400)"
                strokeWidth="1"
                fill="none"
              />
            ))}
          </svg>
        </motion.div>
      </div>
    </Slide>
  );
}
