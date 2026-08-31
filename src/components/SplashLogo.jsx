import { motion } from 'framer-motion';
import styles from '../styles/SplashLogo.module.css';

export function SplashLogo({ text = "Cargando Catálogo..." }) {
  return (
    <motion.div 
      className={styles.splashContainer}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className={styles.logoWrapper}>
        <motion.img 
          src="/logoe2.svg" 
          alt="Logo" 
          className={styles.splashLogo}
          initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 220, damping: 15 }}
        />
        <motion.span 
          className={styles.splashText}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {text}
        </motion.span>
      </div>
    </motion.div>
  );
}