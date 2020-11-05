import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"

const NavBar = (props) => {

    useEffect(() => {
        checkLoginStatus()
    }, [])

    const checkLoginStatus = () => {
        props.setLoggedIn((sessionStorage.getItem("UserID")) ? true : false)
    }

    return(
        <nav style={navStyles}>
            <h3>Tele-Operative</h3>            
            <ul style={ulStyles}>
                { props.loggedIn ?
                //Logged In
                <React.Fragment>
                    <li>
                        <NavLink
                            to="/main"
                            style={linkStyle}
                            activeStyle={activeLinkStyle}
                            exact
                            onClick={() => {checkLoginStatus()}}
                        >
                            Timeline
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/config"
                            style={linkStyle}
                            activeStyle={activeLinkStyle}
                            exact
                            onClick={() => {checkLoginStatus()}}
                        >
                            Settings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            style={linkStyle}
                            activeStyle={activeLinkStyle}
                            exact
                            onClick={()=>{
                                sessionStorage.removeItem("UserID") 
                                sessionStorage.removeItem("ConfigID") 
                                sessionStorage.removeItem("UserStatus")
                                checkLoginStatus()
                            }}
                        >
                            Logout
                        </NavLink>
                    </li>                    
                </React.Fragment>
                :
                // Not Logged In
                <React.Fragment>
                    <li>
                        <NavLink 
                            to="/"
                            style={linkStyle}
                            activeStyle={activeLinkStyle}
                            exact
                            onClick={() => {checkLoginStatus()}}
                        >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/register"
                            style={linkStyle}
                            activeStyle={activeLinkStyle}
                            exact
                            onClick={() => {checkLoginStatus()}}
                        >
                            Register
                        </NavLink>
                    </li>
                </React.Fragment>}
            </ul>
        </nav>
    )
}

export default NavBar

const navStyles = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: "10vh",
    backgroundColor: "#666"
}

const ulStyles = {
    width: "50%",
    display: "flex",
    justifyContent: "space-around",
    listStyle: "none"
}

const linkStyle = {
    color: "white",
    // fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer"
}

const activeLinkStyle = {
    fontWeight: "bold",
    paddingBottom: "5px",
    borderBottom: "1px solid #37a2ff"
}