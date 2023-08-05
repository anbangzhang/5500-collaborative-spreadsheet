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

    // rendering the home page
    const getSheetList = useCallback(() => {
        const requestURL = baseURL + '/getSheetList'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            })
            .then((json) => {
                console.log(`json: ${json}`);
                setSheets(json);
            })
            .catch((error) => {
                console.log(`getSheets error: ${error}`);
            });
    }, []);

    function deleteSheet(sheet_id: string, user_name: string) {
        const path = `/deleteSheet`;
        const requestURL = baseURL + path;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': user_name//TODO: get token from local storage
            },
            body: JSON.stringify({
                sheet_id: sheet_id
            })
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            })
            .then((json) => {
                console.log(`json: ${json}`);
            })
            .catch((error) => {
                console.log(`deleteSheet error: ${error}`);
            });
    }

    function createSheet(sheet_name: string, user_name: string) {
        const path = `/createSheet`;
        const requestURL = baseURL + path;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': user_name//TODO: get token from local storage
            },
            body: JSON.stringify({
                sheet_name: sheet_name,
                user_name: user_name
            })
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            })
            .then((json) => {
                console.log(`json: ${json}`);
            })
            .catch((error) => {
                console.log(`createSheet error: ${error}`);
            });
    }


    // rendering the sheet detail page

    //function getSheet() {

    //function lockCell() {

    //function releaseCell() {
    
    //function updateCell() {



    


}