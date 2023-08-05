import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ControlPanel } from './FrontEnd/ControlPanel';

function App() {
  // a user name to be used in the request task function

  // get the sheet name from the URL
  // the URL will be something like http://localhost:3000/sheetID

  const [userName, setUserName] = useState('');

  function resetURL(sheet_id: string) {
    const currentURL = window.location.href;
    const index = currentURL.lastIndexOf('/');
    const newURL = currentURL.substring(0, index + 1) + sheet_id;
    window.history.pushState({}, '', newURL);
    window.location.reload();
  }


  function getTitle() {
    return <h2>Collaborative Sheets</h2>
  }

  function getUserString() {
    if (userName.length > 0) {
      return <div>
        Logged in as {userName}
      </div>
    } else {
      //User name left blank will be logged in as Anonymous
      return <div>
        Logged in as Anonymous
      </div>
    }
  }


  function getUserLogin() {
    return <div>
      <input
        type="text"
        placeholder="User name"
        defaultValue={userName}
        onChange={(event) => {
          // get the text from the input
          let userName = event.target.value;
          // set the user name
          setUserName(userName);
        }} />
    </div>
  }

  function getLoginComponent() {
    return <table>
      <tbody>
        <tr>
          <td>
            {getUserLogin()}
          </td>
          <td>
            {getUserString()}
          </td>
        </tr>
      </tbody>
    </table>
  }

  function getControlPanel() {
    return <ControlPanel resetURL={resetURL} />
      

  }

  function getSheetDisplay() {

  }

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          {getTitle()}
          {getLoginComponent()}
          {getControlPanel()}
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
