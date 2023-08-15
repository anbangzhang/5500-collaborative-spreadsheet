import { useState, useEffect, SetStateAction } from "react";
import SheetMemoryVO from "../SheetMemoryVO";
import { sheetClient } from "../SheetClient";
import SpreadSheet from "./SpreadSheet";
import { getCookie } from "../utils/CookieUtil";

import "./SheetPage.css";

function SheetPage(props: any) {
    const [loading, setLoading] = useState(false);
    const [sheet, setSheet] = useState<SheetMemoryVO | null>(null);
    const [error, setError] = useState<string | null>(null);
    let currentURL = window.location.href;
    const returnLoggedInUser = (user: string) => {
        if (user.length > 0) {
            return 'Hello! You are using this spreadsheet as: ' + user;
        } else {
            return 'Hello! You are using this spreadsheet as Anonymous';
        }
    }

    let user = 'Anonymous';
    if (getCookie('user') !== null) {
        user = getCookie('user')!;
    }

    let currentCell = getCookie('currentCell');
    if (currentCell === null) {
        currentCell = 'A1';
    }

    var id = currentURL.split('/')[currentURL.split('/').length - 1];

    useEffect(() => {
        setLoading(true);
        // check if the url contains a user name
        sheetClient.getSheet(id!)
        .then((sheet: SetStateAction<SheetMemoryVO | null>) => {
            setSheet(sheet);
            setLoading(false);
        })
        .catch((error: SetStateAction<string | null>) => {
            setError(error);
            setLoading(false);
        });
    }, [id]);

    return (
        <div className="container">
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                        <p>Loading...</p>
                </div>
            )}
            <div className="text">
                <h2>{returnLoggedInUser(user)}</h2>
                <h3>{sheet?.name}</h3>
                <h3>This spreadsheet is created by: {sheet?.owner}</h3>
            </div>
            {sheet && <SpreadSheet sheetMemory={sheet} currentUser={user} currentCellLabel={currentCell}/>}
        </div>
    )
}

export default SheetPage;