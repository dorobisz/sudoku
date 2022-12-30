import { range } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { populateValue, recalculateHelpValue } from "../../redux/reducers/actions";
import { Cell } from "../model";

interface HelpValuesProps {
    helpValues: Array<number>, 
    removedValues?: Array<number>
};

enum ValueType {
    Available = "Available",
    Removed = "Removed",
    Hidden = "Hidden",
  }



const HelpValues:React.FC<HelpValuesProps> = ({helpValues, removedValues = []}) => {

    const getType = (value: number): ValueType => {
        if (helpValues.includes(value)) {
            return ValueType.Available;
        } else if (removedValues && removedValues.includes(value)){
            return ValueType.Removed
        }
        return ValueType.Hidden
    }

    const allElements = range(1,10).map(value => ({value, type:getType(value)}))

    return (    
           
            <div className="HelpValue">
                {allElements.map((element, index) => <label key={`helpValue_${index}`} className={`HelpValue_${element.type}`}>{element.value}</label>)}
               
            </div>
    );
}

export default HelpValues;