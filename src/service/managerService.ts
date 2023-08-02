
// Library imports
import * as fs from 'fs';
import * as path from 'path';
import Database from '../database';
import GetSheetRequest from './request/getSheetReqeust';
import GetSheetResponse from './response/getSheetResponse';
import GetSheetListResponse from './response/getSheetListResponse';
import DeleteSheetRequest from './request/deleteSheetRequest';
import DeleteSheetResponse from './response/deleteSheetResponse';
import CreateSheetRequest from './request/createSheetRequest';
import CreateSheetResponse from './response/createSheetResponse';
import UpdateCellRequest from './request/updateCellRequest';
import LockCellRequest from './request/lockCellRequest';
import CellLockService from './cellLockService';
import SheetMemoryCacheService from './sheetMemoryCacheService';

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
        // if the sheet is cached in the sheetMemoryCacheService, use that
        // else calculate the sheetMemory
        // cache the sheetMemory in the sheetMemoryCacheService
        // return the response
        return response;
    }

    // get sheet
    //
    // returns a sheet with the given id
    public getSheet(req: GetSheetRequest): GetSheetResponse {
        const document = this.database.getDocument(req.getSheetID());
        return new GetSheetResponse(document.getID(), document.getName(), document.getOwner());
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