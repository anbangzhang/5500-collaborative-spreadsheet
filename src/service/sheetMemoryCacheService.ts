
import SheetMemory from "../engine/SheetMemory";

export class SheetMemoryCacheService {
    // key: sheetId
    // value: SheetMemory
    private sheetMemoryMap = new Map<string, SheetMemory>();

    public getSheetMemory(sheetId: string): SheetMemory | undefined {
        return this.sheetMemoryMap.get(sheetId);
    }

    public setSheetMemory(sheetId: string, sheetMemory: SheetMemory): void {
        this.sheetMemoryMap.set(sheetId, sheetMemory);
    }
    
}

export default SheetMemoryCacheService;