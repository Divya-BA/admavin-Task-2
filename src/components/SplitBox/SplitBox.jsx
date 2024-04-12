import React, { useState } from 'react';
import './SplitBox.css';

const BoxSplit = () => {
  const [boxes, setBoxes] = useState([{ id: 1, size: 400, x: 0, y: 0, isHovered: false, parentId: null }]);

  const handleSplit = (parentId) => {
    setBoxes(prevBoxes => {
      const parentBox = prevBoxes.find(box => box.id === parentId);
      const newSize = parentBox.size / 2;
      const newBoxes = [
        ...prevBoxes,
        { id: prevBoxes.length + 1, size: newSize, x: parentBox.x, y: parentBox.y, parentId: parentBox.id },
        { id: prevBoxes.length + 2, size: newSize, x: parentBox.x + newSize, y: parentBox.y, parentId: parentBox.id },
        { id: prevBoxes.length + 3, size: newSize, x: parentBox.x, y: parentBox.y + newSize, parentId: parentBox.id },
        { id: prevBoxes.length + 4, size: newSize, x: parentBox.x + newSize, y: parentBox.y + newSize, parentId: parentBox.id }
      ];
      return newBoxes.map((box, index) => ({ ...box, id: index + 1 }));
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
          {boxes.map((box, index) => (
            <div
              key={box.id}
              className={`box ${box.isHovered ? 'hovered' : ''} ${box.parentId ? 'child-box' : 'parent-box'}`}
              style={{
                position: 'absolute',
                width: `${box.size}px`,
                height: `${box.size}px`,
                border: '1px solid black',
                top: `${box.y}px`,
                left: `${box.x}px`,
                backgroundColor: box.parentId && (box.id - 1) % 4 === 0 ? 'red' : 'inherit'


              }}
              onClick={() => handleSplit(box.id)}
              onMouseEnter={() => handleMouseEnter(box.id)}
              onMouseLeave={() => handleMouseLeave(box.id)}
            >
              <div className='box-index'>{index}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
  
};

export default BoxSplit;
