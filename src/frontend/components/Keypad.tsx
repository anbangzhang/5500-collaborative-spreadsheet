import React from "react";
import Button from "./Button";
import { ButtonNames } from "../GlobalDefinitions";

import "./Keypad.css";
import "./Button.css";

interface KeyPadProps {
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCommandButtonClick: (text: string) => void;
  currentlyEditing: boolean;
} // interface KeyPadProps

function KeyPad({ onButtonClick, onCommandButtonClick, currentlyEditing }: KeyPadProps) {

  // the done button has two styles and two text values depending on currently Editing
  // if currentlyEditing is true then the button will have the class button-edit-end
  // and the text will be "="
  // if currentlyEditing is false then the button will have the class button-edit-start
  // and the text will be "edit"
  function getDoneButtonClass() {
    if (currentlyEditing) {
      return "button-edit-end";
    }
    return "button-edit-start";
  } // getDoneButtonClass

  let doneButtonText = currentlyEditing ? ButtonNames.done : ButtonNames.edit;

  // the buttons use one of three classes
  // numberButton, operatorButton, and otherButton
  return (
    <div className="buttons">
      <div className="buttons-row">

        <Button
            text="x²"
            isDigit={false}
            onClick={() => onCommandButtonClick(ButtonNames.square)}
            className="button-operator"
            dataTestId="square-button"
        />
        <Button
            text="x³"
            isDigit={false}
            onClick={() => onCommandButtonClick(ButtonNames.cube)}
            className="button-operator"
            dataTestId="cube-button"
        />
        <Button
            text="1/x"
            isDigit={false}
            onClick={() => onCommandButtonClick(ButtonNames.fraction)}
            className="button-operator"
            dataTestId="fraction-button"
        />
        <Button
            text="AC"
            isDigit={false}
            onClick={() => onCommandButtonClick(ButtonNames.allClear)}
            className="button-operator"
            dataTestId="cube-button"
        />
        <Button
          text="7"
          isDigit={true}
          onClick={onButtonClick}
          className="button-number"
          dataTestId="seven-button"
        />
        <Button
          text="8"
          isDigit={true}
          onClick={onButtonClick}
          className="button-number"
          dataTestId="eight-button"
        />
        <Button
          text="9"
          isDigit={true}
          onClick={onButtonClick}
          className="button-number"
          dataTestId="nine-button"
        />
        <Button
          text="÷"
          isDigit={false}
          onClick={onButtonClick}
          className="button-operator"
          dataTestId="divide-button"
        />
      </div>

      <div className="buttons-row">
      <Button
          text="²√x"
          isDigit={false}
          onClick={() => onCommandButtonClick(ButtonNames.squareRoot)}
          className="button-operator"
          dataTestId="sqrt-button"
        />
      <Button
          text="³√x"
          isDigit={false}
          onClick={() => onCommandButtonClick(ButtonNames.cubeRoot)}
          className="button-operator"
          dataTestId="cbrt-button"
        />
      <Button
          text="Rand"
          isDigit={false}
          onClick={() => onCommandButtonClick(ButtonNames.rand)}
          className="button-operator"
          dataTestId="rand-button"
        />
        <Button
          text="C"
          isDigit={false}
          onClick={() => onCommandButtonClick(ButtonNames.clear)}
          className="button-number"
          dataTestId="left-parenthesis-button"
        />
        <Button
          text="4"
          isDigit={true}
          onClick={onButtonClick}
          className="button-number"
          dataTestId="four-button"
        />
        <Button
          text="5"
          isDigit={true}
          onClick={onButtonClick}
          className="button-number"
          dataTestId="five-button"
        />
        <Button
          text="6"
          isDigit={true}
          onClick={onButtonClick}
          className="button-number"
          dataTestId="six-button"
        />
        <Button
          text="×"
          isDigit={false}
          onClick={onButtonClick}
          className="button-operator"
          dataTestId="multiply-button"
        />

      </div>

      <div className="buttons-row">
      <Button
          text="sin"
          isDigit={false}
          onClick={() => onCommandButtonClick(ButtonNames.sin)}
          className="button-operator"
          dataTestId="sin-button"
        />
      <Button
          text="cos"
          isDigit={false}
          onClick={() => onCommandButtonClick(ButtonNames.cos)}
          className="button-operator"
          dataTestId="cos-button"
        />
      <Button
          text="tan"
          isDigit={false}
          onClick={() => onCommandButtonClick(ButtonNames.tan)}
          className="button-operator"
          dataTestId="tan-button"
        />
      <Button
          text="("
          isDigit={false}
          onClick={onButtonClick}
          className="button-number"
          dataTestId="right-parenthesis-button"
        />
        <Button
          text="1"
          isDigit={true}
          onClick={onButtonClick}
          className="button-number"
          dataTestId="one-button"
        />
        <Button
          text="2"
          isDigit={true}
          onClick={onButtonClick}
          className="button-number"
          dataTestId="two-button"
        />
        <Button
          text="3"
          isDigit={true}
          onClick={onButtonClick}
          className="button-number"
          dataTestId="three-button"
        />
        <Button
          text="+"
          isDigit={false}
          onClick={onButtonClick}
          className="button-operator"
          dataTestId="add-button"
        />


      </div>

      <div className="buttons-row">
      <Button
          text="sin⁻¹"
          isDigit={false}
          onClick={() => onCommandButtonClick(ButtonNames.sinInverse)}
          className="button-operator"
          dataTestId="invsin-button"
        />
      <Button
          text="cos⁻¹"
          isDigit={false}
          onClick={() => onCommandButtonClick(ButtonNames.cosInverse)}
          className="button-operator"
          dataTestId="invcos-button"
        />
      <Button
          text="tan⁻¹"
          isDigit={false}
          onClick={() => onCommandButtonClick(ButtonNames.tanInverse)}
          className="button-operator"
          dataTestId="invtan-button"
        />
      <Button
          text=")"
          isDigit={false}
          onClick={onButtonClick}
          className="button-operator"
          dataTestId="reverse-button"
        />
        <Button
          text="0"
          isDigit={true}
          onClick={onButtonClick}
          className="button-number"
          dataTestId="zero-button"
        />
        <Button
          text="."
          isDigit={false}
          onClick={onButtonClick}
          className="button-number"
          dataTestId="decimal-button"
        />
        <Button
          text="="
          isDigit={true}
          onClick={() => onCommandButtonClick(ButtonNames.edit_toggle)}
          className={(getDoneButtonClass())}
          dataTestId="edit-toggle-button"
        />
        <Button
          text="-"
          isDigit={false}
          onClick={onButtonClick}
          className="button-operator"
          dataTestId="subtract-button"
        />
      </div>

    </div>
  );
} // KeyPad

export default KeyPad;