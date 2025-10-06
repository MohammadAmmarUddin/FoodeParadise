import { Helmet } from "react-helmet-async";
import Banner from "../Banner";
import Category from "../Category/Category,";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";
import ScrollToTop from "react-scroll-to-top";

const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title>foodparadise | HOME</title>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <Banner></Banner>
        <Category></Category>
        <PopularMenu></PopularMenu>

        <Featured></Featured>

        <Testimonials></Testimonials>
      </div>
      <ScrollToTop
        smooth
        className="bg-orange-500 rounded-full p-2 shadow-lg"
      />
    </div>
  );
};

export default Home;
