
export class UpdateCellRequest {
    private sheetID: string;
    private cellLabel: string;
    private operator: string;

    constructor(sheetID: string, cellLabel: string, operator: string) {
        this.sheetID = sheetID;
        this.cellLabel = cellLabel;
        this.operator = operator;
    }

    public getSheetID(): string {
        return this.sheetID;
    }

    public getCellLabel(): string {
        return this.cellLabel;
    }

    public getOperator(): string {
        return this.operator;
    }

    public setSheetID(sheetID: string) {
        this.sheetID = sheetID;
    }

    public setCellLabel(cellLabel: string) {
        this.cellLabel = cellLabel;
    }

    public setOperator(operator: string) {
        this.operator = operator;
    }
    
}

export default UpdateCellRequest;