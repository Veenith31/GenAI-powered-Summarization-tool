
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import './PdfSummarizationPage.css';

const PdfSummarizationPage = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupHistory, setFollowupHistory] = useState([]);
  const [showFollowupBox, setShowFollowupBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
    }

    const loadHandler = (e) => {
      const { originalText, summaryText, keywords, relatedQueries, prompt } = e.detail;
      setSummary(summaryText);
      setKeywords(keywords || []);
      setRelatedQueries(relatedQueries || []);
      setPrompt(prompt || '');
      setFollowupHistory([]);
      setShowFollowupBox(true);
    };

    const resetHandler = () => {
      resetChat();
    };

    window.addEventListener('load-summary', loadHandler);
    window.addEventListener('new-chat', resetHandler);

    return () => {
      window.removeEventListener('load-summary', loadHandler);
      window.removeEventListener('new-chat', resetHandler);
    };
  }, [navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSummarize = async () => {
    const userId = localStorage.getItem('userId');
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { summary, keywords, relatedQueries, prompt } = response.data;
      setSummary(summary);
      setKeywords(keywords || []);
      setRelatedQueries(relatedQueries || []);
      setPrompt(prompt || '');
      setFollowupHistory([]);
      setShowFollowupBox(true);
    } catch (error) {
      setSummary('Error summarizing PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowup = async () => {
    const userId = localStorage.getItem('userId');
    if (!followup.trim()) return;

    try {
      const response = await axios.post('http://localhost:8080/api/followup', {
        userId,
        query: followup,
      });

      setFollowupHistory((prev) => [
        ...prev,
        { question: followup, answer: response.data.answer },
      ]);
      setFollowup('');
    } catch (error) {
      setFollowupHistory((prev) => [
        ...prev,
        { question: followup, answer: 'Error occurred' },
      ]);
    }
  };

  const resetChat = () => {
    setFile(null);
    setSummary('');
    setKeywords([]);
    setRelatedQueries([]);
    setPrompt('');
    setFollowup('');
    setFollowupHistory([]);
    setShowFollowupBox(false);
  };

  return (
    <div className="text-summarization-container">
      <div className="summarization-box">
        <div className="header-row">
          <h2 className="summarization-title">📄 PDF Summarization</h2>
          <button className="new-chat-button" onClick={resetChat}>
            🆕 New Chat
          </button>
        </div>

        <div className="upload-area">
  <input
    type="file"
    id="pdf-upload"
    accept="application/pdf"
    className="file-input"
    onChange={handleFileChange}
  />
  <label htmlFor="pdf-upload" className="upload-box">
    <div className="upload-icon">📄</div>
    <p className="upload-text">
      {file ? file.name : 'Click to choose a PDF file'}
    </p>
  </label>
</div>

        <div className="summarize-button-wrapper">
  <button 
    onClick={handleSummarize} 
    className="summarize-button"
    disabled={isLoading || !file}
  >
    {isLoading ? 'Summarizing...' : 'Summarize'}
  </button>
</div>


        {summary && (
          <div className="result-container">
            <div className="summary-section">
              <h3 className="section-title">Summary</h3>
              <div className="summary-content markdown-content">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            </div>

            <div className="keywords-section">
              <h3 className="section-title">Keywords</h3>
              <div className="keywords-content">
                {keywords.map((k, i) => (
                  <span key={i} className="keyword-tag">
                    {k}
                  </span>
                ))}
              </div>
            </div>

           <div className="queries-section">
  <h3 className="section-title">Related Queries</h3>
  <div className="queries-grid">
    {relatedQueries.map((q, i) => (
      <div key={i} className="query-card">
        <span className="query-number">Q{i + 1}.</span>
        <p className="query-text">{q}</p>
      </div>
    ))}
  </div>
</div>

            {prompt && (
              <div className="prompt-section">
                <h3 className="section-title">Prompt</h3>
                <p className="prompt-content">{prompt}</p>
              </div>
            )}

            {showFollowupBox && (
              <div className="followup-section">
                <h3 className="section-title">Ask a follow-up</h3>
                <div className="followup-input-container">
                  <input
                    value={followup}
                    onChange={(e) => setFollowup(e.target.value)}
                    placeholder="Ask something related..."
                    className="followup-input"
                    onKeyDown={(e) => e.key === 'Enter' && handleFollowup()}
                  />
                  <button onClick={handleFollowup} className="followup-button">
                    Ask
                  </button>
                </div>
                <div className="followup-history">
                  {followupHistory.map((item, i) => (
                    <div key={i} className="history-item">
                      <p>
                        <strong>You:</strong> {item.question}
                      </p>
                      <p>
                        <strong>AI:</strong> {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfSummarizationPage;
