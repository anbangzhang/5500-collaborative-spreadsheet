import SheetMemory from "../../engine/SheetMemory";

describe('SheetMemory', () => {
  describe('constructor', () => {
    describe('when the sheet memory is created', () => {
      describe('when the max rows and columns are not set', () => {
        it('getMaxRows should return 5, and getMaxColumns should return 5', () => {
          const sheetMemory = new SheetMemory(5, 5);
          const testMaxRows = sheetMemory.getNumRows();
          const testMaxColumns = sheetMemory.getNumColumns();
          expect(testMaxRows).toEqual(5);
          expect(testMaxColumns).toEqual(5);
        });
      });

      describe('cells should have labels that are column row pairs', () => {
        it('should have the correct labels', () => {
          const sheetMemory = new SheetMemory(5, 5);
          const testGetCell = sheetMemory.getCellByLabel("A1");
          expect(testGetCell.getLabel()).toEqual("A1");
        });
      });

      describe('when the max rows and columns are set', () => {
        it('getMaxRows should return 8, and getMaxColumns should return 7', () => {
          const testMaxRows = 8;
          const testMaxColumns = 7;
          const sheetMemory = new SheetMemory(testMaxColumns, testMaxRows);
          const testSetMaxRows = sheetMemory.getNumRows();
          const testSetMaxColumns = sheetMemory.getNumColumns();
          expect(testSetMaxRows).toEqual(testMaxRows);
          expect(testSetMaxColumns).toEqual(testMaxColumns);
        });
      });
    });
  });


});