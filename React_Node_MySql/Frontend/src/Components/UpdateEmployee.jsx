import React, { useEffect, useState } from 'react';
import { getEmployeeDetails, updateEmployeeByID } from "../Utils/APIManager.js";

const UpdateEmployee = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const id = props.id
    const [employee, setEmployee] = useState();

    useEffect(() => {
        getEmployeeDetails(id, receivedEmployee);
      } ,[]);

    function receivedEmployee(data) {
        console.log("receivedEmployee >> ");
        setEmployee(data)
    }


    function handleUpdate(event){
        event.preventDefault();
        const employee = {
            id : id,
            name : name,
            email : email,
            phone : phone
        }

        updateEmployeeByID(employee, receivedUpdateCallback);
    }

    function receivedUpdateCallback(data) {
        console.log("receivedUpdateCallback >> "+ JSON.stringify(data));
    }

    return (
        <div>
            <p>{JSON.stringify(employee)}</p>
            <div >
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h3 className='text-center'>Update Employee where ID: {id}</h3>
                    <div className='card-body'>
                    
                        <form onSubmit={handleUpdate}>
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
                            <button onClick={handleUpdate} className='btn btn-success'>Save</button>
                            <button className='btn btn-danger' style={{marginLeft:'10px'}} onClick={{}}>Cancel</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UpdateEmployee;