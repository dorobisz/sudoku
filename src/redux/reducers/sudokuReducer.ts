import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cell, SudokuCellArray } from '../../components/model'
import type { RootState } from '../sotre'
import store from '../sotre'
import sudokuInitialState from '../sudokuInitialState'
import { getSudokuArrayIndex, updateSudoku } from '../reducerUtils'

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
        const newCell = {...action.payload};
        state.sudoku = updateSudoku(state.sudoku, [newCell]);
    },
    clearHelpValue: (state, action:PayloadAction<Cell>) => {
        const newCell: Cell = {...action.payload, helpValue: []};
        state.sudoku = updateSudoku(state.sudoku, [newCell]);
    },

    setHelpValue: (state, action:PayloadAction<Cell>) => {
      const newCell: Cell = {...action.payload};
      state.sudoku = updateSudoku(state.sudoku, [newCell]);
    },
  },
})

export const { setValue, clearHelpValue, setHelpValue } = sudokuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSudoku = (state: RootState) => state.app.sudoku as SudokuCellArray

export default sudokuSlice.reducer