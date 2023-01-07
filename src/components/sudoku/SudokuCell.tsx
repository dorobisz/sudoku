import React from "react";
import { populateValue } from "../../redux/reducers/actions";
import { setNextValueFocus, resetValueFocus } from "../../redux/reducers/app/sudokuReducer";
import { Cell, NavigationType } from "../model";
import HelpValues from "./HelpValues";
import InputValue from "./InputValue";

interface SudokuCellProps {
    cell: Cell,
    selectedHistory?: History 
    dispatch: Function};

const SudokuCell:React.FC<SudokuCellProps> = ({cell,dispatch}) => {
    const {helpValue, valueFocus} = cell;

    return (    
        <td className="SudokuCell">
            <InputValue 
                helpValue={helpValue} 
                value={cell.value} 
                focus={valueFocus} 
                onChangeFocus={(navigationType: NavigationType) => dispatch(setNextValueFocus({cell, navigationType}))} 
                onChange={(value: number) => dispatch(populateValue({...cell, value}))}
                onResetFocus= {() => dispatch(resetValueFocus(cell))}
            />
            <HelpValues helpValues={helpValue} />
        </td>
    );
}

export default SudokuCell;