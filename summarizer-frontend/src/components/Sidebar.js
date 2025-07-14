import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserId } from '../utils/auth';

const Sidebar = ({ mode, onSelect }) => {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const userId = getUserId();
        const response = await axios.get('/api/summaries/by-mode', {
          params: { userId, mode }
        });
        setSummaries(response.data);
      } catch (err) {
        console.error('Error fetching summaries:', err);
      }
    };

    fetchSummaries();
  }, [mode]);

  return (
    <div className="w-1/4 h-full bg-gray-100 p-4 overflow-y-auto border-r">
      <h2 className="text-xl font-semibold mb-4">Previous Queries</h2>
      <ul className="space-y-2">
        {summaries.map((summary, index) => (
          <li
            key={index}
            onClick={() => onSelect(summary)}
            className="cursor-pointer bg-white p-2 rounded shadow hover:bg-gray-200"
          >
            {summary.originalText.slice(0, 60)}...
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

