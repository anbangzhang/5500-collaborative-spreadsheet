import { useCallback, useState } from "react";
import { PortsGlobal } from "../PortsGlobal";
import GetSheetListResponse from "../service/response/GetSheetListResponse";


const port = PortsGlobal.serverPort;

const hostname = window.location.hostname;
const baseURL = `http://${hostname}:${port}`;

interface SheetClientProps {
    sheetID: string;
    userName: string;
    resetURL: (sheetID: string) => void;
}

export function SheetClient({ sheetID, userName, resetURL }: SheetClientProps) {
    let localHostName = window.location.hostname;
    console.log(`localHostName: ${localHostName}`);
    console.log(`SheetClient rendering with sheetID=${sheetID}`);
    
    const [sheets, setSheets] = useState<string[]>([]);

    // rendering the sheet detail page

    function getSheet(sheet_id: string) {
        const path = `/getSheet`;
        const requestURL = baseURL + path;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "sheet_id": sheet_id })
        }
        fetch(requestURL, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                

    //function lockCell() {

    //function releaseCell() {
    
    //function updateCell() {



    


}