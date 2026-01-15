import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import productsData from "../data/productsData";
import "../stylings/ImageSlide.css";

import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = () => {

    // 🔥 only hero products
    const heroProducts = productsData.filter(
        (item) => item.tag === "hero-product"
    );

    return (
        <Swiper
            className="hero-swiper"
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
        >
            {heroProducts.map((product) => (
                <SwiperSlide key={product.id}>
                    <div
                        className="hero-slide"
                        style={{
                            backgroundImage: `url(${product.heroImage})`,
                            backgroundColor: "#212529",


            }}
          >
                    <div className="hero-overlay">
                        <p className="brand">{product.brand}</p>

                        <h3>
                            {product.tagline}
                        </h3>

                        <p className="price">
                            ₹{product.finalPrice} <del>₹{product.originalPrice}</del>
                        </p>

                        <button className="btn btn-danger">Shop Now</button>
                    </div>
                </div>
        </SwiperSlide>
    ))
}
    </Swiper >
  );
};

export default HeroSlider;
