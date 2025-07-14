// src/pages/LoginPage.js
/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../utils/Auth.css';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('Logging in...');

    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const userId = await response.text();

      if (response.ok) {
        localStorage.setItem('userId', userId); // Save the email as userId
        setMsg('Login successful!');
        navigate('/'); // Redirect to HomePage
      } else {
        setMsg(userId);
      }
    } catch (error) {
      setMsg('Server error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p>{msg}</p>
      </form>
    </div>
  );
};

export default LoginPage;

*/
/*
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', {
        email,
        password
      });

      // ✅ Save email as userId
      localStorage.setItem('userId', response.data);
      navigate('/text');
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
*/
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', {
        email,
        password
      });

      // ✅ Save user email in localStorage
      localStorage.setItem('userId', response.data);

      // ✅ Redirect to /text page
      navigate('/text');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ margin: '10px', padding: '8px', width: '250px' }}
      /><br />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ margin: '10px', padding: '8px', width: '250px' }}
      /><br />
      <label>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        /> Show Password
      </label><br />
      <button onClick={handleLogin} style={{ margin: '10px', padding: '8px 16px' }}>
        Login
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
