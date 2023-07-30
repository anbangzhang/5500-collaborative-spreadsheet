
export class CreateSheetResponse {
    private suscess: boolean;
    private errorMessage: string;
    private id: string;

    constructor() {
        this.suscess = false;
        this.errorMessage = "";
        this.id = "";
    }

    public getSuscess(): boolean {
        return this.suscess;
    }

    public getErrorMessage(): string {
        return this.errorMessage;
    }

    public getID(): string {
        return this.id;
    }

    public setSuscess(suscess: boolean) {
        this.suscess = suscess;
    }

    public setErrorMessage(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

}

export default CreateSheetResponse;