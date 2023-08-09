import React, { useState } from "react";
import Formula from "./Formula";
import Status from "./Status";
import KeyPad from "./Keypad";
import SheetController from "../SheetController";
import SheetHolder from "./SheetHolder";
import { ButtonNames } from "../GlobalDefinitions";

/**
 * the main component for the Spreadsheet.  It is the parent of all the other components
 * 
 *
 * */
// make this a variable so we can resize it later (this would necessitate a new machine)
let spreadSheetController: SheetController = new SheetController(5, 8);

function SpreadSheet() {
  const [formulaString, setFormulaString] = useState(spreadSheetController.getFormulaString())
  const [resultString, setResultString] = useState(spreadSheetController.getResultString())
  const [cells, setCells] = useState(spreadSheetController.getSheetDisplayStringsForGUI());
  const [statusString, setStatusString] = useState(spreadSheetController.getEditStatusString());
  const [currentCell, setCurrentCell] = useState(spreadSheetController.getWorkingCellLabel());
  const [currentlyEditing, setCurrentlyEditing] = useState(spreadSheetController.getEditStatus());

async function onCommandButtonClick(command: string): Promise<void> {
    switch(command) {
        case ButtonNames.edit_toggle:
        
    }
}