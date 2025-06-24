import React from "react";
import { useState } from 'react';
import { generate } from "../../redux/reducers/actions";
import { DifficultyLevel } from "../../redux/reducers/app/sudokuReducer";

interface SudokuGeneratorButtonProps {
    dispatch: Function};

const SudokuGeneratorButton:React.FC<SudokuGeneratorButtonProps> = ({dispatch}) => {
    
const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('medium');




    return (    
<div className="generate-sudoku-controls">
          <h3>Nowa Gra</h3>
          <select
            onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel)}
            value={selectedDifficulty}
          >
            <option value="easy">Łatwy</option>
            <option value="medium">Średni</option>
            <option value="hard">Trudny</option>
          </select>
          <button onClick= {() => dispatch(generate(selectedDifficulty))}>
            Generuj Sudoku
          </button>
        </div>
    );
}

export default SudokuGeneratorButton;