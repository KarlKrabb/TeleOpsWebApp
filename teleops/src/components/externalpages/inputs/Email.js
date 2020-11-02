import React, { useEffect, useState } from "react"
import {hasErrorInputStyles, hasValueInputStyles, inputLabel, inputStyles, errorTexyStyle, inputContainerStyle} from "./styles"

const Email = (props) => {

    const [value, setValue] = useState("")
    const [valid, setValid] = useState(false)

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        // console.log(value)
        if (value !== "") {
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
            {(value.length > 0) && <label style={inputLabel} htmlFor="emailInput">Email</label>}
            <div style={inputContainerStyle}>
                <input
                    name="email"
                    id="emailInput"
                    placeholder="Email"
                    type="text"
                    value={value}
                    onChange={(e) => {handleChange(e)}}
                    autoComplete="email"
                    style={ (!value.length > 0 ) ? inputStyles : (valid) ? hasValueInputStyles : hasErrorInputStyles }
                />
            </div>
            {(!valid && value !== "") && <div style={errorTexyStyle}>Enter Valid Email</div>}
        </React.Fragment>
    )            
}

export default Email