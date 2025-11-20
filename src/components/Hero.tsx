'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const images = [
  '/hero-1.jpg',
  '/hero-2.jpg',
  '/hero-3.jpg',
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden mt-20">
      {/* Carousel Container */}
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Fallback gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-red via-brand-redDark to-brand-redDark" />
            <Image
              src={image}
              alt={`Hero image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              unoptimized
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Construimos el Futuro con{' '}
                <span className="text-brand-red">Excelencia</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Especialistas en estructura en acero, diseño arquitectónico y
                planificación de proyectos de construcción moderna.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#servicios"
                  className="bg-brand-navy text-white px-8 py-4 rounded-full hover:bg-brand-navyDark transition-all duration-200 font-semibold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Nuestros Servicios
                </a>
                <a
                  href="#cotiza"
                  className="bg-white text-brand-red px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-200 font-semibold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-brand-red"
                >
                  Solicitar Cotización
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-brand-navy'
                  : 'w-3 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

