'use client';

import { useState } from 'react';
import { getBestPrice, createQuote } from '@/lib/actions';
import { Loader2, TrendingDown } from 'lucide-react';

interface Material {
    id: string;
    name: string;
    unit: string;
}

export default function QuoteForm({ materials }: { materials: Material[] }) {
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [unitPrice, setUnitPrice] = useState<number | ''>('');
    const [loadingPrice, setLoadingPrice] = useState(false);
    const [bestPriceFound, setBestPriceFound] = useState(false);

    const handleMaterialChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const materialId = e.target.value;
        setSelectedMaterial(materialId);
        setBestPriceFound(false);

        if (materialId) {
            setLoadingPrice(true);
            try {
                const best = await getBestPrice(materialId);
                if (best) {
                    setUnitPrice(best.price);
                    setBestPriceFound(true);
                } else {
                    setUnitPrice('');
                }
            } catch (error) {
                console.error('Failed to fetch best price', error);
            } finally {
                setLoadingPrice(false);
            }
        } else {
            setUnitPrice('');
        }
    };

    return (
        <form action={createQuote} className="space-y-6 max-w-2xl bg-white p-8 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Cliente
                    </label>
                    <input
                        type="text"
                        name="clientName"
                        id="clientName"
                        required
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                        placeholder="Ej. Constructora X"
                    />
                </div>
                <div>
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Proyecto
                    </label>
                    <input
                        type="text"
                        name="projectName"
                        id="projectName"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                        placeholder="Ej. Edificio Zona 10"
                    />
                </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Detalles del Material</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="materialId" className="block text-sm font-medium text-gray-700 mb-1">
                            Material
                        </label>
                        <select
                            name="materialId"
                            id="materialId"
                            required
                            value={selectedMaterial}
                            onChange={handleMaterialChange}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                        >
                            <option value="">Seleccionar Material</option>
                            {materials.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name} ({m.unit})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                            Cantidad
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            required
                            min="0.01"
                            step="0.01"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                            placeholder="0.00"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700 mb-1">
                            Precio Unitario (Q)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                name="unitPrice"
                                id="unitPrice"
                                required
                                min="0.01"
                                step="0.01"
                                value={unitPrice}
                                onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
                                className={`w-full rounded-lg shadow-sm focus:ring-brand-red ${bestPriceFound
                                        ? 'border-green-500 text-green-700 bg-green-50 focus:border-green-500'
                                        : 'border-gray-300 focus:border-brand-red'
                                    }`}
                                placeholder="0.00"
                            />
                            {loadingPrice && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                </div>
                            )}
                        </div>
                        {bestPriceFound && (
                            <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                                <TrendingDown className="w-3 h-3" />
                                ¡Mejor precio histórico aplicado automáticamente!
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <button
                    type="submit"
                    className="bg-brand-red text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md"
                >
                    Crear Cotización
                </button>
            </div>
        </form>
    );
}
