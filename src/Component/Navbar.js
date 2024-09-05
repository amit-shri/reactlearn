import React, { useContext, useEffect } from 'react'
import { NavLink, Link,  useLocation } from 'react-router-dom';

import authContext from "../context/auth/authContext"


export default function Navbar(props) {

    const {auth} = useContext(authContext);    

    // console.log("--");
    // console.log(auth);
    // console.log(auth.token);
    // console.log("===");

    useEffect(() => {


        // console.log("from navbar");
    // const verifyAccess = async () => {
    //   try {
    //     let access = await props.checkUserAccess();
    //     console.log('Access:', access);
    //     if (access) {
    //       fetchData(); // Fetch your data if access is granted
    //     } else {
    //       navigate("/"); // Redirect to the home page if access is denied
    //     }
    //   } catch (error) {
    //     console.error('Error checking access:', error);
    //     navigate("/"); // Redirect to the home page in case of an error
    //   }
    // };

    // verifyAccess(); // Call the async function inside useEffect
    
  }, []);

    const location = useLocation();
    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-light`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{props.title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    {'token' in auth && auth.token !== undefined && (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item active">
                            <NavLink  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="news-monkey">News Monkey</NavLink>
                        </li>
                    </ul>)}
                </div>

                <div>
                    {'token' in auth && auth.token !== undefined ? (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        <li className="nav-item">
                            <label className="nav-link">Welcome {auth.firstname} </label>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="logout">Logout</NavLink>
                        </li>
                    </ul>) :  (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="signup">Sign Up</NavLink>
                        </li>
                    </ul>)
                    }    
                </div>

            </div>
        </nav>
    )
}
