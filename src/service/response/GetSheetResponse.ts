
import CellVO from "../model/CellVO";

export class GetSheetResponse {
    private id: string;
    private name: string;
    private owner: string;
    private cells: CellVO[][]; 
    // key: cellLabel
    // value: user
    private occupiedCells: Map<string, string>;

    
    constructor(id: string, name: string, owner: string) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.cells = [];
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

    public getCells(): CellVO[][] {
        return this.cells;
    }

    public setCells(cells: CellVO[][]) {
        this.cells = cells;
    }

    public getOccupiedCells(): Map<string, string> {
        return this.occupiedCells;
    }

    public setOccupiedCells(occupiedCells: Map<string, string>) {
        this.occupiedCells = occupiedCells;
    }

}

export default GetSheetResponse;