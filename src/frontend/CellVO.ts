export class CellVO {
    // private members

    // the formula for the cell expressed as a string of tokens
    // this is built by the formula builder in response to the user editing the formula
    // in the react app
    private formula: string[];

    // the value of the cell
    private value: number;

    // the error message for the cell (if any)
    private error: string;

    // the display string for the cell, it is either the value or an error message
    private displayString: string;

    // label of the cell (A1, B2, etc.)
    private label: string;

    constructor() {
        this.formula = [];
        this.value = 0;
        this.error = "";
        this.displayString = "";
        this.label = "";
    }

    getFormula(): string[] {
        return this.formula;
    }

    parseFormulaString(): string {
        let formulaString = "";
        for (let token of this.formula) {
            switch(token) {
                case "#s":
                    formulaString += "sqr(";
                    break;
                case "#d":
                    formulaString += "cube(";
                    break;
                case "#g":
                    formulaString += "²√(";
                    break;
                case "#h":
                    formulaString += "³√(";
                    break;
                case "#k":
                    formulaString += "sin(";
                    break;
                case "#l":
                    formulaString += "cos(";
                    break;
                case "#w":
                    formulaString += "tan(";
                    break;
                case "#e":
                    formulaString += "arcsin(";
                    break;
                case "#r":
                    formulaString += "arccos(";
                    break;
                case "#t":
                    formulaString += "arctan(";
                    break;
                default:
                    formulaString += token;
                    break;
            }
        }
        return formulaString;
    }

    setFormula(formula: string[]): void {
        this.formula = formula;
    }

    getValue(): number {
        return this.value;
    }

    setValue(value: number): void {
        this.value = value;
    }

    getError(): string {
        return this.error;
    }

    setError(error: string): void {
        this.error = error;
    }

    getDisplayString(): string {
        return this.displayString;
    }

    setDisplayString(displayString: string): void {
        this.displayString = displayString;
    }

    getLabel(): string {
        return this.label;
    }

    setLabel(label: string): void {
        this.label = label;
    }
}

export default CellVO;