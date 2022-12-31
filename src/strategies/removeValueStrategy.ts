import { Cell, SudokuCellArray, StrategyCell, Strategy } from "../components/model"
import { getBlock, getColumn, getRow } from "../utils/sudokuUtil"

const removeHelpValue = (cells: SudokuCellArray, value?: number): Array<StrategyCell> => {
    return cells.map(cell => (
            {
                coordinates: cell.coordinates, 
                removedHelpValues: cell.helpValue.filter(val => val === value)
            }
        )
    )
}

export const removeValueStrategy = (sudoku: SudokuCellArray, cell: Cell): Strategy => {

    const modifiedBlockCells = removeHelpValue(getBlock(cell.coordinates.blockNr, sudoku), cell.value);
    const modifiedColumnCells = removeHelpValue(getColumn(cell.coordinates.columnNr, sudoku), cell.value);
    const modifiedRowCells = removeHelpValue(getRow(cell.coordinates.rowNr, sudoku), cell.value);

    const changedCells = modifiedBlockCells
        .concat(modifiedColumnCells)
        .concat(modifiedRowCells)
        .filter(changedCell => !(changedCell.coordinates.columnNr === cell.coordinates.columnNr && changedCell.coordinates.rowNr === cell.coordinates.rowNr))
  
    return {
        strategyType: "minor",
        description: `remove value ${cell.value}`,
        clearedCells: changedCells
    }
}