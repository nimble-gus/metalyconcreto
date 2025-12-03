import { db } from '@/lib/db';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { Plus, FileText } from 'lucide-react';

export default async function QuoteList() {
    const quotes = await db.quote.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20,
    });

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                    Cotizaciones Recientes
                </h3>
                <Link
                    href="/admin/quotes/new"
                    className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Nueva Cotización
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
                        <tr>
                            <th className="px-6 py-4"># Cotización</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Proyecto</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {quotes.map((quote) => (
                            <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    #{quote.quoteNumber}
                                </td>
                                <td className="px-6 py-4 text-gray-700">{quote.clientName}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    {quote.projectName || '-'}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${quote.status === 'APPROVED'
                                                ? 'bg-green-100 text-green-700'
                                                : quote.status === 'SENT'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {quote.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm">
                                    {format(quote.createdAt, "d 'de' MMM, yyyy", { locale: es })}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-gray-400 hover:text-brand-red transition-colors">
                                        <FileText className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {quotes.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    No hay cotizaciones registradas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
