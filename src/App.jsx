import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SplitBox from './components/SplitBox/SplitBox';
import Game from './components/Game/Game';
import InfiniteScroll from './components/InfiniteScroll/InfiniteScroll';
import NestedList from './components/NestedList/NestedList';
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Box Split</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
            <li>
              <Link to="/infinite-scroll">Infinite Scroll</Link>
            </li>
            <li>
              <Link to="/nested-list">Nested List</Link>
            </li>
          </ul>
        </nav>
<h1 className='title'>Welcome to AdMavin Company Task</h1>
        <Routes> {/* Use Routes wrapper */}
        <Route path="/" element={<SplitBox />} />
          <Route path="/game" element={<Game />} />
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
          <Route path="/nested-list" element={<NestedList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

