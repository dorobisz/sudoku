import { Cell, SudokuCellArray } from "../components/model";

export const getSudokuArrayIndex = (cell: Cell) => cell.columnNr + (9 * (cell.rowNr - 1)) - 1 as number;

export const updateSudoku = (sudoku: SudokuCellArray, cells: Array<Cell>): SudokuCellArray => {
    const newSudoku = [...sudoku];
    cells.forEach(cell => {
        newSudoku[getSudokuArrayIndex(cell)] = cell
    });
    return newSudoku;
};


export const uid = (): string =>
String(
  Date.now().toString(32) +
    Math.random().toString(16)
).replace(/\./g, '')