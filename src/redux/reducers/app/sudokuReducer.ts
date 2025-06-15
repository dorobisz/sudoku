import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Cell, NavigationType, SudokuCellArray, History } from '../../../components/model'
import type { RootState } from '../../sotre'
import { updateNavigation } from './navigationUpdater'
import sudokuInitialState from './sudokuInitialState'

// Define a type for the slice state
export interface SudokuState {
    sudoku: Sudoku
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
          helpValue: [],
          valueFocus: false
        };
        let nextCell = getNextFocusCell(state.sudoku, currentCell);

        state.sudoku = updateSudoku(state.sudoku, nextCell? [currentCell, nextCell] : [currentCell]);
        
    },

    setNextValueFocus: (state, action: PayloadAction<NavigationPayload>) => {
        const {cell, navigationType} = action.payload;
      const cellToUpdates: Array<Cell> = updateNavigation(state.sudoku, cell, navigationType);
      state.sudoku = updateSudoku(state.sudoku, cellToUpdates);
    },
    
    resetValueFocus:(state, action: PayloadAction<Cell>) => {
      const cell: Cell = {...action.payload, valueFocus: false}
      state.sudoku = updateSudoku(state.sudoku, [cell]);
    },

    updateAll: (state, action:PayloadAction<Cell[]>) => {
      state.sudoku = updateSudoku(state.sudoku, action.payload);
    },

    addSelectedHistory:  (state, action:PayloadAction<History>) => {
      const history = action.payload;
      const cells = findCellsWithHistoryId(state.sudoku, history);
      const clearedSudoku = clearSelectedHistoryForAll(state.sudoku);
      state.sudoku = updateSudoku(clearedSudoku,cells.map(cell => ({...cell, selectedHistory: history})));
    },
    removeSelectedHistory:  (state) => {
      state.sudoku = clearSelectedHistoryForAll(state.sudoku);
    },
  },
})

export const { setValue, updateAll, setNextValueFocus, resetValueFocus, addSelectedHistory, removeSelectedHistory } = sudokuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSudoku = (state: RootState) => state.app.sudoku as Sudoku

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

const updateSudoku = (sudoku: Sudoku, cells: Array<Cell>): Sudoku => {
  const newSudoku = [...sudoku]
  cells.forEach(cell => {
      newSudoku[getSudokuArrayIndex(cell)] = cell
  });
  return newSudoku;
};
const findCellsWithHistoryId = (sudoku: Sudoku, history: History): Array<Cell> => {
    return sudoku.filter(cell => cell.historyIds.includes(history.id))
}

const clearSelectedHistoryForAll = (sudoku: SudokuCellArray): SudokuCellArray => {
  return sudoku.map(cell => ({...cell, selectedHistory: undefined}))
}