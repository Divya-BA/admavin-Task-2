import React from 'react';
import './Game.css';
const MessageBox = ({ score, misses }) => {
  return (
    <div className="message-box">
      <h2>Game Over!</h2>
      <div className='score'>Your final score is: {score}</div>
      <div className='missed'>Missed: {misses}</div>
    </div>
  );
};

export default MessageBox;
