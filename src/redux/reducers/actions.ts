import { Cell, SudokuCellArray } from "../../components/model";
import { getCell } from "../../utils/sudokuBlockUtil";
import store from "../sotre";
import { addValueStrategy } from "../../strategies/addValueStrategy";
import { removeValueStrategy } from "../../strategies/removeValueStrategy";
import { addHistory } from "./hisotry/historyReducer";
import { update, setValue } from "./app/sudokuReducer";
import { uid, updateCells } from "../reducerUtils";
import { createHistory } from "./hisotry/historyFactory";

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
  updatedCells.forEach(cell => dispatch(update(cell)));
  dispatch(addHistory(createHistory(strategy, store.getState().app.sudoku, historyId)))
     
}