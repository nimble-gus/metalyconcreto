import Image from 'next/image';
import { getGalleryImages } from '@/lib/gallery-actions';
import GalleryCarousel from '@/components/GalleryCarousel';

export default async function GaleriaPage() {
  const images = await getGalleryImages();
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/estructura.jpg"
            alt="Galería Metal y Concreto"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/70" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Galería
            </h1>
            <p className="text-lg sm:text-xl text-gray-200">
              Conoce nuestros proyectos y el trabajo que realizamos en Metal y Concreto
            </p>
          </div>
        </div>
      </section>

      {/* Carousel Gallery */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Nuestros Proyectos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Desliza o usa las flechas para explorar las imágenes. En dispositivos móviles, desliza con el dedo.
          </p>
        </div>
        <GalleryCarousel images={images} />
      </section>
    </div>
  );
}
