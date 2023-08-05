/**
 *  This class is responsible for managing the dependencies in the sheet
 * 
 *  A cell has a property called dependsOn which is a list of cells that the cell depends on
 * 
 * This class exports the following functions
 * 
 * 0. addCellDependency(cellLabel: string, newDependsOn: string, sheetMemory: SheetMemory): boolean 
 *    - add a cell dependency to a cell, if the new dependency introduces a circular dependency, then return false
 * 1. getComputationOrder(sheetMemory: SheetMemory): string[]
 *   - get the computation order for the sheet this way the FormulaEvaluator can compute the cells in the correct order
 * 
 * Internal routines marked private
 * 
 * 1. updateDependencies(sheetMemory: SheetMemory): void
 *  - update the dependencies for all cells in the sheet
 * 2. updateComputationOrder(sheetMemory: SheetMemory): string[]
 * - update the computation order for the sheet
 * 3. expandDependencies(cellLabel: string, sheetMemory: SheetMemory): [boolean, string[]]
 * - expand the dependencies of a cell recursively 
 * 
 */

import SheetMemory from "./SheetMemory";
import Cell from "./Cell";
import FormulaBuilder from "./FormulaBuilder";
import FormulaEvaluator from "./FormulaEvaluator";



export default class CalculationManager {



    // Update the dependency graph of the sheet
    // get the computation order
    // compute the cells in the computation order
    // update the cells in the sheet memory
    public evaluateSheet(sheetMemory: SheetMemory): void {

        // update the dependencies
        this.updateDependencies(sheetMemory);

        // get the computation order
        let computationOrder: string[] = this.updateComputationOrder(sheetMemory);

        // compute the cells in the computation order, update the cells in the sheet memory
        this.computeAndUpdateCells(computationOrder, sheetMemory);

    }



    /**
     *  checck to see if it is ok to add a cell to the formula in the current cell.
     * 
     * @param {string} currentCellLabel - The label of the cell
     * @param {sheetMemory} SheetMemory - The sheet memory
     * */
    public okToAddNewDependency(currentCellLabel: string, newDependsOnCell: string, sheetMemory: SheetMemory): boolean {
        // Use the data in the spreadsheet in the cells to determine if it is ok to insert the new dependency
        // if the new dependency introduces a circular dependency then return false
        let queue = [newDependsOnCell];
        let visited = new Set();
        while (queue.length > 0) {
            let curLabel = queue.shift()!;
            if (curLabel === currentCellLabel) {
                return false;
            }
            if (!visited.has(curLabel)) {
                visited.add(curLabel);
                let curCell = sheetMemory.getCellByLabel(curLabel);
                for (let cell of curCell.getDependsOn()) {
                    queue.push(cell);
                }
            }
        }
        // otherwise return true
        return true;
        // hint: use the expandDependencies function to expand the dependencies of the new dependency
    }



    /**
     * use the formulas to extract the dependencies for each cell
     * */
    public updateDependencies(sheetMemory: SheetMemory) {
        for (let row of sheetMemory.getCells()) {
            for (let cell of row) {
                let formula = cell.getFormula()!;
                if (formula.length > 0) {
                    let dependencies = FormulaBuilder.getCellReferences(formula);
                    for (let dependency of dependencies) {
                        this.addCellDependency(cell, dependency, sheetMemory);
                    }
                }
            }
        }
    }


    /**
     * get the computation order for the sheet
     * @param {sheetMemory} SheetMemory - The sheet memory
     * @returns {string[]} - The computation order 
     * topological sort (hint)
     * 
     * */
    public updateComputationOrder(sheetMemory: SheetMemory): string[] {
        let resultingComputationOrder: string[] = [];

        let queue: string[] = [];
        let prerequisiteMap: Map<string, number> = new Map();
        let dependByMap: Map<string, string[]> = new Map();

        // initialize the prerequisiteMap
        for (let row of sheetMemory.getCells()) {
            for (let cell of row) {
                prerequisiteMap.set(cell.getLabel(), cell.getDependsOn().length);
            }
        }

        // update the inDegree map
        for (let row of sheetMemory.getCells()) {
            for (let cell of row) {
                for (let dependency of cell.getDependsOn()) {
                    dependByMap.set(dependency, [...(dependByMap.get(dependency) || []), cell.getLabel()]);
                }
            }
        }

        // add the cells with prerequisiteMap 0 to the queue
        for (let row of sheetMemory.getCells()) {
            for (let cell of row) {
                if (prerequisiteMap.get(cell.getLabel()) === 0) {
                    queue.push(cell.getLabel());
                }
            }
        }

        // while the queue is not empty
        while (queue.length > 0) {
            // dequeue a cell
            let curCellLabel = queue.shift()!;
            // add the cell to the resulting computation order
            resultingComputationOrder.push(curCellLabel);
            // for each cell that depends on the current cell
            for (let cellLabel of dependByMap.get(curCellLabel) || []) {
                // decrement the prerequisiteMap of the cell
                prerequisiteMap.set(cellLabel, prerequisiteMap.get(cellLabel)! - 1);
                // if the prerequisiteMap of the cell is 0 then add the cell to the queue
                if (prerequisiteMap.get(cellLabel) === 0) {
                    queue.push(cellLabel);
                }
            }
        }

        // return the resulting computation order
        return resultingComputationOrder;
    }

    /**
     * compute the cells in the computation order, update the cells in the sheet memory
     * @param {string[]} computationOrder - The computation order
     * @param {sheetMemory} sheetMemory - The sheet memory
     */
    public computeAndUpdateCells(computationOrder: string[], sheetMemory: SheetMemory): void {
        let formulaEvaluator = new FormulaEvaluator(sheetMemory);
        // for each cell in the computation order
        for (let cellLabel of computationOrder) {
            // get the cell
            let cell = sheetMemory.getCellByLabel(cellLabel);
            // get the formula
            let formula = cell.getFormula()!;
            // if the formula is not empty
            if (formula.length > 0) {
                // evaluate the formula
                formulaEvaluator.evaluate(formula);
                // set the value of the cell to the result
                cell.setValue(formulaEvaluator.result);
                // set the error of the cell to the error
                cell.setError(formulaEvaluator.error);
            }
        }

    }

    /**
     * add a cell dependency to a cell, if the new dependency introduces a circular dependency, then return false
     * @param {Cell} cell - The cell
     * @param {string} newDependsOn - The label of the new dependency
     * @param {sheetMemory} sheetMemory - The sheet memory
     */
    public addCellDependency(cell: Cell, newDependsOn: string, sheetMemory: SheetMemory) {
        // check to see if the cell is already a dependency
        if (cell.getDependsOn().indexOf(newDependsOn) === -1) {
            let dependsOn = cell.getDependsOn();
            dependsOn.push(newDependsOn);
            cell.setDependsOn(dependsOn);
        }
    }
}
