import React from "react";
import { SudokuCellArray} from "../model";
import SudokuBlock from "./SudokuBlock";
import { getBlock } from "../../utils/sudokuUtil";
import { AnalyzatorState } from "../../redux/reducers/analyzator/analyzatorReducer";

interface SudokuProps {
    sudoku: SudokuCellArray,
    dispatch: Function,
}

const Sudoku: React.FC<SudokuProps> = ({sudoku, dispatch}) => {
    const blockNrs = sudoku.map(cell => cell.coordinates.blockNr);
    const blocksNr = [...new Set(blockNrs)] ;
    blocksNr.sort();
    const sudokuBlocks = blocksNr.map(blockNr => getBlock(blockNr, sudoku));
    
    return (
        <div className="Sudoku">
            {sudokuBlocks.map((sudokuBlock, i) => <SudokuBlock dispatch={dispatch} key={`sudokuBlock_${i}`} sudokuBlock={sudokuBlock}/>)}
        </div>
    );
}

export default Sudoku;