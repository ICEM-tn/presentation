import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

export default function Machines() {
  return (
    <Slide sectionLabel="01 · Les deux machines">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Alpha 433 H · Gamma 333 PC.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
      >
        Machines Komax de coupe et sertissage de fil.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 24 }}>
        <MachineCard
          delay={0.4}
          from={-40}
          image="img/machines/alpha433h_photo.png"
          name="Alpha 433 H"
          role="Servomoteurs électriques"
          specs={[
            ['Actionneurs', '6 servos BLDC'],
            ['Cycle', 'Ultra-rapide'],
            ['Section du fil', '0,5 – 6 mm²'],
          ]}
        />
        <MachineCard
          delay={0.55}
          from={40}
          image="img/machines/gamma333pc_photo.jpg"
          name="Gamma 333 PC"
          role="Actionneurs pneumatiques"
          specs={[
            ['Actionneurs', 'Pneumatique + servos'],
            ['Cycle', 'Standard'],
            ['Section du fil', '0,22 – 4 mm²'],
          ]}
        />
      </div>
    </Slide>
  );
}

function MachineCard({ delay, from, image, name, role, specs }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: 24,
        background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.4))',
        border: '1px solid rgba(104, 121, 201, 0.25)',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div style={{
        height: 220,
        borderRadius: 14,
        overflow: 'hidden',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img src={image} alt={name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>

      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 700, marginBottom: 4 }}>
          {name}
        </div>
        <div style={{ fontSize: 13, color: 'var(--orange-400)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
          {role}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
        {specs.map(([k, v]) => (
          <div key={k} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '6px 0',
            borderBottom: '1px solid rgba(104, 121, 201, 0.15)',
            fontSize: 14,
          }}>
            <span style={{ color: 'var(--grey-500)' }}>{k}</span>
            <span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
