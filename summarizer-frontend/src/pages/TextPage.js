/*
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TextSummarizationPage from './TextSummarization';

const TextPage = () => {
  const [selectedSummary, setSelectedSummary] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Left Sidebar *///}
     /* <Sidebar mode="text" onSelect={setSelectedSummary} />

      {/* Right Chat Interface *///}
    /*  <div className="flex-1 overflow-y-auto">
        <TextSummarizationPage selectedSummary={selectedSummary} />
      </div>
    </div>
  );
};

export default TextPage;
*/
/*import React, { useState } from 'react';
import axios from 'axios';

const TextPage = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupHistory, setFollowupHistory] = useState([]);
  const [showFollowupBox, setShowFollowupBox] = useState(false);

  const handleSummarize = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post('http://localhost:8080/api/summarize', {
        userId,
        text
      });
      const { summary, keywords, relatedQueries, prompt } = response.data;
      setSummary(summary);
      setKeywords(keywords || []);
      setRelatedQueries(relatedQueries || []);
      setPrompt(prompt || '');
      setShowFollowupBox(true);
      setFollowupHistory([]);
    } catch (error) {
      setSummary('Error summarizing text');
    }
  };

  const handleFollowup = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post('http://localhost:8080/api/followup', {
        userId,
        query: followup
      });
      const answer = response.data.answer || 'No response received';
      setFollowupHistory(prev => [...prev, { question: followup, answer }]);
      setFollowup('');
    } catch {
      setFollowupHistory(prev => [...prev, { question: followup, answer: 'Error in follow-up' }]);
    }
  };

  return (
    <div>
      <h2>Text Summarization</h2>
      <textarea rows={6} cols={60} value={text} onChange={e => setText(e.target.value)} placeholder="Enter your text" />
      <br />
      <button onClick={handleSummarize}>Summarize</button>

      {summary && <><h3>Summary:</h3><p>{summary}</p></>}
      {keywords.length > 0 && <><h4>Keywords:</h4><ul>{keywords.map((k, i) => <li key={i}>{k}</li>)}</ul></>}
      {relatedQueries.length > 0 && <><h4>Related Queries:</h4><ul>{relatedQueries.map((q, i) => <li key={i}>{q}</li>)}</ul></>}
      {prompt && <><h4>Prompt:</h4><p>{prompt}</p></>}

      {showFollowupBox && (
        <>
          <h4>Ask a follow-up</h4>
          <input value={followup} onChange={e => setFollowup(e.target.value)} placeholder="Ask something related" />
          <button onClick={handleFollowup}>Ask</button>
          {followupHistory.length > 0 && (
            <div>
              <h4>Follow-up Q&A:</h4>
              {followupHistory.map((item, idx) => (
                <div key={idx}>
                  <p><strong>You:</strong> {item.question}</p>
                  <p><strong>AI:</strong> {item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TextPage;

*/

