import React, {useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import Login from "./Login/Login";
import {authToken} from "../Utils/MyConstants.js"

//className={({isActive})=>isActive? "active-item":"pending-item"}

const Menu = () => {

    async function logOut(e) {
        const response = await fetch("http://localhost:8081/logout", {
          method: "GET",
          credentials: "include",
        });
    
        console.log("Menu >> logOut() status code: " + response.status);
        if (response.status === 200) {
            autoLogin();
        } else {
            
        }
    }

    
    const [isLoginFormShow, setLoginFormShow] = useState(false);

    const showLoginForm = () => {
        if(isLoginFormShow){
            return <Login id="myForm"/>
        } else {
            return <></>
        }
    }

    const [checkAutoLoggedIn, setCheckAutoLoggedIn] = useState(false);

    async function autoLogin() {
        console.log("Menu >> autoLogin() inside");
        const response = await fetch("http://localhost:8081/autoLogin", {
          method: "GET",
          credentials: "include",
          headers: {
            'Authorization': authToken
         }
        });
    
        console.log("Menu >> autoLogin() status code: " + response.status);
        if (response.status === 200) {
            setCheckAutoLoggedIn(true)
            
            for (var pair of response.headers.entries()) {
                console.log("Menu >> autoLogin() Header: " + pair[0]+ ': '+ pair[1]);
              }
           
        } else {
            setCheckAutoLoggedIn(false)
        }
    }


    //Check by api call whether logged in or not
    useEffect(() => {
        console.log("Menu >> useEffect() for autoLoging call");
         autoLogin();
    },[])

    const showLoginButton = () => {
        console.log("Menu >> showLoginButton() checkAutoLoggedIn: " + checkAutoLoggedIn);
        if(checkAutoLoggedIn){
            console.log("Menu >> showLoginButton() inside If block");
            return
                <></>
        } else {
            console.log("Menu >> showLoginButton() inside else block");
            return <>
                <div style={{marginLeft:'auto', background:'gray'}}>
                    <label onClick={(e) => {setLoginFormShow(true)}}>LOGIN</label>
                </div>
            </>
        }
    }



    return (
        <>
            <nav className={"nav_bar_style"}>
                <div className={"menu-style"}>
                    <NavLink style={{background:'Violet'}} className={"nav_link_style"} to="/"><img className="home_image" src="./src/assets/applogo.png"/></NavLink>
                    <NavLink className={"nav_link_style"} to="/product/10/Pen">Product</NavLink>
                    <NavLink className={"nav_link_style"} to="/profile/1">Profile</NavLink>
                    <NavLink className={"nav_link_style"} to="/courses">Courses</NavLink>


                    <div>
                        <ul className="top-level-menu">
                            <li>
                                <NavLink className={"nav_link_style"} to="/tutorial/''">Tutorials</NavLink>
                                <ul class="second-level-menu">
                                    <li><NavLink className={"nav_link_style"} to="/tutorial/HTML">HTML</NavLink></li>
                                    <li><NavLink className={"nav_link_style"} to="/tutorial/CSS">CSS</NavLink></li>
                                    <li>
                                        <NavLink className={"nav_link_style"} to="/tutorial/NodeJS">NodeJS<span>&raquo;</span></NavLink>
                                        <ul class="third-level-menu">
                                            <li><NavLink className={"nav_link_style"} to="/tutorial/http">HTTP</NavLink></li>
                                            <li><NavLink className={"nav_link_style"} to="/tutorial/url">url</NavLink></li>
                                            <li><NavLink className={"nav_link_style"} to="/tutorial/fs">fs</NavLink></li>
                                            <li><NavLink className={"nav_link_style"} to="/tutorial/db">db</NavLink></li>
                                        </ul>
                                    </li>
                                    <li><NavLink className={"nav_link_style"} to="/tutorial/ReactJS">React JS</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                   
                    {showLoginButton()}
                   
                    {/* <div style={{marginLeft:'auto', marginRight:'100px'}}>
                        <label onClick={(e) => {setLoginFormShow(true)}}>LOGIN</label>
                   </div> */}

                    {showLoginForm()}

                    <div className="dropdown" style={{width:'80px', maxWidth:'80px' ,background:'gray', marginLeft:'auto', marginRight:'5px'}}>
                        <a className="dropdown-toggle" data-bs-toggle="dropdown">
                            <img className="circular_image" src="./src/assets/applogo.png"/>
                        </a>
                        <div className="dropdown-menu">
                            <NavLink className="dropdown-item" to="/profile/33">Profile</NavLink>
                            <NavLink className="dropdown-item" to="/profile/22">Change Password</NavLink>
                            <button onClick= {(e) => {logOut(e)}} className="dropdown-item">Logout</button>
                        </div>
                    </div>

                   
                </div>
            </nav>
        </>
    );
};

export default Menu;