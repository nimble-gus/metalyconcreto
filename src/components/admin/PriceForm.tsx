'use client';

import { createPriceEntry, updatePriceEntry } from '@/lib/actions';

interface Material {
    id: string;
    name: string;
    unit: string;
}

interface PriceEntry {
    id: string;
    materialId: string;
    provider: string | null;
    price: number;
    validFrom: Date;
    validTo: Date | null;
}

interface PriceFormProps {
    materials: Material[];
    priceEntry?: PriceEntry;
}

export default function PriceForm({ materials, priceEntry }: PriceFormProps) {
    const isEditing = !!priceEntry;

    // Format dates for input fields
    const formatDateForInput = (date: Date | null) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    };

    return (
        <form
            action={isEditing ? updatePriceEntry.bind(null, priceEntry.id) : createPriceEntry}
            className="space-y-6 max-w-2xl bg-white p-8 rounded-xl shadow-sm"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="materialId" className="block text-sm font-medium text-gray-700 mb-1">
                        Material
                    </label>
                    <select
                        name="materialId"
                        id="materialId"
                        required
                        defaultValue={priceEntry?.materialId}
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
                    <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
                        Proveedor
                    </label>
                    <input
                        type="text"
                        name="provider"
                        id="provider"
                        defaultValue={priceEntry?.provider || ''}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                        placeholder="Ej. Distribuidora Central"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Precio (Q)
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        required
                        min="0.01"
                        step="0.01"
                        defaultValue={priceEntry?.price}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                        placeholder="0.00"
                    />
                </div>

                <div>
                    <label htmlFor="validFrom" className="block text-sm font-medium text-gray-700 mb-1">
                        Válido Desde
                    </label>
                    <input
                        type="date"
                        name="validFrom"
                        id="validFrom"
                        required
                        defaultValue={formatDateForInput(priceEntry?.validFrom || new Date())}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                    />
                </div>

                <div>
                    <label htmlFor="validTo" className="block text-sm font-medium text-gray-700 mb-1">
                        Válido Hasta
                        <span className="text-xs text-gray-500 ml-1">(Opcional)</span>
                    </label>
                    <input
                        type="date"
                        name="validTo"
                        id="validTo"
                        defaultValue={formatDateForInput(priceEntry?.validTo || null)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                    />
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                    <strong>Nota:</strong> Si no especificas una fecha de finalización, el precio se considerará vigente indefinidamente.
                </p>
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <button
                    type="submit"
                    className="bg-brand-red text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md"
                >
                    {isEditing ? 'Actualizar Precio' : 'Registrar Precio'}
                </button>
            </div>
        </form>
    );
}
