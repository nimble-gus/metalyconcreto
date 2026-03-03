'use client';

import { useState } from 'react';
import { Upload, Trash2, ImageIcon, GripVertical } from 'lucide-react';
import { uploadGalleryImages, deleteGalleryImage, reorderGalleryImages } from '@/lib/gallery-actions';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
}

export default function GalleryManager({ images: initialImages }: { images: GalleryImage[] }) {
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleDragStart(e: React.DragEvent, id: string) {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.setData('application/json', JSON.stringify({ id }));
  }

  function handleDragOver(e: React.DragEvent, id: string) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggingId && draggingId !== id) setDragOverId(id);
  }

  function handleDragLeave() {
    setDragOverId(null);
  }

  function handleDrop(e: React.DragEvent, targetId: string) {
    e.preventDefault();
    setDragOverId(null);
    setDraggingId(null);
    const sourceId = e.dataTransfer.getData('text/plain');
    if (!sourceId || sourceId === targetId) return;

    const sourceIdx = images.findIndex((i) => i.id === sourceId);
    const targetIdx = images.findIndex((i) => i.id === targetId);
    if (sourceIdx === -1 || targetIdx === -1) return;

    const reordered = [...images];
    const [removed] = reordered.splice(sourceIdx, 1);
    reordered.splice(targetIdx, 0, removed);
    setImages(reordered);

    reorderGalleryImages(reordered.map((i) => i.id)).catch((err) => {
      setError(err instanceof Error ? err.message : 'Error al reordenar');
      setImages(initialImages);
    });
  }

  function handleDragEnd() {
    setDraggingId(null);
    setDragOverId(null);
  }

  async function handleUpload(formData: FormData) {
    setUploading(true);
    setError(null);
    try {
      await uploadGalleryImages(formData);
      const res = await fetch('/api/gallery', { cache: 'no-store', credentials: 'include' });
      const data = await res.json();
      setImages(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al subir');
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta imagen?')) return;
    setError(null);
    try {
      await deleteGalleryImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al eliminar');
    }
  }

  return (
    <div className="space-y-8">
      {/* Upload form */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Subir imágenes
        </h3>
        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
        )}
        <form action={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Archivos (puedes seleccionar varias)
            </label>
            <input
              type="file"
              name="files"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            <p className="mt-1 text-xs text-gray-500">Formatos: JPEG, PNG, WebP, GIF</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Texto alternativo (opcional, aplica a todas)
            </label>
            <input
              type="text"
              name="alt"
              placeholder="Descripción para las imágenes"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 bg-brand-red text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Subir imágenes
              </>
            )}
          </button>
        </form>
      </div>

      {/* Image grid */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Imágenes de la galería ({images.length})
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Arrastra las imágenes para reordenar el carrusel. Sin límite de cantidad.
          </p>
        </div>
        {images.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>No hay imágenes. Sube la primera.</p>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((img) => (
              <div
                key={img.id}
                onDragOver={(e) => handleDragOver(e, img.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, img.id)}
                className={`group relative rounded-xl overflow-hidden bg-gray-100 aspect-square transition-all ${
                  draggingId === img.id ? 'opacity-50 scale-95' : ''
                } ${dragOverId === img.id ? 'ring-2 ring-brand-red ring-offset-2 scale-105' : ''}`}
              >
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, img.id)}
                  onDragEnd={handleDragEnd}
                  className="absolute top-2 left-2 z-20 p-1.5 rounded-lg bg-black/50 text-white cursor-grab active:cursor-grabbing hover:bg-black/70 touch-none"
                >
                  <GripVertical className="w-5 h-5 pointer-events-none" />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt || 'Galería'}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-gray-500 text-sm bg-gray-200">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span>No se pudo cargar</span>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{img.alt || 'Sin descripción'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(img.id)}
                    className="p-2 text-white hover:bg-red-600 rounded-lg transition-colors ml-2"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
