import { Strategy, Sudoku, History } from "../../../components/model";


export const createHistory = (strategy: Strategy, newSudoku: Sudoku, id: string): History => {
    return {
        id,
        strategy,
        newSudoku,
        isPinned: false
    }
}