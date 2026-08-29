import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { products } from './data/products';
import { Navbar } from './components/Navbar';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { SplashLogo } from './components/SplashLogo';
import './App.css';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula el tiempo de carga inicial de la web
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppInquiry = (product) => {
    const message = encodeURIComponent(`Hola, me interesa cotizar el siguiente producto:\n\n*${product.name}*\nPrecio ref: $${product.price} MXN`);
    window.open(`https://wa.me/tu_numero_aqui?text=${message}`, '_blank');
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <SplashLogo />}
      </AnimatePresence>

      <Navbar />

      <main className="mainContainer">
        <header className="headerSection">
          <h1 className="mainTitle">Catálogo Digital</h1>
          <p className="mainSubtitle">Soluciones de impresión y artículos personalizados • Venta exclusiva por mayoreo y tirajes especiales para eventos</p>
        </header>

        <ProductGrid 
          products={products} 
          onSelectProduct={(product) => setSelectedProduct(product)} 
        />

        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onInquiry={handleWhatsAppInquiry}
        />
      </main>
    </>
  );
}