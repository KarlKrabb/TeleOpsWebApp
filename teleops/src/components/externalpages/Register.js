import React, {useEffect, useState} from "react"
import Email from "./inputs/Email"
import Name from "./inputs/Name"
import Password from "./inputs/Password"
import Surname from "./inputs/Surname"
import {AddUser} from "../../endpoints"

const Register = (props) => {

    const [name, setName] = useState({value:"",isValid:false})
    const [surname, setSurname] = useState({value:"",isValid:false})
    const [email, setEmail] = useState({value:"",isValid:false})
    const [password, setPassword] = useState({value:"",isValid:false})
    const [confirmPassword, setConfirmPassword] = useState({value:"",isValid:false})
    const [passwordNoMatch, setPasswordNoMatch] = useState("")

    const handleSubmit = () => {
        console.log(name, surname, email, password)
        if(name.isValid && surname.isValid && email.isValid && password.isValid){
            AddUser(name.value,surname.value,email.value,password.value)
            .then((response) => {
                console.log(response)
                const {configID, newUserID} = response.data
                sessionStorage.setItem("UserID", newUserID)
                sessionStorage.setItem("ConfigID", configID)
                sessionStorage.setItem("UserStatus", "BrandNew")
                props.history.push("/config");
            })
        }        
    }

    useEffect(() => {
        console.log("Password: " + password.value)
        console.log("Confirm: " + confirmPassword.value)
        console.log(confirmPassword.value.length)
        if (confirmPassword.value.length > 0) {
            if (confirmPassword.value == password.value) {
                console.log("Match")
                setPasswordNoMatch("")
            }else{
                console.log("No Match")
                setPasswordNoMatch("Passwords don't match")
            }
        }
    }, [confirmPassword])

    useEffect(() => {
        console.log(passwordNoMatch)
    }, [passwordNoMatch])

    return(        
        <div style={registerPageStyle}>
            <div style={registerFormContainer}>
                <h2>Register</h2>
                <form style={formStyles}>                    
                    <Name 
                        parentObj={name}
                        updateParentObj={setName}
                    />
                    <Surname 
                        parentObj={surname}
                        updateParentObj={setSurname}
                    />
                    <Email 
                        parentObj={email}
                        updateParentObj={setEmail}
                    />
                    <Password 
                        placeholder={"New password"}
                        name={"password"}
                        parentObj={password}
                        updateParentObj={setPassword}
                        id={"newPasswordInput"}
                    />
                    <Password 
                        placeholder={"Confirm password"}
                        name={"password"}
                        parentObj={confirmPassword}
                        updateParentObj={setConfirmPassword}
                        id={"confirmPasswordInput"}
                    />
                    {(passwordNoMatch.length > 0) && <div>{passwordNoMatch}</div>}
                    <div 
                        onClick={() => {handleSubmit()}}
                        style={submitBtnStyle}
                    >
                        Register
                    </div>
                </form>                            
            </div>
        </div>
    )
}

export default Register

const registerPageStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

const registerFormContainer = {
    textAlign: "center",
    marginTop: "2%",
    marginLeft: "2%",
    marginRight: "2%",
    maxWidth: "300px",
    border: "1px solid lightgrey",
    padding: "20px",
    borderRadius: "10px"
}

const formStyles = {
    display: "block"
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