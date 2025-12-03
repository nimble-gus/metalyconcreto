import { db } from '@/lib/db';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default async function PriceHistoryTable() {
    const prices = await db.priceEntry.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
            material: true,
        },
    });

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">
                    Historial Reciente de Precios
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
                        <tr>
                            <th className="px-6 py-4">Material</th>
                            <th className="px-6 py-4">Proveedor</th>
                            <th className="px-6 py-4">Precio</th>
                            <th className="px-6 py-4">Fecha</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {prices.map((entry) => (
                            <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {entry.material.name}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {entry.provider || 'N/A'}
                                </td>
                                <td className="px-6 py-4 font-semibold text-brand-red">
                                    Q{entry.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm">
                                    {format(entry.createdAt, "d 'de' MMMM, yyyy", { locale: es })}
                                </td>
                            </tr>
                        ))}
                        {prices.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No hay registros de precios recientes.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
