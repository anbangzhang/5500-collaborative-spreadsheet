import React from 'react';
import './Formula.css';

// FormulaComponentProps
// we pass in value for the formula 
// and the value for the current result
type FormulaProps = {
    formulaString: string;
    resultString: string;
  } // interface FormulaProps
  
  
  const Formula: React.FC<FormulaProps> = ({ formulaString, resultString }) => {
    return (
      <div className='formula-container'>
        <span data-testid="FormulaTitle" className='formula-text'>Formula </span>
        <br />
        <div className="formula">
          <span data-testid="FormulaValue">{formulaString} </span>
        </div>
        <br />
        <span data-testid="Result" className='formula-text'>Result</span>
        <br />
        <div className="formula">
          <span data-testid="FormulaResult">{resultString}</span>
        </div>
      </div>
  
    );
  } // const Formula 
  
  export default Formula; 