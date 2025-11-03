import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const navigate = useNavigate();
  const { name, image, recipe, price, category, _id } = item;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    if (user && user.email) {
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        category,
        price,
      };
      axiosSecure.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added to Cart!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        refetch();
      });
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add items to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#16a34a",
        cancelButtonColor: "#f87171",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <figure className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute top-3 right-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold px-4 py-2 rounded-full shadow-lg">
          ${price.toFixed(2)}
        </span>
      </figure>
      <div className="p-6 flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">{recipe}</p>
        <button
          onClick={handleAddToCart}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
