import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.styled.css";

function Login() {

  const [userInfo, setuserInfo] = useState({ id: "", password: "" });
  const handleOnChange = (e) => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  //const navigate = useNavigate();

  async function autoLogin() {
    try {
      console.log("Login >> autoLogin() inside");
      const response = await fetch("http://localhost:8081/autoLogin", {
        method: "GET",
        credentials: "include",
      });
    
      console.log("Login >> autoLogin() status code: " + response.status);

      if (response.status === 200) {
        //navigate("/homepage");
      } else {
        //navigate("/");
      }
    } catch (err) {
      console.log("Login >> autoLogin() err: " + err);
    }
  }

  useEffect(() => {
    autoLogin();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    loginRequest(e);
  };

  async function loginRequest(e){
    if (userInfo.id.trim().length > 0 && userInfo.password.trim().length > 0) {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          id: userInfo.id,
          passsord: userInfo.password,
        }),
      });

  
      console.log("login status code: " + response.status);

      if (response.status === 200) {
        const jsonResponse = await response.json();
        const jsonData = JSON.stringify(jsonResponse);
        console.log("login success jsonData::: " + jsonData);
      } else {
        console.log("login failed");
      }
    }
  }

  const [loginStatus, setLoginStatus] = useState(false);

  function closLoginForm(e){
    //e.preventDefault;
    // if(loginStatus){
    //   document.getElementById("loginForm").style.display = "block";
    // } else {
    //   document.getElementById("loginForm").style.display = "none";
    // }

    document.getElementById("loginForm").style.display = "none";
    window.location.reload();
  }

  return (
    <div>
    <div className="form-popup" id="loginForm">
      <div className="parent-container">
        <input
          className="input"
          name="id"
          type="text"
          placeholder="Enter ID"
          onChange={(e) => handleOnChange(e)}
        />
        <input
          className="input"
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={(e) => handleOnChange(e)}
        />
        <button style={{margin:'10px', width:'150px'}} type="button" onClick={(e) => submit(e)}>
          Login
        </button>
        <button style={{margin:'10px', width:'150px'}} type="button" onClick={(e) => {closLoginForm(e)}}>
          Close
        </button>
      </div>
    </div>
    </div>
  );
}

export default Login;
