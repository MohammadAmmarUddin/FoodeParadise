import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "/images/logo/logo.png";
import notLogo from "/images/others/profile.png";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import Headroom from "react-headroom";

const navLinkStyle = (isDark) => ({
  // Pass isDark to dynamically change text color
  backgroundColor: "transparent",
  borderRadius: "6px",
  padding: "6px 10px",
  color: isDark ? "white" : "black",
  transition: "0.3s",
});

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const [scroll, setScroll] = useState(false);

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

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = (
    <>
      <li>
        <NavLink to="/" style={() => navLinkStyle(scroll)}>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" style={() => navLinkStyle(scroll)}>
          CONTACT
        </NavLink>
      </li>
      <li>
        <NavLink
          to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
          style={() => navLinkStyle(scroll)}
        >
          DASHBOARD
        </NavLink>
      </li>
      <li>
        <NavLink to="/menu" style={() => navLinkStyle(scroll)}>
          MENU
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/cart" style={() => navLinkStyle(scroll)}>
          <div className="relative flex items-center">
            <FaShoppingCart
              className={scroll ? "text-orange-400" : "text-black"}
            />
            <span className="badge badge-warning absolute -top-3 -right-3">
              {cart.length}
            </span>
          </div>
        </NavLink>
      </li>
      {user ? (
        <button
          onClick={handleLogOut}
          className={
            scroll
              ? "ml-3 text-white hover:text-orange-400 font-semibold"
              : "ml-3 text-black hover:text-orange-400 font-semibold"
          }
        >
          Logout
        </button>
      ) : (
        <li>
          <NavLink to="/login" style={() => navLinkStyle(scroll)}>
            LOGIN
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <>
      <Headroom className="z-[9999] fixed top-0 left-0 w-full h-16">
        <div
          className={`navbar h-full transition-all duration-300 ${
            scroll
              ? "bg-black/50 backdrop-blur-md shadow-md text-white"
              : "bg-transparent text-black shadow-none"
          }`}
        >
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${scroll ? "text-white" : "text-black"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-md rounded-box w-52"
                style={{
                  backgroundColor: scroll ? "rgba(0,0,0,0.9)" : "white",
                  color: scroll ? "white" : "black",
                }}
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
            <ul className="menu menu-horizontal font-semibold space-x-3">
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

      {/* Add bottom spacing to prevent banner/content touching navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default NavBar;
