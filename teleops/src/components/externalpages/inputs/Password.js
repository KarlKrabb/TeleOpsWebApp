import React, { useEffect, useState } from "react"
import {hasErrorInputStyles, hasValueInputStyles, inputLabel, inputStyles, errorTexyStyle, inputContainerStyle} from "./styles"

const Password = (props) => {

    const [value, setValue] = useState("")
    const [valid, setValid] = useState(false)

    const handleChange = (e) => {        
        setValue(e.target.value)
    }    

    useEffect(() => {
        // console.log(value)
        // console.log("Do test")
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
            {(value.length > 0) && <div style={inputLabel}>{props.placeholder}</div>}
            <div style={inputContainerStyle}>
                <input
                    placeholder={props.placeholder}
                    type="password"
                    value={value}
                    onChange={(e) => {handleChange(e)}}
                    // onLoad={(e) => {console.log("Password Onload: " + e.target.value)}}
                    autoComplete="current-password"
                    // style={inputStyles}
                    style={ (!value.length > 0 ) ? inputStyles : (valid) ? hasValueInputStyles : hasErrorInputStyles }
                />
            </div>
            {(!valid && value !== "") && <div style={errorTexyStyle}>Enter {props.name} {`>`} 5 characters </div>}
        </React.Fragment>
    )
}

export default Password