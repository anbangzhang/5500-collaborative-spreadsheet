import { useState } from "react";
import ControlPanel from "./ControlPanel";
import { setCookie } from "./utils/CookieUtil";

function HomePage() {
  const [userName, setUserName] = useState('Anonymous');


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
        defaultValue={''}
        onChange={(event) => {
          // get the text from the input
          let userName = event.target.value;
          // set the user name
          setUserName(userName);
          if (userName.length > 0) {
            setCookie('user', userName, 1);
          } else {
            setCookie('user', 'Anonymous', 1);
          }
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
    return <ControlPanel userName={userName}/>
  }

  

  return (
    <div className="App">
        <header className="App-header">
            {getTitle()}
            {getLoginComponent()}
            {getControlPanel()}
        </header>
    </div>
  );

}

export default HomePage;