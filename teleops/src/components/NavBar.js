import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"

const NavBar = (props) => {
    const [UserID, setUserID ] = useState(sessionStorage.getItem("UserID"))
    

    useEffect(() => {
        if(sessionStorage.getItem("UserID") !== null ){
            if(UserID !== sessionStorage.getItem("UserID")){
                setUserID(sessionStorage.getItem("UserID"))
            }
        }
    })

    return(
        <nav style={navStyles}>
            <h3>Tele-Operative</h3>            
            <ul style={ulStyles}>
                { console.log(UserID), (UserID > 0) ?
                //Logged In
                <React.Fragment>
                    <li>
                        <NavLink
                            to="/timeline"
                            style={linkStyle}
                            activeStyle={activeLinkStyle}
                            exact                            
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