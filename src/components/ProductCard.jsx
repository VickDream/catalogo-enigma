import styles from '../styles/ProductCard.module.css';

export function ProductCard({ product, onSelect }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>{product.name}</h3>
        <div className={styles.price}>${product.price} MXN</div>
        <button className={styles.button} onClick={() => onSelect(product)}>
          Ver detalles
        </button>
      </div>
    </div>
  );
}