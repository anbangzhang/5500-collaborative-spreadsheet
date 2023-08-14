import React, { SetStateAction, useEffect, useState, useCallback } from "react";
import Formula from "./Formula";
import Status from "./Status";
import KeyPad from "./Keypad";
import SheetController from "../SheetController";
import SheetHolder from "./SheetHolder";
import { ButtonNames } from "../GlobalDefinitions";
import SheetMemoryVO from "../SheetMemoryVO";
import { sheetClient } from "../SheetClient";
import { DefaultValue } from "../../engine/GlobalDefinitions";
import { setCookie } from "./CookieUtil";

interface SpreadSheetProps {
  sheetMemory: SheetMemoryVO;
  currentUser: string;
  currentCellLabel: string;
}

let spreadSheetController: SheetController = new SheetController(DefaultValue.column, DefaultValue.row);

export function SpreadSheet({ sheetMemory, currentUser, currentCellLabel }: SpreadSheetProps) {

  let initEditingStatus = false;
  for (let [label, user] of sheetMemory.getOccupiedCells()) {
    if (label === currentCellLabel && user === currentUser) {
      initEditingStatus = true;
      break;
    }
  }

  // the spreadsheet default starts at A1
  const [sheetMemoryVO, setSheetMemoryVO] = useState(sheetMemory);
  const [currentCell, setCurrentCell] = useState(currentCellLabel);
  // initialized to false because the user is not editing the cell
  const [currentlyEditing, setCurrentlyEditing] = useState(initEditingStatus);
  const [formulaString, setFormulaString] = useState(sheetMemoryVO.getCellByLabel(currentCell).getFormulaString())
  const [resultString, setResultString] = useState(sheetMemoryVO.getCellByLabel(currentCell).getDisplayString())
  const [cells, setCells] = useState(spreadSheetController.getSheetDisplayStringsForGUI());
  const [occupiedCells, setOccupiedCells] = useState(spreadSheetController.getOccupiedCells(currentUser));

  const getStatusString = useCallback(() => {
    if (currentlyEditing) {
      return "editing: " + currentCell;
    }
    return "current cell: " + currentCell;
  }, [currentCell, currentlyEditing]);

  const [statusString, setStatusString] = useState(getStatusString);

  // turn the current cell label into a cellVO
  const getCurrentWorkingCell = useCallback((currentCell: string) => {
    let cell = sheetMemoryVO.getCellByLabel(currentCell);
    return cell;
  }, [sheetMemoryVO]);

  

  const updateDisplayValues = useCallback(() => {

    setFormulaString(getCurrentWorkingCell(currentCell).getFormulaString());
    setResultString(getCurrentWorkingCell(currentCell).getDisplayString());
    setStatusString(getStatusString());
    setCells(spreadSheetController.getSheetDisplayStringsForGUI());
    setOccupiedCells(spreadSheetController.getOccupiedCells(currentUser));
    setCookie('currentCell', currentCell, 1);
  }, [currentCell, currentUser, getCurrentWorkingCell, getStatusString]);

    const id = sheetMemoryVO.id;

    useEffect(() => {
      // check if the url contains a user name
          
      const interval = setInterval(() => {
        sheetClient.getSheet(id!)
        .then((sheet: SetStateAction<SheetMemoryVO>) => {
          setSheetMemoryVO(sheet);
          // update sheet memory in controller
          spreadSheetController.setSheetMemory(sheetMemoryVO);
          updateDisplayValues();
        })
        .catch((error: SetStateAction<string | null>) => {
          console.log(error);
        });
      }, 500);
      return () => clearInterval(interval);
    }, [id, sheetMemoryVO, updateDisplayValues]);
  

  function onCommandButtonClick(command: string): void {
    switch (command) {
      case ButtonNames.edit_toggle:
        if (!currentlyEditing) {
          // get the occupied cells from the sheet memory
          // throws an error if the cell is occupied
          if (occupiedCells.includes(currentCell)) {
            alert("This cell is occupied by another user.");
            break;
          }
          // clicking = when not editing will lock the cell
          sheetClient.lockCell(sheetMemoryVO.id, currentCell, currentUser)
          .then((lockResult) => {
            if (!lockResult[0]) {
              alert(lockResult[1]);
            } else {
              setCurrentlyEditing(true);
              sheetMemoryVO.setNewOccupiedCell(currentCell, currentUser);
            }
          });
        } else {
          // clicking = when editing will unlock the cell
          sheetClient.releaseCell(sheetMemoryVO.id, currentCell, currentUser)
            .then((releaseResult) => {
              if (!releaseResult[0]) {
                alert(releaseResult[1]);
              } else {
                setCurrentlyEditing(false);
                sheetMemoryVO.removeOccupiedCell(currentCell);
              }
            })
        }
        break;
      case ButtonNames.clear:
        // update cell
        break;
      case ButtonNames.allClear:
        // update cell
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
          let occupiedCells = sheetMemoryVO.getOccupiedCells();
          if (occupiedCells.get(currentCell) !== undefined && occupiedCells.get(currentCell) !== currentUser) {
            alert("This cell is occupied by another user.");
          }
          // clicking number buttons when not editing will lock the cell
          sheetClient.lockCell(sheetMemoryVO.id, currentCell, currentUser)
            .then((lockResult) => {
              if (!lockResult[0]) {
                alert(lockResult[1]);
                return;
              }
            })
          sheetClient.updateCell(sheetMemoryVO.id, currentCell, text!, currentUser)
            .then((updateResult) => {
              if (!updateResult) {
                alert("Cannot update cell.");
                return;
              }
              return;
            })
          setCurrentlyEditing(true);
          //spreadSheetController.setEditStatus(true);
          //setStatusString(spreadSheetController.getEditStatusString());
          sheetMemoryVO.setNewOccupiedCell(currentCell, currentUser);
        }
      }

    if (currentlyEditing) {
      // clicking number or operator buttons when editing will call updateCell api
      sheetClient.updateCell(sheetMemoryVO.id, currentCell, text!, currentUser)
        .then((updateResult) => {
          if (!updateResult) {
            alert("Cannot update cell.");
            return;
          }
          return;
        })
    }

      //spreadSheetController.setEditStatus(true);
  
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
      //const editStatus = spreadSheetController.getEditStatus();
      let realCellLabel = cellLabel ? cellLabel : "";
  
  
      // if the edit status is true then add the token to the machine
      if (currentlyEditing) {
        // first check circular dependency
        sheetClient.referenceCheck(sheetMemoryVO.id, currentCell, realCellLabel, currentUser)
          .then((okToAdd) => {
            if (okToAdd[0]) {
              sheetClient.updateCell(sheetMemoryVO.id, currentCell, realCellLabel, currentUser)
                .then((updateResult) => {
                  if (!updateResult) {
                    alert("Cannot update cell.");
                  }
                })
            } else {
              alert(okToAdd[1]);
            }
            updateDisplayValues();
          })

      }
      // if the edit status is false then set the current cell to the clicked on cell
      else {
        //spreadSheetController.setWorkingCellByLabel(realCellLabel);
        setCurrentCell(cellLabel!);
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
        currentlyEditing={currentlyEditing}
        occupiedCells={occupiedCells}></SheetHolder>}
      <KeyPad onButtonClick={onButtonClick}
        onCommandButtonClick={onCommandButtonClick}
        currentlyEditing={currentlyEditing}></KeyPad>
    </div>
  )
}

export default SpreadSheet;