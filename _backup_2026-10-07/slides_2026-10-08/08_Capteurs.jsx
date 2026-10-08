import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';
import SignalWave from '../components/SignalWave.jsx';

const sensors = [
  { img: 'img/sensors/dht22.jpg', name: 'DHT22 ×2', measure: 'Température', where: 'Moteur + armoire', wave: 'thermal', color: 'var(--yellow-400)' },
  { img: 'img/sensors/mpu6050.jpg', name: 'MPU-6050', measure: 'Vibrations', where: 'Châssis moteur', wave: 'vibration', color: 'var(--cyan-400)' },
  { img: 'img/sensors/amg8833.jpg', name: 'AMG8833', measure: 'Imagerie thermique', where: 'Vue armoire 8×8', wave: 'sine', color: 'var(--orange-400)' },
  { img: 'img/sensors/sct013.jpg', name: 'STC013', measure: 'Courant électrique', where: 'Feeder armoire', wave: 'current', color: 'var(--green-400)' },
];

export default function Capteurs() {
  return (
    <Slide sectionLabel="Couche 1 · Perception">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Cinq capteurs.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 40 }}
      >
        Quatre grandeurs physiques · une seule vérité terrain.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {sensors.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.75,
              delay: 0.45 + i * 0.13,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            style={{
              padding: 20,
              background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.5))',
              border: '1px solid rgba(104, 121, 201, 0.25)',
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              height: 130,
              borderRadius: 10,
              overflow: 'hidden',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img src={s.img} alt={s.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>
                {s.name}
              </div>
              <div style={{ fontSize: 13, color: 'var(--orange-400)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
                {s.measure}
              </div>
              <div style={{ fontSize: 12, color: 'var(--grey-500)', marginTop: 6 }}>
                {s.where}
              </div>
            </div>

            {/* Signal en direct — thème oscilloscope IoT */}
            <div style={{
              marginTop: 4,
              padding: '8px 10px',
              background: 'rgba(5, 11, 30, 0.7)',
              border: '1px solid rgba(104, 121, 201, 0.2)',
              borderRadius: 6,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: s.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  ● Signal
                </span>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--grey-500)' }}>
                  1 Hz
                </span>
              </div>
              <SignalWave type={s.wave} color={s.color} height={30} delay={0.8 + i * 0.15} strokeWidth={1.2} />
            </div>

            <motion.div
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 2, delay: 1 + i * 0.2, repeat: Infinity, repeatDelay: 1 }}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--cyan-400)',
                boxShadow: '0 0 12px var(--cyan-400)',
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        style={{
          marginTop: 32,
          padding: '14px 20px',
          background: 'rgba(78, 205, 196, 0.06)',
          border: '1px solid rgba(78, 205, 196, 0.25)',
          borderRadius: 10,
          textAlign: 'center',
          fontSize: 14,
          fontFamily: 'var(--font-mono)',
          color: 'var(--cyan-400)',
          letterSpacing: '0.05em',
        }}
      >
        ÉCHANTILLONNAGE 1s · TRANSMISSION 60s · JSON HTTP POST
      </motion.div>
    </Slide>
  );
}
