import { ShieldUser, Trash2 } from "lucide-react";

export default function UsersDashboard() {
  return (
    <>
      <div className="w-full">
        <div className="mb-5">
          <h1 className="text-foreground text-2xl font-bold">Users Dashboard</h1>
          <p className="text-foreground mt-2">28 users found</p>
        </div>
        <UsersTable />
      </div>
    </>
  );
}
function UsersTable() {
  return (
    <div>
      <table className="min-w-full border-separate border-spacing-y-4 text-center text-[14px]">
        <thead className="text-sm uppercase">
          <tr>
            <th className="px-6 py-3 text-[11px] font-semibold">Id</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Name</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Email</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Date</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Role</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Verified</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Adminify</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Delete</th>
          </tr>
        </thead>
        <tbody>
          <UserRow />
        </tbody>
      </table>
    </div>
  );
}

function UserRow() {
  return (
    <tr className="hover:bg-primary group overflow-hidden rounded-2xl shadow-sm transition-all duration-200 hover:scale-102">
      <td className="rounded-l-2xl px-6 py-3">#id</td>
      <td className="flex items-center justify-center gap-2 px-6 py-3">
        <img src="/src/assets/2-Ph.png" alt="User Avatar" className="h-6 w-6 rounded-full" />
        John Doe
      </td>
      <td className="px-6 py-3">john@example.com</td>
      <td className="px-6 py-3">2025-07-12</td>
      <td className="px-6 py-3">User</td>
      <td className="px-6 py-3">Yes</td>
      <td className="px-6 py-3">
        <button className="cursor-pointer text-blue-500">
          <ShieldUser />
        </button>
      </td>
      <td className="rounded-r-2xl px-6 py-3">
        <button className="text-primary group-hover:text-background cursor-pointer transition-all">
          <Trash2 />
        </button>
      </td>
    </tr>
  );
}
