import { PortsGlobal } from "../PortsGlobal";
import SheetMemoryVO from "./SheetMemoryVO";
import CellVO from "./CellVO";


const port = PortsGlobal.serverPort;

const hostname = window.location.hostname;
const baseURL = `http://${hostname}:${port}`;


const sheetClient = {
    async getSheet(sheet_id: string): Promise<SheetMemoryVO> {
        const path = `/getSheet`;
        const requestURL = baseURL + path;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "sheet_id": sheet_id })
        }
        const response = await fetch(requestURL, options);
        const json = await response.json();
        return convertToSheetMemoryVO(json);
    },
    async lockCell(sheet_id: string, cell_label: string, user: string): Promise<[boolean, string]> {
        const path = `/lockCell`;
        const requestURL = baseURL + path;
        let token = btoa(user);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                "sheet_id": sheet_id,
                "cell_label": cell_label
            })
        }
        const response = await fetch(requestURL, options);
        const json = await response.json();
        if (json.success) {
            return [true, ''];
        } else {
            return [false, json.errorMessage];
        }
    },
    async releaseCell(sheet_id: string, cell_label: string, user: string): Promise<[boolean, string]> {
        const path = `/releaseCell`;
        const requestURL = baseURL + path;
        let token = btoa(user);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                "sheet_id": sheet_id,
                "cell_label": cell_label
            })
        }
        const response = await fetch(requestURL, options);
        const json = await response.json();
        if (json.success) {
            return [true, ''];
        } else {
            return [false, json.errorMessage];
        }
    },
    async referenceCheck(sheet_id: string, current_cell: string, referenced_cell: string, user: string): Promise<[boolean, string]> {
        const path = `/referenceCheck`;
        const requestURL = baseURL + path;
        let token = btoa(user);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                "sheet_id": sheet_id,
                "current_cell": current_cell,
                "referenced_cell": referenced_cell
            })
        }
        const response = await fetch(requestURL, options);
        const json = await response.json();
        if (json.allow) {
            return [true, ''];
        } else {
            return [false, 'Causing circular reference'];
        }
    },
    async updateCell(sheet_id: string, cell_label: string, operator: string, user: string): Promise<boolean> {
        const path = `/updateCell`;
        const requestURL = baseURL + path;
        let token = btoa(user);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                "sheet_id": sheet_id,
                "cell_label": cell_label,
                "operator": operator
            })
        }
        const response = await fetch(requestURL, options);
        const json = await response.json();
        return json.success;

    }

}

function convertToSheetMemoryVO(json: any): SheetMemoryVO {
    let sheet_name = json.name;
    let sheet_owner = json.owner;
    let sheet_id = json.id;
    let sheet_column = json.cells.length;
    let sheet_row = json.cells[0].length;
    let _occupied = json.occupied_cells;
    let sheet_occupied = new Map<string, string>();
    for (let [k, v] of Object.entries(_occupied)) {
        if (typeof v === 'string') {
            sheet_occupied.set(k, v);
        }   
    }
    let sheet_memory = new SheetMemoryVO(sheet_column, sheet_row, sheet_id, sheet_name, sheet_owner, sheet_occupied);

    for (let i = 0; i < sheet_column; i++) {
        for (let j = 0; j < sheet_row; j++) {
            let cell = new CellVO();
            cell.setFormula(json.cells[i][j]._formula);
            cell.setValue(json.cells[i][j]._value);
            cell.setError(json.cells[i][j]._error);
            cell.setDisplayString(json.cells[i][j]._displayString);
            cell.setLabel(json.cells[i][j]._label);
            sheet_memory.setCellByColumnRow(i, j, cell);
        }
    }

    return sheet_memory;
}

                

    //function lockCell() {

    //function circularCheck() {

    //function releaseCell() {
    
    //function updateCell() {



export { sheetClient };