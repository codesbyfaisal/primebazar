import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

function Hero() {
  return (
    <div className="hero w-full h-[50vh] md:h-[80vh] bg-white">
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full bg-transparent"
      >
        {/* Slide 1 */}
        <SwiperSlide className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10"></div>
          <img
            src={assets.hero_2_img}
            alt="Men's Shoes"
            className="w-full h-full object-cover transform transition-transform duration-1000 ease-out hover:scale-110"
          />
          <div className="absolute z-20 text-center text-white p-4">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-wide animate-slideInUp">
              Step Up Your Style
            </h2>
            <h1 className="text-4xl lg:text-5xl font-extrabold animate-fadeIn">
              Men's Shoes Collection
            </h1>
            <Link
              to="/products"
              className="mt-4 inline-block text-lg lg:text-xl bg-primary px-8 py-3 rounded-full hover:bg-secondary transition-transform duration-300 hover:scale-105 relative group"
            >
              <span className="relative z-10">Browse Collection</span>
              <span className="absolute inset-0 bg-white opacity-10 transition-all duration-500 ease-in-out group-hover:opacity-30 rounded-full"></span>
            </Link>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/40 z-10"></div>
          <img
            src={assets.hero_1_img}
            alt="Men's T-Shirts"
            className="w-full h-full object-cover transform transition-transform duration-1000 ease-out hover:scale-110"
          />
          <div className="absolute z-20 text-center text-white p-4">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-wide animate-slideInUp">
              Discover the Latest
            </h2>
            <h1 className="text-4xl lg:text-5xl font-extrabold animate-fadeIn">
              Men's T-Shirts
            </h1>
            <Link
              to="/products"
              className="mt-4 inline-block text-lg lg:text-xl bg-primary px-8 py-3 rounded-full hover:bg-secondary transition-transform duration-300 hover:scale-105 relative group"
            >
              <span className="relative z-10">Shop Now</span>
              <span className="absolute inset-0 bg-white opacity-10 transition-all duration-500 ease-in-out group-hover:opacity-30 rounded-full"></span>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Hero;
