import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearLine } from 'readline'
import { Cell, NavigationType, SudokuCellArray } from '../../../components/model'
import type { RootState } from '../../sotre'
import { updateNavigation } from './navigationUpdater'
import sudokuInitialState from './sudokuInitialState'

// Define a type for the slice state
export interface SudokuState {
    sudoku: SudokuCellArray
}


// Define the initial state using that type
const initialState: SudokuState = {
  sudoku: sudokuInitialState()
}

export interface NavigationPayload {
  cell: Cell,
  navigationType: NavigationType
}

export const sudokuSlice = createSlice({
  name: 'sudokuReducer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<Cell>) => {
        const currentCell: Cell = {
          ...action.payload, 
          valueFocus: false
        };
        let nextCell = getNextFocusCell(state.sudoku, currentCell);

        state.sudoku = updateSudoku(state.sudoku, nextCell? [currentCell, nextCell] : [currentCell]);
        
    },

    setValueFocus: (state, action: PayloadAction<NavigationPayload>) => {
      const {cell, navigationType} = action.payload;
      const cellToUpdates: Array<Cell> = updateNavigation(state.sudoku, cell, navigationType);
      state.sudoku = updateSudoku(state.sudoku, cellToUpdates);
    },
    
    resetValueFocus:(state, action: PayloadAction<Cell>) => {
      const cell: Cell = {...action.payload, valueFocus: false}
      state.sudoku = updateSudoku(state.sudoku, [cell]);
    },

    update: (state, action:PayloadAction<Cell>) => {
      state.sudoku = updateSudoku(state.sudoku, [action.payload]);
    },
  },
})

export const { setValue, update, setValueFocus, resetValueFocus } = sudokuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSudoku = (state: RootState) => state.app.sudoku as SudokuCellArray

export default sudokuSlice.reducer;

const getSudokuArrayIndex = (cell: Cell) => cell.coordinates.columnNr + (9 * (cell.coordinates.rowNr - 1)) - 1 as number;

const getNextFocusCell = (sudoku: SudokuCellArray, cell: Cell, currentIndex?: number): Cell | undefined => {
    const initIndex = getSudokuArrayIndex(cell);
    const sudokuIndex = ((currentIndex !== undefined ? currentIndex : initIndex) + 1) % 81;
    if(initIndex === sudokuIndex){
      return undefined;
    }
    const nextCell = sudoku[sudokuIndex];
    return nextCell.value ? getNextFocusCell(sudoku, cell, sudokuIndex) : {...nextCell, valueFocus: true};
}

const updateSudoku = (sudoku: SudokuCellArray, cells: Array<Cell>): SudokuCellArray => {
  const newSudoku = [...sudoku]
  cells.forEach(cell => {
      newSudoku[getSudokuArrayIndex(cell)] = cell
  });
  return newSudoku;
};