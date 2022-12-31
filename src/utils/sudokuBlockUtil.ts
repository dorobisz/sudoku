import { Cell, SudokuCellArray } from "../components/model";

export const getBlock =  (blockNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.coordinates.blockNr === blockNr);

export const getRow =  (rowNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.coordinates.rowNr === rowNr);

export const getColumn =  (columnNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.coordinates.columnNr === columnNr);

export const getCell = (colNr: number, rowNr: number, sudoku: SudokuCellArray): Cell | undefined=> 
    sudoku.find(cell => cell.coordinates.columnNr === colNr && cell.coordinates.rowNr === rowNr)