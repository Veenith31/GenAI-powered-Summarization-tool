import React from 'react';
import Sidebar from '../components/Sidebar';
import AudioSummarizationPage from './AudioSummarization';

const AudioPage = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <AudioSummarizationPage />
      </div>
    </div>
  );
};

export default AudioPage;
