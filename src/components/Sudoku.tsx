import React from "react";
import { SudokuCellArray } from "./model";
import SudokuBlock from "./SudokuBlock";
import sudokuInitialState from "../redux/sudokuInitialState";
import range from "lodash/range";
import { getBlock } from "../utils/sudokuBlockUtil";

interface SudokuProps {
    sudoku: SudokuCellArray;
}

const Sudoku: React.FC<SudokuProps> = ({sudoku}) => {
    console.log(sudoku);
    const sudokuBlocks = range(1, 10).map(blockNr => getBlock(blockNr, sudoku))
    return (
        <div className="Sudoku">
            {sudokuBlocks.map((sudokuBlock, i) => <SudokuBlock key={`sudokuBlock_${i}`} sudokuBlock={sudokuBlock}/>)}
        </div>
    );
}

export default Sudoku;