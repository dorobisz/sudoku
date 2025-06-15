import { Cell, Sudoku, Strategy, StrategyCell } from "../components/model"
import { StrategyApi, StrategyFunction, createStrategyApi } from "./StrategyApi"
 
const onePosibility = (cells: Sudoku, value?: number): Array<StrategyCell> => {
    const oneHelpValues = [1,2,3,4,5,6,7,8,9]
    .map((value) => cells.filter(cell => cell.helpValue.includes(value)).length)
    .map((value, index) => value === 1 ? index+1 : 0)
    .map(helpValue => cells.filter(cell => cell.helpValue.includes(helpValue)))
    .map((cellsWithOneValue, index) => cellsWithOneValue
        .map(cellWithValue => (
            {
                ...cellWithValue, 
                helpValue: cellWithValue.helpValue.filter(value => value !== (index + 1)) 
            }
            )
        )
    )
    .flat()
    .filter(cell=> cell.helpValue.length !== 0)
   
    return oneHelpValues.map(cell => ({coordinates: cell.coordinates, removedHelpValues: cell.helpValue}));
}

export default(sudoku: Sudoku, cell: Cell): Strategy => {

    const onePosibilityStrategy: StrategyFunction = (cells: Sudoku) => {
        return onePosibility(cells, cell.value);
    }

    const strategyApi: StrategyApi = createStrategyApi(sudoku, cell);
    strategyApi.setGlobalStrategy(onePosibilityStrategy);
    const changedCells = strategyApi.execute();

    return {
        strategyType: "minor",
        description: `In cell [${cell.coordinates.rowNr} ${cell.coordinates.columnNr}] is only one posiblitity value `,
        clearedCells: changedCells
    }
}