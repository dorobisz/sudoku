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

    const modifiedBlockCells = removeHelpValue(getBlock(cell.coordinates.blockNr, sudoku), cell.value);
    const modifiedColumnCells = removeHelpValue(getColumn(cell.coordinates.columnNr, sudoku), cell.value);
    const modifiedRowCells = removeHelpValue(getRow(cell.coordinates.rowNr, sudoku), cell.value);

    const changedCells = modifiedBlockCells
        .concat(modifiedColumnCells)
        .concat(modifiedRowCells)
        .filter(changedCell => !(changedCell.coordinates.columnNr === cell.coordinates.columnNr && changedCell.coordinates.rowNr === cell.coordinates.rowNr))
        .map(cell => ({...cell, historyIds: [...cell.historyIds, id]}));

    const newSudoku = updateSudoku(sudoku, changedCells);

    return {
        id,
        description: `remove value ${cell.value} from row=${cell.coordinates.rowNr}, column=${cell.coordinates.columnNr} and block`,
        oldSudoku: sudoku,
        cell,
        changedCells,
        newSudoku
    }
}