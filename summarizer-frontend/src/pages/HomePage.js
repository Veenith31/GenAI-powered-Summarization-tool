import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to AI-Powered Summarizer</h1>

      {userId ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '30px' }}>
            <button onClick={() => navigate('/text')} className="blue-button">Text Summarization</button>
            <button onClick={() => navigate('/pdf')} className="blue-button">PDF Summarization</button>
            <button onClick={() => navigate('/image')} className="blue-button">Image Summarization</button>
            <button onClick={() => navigate('/youtube')} className="blue-button">YouTube Summarization</button>
            <button onClick={() => navigate('/audio')} className="blue-button">Audio Summarization</button>
          </div>

          <button onClick={handleLogout} className="red-button" style={{ marginTop: '30px' }}>Logout</button>
        </>
      ) : (
        <>
          <p style={{ marginTop: '30px' }}>Please login or signup to use the features.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button onClick={() => navigate('/login')} className="blue-button">Login</button>
            <button onClick={() => navigate('/signup')} className="blue-button">Signup</button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
