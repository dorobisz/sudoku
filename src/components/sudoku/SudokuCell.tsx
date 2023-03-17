import React from "react";
import { populateValue } from "../../redux/reducers/actions";
import { setNextValueFocus, resetValueFocus } from "../../redux/reducers/app/sudokuReducer";
import { classNames } from "../cssJoiner";
import { Cell, NavigationType } from "../model";
import HelpValues from "./HelpValues";
import InputValue from "./InputValue";
import get from "lodash";

interface SudokuCellProps {
    cell: Cell,
    dispatch: Function};

const SudokuCell:React.FC<SudokuCellProps> = ({cell,dispatch}) => {
    const {helpValue, valueFocus, selectedHistory, coordinates} = cell;

    const isHistoryPinned = () => {
        return selectedHistory && selectedHistory.isPinned
    }

    const getRemovedValues = () => {
        const {rowNr, columnNr} = coordinates;
        const clearedValue = selectedHistory?.strategy.clearedCells?.find(clearedCell => clearedCell.coordinates.columnNr === columnNr && clearedCell.coordinates.rowNr === rowNr)?.removedHelpValues || []
        console.log(clearedValue);
        return clearedValue
    }

    return (    
        <td className={classNames("SudokuCell",[ isHistoryPinned() && "historyPinned"])}>
            <InputValue 
                helpValue={helpValue} 
                value={cell.value} 
                focus={valueFocus} 
                onChangeFocus={(navigationType: NavigationType) => dispatch(setNextValueFocus({cell, navigationType}))} 
                onChange={(value: number) => dispatch(populateValue({...cell, value}))}
                onResetFocus= {() => dispatch(resetValueFocus(cell))}
            />
            <HelpValues helpValues={helpValue} removedValues={getRemovedValues()} />
        </td>
    );
}

export default SudokuCell;