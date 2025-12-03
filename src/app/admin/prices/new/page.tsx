import { db } from '@/lib/db';
import PriceForm from '@/components/admin/PriceForm';

export default async function Page() {
    const materials = await db.material.findMany({
        where: { isActive: true },
        select: { id: true, name: true, unit: true },
        orderBy: { name: 'asc' },
    });

    return (
        <main>
            <h1 className="mb-8 text-xl md:text-2xl font-bold">Registrar Nuevo Precio</h1>
            <PriceForm materials={materials} />
        </main>
    );
}
