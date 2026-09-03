import { useEffect, useState } from 'react';
import { animate, motion } from 'framer-motion';

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 1.6,
  delay = 0.2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  style = {},
}) {
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [from, to, duration, delay]);

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString('fr-FR').replace(/,/g, ' ');

  return (
    <motion.span
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay - 0.1 }}
    >
      {prefix}{formatted}{suffix}
    </motion.span>
  );
}
