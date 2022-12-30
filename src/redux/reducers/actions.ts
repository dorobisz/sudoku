import { Cell, SudokuCellArray } from "../../components/model";
import { getCell } from "../../utils/sudokuBlockUtil";
import store from "../sotre";
import { addValueStrategy } from "../strategies/addValueStrategy";
import { removeValueFromHelpStrategy } from "../strategies/removeValueFromHelpValues";
import { addHistory } from "./historyReducer";
import { setHelpValue, setValue } from "./sudokuReducer";

export const populateValue = (cell: Cell) => (dispatch: any) => {
    const sudoku = store.getState().app.sudoku;
    dispatch(setValue(cell));
    const newSudoku = store.getState().app.sudoku;
    dispatch(addHistory(addValueStrategy(sudoku, cell, newSudoku)));
    dispatch(recalculateHelpValue(cell));
}

export const recalculateHelpValue = (cell: Cell) => (dispatch: any) => {
  dispatch(runStrategies(cell.columnNr, cell.rowNr));
  
}

const runStrategies = (colNr: number, rowNr: number) => (dispatch: any) => {
     dispatch(removeValueFromHelp(colNr, rowNr));
     //TODO add another strategies
}

const removeValueFromHelp = (colNr: number, rowNr: number) => (dispatch: any) => {
    const sudoku = store.getState().app.sudoku;
    const cell = getCell(colNr, rowNr, sudoku);
    if(cell && cell.value) {
        const history = removeValueFromHelpStrategy(sudoku, cell);
        dispatch(addHistory(history));
        history.changedCells.forEach(cell => dispatch(setHelpValue(cell)));
    }
  }