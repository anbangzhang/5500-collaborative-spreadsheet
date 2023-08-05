
// Library imports
import * as fs from 'fs';
import * as path from 'path';
import Database from '../database';
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

// ManagerService
//

export class ManagerService {
    private database: any;
    private cellLockService: CellLockService;
    private sheetMemoryCacheService: SheetMemoryCacheService;

    constructor() {
        this.database = new Database();
        this.cellLockService = new CellLockService();
        this.sheetMemoryCacheService = new SheetMemoryCacheService();
    }

    
    // get sheet list
    //
    // returns a list of all the sheets in the database
    public getSheetList(): GetSheetListResponse {
        const response = new GetSheetListResponse();
        // load all the sheets from the database

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
        let sheet = this.database.getSheet(req.getSheetID());
        let response = new GetSheetResponse(sheet.getID(), sheet.getName(), sheet.getOwner());
        let cellVOs: CellVO[][] = [];
        const sheetMemory = this.sheetMemoryCacheService.getSheetMemory(req.getSheetID());
        if (!sheetMemory) {
            const sheetMemory = this.sheetMemoryCacheService.getSheetMemory(req.getSheetID());
            this.sheetMemoryCacheService.setSheetMemory(req.getSheetID(), sheetMemory);

        } else {
            const sheetMemory = this.database.getSheetMemory(req.getSheetID());
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
        return response;
    }

    // delete sheet
    public deleteSheet(req: DeleteSheetRequest): DeleteSheetResponse {
        const response = new DeleteSheetResponse(true, "");
        return response;
    }

    // clear sheet list
    public clearSheetList(): boolean {
        return true;
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
        return true;
    }
    
}

export default ManagerService;