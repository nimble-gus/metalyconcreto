import QuoteList from '@/components/admin/QuoteList';

export default function Page() {
    return (
        <main>
            <h1 className="mb-8 text-xl md:text-2xl font-bold">Gestión de Cotizaciones</h1>
            <QuoteList />
        </main>
    );
}
