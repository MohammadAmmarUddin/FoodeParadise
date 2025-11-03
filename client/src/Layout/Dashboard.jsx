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

const Dashboard = () => {
  const { user } = useAuth();
  const [cart] = useCart();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-orange-600"></span>
      </div>
    );
  }

  const navLinkStyle = ({ isActive }) => ({
    background: isActive
      ? "linear-gradient(to right, #f97316, #fb923c)"
      : "transparent",
    borderRadius: "8px",
    color: "white",
    fontWeight: isActive ? "bold" : "normal",
    transition: "all 0.3s ease",
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-orange-50 to-orange-100">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-orange-700 to-orange-500 shadow-xl text-white flex flex-col">
        {/* Profile Section */}
        <div className="flex flex-col items-center mt-10 mb-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-white ring-offset-2 ring-offset-orange-500 shadow-lg">
              <img
                src={
                  user?.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="User"
              />
            </div>
          </div>
          <h2 className="mt-3 text-lg font-semibold">
            {user?.displayName || "Guest User"}
          </h2>
          <p className="text-xs text-orange-100">
            {isAdmin ? "Administrator" : "Customer"}
          </p>
        </div>

        <ul className="menu p-4 space-y-1 flex-1 text-sm font-medium">
          {isAdmin ? (
            <>
              <li>
                <NavLink style={navLinkStyle} to="/dashboard/adminHome">
                  <FaHome className="text-lg" /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to="/dashboard/addItems">
                  <FaUtensilSpoon className="text-lg" /> Add Item
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to="/dashboard/manageItems">
                  <FaList className="text-lg" /> Manage Items
                </NavLink>
              </li>

              <li>
                <NavLink style={navLinkStyle} to="/dashboard/allUsers">
                  <FaUsers className="text-lg" /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink style={navLinkStyle} to="/dashboard/userHome">
                  <FaHome className="text-lg" /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to="/dashboard/paymentHistory">
                  <FaCalendar className="text-lg" /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to="/dashboard/cart">
                  <FaShoppingCart className="text-lg" /> My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to="/dashboard/userRating">
                  <FaAd className="text-lg" /> Add a Review
                </NavLink>
              </li>
              {/* <li>
                <NavLink style={navLinkStyle} to="/dashboard/review">
                  <FaList className="text-lg" /> My Bookings
                </NavLink>
              </li> */}
            </>
          )}

          {/* shared links */}
          <div className="divider divider-neutral"></div>
          <li>
            <NavLink style={navLinkStyle} to="/">
              <FaHome className="text-lg" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink style={navLinkStyle} to="/menu">
              <FaSearch className="text-lg" /> Menu
            </NavLink>
          </li>
        </ul>

        <p className="text-center text-xs text-orange-100 mb-4 opacity-70">
          © {new Date().getFullYear()} Food Paradise
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 bg-white rounded-tl-3xl shadow-inner">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
