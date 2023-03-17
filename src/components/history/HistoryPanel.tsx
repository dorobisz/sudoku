import React from "react";
import { HistoryArray, History } from "../model";
import HistoryElement from "./HistoryElement";
import { pinnedHistory, unpinnedHistory } from "../../redux/reducers/actions";

interface SudokuCellProps {
    histories: HistoryArray,
    dispatch: Function};

const HistoryPanel:React.FC<SudokuCellProps> = ({histories, dispatch}) => {

    const clickHandle = (history: History) => {
        dispatch(!history.isPinned ? pinnedHistory(history) : unpinnedHistory(history));
    }



    return (    
        <div className="History_panel">
            <h2>History panel</h2>
            {histories.map(history => <HistoryElement 
                key={`historyElement${history.id}`} 
                selected={history.isPinned}
                history={history} 
                onClick={()=> clickHandle(history)}
            />)}
        </div>
    );
}

export default HistoryPanel;