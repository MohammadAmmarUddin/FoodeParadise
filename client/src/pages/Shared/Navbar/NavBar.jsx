import { Link, NavLink } from "react-router-dom";
import logo from "/images/logo/logo.png";
import notLogo from "/images/others/profile.png";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import Headroom from "react-headroom";

const navLinkStyle = ({ isActive }) => ({
  backgroundColor: isActive ? "rgba(34,197,94,0.9)" : "transparent",
  borderRadius: "6px",
  padding: "6px 10px",
  color: "white",
  transition: "0.3s",
});

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut().then(() => {
      Swal.fire({
        icon: "success",
        title: "Logged Out Successfully!",
        showConfirmButton: false,
        timer: 1500,
        position: "center",
      });
    });
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" style={navLinkStyle}>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" style={navLinkStyle}>
          CONTACT
        </NavLink>
      </li>
      <li>
        <NavLink
          to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
          style={navLinkStyle}
        >
          DASHBOARD
        </NavLink>
      </li>
      <li>
        <NavLink to="/menu" style={navLinkStyle}>
          MENU
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/cart" style={navLinkStyle}>
          <div className="relative flex items-center">
            <FaShoppingCart className="text-orange-400 text-xl" />
            <span className="badge badge-warning absolute -top-3 -right-3">
              {cart.length}
            </span>
          </div>
        </NavLink>
      </li>
      {user ? (
        <button
          onClick={handleLogOut}
          className="ml-3 text-white hover:text-orange-400 font-semibold"
        >
          Logout
        </button>
      ) : (
        <li>
          <NavLink to="/login" style={navLinkStyle}>
            LOGIN
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <Headroom className="z-[9999] fixed top-0 left-0 w-full h-16">
      <div className="navbar bg-black/50 backdrop-blur-md text-white shadow-md h-full">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-black/90 text-white rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/">
            <img
              src={logo}
              className="w-16 rounded-full mx-4 hover:scale-105 transition-transform"
              alt="Logo"
            />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-white font-semibold space-x-3">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end pr-6">
          <Link to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}>
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-orange-400 ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL || notLogo} alt="User" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Headroom>
  );
};

export default NavBar;
