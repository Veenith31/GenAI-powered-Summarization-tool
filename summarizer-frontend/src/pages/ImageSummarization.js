/*

import React, { useState } from 'react';
import axios from 'axios';

const ImageSummarizationPage = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupResult, setFollowupResult] = useState('');


  const handleImageUpload = async () => {
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:8080/api/ocr/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSummary(response.data);
    } catch (error) {
      setSummary('Image summarization failed');
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
      <h2>Image Summarization</h2>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} /><br />
      <button onClick={handleImageUpload}>Upload & Summarize</button>
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

export default ImageSummarizationPage;
*/

import React, { useState } from 'react';
import axios from 'axios';

const ImageSummarizationPage = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [followup, setFollowup] = useState('');
  const [followupResult, setFollowupResult] = useState('');
  const [error, setError] = useState('');

  const handleImageUpload = async () => {
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append('file', file); // ✅ corrected key
    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:8080/api/ocr/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const { summary, keywords, relatedQueries, prompt } = response.data;
      setSummary(summary);
      setKeywords(keywords || []);
      setRelatedQueries(relatedQueries || []);
      setPrompt(prompt || '');
      setError('');
    } catch (error) {
      setError('Image summarization failed');
    }
  };

  const handleFollowup = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post('http://localhost:8080/api/followup', {
        userId,
        query: followup
      });
      setFollowupResult(response.data.answer); // ✅ expect { answer: "..." }
    } catch (error) {
      setFollowupResult('Error with follow-up');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Image Summarization</h2>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} /><br />
      <button onClick={handleImageUpload}>Upload & Summarize</button>

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
      <input value={followup} onChange={e => setFollowup(e.target.value)} placeholder="Ask something related" />
      <button onClick={handleFollowup}>Ask</button>
      <p>{followupResult}</p>
    </div>
  );
};

export default ImageSummarizationPage;
