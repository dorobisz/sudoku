import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sudoku from './components/sudoku/Sudoku';
import sudokuInitialState from './redux/reducers/app/sudokuInitialState';
import { selectHistory } from './redux/reducers/hisotry/historyReducer';
import { selectSudoku } from './redux/reducers/app/sudokuReducer';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import HistoryPanel from './components/history/HistoryPanel';

function App() {
  const sudoku = useAppSelector(selectSudoku);
  const histories = useAppSelector(selectHistory)
  const dispatch = useAppDispatch()
  return (
    <div className="content">
      <div className="contentHeader"><h1>SUDOKU</h1></div>
      <div className="leftPanel"></div>
      <div className="main">
        <Sudoku sudoku={sudoku} dispatch={dispatch} />
      </div>
      <div className="rightPanel">
        <HistoryPanel dispatch={dispatch} histories={histories} />
      </div>
    </div>
  );
}

export default App;
