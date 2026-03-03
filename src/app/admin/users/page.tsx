import { getUsers } from '@/lib/user-actions';
import UserList from '@/components/admin/UserList';

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Usuarios</h1>
        <p className="text-gray-600 mt-1">
          Gestiona los usuarios que pueden acceder al panel de administración.
        </p>
      </div>
      <UserList users={users} />
    </main>
  );
}
