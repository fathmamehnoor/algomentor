import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './logins.css';

const LoginPage = () => {
  const [email, setEmail] = useState(''); // Change to email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      }, {
        withCredentials: true, // Important for sending cookies with requests
      });
  
      if (response.status === 200) {
        // Successfully logged in, redirect
        navigate('/'); // Redirect to the chat window (ChatApp)
      } else {
        setError(response.data.error || 'Invalid login credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    }
  };
  

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label> {/* Change label to Email */}
          <input
            type="email"  // Change to type="email"
            value={email}  // Update state variable
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
