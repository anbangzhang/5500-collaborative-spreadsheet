
export class CreateSheetRequest {
    private name: string;
    private user: string;

    constructor(name: string, user: string) {
        this.name = name;
        this.user = user;
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
