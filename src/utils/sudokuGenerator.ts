import { Sudoku, Cell } from '../components/model';


export function removeCells(sudoku: Sudoku, cellsToRemove: number): Sudoku {
  const newSudoku = [...sudoku];
  let removedCount = 0;
  const cells = Array.from({ length: 81 }, (_, i) => i);
  shuffleArray(cells);

  for (const cellIndex of cells) {
    if (removedCount >= cellsToRemove) {
      break;
    }

    const value = newSudoku[cellIndex].value;
    if (value !== undefined) {
      newSudoku[cellIndex] = { ...newSudoku[cellIndex], value: undefined };

      if (!hasUniqueSolution(newSudoku)) {
        newSudoku[cellIndex] = { ...newSudoku[cellIndex], value: value }; // Backtrack if no unique solution
      } else {
        removedCount++;
      }
    }
  }

  return newSudoku;
}

function shuffleArray(array: number[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function hasUniqueSolution(sudoku: Sudoku): boolean {
  let solutionsCount = 0;
  solveSudoku(sudoku, (solution) => { solutionsCount++; return solutionsCount === 2; }); // Stop if more than one solution is found
  return solutionsCount === 1;
}
export function generateFullSudoku(sudoku: Sudoku): Sudoku | null {
  const newSudoku = [...sudoku];
  const emptyCell = findEmptyCell(newSudoku);

  if (!emptyCell) {
    return newSudoku; // Sudoku is full
  }

  for (let num = 1; num <= 9; num++) {
    if (isValid(newSudoku, emptyCell.coordinates.rowNr, emptyCell.coordinates.columnNr, num)) {
      const cellIndex = getSudokuArrayIndex(emptyCell);
      newSudoku[cellIndex] = { ...newSudoku[cellIndex], value: num };

      if (generateFullSudoku(newSudoku) !== null) {
        return newSudoku;
      }

      newSudoku[cellIndex] = { ...newSudoku[cellIndex], value: undefined }; // Backtrack
    }
  }

  return null; // No solution found
}

function solveSudoku(sudoku: Sudoku, callback: (solution: Sudoku) => boolean): boolean {
  const newSudoku = [...sudoku];
  const emptyCell = findEmptyCell(newSudoku);

  if (!emptyCell) {
    return callback(newSudoku); // Found a solution
  }

  for (let num = 1; num <= 9; num++) {
    if (isValid(newSudoku, emptyCell.coordinates.rowNr, emptyCell.coordinates.columnNr, num)) {
      const cellIndex = getSudokuArrayIndex(emptyCell);
      newSudoku[cellIndex] = { ...newSudoku[cellIndex], value: num };
      if (solveSudoku(newSudoku, callback)) return true; // Stop if callback returns true
      newSudoku[cellIndex] = { ...newSudoku[cellIndex], value: undefined }; // Backtrack
    }
  }
  return false; // No solution found
}

function findEmptyCell(sudoku: Sudoku): Cell | undefined {
  for (let i = 0; i < 81; i++) {
    if (sudoku[i].value === undefined) {
      return sudoku[i];
    }
  }
  return undefined;
}

function isValid(sudoku: Sudoku, row: number, col: number, num: number): boolean {
  // Check row
  for (let c = 1; c <= 9; c++) {
    const cellIndex = getSudokuArrayIndex({ coordinates: { blockNr: sudoku.find(cell => cell.coordinates.rowNr === row && cell.coordinates.columnNr === c)?.coordinates.blockNr || 0, rowNr: row, columnNr: c }, helpValue: [], historyIds: [], valueFocus: false });
    if (sudoku[cellIndex].value === num) {
      return false;
    }
  }

  // Check column
  for (let r = 1; r <= 9; r++) {
    const cellIndex = getSudokuArrayIndex({ coordinates: { blockNr: sudoku.find(cell => cell.coordinates.rowNr === r && cell.coordinates.columnNr === col)?.coordinates.blockNr || 0, rowNr: r, columnNr: col }, helpValue: [], historyIds: [], valueFocus: false });
    if (sudoku[cellIndex].value === num) {
      return false;
    }
  }

  // Check block
  const startRow = row - (row - 1) % 3;
  const startCol = col - (col - 1) % 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const cellIndex = getSudokuArrayIndex({ coordinates: { blockNr: 0, rowNr: startRow + r, columnNr: startCol + c }, helpValue: [], historyIds: [], valueFocus: false }); // blockNr is dummy here
      if (sudoku[getSudokuArrayIndex({ coordinates: { blockNr: sudoku[cellIndex].coordinates.blockNr, rowNr: startRow + r, columnNr: startCol + c }, helpValue: [], historyIds: [], valueFocus: false })].value === num) {
        return false;
      }
    }
  }

  return true;
}

function getSudokuArrayIndex(cell: Cell): number {
    return cell.coordinates.columnNr - 1 + (9 * (cell.coordinates.rowNr - 1));
}