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
 * See Sheet.test.ts for examples of how to use this class.
 * 
 * 
 * 
 */

import Cell from "./Cell";

export class SheetMemory {
    private _cells: Cell[][];
    private _numRows: number;
    private _numColumns = 8;

    private _currentRow = 0;
    private _currentColumn = 0;


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
     * @param label string
     * @returns Cell
     */
    getCellByLabel(label: string): Cell {
        let [column, row] = Cell.cellToColumnRow(label);
        return this._cells[column][row];
    }

    /**
     * Get the coordinates of working cell
     * 
     * @returns number[]
     */
    getWorkingCellByCoordinates(): number[] {
        return [this._currentColumn, this._currentRow];
    }

    /**
     * Set the working cell at the given column and row
     * 
     * @param column number
     * @param row number
     */
    setWorkingCellByCoordinates(column: number, row: number): void {
        this._currentColumn = column;
        this._currentRow = row;
    }

    /**
     * Set the working cell by label
     * 
     * @param label string
     */
    setWorkingCellByLabel(label: string): void {
        let column = label.charCodeAt(0) - 65;
        let row = parseInt(label.slice(1)) - 1;
        this._currentColumn = column;
        this._currentRow = row;
    }

    /**
     * Get the cell at the current row and column
     * 
     * @returns Cell
     */
    getCurrentCell(): Cell {
        return this._cells[this._currentColumn][this._currentRow];
    }

    /**
     * Set the cell at the current row and column
     * 
     * @param cell Cell
     */
    setCurrentCell(cell: Cell): void {
        this._cells[this._currentColumn][this._currentRow] = cell;
    }

    /**
     * Get the cells in the sheet
     * 
     * @returns Cell[][]
     */
    getCells(): Cell[][] {
        return this._cells;
    }

    /**
     * Get the formula for the current cell
     * 
     * @returns string[]
     */
    getCurrentCellFormula(): string[] {
        return this._cells[this._currentColumn][this._currentRow].getFormula();
    }

    /**
     * Set the formual for the current cell
     * 
     * @param formula string
     */
    setCurrentCellFormula(formula: string []): void {
        this._cells[this._currentColumn][this._currentRow].setFormula(formula);
    }

    /**
     * Set the value for the current cell
     * 
     * @param value string
     */
    setCurrentCellValue(value: number): void {
        this._cells[this._currentColumn][this._currentRow].setValue(value);
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