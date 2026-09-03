import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Slide({ children, sectionLabel, className = '', style = {} }) {
  return (
    <motion.section
      className={`slide ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...style,
      }}
    >
      {sectionLabel && (
        <motion.div variants={itemVariants} className="section-label">
          {sectionLabel}
        </motion.div>
      )}
      {children}
    </motion.section>
  );
}
