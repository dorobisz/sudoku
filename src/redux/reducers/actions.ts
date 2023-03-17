import { Cell, History } from "../../components/model";
import store from "../sotre";
import { addValueStrategy } from "../../strategies/addValueStrategy";
import { removeValueStrategy } from "../../strategies/removeValueStrategy";
import { addHistory, updateHistory } from "./hisotry/historyReducer";
import { updateAll, setValue } from "./app/sudokuReducer";
import { uid, updateCells } from "../reducerUtils";
import { createHistory } from "./hisotry/historyFactory";


  import { selectHistory, unselectHistory } from "./analyzator/analyzatorReducer";

export const pinnedHistory = (history: History) =>  (dispatch: any) => {
   dispatch(selectHistory(history));
   dispatch(updateHistory({...history, isPinned: true}));
}

export const unpinnedHistory = (history: History) =>  (dispatch: any) => {
  dispatch(unselectHistory());
  dispatch(updateHistory({...history, isPinned: false}));
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