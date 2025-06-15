import { Sudoku } from "../../../components/model";


const calculateIndex = function (row: number, column: number): number {
    const rowIdx = row - 1;
    const colIdx = column - 1;
    return rowIdx * 9 + colIdx;
  }; 

  export const calculateBlockNr = (row: number, column: number): number => {
    const majorRow = Math.floor((row -1)/ 3);
    const  majorCol = Math.floor((column -1)/ 3);
    return (majorRow % 3)*3 + majorCol + 1;
  }

const sudokuInitialState = (): Sudoku => {
    const initState: Sudoku = [];

    for(let row = 1; row < 10; row++ ) {
        for(let column = 1; column < 10; column++){
            initState[calculateIndex(row, column)] = {
                coordinates: {
                  blockNr:calculateBlockNr(row, column), 
                  rowNr: row,
                  columnNr: column,
                },
                helpValue:[1,2,3,4,5,6,7,8,9],
                historyIds: [],
                valueFocus: false
            }
        }
    }
    initState[0] = {...initState[0], valueFocus: true}
    return initState;
  }


export default sudokuInitialState;