import React, { useState } from "react";
import UserProfile from "../Utils/UserProfile";

const LocalStorageExample = () => {
  const [name, setName] = useState("");
  const handle = () => {
    UserProfile.setName(name);
    //window.location.reload();
  };

  const retrieveName = () => {
    let name = UserProfile.getName();
    alert("Name from local Storage: " + name);
  };

  return (
    <div style={{margin:'20px', alignContent:'center'}}>
      <h1>Local Storage Example:</h1>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <button onClick={handle}>Save</button>
      </div>
      <div>
        <button onClick={retrieveName}>Retrieve</button>
      </div>
    </div>
  );
};

export default LocalStorageExample;
