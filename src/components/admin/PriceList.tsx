'use client';

import Link from 'next/link';
import { Edit, Trash2, Plus } from 'lucide-react';
import { deletePriceEntry } from '@/lib/actions';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PriceEntry {
    id: string;
    price: number;
    provider: string | null;
    validFrom: Date;
    validTo: Date | null;
    createdAt: Date;
    material: {
        name: string;
        unit: string;
    };
}

export default function PriceList({ prices }: { prices: PriceEntry[] }) {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                    Registro de Precios
                </h3>
                <Link
                    href="/admin/prices/new"
                    className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Registrar Precio
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
                        <tr>
                            <th className="px-6 py-4">Material</th>
                            <th className="px-6 py-4">Proveedor</th>
                            <th className="px-6 py-4">Precio</th>
                            <th className="px-6 py-4">Válido Desde</th>
                            <th className="px-6 py-4">Válido Hasta</th>
                            <th className="px-6 py-4">Registrado</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {prices.map((entry) => {
                            const isActive = !entry.validTo || new Date(entry.validTo) > new Date();
                            return (
                                <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {entry.material.name}
                                        <span className="text-xs text-gray-500 ml-2">({entry.material.unit})</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {entry.provider || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-brand-red">
                                        Q{entry.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">
                                        {format(new Date(entry.validFrom), "d MMM yyyy", { locale: es })}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">
                                        {entry.validTo
                                            ? format(new Date(entry.validTo), "d MMM yyyy", { locale: es })
                                            : <span className="text-green-600 font-medium">Vigente</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-xs">
                                        {format(new Date(entry.createdAt), "d MMM yyyy", { locale: es })}
                                    </td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <Link
                                            href={`/admin/prices/${entry.id}/edit`}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <form action={deletePriceEntry.bind(null, entry.id)}>
                                            <button
                                                type="submit"
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                onClick={(e) => {
                                                    if (!confirm('¿Estás seguro de eliminar este registro de precio?')) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            );
                        })}
                        {prices.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                    No hay registros de precios.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
