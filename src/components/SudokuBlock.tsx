import React from "react";
import { SudokuCellArray } from "./model";

interface SudokuBlockProps {sudokuBlock: SudokuCellArray};

const SudokuBlock:React.FC<SudokuBlockProps> = ({sudokuBlock}) => {
    return (    
    <table className="SudokuBlock">
        <tbody>
        <tr>
            <td className="SudokuCell">
            <input className="InputValue"/>
            <input className="InputHelp" value="123456789"/>
            </td>
            <td className="SudokuCell"></td>
            <td className="SudokuCell"></td>
        </tr>
        <tr>
            <td className="SudokuCell"></td>
            <td className="SudokuCell"></td>
            <td className="SudokuCell"></td>
        </tr>
        <tr>
            <td className="SudokuCell"></td>
            <td className="SudokuCell"></td>
            <td className="SudokuCell"></td>
        </tr>
        </tbody>
    </table>)
}

export default SudokuBlock;