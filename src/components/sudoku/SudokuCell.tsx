import React from "react";
import { populateValue } from "../../redux/reducers/actions";
import { Cell } from "../model";
import HelpValues from "./HelpValues";
import InputValue from "./InputValue";

interface SudokuCellProps {
    cell: Cell,
    selectedHistory?: History 
    dispatch: Function};

const SudokuCell:React.FC<SudokuCellProps> = ({cell,dispatch}) => {
    const {helpValue} = cell;

    const handleValueChange = (value: number) => dispatch(populateValue({...cell, value}));

    return (    
        <td className="SudokuCell">
            <InputValue helpValue={helpValue} value={cell.value} onChange={ (value: number) => handleValueChange(value)}/>
            <HelpValues helpValues={helpValue} />
        </td>
    );
}

export default SudokuCell;