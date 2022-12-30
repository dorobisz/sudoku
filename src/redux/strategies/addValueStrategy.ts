import { Cell, SudokuCellArray, History } from "../../components/model"
import { addHistoryId, uid, updateSudoku } from "../reducerUtils"

export const addValueStrategy = (sudoku: SudokuCellArray, cell: Cell, newSudoku: SudokuCellArray): History => {
    const id = uid();
    const changedCells = [addHistoryId(cell, id)];

    return {
        id,
        description: `add value ${cell.value} in cell [${cell.rowNr} ${cell.columnNr}] `,
        oldSudoku: sudoku,
        cell,
        changedCells,
        newSudoku
    }
}