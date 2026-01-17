import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { IoCartOutline, IoPersonOutline } from "react-icons/io5";
import '../stylings/navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg d-flex navbar-dark bg-dark fixed-top">
            <Link to="/" className='text-decoration-none navbar-brand ms-5'>
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
                            placeholder="Search"
                        />
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
                            <span className="cart-count">0</span>
                        </Link>
                    </li>

                    <li className="nav-item profile-dropdown me-5">
                        <a className="nav-link text-white" href="#">
                            <IoPersonOutline size={22} />
                        </a>

                        <div className="profile-box">
                            <p className="hello-text">Hello!</p>
                            <p className="sub-text">Access account and manage orders</p>

                            <button className="btn login-btn">
                                Login / Signup
                            </button>

                            <hr />

                            <p className="footer-text">Please Login</p>
                        </div>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default Navbar
