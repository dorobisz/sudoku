import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sudoku from './components/Sudoku';
import sudokuInitialState from './redux/sudokuInitialState';

function App() {
  const sudoku = sudokuInitialState();
  return (
    <Sudoku sudoku={sudoku} />
  );
}

export default App;
