import { Cell, SudokuCellArray, Strategy } from "../components/model"

export default  (sudoku: SudokuCellArray, cell: Cell): Strategy => {

    return {
        strategyType: "major",
        description: `add value ${cell.value} in cell [${cell.coordinates.rowNr} ${cell.coordinates.columnNr}] `,
        clearedCells: [
            {
                coordinates: cell.coordinates, 
                removedHelpValues: [...cell.helpValue]
            }
        ]

    }
}