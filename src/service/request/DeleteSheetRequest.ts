
export class DeleteSheetRequest {
    private id: string;
    private user: string;

    constructor(id: string, user: string) {
        this.id = id;
        this.user = user;
    }

    public setSheetID(id: string) {
        this.id = id;
    }

    public getSheetID(): string {
        return this.id;
    }

    public setUser(user: string) {
        this.user = user;
    }

    public getUser(): string {
        return this.user;
    }

}

export default DeleteSheetRequest;
