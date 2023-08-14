import React, { SetStateAction, useEffect, useState, useCallback } from "react";
import Formula from "./Formula";
import Status from "./Status";
import KeyPad from "./Keypad";
import { SheetHelper } from "../utils/SheetHelper";
import SheetHolder from "./SheetHolder";
import { ButtonNames } from "../GlobalDefinitions";
import SheetMemoryVO from "../SheetMemoryVO";
import { sheetClient } from "../SheetClient";
import { setCookie } from "../utils/CookieUtil";

interface SpreadSheetProps {
  sheetMemory: SheetMemoryVO;
  currentUser: string;
  currentCellLabel: string;
}

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
  const [formulaString, setFormulaString] = useState(sheetMemoryVO.getCellByLabel(currentCell).parseFormulaString())
  const [resultString, setResultString] = useState(sheetMemoryVO.getCellByLabel(currentCell).getDisplayString())
  const [cells, setCells] = useState(SheetHelper.getSheetDisplayStringsForGUI(sheetMemory));
  const [occupiedCells, setOccupiedCells] = useState(SheetHelper.getOccupiedCells(sheetMemory, currentUser));

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

    setFormulaString(getCurrentWorkingCell(currentCell).parseFormulaString());
    setResultString(getCurrentWorkingCell(currentCell).getDisplayString());
    setStatusString(getStatusString());
    setCells(SheetHelper.getSheetDisplayStringsForGUI(sheetMemoryVO));
    setOccupiedCells(SheetHelper.getOccupiedCells(sheetMemoryVO, currentUser));
    setCookie('currentCell', currentCell, 1);
  }, [currentCell, currentUser, getCurrentWorkingCell, getStatusString, sheetMemoryVO]);

  const id = sheetMemoryVO.id;

  useEffect(() => {
      // check if the url contains a user name
          
    const interval = setInterval(() => {
      sheetClient.getSheet(id!)
        .then((sheet: SetStateAction<SheetMemoryVO>) => {
          setSheetMemoryVO(sheet);
          updateDisplayValues();
        })
        .catch((error: SetStateAction<string | null>) => {
          console.log(error);
        });
    }, 500);
    return () => clearInterval(interval);
  }, [id, sheetMemoryVO, updateDisplayValues]);
  

  function onCommandButtonClick(command: string): void {
    if (command === ButtonNames.edit_toggle) {
        if (!currentlyEditing) {
          // get the occupied cells from the sheet memory
          // throws an error if the cell is occupied
          if (occupiedCells.includes(currentCell)) {
            alert("This cell is occupied by another user.");
          } else {
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
          }
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
    } else if (command === ButtonNames.rand) {
      if (currentlyEditing) {
        let randNum = Math.floor(Math.random() * 10); // random number between 0 and 9
        let randString = randNum.toString();
        sheetClient.updateCell(sheetMemoryVO.id, currentCell, randString, currentUser)
          .then((updateResult) => {
            if (!updateResult) {
              alert('Oops, the cell is not happy to update. Please try again. :)');
            }
          })
      }
    } else {
      if (currentlyEditing) {
        sheetClient.updateCell(sheetMemoryVO.id, currentCell, command, currentUser)
          .then((updateResult) => {
            if (!updateResult) {
              alert('Oops, the cell is not happy to update. Please try again. :)');
            }
          })
      }
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

    let text = event.currentTarget.textContent!;
    // change × to *, change ÷ to /
    if (text === '×') {
      text = '*';
    } else if (text === '÷') {
      text = '/';
    }
    if (currentlyEditing) {
      // clicking number or operator buttons when editing will call updateCell api
      sheetClient.updateCell(sheetMemoryVO.id, currentCell, text, currentUser)
        .then((updateResult) => {
          if (!updateResult) {
            alert("Oops, the cell is not happy to update. Please try again. :)");
          }
        })
    }

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

    } else {
      // if the edit status is false then set the current cell to the clicked on cell
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
        occupiedCells={sheetMemory.getOccupiedCells()}></SheetHolder>}
      <KeyPad onButtonClick={onButtonClick}
        onCommandButtonClick={onCommandButtonClick}
        currentlyEditing={currentlyEditing}></KeyPad>
    </div>
  )
}

export default SpreadSheet;