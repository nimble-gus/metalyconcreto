'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Hand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SWIPE_HINT_KEY = 'gallery-swipe-hint-seen';

// Imágenes por defecto cuando no hay en BD (primera carga o sin S3)
const DEFAULT_IMAGES = [
  { src: '/hero-1.jpg', alt: 'Proyecto de construcción Metal y Concreto' },
  { src: '/hero-2.jpg', alt: 'Estructura en acero' },
  { src: '/hero-3.jpg', alt: 'Obra en construcción' },
  { src: '/arqui.jpg', alt: 'Diseño arquitectónico' },
  { src: '/estructura.jpg', alt: 'Estructura metálica' },
  { src: '/plan.png', alt: 'Planos de proyecto' },
  { src: '/contacto.jpg', alt: 'Nuestro equipo de trabajo' },
];

interface GalleryImage {
  url: string;
  alt: string;
}

export default function GalleryCarousel({ images: propImages }: { images?: GalleryImage[] }) {
  const galleryImages =
    propImages && propImages.length > 0
      ? propImages.map((i) => ({ src: i.url, alt: i.alt || '' }))
      : DEFAULT_IMAGES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth < 640;
    const seen = sessionStorage.getItem(SWIPE_HINT_KEY);
    if (isMobile && !seen) setShowSwipeHint(true);
  }, []);

  const len = galleryImages.length;
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(((index % len) + len) % len);
  }, [len]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + len) % len);
  }, [len]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % len);
  }, [len]);

  // Mínima distancia para considerar un swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) goToNext();
      else goToPrevious();
      if (showSwipeHint) {
        setShowSwipeHint(false);
        sessionStorage.setItem(SWIPE_HINT_KEY, '1');
      }
    }
  };

  const dismissSwipeHint = () => {
    setShowSwipeHint(false);
    sessionStorage.setItem(SWIPE_HINT_KEY, '1');
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="space-y-6">
        {/* Carrusel */}
        <div
          className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] sm:aspect-[16/10] max-h-[70vh] sm:max-h-[75vh] touch-pan-y select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                fill
                className="object-contain sm:object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1152px"
                priority={currentIndex < 2}
                unoptimized
              />
            </motion.div>
          </AnimatePresence>

          {/* Botones de navegación */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm text-gray-800 p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm text-gray-800 p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
          </button>

          {/* Contador */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
            {currentIndex + 1} / {galleryImages.length}
          </div>

          {/* Overlay instrucción swipe - solo móvil */}
          <AnimatePresence>
            {showSwipeHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm sm:hidden"
                onClick={dismissSwipeHint}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.1 }}
                  className="mx-6 rounded-2xl bg-white/95 px-6 py-5 shadow-xl text-center max-w-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-center mb-3">
                    <Hand className="w-10 h-10 text-brand-red" strokeWidth={1.5} />
                  </div>
                  <p className="text-gray-800 font-semibold mb-1">Deslice el dedo</p>
                  <p className="text-gray-600 text-sm mb-4">
                    Desliza hacia los lados para ver más fotos
                  </p>
                  <button
                    type="button"
                    onClick={dismissSwipeHint}
                    className="w-full py-2.5 bg-brand-red text-white rounded-xl font-medium hover:bg-brand-redDark transition-colors"
                  >
                    Entendido
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Indicadores (dots) - compactos en móvil, normales en desktop */}
        <div className="flex justify-center gap-1 sm:gap-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 touch-manipulation flex items-center justify-center p-2 sm:p-1 ${
                index === currentIndex
                  ? 'bg-brand-red w-5 h-1.5 sm:w-8 sm:h-3'
                  : 'bg-gray-300 hover:bg-gray-400 w-1.5 h-1.5 sm:w-3 sm:h-3'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
