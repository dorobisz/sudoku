import React from "react";
import { SudokuCell } from "./model";

const SudokuBlock:React.FC<SudokuCell> = ({}) => {
    return (    
        <div className="SudokuCell">
            <input className="InputValue"/>
            <input className="InputHelp" value="123456789"/>
        </div>
    );
}

export default SudokuBlock;