import React from "react";
import Cell from "../../engine/Cell";
import "./SheetComponent.css";

// a component that will render a two dimensional array of cells
// the cells will be rendered in a table
// the cells will be rendered in rows
// a click handler will be passed in

interface SheetComponentProps {
    cellsValues: Array<Array<string>>;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    currentCell: string;
    currentlyEditing: boolean;
    occupiedCells: Map<string, string>;
}

function SheetComponent({ cellsValues, onClick, currentCell, currentlyEditing, occupiedCells }: SheetComponentProps) {

      /**
   * 
   * @param cell 
   * @returns the class name for the cell
   * 
   * if the cell is the current cell and the sheet is in edit mode
   * then the cell will be rendered with the class name "cell-editing"
   * 
   * if the cell is the current cell and the sheet is not in edit mode
   * then the cell will be rendered with the class name "cell-selected"
   * 
   * otherwise the cell will be rendered with the class name "cell"
   */
  function getCellClass(cell: string) {
    if (cell === currentCell && currentlyEditing) {
      return "cell-editing";
    }
    for (const occupiedCell of occupiedCells.keys()) {
      if (cell === occupiedCell) {
        return "cell-locked";
      }
    }
    if (cell === currentCell) {
      return "cell-selected";
    }
    return "cell";
  }

  function getColumnNames(cellsValues: Array<Array<string>>) {
    let columnNames: Array<string> = [];
    for (let i = 0; i < cellsValues[0].length; i++) {
      columnNames.push(Cell.columnNumberToName(i));
    }
    return columnNames;
  }

  return (
    <div className="sheet">
      <table className="sheet-table">
        <tbody>
          <tr>
            <td></td>{getColumnNames(cellsValues).map((columnName, index) => (<td key={index}>{columnName}</td>))}
          </tr>
          {cellsValues.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                {rowIndex + 1}
              </td>
              {row.map((cell, colIndex) => (
                <td key={colIndex} style={{position:"relative"}}>
                  <button
                    className={getCellClass(Cell.columnRowToCell(colIndex, rowIndex))}
                    onClick={onClick}
                    cell-label={Cell.columnRowToCell(colIndex, rowIndex)}
                    data-testid={Cell.columnRowToCell(colIndex, rowIndex)}
                  >
                    {cell}
                  </button>
                  {occupiedCells.get(Cell.columnRowToCell(colIndex, rowIndex)) && <span className="user-label">{occupiedCells.get(Cell.columnRowToCell(colIndex, rowIndex))}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default SheetComponent;