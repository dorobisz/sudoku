import React, { useState } from "react";
import { History, HistoryArray, Strategy } from "../model";
import { TbPinned, TbPin } from 'react-icons/tb';
import { classNames } from "../cssJoiner";

interface HistoryElementProps {
    history: History,
    selected?: boolean
    onClick?: Function
};

const HistoryElement:React.FC<HistoryElementProps> = ({history, selected,  onClick = () => {}}) => {

    const handleOnClick = () => {
        onClick();
    }


    return (    
        <div onClick={handleOnClick} className= {classNames("History", 
                [
                    history.strategy.strategyType, 
                    selected && "pinned"
                ])}>
            {selected ? <TbPinned/> : <TbPin/>}
            {history.strategy.description}
        </div>
    );
}

export default HistoryElement;