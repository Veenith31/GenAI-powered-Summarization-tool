/*

import React, { useState } from 'react';
import axios from 'axios';

const YoutubeSummarizationPage = () => {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupResult, setFollowupResult] = useState('');


  const handleYoutubeSummarize = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post('http://localhost:8080/api/youtube/summarize', {
        userId,
        url
      });
      setSummary(response.data);
    } catch (error) {
      setSummary('YouTube summarization failed');
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
      <h2>YouTube Video Summarization</h2>
      <input
        type="text"
        placeholder="Paste YouTube URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
      /><br />
      <button onClick={handleYoutubeSummarize}>Summarize</button>
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

export default YoutubeSummarizationPage;
*/

/*
import React, { useState } from 'react';
import axios from 'axios';

const YoutubeSummarizationPage = () => {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupResult, setFollowupResult] = useState('');
  const [error, setError] = useState('');

  const handleYoutubeSummarize = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post('http://localhost:8080/api/youtube/summarize', null, {
        params: {
          userId,
          url
        }
      });

      const { summary, keywords, relatedQueries, prompt } = response.data;
      setSummary(summary);
      setKeywords(keywords || []);
      setRelatedQueries(relatedQueries || []);
      setPrompt(prompt || '');
      setError('');
    } catch (error) {
      console.error(error);
      setError('YouTube summarization failed');
    }
  };

  const handleFollowup = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post('http://localhost:8080/api/followup', {
        userId,
        query: followup
      });
      setFollowupResult(response.data.answer); // assuming FollowUpResponse { answer: "..." }
    } catch (error) {
      setFollowupResult('Error with follow-up');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>YouTube Video Summarization</h2>
      <input
        type="text"
        placeholder="Paste YouTube URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
      /><br />
      <button onClick={handleYoutubeSummarize}>Summarize</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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
            {keywords.map((k, i) => <li key={i}>{k}</li>)}
          </ul>
        </>
      )}

      {relatedQueries.length > 0 && (
        <>
          <h4>Related Queries:</h4>
          <ul>
            {relatedQueries.map((q, i) => <li key={i}>{q}</li>)}
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
      />
      <button onClick={handleFollowup}>Ask</button>
      <p>{followupResult}</p>
    </div>
  );
};

export default YoutubeSummarizationPage;
*/