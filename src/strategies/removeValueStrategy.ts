import { Cell, SudokuCellArray, StrategyCell, Strategy } from "../components/model"
import { getBlock, getColumn, getRow } from "../utils/sudokuUtil"
import { createStrategyApi, StrategyApi, StrategyFunction } from "./StrategyApi"

const removeHelpValue = (cells: SudokuCellArray, value?: number): Array<StrategyCell> => {
    return cells
    .filter(cell => cell.value === undefined)
    .map(cell => (
            {
                coordinates: cell.coordinates, 
                removedHelpValues: cell.helpValue.filter(val => val === value)
            }
        )
    )
}



export const removeValueStrategy = (sudoku: SudokuCellArray, cell: Cell): Strategy => {

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