import { Cell, Coordinates, NavigationType, Sudoku } from "../../../components/model";
import { getColumn, getRow } from "../../../utils/sudokuUtil";

const getCellsArray = (sudoku: Sudoku, coordinates: Coordinates, navigationType: NavigationType): Array<Cell> => {
    switch(navigationType) {
        case "ArrowDown":
            return getColumn(coordinates.columnNr, sudoku);
        case "ArrowUp":
            return getColumn(coordinates.columnNr, sudoku).reverse();
        case "ArrowLeft":
            return getRow(coordinates.rowNr, sudoku).reverse();
        case "ArrowRight":
            return getRow(coordinates.rowNr, sudoku);
    }
}

const getInitIndex = (coordinates: Coordinates, navigationType: NavigationType): number => {
    switch(navigationType) {
        case "ArrowDown":
            return coordinates.rowNr - 1;
        case "ArrowUp":
            return 9 - coordinates.rowNr;
        case "ArrowLeft":
            return 9 - coordinates.columnNr;
        case "ArrowRight":
            return coordinates.columnNr - 1;
    }
}

const findNextCellIndex = (cellsArray: Array<Cell>, initIndex: number, currentIndex?: number): number => {
    let result = ((currentIndex !==undefined ? currentIndex : initIndex) + 1) % 9 ;
    const cell = cellsArray[result];
    return !cell.value ? result : findNextCellIndex(cellsArray, initIndex, result);
}

export const updateNavigation = (sudoku: Sudoku, cell: Cell, navigationType: NavigationType): Array<Cell> => {
    const cellsArray = getCellsArray(sudoku, cell.coordinates, navigationType);
    const initIndex = getInitIndex(cell.coordinates, navigationType);
    cellsArray[initIndex] = {...cellsArray[initIndex], valueFocus: false};

    const nextCellIndex = findNextCellIndex(cellsArray, initIndex);
    cellsArray[nextCellIndex] = {...cellsArray[nextCellIndex], valueFocus: true};
    return cellsArray;
}