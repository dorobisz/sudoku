import { SudokuCellArray } from "../components/model";

export const getBlock =  (blockNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.blockNr === blockNr);

export const getRow =  (rowNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.rowNr === rowNr);

export const getColumn =  (columnNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.columnNr === columnNr);