import SheetMemoryVO from "../SheetMemoryVO";

export class SheetHelper {

    /**
    * Get the Sheet Display Values
    * the GUI needs the data to be in row major order
    * 
    * @returns string[][]
    */
    public static getSheetDisplayStringsForGUI(sheetMemory: SheetMemoryVO): string[][] {

        let memoryDisplayValues = sheetMemory.getSheetDisplayStrings();
        let guiDisplayValues: string[][] = [];
        let inputRows = memoryDisplayValues.length;
        let inputColumns = memoryDisplayValues[0].length;

        for (let outputRow = 0; outputRow < inputColumns; outputRow++) {
            guiDisplayValues[outputRow] = [];
            for (let outputColumn = 0; outputColumn < inputRows; outputColumn++) {
                guiDisplayValues[outputRow][outputColumn] = memoryDisplayValues[outputColumn][outputRow];
            }
        }

        return guiDisplayValues;
    }

    public static getOccupiedCells(sheetMemory: SheetMemoryVO, currentUser: string): string[] {
        const occupiedCells = sheetMemory.getOccupiedCells();
        let result: string[] = [];
        for (let [label, user] of occupiedCells) {
            if (user !== currentUser) {
                result.push(label);
            }
        }
        return result;
    }

    public static getOccupiedCellsInMap(sheetMemory: SheetMemoryVO, currentUser: string): Map<string, string> {
        const occupiedCells = sheetMemory.getOccupiedCells();
        let result: Map<string, string> = new Map();
        for (let [label, user] of occupiedCells) {
            if (user !== currentUser) {
                result.set(label, user);
            }
        }
        return result;
    }

}

export default SheetHelper;