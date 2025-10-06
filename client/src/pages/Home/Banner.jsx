import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import img1 from "../../../public/images/home/01.jpg";
import img2 from "../../../public/images/home/02.jpg";
import img3 from "../../../public/images/home/03.jpg";

const Banner = () => {
  return (
    <Carousel
      className="-z-50"
      autoPlay={{
        delay: 500,
        disableOnInteraction: false,
      }}
      infiniteLoop
      pagination={{
        clickable: true,
      }}
      navigation={true}
    >
      <div className="lg:h-[600px] ">
        <img src={img1} />
      </div>
      <div className="lg:h-[600px] ">
        <img src={img2} />
      </div>
      <div className="lg:h-[600px] ">
        <img src={img3} />
      </div>
    </Carousel>
  );
};

export default Banner;
