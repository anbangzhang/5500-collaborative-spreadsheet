import React, { useState } from "react";
import Formula from "./Formula";
import Status from "./Status";
import KeyPad from "./Keypad";
import SheetController from "../SheetController";
import SheetHolder from "./SheetHolder";
import { ButtonNames } from "../GlobalDefinitions";
import SheetMemoryVO from "../SheetMemoryVO";

interface SpreadSheetProps {
  sheetMemory: SheetMemoryVO;
}

export function SpreadSheet({ sheetMemory }: SpreadSheetProps) {
  const spreadSheetController = new SheetController(sheetMemory);

  const [formulaString, setFormulaString] = useState(spreadSheetController.getFormulaString())
  const [resultString, setResultString] = useState(spreadSheetController.getResultString())
  const [cells, setCells] = useState(spreadSheetController.getSheetDisplayStringsForGUI());
  const [statusString, setStatusString] = useState(spreadSheetController.getEditStatusString());
  const [currentCell, setCurrentCell] = useState(spreadSheetController.getWorkingCellLabel());
  const [currentlyEditing, setCurrentlyEditing] = useState(spreadSheetController.getEditStatus());

  function updateDisplayValues(): void {

    setFormulaString(spreadSheetController.getFormulaString());
    setResultString(spreadSheetController.getResultString());
    setStatusString(spreadSheetController.getEditStatusString());
    setCells(spreadSheetController.getSheetDisplayStringsForGUI());
    setCurrentCell(spreadSheetController.getWorkingCellLabel());
    setCurrentlyEditing(spreadSheetController.getEditStatus());
  }

  async function onCommandButtonClick(command: string): Promise<void> {
    switch (command) {
      case ButtonNames.edit_toggle:
        if (currentlyEditing) {
          spreadSheetController.setEditStatus(false);
        } else {
          spreadSheetController.setEditStatus(true);
        }
        setStatusString(spreadSheetController.getEditStatusString());
        break;
      case ButtonNames.clear:
        spreadSheetController.removeToken();
        break;
      case ButtonNames.allClear:
        spreadSheetController.clearFormula();
        break;
    }
    updateDisplayValues();
  }

  /**
   *  This function is the call back for the number buttons and the Parenthesis buttons
   * 
   * They all automatically start the editing of the current formula.
   * 
   * @param event
   * 
   * */
     function onButtonClick(event: React.MouseEvent<HTMLButtonElement>): void {

      const text = event.currentTarget.textContent;
      let trueText = text ? text : "";
      spreadSheetController.setEditStatus(true);
      spreadSheetController.addToken(trueText);
  
      updateDisplayValues();
  }

  /**
   * 
   * @param event 
   * 
   * This function is called when a cell is clicked
   * If the edit status is true then it will send the token to the machine.
   * If the edit status is false then it will ask the machine to update the current formula.
   */
     function onCellClick(event: React.MouseEvent<HTMLButtonElement>): void {
      const cellLabel = event.currentTarget.getAttribute("cell-label");
      // calculate the current row and column of the clicked on cell
  
      const editStatus = spreadSheetController.getEditStatus();
      let realCellLabel = cellLabel ? cellLabel : "";
  
  
      // if the edit status is true then add the token to the machine
      if (editStatus) {
        spreadSheetController.addCell(realCellLabel);  // this will never be ""
        updateDisplayValues();
      }
      // if the edit status is false then set the current cell to the clicked on cell
      else {
        spreadSheetController.setWorkingCellByLabel(realCellLabel);
        updateDisplayValues();
      }
  
  }

  return (
    <div>
      <Formula formulaString={formulaString} resultString={resultString}  ></Formula>
      <Status statusString={statusString}></Status>
      {<SheetHolder cellsValues={cells}
        onClick={onCellClick}
        currentCell={currentCell}
        currentlyEditing={currentlyEditing} ></SheetHolder>}
      <KeyPad onButtonClick={onButtonClick}
        onCommandButtonClick={onCommandButtonClick}
        currentlyEditing={currentlyEditing}></KeyPad>
    </div>
  )
}

export default SpreadSheet;