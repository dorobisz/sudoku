import { Cell, Coordinates, StrategyCell } from '../components/model';
import { calculateBlockNr } from '../redux/reducers/app/sudokuInitialState';
import {detectPairs} from './explicitePairsStrategy'

const createCell = (rowNr: number, columnNr: number, helpValue: Array<number>): Cell => (
  {
    coordinates:{rowNr, columnNr, blockNr: calculateBlockNr(rowNr, columnNr)}, 
    helpValue,
    historyIds:[],
    valueFocus:false,
  }
)

const createStrategyCell = (cell: Cell, removedHelpValues: Array<number>): StrategyCell => (
  {
    coordinates: cell.coordinates,
    removedHelpValues
  }
)

const createBlock = (helpValuesArray: Array<Array<number>>): Array<Cell> => {
  const result: Array<Cell>  = [];
  for(let row = 1; row<=3; row++) {
    for(let col = 1; col <= 3; col++){
      const index = (row-1)*3 + col -1;
      result.push(createCell(row, col, helpValuesArray[index]))
    }
  }
  return result;

}

test('removed pair help values 7 and 9 from other cells', () => {

    const block = createBlock([
      [6,7,9], [], [], [7,9], [], [4,7,9], [], [], [7,9]
    ]);

    const expected: Array<StrategyCell> = [
      createStrategyCell(block[0], [7,9]), 
      createStrategyCell(block[5], [7,9])
    ]

    const result =  detectPairs(block);
      expect(result).toEqual(expected);
    });