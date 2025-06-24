import { Cell, Coordinates, History } from "../../components/model";
import { isEqual } from "lodash";
import store from "../sotre";
import { addValueStrategy, onlyOneValueStrategy, removeValueStrategy, explicitePairsStrategy } from "../../strategies";
import { addHistory, newPinedHistory, unpinedAllHistories } from "./hisotry/historyReducer";
import { updateAll, setValue, addSelectedHistory, removeSelectedHistory, generateSudoku, clearSudoku, DifficultyLevel } from "./app/sudokuReducer";
import { uid, updateCells } from "../reducerUtils";
import { createHistory } from "./hisotry/historyFactory";


  import { selectHistory as selectedHistoryForAnalyzator, unselectHistory, setUpdatedCells, resetUpdatedCells } from "./analyzator/analyzatorReducer";
import { getCell } from "../../utils/sudokuUtil";

export const pinnedHistory = (history: History) =>  (dispatch: any) => {
  const newHistory:History = {...history, isPinned: true}
   dispatch(selectedHistoryForAnalyzator(newHistory));
   dispatch(newPinedHistory(newHistory));
   dispatch(addSelectedHistory(newHistory));
}

export const unpinnedHistory = (history: History) =>  (dispatch: any) => {
  dispatch(unselectHistory());
  dispatch(unpinedAllHistories());
  dispatch(removeSelectedHistory());
}

export const populateValue = (cell: Cell) => (dispatch: any) => {
  console.log("populate value:", cell.value)
    dispatch(setValue(cell));
    dispatch((addCellHistory(cell.coordinates, addValueStrategy)));
    dispatch(history(cell.coordinates));
}

export const generate = (difficultyLevel: DifficultyLevel) => (dispatch: any) => {
    console.log("Generate sudoku dificulty:", difficultyLevel)
    dispatch(generateSudoku(difficultyLevel))
}

const history = (coordinates: Coordinates) => (dispatch: any) => {
  dispatch(addCellHistory(coordinates, removeValueStrategy));
  dispatch(addCellHistory(coordinates, onlyOneValueStrategy));
  dispatch(addCellHistory(coordinates, explicitePairsStrategy));
  dispatch(checkUpdatedCells())
}

const addCellHistory = (coordinates: Coordinates, strategyProvider: Function) => (dispatch: any) => {
  const sudoku = store.getState().app.sudoku;
  const cell = getCell(coordinates, sudoku)
  const historyId = uid();
  const strategy =  strategyProvider(sudoku, cell);

  const updatedCells = updateCells(sudoku, strategy.clearedCells, historyId);
  dispatch(setUpdatedCells(updatedCells))
  if(updatedCells.length > 0) {
    dispatch(addHistory(createHistory(strategy, store.getState().app.sudoku, historyId)))
    dispatch(updateAll(updatedCells));
  }
     
}

const checkUpdatedCells = () => (dispatch: any) => {
  const cellsToUpdate = store.getState().analyzator.updatedCells
  dispatch(resetUpdatedCells())
  if(cellsToUpdate.length !== 0)
    cellsToUpdate.forEach(cell => dispatch(history(cell.coordinates)))
}