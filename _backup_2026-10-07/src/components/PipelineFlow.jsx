import { motion } from 'framer-motion';

export default function PipelineFlow({ steps, delayBase = 0.3 }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, position: 'relative' }}>
        {steps.map((step, i) => (
          <StepNode key={step.label} step={step} index={i} total={steps.length} delayBase={delayBase} />
        ))}
      </div>
    </div>
  );
}

function StepNode({ step, index, total, delayBase }) {
  const delay = delayBase + index * 0.18;
  const isLast = index === total - 1;

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          flex: 1,
          zIndex: 2,
        }}
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(255, 122, 26, 0)',
              '0 0 30px 4px rgba(255, 122, 26, 0.5)',
              '0 0 0 0 rgba(255, 122, 26, 0)',
            ],
          }}
          transition={{
            duration: 2,
            delay: delay + 0.2,
            repeat: Infinity,
            repeatDelay: total * 0.4,
          }}
          style={{
            width: 78,
            height: 78,
            borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(255, 122, 26, 0.22), rgba(24, 37, 98, 0.85))',
            border: '1.5px solid rgba(255, 122, 26, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
          }}
        >
          {step.icon}
        </motion.div>
        <div style={{ textAlign: 'center', lineHeight: 1.2 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{step.label}</div>
          {step.hint && (
            <div style={{ fontSize: 10, color: 'var(--grey-500)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
              {step.hint}
            </div>
          )}
        </div>
      </motion.div>

      {!isLast && (
        <div style={{ position: 'absolute', top: 39, left: '65%', right: 0, height: 2, transform: 'translateX(0)', overflow: 'hidden', zIndex: 1 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(104, 121, 201, 0.25)' }} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1,
              delay: delay + 0.4,
              repeat: Infinity,
              repeatDelay: total * 0.4 - 1,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, var(--orange-400), transparent)',
            }}
          />
        </div>
      )}
    </div>
  );
}
