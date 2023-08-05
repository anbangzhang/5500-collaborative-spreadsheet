import Cell from '../engine/Cell';

export class SheetDetail {
    private _id: string;
    //[col][row][formula]
    private _cells: string[][][];

    constructor(id: string, cells: string[][][]) {
        this._id = id;
        this._cells = cells;
    }
  
    getId(): string {
        return this._id;
    }

    getCells(): string[][][] {
        return this._cells;
    }

    /**
     * clear the given cell's formula
     */
    clearFormula(cellLabel: string): void {
        let [col, row] = Cell.cellToColumnRow(cellLabel);
        this._cells[col][row] = [];
    }

    setFormulaByColumnRow(col: number, row: number, formula: string[]): void {
        this._cells[col][row] = [...formula];
    }

    setFormula(cellLabel: string, formula: string[]): void {
        let [col, row] = Cell.cellToColumnRow(cellLabel);
        this._cells[col][row] = [...formula];
    }
  
    /**
     * get the formula for the given cell
     */
    getFormula(cellLabel: string): string[] {
        let [col, row] = Cell.cellToColumnRow(cellLabel);
        return [...this._cells[col][row]];
    }
}

export default SheetDetail;