import { db } from "@/lib/db";
import { Users, Package, FileText, TrendingUp } from "lucide-react";
import PriceChart from "@/components/admin/PriceChart";
import PriceHistoryTable from "@/components/admin/PriceHistoryTable";

export default async function Page() {
    const userCount = await db.user.count();
    const materialCount = await db.material.count();
    const quoteCount = await db.quote.count();
    const lastPrice = await db.priceEntry.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true }
    });

    // Fetch price history for chart (e.g., for "Acero")
    const priceHistory = await db.priceEntry.findMany({
        where: { material: { name: { contains: 'Acero' } } },
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true, price: true },
    });

    const chartData = priceHistory.map(entry => ({
        date: entry.createdAt.toLocaleDateString('es-GT'),
        price: entry.price
    }));

    const lastUpdateDate = lastPrice?.createdAt
        ? new Date(lastPrice.createdAt).toLocaleDateString('es-GT')
        : 'N/A';

    return (
        <main className="space-y-8">
            <div>
                <h1 className="mb-4 text-xl md:text-2xl font-bold">Dashboard</h1>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Users Card */}
                    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
                        <div className="flex p-4">
                            <Users className="h-5 w-5 text-gray-700" />
                            <h3 className="ml-2 text-sm font-medium">Total Usuarios</h3>
                        </div>
                        <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
                            {userCount}
                        </p>
                    </div>

                    {/* Materials Card */}
                    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
                        <div className="flex p-4">
                            <Package className="h-5 w-5 text-gray-700" />
                            <h3 className="ml-2 text-sm font-medium">Materiales</h3>
                        </div>
                        <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
                            {materialCount}
                        </p>
                    </div>

                    {/* Quotes Card */}
                    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
                        <div className="flex p-4">
                            <FileText className="h-5 w-5 text-gray-700" />
                            <h3 className="ml-2 text-sm font-medium">Cotizaciones</h3>
                        </div>
                        <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
                            {quoteCount}
                        </p>
                    </div>

                    {/* Price Update Card */}
                    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
                        <div className="flex p-4">
                            <TrendingUp className="h-5 w-5 text-gray-700" />
                            <h3 className="ml-2 text-sm font-medium">Última Act. Precios</h3>
                        </div>
                        <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-lg">
                            {lastUpdateDate}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <PriceChart data={chartData} materialName="Acero" />
                </div>
                <div>
                    {/* Placeholder for future widget or stats */}
                    <div className="bg-gradient-to-br from-brand-red to-red-700 rounded-xl p-6 text-white h-full flex flex-col justify-center items-center text-center shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Optimiza tus Costos</h3>
                        <p className="opacity-90">
                            Revisa la tendencia de precios antes de generar nuevas cotizaciones.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <PriceHistoryTable />
            </div>
        </main>
    );
}
