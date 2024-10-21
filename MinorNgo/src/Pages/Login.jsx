import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log("Login result:", result.data); // Log the server response
        if (result.data.message === "Login successful") {
          document.cookie = `userId=${result.data.userId}; path=/;`;
          
          const userCategory = result.data.category;
          console.log("User category:", userCategory); // Log the user category
  
          // Check the category and navigate
          if (userCategory === "user") {
            console.log("Navigating to /dashboard for user");
            navigate('/dashboard');
          } else if (userCategory === "volunteer") {
            console.log("Navigating to /dashboard for volunteer");
            navigate('/dashboard');
          } else if (userCategory === "police") {
            console.log("Navigating to /dashboard for police");
            navigate('/Policedashboard');
          } else if (userCategory === "investigation") {
            console.log("Navigating to /dashboard for investigation");
            navigate('/dashboard');
          } else {
            console.log("Unknown category, cannot navigate");
          }
        } else {
          setError(result.data.message); // Set error message if login fails
        }
      })
      .catch(err => {
        setError('An error occurred during login');
        console.error(err);
      });
  };
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: '22rem', borderRadius: '15px' }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <p>Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
