import React, { useState } from "react";
import Signup from "./Signup";
import "../stylings/login.css";

function LoginPopUp({ onClose }) {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="login-overlay">
      <div className="form">
        <button className="close-btn" onClick={onClose}>✖</button>

        {!showSignup ? (
          <>
            <h3>Login</h3>

            <div>
              New to Tech-Shop ?
              <span
                className="account btn text-white"
                onClick={() => setShowSignup(true)}
              >
                {" "}Create an account
              </span>
            </div>

            <div className="inputs">
              <input type="email" placeholder="Email" /><br />
              <input type="password" placeholder="Password" /><br />
              <button>Login</button>
            </div>

            <div className="divider">
              <span>Login with</span>
            </div>

            <div className="social-link">
              <button className="Facebook">Facebook</button>
              <button className="Google">Google</button>
              <button className="Twitter">Twitter</button>
            </div>
          </>
        ) : (
          <>
            <Signup onLogin={() => setShowSignup(false)} />
            {showSignup && (
              <Signup
                onClose={() => setShowSignup(false)}
              />
            )}
          </>

        )}
      </div>
    </div>
  );
}

export default LoginPopUp;