import React, { useState } from "react"
import {UserAuth} from "../endpoints"
import {Link} from "react-router-dom"
import Username from "./inputs/Username"
import Password from "./inputs/Password"

const UserLogin = (props) => {

    const [username, setUsername] = useState({value:"",isValid:false})
    const [password, setPassword] = useState({value:"",isValid:false})
    const [loginError, setLoginError] = useState("") 

    const handleSubmit = () => {
        console.log(username)
        console.log(password)
        if(username.isValid && password.isValid){
            console.log(username.value)
            console.log(password.value)
            UserAuth(username.value,password.value)
            .then((response) => {
                console.log("Submitted")
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
        }else{
            setLoginError("Pleases enter a valid username and password")
        }
    }

    return(
        <div style={loginPageStyle}>
            <div style={loginFormContainer}>
                <h2>User Login</h2>                        
                <form style={formStyles}>
                    <Username 
                        parentObj={username}
                        updateParentObj={setUsername}
                    />                    
                    <Password 
                        parentObj={password}
                        updateParentObj={setPassword}
                        placeholder={"Password"}
                    />                    
                    <div 
                        onClick={() => {handleSubmit()}}
                        style={submitBtnStyle}
                    >
                        Login
                    </div>
                </form>
                {(loginError !== "") && <p style={errorStyle}>{loginError}</p>}
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
    border: "1px solid grey",
    width: "-webkit-fill-available"
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
    fontSize: "0.8em",
    marginTop: "10px",
    display: "block"
}