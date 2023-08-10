import Cell from "../engine/Cell";

export class CellVO {
    // private members

    // the formula for the cell expressed as a string of tokens
    // this is built by the formula builder in response to the user editing the formula
    // in the react app
    private _formula: string[];

    // the value of the cell
    private _value: number;

    // the error message for the cell (if any)
    private _error: string;

    // the display string for the cell, it is either the value or an error message
    private _displayString: string;

    // label of the cell (A1, B2, etc.)
    private _label: string;

    constructor() {
        this._formula = [];
        this._value = 0;
        this._error = "";
        this._displayString = "";
        this._label = "";
    }

    getFormula(): string[] {
        return this._formula;
    }

    getValue(): number {
        return this._value;
    }

    getError(): string {
        return this._error;
    }

    getDisplayString(): string {
        return this._displayString;
    }

    getLabel(): string {
        return this._label;
    }

    setLabel(label: string): void {
        this._label = label;
    }
}

export default CellVO;