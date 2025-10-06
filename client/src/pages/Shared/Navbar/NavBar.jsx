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
  backgroundColor: isActive ? "green" : "transparent",
  borderRadius: "4px",
});

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut().then(() => {
      Swal.fire("Logged Out User!");
    });
  };
  const navNavLinks = (
    <>
      <li>
        <NavLink to="/" style={navLinkStyle}>
          <a>HOME</a>
        </NavLink>{" "}
      </li>

      <li>
        <NavLink style={navLinkStyle} to={"/contact"}>
          <a>CONTACT US</a>
        </NavLink>{" "}
      </li>

      <li>
        <NavLink
          style={navLinkStyle}
          to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
        >
          <a>DASHBOARD</a>
        </NavLink>{" "}
      </li>
      <li>
        <NavLink style={navLinkStyle} to={"/menu"}>
          <a>OUR MENU</a>
        </NavLink>{" "}
      </li>
      {/* <li>
        <NavLink style={navLinkStyle} to={"/orders"}>
          <a>Orders</a>
        </NavLink>
      </li> */}
      <li>
        <NavLink style={navLinkStyle} to={"/dashboard/cart"}>
          <button className="">
            <FaShoppingCart className="text-orange-400 shadow shadow-4xl shadow-white    text-xl" />

            <div className="badge badge-warning">{cart.length}</div>
          </button>
        </NavLink>{" "}
      </li>
      {user ? (
        <>
          <span className="mt-2">{user?.displayName} </span>
          <NavLink className="m-2" onClick={handleLogOut}>
            LogOut
          </NavLink>
        </>
      ) : (
        <>
          <li>
            <NavLink className="m-2" to={"/login"}>
              <a>Login</a>
            </NavLink>{" "}
          </li>
        </>
      )}
    </>
  );
  return (
    <Headroom className="z-50 absolute w-full"> <div className="navbar bg-black bg-opacity-30 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-primary lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            className="menu menu-sm  text-black font-bold dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navNavLinks}
          </ul>
        </div>
        <img
          src={logo}
          className="w-20 rounded-full hidden lg:block mx-20 "
          alt=""
        />
      </div>
      <div className="navbar-center hidden  lg:flex">
        <ul className="menu menu-horizontal  text-white font-bold px-1">
          {navNavLinks}
        </ul>
      </div>
      <div className="avatar w-1/2">
        <div className="w-20 rounded-full ml-60">
          <Link to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}>
            {" "}
            {user ? (
              <img src={user?.photoURL} className="" alt="Upload" />
            ) : (
              <img src={notLogo} />
            )}
          </Link>
        </div>
      </div>
    </div></Headroom>
  );
};

export default NavBar;
