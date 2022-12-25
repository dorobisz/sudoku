import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sudoku from './components/Sudoku';
import sudokuInitialState from './redux/sudokuInitialState';
import { selectSudoku } from './redux/reducers/sudokuReducer';
import { useAppDispatch, useAppSelector } from './redux/hooks';

function App() {
  const sudoku = useAppSelector(selectSudoku);
  const dispatch = useAppDispatch()
  return (
    <div className="content">
      <div className="contentHeader"><h1>SUDOKU</h1></div>
      <div className="leftPanel"></div>
      <div className="main">
        <Sudoku sudoku={sudoku} dispatch={dispatch} />
      </div>
      <div className="rightPanel"></div>
    </div>
  );
}

export default App;
