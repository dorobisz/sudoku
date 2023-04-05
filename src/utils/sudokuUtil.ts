import { Cell, Coordinates, SudokuCellArray } from "../components/model";

export const getBlock =  (blockNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.coordinates.blockNr === blockNr).map(cell => ({...cell}));

export const getRow =  (rowNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.coordinates.rowNr === rowNr).map(cell => ({...cell}));;

export const getColumn =  (columnNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.coordinates.columnNr === columnNr).map(cell => ({...cell}));

export const getCellFromSudoku = (coordinates: Coordinates, sudoku: SudokuCellArray): Cell=> (
    {...sudoku.filter(
        cell => cell.coordinates.columnNr === coordinates.columnNr 
        && cell.coordinates.rowNr === coordinates.rowNr)[0]}
);

export const getCell = (coordinates: Coordinates, cells: Array<Cell>): Cell => (
    {...cells.filter(
        cell => cell.coordinates.columnNr === coordinates.columnNr 
        && cell.coordinates.rowNr === coordinates.rowNr)[0]}
);

export const clearValues = (allValues: Array<number>, valuesToDelete: Array<number>): Array<number> => {
    return allValues.filter(value => !valuesToDelete.includes(value));
}