/*import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const TextPage = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupHistory, setFollowupHistory] = useState([]);
  const [showFollowupBox, setShowFollowupBox] = useState(false);

  const handleSummarize = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post('http://localhost:8080/api/summarize', {
        userId,
        text,
        mode: "text"  // Include this if your backend uses mode field
      });
      const { summary, keywords, relatedQueries, prompt } = response.data;
      setSummary(summary);
      setKeywords(keywords || []);
      setRelatedQueries(relatedQueries || []);
      setPrompt(prompt || '');
      setShowFollowupBox(true);
      setFollowupHistory([]);
    } catch (error) {
      setSummary('Error summarizing text');
    }
  };

  const handleFollowup = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post('http://localhost:8080/api/followup', {
        userId,
        query: followup
      });
      const answer = response.data.answer || 'No response received';
      setFollowupHistory(prev => [...prev, { question: followup, answer }]);
      setFollowup('');
    } catch {
      setFollowupHistory(prev => [...prev, { question: followup, answer: 'Error in follow-up' }]);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Text Summarization</h2>
      <textarea
        rows={6}
        cols={60}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter your text"
      />
      <br />
      <button onClick={handleSummarize} style={{ marginTop: '10px' }}>Summarize</button>

      {summary && (
        <>
          <h3>Summary:</h3>
          <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '6px' }}>
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </>
      )}

      {keywords.length > 0 && (
        <>
          <h4>Keywords:</h4>
          <ul>{keywords.map((k, i) => <li key={i}>{k}</li>)}</ul>
        </>
      )}

      {relatedQueries.length > 0 && (
        <>
          <h4>Related Queries:</h4>
          <ul>{relatedQueries.map((q, i) => <li key={i}>{q}</li>)}</ul>
        </>
      )}

      {prompt && (
        <>
          <h4>Prompt:</h4>
          <p>{prompt}</p>
        </>
      )}

      {showFollowupBox && (
        <>
          <h4>Ask a follow-up</h4>
          <input
            value={followup}
            onChange={e => setFollowup(e.target.value)}
            placeholder="Ask something related"
            style={{ width: '60%' }}
          />
          <button onClick={handleFollowup}>Ask</button>
          {followupHistory.length > 0 && (
            <div>
              <h4>Follow-up Q&A:</h4>
              {followupHistory.map((item, idx) => (
                <div key={idx}>
                  <p><strong>You:</strong> {item.question}</p>
                  <p><strong>AI:</strong> {item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TextPage;
*/
/*
import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './TextPage.css';

const TextPage = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupHistory, setFollowupHistory] = useState([]);
  const [showFollowupBox, setShowFollowupBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    const userId = localStorage.getItem("userId");
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/summarize', {
        userId,
        text,
        mode: "text"
      });
      const { summary, keywords, relatedQueries, prompt } = response.data;
      setSummary(summary);
      setKeywords(keywords || []);
      setRelatedQueries(relatedQueries || []);
      setPrompt(prompt || '');
      setShowFollowupBox(true);
      setFollowupHistory([]);
    } catch (error) {
      setSummary('Error summarizing text');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowup = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post('http://localhost:8080/api/followup', {
        userId,
        query: followup
      });
      const answer = response.data.answer || 'No response received';
      setFollowupHistory(prev => [...prev, { question: followup, answer }]);
      setFollowup('');
    } catch {
      setFollowupHistory(prev => [...prev, { question: followup, answer: 'Error in follow-up' }]);
    }
  };

  return (
    <div className="text-summarization-container">
      <div className="summarization-box">
        <h2 className="summarization-title">Text Summarization</h2>
        
        <div className="input-container">
          <textarea
            rows={8}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="text-input"
          />
          
          <button 
            onClick={handleSummarize} 
            className="summarize-button"
            disabled={isLoading}
          >
            {isLoading ? 'Summarizing...' : 'Summarize'}
          </button>
        </div>

        {summary && (
          <div className="result-container">
            <div className="summary-section">
              <h3 className="section-title">Summary</h3>
              <div className="summary-content">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            </div>

            {keywords.length > 0 && (
              <div className="keywords-section">
                <h3 className="section-title">Keywords</h3>
                <div className="keywords-content">
                  {keywords.map((k, i) => (
                    <span key={i} className="keyword-tag">{k}</span>
                  ))}
                </div>
              </div>
            )}

            {relatedQueries.length > 0 && (
              <div className="queries-section">
                <h3 className="section-title">Related Queries</h3>
                <ul className="queries-list">
                  {relatedQueries.map((q, i) => (
                    <li key={i} className="query-item">{q}</li>
                  ))}
                </ul>
              </div>
            )}

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
                    onChange={e => setFollowup(e.target.value)}
                    placeholder="Ask something related..."
                    className="followup-input"
                  />
                  <button 
                    onClick={handleFollowup} 
                    className="followup-button"
                  >
                    Ask
                  </button>
                </div>
                
                {followupHistory.length > 0 && (
                  <div className="followup-history">
                    <h4 className="history-title">Follow-up Q&A</h4>
                    {followupHistory.map((item, idx) => (
                      <div key={idx} className="history-item">
                        <p className="user-question"><strong>You:</strong> {item.question}</p>
                        <p className="ai-answer"><strong>AI:</strong> {item.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextPage;
*/
/*
import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './TextPage.css';

const TextPage = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupHistory, setFollowupHistory] = useState([]);
  const [showFollowupBox, setShowFollowupBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User not authenticated");
      return;
    }
    if (!text.trim()) {
      setSummary("Please enter some text to summarize");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/summarize', {
        userId,
        text,
        mode: "text"
      });

      const { summary, keywords, relatedQueries, prompt } = response.data;
      setSummary(summary);
      setKeywords(keywords || []);
      setRelatedQueries(relatedQueries || []);
      setPrompt(prompt || '');
      setShowFollowupBox(true);
      setFollowupHistory([]);
    } catch (error) {
      console.error("Summarization error:", error);
      setSummary('Error summarizing text. Please try again.');
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
      const answer = response.data.answer || 'No response received';
      setFollowupHistory(prev => [...prev, { question: followup, answer }]);
      setFollowup('');
    } catch (error) {
      console.error("Follow-up error:", error);
      setFollowupHistory(prev => [...prev, { 
        question: followup, 
        answer: 'Error getting follow-up response' 
      }]);
    }
  };

  return (
    <div className="text-summarization-container">
      <div className="summarization-box">
        <h2 className="summarization-title">Text Summarization</h2>
        
        <div className="input-container">
          <textarea
            rows={8}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="text-input"
            disabled={isLoading}
          />
          
          <button 
            onClick={handleSummarize} 
            className="summarize-button"
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? (
              <span className="button-loading">
                <span className="spinner"></span>
                Summarizing...
              </span>
            ) : 'Summarize'}
          </button>
        </div>

        {summary && (
          <div className="result-container">
            <div className="summary-section">
              <h3 className="section-title">Summary</h3>
              <div className="summary-content">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            </div>

            {keywords.length > 0 && (
              <div className="keywords-section">
                <h3 className="section-title">Keywords</h3>
                <div className="keywords-content">
                  {keywords.map((k, i) => (
                    <span key={i} className="keyword-tag">{k}</span>
                  ))}
                </div>
              </div>
            )}

            {relatedQueries.length > 0 && (
              <div className="queries-section">
                <h3 className="section-title">Related Queries</h3>
                <ul className="queries-list">
                  {relatedQueries.map((q, i) => (
                    <li key={i} className="query-item">{q}</li>
                  ))}
                </ul>
              </div>
            )}

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
                    onChange={e => setFollowup(e.target.value)}
                    placeholder="Ask something related..."
                    className="followup-input"
                    onKeyPress={e => e.key === 'Enter' && handleFollowup()}
                  />
                  <button 
                    onClick={handleFollowup} 
                    className="followup-button"
                    disabled={!followup.trim()}
                  >
                    Ask
                  </button>
                </div>
                
                {followupHistory.length > 0 && (
                  <div className="followup-history">
                    <h4 className="history-title">Follow-up Q&A</h4>
                    {followupHistory.map((item, idx) => (
                      <div key={idx} className="history-item">
                        <p className="user-question">
                          <strong>You:</strong> {item.question}
                        </p>
                        <p className="ai-answer">
                          <strong>AI:</strong> {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextPage;
*/
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import './TextPage.css';

