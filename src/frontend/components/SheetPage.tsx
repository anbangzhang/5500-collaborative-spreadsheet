import { useState, useEffect, SetStateAction } from "react";
import SheetMemoryVO from "../SheetMemoryVO";
import { sheetClient } from "../SheetClient";
import SpreadSheet from "./SpreadSheet";

function SheetPage(props: any) {
    const [loading, setLoading] = useState(false);
    const [sheet, setSheet] = useState<SheetMemoryVO | null>(null);
    const [error, setError] = useState<string | null>(null);
    let currentURL = window.location.href;
    const returnLoggedInUser = (user: string) => {
        if (user.length > 0) {
            return 'Logged in as ' + user;
        } else {
            return 'Logged in as Anonymous';
        }
    }
    let user = '';

    if (currentURL.includes('?')) {
        const urlSegments = currentURL.split('?');
        const idSegments = urlSegments[0].split('/');
        var id = idSegments[idSegments.length - 1];
        // check if the user name is empty
        const userSegments = urlSegments[1].split('=');
        if (userSegments.length === 2) {
            user = userSegments[1];
        }
    } else {
        const urlSegments = currentURL.split('/');
        id = urlSegments[urlSegments.length - 1];
    }

    useEffect(() => {
        setLoading(true);
        // check if the url contains a user name
        
        const interval = setInterval(() => {
            sheetClient.getSheet(id!)
            .then((sheet: SetStateAction<SheetMemoryVO | null>) => {
                setSheet(sheet);
                setLoading(false);
            })
            .catch((error: SetStateAction<string | null>) => {
                setError(error);
                setLoading(false);
            });
        }, 333);
        return () => clearInterval(interval);
    }, [id]);

    return (
        <div>
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                        <p>Loading...</p>
                </div>
            )}

            <h1>{returnLoggedInUser(user)}</h1>
            <h1>{sheet?.name}</h1>
            <h2>Owner: {sheet?.owner}</h2>
            {sheet && <SpreadSheet sheetMemory={sheet} currentUser={user}/>}
        </div>
    )
}

export default SheetPage;