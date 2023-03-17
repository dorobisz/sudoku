import { Cell, History } from "../../components/model";
import store from "../sotre";
import { addValueStrategy } from "../../strategies/addValueStrategy";
import { removeValueStrategy } from "../../strategies/removeValueStrategy";
import { addHistory, newPinedHistory, unpinedAllHistories } from "./hisotry/historyReducer";
import { updateAll, setValue, addSelectedHistory, removeSelectedHistory } from "./app/sudokuReducer";
import { uid, updateCells } from "../reducerUtils";
import { createHistory } from "./hisotry/historyFactory";


  import { selectHistory as selectedHistoryForAnalyzator, unselectHistory } from "./analyzator/analyzatorReducer";

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
    dispatch(setValue(cell));
    dispatch((addCellHistory(cell, addValueStrategy)));
    dispatch(history(cell));
}

const history = (cell: Cell) => (dispatch: any) => {
  const sudoku = store.getState().app.sudoku;
  dispatch((addCellHistory(cell, removeValueStrategy)));
}

const addCellHistory = (cell: Cell, strategyProvider: Function) => (dispatch: any) => {
  const sudoku = store.getState().app.sudoku;
  const historyId = uid();
  const strategy =  strategyProvider(sudoku, cell);

  const updatedCells = updateCells(sudoku, strategy.clearedCells, historyId);
  if(updateCells.length > 0) {
    dispatch(addHistory(createHistory(strategy, store.getState().app.sudoku, historyId)))
    dispatch(updateAll(updatedCells));
  }
     
}