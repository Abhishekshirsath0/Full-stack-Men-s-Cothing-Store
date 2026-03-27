import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router";

export default function Carousel() {
  return (
    <div className="flex justify-center mt-5">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={false} // disable arrows
        autoplay={{ delay: 3000 }}
        loop
        className="w-full max-w-3xl rounded-lg overflow-hidden"
        style={{ height: "250px" }}
      >
        {[
          "/slide-1.jpg",
          "/slide-2.jpg",
          "/slide-3.jpg",
          "/slide-4.jpg",
          "/slide-5.jpg",
        ].map((ele, idx) => (
          <SwiperSlide key={idx} className="flex justify-center items-center">
            <Link to="#">
              <img
                src={ele}
                alt={`Slide ${idx}`}
                className="w-full h-full object-fillrounded-2xl"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}