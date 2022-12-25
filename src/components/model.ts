
export interface SudokuCellArray extends Array<Cell>{}

export interface Cell {
    blockNr: number,
    rowNr: number,
    columnNr: number,
    value?: number,
    helpValue: Array<number>
    historyIds: Array<string>
};

export interface HistoryArray extends Array<History>{}

export interface History {
    id: string,
    strategyNames: string,
    oldSudoku: SudokuCellArray,
    cell: Cell,
    changedCells: SudokuCellArray,
    newSudoku: SudokuCellArray
}