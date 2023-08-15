
export class DeleteSheetResponse {
    private success: boolean;
    private errorMessage: string;

    constructor() {
        this.success = true;
        this.errorMessage = "";
    }

    public getSuccess(): boolean {
        return this.success;
    }

    public getErrorMessage(): string {
        return this.errorMessage;
    }

    public setSuccess(success: boolean) {
        this.success = success;
    }

    public setErrorMessage(message: string) {
        this.errorMessage = message;
    }

}

export default DeleteSheetResponse;
