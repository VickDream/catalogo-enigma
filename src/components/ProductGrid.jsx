import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';
import styles from '../styles/ProductGrid.module.css';

export function ProductGrid({ products, onSelectProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', ...new Set(products.map((p) => p.category))];

  // Lógica de búsqueda inteligente y flexible
  const filteredProducts = products.filter((product) => {
    const query = searchTerm.toLowerCase().trim();
    
    // Si hay texto en el buscador, verificamos si coincide en nombre, descripción o categoría
    const matchesSearch = query === '' || 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.container}>
      <div className={styles.filtersWrapper}>
        {/* Placeholder actualizado con los ejemplos sugeridos */}
        <input 
          type="text" 
          placeholder="Buscar por: recuerdos, promocionales, serigrafia, DTF..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.categoriesContainer}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.categoryButtonActive : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        className={styles.grid}
        layout
      >
        <AnimatePresence>
          {filteredProducts.length === 0 ? (
            <motion.p 
              className={styles.empty}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No se encontraron productos que coincidan con tu búsqueda.
            </motion.p>
          ) : (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard 
                  product={product} 
                  onSelect={onSelectProduct} 
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}