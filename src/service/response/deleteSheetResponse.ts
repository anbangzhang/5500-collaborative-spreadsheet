
export class DeleteSheetResponse {
    private success: boolean;
    private message: string;

    constructor() {
        this.success = true;
        this.message = "";
    }

    public getSuccess(): boolean {
        return this.success;
    }

    public getErrorMessage(): string {
        return this.message;
    }

    public setSuccess(success: boolean) {
        this.success = success;
    }

    public setErrorMessage(message: string) {
        this.message = message;
    }

}

export default DeleteSheetResponse;