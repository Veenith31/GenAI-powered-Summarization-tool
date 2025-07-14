import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

const handleVerify = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/user/verify', {
      email,
      code
    });

    setMessage(response.data);

    if (response.status === 200) {
      setTimeout(() => navigate('/login'), 2000); // Redirect only on success
    }
  } catch (err) {
    if (err.response && err.response.data) {
      setMessage(err.response.data); // Show exact error
    } else {
      setMessage('Verification failed');
    }
  }
};

  return (
    <div className="auth-container">
      <h2>Verify Your Email</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Enter OTP code"
        value={code}
        onChange={e => setCode(e.target.value)}
      /><br />
      <button onClick={handleVerify}>Verify</button>
      <p>{message}</p>
    </div>
  );
};

export default VerifyPage;
