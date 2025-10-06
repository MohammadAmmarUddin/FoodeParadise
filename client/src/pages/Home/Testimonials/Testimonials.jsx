import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
// import required modules
import { Navigation } from "swiper/modules";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  // const { loading } = useAuth();

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");

      return res.data;
    },
    retry: (failure, error) => {
      if (error) {
        return false;
      }
      return true;
    },
    refetchInterval: 1000,
  });

  // useEffect(() => {
  //   fetch("https://foodparadise-server-payment-production.up.railway.app/reviews")
  //     .then((res) => res.json())
  //     .then((data) => setReviews(data));
  // }, []);

  return (
    <>
      <SectionTitle
        subHeading={"OUR CLIENTS REVIEW"}
        heading={"TESTIMONIALS"}
      ></SectionTitle>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="text-center m-24">
              <Rating
                style={{ maxWidth: 200 }}
                className="mx-auto m-4"
                value={review.rating}
                readOnly
              />
              <p>{review.details}</p>
              <h3 className="text-2xl text-orange-500">{review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Testimonials;
