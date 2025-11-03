import { Parallax } from "react-parallax";

const Cover = ({ img, title, desc }) => {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={img}
      bgImageAlt={title || "cover image"}
      strength={200} 
    >
      <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>

        {/* Content */}
        <div className="relative text-center px-4 sm:px-6 md:px-10 lg:px-20 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
            {title}
          </h1>
          {desc && (
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 drop-shadow-md">
              {desc}
            </p>
          )}
          <button
            className="
              bg-gradient-to-r from-yellow-400 to-yellow-500 
              hover:from-yellow-500 hover:to-yellow-600 
              text-black font-bold px-6 py-3 rounded-full 
              shadow-lg hover:shadow-xl transition-all duration-300
            "
          >
            View More
          </button>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
