import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const navigate = useNavigate();
  const { name, image, recipe, price,category, _id } = item;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const location = useLocation();
  const [,refetch]= useCart()

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
        // console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your cart is saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        // refetch the  cart updated the cart count
        refetch()
      });
    } else {
      Swal.fire({
        title: "You are not logged In",
        text: "Please Login to Add to Cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes,Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          // send the user to login page

          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt="Shoes" className="rounded-xl w-[200px] h-[200px]" />
      </figure>
      <p className="bg-slate-800 text-green-500 absolute right-0 mr-10 mt-12 p-2 rounded">
        {price}
      </p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button
            onClick={handleAddToCart}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
