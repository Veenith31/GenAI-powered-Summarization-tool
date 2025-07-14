import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Imports
import HomePage from './pages/HomePage';
import TextSummarizationPage from './pages/TextSummarization';
import PdfSummarizationPage from './pages/PdfSummarization';

import ImageSummarizationPage from './pages/ImageSummarization';
import AudioSummarizationPage from './pages/AudioSummarization';
import YoutubeSummarizationPage from './pages/YoutubeSummarization';



import PdfPage from './pages/PdfPage';
import YoutubePage from './pages/YoutubePage';



import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';        
import VerifyEmail from './pages/VerifyPage';
import ForgotPassword from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPasswordPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Summarization Pages */}
        <Route path="/text" element={<TextSummarizationPage />} />
        <Route path="/pdf" element={<PdfPage />} />
        <Route path="/image" element={<ImageSummarizationPage />} />
        <Route path="/audio" element={<AudioSummarizationPage />} />
        <Route path="/youtube" element={<YoutubePage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;




