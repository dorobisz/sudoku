import { SudokuCellArray } from "../components/model";


const calculateIndex = function (row: number, column: number): number {
    const rowIdx = row - 1;
    const colIdx = column - 1;
    return rowIdx * 9 + colIdx;
  }; 

const calculateBlockNr = (row: number, column: number): number => {
    const divRow = Math.ceil(~~row / 3);
    const divCol = Math.ceil(~~column / 3);
  return parseInt(`${divRow}${divCol}`);
}


const sudokuInitialState = (): SudokuCellArray => {
    const initState: SudokuCellArray = [];

    for(let row = 1; row < 10; row++ ) {
        for(let column = 1; column < 10; column++){
            initState[calculateIndex(row, column)] = {
                blockNr:calculateBlockNr(row, column), 
                rowNr: row,
                columnNr: column,
                helpValue:[1,2,3,4,5,6,7,8,9],
                historyIds: []
            }
        }
    }
    return initState;
  }


export default sudokuInitialState;