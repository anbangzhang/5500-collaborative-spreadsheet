import Sheet from '../../db/Sheet';
import fs from 'fs';
import path from 'path';

export { };

describe('Sheet', () => {
    let sheet: Sheet;

    beforeEach(() => {
        // get a unique sheetName for the test
        const sheetName = `test-sheet-${Date.now()}`
        // create a new sheet
        sheet = new Sheet(sheetName, 'Anonymous', '1');
    });

    afterAll(() => {
        // delete all the files that start with test-sheet
        const directory = path.join(__dirname, '../db/data');
        const files = fs.readdirSync(directory);
        for (const file of files) {
        // check if it is a test file
            if (file.startsWith('test-sheet')) {
                fs.unlinkSync(path.join(directory, file));
            }
        }
    });

    describe('constructor', () => {
        let id: number = 1;
        it('should create a new sheet instance', () => {
            expect(sheet.getId()).toEqual(id.toString());
        });

        it('should have a filename', () => {
            expect(sheet.getName()).toContain('test-sheet');
        });

        it('should have an Anonymous owner', () => {
            expect(sheet.getOwner()).toBe('Anonymous');
        });
    });


    describe('setOwner', () => {
        it('should set the owner of the sheet', () => {
            const owner = 'Test';
            sheet.setOwner(owner);
            expect(sheet.getOwner()).toBe(owner);
        });
    });

});