import { useState, useEffect, SetStateAction } from "react";
import SheetMemoryVO from "../SheetMemoryVO";
import { sheetClient } from "../SheetClient";
import SpreadSheet from "./SpreadSheet";

function SheetPage(props: any) {
    const [loading, setLoading] = useState(false);
    const [sheet, setSheet] = useState<SheetMemoryVO | null>(null);
    const [error, setError] = useState<string | null>(null);
    const currentURL = window.location.href;
    let user = '';
    // check if the url contains a user name
    if (currentURL.includes('?')) {
        const urlSegments = currentURL.split('?');
        const idSegments = urlSegments[0].split('/');
        var id = idSegments[idSegments.length - 1];
        // check if the user name is empty
        const userSegments = urlSegments[1].split('=');
        if (userSegments.length === 1) {
            user = 'Anonymous';
        } else {
            user = userSegments[1];
        }
    } else {
        const urlSegments = currentURL.split('/');
        id = urlSegments[urlSegments.length - 1];
    }

    useEffect(() => {
        setLoading(true);
        sheetClient.getSheet(id!)
            .then((sheet: SetStateAction<SheetMemoryVO | null>) => {
                setSheet(sheet);
                setLoading(false);
            })
            .catch((error: SetStateAction<string | null>) => {
                setError(error);
                setLoading(false);
            })
    }, [id]);

    return (
        <div>
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                        <p>Loading...</p>
                </div>
            )}

            <h1>Logged in as {user}</h1>
            <h1>{sheet?.name}</h1>
            <h2>Owner: {sheet?.owner}</h2>
            {sheet && <SpreadSheet sheetMemory={sheet} currentUser={user}/>}
        </div>
    )
}

export default SheetPage;