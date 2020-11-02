import React, { useEffect, useState } from "react"
import {hasValueInputStyles, hasErrorInputStyles, inputStyles, errorTexyStyle, inputLabel, inputContainerStyle} from "./styles"

const Username = (props) => {

    const [value, setValue] = useState("")
    const [valid, setValid] = useState(false)

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        // console.log(value)
        if (value !== "") {
            // console.log("Do test")
            // const regexTest = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)
            const regex = /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u
            const regexTest = regex.test(value)
            // console.log(regexTest)
            if(regexTest){
                setValid(true)
                props.updateParentObj({value:value, isValid: true})
            }else{
                setValid(false)
                props.updateParentObj({value:value, isValid: false})
            }
        }        
    },[value])

    return(
        <React.Fragment>
        {(value.length > 0) && <div style={inputLabel}>Username</div>}
        <div style={inputContainerStyle}>
            <input
                name="username"
                placeholder="Username"
                type="text"
                value={value}
                onChange={(e) => {handleChange(e)}}
                // onLoad={(e) => {console.log("Username Onload: " + e.target.value)}}
                autoComplete="email"
                // style={inputStyles}
                style={ (!value.length > 0 ) ? inputStyles : (valid) ? hasValueInputStyles : hasErrorInputStyles }
            />            
        </div>
        {(!valid && value !== "") && <div style={errorTexyStyle}>Enter Valid Username</div>}
        </React.Fragment>
    )            
}

export default Username