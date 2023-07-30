
export class GetSheetRequest {
    private id: string;

    constructor() {
        this.id = "";
    }

    public setSheetID(id: string) {
        this.id = id;
    }

    public getSheetID(): string {
        return this.id;
    }

}

export default GetSheetRequest;