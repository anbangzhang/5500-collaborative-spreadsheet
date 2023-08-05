
export class CreateSheetResponse {
    private success: boolean;
    private errorMessage: string;
    private id: string;

    constructor() {
        this.success = false;
        this.errorMessage = "";
        this.id = "";
    }

    public getSuccess(): boolean {
        return this.success;
    }

    public getErrorMessage(): string {
        return this.errorMessage;
    }

    public getID(): string {
        return this.id;
    }

    public setSuccess(suscess: boolean) {
        this.success = suscess;
    }

    public setErrorMessage(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

}

export default CreateSheetResponse;