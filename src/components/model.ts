
export interface SudokuCellArray extends Array<Cell>{}

export interface Cell {
    blockNr: number,
    rowNr: number,
    columnNr: number,
    value?: number,
    helpValue?: Array<number>
};