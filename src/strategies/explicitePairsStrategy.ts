import { Cell, SudokuCellArray, Strategy, StrategyCell } from "../components/model"
import { StrategyApi, StrategyFunction, createStrategyApi } from "./StrategyApi";
import {isEqual} from 'lodash'

export const detectPairs = (cells: SudokuCellArray, value?: number): Array<StrategyCell> => {
    
    const cellsWithPair = cells.filter(cell => cell.helpValue.length == 2)
    if(cellsWithPair.length > 1) {
        const pairs = cellsWithPair.map(cell => cell.helpValue);

        const pairMap = new Map();
        pairs.forEach(pair => {
            pairMap.set(pair, []);
            cellsWithPair.forEach(cell => {
                if(isEqual(cell.helpValue, pair)) {
                    pairMap.get(pair).push(cell)
                }
            })
        });

        const pairCells = [...new Set(Array.from(pairMap.values()).filter(cells => cells.length === 2).flat())];
        const pair = [...new Set(pairCells.map(cell => cell.helpValue).flat())];

        return cells
        .filter(cell => !pairCells.includes(cell))
        .filter(cell => cell.helpValue.filter(val => pair.includes(val)).length > 0)
        .map(cell => ({coordinates: cell.coordinates, removedHelpValues: cell.helpValue.filter(val => pair.includes(val))}))
    


       
    }
    return [];
}

const explicitePairsStrategy = (sudoku: SudokuCellArray, cell: Cell): Strategy => {

    const pairsStrategy: StrategyFunction = (cells: SudokuCellArray) => {
        return detectPairs(cells, cell.value);
    }

    const strategyApi: StrategyApi = createStrategyApi(sudoku, cell);
    strategyApi.setGlobalStrategy(pairsStrategy);
    const changedCells = strategyApi.execute();

    return {
        strategyType: "minor",
        // level: "basic",
        description: `detect pairs `,
        clearedCells: changedCells
    }
}

export default explicitePairsStrategy;