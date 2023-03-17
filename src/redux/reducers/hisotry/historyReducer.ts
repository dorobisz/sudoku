import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cell, History, HistoryArray, SudokuCellArray } from '../../../components/model'
import type { RootState } from '../../sotre'


// Define a type for the slice state
export interface HistoryState {
    values: HistoryArray
}


// Define the initial state using that type
const initialState: HistoryState = {
  values: [],
}

export const sudokuSlice = createSlice({
  name: 'historyReducer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<History>) => {
        const history = action.payload;
        state.values = [...state.values, history];
    },
    updateHistory: (state, action: PayloadAction<History>) => {
      const history = action.payload;
      state.values = update(state.values, history);
      

      
    }
  },
})

export const { addHistory, updateHistory } = sudokuSlice.actions;

const findHistoryIdx = (histories: HistoryArray, id: String): number => {
  return histories.findIndex(history=> history.id === id)
};

const update = (histories: HistoryArray, history: History): HistoryArray => {
    const idx = findHistoryIdx(histories, history.id);
    const result = [...histories];
    result[idx] = history;
    return result;
}



// Other code such as selectors can use the imported `RootState` type
export const selectHistory = (state: RootState) => state.history.values as HistoryArray

export default sudokuSlice.reducer