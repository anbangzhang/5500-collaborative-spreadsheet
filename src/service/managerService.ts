
// Library imports
import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import Database from '../database';
import GetSheetRequest from './request/getSheetReqeust';
import GetSheetResponse from './response/GetSheetResponse';
import GetSheetListResponse from './response/getSheetListResponse';
import DeleteSheetRequest from './request/deleteSheetRequest';
import DeleteSheetResponse from './response/deleteSheetResponse';
import CreateSheetRequest from './request/createSheetRequest';
import CreateSheetResponse from './response/createSheetResponse';

// ManagerService
//

export class ManagerService {
    private database: any;

    constructor() {
        this.database = new Database();
    }

    // get sheet list
    //
    // returns a list of all the sheets in the database
    public getSheetList(): GetSheetListResponse {
        const response = new GetSheetListResponse();
        return response;
    }

    // get sheet
    //
    // returns a sheet with the given id
    public getSheet(req: GetSheetRequest): GetSheetResponse {
        const document = this.database.getDocument(req.getSheetID());
        return new GetSheetResponse(document.getID(), document.getName(), document.getOwner());
    }

    // create sheet
    public createSheet(req: CreateSheetRequest): CreateSheetResponse {
        const response = new CreateSheetResponse();
        return response;
    }

    // delete sheet
    public deleteSheet(req: DeleteSheetRequest): DeleteSheetResponse {
        const response = new DeleteSheetResponse(true, "");
        return response;
    }


    public updateCell(req: any): boolean {
        return true;
    }
    
}

export default ManagerService;