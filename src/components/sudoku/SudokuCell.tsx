import { isEqual } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { populateValue, recalculateHelpValue } from "../../redux/reducers/actions";
import { Cell } from "../model";

interface SudokuCellProps {
    cell: Cell, 
    dispatch: Function};

const SudokuCell:React.FC<SudokuCellProps> = ({cell,dispatch}) => {
    const {helpValue} = cell;

    const [value, setValue] = useState<number>(cell.value || 0);

    const handleValueChange = (value: string) => {
        const parsed = parseInt(value);
        if (isNaN(parsed) || !helpValue.includes(parsed)) {
            setValue(0);
        } else {
            const newValue: number = Number(value);
            setValue(newValue);
            const newCell: Cell  = {...cell, value: newValue};
            dispatch(populateValue(newCell));

        }
    }

    const handleValueKeyDown = (key: string): boolean => {
        return false;

    }

    const hasValue = (): boolean => value !==0;


    return (    
        <td className="SudokuCell">
            <input 
            className="InputValue" 
            onKeyDown={e => handleValueKeyDown(e.key)} 
            value={hasValue() ? value : ""} 
            disabled={hasValue()} 
            onChange={e => handleValueChange(e.target.value)}/>
            
            <label className="InputHelp">{helpValue?.join('')}</label>
        </td>
    );
}

export default SudokuCell;