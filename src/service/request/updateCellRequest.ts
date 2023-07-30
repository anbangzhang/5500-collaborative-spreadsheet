
export class UpdateCellRequest {
    private sheetId: string;
    private cellLabel: string;
    private operator: string;

    constructor(sheetId: string, cellLabel: string, operator: string) {
        this.sheetId = sheetId;
        this.cellLabel = cellLabel;
        this.operator = operator;
    }

    public getSheetId(): string {
        return this.sheetId;
    }

    public getCellLabel(): string {
        return this.cellLabel;
    }

    public getOperator(): string {
        return this.operator;
    }

    public setSheetId(sheetId: string) {
        this.sheetId = sheetId;
    }

    public setCellLabel(cellLabel: string) {
        this.cellLabel = cellLabel;
    }

    public setOperator(operator: string) {
        this.operator = operator;
    }
    
}

export default UpdateCellRequest;