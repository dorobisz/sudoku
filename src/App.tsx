import './App.css';
import SudokuBoard from './components/sudoku/SudokuBoard';
import { selectHistory } from './redux/reducers/hisotry/historyReducer';
import { selectSudoku } from './redux/reducers/app/sudokuReducer';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import HistoryPanel from './components/history/HistoryPanel';
import { selectAnalyzator } from './redux/reducers/analyzator/analyzatorReducer'; // Assuming this is used elsewhere
import { generateSudoku, DifficultyLevel } from './redux/reducers/app/sudokuReducer';
import { useState } from 'react';
import { useCallback } from 'react';

function App() {
  const sudoku = useAppSelector(selectSudoku);
  // const analyzator = useAppSelector(selectAnalyzator); // Assuming this is used elsewhere
  const histories = useAppSelector(selectHistory);
  const analyzator = useAppSelector(selectAnalyzator);

  const dispatch = useAppDispatch();
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('medium');

  const handleGenerateSudoku = useCallback(() => {
    dispatch(generateSudoku(selectedDifficulty));
  }, [dispatch, selectedDifficulty]);
  return (
    <div className="content">
      <div className="contentHeader"><h1>SUDOKU</h1></div>
      <div className="leftPanel">
        <div className="generate-sudoku-controls">
          <h3>Nowa Gra</h3>
          <select
            onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel)}
            value={selectedDifficulty}
          >
            <option value="easy">Łatwy</option>
            <option value="medium">Średni</option>
            <option value="hard">Trudny</option>
          </select>
          <button onClick={handleGenerateSudoku}>
            Generuj Sudoku
          </button>
        </div>
      </div>
      <div className="main">
        <SudokuBoard sudoku={sudoku} dispatch={dispatch} />
      </div>
      <div className="rightPanel">
        <HistoryPanel dispatch={dispatch} histories={histories} />
      </div>
    </div>
  );
}

export default App;
