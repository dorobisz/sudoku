import { ceil } from "lodash";
import React from "react";
import { Cell } from "./model";

interface SudokuCellProps {cell: Cell};

const SudokuCell:React.FC<SudokuCellProps> = ({cell}) => {
    return (    
        <td className="SudokuCell">
            <input className="InputValue" value={cell.value} onChange={()=>{}}/>
            <input className="InputHelp" value={cell.helpValue?.join('')}  onChange={()=>{}}/>
        </td>
    );
}

export default SudokuCell;