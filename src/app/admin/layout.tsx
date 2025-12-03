import { logout } from '@/lib/actions';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64 bg-gray-900 text-white p-4">
                <div className="flex h-full flex-col justify-between">
                    <div>
                        <h2 className="mb-6 text-2xl font-bold">Admin Panel</h2>
                        <nav>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/admin" className="block rounded p-2 hover:bg-gray-800">
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/quotes" className="block rounded p-2 hover:bg-gray-800">
                                        Cotizaciones
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/materials" className="block rounded p-2 hover:bg-gray-800">
                                        Materiales
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/prices" className="block rounded p-2 hover:bg-gray-800">
                                        Precios
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <form
                        action={async () => {
                            'use server';
                            await logout();
                        }}
                    >
                        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-800 p-3 text-sm font-medium hover:bg-gray-700 md:flex-none md:justify-start md:p-2 md:px-3">
                            <div className="hidden md:block">Sign Out</div>
                        </button>
                    </form>
                </div>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}
