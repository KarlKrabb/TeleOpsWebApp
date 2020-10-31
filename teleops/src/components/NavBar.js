import React from "react"
import {NavLink} from "react-router-dom"

const NavBar = () => {
    return(
        <nav style={navStyles}>
            <h3>Tele-Operative</h3>
            <ul style={ulStyles}>
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