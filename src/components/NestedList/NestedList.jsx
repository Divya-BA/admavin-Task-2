import React, { useState } from 'react';
import './NestedList.css';
import { FaRegFile } from "react-icons/fa";

const NestedList = ({ data }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index, childIndex) => {
    const key = `${index}-${childIndex}`;
    setExpanded({
      ...expanded,
      [key]: !expanded[key]
    });
  };

  const renderList = (items, level = 0, parentIndex) => {
    return (
      <ul className='container'>
        {items.map((item, index) => (
          <li key={index}>
            <FaRegFile className="icon" onClick={() => toggleExpand(parentIndex, index)} />
            <span className="item-name" onClick={() => toggleExpand(parentIndex, index)}>
              {item.name}
            </span>
            {expanded[`${parentIndex}-${index}`] && item.children && (
              <ul>
                {item.children.map((child, childIndex) => (
                  <li key={childIndex}>
                    <FaRegFile className="icon" onClick={() => toggleExpand(`${parentIndex}-${index}`, childIndex)} />
                    <span className="item-name" onClick={() => toggleExpand(`${parentIndex}-${index}`, childIndex)}>
                      {child.name}
                    </span>
                    {expanded[`${parentIndex}-${index}-${childIndex}`] && child.children &&
                      renderList(child.children, level + 1, `${parentIndex}-${index}-${childIndex}`)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {renderList(data, 0, 'root')}
    </div>
  );
};

const App = () => {
  const data = [
    {
      name: 'Parent 1',
      children: [
        {
          name: 'Child 1-1',
          children: [
            {
              name: 'Subchild 1-1-1',
              children: [
                { name: 'Subsubchild 1-1-1-1' },
                { name: 'Subsubchild 1-1-1-2' }
              ]
            },
            { name: 'Subchild 1-1-2' }
          ]
        },
        { name: 'Child 1-2' }
      ]
    },
    {
      name: 'Parent 2',
      children: [
        {
          name: 'Child 2-1',
          children: [
            { name: 'Subchild 2-1-1' },
            { name: 'Subchild 2-1-2' }
          ]
        },
        {
          name: 'Child 2-2',
          children: [
            { name: 'Subchild 2-2-1' },
            { name: 'Subchild 2-2-2' }
          ]
        }
      ]
    },
    {
      name: 'Parent 3',
      children: [
        {
          name: 'Child 3-1',
        },
        {
          name: 'Child 3-2',
        }
      ]
    },

    {
      name: 'Parent 4',
      children: [
        {
          name: 'Child 4-1',
          children: [
            {
              name: 'Subchild 4-1-1',
              children: [
                { name: 'Subsubchild 4-1-1-1' },
                { name: 'Subsubchild 4-1-1-2' }
              ]
            },
            { name: 'Subchild 4-1-2' }
          ]
        },
        { name: 'Child 4-2' }
      ]
    },
  ];

  return (
    <div>
      <h1>Nested List Example</h1>
      <NestedList data={data} />
    </div>
  );
};

export default App;

