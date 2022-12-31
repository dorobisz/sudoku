import { isJSDocThisTag } from "typescript";
import { Cell, SudokuCellArray } from "../components/model";

export const getSudokuArrayIndex = (cell: Cell) => cell.coordinates.columnNr + (9 * (cell.coordinates.rowNr - 1)) - 1 as number;

export const updateSudoku = (sudoku: SudokuCellArray, cells: Array<Cell>): SudokuCellArray => {
    const newSudoku = [...sudoku];
    cells.forEach(cell => {
        newSudoku[getSudokuArrayIndex(cell)] = cell
    });
    return newSudoku;
};

export const addHistoryId = (cell: Cell, historyId: string): Cell => {
    return {...cell,historyIds: [...cell.historyIds, historyId]};
}



export const uid = (): string =>
String(
  Date.now().toString(32) +
    Math.random().toString(16)
).replace(/\./g, '')