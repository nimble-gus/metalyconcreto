import { db } from '@/lib/db';
import PriceForm from '@/components/admin/PriceForm';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const priceEntry = await db.priceEntry.findUnique({
        where: { id: params.id },
    });

    if (!priceEntry) {
        notFound();
    }

    const materials = await db.material.findMany({
        where: { isActive: true },
        select: { id: true, name: true, unit: true },
        orderBy: { name: 'asc' },
    });

    return (
        <main>
            <h1 className="mb-8 text-xl md:text-2xl font-bold">Editar Precio</h1>
            <PriceForm materials={materials} priceEntry={priceEntry} />
        </main>
    );
}
