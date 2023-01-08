import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cell, History, HistoryArray, SudokuCellArray } from '../../../components/model'
import type { RootState } from '../../sotre'


// Define a type for the slice state
export interface AnalyzatorState {
    selectedHistory?: {id: String},
    selectedCell?: Cell
}

const isNewHistory = (state: AnalyzatorState, id: string): boolean => state.selectedHistory?.id !== id;


// Define the initial state using that type
const initialState: AnalyzatorState = {
  selectedHistory: undefined,
  selectedCell: undefined
}

export const analyzatorSlice = createSlice({
  name: 'analyzatorReducer',
  initialState,
  reducers: {
    selectCell: (state, action: PayloadAction<Cell>) => {
        state.selectedCell = action.payload;
        state.selectedHistory = undefined;
    },
    selectHistory: (state, action: PayloadAction<History>) => {
        const historyId = action.payload.id;
        state.selectedHistory = isNewHistory(state, historyId) ?  {id: action.payload.id} : undefined;
    }
  },
})

export const { selectCell, selectHistory } = analyzatorSlice.actions;




// Other code such as selectors can use the imported `RootState` type
export const selectAnalyzator = (state: RootState) => state.analyzator as AnalyzatorState

export default analyzatorSlice.reducer