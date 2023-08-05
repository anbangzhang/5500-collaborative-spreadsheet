
// Library imports
import GetSheetRequest from './request/GetSheetReqeust';
import GetSheetResponse from './response/GetSheetResponse';
import GetSheetListResponse from './response/GetSheetListResponse';
import DeleteSheetRequest from './request/DeleteSheetRequest';
import DeleteSheetResponse from './response/DeleteSheetResponse';
import CreateSheetRequest from './request/CreateSheetRequest';
import CreateSheetResponse from './response/CreateSheetResponse';
import UpdateCellRequest from './request/UpdateCellRequest';
import LockCellRequest from './request/LockCellRequest';
import CellLockService from './CellLockService';
import SheetMemoryCacheService from './SheetMemoryCacheService';
import CellVO from './model/CellVO';
import SheetDB from '../db/SheetDB';
import SheetDetail from '../db/SheetDetail';
import SheetMemory from '../engine/SheetMemory';
import CalculationManager from '../engine/CalculationManager';

// ManagerService
export class ManagerService {
    private database: SheetDB;
    private cellLockService: CellLockService;
    private sheetMemoryCacheService: SheetMemoryCacheService;
    private calculationManager: CalculationManager;

    constructor() {
        this.database = new SheetDB();
        this.cellLockService = new CellLockService();
        this.sheetMemoryCacheService = new SheetMemoryCacheService();
        this.calculationManager = new CalculationManager();
    }

    
    // get sheet list
    //
    // returns a list of all the sheets in the database
    public getSheetList(): GetSheetListResponse {
        const response = new GetSheetListResponse();
        const sheets = this.database.getSheets();
        // map each element in sheets to ["id": "sheet_id", "name": "sheet_name", "owner": "sheet_owner"]
        const sheetList = sheets.map(sheet => {
            return {
                "id": sheet.getId(),
                "name": sheet.getName(),
                "owner": sheet.getOwner()
            }
        });
        response.setSheets(sheetList);

        return response;
    }

    // get sheet
    //
    // returns a sheet with the given id
    public getSheet(req: GetSheetRequest): GetSheetResponse {
        // if the sheet is cached in the sheetMemoryCacheService, use that
        // else calculate the sheetMemory
        // cache the sheetMemory in the sheetMemoryCacheService
        // return the response
        let sheet = this.database.getSheetById(req.getSheetID());
        let response = new GetSheetResponse(sheet.getId(), sheet.getName(), sheet.getOwner());
        let cellVOs: CellVO[][] = [];
        let sheetMemory = this.sheetMemoryCacheService.getSheetMemory(req.getSheetID());
        // if the sheet is not cached in the sheetMemoryCacheService, calculate the sheetMemory
        if (!sheetMemory) {
            const sheetDetail = this.database.getSheetDetailById(req.getSheetID());
            sheetMemory = this.convertSheetDetailToSheetMemory(sheetDetail);
            this.sheetMemoryCacheService.setSheetMemory(req.getSheetID(), sheetMemory);
        }

        for (let column = 0; column < sheetMemory.getNumColumns(); column++) {
            cellVOs[column] = [];
            for (let row = 0; row < sheetMemory.getNumRows(); row++) {
                cellVOs[column][row] = new CellVO(sheetMemory.getCells()[column][row]);
            }
        }
        response.setCells(cellVOs);
        response.setOccupiedCells(this.cellLockService.getAllLockedCells(req.getSheetID()));

        return response;
    }

    // creates a new sheet with the given name and owner
    public createSheet(req: CreateSheetRequest): CreateSheetResponse {
        const response = new CreateSheetResponse();
        try {
            const sheet = this.database.createSheet(req.getName(), req.getUser());
            response.setID(sheet.getId());
            response.setSuccess(true);
            
        } catch (err) {
            if (err instanceof Error) {
                console.log(err);
                response.setSuccess(false);
                response.setErrorMessage(err.message);
            }
        }
        
        return response;
    }

    // delete sheet
    public deleteSheet(req: DeleteSheetRequest): DeleteSheetResponse {
        const response = new DeleteSheetResponse();
        try {
            let sheet = this.database.getSheetById(req.getSheetID());
            if (sheet.getOwner() !== req.getUser()) {
                throw new Error("User does not own sheet");
            }
            this.database.deleteSheetById(req.getSheetID());

        } catch (err) {
            if (err instanceof Error) {
                console.log(err);
                response.setSuccess(false);
                response.setErrorMessage(err.message);
            }
        }

        return response;
    }

    // lock cell
    public lockCell(req: LockCellRequest): boolean {
        return this.cellLockService.lockCell(req.getSheetID(), req.getCellLabel(), req.getUser());
    }

    // release cell
    public releaseCell(req: LockCellRequest): boolean {
        return this.cellLockService.unlockCell(req.getSheetID(), req.getCellLabel(), req.getUser());
    }

    // update cell
    public updateCell(req: UpdateCellRequest): boolean {
        const sheetDetail = this.database.getSheetDetailById(req.getSheetID());
        const operator = req.getOperator();
        if (operator === "C") {
        } else if (operator === "AC") {
        }
        return true;
    }
    
    private convertSheetDetailToSheetMemory(sheetDetail: SheetDetail): SheetMemory {
        const cells = sheetDetail.getCells();
        const column = cells.length;
        const row = cells[0].length;
        const sheetMemory = new SheetMemory(column, row);
        for (let col = 0; col < column; col++) {
            for (let r = 0; r < row; r++) {
                sheetMemory.setCellFormulaByColumnRow(col, r, cells[col][r]);
            }
        }
        this.calculationManager.evaluateSheet(sheetMemory);
        return sheetMemory;
    }

}

export default ManagerService;
