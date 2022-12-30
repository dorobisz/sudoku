import { isEqual } from "lodash";
import React, { useState} from "react";
import { on } from "stream";
import { Cell } from "../model";
import HelpValues from "./HelpValues";

interface InputValueProps {
    value?: number,
    helpValue: Array<number> 
    onChange: Function};

const InputValue:React.FC<InputValueProps> = ({value, helpValue, onChange}) => {

    const [selectedValue, setSelectedValue] = useState<number>(value || 0);

    const handleValueChange = (value: string) => {
        const parsed = parseInt(value);
        if (isNaN(parsed) || !helpValue.includes(parsed)) {
            setSelectedValue(0);
        } else {
            const newValue: number = Number(value);
            setSelectedValue(newValue);
            onChange(newValue);

        }
    }

    const hasValue = (): boolean => selectedValue !==0;


    return (    
            <input 
            className="InputValue" 
            value={hasValue() ? selectedValue : ""} 
            disabled={hasValue()} 
            onChange={e => handleValueChange(e.target.value)}/>
            
    );
}

export default InputValue;