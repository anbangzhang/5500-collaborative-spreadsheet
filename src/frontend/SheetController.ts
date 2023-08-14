import SheetMemoryVO from "./SheetMemoryVO";
import Cell from "../engine/Cell";
import CellVO from "./CellVO";

/**
 * The main controller of the SpreadSheet
 * 
 * functions exported are
 * 
 * addToken(token:string):  void
 * addCell(cell:string): void
 * removeToken(): void
 * clearFormula(): void
 * getFormulaString(): string
 * getResultString(): string
 * setWorkingCellByLabel(label:string): void
 * getWorkingCellLabel(): string
 * setWorkingCellByCoordinates(column:number, row:number): void
 * getSheetDisplayStringsForGUI(): string[][]
 * getEditStatus(): boolean
 * setEditStatus(bool:boolean): void
 * getEditStatusString(): string
 * 
 */

export class SheetController {
    private _memory: SheetMemoryVO;
    private _currentWorkingRow = 0;
    private _currentWorkingColumn = 0;

    // The current cell is being edited
    private _cellIsBeingEdited: boolean;


    /**
    * constructor
    */
    constructor(columns: number, rows: number) {
        this._memory = new SheetMemoryVO(columns, rows, '', '', '', new Map<string, string>());
        this._currentWorkingColumn = 0;
        this._currentWorkingRow = 0;
        this._cellIsBeingEdited = false;
    }

    setSheetMemory(sheetMemory: SheetMemoryVO): void {
        this._memory = sheetMemory;
    }





    /**
   *  Get the formula as a string
   *  
   * @returns the formula as a string
   * 
   * */
  getFormulaString(): string {
        let currentWorkingCell = this._memory.getCellByColumnRow(this._currentWorkingColumn, this._currentWorkingRow);
        let formula = currentWorkingCell.getFormula();
        let formulaString = "";
        for (let token of formula) {
            formulaString += token;
        }
        return formulaString;
    }

    /** 
   * Get the formula as a value (formatted to a string)
   *  
   * @returns the formula as a value:string 
   * 
   * */
  getResultString(): string {
        let currentWorkingCell = this._memory.getCellByColumnRow(this._currentWorkingColumn, this._currentWorkingRow);
        let displayString = currentWorkingCell.getDisplayString();

        return displayString;
    }

    /** 
   * set the working cell by label
   * 
   * @param label:string
   * 
   * 
   */
  setWorkingCellByLabel(label: string): void {
        const [column, row] = Cell.cellToColumnRow(label);
        this.setWorkingCellByCoordinates(column, row);
    }


    /**
   * get the current cell label
   * 
   * @returns the current cell label
   * 
   */
  getWorkingCellLabel(): string {
        return Cell.columnRowToCell(this._currentWorkingColumn, this._currentWorkingRow);
    }

    /**
   * Set the working cell
   * 
   * @param row:number
   * @param column:number
   * 
   * save the formula that is in the formulaBuilder to the current cell
   * 
   * copy the formula from the new cell into the formulaBuilder
   * 
   * */
  setWorkingCellByCoordinates(column: number, row: number): void {
        // if the cell is the same as the current cell do nothing

    }

    /**
    * Get the Sheet Display Values
    * the GUI needs the data to be in row major order
    * 
    * @returns string[][]
    */
  public getSheetDisplayStringsForGUI(): string[][] {

        let memoryDisplayValues = this._memory.getSheetDisplayStrings();
        let guiDisplayValues: string[][] = [];
        let inputRows = memoryDisplayValues.length;
        let inputColumns = memoryDisplayValues[0].length;

        for (let outputRow = 0; outputRow < inputColumns; outputRow++) {
            guiDisplayValues[outputRow] = [];
            for (let outputColumn = 0; outputColumn < inputRows; outputColumn++) {
                guiDisplayValues[outputRow][outputColumn] = memoryDisplayValues[outputColumn][outputRow];
            }
        }

        return guiDisplayValues;
    }

    /**
   * The edit status of the machine specifies what happens when a cell is clicked
   * 
   * @returns boolean
   * 
   * */
  public getEditStatus(): boolean {
        return this._cellIsBeingEdited;
    }

  /**
   * Set the edit status of the machine
   * 
   * @param bool:boolean
   * 
   * */
  public setEditStatus(bool: boolean): void {
        this._cellIsBeingEdited = bool;
    }

  /**
   * Get the edit status string
   *  
   * @returns string
   * 
   * */
  public getEditStatusString(): string {
        if (this._cellIsBeingEdited) {
            return "editing: " + this.getWorkingCellLabel();
        }
        return "current cell: " + this.getWorkingCellLabel();
    }

    public getOccupiedCells(currentUser: string): string[] {
        const occupiedCells = this._memory.getOccupiedCells();
        let result: string[] = [];
        for (let [label, user] of occupiedCells) {
            if (user !== currentUser) {
                result.push(label);
            }
        }
        return result;
    }
}

export default SheetController;