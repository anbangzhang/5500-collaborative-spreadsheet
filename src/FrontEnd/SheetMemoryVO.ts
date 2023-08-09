import CellVO from "./CellVO";
import Cell from "../engine/Cell";

export class SheetMemoryVO {
    private _cells: CellVO[][];
    private _numRows: number;
    private _numColumns: number;

    constructor(columns: number, rows: number) {        
        this._numColumns = columns;
        this._numRows = rows;
    
        this._cells = [];
        for (let column = 0; column < this._numColumns; column++) {
            this._cells[column] = [];
            for (let row = 0; row < this._numRows; row++) {
                this._cells[column][row] = new CellVO();
                this._cells[column][row].setLabel(Cell.columnRowToCell(column, row));
            }
        }
    }
}

export default SheetMemoryVO;