/*import React from 'react';
import Sidebar from '../components/Sidebar';
import PdfSummarizationPage from './PdfSummarization';

const PdfPage = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <PdfSummarizationPage />
      </div>
    </div>
  );
};

export default PdfPage;
*/
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
