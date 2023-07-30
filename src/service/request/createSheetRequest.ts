
export class CreateSheetRequest {
    private name: string;
    private user: string;

    constructor() {
        this.name = "";
        this.user = "";
    }

    public setName(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setUser(user: string) {
        this.user = user;
    }

    public getUser(): string {
        return this.user;
    }

}

export default CreateSheetRequest;