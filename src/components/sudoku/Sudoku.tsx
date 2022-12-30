import React from "react";
import { SudokuCellArray} from "../model";
import SudokuBlock from "./SudokuBlock";
import { getBlock } from "../../utils/sudokuBlockUtil";

interface SudokuProps {
    sudoku: SudokuCellArray,
    dispatch: Function
}

const Sudoku: React.FC<SudokuProps> = ({sudoku, dispatch}) => {
    const blocksNr = [...new Set(sudoku.map(cell => cell.blockNr))] ;
    blocksNr.sort();
    const sudokuBlocks = blocksNr.map(blockNr => getBlock(blockNr, sudoku));
    
    return (
        <div className="Sudoku">
            {sudokuBlocks.map((sudokuBlock, i) => <SudokuBlock dispatch={dispatch} key={`sudokuBlock_${i}`} sudokuBlock={sudokuBlock}/>)}
        </div>
    );
}

export default Sudoku;