'use client';

import { createMaterial, updateMaterial } from '@/lib/actions';

interface Material {
    id: string;
    name: string;
    unit: string;
    category: string | null;
    description: string | null;
}

export default function MaterialForm({ material }: { material?: Material }) {
    const isEditing = !!material;

    return (
        <form
            action={isEditing ? updateMaterial.bind(null, material.id) : createMaterial}
            className="space-y-6 max-w-2xl bg-white p-8 rounded-xl shadow-sm"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Material
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        defaultValue={material?.name}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                        placeholder="Ej. Cemento"
                    />
                </div>
                <div>
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                        Unidad de Medida
                    </label>
                    <input
                        type="text"
                        name="unit"
                        id="unit"
                        required
                        defaultValue={material?.unit}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                        placeholder="Ej. Saco, Quintal, Metro"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Categoría
                    </label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        defaultValue={material?.category || ''}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                        placeholder="Ej. Obra Gris"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                </label>
                <textarea
                    name="description"
                    id="description"
                    rows={3}
                    defaultValue={material?.description || ''}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                    placeholder="Detalles adicionales del material..."
                />
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <button
                    type="submit"
                    className="bg-brand-red text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md"
                >
                    {isEditing ? 'Actualizar Material' : 'Crear Material'}
                </button>
            </div>
        </form>
    );
}
