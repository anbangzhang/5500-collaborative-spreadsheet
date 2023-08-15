/**
 * A database that maintains multiple Sheet objects
 * 
 * The Sheets are all in ./Data/*.json
 * 
 * The SheetDB imports Sheet from Sheet.ts
 * 
 * The SheetDB has call through functions for each of the functions in Sheet.ts
 * 
 * The SheetDB has a function to get a Sheet by name
 * 
 * The SheetDB has a function to get a list of all the sheets
 * 
 * The SheetDB has a function to create a new sheet
 * 
 * For the purposes of this demo we will not have a function to delete a sheet
 * 
 * In this demo code we are using the spreadsheet.json file as the default sheet
 * 
 */
import * as fs from 'fs';
import * as path from 'path';
import Sheet from './Sheet';

export class SheetDB {
    private _sheets: Map<string, Sheet>;
    private _sheetDirectory: string = path.join(__dirname, "Data");


    constructor() {
        this._sheets = new Map<string, Sheet>();
        this._initializeDirectory();
        this._loadSheets();
    }

    private _initializeDirectory() {
        if (!fs.existsSync(this._sheetDirectory)) {
            fs.mkdirSync(this._sheetDirectory, { recursive: true });
        }
    }

    private _loadSheets() {
        let files = fs.readdirSync(this._sheetDirectory);

        for (let file of files) {
            let sheetName = path.parse(file).name;
            let sheet = new Sheet(sheetName);
            this._sheets.set(sheetName, sheet);
        }
    }

    public getSheet(sheetName: string): Sheet {
        const sheet = this._sheets.get(sheetName);
        if (sheet) {
            return sheet;
        }
        throw new Error(`Spreadsheet ${sheetName} does not exist`);

    }

    public getSheets(): Sheet[] {
        let sheets = [];
        for (let [name, sheet] of this._sheets) {
            sheets.push(sheet);
        }
        return sheets;
    }

    public createSheet(sheetName: string = "spreadsheet"): Sheet {
        let sheet = new Sheet(sheetName);
        this._sheets.set(sheetName, sheet);
        return sheet;
    }

    public reset(sheetName: string = "spreadsheet") {
        // check to see if the sheet exists
        if (!this._sheets.has(sheetName)) {
            // create the sheet
            this.createSheet(sheetName);
        }
        let sheet = this.getSheet(sheetName);
        sheet.reset();
    }
}

export default SheetDB;