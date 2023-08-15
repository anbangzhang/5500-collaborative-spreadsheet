// Interact with the server to get the spreadsheets
import { useCallback, useEffect, useState } from "react";
import { PortsGlobal } from "../PortsGlobal";


const port = PortsGlobal.serverPort;

const hostname = window.location.hostname;
const baseURL = `http://${hostname}:${port}`;

interface ControlPanelProps {
    userName: string;
}

interface Sheet {
    name: string;
    owner: string;
    id: string;
}

export function ControlPanel( {userName}: ControlPanelProps) {
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
        return <div className="control panel">
            <h4>Try clicking the 'edit' button</h4>
            <h4>...Or create your own spreadsheet!</h4>
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
                                } else {
                                    createSheet(newSheetName, userName);
                                }
                            }}
                            style={{position: "relative", left: "80px"}}>
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
                        {getEditSheet(sheet)}
                        {getDeleteSheet(sheet, userName)}
                    </li>
            })}            
        </ul>
    }

    function getEditSheet(sheet: Sheet) {
        const jumpTo = (userName: string) => {
            const w = window.open(`/${sheet.id}`);
            if (w) {
                w.focus();
            } else {
                alert('Please allow popups for this website');
            }
        }
        return <button onClick={() => {jumpTo(userName)}}>Edit</button>
    }

    function deleteSheet(sheet_id: string, user_name: string) {
        const path = `/deleteSheet`;
        const requestURL = baseURL + path;
        let token = btoa(user_name);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                "sheet_id": sheet_id
            })
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            })
            .then((json) => {
                console.log(`json: ${json}`);
                if (json.success) {
                    let newSheets = sheets.filter((sheet) => {
                        return sheet.id !== sheet_id;
                    })
                    setSheets(newSheets);
                } else {
                    let error = json.errorMessage;
                    alert(error);
                }
            })
    }

    function getDeleteSheet(sheet: Sheet, user_name: string) {
        return <button onClick={() => 
            deleteSheet(sheet.id, user_name)}>
            Delete
        </button>
    }

    function createSheet(sheet_name: string, user_name: string) {
        const path = `/createSheet`;
        const requestURL = baseURL + path;
        let token = btoa(user_name);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                "name": sheet_name
            })
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            })
            .then((json) => {
                console.log(`json: ${json}`);
                let newSheetID = json.id;
                let createSuccess = json.success;
                if (!createSuccess) {
                    let error = json.errorMessage;
                    alert(error);
                    return;
                }
                let newSheet = {
                    name: sheet_name,
                    owner: user_name,
                    id: newSheetID
                }
                setSheets([...sheets, newSheet]);
            })
    }

    return (
        <div>
            <h2>Your spreadsheets</h2>
            {getControlButtons()}
            {showSheetList && getSheetsDisplay()}
        </div>
    );

}

export default ControlPanel;