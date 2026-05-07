import React, { useEffect, useState } from "react";
import {
  GetDataFromServer,
  UpdateUserRoleOnServer,
  DeleteUserFromServer,
} from "../../Service";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRoles, setSelectedRoles] = useState({});
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await GetDataFromServer();
      setUsers(data);
    } catch {
      setError("Failed to load users. Are you logged in as admin?");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (id, role) => {
    setSelectedRoles((prev) => ({ ...prev, [id]: role }));
  };

  const handleApply = async (id) => {
    const role = selectedRoles[id];
    if (!role) return;

    setUpdatingId(id);
    const res = await UpdateUserRoleOnServer(id, role);

    if (res) {
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, Usertype: role } : u))
      );
      // Clear the pending selection after successful update
      setSelectedRoles((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } else {
      setError("Failed to update role. Please try again.");
    }

    setUpdatingId(null);
  };

  // FIX: wired up delete with confirmation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setDeletingId(id);
    const success = await DeleteUserFromServer(id);

    if (success) {
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } else {
      setError("Failed to delete user. Please try again.");
    }

    setDeletingId(null);
  };

  const initials = (f, l) => (f?.[0] || "").toUpperCase() + (l?.[0] || "").toUpperCase();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading users…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">User Management</h1>

      {error && (
        <div className="mb-4 bg-red-100 text-red-600 p-3 rounded-lg shadow flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError("")} className="text-red-400 hover:text-red-600 text-lg font-bold">
            ×
          </button>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {users.map((user) => {
          const pendingRole = selectedRoles[user._id];
          const displayRole = pendingRole ?? user.Usertype;
          const changed = pendingRole && pendingRole !== user.Usertype;
          const isAdmin = user.Usertype === "admin";

          return (
            <div
              key={user._id}
              className={`relative overflow-hidden rounded-2xl shadow-lg p-6 border transition-all duration-300
                ${isAdmin ? "bg-sky-50 border-sky-200" : "bg-orange-50 border-orange-200"}`}
            >
              <div className="flex gap-5">
                {/* Avatar */}
                <div
                  className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-md
                    ${isAdmin ? "bg-sky-500" : "bg-orange-500"}`}
                >
                  {initials(user.Firstname, user.Lastname)}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  {/* Name + Role badge */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {user.Firstname} {user.Lastname}
                    </h2>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full
                        ${isAdmin ? "bg-sky-200 text-sky-700" : "bg-orange-200 text-orange-700"}`}
                    >
                      {user.Usertype.toUpperCase()}
                    </span>
                  </div>

                  {/* User data grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-bold text-gray-500">User ID</p>
                      <p className="text-gray-800 break-all">{user._id}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-500">Email</p>
                      <p className="text-gray-800">{user.Email}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-500">Phone</p>
                      <p className="text-gray-800">{user.Phone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="font-bold text-gray-500">Address</p>
                      <p className="text-gray-800">{user.Address}</p>
                    </div>
                  </div>

                  {/* Role selector + actions */}
                  <div className="flex items-center justify-between pt-4 border-t flex-wrap gap-3">
                    {/* Role radios */}
                    <div className="flex gap-6 text-sm">
                      {["user", "admin"].map((r) => (
                        <label key={r} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`role-${user._id}`}
                            checked={displayRole === r}
                            onChange={() => handleRoleSelect(user._id, r)}
                          />
                          <span
                            className={`font-semibold ${
                              r === "admin" ? "text-sky-600" : "text-orange-600"
                            }`}
                          >
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {/* Apply role button — only visible when role actually changed */}
                      {changed && (
                        <button
                          onClick={() => handleApply(user._id)}
                          disabled={updatingId === user._id}
                          className="px-5 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition"
                        >
                          {updatingId === user._id ? "Updating…" : "Apply"}
                        </button>
                      )}

                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(user._id)}
                        disabled={deletingId === user._id}
                        className="px-4 py-2 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600 disabled:opacity-50 transition"
                      >
                        {deletingId === user._id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && users.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default ManageUsers;