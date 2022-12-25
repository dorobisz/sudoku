import { Cell, SudokuCellArray } from "../components/model";

export const getBlock =  (blockNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.blockNr === blockNr);

export const getRow =  (rowNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.rowNr === rowNr);

export const getColumn =  (columnNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.columnNr === columnNr);

export const getCell = (colNr: number, rowNr: number, sudoku: SudokuCellArray): Cell | undefined=> 
    sudoku.find(cell => cell.columnNr === colNr && cell.rowNr === rowNr)