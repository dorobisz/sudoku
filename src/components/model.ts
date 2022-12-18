
export interface SudokuCellArray extends Array<SudokuCell>{}

export interface SudokuCell {
    blockNr: Number,
    rowNr: Number,
    columnNr: Number,
    value?: Number,
    helpValue?: Array<Number>
};