import { Strategy, SudokuCellArray, History } from "../../../components/model";




export const createHistory = (strategy: Strategy, newSudoku: SudokuCellArray, id: string): History => {
    return {
        id,
        strategy,
        newSudoku,
        isPinned: false
    }
}