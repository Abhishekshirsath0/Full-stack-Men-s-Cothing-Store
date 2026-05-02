import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// ✅ Image data
const CAROUSEL_IMAGES = [
  {
    id: 1,
    src: "/slide-1.jpg",
    alt: "New summer collection",
    link: "/collections/summer",
  },
  {
    id: 2,
    src: "/slide-2.jpg",
    alt: "Trending casual wear",
    link: "/collections/casual",
  },
  {
    id: 3,
    src: "/slide-3.jpg",
    alt: "Premium denim collection",
    link: "/collections/denim",
  },
  {
    id: 4,
    src: "/slide-4.jpg",
    alt: "Formal shirts on sale",
    link: "/collections/formal",
  },
  {
    id: 5,
    src: "/slide-5.jpg",
    alt: "Sleepwear collection",
    link: "/collections/sleepwear",
  },
];

export default function Carousel() {
  const [loading, setLoading] = useState(false); // ✅ FIXED: Start as false, no artificial delay

  // ✅ FIXED: Only show skeleton if images are genuinely loading
  useEffect(() => {
    // If you need to fetch carousel data from an API, do it here
    // For now, images are defined statically so no loading needed
    setLoading(false);
  }, []);

  return (
    <div className="flex justify-center mt-5">
      {loading ? (
        <div className="w-full max-w-3xl h-64 rounded-lg overflow-hidden">
          <Skeleton height={250} />
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop
          className="w-full max-w-3xl rounded-lg overflow-hidden"
          style={{ height: "250px" }}
          slidesPerView={1}
          spaceBetween={0}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          aria-label="Product carousel slideshow"
        >
          {CAROUSEL_IMAGES.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="flex justify-center items-center"
            >
              <Link to={slide.link} className="w-full h-full">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover rounded-2xl"
                  width={800}
                  height={250}
                  loading={
                    CAROUSEL_IMAGES[0].id === slide.id ? "eager" : "lazy"
                  }
                  decoding="async"
                  fetchPriority={
                    CAROUSEL_IMAGES[0].id === slide.id ? "high" : "low"
                  }
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

// Export images for use in other components if needed
export { CAROUSEL_IMAGES };
