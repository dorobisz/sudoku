import React from "react";
import { Sudoku } from "../model";
import SudokuCell from "./SudokuCell";

interface SudokuBlockProps {sudokuBlock: Sudoku, dispatch: Function};

const SudokuBlock:React.FC<SudokuBlockProps> = ({sudokuBlock, dispatch}) => {
    return (    
    <table className="SudokuBlock">
        <tbody>
        <tr>
            <SudokuCell cell={sudokuBlock[0]} dispatch={dispatch}/>
            <SudokuCell cell={sudokuBlock[1]} dispatch={dispatch}/>
            <SudokuCell cell={sudokuBlock[2]} dispatch={dispatch}/>
        </tr>
        <tr>
            <SudokuCell cell={sudokuBlock[3]} dispatch={dispatch}/>
            <SudokuCell cell={sudokuBlock[4]} dispatch={dispatch}/>
            <SudokuCell cell={sudokuBlock[5]} dispatch={dispatch}/>
        </tr>
        <tr>
            <SudokuCell cell={sudokuBlock[6]} dispatch={dispatch}/>
            <SudokuCell cell={sudokuBlock[7]} dispatch={dispatch}/>
            <SudokuCell cell={sudokuBlock[8]} dispatch={dispatch}/>
        </tr>
        </tbody>
    </table>)
}

export default SudokuBlock;