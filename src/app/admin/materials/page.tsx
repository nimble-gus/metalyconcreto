import { db } from '@/lib/db';
import MaterialList from '@/components/admin/MaterialList';

export default async function Page() {
    const materials = await db.material.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <main>
            <h1 className="mb-8 text-xl md:text-2xl font-bold">Gestión de Materiales</h1>
            <MaterialList materials={materials} />
        </main>
    );
}
