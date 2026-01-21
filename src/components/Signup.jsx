import React from "react";
import "../stylings/login.css";

const Signup = ({ onLogin, onClose }) => {
  return (
    <div className="login-overlay">
      <div className="form2">
        <button className="close-btn2" onClick={onClose}>✖</button>
        <h2>SignUp</h2>

        <div>
          Already have an account?
          <span className="account btn text-white" onClick={onLogin}> Login</span>
        </div>

        <div className="inputs">
          <input type="text" placeholder="Username" /><br />
          <input type="text" placeholder="Number" /><br />
          <input type="password" placeholder="Confirm Password" /><br />
          <button>Signup</button>
        </div>

        <div className="divider">
          <span>Login with</span>
        </div>

        <div className="social-link">
          <button className="Facebook">Facebook</button>
          <button className="Google">Google</button>
          <button className="Twitter">Twitter</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;