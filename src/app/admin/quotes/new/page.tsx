import { db } from '@/lib/db';
import QuoteForm from '@/components/admin/QuoteForm';

export default async function Page() {
    const materials = await db.material.findMany({
        where: { isActive: true },
        select: { id: true, name: true, unit: true },
    });

    return (
        <main>
            <h1 className="mb-8 text-xl md:text-2xl font-bold">Nueva Cotización</h1>
            <QuoteForm materials={materials} />
        </main>
    );
}
