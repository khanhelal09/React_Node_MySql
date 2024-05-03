import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { allEmployees } from "../Utils/APIManager.js";
import {  DELETE_EMPLOYEE_API } from "../Utils/URLUtilities.js";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    allEmployees(receivedAllEmployees);
  } ,[]);

  function receivedAllEmployees(data) {
    console.log("receivedAllEmployees >> ");
    setEmployees(data);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(DELETE_EMPLOYEE_API + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container">
        <h3 className="text-center">Employees List</h3>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Emplyee Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((listItem, index) => {
                return (
                  <tr key={index}>
                    <td>{listItem.name}</td>
                    <td>{listItem.email}</td>
                    <td>{listItem.phone}</td>
                    <td>
                      <NavLink to={"/profile/" + listItem.id}>
                        <button className="btn btn-info">Update</button>
                      </NavLink>
                      <button
                        onClick={(e) => handleDelete(listItem.id)}
                        style={{ marginLeft: "10px" }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesList;
