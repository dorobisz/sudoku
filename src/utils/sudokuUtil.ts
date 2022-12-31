import { Cell, Coordinates, SudokuCellArray } from "../components/model";

export const getBlock =  (blockNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.coordinates.blockNr === blockNr);

export const getRow =  (rowNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.coordinates.rowNr === rowNr);

export const getColumn =  (columnNr: Number, sudoku: SudokuCellArray): SudokuCellArray => 
    sudoku.filter(cell => cell.coordinates.columnNr === columnNr);

export const getCell = (coordinates: Coordinates, sudoku: SudokuCellArray): Cell=> 
    sudoku.filter(cell => cell.coordinates.columnNr === coordinates.columnNr && cell.coordinates.rowNr === coordinates.rowNr)[0];