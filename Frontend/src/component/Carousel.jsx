import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router";

import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Carousel() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="flex justify-center mt-5">

      {loading ? (
        <div className="w-full max-w-3xl">
          <Skeleton height={250} />
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={false}
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
      )}

    </div>
  );
}