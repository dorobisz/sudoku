import React from "react";
import { HistoryArray, History } from "../model";
import {AnalyzatorState, selectHistory} from "../../redux/reducers/analyzator/amalyzatorReducer";
import HistoryElement from "./HistoryElement";

interface SudokuCellProps {
    histories: HistoryArray,
    analyzator: AnalyzatorState,
    dispatch: Function};

const HistoryPanel:React.FC<SudokuCellProps> = ({histories, analyzator ,dispatch}) => {

    const selected = (history: History): boolean => {
        const id  = analyzator.selectedHistory?.id;
        const result = history.id === id;
        return result;
    }



    return (    
        <div className="History_panel">
            <h2>History panel</h2>
            {histories.map(history => <HistoryElement 
                key={`historyElement${history.id}`} 
                selected={selected(history)}
                history={history} 
                onClick={()=> dispatch(selectHistory(history))}
            />)}
        </div>
    );
}

export default HistoryPanel;