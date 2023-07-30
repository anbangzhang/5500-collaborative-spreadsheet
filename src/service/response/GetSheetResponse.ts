
export class GetSheetResponse {
    private id: string;
    private name: string;
    private owner: string;

    constructor(id: string, name: string, owner: string) {
        this.id = id;
        this.name = name;
        this.owner = owner;
    }

    public getID(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getOwner(): string {
        return this.owner;
    }

    public setID(id: string) {
        this.id = id;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setOwner(owner: string) {
        this.owner = owner;
    }

    

}

export default GetSheetResponse;