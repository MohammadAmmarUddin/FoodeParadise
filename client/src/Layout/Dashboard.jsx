import {
  FaAd,
  FaCalendar,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensilSpoon,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const navLinkStyle = ({ isActive }) => ({
  backgroundColor: isActive ? "green" : "transparent",
  borderRadius: "4px",
});

const Dashboard = () => {
  const { user } = useAuth();
  const [cart] = useCart();
  const [isAdmin,isAdminLoading] = useAdmin();

    if(isAdminLoading)
    {
      return <span className="loading loading-spinner loading-lg"></span>
    }
  return (
    <div className="flex text-white ">
      <div className="w-64 min-h-screen  bg-orange-700 ">
        <div className="avatar mt-10">
          <div className="w-24 rounded-full mx-10">
            <img src={user?.photoURL} alt="Upload" />
          </div>
        </div>
        <h2 className="mx-8">{user?.displayName}</h2>
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink style={navLinkStyle} to={"/dashboard/adminHome"}>
                  <FaHome></FaHome>Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to={"/dashboard/addItems"}>
                  <FaUtensilSpoon></FaUtensilSpoon>Add Item
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to={"/dashboard/manageItems"}>
                  <FaList />
                  Manage Item
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to={"/dashboard/bookings"}>
                  <FaAd />
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to={"/dashboard/allUsers"}>
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink style={navLinkStyle} to={"/dashboard/userHome"}>
                  <FaHome></FaHome>User Home
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to={"/dashboard/paymentHistory"}>
                  {" "}
                  <FaCalendar></FaCalendar>Payment History
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to={"/dashboard/cart"}>
                  {" "}
                  <FaShoppingCart />
                  My Cart({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to={"/dashboard/userRating"}>
                  {" "}
                  <FaAd />
                  Add a Review
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to={"/dashboard/review"}>
                  {" "}
                  <FaList />
                  My Bookings
                </NavLink>
              </li>
            </>
          )}
          {/* shared  content */}
          <div className="divider divider-neutral"></div>
          <li>
            <NavLink style={navLinkStyle} to={"/"}>
              {" "}
              <FaHome></FaHome> Home
            </NavLink>
          </li>
          <li>
            <NavLink style={navLinkStyle} to={"/menu"}>
              {" "}
              <FaSearch />
              Menu
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="p-8 flex-1 text-black">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
