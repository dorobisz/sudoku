import { Cell, SudokuCellArray, StrategyCell, Strategy } from "../components/model"
import { getBlock, getColumn, getRow } from "../utils/sudokuUtil"
import { createStrategyApi, StrategyApi, StrategyFunction } from "./StrategyApi"

const removeHelpValue = (cells: SudokuCellArray, value?: number): Array<StrategyCell> => {
    if (value == undefined) {
     return []
    }
    return cells
    .filter(cell => cell.helpValue.includes(value))
    .map(cell => (
            {
                coordinates: cell.coordinates, 
                removedHelpValues: cell.helpValue.filter(val => val === value)
            }
        )
    )
}



export default (sudoku: SudokuCellArray, cell: Cell): Strategy => {

    const removeStrategy: StrategyFunction = (cells: SudokuCellArray) => {
        return removeHelpValue(cells, cell.value);
    }

    const strategyApi: StrategyApi = createStrategyApi(sudoku, cell);
    strategyApi.setGlobalStrategy(removeStrategy);
    const changedCells = strategyApi.execute();

    return {
        strategyType: "minor",
        description: `remove value ${cell.value}`,
        clearedCells: changedCells
    }
}