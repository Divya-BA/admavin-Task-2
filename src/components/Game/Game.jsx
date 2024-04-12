import React, { useState, useEffect } from 'react';
import './Game.css'; // Import CSS file for styling
import MessageBox from './MessageBox'; // Import MessageBox component

const Game = () => {
  const [boxes, setBoxes] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [hitBoxIndex, setHitBoxIndex] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const generateRandomIndex = () => Math.floor(Math.random() * 9);

  const generateRandomBox = () => {
    const index = generateRandomIndex();
    setHitBoxIndex(index); // Set the box index with the "Hit" keyword
    const newBoxes = Array(9).fill(false);
    newBoxes[index] = true;
    setBoxes(newBoxes);

    setTimeout(() => {
      setHitBoxIndex(null); // Remove the "Hit" keyword from the box after 1 second
      newBoxes[index] = false;
      setBoxes(newBoxes);
    }, 1000);
  };

  const handleClick = (index) => {
    if(gameOver){
      return;
    }
    if (index === hitBoxIndex) {
      setScore(score + 5);
    }else{
      setMisses(misses + 1);
      setScore(score - 2.5);
    }
    
  };

  const restartGame = () => {
    setBoxes(Array(9).fill(false));
    setScore(0);
    setMisses(0);
    setTimeLeft(20);
    setHitBoxIndex(null);
    setGameOver(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && !gameOver) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer); // Stop the timer when the game is over or time runs out
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver]); // Include gameOver in the dependency array

  useEffect(() => {
    if (timeLeft > 0 && !gameOver ) {
      generateRandomBox();
    } else {
      setGameOver(true);
      // setScore(0);
      // setMisses(0);
    }

  }, [timeLeft, gameOver]);

  return (
    <div className="game-container">
        <h1>Game</h1>
      <div className='text'>Time Left: {timeLeft} seconds</div>
      <div className='text'>Score: {score}</div>
      <div className='text'>Misses: {misses}</div>
      <div className="big-box">
        {boxes.map((isHit, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`small-box ${isHit && index === hitBoxIndex ? 'hit' : ''}`}
          >
            {isHit && index === hitBoxIndex ? 'Hit' : ''}
          </div>
        ))}
      </div>
      {gameOver && <MessageBox score={score} misses={misses} />}
      {gameOver && <button onClick={restartGame}>Restart Game</button>}
    </div>
  );
};

export default Game;
