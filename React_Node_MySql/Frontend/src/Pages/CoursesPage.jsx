import React, { useEffect, useState } from "react";
import VideoPlayer from "../Components/VideoPlayer.jsx";
import { allEmployees } from "../Utils/APIManager.js";
import LocalStorageExample from "../Components/LocalStorageExample.jsx";

const CoursesPage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    allEmployees(receivedAllEmployees);
  }, []);

  function handleClick(name) {
    alert("Name: " + name);
  }

  function receivedAllEmployees(data) {
    console.log("receivedAllEmployees >> ");
    setEmployees(data);
  }

  return (
    <div>
      <h1>This is courses page</h1>
      <br />
      {/* <p>Data: {JSON.stringify(employees)} </p> <br /> */}
      <div className={"row-div-style"}>
        {employees.map((listItem, index) => {
          return (
            <div
              className="row-div-item-style"
              onClick={(e) => {
                handleClick(listItem.name);
              }}
            >
              <b>{listItem.name}</b>
              <br />
              <text>{listItem.email}</text>
              <br />
              <text>Phone: {listItem.phone}</text>
            </div>
          );
        })}
      </div>
      <div>
        <VideoPlayer />
      </div>
      <LocalStorageExample/>
    </div>
  );
};

export default CoursesPage;
