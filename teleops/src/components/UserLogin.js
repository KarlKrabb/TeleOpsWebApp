import React, { useEffect, useState } from "react"
import {UserAuth} from "../endpoints"
import {Link} from "react-router-dom"

const UserLogin = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState("")    

    const handleSubmit = () => {
        console.log("Submitted")
        console.log(username)
        console.log(password)
        UserAuth(username,password)
        .then((response) => {
            console.log(response)
            if (response.data.valid) {
                const { UserID, ConfigID } = response.data
                sessionStorage.setItem("UserID", UserID)
                sessionStorage.setItem("ConfigID", ConfigID)
                props.history.push("/timeline");
            }else{
                setLoginError("Username or password is incorrect")
            }
        })
    }

    return(
        <div style={loginPageStyle}>
            <div style={loginFormContainer}>
                <h2>User Login</h2>                        
                <form style={formStyles}>
                    <input 
                        style={inputStyles} 
                        type="text" 
                        placeholder="Username"
                        value={username}
                        onChange={(e)=>{setUsername(e.target.value)}}
                        autoComplete="email"
                    />
                    <input 
                        style={inputStyles} 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        autoComplete="current-password"
                    />
                    <div 
                        onClick={() => {handleSubmit()}}
                        style={submitBtnStyle}
                    >
                        Login
                    </div>
                </form>
                {(loginError != "") && <p style={errorStyle}>{loginError}</p>}
                <Link style={linkStyle} to="/register" >Register</Link>
            </div>
        </div>
    )
}

export default UserLogin

const loginPageStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

const loginFormContainer = {
    textAlign: "center",
    marginTop: "20vh",
    width: "200px",
    border: "1px solid lightgrey",
    padding: "20px",
    borderRadius: "10px"
}

const formStyles = {
    display: "block"
}

const inputStyles = {
    marginTop: "10px",
    padding: "10px",
    fontSize: "1em",
    borderRadius: "10px",
    border: "1px solid grey"
}

const submitBtnStyle = {
    marginTop: "20px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "10px",    
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer"
}

const errorStyle = {
    color: "red",
    fontSize: "0.8em"
}

const linkStyle = {
    color: "#5d5d5d",
    fontSize: "0.8em"
}