import React, { useEffect, useState } from "react"
import {hasErrorInputStyles, hasValueInputStyles, inputLabel, inputStyles, errorTexyStyle, inputContainerStyle} from "./styles"

const Name = (props) => {

    const [value, setValue] = useState("")
    const [valid, setValid] = useState(false)

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        // console.log(value.length)
        if(value.length > 1){
            setValid(true)
            props.updateParentObj({value:value, isValid: true})
        }else{
            setValid(false)
            props.updateParentObj({value:value, isValid: false})
        }
    },[value])

    return(
        <React.Fragment>
            {(value.length > 0) && <label style={inputLabel} htmlFor="nameInput">Surname</label>}
            <div style={inputContainerStyle}>
                <input
                    name="name"
                    id="nameInput"
                    placeholder="Name"
                    type="text"
                    value={value}
                    onChange={(e) => {handleChange(e)}}
                    autoComplete="name"
                    style={ (!value.length > 0 ) ? inputStyles : (valid) ? hasValueInputStyles : hasErrorInputStyles }
                />
            </div>
            {(!valid && value !== "") && <div style={errorTexyStyle}>Enter First Name</div>}
        </React.Fragment>
    )            
}

export default Name