import { Cell, StrategyCell, Sudoku } from "../components/model";
import { getCellFromSudoku, clearValues } from "../utils/sudokuUtil";

export const updateCells = (sudoku: Sudoku, strategyCells: Array<StrategyCell>, historyId: string): Array<Cell> => {
    return strategyCells.map(strategyCell => {
        const cell =  getCellFromSudoku(strategyCell.coordinates, sudoku);
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