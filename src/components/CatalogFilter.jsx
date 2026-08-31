import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { galleryData } from './gallery.js';
import styles from '../styles/CatalogFilter.module.css';

const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'bolsas', label: 'Bolsas' },
  { id: 'promocionales', label: 'Promocionales' },
  { id: 'senaletica', label: 'Señalética' },
  { id: 'stickers', label: 'Stickers' },
  { id: 'termos_tazas', label: 'Termos y Tazas' },
  { id: 'textil', label: 'Textil' },
  { id: 'impresion_instalacion', label: 'Impresión e Instalación' },
];

export default function CatalogFilter() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialCategory = location.state?.category ? location.state.category.toLowerCase() : 'todos';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filteredProducts = activeCategory === 'todos'
    ? galleryData
    : galleryData.filter(product => product.category && product.category.toLowerCase().includes(activeCategory));

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev + 1) % filteredProducts.length);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % filteredProducts.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredProducts.length]);

  const currentProduct = selectedIndex !== null ? filteredProducts[selectedIndex] : null;

  return (
    <div className={styles.container}>
      <button
        className={styles.backCatalogBtn}
        onClick={() => navigate('/')}
      >
        &#8592; Regresar al Catálogo
      </button>

      <div className={styles.filterTabs}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`${styles.filterTab} ${activeCategory === cat.id ? styles.filterTabActive : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className={styles.galleryGrid}>
        {filteredProducts.map((product, index) => (
          <div
            key={product.id || index}
            className={styles.galleryCard}
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={product.image}
              alt={product.name || 'Trabajo realizado'}
              className={styles.galleryImage}
            />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className={styles.emptyText}>No hay productos en esta categoría por el momento.</p>
      )}

      {currentProduct && (
        <div className={styles.modalOverlay} onClick={() => setSelectedIndex(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setSelectedIndex(null)}>&times;</button>

            <div className={styles.imageWrapper}>
              <button className={`${styles.sliderButton} ${styles.prevButton}`} onClick={handlePrev}>
                &#10094;
              </button>

              <img
                src={currentProduct.image}
                alt="Vista ampliada"
                className={styles.modalImage}
              />

              <button className={`${styles.sliderButton} ${styles.nextButton}`} onClick={handleNext}>
                &#10095;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}