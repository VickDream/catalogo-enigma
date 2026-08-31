import { useState, useEffect } from 'react';
import styles from '../styles/WorkGallery.module.css';

export function WorkGallery({ items, initialCategory = 'Todos' }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  // Las 4 categorías maestras visibles en las pestañas
  const categories = ['Todos', 'Textil', 'Etiquetas y Papelería', 'Promocionales'];

  // Función para normalizar y clasificar cualquier categoría interna
  const getMappedCategory = (itemCategory) => {
    if (!itemCategory) return 'Promocionales';
    const cat = itemCategory.toLowerCase().trim();

    if (cat.includes('textil') || cat.includes('camisa') || cat.includes('ropa') || cat.includes('uniforme') || (cat.includes('dtf') && !cat.includes('uv'))) {
      return 'Textil';
    } else if (cat.includes('termo') || cat.includes('taza') || cat.includes('vaso') || cat.includes('vajilla') || cat.includes('dtf uv')) {
      return 'Termos y Tazas';
    } else if (cat.includes('etiqueta') || cat.includes('sticker') || cat.includes('papel') || cat.includes('calendario') || cat.includes('agenda')) {
      return 'Etiquetas y Papelería';
    } else {
      return 'Promocionales';
    }
  };

  const filteredItems = activeCategory === 'Todos'
    ? items
    : items.filter((item) => getMappedCategory(item.category) === activeCategory);

  return (
    <section className={styles.gallerySection}>
      <div className={styles.galleryHeader}>
        <h2 className={styles.galleryTitle}>Nuestros Trabajos Realizados</h2>
        <p className={styles.gallerySubtitle}>Explora una muestra real de los proyectos que hemos entregado.</p>

        <div className={styles.filterTabs}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterTab} ${activeCategory === category ? styles.filterTabActive : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Cuadrícula minimalista: solo imágenes puras con bordes redondeados */}
      <div className={styles.galleryGrid}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={styles.galleryCard}
            onClick={() => setActiveImage(item)}
          >
            <img src={item.image} alt={item.title || 'Trabajo realizado'} className={styles.galleryImage} loading="lazy" />
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className={styles.emptyText}>No hay proyectos en esta categoría por el momento.</p>
      )}

      {/* Modal / Popup limpio solo con la foto ampliada */}
      {activeImage && (
        <div className={styles.modalOverlay} onClick={() => setActiveImage(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setActiveImage(null)}>&times;</button>
            <img src={activeImage.image} alt={activeImage.title || 'Vista ampliada'} className={styles.modalImage} />
          </div>
        </div>
      )}
    </section>
  );
}