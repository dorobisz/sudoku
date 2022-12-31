import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cell, SudokuCellArray } from '../../../components/model'
import type { RootState } from '../../sotre'
import sudokuInitialState from './sudokuInitialState'

// Define a type for the slice state
export interface SudokuState {
    sudoku: SudokuCellArray
}


// Define the initial state using that type
const initialState: SudokuState = {
  sudoku: sudokuInitialState()
}

export const sudokuSlice = createSlice({
  name: 'sudokuReducer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<Cell>) => {
        const newCell: Cell = {...action.payload};
        state.sudoku = updateSudoku(state.sudoku, [newCell]);
    },

    update: (state, action:PayloadAction<Cell>) => {
      const newCell: Cell = {...action.payload};
      state.sudoku = updateSudoku(state.sudoku, [newCell]);
    },
  },
})

export const { setValue, update } = sudokuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSudoku = (state: RootState) => state.app.sudoku as SudokuCellArray

export default sudokuSlice.reducer;

const getSudokuArrayIndex = (cell: Cell) => cell.coordinates.columnNr + (9 * (cell.coordinates.rowNr - 1)) - 1 as number;

const updateSudoku = (sudoku: SudokuCellArray, cells: Array<Cell>): SudokuCellArray => {
  const newSudoku = [...sudoku];
  cells.forEach(cell => {
      newSudoku[getSudokuArrayIndex(cell)] = cell
  });
  return newSudoku;
};