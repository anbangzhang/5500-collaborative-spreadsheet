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
import SheetDetail from './SheetDetail';

export class SheetDB {
    private _sheets: Sheet[] = [];
    private _sheetDetails: SheetDetail[] = [];
    private _sheetDirectory: string = path.join(__dirname, "data");
    private _sheetFile: string = path.join(__dirname, "data/sheet.json");
    private _sheetDetailFile: string = path.join(__dirname, "data/sheetDetail.json");
    private _nextId: number = 1;


    constructor(test?: boolean) {
        if (test) {
            this._sheetDirectory = path.join(__dirname, "test/data");
            this._sheetFile = path.join(__dirname, "data/test_sheet.json");
            this._sheetDetailFile = path.join(__dirname, "data/test_sheetDetail.json");
        }
        this._initializeDirectory();
        this._loadSheets();
        this._loadSheetDetails();
    }

    private _initializeDirectory() {
        if (!fs.existsSync(this._sheetDirectory)) {
            fs.mkdirSync(this._sheetDirectory, { recursive: true });
        }
    }

    private _loadSheets() {
        let sheetContent = fs.readFileSync(this._sheetFile, 'utf8');

        const data = JSON.parse(sheetContent);
        for (let sheet of data) {
            let newSheet = new Sheet(sheet._name, sheet._owner, sheet._id);
            this._sheets.push(newSheet);
            if (this._nextId <= parseInt(sheet._id)) {
                this._nextId = parseInt(sheet._id) + 1;
            }
        }
    }

    private _loadSheetDetails() {
        let sheetDetailContent = fs.readFileSync(this._sheetDetailFile, 'utf8');

        const data = JSON.parse(sheetDetailContent);
        for (let detail of data) {
            let newDetail = new SheetDetail(detail._id, detail._cells);
            this._sheetDetails.push(newDetail);
        }
    }

    private saveSheet() {
        fs.writeFileSync(this._sheetFile, JSON.stringify(this._sheets, null, 2));
    }

    private saveSheetDetail() {
        fs.writeFileSync(this._sheetDetailFile, JSON.stringify(this._sheetDetails, null, 2));
    }


    public getSheetByName(sheetName: string): Sheet {
        const sheet = this._sheets.find(sheet => sheet.getName() === sheetName);
        if (sheet) {
            return sheet;
        }
        throw new Error(`Spreadsheet ${sheetName} does not exist`);

    }

    public getSheetById(id: string): Sheet {
        const sheet = this._sheets.find(sheet => sheet.getId() == id);
        if (sheet) {
            return sheet;
        }
        throw new Error(`Spreadsheet Id:${id} does not exist`);
    }

    public deleteSheetById(id: string): void {
        const index = this._sheets.findIndex(sheet => sheet.getId() == id);
        if (index >= 0) {
            this._sheets.filter(sheet => sheet.getId() != id);
            this._sheetDetails.filter(detail => detail.getId() != id);
            this.saveSheet();
            this.saveSheetDetail();
        }
    }

    public getSheetDetailById(id: string): SheetDetail {
        const sheetDetail = this._sheetDetails.find(detail => detail.getId() == id);
        if (sheetDetail) {
            return sheetDetail;
        }
        throw new Error(`SheetDetail Id:${id} does not exist`);
    }

    public getSheets(): Sheet[] {
        return [...this._sheets.values()];
    }

    public createSheet(sheetName: string = "spreadsheet", owner: string): Sheet {
        // check to see if the sheet exists
        if (this._sheets.find(sheet => sheet.getName() === sheetName)) {
            throw new Error(`Spreadsheet ${sheetName} already exists`);
        }
        // create the sheet
        let sheet = new Sheet(sheetName, owner, this._nextId.toString());
        this._sheets.push(sheet);
        this._sheetDetails.push(new SheetDetail(this._nextId.toString()));
        this._nextId++;
        this.saveSheetDetail();
        this.saveSheet();
        return sheet;
    }

    public updateSheetDetailById(sheetDetail: SheetDetail) {
        const index = this._sheetDetails.findIndex(detail => detail.getId() === sheetDetail.getId());
        if (index >= 0) {
            this._sheetDetails[index] = sheetDetail;
            this.saveSheetDetail();
        } else {
            throw new Error(`SheetDetail Id:${sheetDetail.getId()} does not exist`);
        }
    }

}

export default SheetDB;