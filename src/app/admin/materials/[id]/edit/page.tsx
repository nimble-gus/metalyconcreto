import { db } from '@/lib/db';
import MaterialForm from '@/components/admin/MaterialForm';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const material = await db.material.findUnique({
        where: { id: params.id },
    });

    if (!material) {
        notFound();
    }

    return (
        <main>
            <h1 className="mb-8 text-xl md:text-2xl font-bold">Editar Material</h1>
            <MaterialForm material={material} />
        </main>
    );
}
