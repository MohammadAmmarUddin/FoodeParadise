import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/Navbar/NavBar";
import Headroom from "react-headroom";

const Main = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("contact") ||
    location.pathname.includes("login") ||
    location.pathname.includes("dashboard") ||
    location.pathname.includes("signup");
  return (
    <div>
      {noHeaderFooter || <NavBar></NavBar>}
      <Outlet></Outlet>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
