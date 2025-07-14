/*

import React, { useState } from 'react';
import axios from 'axios';

const TextSummarizationPage = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupResult, setFollowupResult] = useState('');

  const handleSummarize = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post('http://localhost:8080/api/summarize', {
        userId,
        text
      });
      setSummary(response.data);
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
      setFollowupResult(response.data);
    } catch (error) {
      setFollowupResult('Error with follow-up');
    }
  };

  return (
    <div>
      <h2>Text Summarization</h2>
      <textarea rows={6} cols={60} placeholder="Enter your text" value={text} onChange={e => setText(e.target.value)} /><br />
      <button onClick={handleSummarize}>Summarize</button>
      <h3>Summary:</h3>
      <p>{summary}</p>

      <hr />
      <h4>Ask a follow-up</h4>
      <input value={followup} onChange={e => setFollowup(e.target.value)} placeholder="Ask something related" />
      <button onClick={handleFollowup}>Ask</button>
      <p>{followupResult}</p>
    </div>
  );
};

export default TextSummarizationPage;

*/


/*
import React, { useState } from 'react';
import axios from 'axios';

const TextSummarizationPage = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [followup, setFollowup] = useState('');
  const [followupResult, setFollowupResult] = useState('');
  const [prompt, setPrompt] = useState('');

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

    } catch (error) {
      setSummary('Error summarizing text');
      setKeywords([]);
      setRelatedQueries([]);
      setPrompt('');
    }
  };

  const handleFollowup = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post('http://localhost:8080/api/followup', {
        userId,
        query: followup
      });

      setFollowupResult(response.data.answer || 'No response received');
    } catch (error) {
      setFollowupResult('Error with follow-up');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Text Summarization</h2>
      <textarea
        rows={6}
        cols={60}
        placeholder="Enter your text"
        value={text}
        onChange={e => setText(e.target.value)}
      /><br />
      <button onClick={handleSummarize}>Summarize</button>

      {summary && (
        <>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </>
      )}

      {keywords.length > 0 && (
        <>
          <h4>Keywords:</h4>
          <ul>
            {keywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </>
      )}

      {relatedQueries.length > 0 && (
        <>
          <h4>Related Queries:</h4>
          <ul>
            {relatedQueries.map((query, index) => (
              <li key={index}>{query}</li>
            ))}
          </ul>
        </>
      )}

      {prompt && (
        <>
          <h4>Prompt:</h4>
          <p>{prompt}</p>
        </>
      )}

      <hr />
      <h4>Ask a follow-up</h4>
      <input
        value={followup}
        onChange={e => setFollowup(e.target.value)}
        placeholder="Ask something related"
        style={{ width: '300px' }}
      />
      <button onClick={handleFollowup}>Ask</button>
      {followupResult && <p><strong>Answer:</strong> {followupResult}</p>}
    </div>
  );
};

export default TextSummarizationPage;
*/
/*
import React, { useState } from 'react';
import axios from 'axios';

const TextSummarizationPage = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupHistory, setFollowupHistory] = useState([]);
  const [showFollowupBox, setShowFollowupBox] = useState(false); // Control visibility

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
      setShowFollowupBox(true); // Show follow-up after summarization
      setFollowupHistory([]);   // Clear old followups if any

    } catch (error) {
      setSummary('Error summarizing text');
      setKeywords([]);
      setRelatedQueries([]);
      setPrompt('');
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
    } catch (error) {
      setFollowupHistory(prev => [...prev, { question: followup, answer: 'Error with follow-up' }]);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Text Summarization</h2>
      <textarea
        rows={6}
        cols={60}
        placeholder="Enter your text"
        value={text}
        onChange={e => setText(e.target.value)}
      /><br />
      <button onClick={handleSummarize}>Summarize</button>

      {summary && (
        <>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </>
      )}

      {keywords.length > 0 && (
        <>
          <h4>Keywords:</h4>
          <ul>
            {keywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </>
      )}

      {relatedQueries.length > 0 && (
        <>
          <h4>Related Queries:</h4>
          <ul>
            {relatedQueries.map((query, index) => (
              <li key={index}>{query}</li>
            ))}
          </ul>
        </>
      )}

      {prompt && (
        <>
          <h4>Prompt:</h4>
          <p>{prompt}</p>
        </>
      )}

      <hr />

      {showFollowupBox && (
        <>
          <h4>Ask a follow-up</h4>
          <input
            value={followup}
            onChange={e => setFollowup(e.target.value)}
            placeholder="Ask something related"
            style={{ width: '300px' }}
          />
          <button onClick={handleFollowup}>Ask</button>

          {followupHistory.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4>Follow-up Q&A:</h4>
              {followupHistory.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '10px' }}>
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

export default TextSummarizationPage;
*/
import React from 'react';
import LayoutWithSidebar from '../components/LayoutWithSidebar';
import TextPage from './TextPage'; // Make sure TextPage is also in pages folder

const TextSummarizationPage = () => {
  return (
    <LayoutWithSidebar>
      <TextPage />
    </LayoutWithSidebar>
  );
};

export default TextSummarizationPage;

