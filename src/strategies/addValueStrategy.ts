import { Cell, SudokuCellArray, Strategy } from "../components/model"

export const addValueStrategy = (sudoku: SudokuCellArray, cell: Cell): Strategy => {

    return {
        description: `add value ${cell.value} in cell [${cell.coordinates.rowNr} ${cell.coordinates.columnNr}] `,
        clearedCells: [
            {
                coordinates: cell.coordinates, 
                removedHelpValues: [...cell.helpValue]
            }
        ]

    }
}