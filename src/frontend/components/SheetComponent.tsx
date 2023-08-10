import React from "react";
import { StringLiteral } from "typescript";
import Cell from "../../engine/Cell";

// a component that will render a two dimensional array of cells
// the cells will be rendered in a table
// the cells will be rendered in rows
// a click handler will be passed in

interface SheetComponentProps {
    cellsValues: Array<Array<string>>;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    currentCell: string;
    currentlyEditing: boolean;
}

function SheetComponent({ cellsValues, onClick, currentCell, currentlyEditing }: SheetComponentProps) {

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
    if (cell === currentCell) {
      return "cell-selected";
    }
    return "cell";
  }

  return (
    <div className="sheet">
      <table>
        <tbody>
          {/* Header row for column labels */}
          <tr>
            <td></td> {/* Empty cell for the corner */}
            {cellsValues[0].map((_, colIndex) => (
              <td key={colIndex}>{Cell.columnNumberToName(colIndex)}</td>
            ))}
          </tr>
          {/* Data rows */}
          {cellsValues.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <button
                    className={getCellClass(Cell.columnRowToCell(colIndex, rowIndex))}
                    onClick={onClick}
                    cell-label={Cell.columnRowToCell(colIndex, rowIndex)}
                    data-testid={Cell.columnRowToCell(colIndex, rowIndex)}
                  >
                    {cell}
                  </button>
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