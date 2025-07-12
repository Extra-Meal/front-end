import { keepPreviousData } from "@tanstack/react-query";
import { ShieldUser, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { useGetDataWithParams } from "@/hooks/useApi";
import type { APISuccess } from "@/types/api.type";

type user = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  roles: [string];
  verified: boolean;
};

type Response = {
  users: Array<user>;
  pagination: {
    page: number;
    limit: number;
    totalUsers: number;
    totalPages: number;
  };
};

export default function UsersDashboard() {
  const { data, isLoading, isError, isPlaceholderData } = useGetDataWithParams<APISuccess<Response>>("/users");
  const totalPages = data?.data?.pagination.totalPages || 1;
  const [searchParams, setSearchParams] = useSearchParams();
  const intialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(intialPage);
  return (
    <>
      <div className="w-full">
        <div className="mb-5">
          <h1 className="text-foreground text-2xl font-bold">Users Dashboard</h1>
          <p className="text-foreground mt-2">28 users found</p>
        </div>
        <UsersTable users={data?.data?.users} />
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage((p) => p - 1);
              setSearchParams((prev) => {
                prev.set("page", (page - 1).toString());
                return prev;
              });
            }}
            className="bg-primary rounded px-3 py-1 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage((p) => p + 1);
              setSearchParams((prev) => {
                prev.set("page", (page + 1).toString());
                return prev;
              });
            }}
            className="bg-primary rounded px-3 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
function UsersTable({ users }: { users?: Array<user> }) {
  return (
    <div>
      <table className="min-w-full border-separate border-spacing-y-4 text-center text-[14px]">
        <thead className="text-sm uppercase">
          <tr>
            <th className="px-6 py-3 text-[11px] font-semibold">Id</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Name</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Email</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Role</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Verified</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Adminify</th>
            <th className="px-6 py-3 text-[11px] font-semibold">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users?.length ? (
            users.map((user) => <UserRow key={user.id} user={user} />)
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-3 text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function UserRow({ user }: { user: user }) {
  console.log("user", user);
  return (
    <tr className="hover:bg-primary group overflow-hidden rounded-2xl shadow-sm transition-all duration-200 hover:scale-102">
      <td className="rounded-l-2xl px-6 py-3">#{user.id}</td>
      <td className="flex items-center justify-center gap-2 px-6 py-3">
        <img src={user.avatar || "/src/assets/logo.png"} alt="User Avatar" className="h-6 w-6 rounded-full" />
        {user.name}
      </td>
      <td className="px-6 py-3">{user.email}</td>
      <td className="px-6 py-3">{user.roles[0]}</td>
      <td className="px-6 py-3">{user.verified ? "Yes" : "No"}</td>
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
