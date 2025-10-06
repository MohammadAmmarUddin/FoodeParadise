// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import slide1 from "/images/home/slide1.jpg";
import slide2 from "/images/home/slide2.jpg";
import slide3 from "/images/home/Grill.jpg";
import slide4 from "/images/home/burger.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Category = () => {
  return (
    <section>
      <SectionTitle
        subHeading={"From 11.00am to 10.00pm"}
        heading={"Order Online"}
      ></SectionTitle>
      <Swiper
    
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-24"
      >
        <SwiperSlide >
          <img src={slide1} className="h-[400px] " alt="" />
          <h3 className="text-center absolute left-0  bottom-0 text-white bg-gray-500 p-3 rounded-md font-bold -mt-16 uppercase lg:text-lg">
            coffee
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} className="h-[400px] " alt="" />
          <h3 className="text-center absolute left-0 bottom-0 text-white bg-gray-500 p-3 rounded-md font-bold -mt-16 uppercase lg:text-lg">
            shawarma
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} className="h-[400px]" alt="" />
          <h3 className="text-center absolute left-0 bottom-0 text-white bg-gray-500 p-3 rounded-md font-bold -mt-16 uppercase lg:text-lg">
            Grill
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} className="h-[400px]" alt="" />
          <h3 className="text-center absolute left-0 bottom-0 text-white bg-gray-500 p-3 rounded-md font-bold -mt-16 uppercase lg:text-lg">
            Burger
          </h3>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;
