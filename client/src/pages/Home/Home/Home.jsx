import { Helmet } from "react-helmet-async";
import Banner from "../Banner";
import Category from "../Category/Category,";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      {/* ✅ Helmet for SEO & metadata */}
      <Helmet>
        <title>FoodParadise | Home</title>
        <meta
          name="description"
          content="Welcome to FoodParadise — explore our delicious menu, special offers, and customer favorites made fresh every day."
        />
        <meta
          name="keywords"
          content="food, restaurant, delivery, fast food, burgers, coffee, shawarma, grill"
        />
        <meta property="og:title" content="FoodParadise | Home" />
        <meta
          property="og:description"
          content="Taste the best dishes crafted with love at FoodParadise!"
        />
        <meta property="og:image" content="/images/logo/logo.png" />
        <link rel="icon" type="image/png" href="/images/logo/logo.png" />
      </Helmet>
      {/* Spacer to prevent Navbar overlap */}
      <div className="h-16" /> {/* Equal to Navbar height */}
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Banner />
        <Category />
        <PopularMenu />
        <Featured />
        <Testimonials />
      </div>
      {/* Scroll to Top Button */}
      <ScrollToTop
        smooth
        component={<FaArrowUp size={18} />}
        className="!flex !items-center !justify-center !bg-gradient-to-r !from-orange-500 !to-red-500 
             !rounded-full !shadow-lg !p-3 !text-white !transition-all !duration-300 
             hover:!from-orange-600 hover:!to-red-600 hover:!scale-110"
      />
    </div>
  );
};

export default Home;
