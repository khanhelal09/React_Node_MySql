import React, { useState } from 'react';
import "./Signup.styled.css";
import { signup } from '../../Utils/APIManager';

const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avater, setAvater] = useState('null');

    function handleSubmit(event){
        event.preventDefault();
        const user = {
            name : name,
            email : email,
            password : password,
            avater: avater
        }

        signup(user, receivedAddCallback);
    }

    function receivedAddCallback(data) {
        console.log("SignUP callback >> "+ data);
        
        alert("Signup response: " + data);
    }


    return (
        <div>
            <form onSubmit={handleSubmit} style={{border:'1px'}}>
                <div className="signup-container">
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr/>
                    <label for="username"><b>Name</b></label>
                    <input onChange = {(n) => {setName(n.target.value)}} type="text" placeholder="Enter Name" name="username" required></input>

                    <label for="email"><b>Email</b></label>
                    <input onChange = {(e) => {setEmail(e.target.value)}} type="text" placeholder="Enter Email" name="email" required></input>

                    <label for="psw"><b>Password</b></label>
                    <input onChange = {(p) => {setPassword(p.target.value)}} type="text" placeholder="Enter Password" name="psw" autoComplete="on" required></input>

                    <label for="psw-repeat"><b>Repeat Password</b></label>
                    <input type="text" placeholder="Repeat Password" name="psw-repeat" autoComplete="on" required></input>

                    <label>
                        <input type="checkbox" checked="checked" readOnly name="remember" style={{marginBottom:"15px"}} /> Remember me
                    </label>

                    <p>By creating an account you agree to our <a href="#" style={{color:"dodgerblue"}}>Terms & Privacy</a>.</p>
                    
                    <div className="clearfix">
                        <button type="button" className="cancelbtn">Cancel</button>
                        <button type="submit" className="signupbtn">Sign Up</button>
                    </div>

                    <div className = "signup-container signin">
                        <p>Already have an account? <a href="#">Sign in</a>.</p>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default Signup;