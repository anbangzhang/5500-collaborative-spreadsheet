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
    constructor(sheetmemory: SheetMemoryVO, currentUser: string) {
        this._memory = sheetmemory
        this._cellIsBeingEdited = false;
        for (let [label, user] of this._memory.getOccupiedCells()) {
            if (user === currentUser) {
                this._cellIsBeingEdited = true;
                let [column, row] = Cell.cellToColumnRow(label);
                this._currentWorkingColumn = column;
                this._currentWorkingRow = row;
                return;
            }
        }
    }

    /**  
   *  add token to current formula, this is not a cell and thus no dependency updating is needed
   * 
   * @param token:string
   * 
   * if the token is a valid cell label add it to the formula
   * 
   * 
   */
    addToken(token: string): void {

    }

    /**  
   *  add cell reference to current formula
   * 
   * @param cell:string
   * returns true if the token was added to the formula
   * returns false if a circular dependency is detected.
   * 
   * Assuming that the dependents have been updated
   * we will look at the dependsOn array for the cell being inserted
   * if the current cell is in the dependsOn array then we have a circular referenceoutloo
   */
  addCell(cellReference: string): void {
        // get the dependents for the cell being inserted
        if (cellReference === this.getWorkingCellLabel()) {
        // do nothing
        return;
        }
        let currentCell: CellVO = this._memory.getCellByColumnRow(this._currentWorkingColumn, this._currentWorkingRow);
        let currentLabel = currentCell.getLabel();
        
        // Check to see if we would be introducing a circular dependency
        // this function will update the dependency for the cell being inserted

        // We have checked to see if this new token introduces a circular dependency
        // if it does not then we can add the token to the formula
    }

    /**
   * 
   * remove the last token from the current formula
   * 
   */
    removeToken(): void {

    }

    /**
   * 
   * clear the current formula
   * 
   */
  clearFormula(): void {
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


}

export default SheetController;