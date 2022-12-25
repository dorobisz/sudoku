import { Cell } from "../../components/model";
import store from "../sotre";
import { removeValueFromHelpStrategy } from "../strategies/removeValueFromHelpValues";
import { addHistory } from "./historyReducer";
import { clearHelpValue, setHelpValue, setValue } from "./sudokuReducer";

export const populateValue = (cell: Cell) => (dispatch: any) => {
    dispatch(setValue(cell));
    dispatch(clearHelpValue(cell));
    dispatch(recalculateHelpValue(cell));
}

export const recalculateHelpValue = (cell: Cell) => (dispatch: any) => {
  dispatch(removeValueFromHelp(cell));
  
}

const removeValueFromHelp = (cell: Cell) => (dispatch: any) => {
    const sudoku = store.getState().app.sudoku;
    if(cell.value) {
        const history = removeValueFromHelpStrategy(sudoku, cell);
        dispatch(addHistory(history));
        history.changedCells.forEach(cell => dispatch(setHelpValue(cell)));
        console.log(history);
    }
  }