import { Cell, Sudoku, Strategy } from "../components/model"

export default  (sudoku: Sudoku, cell: Cell): Strategy => {

    const addValueStrategy: Strategy = {
        strategyType: "major",
        description: `add value ${cell.value} in cell [${cell.coordinates.rowNr} ${cell.coordinates.columnNr}] `,
        clearedCells: [
            {
                coordinates: cell.coordinates, 
                removedHelpValues: [...cell.helpValue]
            }
        ]

    }

    return addValueStrategy;
}