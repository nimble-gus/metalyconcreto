import { getGalleryImages } from '@/lib/gallery-actions';
import GalleryManager from '@/components/admin/GalleryManager';

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Galería</h1>
        <p className="text-gray-600 mt-1">
          Gestiona las imágenes del carrusel en la página Galería. Sube, elimina y organiza sin
          límite.
        </p>
      </div>
      <GalleryManager images={images} />
    </main>
  );
}
