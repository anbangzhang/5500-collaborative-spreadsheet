
export class GetSheetListResponse {
    private sheets: { id: string; name: string; owner: string; }[];

    constructor() {
        this.sheets = [];
    }

    public getSheets(): { id: string; name: string; owner: string; }[] {
        return this.sheets;
    }

    public setSheets(sheets: { id: string; name: string; owner: string; }[]): void {
        this.sheets = sheets;
    }

}

export default GetSheetListResponse;