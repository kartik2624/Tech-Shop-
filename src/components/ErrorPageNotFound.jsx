import React from "react";
import { Link } from "react-router-dom";
import "../stylings/ErrorPageNotFound.css";

const ErrorPageNotFound = () => {
  return (
    <div className="error-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-title">Page Not Found</h2>
      <p className="error-text">
        Bhai galat jagah aa gaya 😅 <br />
        Ye page exist hi nahi karta.
      </p>

      <Link to="/" className="home-btn">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPageNotFound;
