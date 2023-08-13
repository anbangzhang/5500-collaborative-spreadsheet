import React, { SetStateAction, useEffect, useState } from "react";
import Formula from "./Formula";
import Status from "./Status";
import KeyPad from "./Keypad";
import SheetController from "../SheetController";
import SheetHolder from "./SheetHolder";
import { ButtonNames } from "../GlobalDefinitions";
import SheetMemoryVO from "../SheetMemoryVO";
import { sheetClient } from "../SheetClient";
import { DefaultValue } from "../../engine/GlobalDefinitions";

interface SpreadSheetProps {
  sheetMemory: SheetMemoryVO;
  currentUser: string;
}

let spreadSheetController: SheetController = new SheetController(DefaultValue.column, DefaultValue.row);

export function SpreadSheet({ sheetMemory, currentUser }: SpreadSheetProps) {
  const [sheetMemoryVO, setSheetMemoryVO] = useState(sheetMemory);
  const [formulaString, setFormulaString] = useState(spreadSheetController.getFormulaString())
  const [resultString, setResultString] = useState(spreadSheetController.getResultString())
  const [cells, setCells] = useState(spreadSheetController.getSheetDisplayStringsForGUI());
  const [statusString, setStatusString] = useState(spreadSheetController.getEditStatusString());
  const [currentCell, setCurrentCell] = useState(spreadSheetController.getWorkingCellLabel());
  const [currentlyEditing, setCurrentlyEditing] = useState(spreadSheetController.getEditStatus());

  const id = sheetMemoryVO.id;

  useEffect(() => {
    // check if the url contains a user name
        
    const interval = setInterval(() => {
      sheetClient.getSheet(id!)
      .then((sheet: SetStateAction<SheetMemoryVO>) => {
        setSheetMemoryVO(sheet);
        // update sheet memory in controller
        spreadSheetController.setSheetMemory(sheetMemoryVO);
      })
      .catch((error: SetStateAction<string | null>) => {
        console.log(error);
      });
    }, 500);
    return () => clearInterval(interval);
  }, [id, sheetMemoryVO]);

  function updateDisplayValues(): void {

    setFormulaString(spreadSheetController.getFormulaString());
    setResultString(spreadSheetController.getResultString());
    setStatusString(spreadSheetController.getEditStatusString());
    setCells(spreadSheetController.getSheetDisplayStringsForGUI());
    setCurrentCell(spreadSheetController.getWorkingCellLabel());
    setCurrentlyEditing(spreadSheetController.getEditStatus());
  }

  function onCommandButtonClick(command: string): void {
    switch (command) {
      case ButtonNames.edit_toggle:
        if (!currentlyEditing) {
          // get the occupied cells from the sheet memory
          // throws an error if the cell is occupied
          let occupiedCells = sheetMemory.getOccupiedCells();
          if (occupiedCells.get(currentCell) !== undefined && occupiedCells.get(currentCell) !== currentUser) {
            alert("This cell is occupied by another user.");
          }
          // clicking = when not editing will lock the cell
          sheetClient.lockCell(sheetMemory.id, currentCell, currentUser)
            .then((lockResult) => {
              if (!lockResult[0]) {
                alert(lockResult[1]);
                return;
              }
            })
          setCurrentlyEditing(true);
          spreadSheetController.setEditStatus(true);
          setStatusString(spreadSheetController.getEditStatusString());
          sheetMemory.setNewOccupiedCell(currentCell, currentUser);
        } else {
          // clicking = when editing will unlock the cell
          sheetClient.releaseCell(sheetMemory.id, currentCell, currentUser)
            .then((releaseResult) => {
              if (!releaseResult[0]) {
                alert(releaseResult[1]);
                return;
              }
            })
          setCurrentlyEditing(false);
          spreadSheetController.setEditStatus(false);
          setStatusString(spreadSheetController.getEditStatusString());

        }
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
      if (text === '1' || text === '2' || text === '3' || text === '4' || text === '5' || text === '6' || text === '7' || text === '8' || text === '9' || text === '0' ) {
        if (!currentlyEditing) {
          // get the occupied cells from the sheet memory
          // throws an error if the cell is occupied
          let occupiedCells = sheetMemory.getOccupiedCells();
          if (occupiedCells.get(currentCell) !== undefined && occupiedCells.get(currentCell) !== currentUser) {
            alert("This cell is occupied by another user.");
          }
          // clicking number buttons when not editing will lock the cell
          sheetClient.lockCell(sheetMemory.id, currentCell, currentUser)
            .then((lockResult) => {
              if (!lockResult[0]) {
                alert(lockResult[1]);
                return;
              }
            })
          setCurrentlyEditing(true);
          spreadSheetController.setEditStatus(true);
          setStatusString(spreadSheetController.getEditStatusString());
          sheetMemory.setNewOccupiedCell(currentCell, currentUser);
        }
      }

    if (currentlyEditing) {
      // clicking number or operator buttons when editing will call updateCell api
      sheetClient.updateCell(sheetMemory.id, currentCell, text!, currentUser)
        .then((updateResult) => {
          if (!updateResult) {
            alert("Cannot update cell.");
            return;
          }
          return;
        })
    }

      let trueText = text ? text : "";
      spreadSheetController.setEditStatus(true);
  
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
        // first check circular dependency
        sheetClient.referenceCheck(sheetMemory.id, currentCell, realCellLabel)
          .then((okToAdd) => {
            if (okToAdd[0]) {
              sheetClient.updateCell(sheetMemory.id, currentCell, realCellLabel, currentUser)
                .then((updateResult) => {
                  if (!updateResult) {
                    alert("Cannot update cell.");
                    return;
                  }
                  return;
                })
            } else {
              alert(okToAdd[1]);
              return;
            }
            updateDisplayValues();
          })

      }
      // if the edit status is false then set the current cell to the clicked on cell
      else {
        spreadSheetController.setWorkingCellByLabel(realCellLabel);
        updateDisplayValues();
      }
  
  }


  return (
    <div>
      <Formula formulaString={formulaString} resultString={resultString}></Formula>
      <Status statusString={statusString}></Status>
      {<SheetHolder cellsValues={cells}
        onClick={onCellClick}
        currentCell={currentCell}
        currentlyEditing={currentlyEditing}></SheetHolder>}
      <KeyPad onButtonClick={onButtonClick}
        onCommandButtonClick={onCommandButtonClick}
        currentlyEditing={currentlyEditing}></KeyPad>
    </div>
  )
}

export default SpreadSheet;