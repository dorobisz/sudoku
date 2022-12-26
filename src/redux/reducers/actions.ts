import { Cell, SudokuCellArray } from "../../components/model";
import { getCell } from "../../utils/sudokuBlockUtil";
import store from "../sotre";
import { removeValueFromHelpStrategy } from "../strategies/removeValueFromHelpValues";
import { addHistory } from "./historyReducer";
import { setHelpValue, setValue } from "./sudokuReducer";

export const populateValue = (cell: Cell) => (dispatch: any) => {
    dispatch(setValue(cell));
    dispatch(recalculateHelpValue(cell));
}

export const recalculateHelpValue = (cell: Cell) => (dispatch: any) => {
  dispatch(runStrategies(cell.columnNr, cell.rowNr));
  
}

const runStrategies = (colNr: number, rowNr: number) => (dispatch: any) => {
    const sudoku = store.getState().app.sudoku;
    const cell = getCell(colNr, rowNr, sudoku);
    console.log(cell);
    if(cell) {
     dispatch(removeValueFromHelp(cell, sudoku));
     //TODO add another strategies
    }
}

const removeValueFromHelp = (cell: Cell, sudoku: SudokuCellArray) => (dispatch: any) => {
    if(cell && cell.value) {
        const history = removeValueFromHelpStrategy(sudoku, cell);
        dispatch(addHistory(history));
        history.changedCells.forEach(cell => dispatch(setHelpValue(cell)));
    }
  }