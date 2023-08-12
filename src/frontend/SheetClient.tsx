import { PortsGlobal } from "../PortsGlobal";
import SheetMemoryVO from "./SheetMemoryVO";
import CellVO from "./CellVO";


const port = PortsGlobal.serverPort;

const hostname = window.location.hostname;
const baseURL = `http://${hostname}:${port}`;


const sheetClient = {
    getSheet(sheet_id: string): Promise<SheetMemoryVO> {
        const path = `/getSheet`;
        const requestURL = baseURL + path;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "sheet_id": sheet_id })
        }
        return fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            })
            .then((json) => {
                return convertToSheetMemoryVO(json);
            });
    }
}

function convertToSheetMemoryVO(json: any): SheetMemoryVO {
    let sheet_name = json.name;
    let sheet_owner = json.owner;
    let sheet_id = json.id;
    let sheet_column = json.cells.length;
    let sheet_row = json.cells[0].length;
    let sheet_memory = new SheetMemoryVO(sheet_column, sheet_row, sheet_id, sheet_name, sheet_owner);

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