import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Cell, NavigationType, Sudoku, History } from '../../../components/model'
import type { RootState } from '../../sotre'
import { updateNavigation } from './navigationUpdater'
import sudokuInitialState from './sudokuInitialState'
import { generateFullSudoku, removeCells } from './sudokuGenerator'

// Define a type for the slice state
export interface SudokuState {
    sudoku: Sudoku
}


// Define the initial state using that type
const initialState: SudokuState = {
  sudoku: sudokuInitialState()
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

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

    generateSudoku: (state, action: PayloadAction<DifficultyLevel>) => {
      const difficulty = action.payload;
      let cellsToRemove: number;

      switch (difficulty) {
        case 'easy':
          cellsToRemove = Math.floor(Math.random() * (56 - 45 + 1)) + 45; // 45-55 filled cells
          break;
        case 'medium':
          cellsToRemove = Math.floor(Math.random() * (46 - 35 + 1)) + 35; // 35-45 filled cells
          break;
        case 'hard':
          cellsToRemove = Math.floor(Math.random() * (36 - 25 + 1)) + 25; // 25-35 filled cells
          break;
        default:
          cellsToRemove = 40; // Default to medium
      }
      const emptyBoard = sudokuInitialState();
      const fullBoard = generateFullSudoku(emptyBoard);
      state.sudoku = removeCells(fullBoard!, 81 - cellsToRemove); // remove 81 - cellsToRemove cells to get the desired number of filled cells
    },

    clearSudoku: (state) => {
      state.sudoku = sudokuInitialState();
    },
  },
})

export const { setValue, updateAll, setNextValueFocus, resetValueFocus, addSelectedHistory, removeSelectedHistory, generateSudoku, clearSudoku } = sudokuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSudoku = (state: RootState) => state.app.sudoku

export default sudokuSlice.reducer;

const getSudokuArrayIndex = (cell: Cell) => cell.coordinates.columnNr - 1 + (9 * (cell.coordinates.rowNr - 1));

const getNextFocusCell = (sudoku: Sudoku, cell: Cell, currentIndex?: number): Cell | undefined => {
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

const clearSelectedHistoryForAll = (sudoku: Sudoku): Sudoku => {
  return sudoku.map(cell => ({...cell, selectedHistory: undefined}))
}