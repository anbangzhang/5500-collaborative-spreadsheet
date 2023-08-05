class SheetVO {
    private id: string;
    private name: string;
    private owner: string;

    constructor(id: string, name: string, owner: string) {
        this.id = id;
        this.name = name;
        this.owner = owner;
    }

    getId(): string {
        return this.id;
    }
    
    getName(): string {
        return this.name;
    }

    getOwner(): string {
        return this.owner;
    }

    setId(id: string) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setOwner(owner: string) {
        this.owner = owner;
    }
    
}

export default SheetVO;