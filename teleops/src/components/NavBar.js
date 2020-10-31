import React from "react"

const NavBar = () => {
    return(
        <nav style={navStyles}>
            <h3>Logo</h3>
            <ul style={ulStyles}>
                <li>Login</li>
                <li>Register</li>
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

const liStyles = {

}