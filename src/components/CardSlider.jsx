import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "../stylings/CardSlider.css";
import productsData from "../data/productsData";
import { Link } from "react-router-dom";

const CardSlider = () => {

    const featuredProducts = productsData.filter(
        (item) => item.tag === "featured-product"
    );
    return (
        <div className="bg-dark slider-container">
            <p className="featured-products text-white">
                Featured Products
            </p>
            <Swiper
                modules={[Autoplay, FreeMode]}
                slidesPerView={4}
                spaceBetween={20}
                loop={true}
                speed={6000}

                freeMode={{
                    enabled: true,
                    momentum: false,
                }}

                autoplay={{
                    delay: 1,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                }}

                allowTouchMove={false}
                className="product-swiper"
            >

                {featuredProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="product-card text-white bg-dark">
                            <p className="title">{product.title}</p>
                            <Link to={`/product/${product.id}`}>
                                <img src={product.images[0]} alt={product.title} />
                            </Link>

                            <p className="price">
                                ₹{product.finalPrice}
                                <del> ₹{product.originalPrice}</del>
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CardSlider;
