import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/reset-password', {
        email,
        code,
        newPassword
      });
      setMessage(response.data);
    } catch (err) {
      setMessage('Password reset failed');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="OTP Code"
        value={code}
        onChange={e => setCode(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      /><br />
      <button onClick={handleReset}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPasswordPage;
