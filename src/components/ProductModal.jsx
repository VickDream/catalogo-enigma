import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/ProductModal.module.css';

export function ProductModal({ product, onClose, onInquiry }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div 
          className={styles.overlay} 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={styles.modal} 
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
            
            <div className={styles.imageContainer}>
              <img src={product.image} alt={product.name} className={styles.image} />
            </div>
            
            <div className={styles.content}>
              <span className={styles.category}>{product.category}</span>
              <h2 className={styles.title}>{product.name}</h2>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.price}>${product.price} MXN</div>
              
              <a 
                href={`https://wa.me/+527228418404?text=${encodeURIComponent(`Hola, me interesa cotizar el producto: ${product.name}               (${product.price} MXN)`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.actionButton}
               >
                 Cotizar por WhatsApp
               </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}