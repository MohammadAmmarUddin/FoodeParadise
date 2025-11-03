import { FaEdit } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import useMenu from "../../../hooks/useMenu.jsx";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageItem = () => {
  const [menu, refetch, menuloading] = useMenu();
  const axiosSecure = useAxiosSecure();

  if (menuloading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-green-500 loading-lg"></span>
      </div>
    );
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#f87171",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Item removed successfully.",
              icon: "success",
              timer: 1200,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 rounded-xl shadow-md">
      <SectionTitle
        heading="Manage Items"
        subHeading="Update or remove menu items easily"
      />

      <div className="overflow-x-auto mt-6 border rounded-lg shadow-sm">
        <table className="table-auto w-full text-left">
          <thead className="bg-green-100 text-green-800 font-semibold">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Edit</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr
                key={item._id}
                className="bg-white hover:bg-green-50 transition-all"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="w-12 h-12 overflow-hidden rounded-md shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-700">
                  {item.name}
                </td>
                <td className="px-4 py-3 font-semibold text-green-600">
                  ${item.price}
                </td>
                <td className="px-4 py-3">
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button className="p-2 rounded-md bg-green-100 hover:bg-green-200 transition">
                      <FaEdit className="text-green-600" />
                    </button>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 rounded-md bg-red-100 hover:bg-red-200 transition"
                  >
                    <RiDeleteBin6Line className="text-red-600" />
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

export default ManageItem;
