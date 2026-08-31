import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/ProductModal.module.css';

export function ProductModal({ product, products = [], onClose, onSelectProduct, onShowGallery }) {
  if (!product) return null;

  const currentIndex = products.findIndex((p) => p.id === product.id);

  const handlePrev = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      onSelectProduct(products[currentIndex - 1]);
    } else {
      onSelectProduct(products[products.length - 1]);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentIndex < products.length - 1) {
      onSelectProduct(products[currentIndex + 1]);
    } else {
      onSelectProduct(products[0]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className={styles.overlay} 
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button className={styles.navButtonPrev} onClick={handlePrev} aria-label="Producto anterior">
          &#10094;
        </button>

        <motion.div 
          key={product.id}
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
            
            <div className={styles.buttonGroup}>
              <a 
                href={`https://wa.me/527228418404?text=${encodeURIComponent(`Hola, me interesa cotizar el producto: ${product.name} (${product.price} MXN)`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                Cotizar por WhatsApp
              </a>

              {/* Botón para mostrar la galería de trabajos de este tipo */}
              {onShowGallery && (
                <button 
                  className={styles.galleryButton} 
                  onClick={() => {
                    onClose();
                    onShowGallery(product);
                  }}
                >
                  Ver galería de trabajos
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <button className={styles.navButtonNext} onClick={handleNext} aria-label="Producto siguiente">
          &#10095;
        </button>
      </motion.div>
    </AnimatePresence>
  );
}