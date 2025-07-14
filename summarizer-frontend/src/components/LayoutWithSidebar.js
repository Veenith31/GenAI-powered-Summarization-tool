// File: src/components/LayoutWithSidebar.js
/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LayoutWithSidebar.css';

const LayoutWithSidebar = ({ children, onConversationSelect }) => {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios.get(`http://localhost:8080/api/search/user/${userId}`)
      .then(response => {
        setSummaries(response.data);
      })
      .catch(error => {
        console.error("Error fetching summaries:", error);
      });
  }, []);

  const handleConversationClick = (summary) => {
    if (onConversationSelect) {
      const conversation = [
        { role: 'user', text: summary.originalText },
        { role: 'ai', text: summary.summaryText }
      ];
      onConversationSelect(conversation);
    }
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h3>Summarizer</h3>
        <ul>
          <li><a href="/text">Text</a></li>
          <li><a href="/pdf">PDF</a></li>
          <li><a href="/image">Image</a></li>
          <li><a href="/audio">Audio</a></li>
          <li><a href="/youtube">YouTube</a></li>
        </ul>
        <div className="previous-summaries">
          <h4>Previous Queries</h4>
          <ul>
            {summaries.map((summary, index) => (
              <li key={index}>
                <a href="#" onClick={() => handleConversationClick(summary)}>
                  {summary.originalText.length > 30 ? summary.originalText.substring(0, 30) + '...' : summary.originalText}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default LayoutWithSidebar;
*/
/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LayoutWithSidebar.css';

const LayoutWithSidebar = ({ children }) => {
  const [summaries, setSummaries] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios.get(`http://localhost:8080/api/summarize/history?userId=${userId}&mode=text`)
      .then(response => {
        setSummaries(response.data);
      })
      .catch(error => {
        console.error("Error fetching summaries:", error);
      });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '◄' : '►'}
      </button>
      
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <h3 className="sidebar-title">Summarizer</h3>
        <ul className="menu-items">
          <li><a href="/text">📝 Text</a></li>
          <li><a href="/pdf">📄 PDF</a></li>
          <li><a href="/image">🖼️ Image</a></li>
          <li><a href="/audio">🎧 Audio</a></li>
          <li><a href="/youtube">▶️ YouTube</a></li>
        </ul>
        
        <div className="previous-summaries">
          <h4>Previous Queries</h4>
          <ul className="summary-list">
            {summaries.map((summary, index) => (
              <li key={index} className="summary-item">
                <a href="#" className="summary-link">
                  {summary.originalText.length > 30 
                    ? `${summary.originalText.substring(0, 30)}...` 
                    : summary.originalText}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default LayoutWithSidebar;
*/

/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LayoutWithSidebar.css';

const LayoutWithSidebar = ({ children }) => {
  const [summaries, setSummaries] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSummaries = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/summarize/history?userId=${encodeURIComponent(userId)}&mode=text`
        );
        setSummaries(response.data);
      } catch (error) {
        console.error("Error fetching summaries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummaries();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '◄' : '►'}
      </button>
      
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <h3 className="sidebar-title">Summarizer</h3>
        <ul className="menu-items">
          <li><a href="/text">📝 Text</a></li>
          <li><a href="/pdf">📄 PDF</a></li>
          <li><a href="/image">🖼️ Image</a></li>
          <li><a href="/audio">🎧 Audio</a></li>
          <li><a href="/youtube">▶️ YouTube</a></li>
        </ul>
        
        <div className="previous-summaries">
          <h4>Previous Queries</h4>
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : summaries.length === 0 ? (
            <div className="no-summaries">No previous queries found</div>
          ) : (
            <ul className="summary-list">
              {summaries.map((summary, index) => (
                <li key={index} className="summary-item">
                  <a href="#" className="summary-link">
                    {summary.originalText?.length > 30 
                      ? `${summary.originalText.substring(0, 30)}...` 
                      : summary.originalText}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
      
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default LayoutWithSidebar;
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LayoutWithSidebar.css';
import { useLocation, useNavigate } from 'react-router-dom';

const LayoutWithSidebar = ({ children }) => {
  const [summaries, setSummaries] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeSummaryId, setActiveSummaryId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const mode = location.pathname.includes('pdf') ? 'pdf' : 'text';

  useEffect(() => {
    const fetchSummaries = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/summarize/history?userId=${userId}&mode=${mode}`
        );
        setSummaries(response.data.reverse()); // newest first
      } catch (error) {
        console.error('Error fetching summaries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummaries();
  }, [mode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSummaryClick = (summary, index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
    setActiveSummaryId(summary._id);
    window.dispatchEvent(new CustomEvent('load-summary', { detail: summary }));
  };

  const handleNewChat = () => {
    setActiveSummaryId(null);
    setExpandedIndex(null);
    window.dispatchEvent(new Event('new-chat'));
  };

  return (
    <div className="layout">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '◄' : '►'}
      </button>

      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <h3 className="sidebar-title">Summarizer</h3>
        <ul className="menu-items">
          <li><a href="/text">📝 Text</a></li>
          <li><a href="/pdf">📄 PDF</a></li>
          <li><a href="/image">🖼️ Image</a></li>
          <li><a href="/audio">🎧 Audio</a></li>
          <li><a href="/youtube">▶️ YouTube</a></li>
        </ul>

        <div className="previous-summaries">
          <h4>Previous Queries</h4>
          <button onClick={handleNewChat} className="new-chat-btn">➕ New Chat</button>
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : summaries.length === 0 ? (
            <div className="no-summaries">No previous queries found</div>
          ) : (
            <ul className="summary-list">
              {summaries.map((summary, index) => (
                <li key={summary._id} className="summary-item">
                  <div
                    onClick={() => handleSummaryClick(summary, index)}
                    className={`summary-link ${activeSummaryId === summary._id ? 'active' : ''}`}
                  >
                    {summary.originalText?.slice(0, 30)}...
                  </div>
                  {expandedIndex === index && (
                    <div className="summary-preview">{summary.summaryText?.slice(0, 100)}...</div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default LayoutWithSidebar;
