import { Helmet } from "react-helmet-async";
import Category from "../Category/Category,";
import PopularMenu from "../PopularMenu/PopularMenu";
import Featured from "../Featured/Featured.jsx";
import Banner from "../Banner.jsx";
import Testimonials from "../Testimonials/Testimonials.jsx";
import ScrollToTop from "react-scroll-to-top";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>foodparadise | HOME</title>
      </Helmet>
      {/* Spacer to prevent Navbar overlap */}
      <div className="h-16" /> {/* Equal to Navbar height */}
      <div className="max-w-7xl mx-auto">
        <Banner />
        <Category />
        <PopularMenu />
        <Featured />
        <Testimonials />
      </div>
      <ScrollToTop
        smooth
        className="bg-orange-500 rounded-full p-2 shadow-lg"
      />
    </div>
  );
};

export default Home;
