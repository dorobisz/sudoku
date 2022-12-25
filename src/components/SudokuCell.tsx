import { isEqual } from "lodash";
import React, { useState, useEffect } from "react";
import { populateValue, recalculateHelpValue } from "../redux/reducers/actions";
import { Cell } from "./model";

interface SudokuCellProps {
    cell: Cell, 
    dispatch: Function};

const SudokuCell:React.FC<SudokuCellProps> = ({cell,dispatch}) => {
    const {helpValue} = cell;

    const [value, setValue] = useState<number | undefined>(cell.value);

    const handleValueChange = (value: string) => {
        const newValue: number = Number(value);
        setValue(newValue);
        const newCell: Cell  = {...cell, value: newValue};
        dispatch(populateValue(newCell));

    }

    return (    
        <td className="SudokuCell">
            <input className="InputValue" value={value} disabled={!!value} onChange={e => handleValueChange(e.target.value)}/>
            <label className="InputHelp">{helpValue?.join('')}</label>
        </td>
    );
}

export default SudokuCell;