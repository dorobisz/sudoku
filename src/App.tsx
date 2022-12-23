import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sudoku from './components/Sudoku';
import sudokuInitialState from './redux/sudokuInitialState';

function App() {
  const sudoku = sudokuInitialState();
  return (
    <div className="content">
      <div className="contentHeader"><h1>SUDOKU</h1></div>
      <div className="leftPanel"></div>
      <div className="main">
        <Sudoku sudoku={sudoku} />
      </div>
      <div className="rightPanel"></div>
    </div>
  );
}

export default App;
