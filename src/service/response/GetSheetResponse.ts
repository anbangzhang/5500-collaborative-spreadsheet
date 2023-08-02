
export class GetSheetResponse {
    private id: string;
    private name: string;
    private owner: string;
        // key: cellLabel
    // value: user
    private occupiedCells: Map<string, string>;

    constructor(id: string, name: string, owner: string) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.occupiedCells = new Map<string, string>();
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

    public getOccupiedCells(): Map<string, string> {
        return this.occupiedCells;
    }

    public setOccupiedCells(occupiedCells: Map<string, string>) {
        this.occupiedCells = occupiedCells;
    }

}

export default GetSheetResponse;