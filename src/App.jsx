import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { products } from './data/products';
import { galleryItems } from './data/gallery';
import { Navbar } from './components/Navbar';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { WorkGallery } from './components/WorkGallery';
import { SplashLogo } from './components/SplashLogo';
import './App.css';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Carga inicial al entrar por primera vez
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Dispara la animación cada vez que cambias de ruta con un texto estándar
  useEffect(() => {
    if (isLoading) return;

    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleShowGallery = (product) => {
    setSelectedProduct(null);
    const rawCategory = product.category ? product.category.toLowerCase().trim() : '';

    let targetCategory = 'Promocionales';

    if (rawCategory.includes('dtf uv')) {
      targetCategory = 'Termos y Tazas';
    } else if (rawCategory.includes('textil') || rawCategory.includes('camisa') || rawCategory.includes('ropa') || rawCategory.includes('uniforme') || (rawCategory.includes('dtf') && !rawCategory.includes('uv'))) {
      targetCategory = 'Textil';
    } else if (rawCategory.includes('termo') || rawCategory.includes('taza') || rawCategory.includes('vaso') || rawCategory.includes('vajilla')) {
      targetCategory = 'Termos y Tazas';
    } else if (rawCategory.includes('etiqueta') || rawCategory.includes('sticker') || rawCategory.includes('papel') || rawCategory.includes('calendario') || rawCategory.includes('agenda')) {
      targetCategory = 'Etiquetas y Papelería';
    } else if (rawCategory.includes('promocional') || rawCategory.includes('evento') || rawCategory.includes('recuerdo')) {
      targetCategory = 'Promocionales';
    }

    navigate('/galeria', { state: { category: targetCategory } });
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <SplashLogo />}
        {/* Aquí ya no mandamos textos largos, solo la animación limpia */}
        {isTransitioning && <SplashLogo />}
      </AnimatePresence>

      <Navbar />

      <main className="mainContainer">
        <Routes>
          <Route path="/" element={
            <>
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
                products={products}
                onClose={() => setSelectedProduct(null)}
                onSelectProduct={setSelectedProduct}
                onShowGallery={handleShowGallery}
              />
            </>
          } />

          <Route path="/galeria" element={
            <WorkGallery items={galleryItems} onBackHome={() => navigate('/')} />
          } />
        </Routes>
      </main>
    </>
  );
}