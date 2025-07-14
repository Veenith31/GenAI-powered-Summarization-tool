/*import React from 'react';
import Sidebar from '../components/Sidebar';
import YoutubeSummarizationPage from './YoutubeSummarization';

const YoutubePage = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <YoutubeSummarizationPage />
      </div>
    </div>
  );
};

export default YoutubePage;
*/
import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import LayoutWithSidebar from '../components/LayoutWithSidebar';
import './TextPage.css'; // Reuse the styling

const YoutubePage = () => {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupHistory, setFollowupHistory] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetChat = () => {
    setUrl('');
    setSummary('');
    setKeywords([]);
    setRelatedQueries([]);
    setPrompt('');
    setFollowup('');
    setFollowupHistory([]);
    setError('');
  };

  const handleYoutubeSummarize = async () => {
    const userId = localStorage.getItem("userId");
    if (!url.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/youtube/summarize', null, {
        params: { userId, url }
      });

      const { summary, keywords, relatedQueries, prompt } = response.data;
      setSummary(summary);
      setKeywords(keywords || []);
      setRelatedQueries(relatedQueries || []);
      setPrompt(prompt || '');
      setFollowupHistory([]);
    } catch (err) {
      console.error(err);
      setError('YouTube summarization failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowup = async () => {
    const userId = localStorage.getItem("userId");
    if (!followup.trim()) return;

    try {
      const response = await axios.post('http://localhost:8080/api/followup', {
        userId,
        query: followup
      });

      setFollowupHistory(prev => [
        ...prev,
        { question: followup, answer: response.data.answer }
      ]);
      setFollowup('');
    } catch (error) {
      setFollowupHistory(prev => [
        ...prev,
        { question: followup, answer: 'Error with follow-up' }
      ]);
    }
  };

  return (
    <LayoutWithSidebar>
      <div className="text-summarization-container">
        <div className="summarization-box">
          <div className="header-row">
            <h2 className="summarization-title">🎥 YouTube Summarization</h2>
            <button className="new-chat-button" onClick={resetChat}>
              🆕 New Chat
            </button>
          </div>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube URL"
            className="text-input"
            disabled={isLoading}
          />

          <button
            onClick={handleYoutubeSummarize}
            className="summarize-button"
            disabled={isLoading || !url.trim()}
          >
            {isLoading ? 'Summarizing...' : 'Summarize'}
          </button>

          {error && (
            <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
          )}

          {summary && (
            <div className="result-container">
              <div className="summary-section">
                <h3 className="section-title">Summary</h3>
                <div className="summary-content">
                  <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
              </div>

              <div className="keywords-section">
                <h3 className="section-title">Keywords</h3>
                <div className="keywords-content">
                  {keywords.map((k, i) => (
                    <span key={i} className="keyword-tag">{k}</span>
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
                      <p><strong>You:</strong> {item.question}</p>
                      <p><strong>AI:</strong> {item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutWithSidebar>
  );
};

export default YoutubePage;
