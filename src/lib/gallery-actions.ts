'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { uploadToS3, deleteFromS3, getPresignedUrl } from '@/lib/s3';
import { revalidatePath } from 'next/cache';

/** Imágenes para mostrar (con URLs firmadas - Railway buckets son privados) */
export async function getGalleryImages() {
  const rows = await db.galleryImage.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { id: true, url: true, key: true, alt: true, sortOrder: true },
  });

  const withPresigned = await Promise.all(
    rows.map(async (img) => ({
      id: img.id,
      url: await getPresignedUrl(img.key, 3600),
      alt: img.alt,
      sortOrder: img.sortOrder,
    }))
  );
  return withPresigned;
}

const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

async function uploadSingleImage(
  file: File,
  alt: string,
  sortOrder: number
): Promise<void> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split('.').pop() || 'jpg';
  const key = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const url = await uploadToS3(buffer, key, file.type);
  await db.galleryImage.create({
    data: { url, key, alt, sortOrder },
  });
}

export async function uploadGalleryImage(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('No autorizado');

  const file = formData.get('file') as File;
  const alt = (formData.get('alt') as string) || '';

  if (!file || !file.size) throw new Error('Selecciona una imagen');

  if (!VALID_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Formato no válido. Usa JPEG, PNG, WebP o GIF.');
  }

  const maxOrder = await db.galleryImage.aggregate({
    _max: { sortOrder: true },
  });
  const sortOrder = (maxOrder._max.sortOrder ?? -1) + 1;

  await uploadSingleImage(file, alt, sortOrder);

  revalidatePath('/galeria');
  revalidatePath('/admin/gallery');
  return { success: true };
}

export async function uploadGalleryImages(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('No autorizado');

  const files = formData.getAll('files') as File[];
  const alt = (formData.get('alt') as string) || '';

  if (!files.length) throw new Error('Selecciona al menos una imagen');

  const validFiles = files.filter((f) => f && f.size && VALID_IMAGE_TYPES.includes(f.type));
  const invalidCount = files.length - validFiles.length;
  if (invalidCount > 0) {
    throw new Error(
      `${invalidCount} archivo(s) ignorados. Solo JPEG, PNG, WebP y GIF son válidos.`
    );
  }

  const maxOrder = await db.galleryImage.aggregate({
    _max: { sortOrder: true },
  });
  let sortOrder = (maxOrder._max.sortOrder ?? -1) + 1;

  for (const file of validFiles) {
    await uploadSingleImage(file, alt, sortOrder);
    sortOrder += 1;
  }

  revalidatePath('/galeria');
  revalidatePath('/admin/gallery');
  return { success: true, count: validFiles.length };
}

export async function updateGalleryImage(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('No autorizado');

  const alt = formData.get('alt') as string;
  const sortOrder = formData.get('sortOrder')
    ? parseInt(formData.get('sortOrder') as string, 10)
    : undefined;

  await db.galleryImage.update({
    where: { id },
    data: { alt: alt ?? undefined, sortOrder },
  });

  revalidatePath('/galeria');
  revalidatePath('/admin/gallery');
}

export async function reorderGalleryImages(orderedIds: string[]) {
  const session = await auth();
  if (!session?.user) throw new Error('No autorizado');

  await db.$transaction(
    orderedIds.map((id, index) =>
      db.galleryImage.update({
        where: { id },
        data: { sortOrder: index },
      })
    )
  );

  revalidatePath('/galeria');
  revalidatePath('/admin/gallery');
}

export async function deleteGalleryImage(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error('No autorizado');

  const img = await db.galleryImage.findUnique({ where: { id } });
  if (!img) throw new Error('Imagen no encontrada');

  try {
    await deleteFromS3(img.key);
  } catch (e) {
    console.error('Error deleting from S3:', e);
  }

  await db.galleryImage.delete({ where: { id } });
  revalidatePath('/galeria');
  revalidatePath('/admin/gallery');
}
