import React, { useState } from "react";
import ProductsData from "../data/ProductsData";
import { Link } from "react-router-dom";
import "../stylings/AllProducts.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlide";

const AllProducts = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [activeButtons, setActiveButtons] = useState({})
  const dispatch = useDispatch()



  // BRAND CHECKBOX
  const toggleBrand = (value) => {
    setBrands((prev) =>
      prev.includes(value)
        ? prev.filter((b) => b !== value)
        : [...prev, value]
    );
  };

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

  // CATEGORY CHECKBOX
  const toggleCategory = (value) => {
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  // CLEAR FILTERS
  const clearFilters = () => {
    setBrands([]);
    setCategories([]);
    setSortBy("");
    setMaxPrice(20000);
  };

  const isFilterActive =
    brands.length > 0 ||
    categories.length > 0 ||
    sortBy !== "" ||
    maxPrice !== 20000;


  // FILTER LOGIC
  let filteredData = [...ProductsData];

  if (brands.length > 0) {
    filteredData = filteredData.filter((p) =>
      brands.includes(p.brand)
    );
  }

  if (categories.length > 0) {
    filteredData = filteredData.filter((p) =>
      categories.includes(p.category)
    );
  }

  filteredData = filteredData.filter(
    (p) => p.finalPrice <= maxPrice
  );

  if (sortBy === "low") {
    filteredData.sort((a, b) => a.finalPrice - b.finalPrice);
  }

  if (sortBy === "high") {
    filteredData.sort((a, b) => b.finalPrice - a.finalPrice);
  }

  if (sortBy === "latest") {
    filteredData.sort((a, b) => b.id - a.id);
  }

  if (sortBy === "rating") {
    filteredData = filteredData.filter(
      (p) => p.rateCount === 5
    );
  }


  if (sortBy === "featured") {
    filteredData = filteredData.filter(
      (p) => p.tag === "featured-product"
    );
  }

  return (
    <div className="shop-wrapper">
      {/* SIDEBAR */}
      <aside className="sidebar">
        {isFilterActive && (
          <button className="clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        )}


        <h4 >Sort By</h4>
        <p onClick={() => setSortBy("latest")}>Latest</p>
        <p onClick={() => setSortBy("featured")}>Featured</p>
        <p onClick={() => setSortBy("rating")}>Top Rated</p>
        <p onClick={() => setSortBy("low")}>Price (Lowest First)</p>
        <p onClick={() => setSortBy("high")}>Price (Highest First)</p>


        <h4>Filter By</h4>

        <h5>Brands</h5>
        {["JBL", "boAt", "Sony"].map((b) => (
          <label key={b}>
            <input
              type="checkbox"
              checked={brands.includes(b)}
              onChange={() => toggleBrand(b)}
            />{" "}
            {b}
          </label>
        ))}

        <h5 className="border-bottom border-secondary pb-2 text-white fs-6">Category</h5>
        {["Headphones", "Earbuds", "Earphones", "Neckbands"].map(
          (c) => (
            <label key={c}>
              <input
                type="checkbox"
                checked={categories.includes(c)}
                onChange={() => toggleCategory(c)}
              />{" "}
              {c}
            </label>
          )
        )}
        <h5 className="border-bottom border-secondary pb-2 text-white fs-6">Price</h5>
        <span className="price-value">₹{maxPrice}</span>
        <input
          type="range"
          min="499"
          max="19990"
          step="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
          className="price-slider"
        />
      </aside>

      {/* PRODUCTS */}
      <div className="container">
        <div className="row g-4">
          {
            filteredData.map((data, i) => (
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

        </div>
      </div>
    </div>
  );
};

export default AllProducts;
