import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOTP = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/user/forgot-password?email=${email}`);
      setMessage(response.data);
    } catch (err) {
      setMessage('Failed to send OTP');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br />
      <button onClick={handleSendOTP}>Send OTP</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPasswordPage;
