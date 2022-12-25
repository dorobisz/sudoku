import { Cell, SudokuCellArray, History } from "../../components/model"
import { getBlock, getColumn, getRow } from "../../utils/sudokuBlockUtil"
import { uid, updateSudoku } from "../reducerUtils"

const removeHelpValue = (cells: SudokuCellArray, value?: number): SudokuCellArray => {
    return cells.map(cell => (
            {
                ...cell, 
                helpValue: cell.helpValue.filter(val => val !== value)
            }
        )
    )
}

export const removeValueFromHelpStrategy = (sudoku: SudokuCellArray, cell: Cell): History => {
    const id = uid();

    const modifiedBlockCells = removeHelpValue(getBlock(cell.blockNr, sudoku), cell.value);
    const modifiedColumnCells = removeHelpValue(getColumn(cell.columnNr, sudoku), cell.value);
    const modifiedRowCells = removeHelpValue(getRow(cell.rowNr, sudoku), cell.value);

    const changedCells = modifiedBlockCells
        .concat(modifiedColumnCells)
        .concat(modifiedRowCells)
        .map(cell => ({...cell, historyIds: [...cell.historyIds, id]}));

    console.log(changedCells);

    const newSudoku = updateSudoku(sudoku, changedCells);

    return {
        id,
        strategyNames: `remove value ${cell.value} from row=${cell.rowNr}, column=${cell.columnNr} and block`,
        oldSudoku: sudoku,
        cell,
        changedCells,
        newSudoku
    }
}