import useCart from "../../../hooks/useCart";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const vatRate = totalPrice * 0.15;
  const grandTotal = totalPrice + vatRate;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "The item has been removed.",
              icon: "success",
              confirmButtonColor: "#22c55e",
            });
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl shadow-lg">
      {/* Header Summary */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-lg shadow mb-8 border border-gray-200">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">🛒 Your Cart</h2>
          <p className="text-gray-500">
            Manage your selected items before checkout
          </p>
        </div>

        <div className="flex flex-wrap gap-6 items-center text-gray-700">
          <p className="font-semibold text-lg">
            Items:{" "}
            <span className="text-green-600 font-bold">{cart.length}</span>
          </p>
          <p className="font-semibold text-lg">
            Subtotal:{" "}
            <span className="text-green-600 font-bold">
              ${totalPrice.toFixed(2)}
            </span>
          </p>
          <p className="font-semibold text-lg">
            VAT (15%):{" "}
            <span className="text-orange-500 font-bold">
              ${vatRate.toFixed(2)}
            </span>
          </p>
          <p className="font-semibold text-lg">
            Total:{" "}
            <span className="text-green-700 font-bold">
              ${grandTotal.toFixed(2)}
            </span>
          </p>
          <Link to="/dashboard/payment">
            <button className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-md">
              Proceed to Payment
            </button>
          </Link>
        </div>
      </div>

      {/* Cart Table */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 text-lg mb-4">
            Your cart is currently empty.
          </p>
          <Link
            to="/menu"
            className="btn bg-green-600 hover:bg-green-700 text-white"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="table w-full">
            {/* Head */}
            <thead className="bg-green-600 text-white uppercase text-sm">
              <tr>
                <th>#</th>
                <th className="text-center">Image</th>
                <th>Name</th>
                <th>Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {cart.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-green-50 transition-all duration-200"
                >
                  <td className="font-semibold text-gray-600">{index + 1}</td>

                  <td className="text-center">
                    <div className="flex justify-center">
                      <div className="avatar">
                        <div className="w-14 rounded-xl ring ring-green-300 ring-offset-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="font-medium text-gray-700">{item.name}</td>
                  <td className="font-semibold text-green-600">
                    ${item.price.toFixed(2)}
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-error bg-red-600 hover:bg-red-700 text-white"
                    >
                      <RiDeleteBin6Line className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
