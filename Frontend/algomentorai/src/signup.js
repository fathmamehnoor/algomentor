// SignUpForm.js
import React, { useState } from 'react';
import './style.css'; // Keep your CSS
import axios from "axios";

const SignUpForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/signup/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });

      console.log("Registration successful:", response.data);
      // Optionally redirect to the login page or show a success message
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">AlgoMentorAI</div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Ex: abc123@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            placeholder="minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span className="toggle-password" onClick={toggleConfirmPasswordVisibility}>
            {confirmPasswordVisible ? '👁️' : '👁️'}
          </span>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
