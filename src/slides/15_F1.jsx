import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';
import BarChart from '../components/BarChart.jsx';

export default function F1() {
  return (
    <Slide sectionLabel="04 · Validation">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 12 }}
      >
        F1 par cause.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 40 }}
      >
        Random Forest · validation par semaines · F1 macro 0,85.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <BarChart
            max={1}
            delayBase={0.45}
            bars={[
              { label: 'C05', value: 0.95, hint: 'surchauffe armoire', decimals: 2, decimalComma: true, highlight: true },
              { label: 'C03', value: 0.89, hint: 'ventilation moteur encrassée', decimals: 2, decimalComma: true },
              { label: 'C02', value: 0.85, hint: 'courroie détendue', decimals: 2, decimalComma: true },
              { label: 'C04', value: 0.74, hint: 'surcharge moteur', decimals: 2, decimalComma: true },
              { label: 'C01', value: 0.67, hint: 'usure mécanique · lente', decimals: 2, decimalComma: true },
            ]}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.7 }}
          style={{
            padding: 28,
            background: 'linear-gradient(180deg, rgba(255, 122, 26, 0.14), rgba(255, 122, 26, 0.03))',
            border: '1px solid rgba(255, 122, 26, 0.4)',
            borderRadius: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--orange-400)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Random Forest · diagnostic
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['Précision 0,80 à 0,99', 'quand il annonce une cause, il a presque toujours raison'],
              ['Erreurs logiques', 'surtout « Normal » au début d’une panne, encore trop faible'],
              ['Rapide', '61 ms par analyse · 2 h de mesures'],
            ].map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 1.0 + i * 0.1 }}
                style={{ display: 'flex', gap: 10 }}
              >
                <div style={{ color: 'var(--orange-400)', fontFamily: 'var(--font-mono)' }}>→</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{k}</div>
                  <div style={{ fontSize: 12, color: 'var(--grey-300)', marginTop: 2 }}>{v}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
