import { SudokuCellArray } from "../components/model";


const calculateIndex = function (row: number, column: number): number {
    const rowIdx = row - 1;
    const colIdx = column - 1;
    return rowIdx * 9 + colIdx;
  }; 


const sudokuInitialState = (): SudokuCellArray => {
    const initState: SudokuCellArray = [];

    for(let row = 1; row < 10; row++ ) {
        for(let column = 1; column < 10; column++){
            initState[calculateIndex(row, column)] = {
                blockNr:1, 
                rowNr: row,
                columnNr: column, 
            }
        }
    }
    return initState;
  }


export default sudokuInitialState;