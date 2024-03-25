import React, { useState } from 'react';
import './SplitBox.css';

const BoxSplit = () => {
  const [boxes, setBoxes] = useState([{ id: 1, size: 400, x: 0, y: 0, isHovered: false }]);

  const handleSplit = (id) => {
    setBoxes(prevBoxes => {
      const clickedBoxIndex = prevBoxes.findIndex(box => box.id === id);
      const clickedBox = prevBoxes[clickedBoxIndex];
      const newSize = clickedBox.size / 2;
      const newBoxes = [
        ...prevBoxes.slice(0, clickedBoxIndex),
        { id: prevBoxes.length + 1, size: newSize, x: clickedBox.x, y: clickedBox.y },
        { id: prevBoxes.length + 2, size: newSize, x: clickedBox.x + newSize, y: clickedBox.y },
        { id: prevBoxes.length + 3, size: newSize, x: clickedBox.x, y: clickedBox.y + newSize },
        { id: prevBoxes.length + 4, size: newSize, x: clickedBox.x + newSize, y: clickedBox.y + newSize },
        ...prevBoxes.slice(clickedBoxIndex + 1)
      ];
      return newBoxes.map((box, index) => ({...box, id: index + 1})); // Resetting IDs
    });
  };

  const handleMouseEnter = (id) => {
    setBoxes(prevBoxes => {
      return prevBoxes.map(box => {
        if (box.id === id) {
          return { ...box, isHovered: true };
        }
        return box;
      });
    });
  };

  const handleMouseLeave = (id) => {
    setBoxes(prevBoxes => {
      return prevBoxes.map(box => {
        if (box.id === id) {
          return { ...box, isHovered: false };
        }
        return box;
      });
    });
  };

  return (
    <>
      <div className='container'>
        <h1>Box Split</h1>
        <div className='box-container'>
          {boxes.map(box => (
            <div
              key={box.id}
              className={`box ${box.isHovered ? 'hovered' : ''}`}
              style={{
                position: 'absolute',
                width: `${box.size}px`,
                height: `${box.size}px`,
                border: '1px solid black',
                top: `${box.y}px`,
                left: `${box.x}px`
              }}
              onClick={() => handleSplit(box.id)}
              onMouseEnter={() => handleMouseEnter(box.id)}
              onMouseLeave={() => handleMouseLeave(box.id)}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BoxSplit;
