// Interact with the server to get the spreadsheets
import { useCallback, useEffect, useState } from "react";
import { setInterval } from "timers/promises";
import { PortsGlobal } from "../PortsGlobal";

const port = PortsGlobal.serverPort;

const hostname = window.location.hostname;
const baseURL = `http://${hostname}:${port}`;


interface ControlPanelProps {
    resetURL: (sheetID: string) => void;
}

export function ControlPanel( {resetURL}: ControlPanelProps) {

    const [sheets, setSheets] = useState<string[]>([]);
    const [newSheetName, setNewSheetName] = useState<string>('');

    const getSheets = useCallback(() => {
        const requestURL = baseURL + '/sheets';

        fetch(requestURL)
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


    function getControlButtons() {
        return <div>
            <h4>Control Panel</h4>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <input
                                type="text"
                                placeholder="Sheet name"
                                onChange={(event) => {
                                    // get the text from the input
                                    let sheetName = event.target.value;
                                    // set the file name
                                    setNewSheetName(sheetName);
                                }}
                            />
                        </td>
                        <td>
                            <button onClick={() => {
                                if (newSheetName === '') {
                                    alert("Please enter a name for the new sheet!");
                                    return;
                                }
                                resetURL(newSheetName);
                            }}>
                                Create new sheet
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={getSheetsDisplay}>List all sheets</button>
                        </td>
                        <td>
                            <button onClick={clearSheetList}>Clear List</button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    }


    // return a <ul> list of the sheets
    function getSheetsDisplay() {
        return <ul>
            {sheets.map((sheet) => {
                return <li key={sheet}>
                    {getSheetName(sheet)}
                </li>
            })}
        </ul>
        //TODO: Add edit and delete buttons
    }

    // return a text box containing a sheet's name
    function getSheetName(sheet: string) {
        return <input
            type="text"
            defaultValue={sheet}
        />
    }

    function getEditSheet(sheetId: string) {
        return <button onClick={() =>
            resetURL(sheetId)}>
            Edit
        </button>
    }

    function getDeleteSheet(sheetId: string) {
        return <button onClick={() => 
            deleteSheet(sheetId)}>
            Delete
        </button>
    }

}