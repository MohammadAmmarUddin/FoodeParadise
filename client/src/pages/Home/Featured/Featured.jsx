import featuredImg from "/images/home/featuredImg.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const Featured = () => {
  return (
    <div
      className="
        bg-[url('/images/home/featuredBg.jpg')] 
        bg-cover bg-center bg-fixed
        py-16
      "
    >
      <Helmet>
        <title>FoodParadise | Featured</title>
      </Helmet>

      {/* Section Title */}
      <SectionTitle heading="Featured Item" subHeading="CHECK IT OUT" />

      {/* Content */}
      <div
        className="
          flex flex-col md:flex-row items-center justify-center
          gap-10 px-6 sm:px-12 md:px-20 lg:px-36 mt-10
          text-black
        "
      >
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={featuredImg}
            alt="Featured Item"
            className="
              w-72 sm:w-96 md:w-[400px] 
              rounded-lg shadow-lg 
              hover:scale-105 transition-transform duration-300
            "
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
          <p className="text-gray-600 mb-2">Jan 20, 2024</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Best Food This Date
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            doloremque necessitatibus sed ratione corporis sunt adipisci
            mollitia quisquam et!
          </p>
          <button
            className="
              px-6 py-3 rounded-full bg-yellow-500 hover:bg-yellow-600
              text-black font-semibold shadow-md hover:shadow-lg 
              transition-all duration-300
            "
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
