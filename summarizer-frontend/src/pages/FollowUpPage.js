import React, { useState } from 'react';
import axios from 'axios';

const FollowUpPage = ({ userId }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleFollowUp = async () => {
    const res = await axios.post('http://localhost:8080/api/followup', {
      userId,
      query: question
    });
    setAnswer(res.data.response);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Ask a follow-up question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleFollowUp}>Ask</button>
      {answer && (
        <div>
          <strong>AI Response:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FollowUpPage;
