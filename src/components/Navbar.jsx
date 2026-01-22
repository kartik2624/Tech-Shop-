import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { IoCartOutline, IoPersonOutline } from "react-icons/io5";
import '../stylings/navbar.css'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoginPopUp from './LoginPopUp';
import Signup from './Signup';
import ProductsData from '../data/ProductsData';

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const cart = useSelector(state => state.cart);
    const totalProduct = cart.length


    return (
        <div>
            <nav className="navbar navbar-expand-lg d-flex navbar-dark bg-dark fixed-top">
                <Link to="/" className='text-decoration-none navbar-brand ms-5 fw-bold fs-4 fst-italic'>
                    Tech-Shop
                </Link>

                <button
                    className="navbar-toggler text-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <form className="d-flex mx-auto">
                        {showSearch && (
                            <input
                                className="search-bar form-control bg-dark text-white"
                                type="search"
                                placeholder="Search product..."
                                value={searchTerm}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearchTerm(value);

                                    if (!value.trim()) {
                                        setFilteredProducts([]);
                                        return;
                                    }

                                    const filtered = ProductsData.filter((item) =>
                                        item.title.toLowerCase().includes(value.toLowerCase())
                                    );

                                    setFilteredProducts(filtered);
                                }}
                            />
                        )}
                        {searchTerm && (
                            <div className="search-results">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <Link
                                            key={product.id}
                                            to={`/product/${product.id}`}
                                            className="search-item"
                                            onClick={() => {
                                                setSearchTerm("");
                                                setShowSearch(false);
                                            }}
                                        >
                                            {product.title}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="no-result">No Product Found</p>
                                )}
                            </div>
                        )}
                    </form>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn text-white" title='Search' onClick={() => { setShowSearch(!showSearch) }}>
                                <IoMdSearch size={20} />
                            </button>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link text-white cart-icon" title="Cart">
                                <IoCartOutline size={22} />
                                <span className="cart-count">{totalProduct}</span>
                            </Link>
                        </li>
                        <li className="nav-item profile-dropdown me-5">
                            <a className="nav-link text-white" href="#">
                                <IoPersonOutline size={22} className='ms-2' />
                            </a>
                            <div className="profile-box">
                                <p className="hello-text">Hello!</p>
                                <p className="sub-text">Access account and manage orders</p>
                                <button
                                    className="login-btn text-black btn-secondary"
                                    onClick={() => setShowLogin(true)}
                                >
                                    Login / Signup
                                </button>
                                <hr />
                                <p className="footer-text btn text-white">Please Login</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            {showLogin && <LoginPopUp onClose={() => setShowLogin(false)} />}            
        </div>
    )
}

export default Navbar
