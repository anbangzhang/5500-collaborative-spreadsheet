
export class LockCellRequest {
    private sheetID: string;
    private cellLabel: string;
    private user: string;

    constructor(sheetID: string, cellLabel: string, user: string) {
        this.sheetID = sheetID;
        this.cellLabel = cellLabel;
        this.user = user;
    }

    public getSheetID(): string {
        return this.sheetID;
    }

    public getCellLabel(): string {
        return this.cellLabel;
    }

    public getUser(): string {
        return this.user;
    }

    public setSheetID(sheetID: string) {
        this.sheetID = sheetID;
    }

    public setCellLabel(cellLabel: string) {
        this.cellLabel = cellLabel;
    }

    public setUser(user: string) {
        this.user = user;
    }
    
}

export default LockCellRequest;