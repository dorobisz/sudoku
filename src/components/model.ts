
export interface SudokuCellArray extends Array<Cell>{}

export interface Coordinates {
    blockNr: number,
    rowNr: number,
    columnNr: number,
}

export interface Cell {
    coordinates: Coordinates,
    value?: number,
    helpValue: Array<number>
    historyIds: Array<string>
};

export interface HistoryArray extends Array<History>{}

export interface History {
    id: string,
    strategy: Strategy,
    newSudoku: SudokuCellArray
}

export interface Strategy {
    description: string,
    clearedCells: Array<StrategyCell>
}

export interface StrategyCell {
    coordinates: Coordinates,
    removedHelpValues: Array<number>
}