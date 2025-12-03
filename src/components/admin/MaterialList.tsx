'use client';

import Link from 'next/link';
import { Edit, Trash2, Plus } from 'lucide-react';
import { deleteMaterial } from '@/lib/actions';

interface Material {
    id: string;
    name: string;
    unit: string;
    category: string | null;
    description: string | null;
}

export default function MaterialList({ materials }: { materials: Material[] }) {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                    Inventario de Materiales
                </h3>
                <Link
                    href="/admin/materials/new"
                    className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Nuevo Material
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
                        <tr>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Unidad</th>
                            <th className="px-6 py-4">Categoría</th>
                            <th className="px-6 py-4">Descripción</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {materials.map((material) => (
                            <tr key={material.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {material.name}
                                </td>
                                <td className="px-6 py-4 text-gray-600">{material.unit}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    {material.category || '-'}
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">
                                    {material.description || '-'}
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <Link
                                        href={`/admin/materials/${material.id}/edit`}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <form action={deleteMaterial.bind(null, material.id)}>
                                        <button
                                            type="submit"
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            onClick={(e) => {
                                                if (!confirm('¿Estás seguro de eliminar este material?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {materials.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No hay materiales registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
