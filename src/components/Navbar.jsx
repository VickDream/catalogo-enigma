import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

export function Navbar() {
  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.logoContainer}>
        <img src="/logoe.svg" alt="Logo Imprenta" className={styles.logoImg} />
      </Link>
      
      <a 
        href="https://wa.me/+527228418404?text=Hola,%20me%20gustaría%20solicitar%20información%20general%20del%20catálogo" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.contactBadge}
      >
        !Contactar¡
      </a>
    </header>
  );
}