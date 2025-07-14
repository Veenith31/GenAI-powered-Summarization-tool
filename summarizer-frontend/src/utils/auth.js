// src/utils/auth.js

// Save user email as ID
export const saveUserId = (email) => {
  localStorage.setItem('userId', email);
};

// Get user ID (email)
export const getUserId = () => {
  return localStorage.getItem('userId');
};

// Remove user ID on logout
export const logoutUser = () => {
  localStorage.removeItem('userId');
};
