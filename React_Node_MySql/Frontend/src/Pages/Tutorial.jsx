import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import UseRefExample from '../Components/UseRefExample';

const Tutorial = () => {

    let{name} = useParams()


    return (
        <div>
        {/* <div style={{marginTop: '60px', background:'aliceblue', height:'1200px'}}> */}
            <h1>This is tutorial page for {name}</h1>

            <div className="dropdown">
                <a className="dropdown-toggle" data-bs-toggle="dropdown"  to="/profile/12">Tutorials
                {/* <NavLink className={"nav_link_style"} to="/profile/12">Tutorials</NavLink> */}
                </a>
                <div className="dropdown-menu">
                    <a href="#" className="dropdown-item">Action</a>
                    <a href="#" className="dropdown-item">Another action</a>
                </div>
            </div>

            <br/>
            <div>
                <ul className="top-level-menu">
                    <li>
                        <NavLink className={"nav_link_style"} to="/profile/12">Tutorials</NavLink>
                        <ul class="second-level-menu">
                            <li><NavLink className={"nav_link_style"} to="/profile/22">HTML</NavLink>
                            </li>
                            <li><NavLink className={"nav_link_style"} to="/profile/32">CSS</NavLink>
                            </li>
                            <li>
                                <NavLink className={"nav_link_style"} to="/profile/30">New York</NavLink>
                                <ul class="third-level-menu">
                                    <li><NavLink className={"nav_link_style"} to="/profile/32">Information</NavLink></li>
                                    <li><NavLink className={"nav_link_style"} to="/profile/33">Canada</NavLink></li>
                                    <li><NavLink className={"nav_link_style"} to="/profile/34">Dhaka</NavLink></li>
                                    <li><NavLink className={"nav_link_style"} to="/profile/35">Khulna</NavLink></li>
                                </ul>
                            </li>
                            <li>
                                <NavLink className={"nav_link_style"} to="/profile/32">React JS</NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <br/>
            {/* UseRefExample */}
            <UseRefExample />
        </div>
    );
};

export default Tutorial;