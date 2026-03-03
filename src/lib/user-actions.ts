'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error('No autorizado');
  const role = (session.user as { role?: string }).role;
  if (role !== 'ADMIN') throw new Error('Solo administradores pueden gestionar usuarios');
}

export async function getUsers() {
  await requireAdmin();
  return db.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function createUser(formData: FormData) {
  await requireAdmin();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = (formData.get('role') as 'ADMIN' | 'VIEWER') || 'VIEWER';

  if (!email || !password) throw new Error('Email y contraseña son requeridos');
  if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres');

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) throw new Error('Ya existe un usuario con ese email');

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name: name || null,
      email,
      hashedPassword,
      role,
    },
  });

  revalidatePath('/admin/users');
}

export async function updateUser(id: string, formData: FormData) {
  await requireAdmin();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = (formData.get('role') as 'ADMIN' | 'VIEWER') || undefined;

  const data: { name?: string | null; email?: string; hashedPassword?: string; role?: 'ADMIN' | 'VIEWER' } = {};
  if (name !== undefined) data.name = name || null;
  if (email) data.email = email;
  if (role) data.role = role;
  if (password && password.length >= 6) {
    data.hashedPassword = await bcrypt.hash(password, 10);
  }

  await db.user.update({
    where: { id },
    data,
  });

  revalidatePath('/admin/users');
}

export async function deleteUser(id: string) {
  await requireAdmin();

  const session = await auth();
  const currentId = (session?.user as { id?: string })?.id;
  if (currentId === id) throw new Error('No puedes eliminar tu propio usuario');

  await db.user.delete({ where: { id } });
  revalidatePath('/admin/users');
}
