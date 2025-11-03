import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";

import img1 from "/images/home/01.png";
import img2 from "/images/home/02.png";
import img3 from "/images/home/03.png";

const slides = [
  {
    id: 1,
    image: img1,
    title: "Delicious Meals Await You",
    subtitle: "Taste the best dishes crafted with love.",
    button: "Order Now",
  },
  {
    id: 2,
    image: img2,
    title: "Fresh Ingredients Daily",
    subtitle: "From farm to your plate, always fresh!",
    button: "Order Now",
  },
  {
    id: 3,
    image: img3,
    title: "Fast & Secure Delivery",
    subtitle: "Get your favorite food delivered hot & fast.",
    button: "Order Now",
  },
];

const Banner = () => {
  return (
    <div className="w-full overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
        emulateTouch
        swipeable
        stopOnHover
        showArrows={false}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full h-[30vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]"
          >
            {/* Background image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Text & Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight"
              >
                {slide.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-xl"
              >
                {slide.subtitle}
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300"
                onClick={() => (window.location.href = "/menu")}
              >
                {slide.button}
              </motion.button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
