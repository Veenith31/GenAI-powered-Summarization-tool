import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ Needed for navigation
import '../utils/Auth.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg('Creating account...');

    try {
      const response = await fetch('http://localhost:8080/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.text();
      setMsg(result);

      if (response.ok) {
        // Redirect to OTP verification page with email
        navigate('/verify', { state: { email } });
      }
    } catch (error) {
      setMsg('Error signing up');
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
        <p>{msg}</p>
      </form>
    </div>
  );
};

export default SignupPage;
