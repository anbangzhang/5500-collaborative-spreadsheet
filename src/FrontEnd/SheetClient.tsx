import { PortsGlobal } from "../PortsGlobal";


const port = PortsGlobal.serverPort;

const hostname = window.location.hostname;
const baseURL = `http://${hostname}:${port}`;

export function SheetClient() {

    const

    function clearSheetList() {

    }

    function deleteSheet(sheetID: string, userName: string) {
        const path = `/sheet/${sheetID}/${userName}`;
        const requestURL = baseURL + path;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sheetID: sheetID,
                userName: userName
            })
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            })
            .then((json) => {
                console.log(`json: ${json}`);
            }



}