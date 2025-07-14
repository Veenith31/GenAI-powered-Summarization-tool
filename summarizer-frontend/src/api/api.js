// src/api/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Update if your backend URL changes

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
