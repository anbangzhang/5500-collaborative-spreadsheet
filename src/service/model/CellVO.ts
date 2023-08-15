
import Cell from "../../engine/Cell";

export class CellVO {
    // private members

    // the formula for the cell expressed as a string of tokens
    // this is built by the formula builder in response to the user editing the formula
    // in the react app
    private formula: string[] = [];

    // the value of the cell
    private value: number = 0;

    // the error message for the cell (if any)
    private error: string = "";

    // the display string for the cell, it is either the value or an error message
    private display_string: string = "";

    // label of the cell (A1, B2, etc.)
    private label: string = "";

    constructor(cell: Cell) {
        this.formula = [...cell.getFormula()];
        this.value = cell.getValue();
        this.error = cell.getError();
        this.display_string = cell.getDisplayString();
        this.label = cell.getLabel();
    }

}

export default CellVO;