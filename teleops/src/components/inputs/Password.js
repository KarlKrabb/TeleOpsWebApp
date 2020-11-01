import React, { useEffect, useState } from "react"
import {hasErrorInputStyles, hasValueInputStyles, inputLabel, inputStyles, errorTexyStyle} from "./styles"

const Password = (props) => {

    const [value, setValue] = useState("")
    const [valid, setValid] = useState(false)

    const handleChange = (e) => {        
        setValue(e.target.value)
    }    

    useEffect(() => {
        console.log(value)
        console.log("Do test")
        if(value.length > 5){
            setValid(true)
            props.updateParentObj({value:value, isValid: true})
        }else{
            props.updateParentObj({value:value, isValid: false})
            setValid(false)
        }        
        
    },[value])

    return(
        <React.Fragment>
            {(value.length > 0) && <label style={inputLabel} htmlFor={props.id}>{props.placeholder}</label>}
            <input
                name={props.id}
                id={props.id}
                placeholder={props.placeholder}
                type="password"
                value={value}
                onChange={(e) => {handleChange(e)}}
                onLoad={(e) => {console.log("Password Onload: " + e.target.value)}}
                autoComplete="current-password"
                style={ (!value.length > 0 ) ? inputStyles : (valid) ? hasValueInputStyles : hasErrorInputStyles }
            />
            {(!valid && value !== "") && <div style={errorTexyStyle}>Enter {props.placeholder} {`>`} 5 characters </div>}
        </React.Fragment>
    )
}

export default Password