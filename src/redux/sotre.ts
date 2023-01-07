import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SudokuReducer from "./reducers/app/sudokuReducer";
import HistoryReducer from "./reducers/hisotry/historyReducer"

const reducers = combineReducers({
    app: SudokuReducer,
    history: HistoryReducer
});

const store = configureStore({
    reducer: reducers,

});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;

