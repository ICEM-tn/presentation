import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

export default function Applications() {
  return (
    <Slide sectionLabel="Couche 5 · Application">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        Web + Mobile.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 32 }}
      >
        Bureau pour piloter · terrain pour agir.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40, alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: 18,
            background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.5))',
            border: '1px solid rgba(104, 121, 201, 0.3)',
            borderRadius: 18,
          }}
        >
          <div style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'center' }}>
            <img src="img/stack/logo_react.png" alt="React" style={{ height: 32, background: '#fff', padding: 4, borderRadius: 6 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>Application Web</div>
              <div style={{ fontSize: 12, color: 'var(--grey-500)', fontFamily: 'var(--font-mono)' }}>React · Chart.js · rôle-based</div>
            </div>
          </div>
          <div style={{
            aspectRatio: '16/9',
            borderRadius: 10,
            overflow: 'hidden',
            border: '1px solid rgba(104, 121, 201, 0.2)',
          }}>
            <img src="img/web/dashboard_web.png" alt="Dashboard web" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Tableau de bord', 'Équipements', 'Interventions', 'Alertes', 'Diagnostic IA', 'Fiabilité'].map((t) => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: 18,
            background: 'linear-gradient(180deg, rgba(24, 37, 98, 0.5), rgba(10, 18, 48, 0.5))',
            border: '1px solid rgba(104, 121, 201, 0.3)',
            borderRadius: 18,
          }}
        >
          <div style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'center' }}>
            <img src="img/stack/logo_flutter.png" alt="Flutter" style={{ height: 32, background: '#fff', padding: 4, borderRadius: 6 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>Application Mobile</div>
              <div style={{ fontSize: 12, color: 'var(--grey-500)', fontFamily: 'var(--font-mono)' }}>Flutter · Firebase (notifications push) · Android</div>
            </div>
          </div>
          <div style={{
            aspectRatio: '9/16',
            maxHeight: 260,
            margin: '0 auto',
            borderRadius: 20,
            overflow: 'hidden',
            border: '2px solid rgba(104, 121, 201, 0.4)',
            background: '#111',
          }}>
            <img src="img/flutter/dashboard_flutter.png" alt="Dashboard mobile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Tableau de bord', 'Interventions', 'Alertes', 'Photos NOK', 'Notifications'].map((t) => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
