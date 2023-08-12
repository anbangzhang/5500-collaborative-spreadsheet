import { useState, useEffect, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import SheetMemoryVO from "../SheetMemoryVO";
import { sheetClient } from "../SheetClient";
import SpreadSheet from "./SpreadSheet";

function SheetPage(props: any) {
    const [loading, setLoading] = useState(false);
    const [sheet, setSheet] = useState<SheetMemoryVO | null>(null);
    const [error, setError] = useState<string | null>(null);
    const currentURL = window.location.href;
    const urlSegments = currentURL.split('/');
    const id = urlSegments[urlSegments.length - 1];

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

            <h1>{sheet?.name}</h1>
            <h2>Owner: {sheet?.owner}</h2>
            {sheet && <SpreadSheet sheetMemory={sheet} />}
        </div>
    )
}

export default SheetPage;