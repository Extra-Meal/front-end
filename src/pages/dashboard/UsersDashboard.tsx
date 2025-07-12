import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { ShieldUser, Trash2 } from "lucide-react";
import type { A } from "node_modules/react-router/dist/development/route-data-ByAYLHuM.d.mts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { useDeleteData, useGetDataWithParams, usePatchData } from "@/hooks/useApi";
import type { APISuccess } from "@/types/api.type";

type user = {
  _id: string;
  avatar: string;
  name: string;
  email: string;
  roles: Array<string>;
  isVerified: boolean;
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

  if (isLoading) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-muted-foreground text-sm">please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="mb-5">
          <h1 className="text-foreground text-2xl font-bold">Users Dashboard</h1>
          <p className="text-foreground mt-2">{data?.data?.users.length} users found</p>
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
    <div className="min-h-[69vh]">
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
            users.map((user) => <UserRow key={user._id} user={user} />)
          ) : (
            <tr>
              <td colSpan={7} className="text-primary px-6 py-3 text-sm">
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
  const queryClient = useQueryClient();
  const delUser = useDeleteData<APISuccess<{ message: string }>>("/users");
  const updateRole = usePatchData<{ roles: string[] }, APISuccess<{ message: string }>>(`/users/${user._id}/roles`);
  console.log("UserRow rendered for:", updateRole);

  return (
    <tr className="hover:bg-primary group overflow-hidden rounded-2xl shadow-sm transition-all duration-200 hover:scale-102">
      <td className="rounded-l-2xl px-6 py-3">#{user._id.split("").slice(-4).join("")}</td>
      <td className="flex items-center justify-center gap-2 px-6 py-3">
        <img src={user.avatar || "/src/assets/logo.png"} alt="User Avatar" className="h-6 w-6 rounded-full" />
        {user.name}
      </td>
      <td className="px-6 py-3">{user.email}</td>
      <td className="px-6 py-3">
        {user.roles.map((role) => {
          const roleStyle = role === "admin" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700";
          return (
            <span
              key={role}
              className={`mr-1 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${roleStyle}`}
            >
              {role}
            </span>
          );
        })}
      </td>

      <td className="px-6 py-3">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
            user.isVerified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {user.isVerified ? "Verified" : "Not Verified"}
        </span>
      </td>
      <td className="px-6 py-3">
        <button
          className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-blue-500 px-2.5 py-1 text-xs font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-500 hover:text-white"
          title="Make Admin"
          onClick={() => {
            updateRole.mutate(
              { roles: [...user.roles, "admin"] },
              {
                onSuccess: (data) => {
                  console.log("User role updated successfully:", data);
                  queryClient.invalidateQueries({ queryKey: ["/users"] });
                },
                onError: (error) => {
                  console.error("Error updating user role:", error);
                },
              }
            );
          }}
        >
          <ShieldUser className="h-4 w-4" />
          Adminify
        </button>
      </td>
      <td className="rounded-r-2xl px-6 py-3">
        <button
          onClick={() => {
            delUser.mutate(user._id, {
              onSuccess: (data) => {
                console.log("User deleted successfully:", data);
                queryClient.invalidateQueries({ queryKey: ["/users"] });
              },
              onError: (error) => {
                console.error("Error deleting user:", error);
              },
            });
          }}
          title="Delete User"
          className="text-primary group-hover:text-background cursor-pointer transition-all"
        >
          <Trash2 />
        </button>
      </td>
    </tr>
  );
}
