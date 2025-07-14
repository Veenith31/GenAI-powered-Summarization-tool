import React from 'react';
import Sidebar from '../components/Sidebar';
import ImageSummarizationPage from './ImageSummarization';

const ImagePage = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <ImageSummarizationPage />
      </div>
    </div>
  );
};

export default ImagePage;
