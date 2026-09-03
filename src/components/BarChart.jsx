import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter.jsx';

export default function BarChart({ bars, max = 1, unit = '', delayBase = 0.3 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: '100%' }}>
      {bars.map((b, i) => {
        const pct = (b.value / max) * 100;
        const delay = delayBase + i * 0.2;
        return (
          <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>
                  {b.label}
                </span>
                {b.hint && (
                  <span style={{ fontSize: 12, color: 'var(--grey-500)', fontFamily: 'var(--font-mono)' }}>
                    {b.hint}
                  </span>
                )}
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 26,
                color: b.highlight ? 'var(--orange-400)' : 'var(--white)',
              }}>
                <AnimatedCounter to={b.value} decimals={b.decimals ?? 3} delay={delay} suffix={unit} />
              </div>
            </div>
            <div style={{
              height: 14,
              background: 'rgba(104, 121, 201, 0.15)',
              borderRadius: 8,
              overflow: 'hidden',
              border: '1px solid rgba(104, 121, 201, 0.2)',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: '100%',
                  background: b.highlight
                    ? 'linear-gradient(90deg, var(--orange-500), var(--orange-300))'
                    : 'linear-gradient(90deg, var(--navy-500), var(--navy-300))',
                  borderRadius: 8,
                  boxShadow: b.highlight ? '0 0 20px rgba(255, 122, 26, 0.6)' : 'none',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
