import { Cell, Coordinates, StrategyCell, SudokuCellArray } from "../components/model";
import { clearValues, getBlock, getColumn, getRow } from "../utils/sudokuUtil";

export type StrategyFunction = (cells: SudokuCellArray) => Array<StrategyCell>

interface StrategyState {
selectedCell: Cell,

selectedRow: Array<Cell>,
selectedColumn: Array<Cell>,
selectedBlock: Array<Cell>,

changedCells: Array<StrategyCell>,

rowStrategy: StrategyFunction,
columnStrategy: StrategyFunction,
blockStrategy: StrategyFunction
}

export interface StrategyApi {
    setRowStrategy: (fn: StrategyFunction) => void,
    setColumnStrategy: (fn: StrategyFunction) => void,
    setBlockStrategy: (fn: StrategyFunction) => void,
    setGlobalStrategy: (fn: StrategyFunction) => void,
    execute: () => Array<StrategyCell>
    
}

const getStrategyCell = (coordinates: Coordinates, cells: Array<StrategyCell>): StrategyCell | undefined => (
    cells.find(
        cell => cell.coordinates.columnNr === coordinates.columnNr 
        && cell.coordinates.rowNr === coordinates.rowNr)
);

const updateCells = (cells: Array<Cell>, strategyCells: Array<StrategyCell>): Array<Cell> => {
    return cells.map(cell => {
        const strategyCell =  getStrategyCell(cell.coordinates, strategyCells);
        const removedHelpValues = strategyCell ? strategyCell.removedHelpValues : [];
        return {
            ...cell, 
            helpValue: clearValues(cell.helpValue, removedHelpValues),
        };

    });
}

const updateState = (state: StrategyState, modifiedStrategyCells: Array<StrategyCell>) => {
    state.selectedRow = updateCells(state.selectedRow, modifiedStrategyCells);
    state.selectedColumn = updateCells(state.selectedColumn, modifiedStrategyCells);
    state.selectedBlock = updateCells(state.selectedBlock, modifiedStrategyCells);

    const modifiedCells = state.changedCells.map(stateCell => {
        const founded = getStrategyCell(stateCell.coordinates, modifiedStrategyCells);
        if(founded) {
            return {
                ...founded, 
                removedHelpValues: [...founded.removedHelpValues, ...stateCell.removedHelpValues]}
        } else {
            return {...stateCell};
        }

    });

    const newCells = modifiedStrategyCells.filter(cell => {
        return getStrategyCell(cell.coordinates, modifiedCells) ? false : true;
    });

  
    state.changedCells = [...modifiedCells, ...newCells];
}


const runStrategy = (state: StrategyState): Array<StrategyCell> => {
    updateState(state, state.rowStrategy(state.selectedRow));
    updateState(state, state.blockStrategy(state.selectedBlock));
    updateState(state, state.columnStrategy(state.selectedColumn));

    return state.changedCells;
}

export const createStrategyApi = (sudoku: SudokuCellArray, cell: Cell): StrategyApi => {

    const state: StrategyState = {
        selectedCell: {...cell},
        selectedBlock: getBlock(cell.coordinates.blockNr, sudoku),
        selectedColumn: getColumn(cell.coordinates.columnNr, sudoku),
        selectedRow: getRow(cell.coordinates.rowNr, sudoku),
        blockStrategy: () =>[],
        columnStrategy: () => [],
        rowStrategy: () => [],
        changedCells: []
    }

    return {
        setBlockStrategy: (fn: StrategyFunction) => {state.blockStrategy = fn},
        setColumnStrategy: (fn: StrategyFunction) => {state.columnStrategy = fn},
        setRowStrategy: (fn: StrategyFunction) => {state.rowStrategy = fn},
        setGlobalStrategy: (fn: StrategyFunction) => {
            state.blockStrategy = fn;
            state.columnStrategy = fn;
            state.rowStrategy = fn;
        },
        execute: () => runStrategy(state)
    }
}

