import React, {useEffect, useState} from "react"
import Email from "./inputs/Email"

const Register = () => {

    const [name, setName] = useState({value:"",isValid:false})
    const [surname, setSurname] = useState({value:"",isValid:false})
    const [email, setEmail] = useState({value:"",isValid:false})
    const [password, setPassword] = useState({value:"",isValid:false})

    const handleSubmit = () => {

    }

    useEffect(() => {
        console.log(email)
    }, [email])

    return(        
        <div style={registerPageStyle}>
            <div style={registerFormContainer}>
                <h2>Register</h2>
                <form style={formStyles}>
                    <input 
                        style={inputStyles} 
                        type="text" 
                        placeholder="Name"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        autoComplete="first-name"
                    />
                    <input 
                        style={inputStyles} 
                        type="text" 
                        placeholder="Surname"
                        value={surname}
                        onChange={(e)=>{setSurname(e.target.value)}}
                        autoComplete="last-name"
                    />
                    <Email 
                        parentObj={email}
                        updateParentObj={setEmail}
                    />
                    {/* <input 
                        style={inputStyles} 
                        type="text" 
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        autoComplete="email"
                    /> */}
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