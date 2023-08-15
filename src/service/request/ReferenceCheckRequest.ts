
export class ReferenceCheckReqeust {
    private sheetId: string;
    private currentCell: string;
    private referencedCell: string;

    constructor(sheetId: string, currentCell: string, referencedCell: string) {
        this.sheetId = sheetId;
        this.currentCell = currentCell;
        this.referencedCell = referencedCell;
    }

    public getSheetID(): string {
        return this.sheetId;
    }

    public getCurrentCell(): string {
        return this.currentCell;
    }

    public getReferencedCell(): string {
        return this.referencedCell;
    }
    
}

export default ReferenceCheckReqeust;