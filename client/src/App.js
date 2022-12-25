import { useState } from "react";
import "./App.css";
import {
  lsDoesEventExist,
  lsGenUser,
  lsGetUser,
} from "./util/localStorageManager";
import { create, remove, trigger } from "./util/reqs";
function App() {
  const [data, setData] = useState();

  return (
    <div className="App">
      {lsGetUser() ? lsGetUser() : "Please Generate a user to continue"}
      <br />
      {lsDoesEventExist() ? (
        <>
          <button onClick={() => trigger(setData)}>Trigger the event</button>
          <br />

          <button onClick={() => remove(setData)}>Remove the event</button>
        </>
      ) : (
        <>
          {lsGetUser() && (
            <button onClick={() => create(setData)}>Create an event</button>
          )}
          <br />
          <button onClick={lsGenUser}>Generate new user</button>
        </>
      )}
      <br />
      <br />
      <br />
      <br />
      {data !== null && <b>{JSON.stringify(data)}</b>}
    </div>
  );
}

export default App;
