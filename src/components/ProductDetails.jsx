import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductsData from "../data/ProductsData";
import "../stylings/productDetail.css";
import { FaCheck } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlide";

import reviewsData from "../data/reviewsData";



const ProductDetails = () => {
  const { id } = useParams();


  const product = ProductsData.find(
    (item) => item.id === Number(id)
  );

  // filtering related products data
  const relatedProduct = ProductsData.filter(
    (item) => item.category === product.category && item.id !== product.id
  )

  const [activeButtons, setActiveButtons] = useState({})
  const dispatch = useDispatch()

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [ActiveButton, setActiveButton] = useState('Specification')

  useEffect(() => {
    if (product?.images?.length) {
      setMainImage(product.images[0])
    }
  }, [product])

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
    <div className="pd-page">
      <div className="pd-container">

        {/* LEFT SIDE */}
        <div className="pd-left">
          <div className="pd-thumbnails">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          <div className="pd-main-image">
            <img src={mainImage} alt="product" />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="pd-right">
          <h2>{product.title}</h2>
          <p className="pd-info">{product.info}</p>

          <div className="pd-rating text-danger border-bottom pb-4">
            <p className="m-0">
              <span style={{ color: "red" }}>
                {"★".repeat(product.rateCount)}
              </span></p> | <span className="text-secondory">({product.ratings} Ratings)</span>
          </div>

          <div className="price-cont1 pb-3 border-bottom">
            <div>
              <p className="pd-price mb-0">
                ₹{product.finalPrice}
                <span>₹{product.originalPrice}</span>
              </p>
              <p className="pd-save mb-0">
                You save: ₹{product.originalPrice - product.finalPrice} (
                {(((product.originalPrice - product.finalPrice) / product.originalPrice) * 100).toFixed(0)}%)
              </p>
              <p className="taxes">(Inclusive of all taxes)</p>

            </div>
            <div className="in-stock">
              <button className="btn btn-success "><FaCheck /> In Stock</button>
            </div>
          </div>
          {/* Offer container  */}
          <div className="mt-2 pb-3 border-bottom">
            <p>Offers and Discounts</p>
            <div className="d-flex justify-content-between g-2">
              <p className="p-2 border me-3 fs-6 text-secondary">No Cost EMI on Credit Card</p>

              <p className="p-2 border fs-6 text-secondary">Pay Later & Avail Cashback</p>
            </div>
          </div>
          <div className="text-center pt-3">
            <button className={`btn mt-auto text-center ${activeButtons[product.id] ? "btn-success" : "btn-danger"}`}
              onClick={() => add(product)}>
              {activeButtons[product.id] ? "Added" : "Add to Cart"}
            </button>
          </div>
        </div>

      </div>

      <div className="details-main pt-5">
        <div className="details-btns text-center d-flex flex-wrap justify-content-center mb-4">
          <button type="button" className={`btn btn-outline-danger me-3 mt-3 text-white ${ActiveButton === 'Specification' ? 'active' : ''}`} onClick={() => setActiveButton('Specification')}>Specification</button>
          <button type="button" className={`btn btn-outline-danger me-3 mt-3 text-white ${ActiveButton === 'Overview' ? 'active' : ''}`} onClick={() => setActiveButton('Overview')}>Overview</button>
          <button type="button" className={`btn btn-outline-danger me-3 mt-3 text-white ${ActiveButton === 'Reviews' ? 'active' : ''}`} onClick={() => setActiveButton('Reviews')}>Reviews</button>
        </div>
        {
          ActiveButton === "Specification" && (
            <div className="specications">
              <div className="property">
                <p>Brand</p>
                <p>Model</p>
                <p>Generic Name</p>
                <p>Headphone Type</p>
                <p>Connctivity</p>
                <p>Microphone</p>
              </div>
              <div className="value">
                <p>{product.brand}</p>
                <p>{product.title}</p>
                <p>{product.category}</p>
                <p>{product.type}</p>
                <p>{product.connectivity}</p>
                <p>Yes</p>
              </div>
            </div>
          )
        }
        {
          ActiveButton === 'Overview' && (
            <div className="overview">
              <p>The <span className="text-danger">{product.title}</span> Wireless Over-Ear Headphones provides with fabulous sound quality</p>
              <ul className="text-secondary">
                <li>Sound Tuned to Perfection</li>
                <li>Comfortable to Wear</li>
                <li>Long Hours Playback Time</li>
              </ul>
              <p className="text-secondary">
                Buy the <span className="text-white">{product.title} {product.connectivity} {product.type} {product.category}</span> which offers you with fabulous by providing you with awesome sound quality that you can never move on from. Enjoy perfect flexibility and mobility with amazing musical quality with these Headphones giving you a truly awesome audio experience. it blends with exceptional sound quality and a range of smart features for an unrilled listening experience.
              </p>
            </div>
          )
        }
        {
          ActiveButton === 'Reviews' && (
            <>
              {reviewsData.map((review) => (
                <div className="comments" key={review.id}>
                  <div className="comment-person">
                    <div className="person-photo">
                      <p><IoPersonCircleOutline className="person-icon" /></p>
                    </div>
                    <div className="person-name">
                      <p className="m-0">{review.name}</p>
                      <p className="m-0">
                        <span style={{ color: "red" }}>
                          {"★".repeat(review.rateCount)}
                        </span> | <span className="text-secondary">{review.date}</span></p>
                    </div>
                  </div>
                  <p className="m-0 text-secondary">{review.review}</p>
                </div>
              ))}
            </>
          )
        }
      </div>
      {/* Related products */}
      <div className="container">
        <p className="text-center fw-bold fs-4 mt-5 mb-5 fst-italic">Related Products</p>
        <div className="row g-4">
          {
            relatedProduct.map((data, i) => (

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
                      </span>
                    </p>
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

export default ProductDetails;

