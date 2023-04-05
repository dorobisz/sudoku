import React, { useState, useRef} from "react";
import {NavigationType} from "../model"

interface InputValueProps {
    value?: number,
    helpValue: Array<number> 
    onChange?: Function,
    onChangeFocus?: Function,
    onResetFocus?: Function,
    focus: boolean
};


const InputValue:React.FC<InputValueProps> = ({
        value, 
        helpValue, 
        focus, 
        onChange=(value: number)=>{}, 
        onChangeFocus=(direction: NavigationType) => {},
        onResetFocus=() => {}
    }) => {

    const [selectedValue, setSelectedValue] = useState<number>(value || 0);
    const inputValueRef = useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (inputValueRef.current && focus) {
            inputValueRef.current.focus();
        }
      }, [focus]);

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

    const handleOnKeyDown = (key: string) => {
        const arrows = ["ArrowUp","ArrowDown", "ArrowLeft" ,"ArrowRight"]
        if(arrows.includes(key)){
            onChangeFocus(key)
        }

    }

    return (    
            <input
            ref={inputValueRef} 
            className="InputValue" 
            value={hasValue() ? selectedValue : ""} 
            disabled={hasValue()}
            onKeyDown={e => handleOnKeyDown(e.key)} 
            onChange={e => handleValueChange(e.target.value)}
            onBlur={e => onResetFocus()}
            />
            
    );
}

export default InputValue;