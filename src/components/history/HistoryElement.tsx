import React from "react";
import { History, HistoryArray, Strategy } from "../model";

interface HistoryElementProps {
    history: History,
    onClick?: Function
};

const HistoryElement:React.FC<HistoryElementProps> = ({history, onClick = () => {}}) => {

    const handleOnClick = () => {

        onClick({history})
    }

    return (    
        <div onClick={handleOnClick} className= {`History History_${history.strategy.strategyType}`}>
            {history.strategy.description}
        </div>
    );
}

export default HistoryElement;