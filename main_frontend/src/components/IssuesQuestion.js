import React, { useState } from 'react';
import axios from 'axios';
import "./IssuesForm.css"
import MeditationResult from './MeditationResult';

function IssuesForm() {
  const [feeling, setFeeling] = useState('');
  const [whatDo, setWhatDo] = useState('');
  const [issues, setIssues] = useState('');
  const [meditationResponse, setMeditationResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      "usecase": 'GPT_MEDITATION_CREATOR',
      "userInput": `feeling ${feeling} right now, they currently are ${whatDo} and facing ${issues} issues today`,
    };

    setLoading(true)

    try {
      const response = await axios.post(
        `https://zealous-wasp-nightshirt.cyclic.app/data`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setMeditationResponse(response.data.generatedText);
      console.log(response.data.generatedText)
      setLoading(false);
      setShowResult(true);
    } catch (error) {
      console.error('Error fetching meditation response:', error);
      setLoading(false)
    }
  };

  const handleGoBack = () => {
    setShowResult(false);
  };

  return (
    <div className="form-container">
      {!showResult && (
        <form onSubmit={handleSubmit}>
          <h2>How are you feeling right now?</h2>
          <input
            type="text"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
          />

          <h2>What do you do?</h2>
          <input
            type="text"
            value={whatDo}
            onChange={(e) => setWhatDo(e.target.value)}
          />

          <h2>What issues are you facing today?</h2>
          <input
            type="text"
            value={issues}
            onChange={(e) => setIssues(e.target.value)}
          />

         <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      )}

      {showResult && (
        <MeditationResult
          meditationResponse={meditationResponse}
          onGoBack={handleGoBack}
        />
      )}
    </div>
  );
}

export default IssuesForm;
