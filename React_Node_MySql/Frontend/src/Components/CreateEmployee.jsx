import React, { useState, useEffect } from 'react';
import { addEmployee } from "../Utils/APIManager.js";
import {China} from "../Utils/MyClass.js"

const CreateEmployee = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        const employee = {
            name : name,
            email : email,
            phone : phone
        }

        addEmployee(employee, receivedAddCallback);
    }

    function receivedAddCallback(data) {
        console.log("receivedAddCallback >> "+ JSON.stringify(data));
    }

    const callClass = () => {
        let myObject = new China()
        myObject.toys("Car");
    }


    return (
        <div > 
            <div>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h3 className='text-center'>Add Employee</h3>
                    <div className='card-body'>

                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Nmae:</label>
                                <input onChange = {(n) => {setName(n.target.value)}} placeholder='Name' type = "text" className='form-control'></input>
                            </div>
                            <div className='form-group'>
                                <label>Email:</label>
                                <input onChange = {(e) => {setEmail(e.target.value)}} placeholder='Email' type="email" className='form-control'></input>
                            </div>
                            <div className='form-group'>
                                <label>Phone:</label>
                                <input onChange = {(p) => {setPhone(p.target.value)}} placeholder='Phone' type="text" className='form-control'></input>
                            </div>
                            <button className='btn btn-success'>Save</button>
                            <button className='btn btn-danger' style={{marginLeft:'10px'}}>Cancel</button>
                        </form>
                    </div>

                </div>
            </div>
            <br/>
            <button type= 'button' onClick={(e) => {callClass(e)}}>Import Class Example</button>
        </div>
    );
};

export default CreateEmployee;