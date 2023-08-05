// Interact with the server to get the spreadsheets
import { useCallback, useEffect, useState } from "react";
import { PortsGlobal } from "../PortsGlobal";

const port = PortsGlobal.serverPort;

const hostname = window.location.hostname;
const baseURL = `http://${hostname}:${port}`;

interface ControlPanelProps {
    resetURL: (sheetID: string) => void;
}

interface Sheet {
    id: string;
    name: string;
    owner: string;
  }

export function ControlPanel( {resetURL}: ControlPanelProps) {

    const [sheets, setSheets] = useState<Sheet[]>([]);
    const [newSheetName, setNewSheetName] = useState<string>('');
    const [showSheetList, setShowSheetList] = useState<boolean>(false);

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
                console.log(`json: ${JSON.stringify(json)}`);

                setSheets(json);
            })
            .catch((error) => {
                console.log(`getSheets error: ${error}`);
            });
    }, []);

    useEffect(() => {
        getSheetList()
    }, [getSheetList]);

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
                                //resetURL(newSheetName);
                            }}>
                                Create new sheet
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => setShowSheetList(true)}>List all sheets</button>
                        </td>
                        <td>
                            <button onClick={() => setShowSheetList(false)}>Clear List</button>
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
                return <li key={parseInt(sheet.id!, 10)}>
                    <input
                    type="text"
                    defaultValue={sheet.name}
                    readOnly={true}
                    />
                    </li>
            })}            
        </ul>
    }

    function getEditSheet(sheet: { id: string; name: string; owner: string; }) {
        return <button onClick={() =>
            resetURL(sheet.id)}>
            Edit
        </button>
    }

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

    function getDeleteSheet(sheet: { id: string; name: string; owner: string; }) {
        return <button onClick={() => 
            deleteSheet(sheet.id, sheet.owner)}>
            Delete
        </button>
    }

    return <div>
        <h2>Control Panel</h2>
        {getControlButtons()}
        {showSheetList && getSheetsDisplay()}
    </div>

}

export default ControlPanel;