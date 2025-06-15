import { Cell, Sudoku, StrategyCell, Strategy } from "../components/model"
import { createStrategyApi, StrategyApi, StrategyFunction } from "./StrategyApi"
const removeValueStrategy = (sudoku: Sudoku, cell: Cell): Strategy => {
const removeHelpValue = (cells: Sudoku, value?: number): Array<StrategyCell> => {
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





    const removeStrategy: StrategyFunction = (cells: Sudoku) => {
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
export default removeValueStrategy;