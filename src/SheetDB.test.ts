import SheetDB from './SheetDB';
import Sheet from './Sheet';

describe('SheetDB', () => {
    let database: SheetDB;

    beforeEach(() => {
        // clean out  __dirname/Data


        database = new SheetDB();
    });

    afterAll(() => {
        const fs = require('fs');
        const path = require('path');
        const directory = path.join(__dirname, 'Data');
        const files = fs.readdirSync(directory);

        for (const file of files) {
            // check if it is a test file
            if (file.startsWith('test_xxx')) {
                fs.unlinkSync(path.join(directory, file));
            }
        }
    });

    describe('getSheet', () => {
        it('should return a sheet with the given name', () => {
            const sheetName = 'test_xxx';
            const sheet = database.createSheet(sheetName);
            // add a task to the sheet
            sheet.addToken('A1', 'test task');

            const result = database.getSheet(sheetName);
            const cells = result.getCells();

            expect(['test task']).toStrictEqual(cells.get('A1'));
            expect(result).toBe(sheet);
        });

    });

    describe('getSheets', () => {
        it('should return an array of all sheets in the database', () => {
            const sheet1 = database.createSheet('test_xxx1');
            const sheet2 = database.createSheet('test_xxx2');
            const result = database.getSheets();
            expect(result).toContain(sheet1);
            expect(result).toContain(sheet2);
        });
    });

    describe('createSheet', () => {
        it('should create a new sheet with the given name', () => {
            const sheetName = 'test_xxx2';
            const fs = require('fs');
            const path = require('path');
            const file = path.join(__dirname, 'Data', sheetName + '.json');

            // delete the file if it exists
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }

            const result = database.createSheet(sheetName);
            expect(result).toBeInstanceOf(Sheet);
            // check that the file for the sheet exists
            // the file should be in __dirname/Data/sheetName.json

            const fileExists: boolean = fs.existsSync(file);

            expect(fileExists).toBe(true);
        });
    });
});