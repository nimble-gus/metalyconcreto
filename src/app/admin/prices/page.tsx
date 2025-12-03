import { db } from '@/lib/db';
import PriceList from '@/components/admin/PriceList';

export default async function Page() {
    const prices = await db.priceEntry.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            material: {
                select: {
                    name: true,
                    unit: true,
                },
            },
        },
    });

    return (
        <main>
            <h1 className="mb-8 text-xl md:text-2xl font-bold">Gestión de Precios</h1>
            <PriceList prices={prices} />
        </main>
    );
}
