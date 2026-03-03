'use client';

import { useState } from 'react';
import { UserPlus, Edit, Trash2, Shield, Eye } from 'lucide-react';
import { createUser, updateUser, deleteUser } from '@/lib/user-actions';

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
}

export default function UserList({ users: initialUsers }: { users: User[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(formData: FormData) {
    setError(null);
    try {
      await createUser(formData);
      const res = await fetch('/api/admin/users', { cache: 'no-store', credentials: 'include' });
      const data = await res.json();
      setUsers(data);
      setShowForm(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al crear usuario');
    }
  }

  async function handleUpdate(id: string, formData: FormData) {
    setError(null);
    try {
      await updateUser(id, formData);
      const res = await fetch('/api/admin/users', { cache: 'no-store', credentials: 'include' });
      const data = await res.json();
      setUsers(data);
      setEditingId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al actualizar');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este usuario?')) return;
    setError(null);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al eliminar');
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
      )}

      {/* Crear usuario */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Nuevo usuario
          </h3>
          <span className="text-gray-500">{showForm ? '−' : '+'}</span>
        </button>
        {showForm && (
          <div className="px-6 pb-6 border-t border-gray-100 pt-4">
            <form action={handleCreate} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="usuario@ejemplo.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña * (mín. 6 caracteres)
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select
                  name="role"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
                >
                  <option value="VIEWER">Viewer (solo lectura)</option>
                  <option value="ADMIN">Admin (gestión completa)</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-brand-red text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Crear usuario
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Lista de usuarios */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
              <tr>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4">Creado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) =>
                editingId === user.id ? (
                  <tr key={user.id} className="bg-amber-50/30">
                    <td className="px-6 py-4">
                      <input
                        form={`edit-user-${user.id}`}
                        type="text"
                        name="name"
                        defaultValue={user.name || ''}
                        placeholder="Nombre"
                        className="px-2 py-1.5 border border-gray-300 rounded text-sm w-40 focus:ring-2 focus:ring-brand-red"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        form={`edit-user-${user.id}`}
                        type="email"
                        name="email"
                        defaultValue={user.email}
                        required
                        className="px-2 py-1.5 border border-gray-300 rounded text-sm w-48 focus:ring-2 focus:ring-brand-red"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        form={`edit-user-${user.id}`}
                        name="role"
                        defaultValue={user.role}
                        className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-brand-red"
                      >
                        <option value="VIEWER">Viewer</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString('es-GT')}
                    </td>
                    <td className="px-6 py-4">
                      <form
                        id={`edit-user-${user.id}`}
                        action={(fd) => handleUpdate(user.id, fd)}
                        className="inline-flex gap-2"
                      >
                        <button
                          type="submit"
                          className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Guardar
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          Cancelar
                        </button>
                      </form>
                    </td>
                  </tr>
                ) : (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{user.name || '-'}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1">
                        {user.role === 'ADMIN' ? (
                          <Shield className="w-4 h-4 text-amber-500" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString('es-GT')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingId(user.id)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No hay usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
