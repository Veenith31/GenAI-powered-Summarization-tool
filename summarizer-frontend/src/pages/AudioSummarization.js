/*

import React, { useState } from 'react';
import axios from 'axios';

const AudioSummarizationPage = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupResult, setFollowupResult] = useState('');


  const handleAudioUpload = async () => {
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append('audio', file);
    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:8080/api/audio/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSummary(response.data);
    } catch (error) {
      setSummary('Audio summarization failed');
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
      <h2>Audio Summarization</h2>
      <input type="file" accept="audio/*" onChange={e => setFile(e.target.files[0])} /><br />
      <button onClick={handleAudioUpload}>Upload & Summarize</button>
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

export default AudioSummarizationPage;
*/

import React, { useState } from 'react';
import axios from 'axios';

const AudioSummarizationPage = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupResult, setFollowupResult] = useState('');
  const [error, setError] = useState('');

  const handleAudioUpload = async () => {
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append('file', file);  // ✅ Should be 'file' (not 'audio') to match @RequestPart("file")
    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:8080/api/audio/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const { summary, keywords, relatedQueries, prompt } = response.data;

      setSummary(summary);
      setKeywords(keywords || []);
      setRelatedQueries(relatedQueries || []);
      setPrompt(prompt || '');
      setError('');
    } catch (error) {
      console.error(error);
      setError('Audio summarization failed');
    }
  };

  const handleFollowup = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post('http://localhost:8080/api/followup', {
        userId,
        query: followup
      });
      setFollowupResult(response.data.answer); // assuming response is { "answer": "..." }
    } catch (error) {
      setFollowupResult('Error with follow-up');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Audio Summarization</h2>

      <input type="file" accept="audio/*" onChange={e => setFile(e.target.files[0])} /><br />
      <button onClick={handleAudioUpload}>Upload & Summarize</button>

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

export default AudioSummarizationPage;
