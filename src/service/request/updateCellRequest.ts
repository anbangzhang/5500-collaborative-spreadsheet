
export class UpdateCellRequest {
    private sheetID: string;
    private cellLabel: string;
    private operator: string;
    private user: string;

    constructor(sheetID: string, cellLabel: string, operator: string, user: string) {
        this.sheetID = sheetID;
        this.cellLabel = cellLabel;
        this.operator = operator;
        this.user = user;
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

    public getUser(): string {
        return this.user;
    }

    public setUser(user: string) {
        this.user = user;
    }

    
}

export default UpdateCellRequest;