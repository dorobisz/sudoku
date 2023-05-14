import { Coordinates } from '../../../components/model';
import {calculateBlockNr} from './sudokuInitialState'

test('renders learn react link', () => {

    const expectedCoordinates: Array<Coordinates> = [
        {rowNr:1, columnNr:1, blockNr:1},
        {rowNr:1, columnNr:2, blockNr:1},
        {rowNr:1, columnNr:3, blockNr:1},
        {rowNr:1, columnNr:4, blockNr:2},
        {rowNr:1, columnNr:5, blockNr:2},
        {rowNr:1, columnNr:6, blockNr:2},
        {rowNr:1, columnNr:7, blockNr:3},
        {rowNr:1, columnNr:8, blockNr:3},
        {rowNr:1, columnNr:9, blockNr:3},

        {rowNr:2, columnNr:1, blockNr:1},
        {rowNr:2, columnNr:2, blockNr:1},
        {rowNr:2, columnNr:3, blockNr:1},
        {rowNr:2, columnNr:4, blockNr:2},
        {rowNr:2, columnNr:5, blockNr:2},
        {rowNr:2, columnNr:6, blockNr:2},
        {rowNr:2, columnNr:7, blockNr:3},
        {rowNr:2, columnNr:8, blockNr:3},
        {rowNr:2, columnNr:9, blockNr:3},

        {rowNr:3, columnNr:1, blockNr:1},
        {rowNr:3, columnNr:2, blockNr:1},
        {rowNr:3, columnNr:3, blockNr:1},
        {rowNr:3, columnNr:4, blockNr:2},
        {rowNr:3, columnNr:5, blockNr:2},
        {rowNr:3, columnNr:6, blockNr:2},
        {rowNr:3, columnNr:7, blockNr:3},
        {rowNr:3, columnNr:8, blockNr:3},
        {rowNr:3, columnNr:9, blockNr:3},

        {rowNr:4, columnNr:1, blockNr:4},
        {rowNr:4, columnNr:2, blockNr:4},
        {rowNr:4, columnNr:3, blockNr:4},
        {rowNr:4, columnNr:4, blockNr:5},
        {rowNr:4, columnNr:5, blockNr:5},
        {rowNr:4, columnNr:6, blockNr:5},
        {rowNr:4, columnNr:7, blockNr:6},
        {rowNr:4, columnNr:8, blockNr:6},
        {rowNr:4, columnNr:9, blockNr:6},

        {rowNr:5, columnNr:1, blockNr:4},
        {rowNr:5, columnNr:2, blockNr:4},
        {rowNr:5, columnNr:3, blockNr:4},
        {rowNr:5, columnNr:4, blockNr:5},
        {rowNr:5, columnNr:5, blockNr:5},
        {rowNr:5, columnNr:6, blockNr:5},
        {rowNr:5, columnNr:7, blockNr:6},
        {rowNr:5, columnNr:8, blockNr:6},
        {rowNr:5, columnNr:9, blockNr:6},

        {rowNr:6, columnNr:1, blockNr:4},
        {rowNr:6, columnNr:2, blockNr:4},
        {rowNr:6, columnNr:3, blockNr:4},
        {rowNr:6, columnNr:4, blockNr:5},
        {rowNr:6, columnNr:5, blockNr:5},
        {rowNr:6, columnNr:6, blockNr:5},
        {rowNr:6, columnNr:7, blockNr:6},
        {rowNr:6, columnNr:8, blockNr:6},
        {rowNr:6, columnNr:9, blockNr:6},

        {rowNr:7, columnNr:1, blockNr:7},
        {rowNr:7, columnNr:2, blockNr:7},
        {rowNr:7, columnNr:3, blockNr:7},
        {rowNr:7, columnNr:4, blockNr:8},
        {rowNr:7, columnNr:5, blockNr:8},
        {rowNr:7, columnNr:6, blockNr:8},
        {rowNr:7, columnNr:7, blockNr:9},
        {rowNr:7, columnNr:8, blockNr:9},
        {rowNr:7, columnNr:9, blockNr:9},

        {rowNr:8, columnNr:1, blockNr:7},
        {rowNr:8, columnNr:2, blockNr:7},
        {rowNr:8, columnNr:3, blockNr:7},
        {rowNr:8, columnNr:4, blockNr:8},
        {rowNr:8, columnNr:5, blockNr:8},
        {rowNr:8, columnNr:6, blockNr:8},
        {rowNr:8, columnNr:7, blockNr:9},
        {rowNr:8, columnNr:8, blockNr:9},
        {rowNr:8, columnNr:9, blockNr:9},

        {rowNr:9, columnNr:1, blockNr:7},
        {rowNr:9, columnNr:2, blockNr:7},
        {rowNr:9, columnNr:3, blockNr:7},
        {rowNr:9, columnNr:4, blockNr:8},
        {rowNr:9, columnNr:5, blockNr:8},
        {rowNr:9, columnNr:6, blockNr:8},
        {rowNr:9, columnNr:7, blockNr:9},
        {rowNr:9, columnNr:8, blockNr:9},
        {rowNr:9, columnNr:9, blockNr:9},
        
    ]

    expectedCoordinates.forEach(coordinates => {
        const result = calculateBlockNr(coordinates.rowNr, coordinates.columnNr);
        console.log(coordinates, result, coordinates.blockNr === result)
        expect(result).toEqual(coordinates.blockNr)
    }
        )
      });