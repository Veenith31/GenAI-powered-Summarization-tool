
import React from 'react';
import LayoutWithSidebar from '../components/LayoutWithSidebar';
import PdfSummarizationPage from './PdfSummarization';

const PdfPage = () => {
  return (
    <LayoutWithSidebar>
      <PdfSummarizationPage />
    </LayoutWithSidebar>
  );
};

export default PdfPage;
