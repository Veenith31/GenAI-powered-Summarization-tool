// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserId, logoutUser } from '../utils/auth';

const Navbar = () => {
  const userId = getUserId();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2>AI Summarizer</h2>
      <div style={styles.links}>
        {userId ?(
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/text">Text</Link>
            <Link to="/pdf">PDF</Link>
            <Link to="/image">Image</Link>
            <Link to="/youtube">YouTube</Link>
            <Link to="/audio">Audio</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) }
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#eee'
  },
  links: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  }
};

export default Navbar;
