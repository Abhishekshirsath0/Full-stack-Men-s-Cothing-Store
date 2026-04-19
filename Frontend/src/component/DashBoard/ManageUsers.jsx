import { useState, useEffect } from "react";
import {
  GetDataFromServer,
 DeleteUserFromSErver,
  UpdateUserRoleOnServer,
} from "../../Service.js";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await GetDataFromServer();
       
        // ✅ normalize backend field (Usertype → role)
        const updatedUsers = userData.map((user) => ({
          ...user,
          role: user.Usertype, // IMPORTANT FIX
          pendingRole: null,
        }));

        setUsers(updatedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ROLE CHANGE (LOCAL ONLY)
  const handleRoleChange = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId
          ? {
              ...user,
              pendingRole: newRole === user.role ? null : newRole,
            }
          : user
      )
    );
  };

  // APPLY ROLE TO SERVER
  const handleApply = async (userId) => {
    const user = users.find((u) => u._id === userId);

    if (!user?.pendingRole) return;

    try {
      const success = await UpdateUserRoleOnServer(
        userId,
        user.pendingRole // user.pendingRole is the new role we want to set
      );

      if (success) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId
              ? {
                  ...u,
                  role: user.pendingRole,
                  pendingRole: null,
                }
              : u
          )
        );
      } else {
        alert("Failed to update role on server");
      }
    } catch (error) {
      console.error("Role update error:", error);
      alert("Server error while updating role");
    }
  };

  // REMOVE USER
  const handleRemove = async (_id) => {
    try {
      const success = await DeleteUserFromSErver(_id);

      if (success) {
        setUsers((prev) => prev.filter((u) => u._id !== _id));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // INITIALS
  const getInitials = (user) =>
    `${user.Firstname?.[0] || ""}${user.Lastname?.[0] || ""}`.toUpperCase();

  // SORT ADMINS FIRST
  const sortedUsers = [...users].sort((a, b) => {
    if (a.role === "admin" && b.role !== "admin") return -1;
    if (a.role !== "admin" && b.role === "admin") return 1;
    return 0;
  });

  if (loading) {
    return <div className="text-center p-10">Loading users...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 mr-35">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Manage Users
      </h2>

      <div className="space-y-4">
        {sortedUsers.map((user) => {
          const displayRole = user.pendingRole || user.role;

          return (
            <div
              key={user._id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {getInitials(user)}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      {user.Firstname} {user.Lastname}
                    </p>

                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-700">
                      {user.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(user._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {[
                  { label: "Email", value: user.Email },
                  { label: "Phone", value: user.Phone },
                  { label: "Address", value: user.Address },
                  { label: "ID", value: user._id },
                ].map(({ label, value }) => (
                  <div key={`${user._id}-${label}`}>
                    <p className="text-xs text-gray-400 uppercase">
                      {label}
                    </p>
                    <p className="text-sm text-gray-800 break-all">
                      {value || "N/A"}
                    </p>
                  </div>
                ))}
              </div>

              {/* ROLE CHANGE */}
              <div className="border-t border-gray-100 pt-3 flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-sm text-gray-500">
                  Change Role:
                </span>

                <div className="flex gap-4">
                  {["user", "admin"].map((roleOption) => (
                    <label
                      key={`${user._id}-${roleOption}`}
                      className="flex items-center gap-1.5 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`role-${user._id}`}
                        checked={displayRole === roleOption}
                        onChange={() =>
                          handleRoleChange(user._id, roleOption)
                        }
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-sm">{roleOption}</span>
                    </label>
                  ))}
                </div>

                {user.pendingRole && (
                  <button
                    onClick={() => handleApply(user._id)}
                    className="sm:ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg"
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageUsers;