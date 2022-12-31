import { Cell, StrategyCell, SudokuCellArray } from "../components/model";
import { getCell } from "../utils/sudokuUtil";

const clearValues = (allValues: Array<number>, valuesToDelete: Array<number>): Array<number> => {
    return allValues.filter(value => !valuesToDelete.includes(value));
}

export const updateCells = (sudoku: SudokuCellArray, strategyCells: Array<StrategyCell>, historyId: string): Array<Cell> => {
    return strategyCells.map(strategyCell => {
        const cell =  getCell(strategyCell.coordinates, sudoku);
        return {
            ...cell, 
            helpValue: clearValues(cell.helpValue, strategyCell.removedHelpValues),
            historyIds: [...cell.historyIds, historyId]
        };

    });
}

export const uid = (): string =>
  String(
    Date.now().toString(32) +
      Math.random().toString(16)
).replace(/\./g, '');