import { isEqual } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { populateValue, recalculateHelpValue } from "../../redux/reducers/actions";
import { Cell, HistoryArray } from "../model";

interface SudokuCellProps {
    histories: HistoryArray
    dispatch: Function};

const HistoryPanel:React.FC<SudokuCellProps> = ({histories,dispatch}) => {

    return (    
        <div>
            <h2>History panel</h2>
            {histories.map(history => <h3 key={history.id}>{history.description}</h3>)}
        </div>
    );
}

export default HistoryPanel;