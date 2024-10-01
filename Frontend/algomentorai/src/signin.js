import React, { useState } from 'react';
import './style.css'; // Move the CSS into this file

const SignUpForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="form-container">
      <div className="form-header">AlgoMentorAI</div>
      <form>
        <div className="input-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" placeholder="First Name" />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" placeholder="Last Name" />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Ex: abc123@gmail.com" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            placeholder="minimum 8 characters"
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            {passwordVisible ? '👁️' : '👁️'}
          </span>
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            id="confirmPassword"
            placeholder="Confirm Password"
          />
          <span className="toggle-password" onClick={toggleConfirmPasswordVisibility}>
            {confirmPasswordVisible ? '👁️' : '👁️'}
          </span>
        </div>
        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
