import React from "react";
import { HistoryArray } from "../model";
import HistoryElement from "./HistoryElement";

interface SudokuCellProps {
    histories: HistoryArray
    dispatch: Function};

const HistoryPanel:React.FC<SudokuCellProps> = ({histories,dispatch}) => {

    return (    
        <div>
            <h2>History panel</h2>
            {histories.map(history => <HistoryElement key={`historyElement${history.id}`} history={history}/>)}
        </div>
    );
}

export default HistoryPanel;