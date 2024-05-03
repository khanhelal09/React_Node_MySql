
import {SIGNUP_API, CREATE_EMPLOYEE_API, EMPLOYEES_API, EMPLOYEE_BY_ID_API, UPDATE_EMPLOYEE_API, CATEGORIES_API} from "../Utils/URLUtilities.js";
import axios from "axios";
import {authToken} from "../Utils/MyConstants.js"

async function signup(user, callback){
    const response = await fetch(SIGNUP_API, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        avater: user.avater
      })
    });

    console.log("APIManager >> signupFetch status code: " + response.status);

    if (response.status === 200) {
      const jsonResponse = await response.json();
      const jsonData = JSON.stringify(jsonResponse);
      callback(jsonData);
      console.log("APIManager >> signupFetch success jsonData::: " + jsonData);
    } else {
      console.log("APIManager >> signupFetch failed");
    }
}


function addEmployee(employee, callback) {
  let name = employee.name;
  let email = employee.email;
  let phone = employee.phone;
  console.log("APIManager >> addEmployee >> " + name + " " + email + " " + phone);

  axios
    .post(CREATE_EMPLOYEE_API, { name, email, phone })
    .then((res) => res.json())
    .then((jsonData) => callback(jsonData))
    .catch((err) => console.log("APIManager >> addEmployee: >> " + err));
}

async function allCategories(callback) {
  try {
    const response = await fetch(CATEGORIES_API, {
      method: "GET",
      credentials: "include",
      headers: {
        'Authorization': authToken
     }
    });

    console.log("APIManager >> allCategories: >> response.status::: " + response.status);

    if (response.status === 200) {
      const result = await response.json();
      callback(result);
    } else {

    }
  } catch(err) {
    console.log("APIManager >> allCategories: >> " + err);
  }
}

async function allEmployees(callback) {
  try {
    const response = await fetch(EMPLOYEES_API, {
      method: "GET",
      credentials: "include",
      headers: {
        'Authorization': authToken
     }
    });

    console.log("APIManager >> allEmployees: >> response.status::: " + response.status);

    if (response.status === 200) {
      const result = await response.json();
      callback(result);
    } else {

    }
  } catch(err) {
    console.log("APIManager >> allEmployees: >> " + err);
  }
}

function getEmployeeDetails(id, callback) {
  fetch(EMPLOYEE_BY_ID_API + id)
    .then((res) => res.json())
    .then((jsonData) => callback(jsonData))
    .catch((err) => console.log("APIManager >> getEmployeeDetails: >> " + err));
}

function updateEmployeeByID(employee, callback) {
  let id = employee.id;
  let name = employee.name;
  let email = employee.email;
  let phone = employee.phone;
  console.log("APIManager >> updateEmployeeByID >> " + id +  " " + name +  " " + email + " " + phone );

  axios
    .put(UPDATE_EMPLOYEE_API, { id, name, email, phone })
    .then((res) => res.json())
    .then((jsonData) => callback(jsonData))
    .catch((err) => console.log("APIManager >> updateEmployeeByID: >> " + err));
}

export { signup, addEmployee, allCategories, allEmployees, getEmployeeDetails, updateEmployeeByID };
