
export class GetSheetListResponse {
    private sheets: [];

    constructor() {
        this.sheets = [];
    }

    public getSheets(): [] {
        return this.sheets;
    }

    public setSheets(sheets: []): void {
        this.sheets = sheets;
    }

}

export default GetSheetListResponse;