// LoginPage.js
import React,{ useState } from 'react';
import './logins.css';
//import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import eye icons

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);  // State for toggling password visibility

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);  // Toggle the state
    };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">AlgoMentorAI</h1>
        <div className="tabs">
          <button className="tab-button active">LOGIN</button>
          <button className="tab-button">SIGN UP</button>
        </div>
        <form className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Ex: abc123@gmail.com" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input">
              {/* <input type="password" id="password" placeholder="Password" required />
              <button type="button" className="toggle-password">
              </button> */}
              {/* <input
                type={showPassword ? "text" : "password"}  // Switch between text and password types
                id="password"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              ></button> */}
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                required
              />
              {/* Eye icon for toggling visibility */}
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
          </div>
          <button type="submit" className="login-button">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
