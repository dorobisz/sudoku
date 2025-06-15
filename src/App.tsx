import './App.css';
import SudokuBoard from './components/sudoku/SudokuBoard';
import { selectHistory } from './redux/reducers/hisotry/historyReducer';
import { selectSudoku } from './redux/reducers/app/sudokuReducer';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import HistoryPanel from './components/history/HistoryPanel';
import { selectAnalyzator } from './redux/reducers/analyzator/analyzatorReducer';

function App() {
  const sudoku = useAppSelector(selectSudoku);
  const histories = useAppSelector(selectHistory);
  const analyzator = useAppSelector(selectAnalyzator);

  const dispatch = useAppDispatch()
  return (
    <div className="content">
      <div className="contentHeader"><h1>SUDOKU</h1></div>
      <div className="leftPanel"></div>
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
