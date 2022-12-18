import React from "react";
import { SudokuCellArray } from "./model";
import SudokuCell from "./SudokuCell";

interface SudokuBlockProps {sudokuBlock: SudokuCellArray};

const SudokuBlock:React.FC<SudokuBlockProps> = ({sudokuBlock}) => {
    return (    
    <table className="SudokuBlock">
        <tbody>
        <tr>
            <SudokuCell cell={sudokuBlock[0]} />
            <SudokuCell cell={sudokuBlock[1]} />
            <SudokuCell cell={sudokuBlock[2]} />
        </tr>
        <tr>
            <SudokuCell cell={sudokuBlock[3]} />
            <SudokuCell cell={sudokuBlock[4]} />
            <SudokuCell cell={sudokuBlock[5]} />
        </tr>
        <tr>
            <SudokuCell cell={sudokuBlock[6]} />
            <SudokuCell cell={sudokuBlock[7]} />
            <SudokuCell cell={sudokuBlock[8]} />
        </tr>
        </tbody>
    </table>)
}

export default SudokuBlock;