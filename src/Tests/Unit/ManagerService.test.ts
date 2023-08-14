import { ManagerService } from "../service/ManagerService";
import GetSheetRequest from "../service/request/GetSheetReqeust";
import LockCellRequest from "../service/request/LockCellRequest";
import ReferenceCheckReqeust from "../service/request/ReferenceCheckRequest";

export { };

describe("ManagerService", () => {
    let managerService: ManagerService;

    beforeEach(() => {
        managerService = new ManagerService();
    });

    describe("getSheetList", () => {
        it("should return a list of sheets", () => {
            const response = managerService.getSheetList();
            expect(response.getSheets().length).toBeGreaterThanOrEqual(4);
        });
    });

    describe("getSheet", () => {
        it("should return a sheet", () => {
            let req = new GetSheetRequest("1");
            const response = managerService.getSheet(req);
            expect(response.getID()).toEqual('1');
            expect(response.getName()).toEqual('sample sheet 1');
        });
    });

    describe("lock cell", () => {
        it("should lock a cell", () => {
            let req = new LockCellRequest("1", "A1", "user1");
            const response = managerService.lockCell(req);
            expect(response).toEqual(true);
        });

        it("should not lock a cell", () => {
            managerService.lockCell(new LockCellRequest("1", "A1", "user1"));
            let req = new LockCellRequest("1", "A1", "user2");
            const response = managerService.lockCell(req);
            expect(response).toEqual(false);
        });
    });

    describe("release cell", () => {
        it("should unlock a cell", () => {
            managerService.lockCell(new LockCellRequest("1", "A1", "user1"));
            let req = new LockCellRequest("1", "A1", "user1");
            const response = managerService.releaseCell(req);
            expect(response).toEqual(true);
        });

        it("should not unlock a cell", () => {
            managerService.lockCell(new LockCellRequest("1", "A1", "user1"));
            let req = new LockCellRequest("1", "A1", "user2");
            const response = managerService.releaseCell(req);
            expect(response).toEqual(false);
        });
    });

    describe("reference check", () => {
        it("should return a allowed reference check response", () => {
            let req = new ReferenceCheckReqeust("1", "A1", "A2");
            const response = managerService.referenceCheck(req);
            expect(response.getAllow()).toEqual(true);
        });
    });
});