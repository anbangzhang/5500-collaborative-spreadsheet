/** SheetMemory Class
 * 
 * This class is used to maintain an 2d array of CellClass objects.
 * 
 * The SheetMemory class is used to store the formulas and values of the cells in the spreadsheet.
 * 
 * The SheetMemory class is used by the Sheet class to store the formulas and values of the cells in the spreadsheet.
 * 
 * The array of cells is private and can only be accessed through the SheetMemory class.
 * 
 * This class provides a way to get and set the cells in the array.
 * 
 * This class calculates a dependency graph of the cells in the spreadsheet.
 * 
 * This class provides a way to evaluate the formulas in the cells.
 * 
 * This class provides a way to get the formulas and values of the cells in the spreadsheet.
 * 
 * This Class provides a way to get and set the current cell.
 * 
 * This class provides a way to evaluate the formula for the current cell. It uses Recalc.ts to evaluate the formula.
 * 
 * 
 * 
 * 
 */

import Cell from "./Cell";

export class SheetMemory {
    private _cells: Cell[][];
    private _numRows: number;
    private _numColumns = 8;

    constructor(columns: number, rows: number) {

        this._numColumns = columns;
        this._numRows = rows;

        this._cells = [];
        for (let column = 0; column < this._numColumns; column++) {
            this._cells[column] = [];
            for (let row = 0; row < this._numRows; row++) {
                this._cells[column][row] = new Cell();
                this._cells[column][row].setLabel(Cell.columnRowToCell(column, row));
            }
        }
    }

    /**
     * Get the number of rows in the sheet
     * 
     * @returns number
     */
    getNumRows(): number {
        return this._numRows;
    }

    /**
     * Get the number of columns in the sheet
     * 
     * @returns number
     */
    getNumColumns(): number {
        return this._numColumns;
    }

    /**
     * Get the cell by label
     * 
     */
    getCellByLabel(label: string): Cell {
        let [column, row] = Cell.cellToColumnRow(label);
        return this._cells[column][row];
    }
    /**
     * Get the cells in the sheet
     * 
     * @returns Cell[][]
     */
    getCells(): Cell[][] {
        return this._cells;
    }

    setCellFormulaByColumnRow(column: number, row: number, formula: string[]): void {
        this._cells[column][row].setFormula(formula);
    }

    /**
     * Get the display string for the sheet
     * 
     * @returns string[][]
     */
    getSheetDisplayStrings(): string[][] {
        let displayStrings: string[][] = [];
        for (let column = 0; column < this._numColumns; column++) {
            displayStrings[column] = [];
            for (let row = 0; row < this._numRows; row++) {
                displayStrings[column][row] = this._cells[column][row].getDisplayString();
            }
        }
        return displayStrings;
    }

}


export default SheetMemory;