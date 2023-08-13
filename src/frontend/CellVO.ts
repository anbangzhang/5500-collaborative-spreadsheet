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

    getFormulaString(): string {
        let formulaString = "";
        for (let token of this._formula) {
            formulaString += token;
        }
        return formulaString;
    }

    setFormula(formula: string[]): void {
        this._formula = formula;
    }

    getValue(): number {
        return this._value;
    }

    setValue(value: number): void {
        this._value = value;
    }

    getError(): string {
        return this._error;
    }

    setError(error: string): void {
        this._error = error;
    }

    getDisplayString(): string {
        return this._displayString;
    }

    setDisplayString(displayString: string): void {
        this._displayString = displayString;
    }

    getLabel(): string {
        return this._label;
    }

    setLabel(label: string): void {
        this._label = label;
    }
}

export default CellVO;