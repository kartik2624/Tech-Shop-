import React, { useState, useEffect } from "react";
import ProductsData from "../data/ProductsData";
import { Link } from "react-router-dom";
import "../stylings/navbar.css";
import { categoryMenu } from "../data/filterBarData";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlide";


const TopProducts = () => {
    const [userData, setUserData] = useState([]);
    const [category, setCategory] = useState("all")
    const [activeButtons, setActiveButtons] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(ProductsData);
    }, []);

    const filterData =
        category === "all"
            ? userData
            : userData.filter(
                (item) => item.category.toLowerCase() === category
            );

    const add = (data) => {
        dispatch(addToCart(data));

        setActiveButtons((prev) => ({
            ...prev,
            [data.id]: true
        }));

        setTimeout(() => {
            setActiveButtons((prev) => ({
                ...prev,
                [data.id]: false
            }));
        }, 2000);
    };



    return (
        <div className="bg-dark">
            <h3 className="text-white text-center m-0 p-4 fst-italic fw-bold">Top Products</h3>

            {/* Filter Buttons */}
            <div className="products-btns text-center mb-4 d-flex flex-wrap">

                {/* ALL button */}
                <button
                    onClick={() => setCategory("all")}
                    className={`btn btn-outline-danger text-white filter-btns ${category === "all" ? "active" : ""
                        }`}
                >
                    All
                </button>

                {/* Dynamic buttons */}
                {categoryMenu.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setCategory(item.label.toLowerCase())}
                        className={`btn btn-outline-danger text-white filter-btns ${category === item.label.toLowerCase() ? "active" : ""
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Products */}
            <div className="container">
                <div className="row g-4">
                    {
                        filterData.map((data, i) => (
                            <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
                                <div className="card h-100 bg-dark text-white border-white">
                                    <Link to={`/product/${data.id}`}>
                                        <img
                                            src={data.images[0]}
                                            className="card-img-top"
                                            alt={data.title}
                                        />
                                    </Link>
                                    <div className="card-body d-flex flex-column">
                                        <p className="m-0">
                                            <span style={{ color: "red" }}>
                                                {"★".repeat(data.rateCount)}
                                            </span></p>
                                        <h5 className="card-title">{data.title}</h5>
                                        <p className="card-text border-bottom pb-3">{data.info}</p>
                                        <p className="fw-bold text-center"> ₹{data.finalPrice} <del> ₹{data.originalPrice}</del></p>
                                        <button className={`btn mt-auto ${activeButtons[data.id] ? "btn-success" : "btn-danger"}`}
                                            onClick={() => add(data)}>
                                            {activeButtons[data.id] ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="card h-100 bg-dark text-white border-white d-flex justify-content-center align-items-center">
                            <Link to="/allproducts" className="browse-all">Browse All <br />Products
                                <FaArrowRightLong className="arrow" />
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopProducts;
