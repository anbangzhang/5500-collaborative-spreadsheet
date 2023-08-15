import CellVO from "./CellVO";
import Cell from "../engine/Cell";

export class SheetMemoryVO {
    private _cells: CellVO[][];
    private _numRows: number;
    private _numColumns: number;
    private _currentWorkingRow: number = 0;
    private _currentWorkingColumn: number = 0;
    private _name: string;
    private _owner: string;
    private _id: string;
    private _occupied: Map<string, string>


    constructor(columns: number, rows: number, id: string, name: string, owner: string, occupied: Map<string, string>) {        
        this._numColumns = columns;
        this._numRows = rows;
        this._id = id;
        this._name = name;
        this._owner = owner;
        this._occupied = occupied;
    
        this._cells = [];
        for (let column = 0; column < this._numColumns; column++) {
            this._cells[column] = [];
            for (let row = 0; row < this._numRows; row++) {
                this._cells[column][row] = new CellVO();
            }
        }
    }

    get name(): string {
        return this._name;
    }

    get owner(): string {
        return this._owner;
    }

    get id(): string {
        return this._id;
    }
    
    getCellByLabel(label: string): CellVO {
        let [column, row] = Cell.cellToColumnRow(label);
        return this._cells[column][row];
    }

    getCellByColumnRow(column: number, row: number): CellVO {
        return this._cells[column][row];
    }

    setCellFormulaByColumnRow(column: number, row: number, formula: FormulaType): void {
        this._cells[column][row].setFormula(formula);
    }

    setWorkingCellByCoordinates(column: number, row: number): void {
        this._currentWorkingColumn = column;
        this._currentWorkingRow = row;
    }

    getCurrentCellFormula(): FormulaType {
        return this._cells[this._currentWorkingColumn][this._currentWorkingRow].getFormula();
    }

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

    setCellByColumnRow(column: number, row: number, cell: CellVO): void {
        this._cells[column][row] = cell;
    }

    getOccupiedCells(): Map<string, string> {
        return this._occupied;
    }
    
    setNewOccupiedCell(occupiedCellLabel: string, user: string) {
        this._occupied.set(occupiedCellLabel, user);
    }

    removeOccupiedCell(occupiedCellLabel: string) {
        this._occupied.delete(occupiedCellLabel);
    }
}

export default SheetMemoryVO;