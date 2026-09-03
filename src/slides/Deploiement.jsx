import { motion } from 'framer-motion';
import Slide from '../components/Slide.jsx';

const steps = [
  { n: '01', label: 'Serveur local Windows', hint: 'Réseau interne ICEM' },
  { n: '02', label: 'Backend Express.js', hint: 'PM2 · port 3000' },
  { n: '03', label: 'MongoDB local', hint: 'Base métier centralisée' },
  { n: '04', label: 'Microservices FastAPI', hint: 'Uvicorn · port 8001' },
  { n: '05', label: 'App web + mobile', hint: 'Accès LAN sur postes utilisateurs' },
];

export default function Deploiement() {
  return (
    <Slide sectionLabel="04 · Développement — Déploiement">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="slide-title"
        style={{ marginBottom: 8 }}
      >
        Déploiement local.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="slide-subtitle"
        style={{ marginBottom: 32 }}
      >
        Réseau interne ICEM — pas de cloud, données restent sur site.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 32, flex: 1 }}>
        {/* Terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#0a0f22',
            border: '1px solid rgba(104, 121, 201, 0.35)',
            borderRadius: 12,
            overflow: 'hidden',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            minHeight: 320,
          }}
        >
          <div style={{
            display: 'flex',
            gap: 6,
            padding: '10px 14px',
            background: 'rgba(255,255,255,0.04)',
            borderBottom: '1px solid rgba(104, 121, 201, 0.2)',
            alignItems: 'center',
          }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ marginLeft: 12, color: 'var(--grey-500)', fontSize: 11, letterSpacing: '0.12em' }}>
              icem@server ~ · PowerShell
            </span>
          </div>
          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            <TerminalLine delay={0.7} prompt="PS> " text="pm2 start ecosystem.config.js" color="var(--cyan-400)" />
            <TerminalLine delay={1.0} text="[PM2] Starting backend-express..." color="var(--grey-500)" />
            <TerminalLine delay={1.2} text="[PM2] Starting fastapi-uvicorn..." color="var(--grey-500)" />
            <TerminalLine delay={1.4} text="┌────────────────┬────┬────────┬────────┐" color="var(--grey-500)" />
            <TerminalLine delay={1.5} text="│ name           │ id │ status │ mem    │" color="var(--grey-500)" />
            <TerminalLine delay={1.6} text="├────────────────┼────┼────────┼────────┤" color="var(--grey-500)" />
            <TerminalLine delay={1.7} text="│ backend-express│ 0  │ online │ 82.4mb │" color="var(--green-400)" />
            <TerminalLine delay={1.8} text="│ fastapi-uvicorn│ 1  │ online │ 94.1mb │" color="var(--green-400)" />
            <TerminalLine delay={1.9} text="└────────────────┴────┴────────┴────────┘" color="var(--grey-500)" />
            <TerminalLine delay={2.15} prompt="PS> " text="curl http://localhost:3000/health" color="var(--cyan-400)" />
            <TerminalLine delay={2.4} text='{"status":"ok","db":"connected"}' color="var(--orange-400)" />
          </div>
        </motion.div>

        {/* Steps list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.6 + i * 0.1 }}
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                padding: '14px 18px',
                background: 'linear-gradient(90deg, rgba(74,222,128,0.06), transparent)',
                borderLeft: '3px solid var(--green-400)',
                borderRadius: '0 8px 8px 0',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--green-400)',
                minWidth: 32,
              }}>
                {s.n}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 12, color: 'var(--grey-500)', marginTop: 2 }}>
                  {s.hint}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function TerminalLine({ delay, prompt = '', text, color = 'var(--navy-100)' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      style={{ display: 'flex', gap: 6 }}
    >
      {prompt && <span style={{ color: 'var(--orange-400)' }}>{prompt}</span>}
      <span style={{ color }}>{text}</span>
    </motion.div>
  );
}
