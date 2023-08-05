export { };
import Sheet from './Sheet';
import * as fs from 'fs';
import * as path from 'path';

describe('Sheet', () => {
    let sheet: Sheet;

    beforeEach(() => {
        // get a unique filename for the test
        const filename = `test-sheet-${Date.now()}`
        // create a new sheet
        sheet = new Sheet(filename);
    });

    afterEach(() => {
        const filename = sheet['_filename'];

        // check if file exists
        if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
        } else {
            console.log(`File ${filename} does not exist`);
        }

    });

    afterAll(() => {
        // delete all the files that start with test-sheet
        const directory = path.join(__dirname, 'Data');
        const files = fs.readdirSync(directory);
        for (const file of files) {
            // check if it is a test file
            if (file.startsWith('test-sheet')) {
                fs.unlinkSync(path.join(directory, file));
            }
        }
    });

    describe('constructor', () => {
        it('should create a new sheet instance', () => {
            expect(sheet).toBeDefined();
        });

        it('should load the cells from the sheet', () => {
            expect(sheet.getCells()).toBeDefined();
            expect(sheet.getCells().size).toBe(0);
        });

        it('should have a filename', () => {
            expect(sheet['_filename']).toBeDefined();
        });

        it('should have an Anonymous owner', () => {
            expect(sheet.getOwner()).toBe('Anonymous');
        });
    });

    describe('addToken', () => {
        it('should add a token to the list of tokens', () => {
            const token1 = '1';
            const token2 = '+';
            const token3 = '2';
            const cellLabel = 'A1';
            sheet.addToken(cellLabel, token1);
            sheet.addToken(cellLabel, token2);
            sheet.addToken(cellLabel, token3);
            expect(sheet.getCells().size).toBe(1);
            const tokenTest = sheet.getCells().get(cellLabel);
            expect(tokenTest).toBeDefined();
            console.log(tokenTest)
            expect(tokenTest).toStrictEqual([token1, token2, token3]);
        });
    });

    describe('removeToken', () => {
        it('should remove a token from the list of tokens', () => {
            const token1 = '1';
            const token2 = '+';
            const token3 = '2';
            const cellLabel = 'A1';
            sheet.addToken(cellLabel, token1);
            sheet.addToken(cellLabel, token2);
            sheet.addToken(cellLabel, token3);
            sheet.removeToken(cellLabel);
            expect(sheet.getCells().size).toBe(1);
            const tokenTest = sheet.getCells().get(cellLabel);
            expect(tokenTest).toBeDefined();
            expect(tokenTest).toStrictEqual([token1, token2]);
        });
    });

    describe('clearFormula', () => {
        it('should clear the formula from the cell', () => {
            const token1 = '1';
            const token2 = '+';
            const token3 = '2';
            const cellLabel = 'A1';
            sheet.addToken(cellLabel, token1);
            sheet.addToken(cellLabel, token2);
            sheet.addToken(cellLabel, token3);
            sheet.clearFormula(cellLabel);
            expect(sheet.getCells().size).toBe(1);
            const tokenTest = sheet.getCells().get(cellLabel);
            expect(tokenTest).toBeDefined();
            expect(tokenTest).toStrictEqual([]);
        });
    });

    describe('getFormula', () => {
        it('should return the formula from the cell', () => {
            const token1 = '1';
            const token2 = '+';
            const token3 = '2';
            const cellLabel = 'A1';
            sheet.addToken(cellLabel, token1);
            sheet.addToken(cellLabel, token2);
            sheet.addToken(cellLabel, token3);
            const formula = sheet.getFormula(cellLabel);
            expect(formula).toBeDefined();
            expect(formula).toStrictEqual([token1, token2, token3]);
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