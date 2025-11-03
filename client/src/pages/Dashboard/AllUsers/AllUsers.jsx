import { RiDeleteBin6Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Delete user
  const handleDelete = (user) => {
    Swal.fire({
      title: `Delete ${user.name}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#f87171",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then(() => {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `${user.name} has been removed.`,
            timer: 1200,
            showConfirmButton: false,
          });
        });
      }
    });
  };

  // Update role dynamically
  const handleRoleChange = (user, newRole) => {
    if (user.role === newRole) return; // No change

    axiosSecure
      .patch(`/users/role/${user._id}`, { role: newRole }) // <-- updated endpoint
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is now ${newRole}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update role",
        });
        console.error(err);
      });
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Total Users: {users.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 rounded-lg">
          <thead className="bg-green-100 text-green-800 font-semibold">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="bg-white hover:bg-green-50 transition-all"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-700">
                  {user.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>

                {/* Role dropdown */}
                <td className="px-4 py-3">
                  <select
                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-400"
                    value={user.role || "user"}
                    onChange={(e) => handleRoleChange(user, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* Delete button */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(user)}
                    className="p-2 rounded-md bg-red-100 hover:bg-red-200 transition"
                  >
                    <RiDeleteBin6Line className="text-red-600 text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
