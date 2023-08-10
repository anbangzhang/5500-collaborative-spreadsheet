import Sheet from '../db/Sheet';
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