const TextPage = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupHistory, setFollowupHistory] = useState([]);
  const [showFollowupBox, setShowFollowupBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSummarize = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    if (!text.trim()) {
      setSummary('Please enter some text to summarize');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/summarize', {
        userId,
        text,
        mode: 'text'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { summary, keywords, relatedQueries, prompt } = response.data;
      setSummary(summary);
      setKeywords(keywords || []);
      setRelatedQueries(relatedQueries || []);
      setPrompt(prompt || '');
      setShowFollowupBox(true);
      setFollowupHistory([]);
    } catch (error) {
      console.error('Summarization error:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('userId');
        navigate('/login');
      } else {
        setSummary('Error summarizing text. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowup = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    if (!followup.trim()) return;

    try {
      const response = await axios.post('http://localhost:8080/api/followup', {
        userId,
        query: followup
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const answer = response.data.answer || 'No response received';
      setFollowupHistory(prev => [...prev, { question: followup, answer }]);
      setFollowup('');
    } catch (error) {
      console.error('Follow-up error:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('userId');
        navigate('/login');
      } else {
        setFollowupHistory(prev => [...prev, {
          question: followup,
          answer: 'Error getting follow-up response'
        }]);
      }
    }
  };

  if (!isAuthenticated) {
    return <div className="auth-check">Checking authentication...</div>;
  }

  return (
    <div className="text-summarization-container">
      <div className="summarization-box">
        <h2 className="summarization-title">Text Summarization</h2>
        
        <div className="input-container">
          <textarea
            rows={8}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="text-input"
            disabled={isLoading}
          />
          
          <button 
            onClick={handleSummarize} 
            className="summarize-button"
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? (
              <span className="button-loading">
                <span className="spinner"></span>
                Summarizing...
              </span>
            ) : 'Summarize'}
          </button>
        </div>

        {summary && (
          <div className="result-container">
            <div className="summary-section">
              <h3 className="section-title">Summary</h3>
              <div className="summary-content">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            </div>

            {keywords.length > 0 && (
              <div className="keywords-section">
                <h3 className="section-title">Keywords</h3>
                <div className="keywords-content">
                  {keywords.map((k, i) => (
                    <span key={i} className="keyword-tag">{k}</span>
                  ))}
                </div>
              </div>
            )}

            {relatedQueries.length > 0 && (
              <div className="queries-section">
                <h3 className="section-title">Related Queries</h3>
                <ul className="queries-list">
                  {relatedQueries.map((q, i) => (
                    <li key={i} className="query-item">{q}</li>
                  ))}
                </ul>
              </div>
            )}

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
                    onChange={e => setFollowup(e.target.value)}
                    placeholder="Ask something related..."
                    className="followup-input"
                    onKeyPress={e => e.key === 'Enter' && handleFollowup()}
                  />
                  <button 
                    onClick={handleFollowup} 
                    className="followup-button"
                    disabled={!followup.trim()}
                  >
                    Ask
                  </button>
                </div>
                
                {followupHistory.length > 0 && (
                  <div className="followup-history">
                    <h4 className="history-title">Follow-up Q&A</h4>
                    {followupHistory.map((item, idx) => (
                      <div key={idx} className="history-item">
                        <p className="user-question">
                          <strong>You:</strong> {item.question}
                        </p>
                        <p className="ai-answer">
                          <strong>AI:</strong> {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextPage;
*/

/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import './TextPage.css';

const TextPage = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupHistory, setFollowupHistory] = useState([]);
  const [showFollowupBox, setShowFollowupBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [previousSummaries, setPreviousSummaries] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
      fetchPreviousSummaries(userId);
    }
  }, [navigate]);

  const fetchPreviousSummaries = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/summarize/history?userId=${userId}&mode=text`);
      setPreviousSummaries(response.data.reverse());
    } catch (error) {
      console.error('Error fetching previous summaries:', error);
    }
  };

  const handleSummarize = async () => {
    const userId = localStorage.getItem('userId');
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/summarize', {
        userId,
        text,
        mode: 'text'
      });

      const { summary, keywords, relatedQueries, prompt } = response.data;
      setSummary(summary);
      setKeywords(keywords || []);
      setRelatedQueries(relatedQueries || []);
      setPrompt(prompt || '');
      setShowFollowupBox(true);
      setFollowupHistory([]);
      fetchPreviousSummaries(userId);
    } catch (error) {
      setSummary('Error summarizing text. Please try again.');
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
        query: followup
      });
      const answer = response.data.answer;
      setFollowupHistory(prev => [...prev, { question: followup, answer }]);
      setFollowup('');
    } catch (error) {
      setFollowupHistory(prev => [...prev, { question: followup, answer: 'Error with follow-up' }]);
    }
  };

  const resetChat = () => {
    setText('');
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="summarization-title">📝 Text Summarization</h2>
          <button className="new-chat-button" onClick={resetChat}>🆕 New Chat</button>
        </div>

        <textarea
          rows={8}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="text-input"
          disabled={isLoading}
        />

        <button 
          onClick={handleSummarize} 
          className="summarize-button"
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? 'Summarizing...' : 'Summarize'}
        </button>

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
                {keywords.map((k, i) => <span key={i} className="keyword-tag">{k}</span>)}
              </div>
            </div>

            <div className="queries-section">
              <h3 className="section-title">Related Queries</h3>
              <ul className="queries-list">
                {relatedQueries.map((q, i) => <li key={i} className="query-item">{q}</li>)}
              </ul>
            </div>

            {prompt && <div className="prompt-section">
              <h3 className="section-title">Prompt</h3>
              <p className="prompt-content">{prompt}</p>
            </div>}

            {showFollowupBox && (
              <div className="followup-section">
                <h3 className="section-title">Ask a follow-up</h3>
                <div className="followup-input-container">
                  <input
                    value={followup}
                    onChange={e => setFollowup(e.target.value)}
                    placeholder="Ask something related..."
                    className="followup-input"
                    onKeyPress={e => e.key === 'Enter' && handleFollowup()}
                  />
                  <button onClick={handleFollowup} className="followup-button">Ask</button>
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
            )}
          </div>
        )}

        {/* Expandable Previous Summaries */
       /* {previousSummaries.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 className="section-title">🕘 Previous Queries</h3>
            {previousSummaries.map((s, idx) => (
              <div key={idx} className="history-item">
                <p
                  className="summary-link"
                  onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                  style={{ cursor: 'pointer' }}
                >
                  {s.originalText.slice(0, 40)}...
                </p>
                {expandedIndex === idx && (
                  <div className="summary-content">
                    <ReactMarkdown>{s.summaryText}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextPage;
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import './TextPage.css';

const TextPage = () => {
  const [text, setText] = useState('');
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
      setText(originalText);
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

  const handleSummarize = async () => {
    const userId = localStorage.getItem('userId');
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/summarize', {
        userId,
        text,
        mode: 'text',
      });

      const { summary, keywords, relatedQueries, prompt } = response.data;
      setSummary(summary);
      setKeywords(keywords || []);
      setRelatedQueries(relatedQueries || []);
      setPrompt(prompt || '');
      setShowFollowupBox(true);
      setFollowupHistory([]);
    } catch (error) {
      setSummary('Error summarizing text. Please try again.');
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
        { question: followup, answer: 'Error with follow-up' },
      ]);
    }
  };

  const resetChat = () => {
    setText('');
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
          <h2 className="summarization-title">📝 Text Summarization</h2>
          <button className="new-chat-button" onClick={resetChat}>
            🆕 New Chat
          </button>
        </div>

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="text-input"
          disabled={isLoading}
        />

        <button
          onClick={handleSummarize}
          className="summarize-button"
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? 'Summarizing...' : 'Summarize'}
        </button>

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

export default TextPage;
