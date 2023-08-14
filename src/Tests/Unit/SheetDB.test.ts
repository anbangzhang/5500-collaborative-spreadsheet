import SheetDB from '../db/SheetDB';

describe('SheetDB', () => {
    let sheetDB: SheetDB;

    beforeEach(() => {
        // clean out  __dirname/Data


        sheetDB = new SheetDB(true);
    });

    afterAll(() => {
        const fs = require('fs');
        const path = require('path');
        const directory = path.join(__dirname, '../db/data');
        const files = fs.readdirSync(directory);

        for (const file of files) {
            // check if it is a test file
            if (file.startsWith('test_xxx')) {
                fs.unlinkSync(path.join(directory, file));
            }
        }
    });

    describe('getSheets', () => {
        it('should return an array of all sheets in the database', () => {
            let sheets = sheetDB.getSheets();
            expect(sheets.length).toBe(2);
        });
    });

    describe('getSheetById', () => {
        it('should return a sheet with the given id', () => {
            let sheet = sheetDB.getSheetById('1');
            expect(sheet.getId()).toEqual(1);
            expect(sheet.getName()).toEqual('sample sheet 1');
            expect(sheet.getOwner()).toEqual('Bob');

            sheet = sheetDB.getSheetById('2');
            expect(sheet.getId()).toEqual(2);
            expect(sheet.getName()).toEqual('sample sheet 2');
            expect(sheet.getOwner()).toEqual('Sam');
        });
    });

    describe('getSheetDetailById', () => {
        it('should return a sheet detail with the given id', () => {
            const sheetDetail = sheetDB.getSheetDetailById('1');
            expect(sheetDetail.getId()).toEqual(1);
            expect(sheetDetail.getCells()[0][0]).toEqual(["1","+","4"]);
            expect(sheetDetail.getCells()[0][2]).toEqual(["3"]);

        });
    });

    describe('createSheet', () => {
        it('should fail to create a new sheet with the same name', () => {
            try {
                sheetDB.createSheet('sample sheet 1', 'test');
            } catch (e) {
                if (e instanceof Error) {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(e.message).toEqual('Spreadsheet sample sheet 1 already exists');
                }
            }
        });
    });

    describe('updateSheetDetailById', () => {
        it('should update the sheet detail with the given id', () => {
            const sheetDetail = sheetDB.getSheetDetailById('1');
            sheetDetail.setFormulaByColumnRow(0, 1, ['1', '+', '1']);
            sheetDB.updateSheetDetailById(sheetDetail);
            const updatedSheetDetail = sheetDB.getSheetDetailById('1');
            expect(updatedSheetDetail.getCells()[0][1]).toEqual(["1","+","1"]);
        });
    });

});