
export class DeleteSheetResponse {
    private suscess: boolean;
    private message: string;

    constructor(suscess: boolean, message: string) {
        this.suscess = suscess;
        this.message = message;
    }

    public getSuscess(): boolean {
        return this.suscess;
    }

    public getMessage(): string {
        return this.message;
    }

    public setSuscess(suscess: boolean) {
        this.suscess = suscess;
    }

    public setMessage(message: string) {
        this.message = message;
    }

}

export default DeleteSheetResponse;