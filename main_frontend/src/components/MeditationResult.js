import React from 'react';
import "./MeditationResult.css"



function MeditationResult({ meditationResponse, onGoBack }) {

 // Clean the meditation response
 const cleanedResponse = meditationResponse.replace(/^\s*[-.]\s*/gm, '');


 // Split the cleaned meditation response into separate lines
 const lines = cleanedResponse.split('\n');

 // Filter out empty lines from the beginning and end of the response
 const filteredLines = lines.filter((line) => line.trim() !== '');

 // Render the points in a point-wise format
 const points = filteredLines.map((line, index) => <li key={index}>{line}</li>);


  return (
    <div className='result-container'>
      <h2>Meditation Process:</h2>
       {points.length === 0 ? (
        <p>No meditation response available.</p>
      ) : (
        <ul>{points}</ul>
      )}
      <button onClick={onGoBack}>Go Back to Home</button>
    </div>
  );
}

export default MeditationResult;
